import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { createHash } from "crypto"

// The LFS upload can take a while; give the function room (Vercel caps to the
// plan max automatically).
export const maxDuration = 300
export const dynamic = "force-dynamic"

const HF_REPO = "EloPhanto/dataset"

/**
 * Upload one file to HuggingFace via the LFS protocol, then commit it.
 * `path` is the file path inside the repo. Returns the commit oid.
 */
async function uploadFileToHF(
  path: string,
  content: Buffer,
  commitMessage: string,
  token: string
): Promise<{ ok: boolean; commitOid?: string; error?: string }> {
  const sha256 = createHash("sha256").update(content).digest("hex")
  const size = content.length

  const lfsResp = await fetch(
    `https://huggingface.co/datasets/${HF_REPO}.git/info/lfs/objects/batch`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/vnd.git-lfs+json",
      },
      body: JSON.stringify({
        operation: "upload",
        transfers: ["basic"],
        objects: [{ oid: sha256, size }],
        hash_algo: "sha256",
      }),
    }
  )
  if (!lfsResp.ok) {
    return { ok: false, error: `LFS batch failed: ${lfsResp.status} ${await lfsResp.text()}` }
  }

  const obj = (await lfsResp.json()).objects?.[0]
  if (obj?.actions?.upload) {
    const uploadResp = await fetch(obj.actions.upload.href, {
      method: "PUT",
      headers: { ...(obj.actions.upload.header || {}) },
      body: new Uint8Array(content),
    })
    if (!uploadResp.ok) {
      return { ok: false, error: `LFS upload failed: ${uploadResp.status} ${await uploadResp.text()}` }
    }
  }

  const ndjsonLines = [
    JSON.stringify({ key: "header", value: { summary: commitMessage } }),
    JSON.stringify({ key: "lfsFile", value: { path, algo: "sha256", oid: sha256, size } }),
  ].join("\n")

  const commitResp = await fetch(
    `https://huggingface.co/api/datasets/${HF_REPO}/commit/main`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-ndjson",
      },
      body: ndjsonLines,
    }
  )
  if (!commitResp.ok) {
    return { ok: false, error: `Commit failed: ${commitResp.status} ${await commitResp.text()}` }
  }

  const result = await commitResp.json()
  return { ok: true, commitOid: result.commitOid || result.commit?.sha }
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (!process.env.HF_TOKEN) {
      return NextResponse.json({ error: "HF_TOKEN not configured" }, { status: 500 })
    }

    const supabase = createServerSupabaseClient()

    // Oldest-first so the selected batch (and therefore the shard) is stable
    // across retries until the rows are marked pushed.
    const { data: pending, error: fetchError } = await supabase
      .from("collect_buffer")
      .select("*")
      .eq("status", "pending")
      .order("created_at", { ascending: true })
      .limit(1000)

    if (fetchError) {
      console.error("Fetch error:", fetchError)
      return NextResponse.json({ error: "Failed to fetch pending examples" }, { status: 500 })
    }
    if (!pending || pending.length === 0) {
      return NextResponse.json({ message: "No pending examples to push", examples_pushed: 0 })
    }

    // Build this batch as its own JSONL file. We do NOT rewrite the full
    // dataset; each push is an independent shard (HF concatenates every
    // data/train*.jsonl into the train split). This keeps each run small and
    // fast no matter how large the dataset gets.
    const newLines = pending
      .map((row) =>
        JSON.stringify({
          task_id: row.task_id,
          conversations: row.conversations,
          metadata: row.metadata,
          agent_id: row.agent_id,
          created_at: row.created_at,
        })
      )
      .join("\n")
    const fileBuffer = Buffer.from(newLines + "\n")

    // Name the shard by its content hash. A retry of the same batch produces
    // the same filename and bytes, so re-committing is idempotent — never a
    // duplicate, even if marking-as-pushed failed on a previous attempt.
    const contentHash = createHash("sha256").update(fileBuffer).digest("hex").slice(0, 16)
    const shardPath = `data/train-${contentHash}.jsonl`

    // Ensure the dataset repo exists.
    const repoCheck = await fetch(`https://huggingface.co/api/datasets/${HF_REPO}`, {
      headers: { Authorization: `Bearer ${process.env.HF_TOKEN}` },
    })
    if (repoCheck.status === 404) {
      await fetch("https://huggingface.co/api/repos/create", {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.HF_TOKEN}`, "Content-Type": "application/json" },
        body: JSON.stringify({ name: "dataset", type: "dataset", organization: "EloPhanto", private: false }),
      })
    }

    const result = await uploadFileToHF(
      shardPath,
      fileBuffer,
      `Add ${pending.length} training examples`,
      process.env.HF_TOKEN
    )
    if (!result.ok) {
      console.error("HF push failed:", result.error)
      return NextResponse.json({ error: "HuggingFace push failed", details: result.error }, { status: 502 })
    }

    // Mark rows pushed in chunks — a single .in() with 1000 ids overflows the
    // request URL and fails silently, which is what previously left rows
    // pending and caused duplicate pushes.
    const ids = pending.map((row) => row.id)
    for (let i = 0; i < ids.length; i += 200) {
      const chunk = ids.slice(i, i + 200)
      const { error: updateError } = await supabase
        .from("collect_buffer")
        .update({ status: "pushed" })
        .in("id", chunk)
      if (updateError) {
        console.error("Mark-pushed failed:", updateError)
        // The shard is already committed and is idempotent by content hash, so
        // a retry next run re-commits the same file and tries marking again.
        return NextResponse.json(
          { error: "Pushed to HF but failed to mark rows", details: updateError.message },
          { status: 500 }
        )
      }
    }

    const { data: lastLog } = await supabase
      .from("collect_log")
      .select("dataset_size_after")
      .order("pushed_at", { ascending: false })
      .limit(1)
    const previousSize = lastLog?.[0]?.dataset_size_after ?? 0
    const newSize = previousSize + pending.length

    await supabase.from("collect_log").insert({
      examples_pushed: pending.length,
      dataset_size_after: newSize,
      hf_commit_sha: result.commitOid || null,
    })

    return NextResponse.json({
      examples_pushed: pending.length,
      dataset_size_after: newSize,
      shard: shardPath,
      hf_commit_sha: result.commitOid || null,
    })
  } catch (e) {
    console.error("push-dataset error:", e)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
