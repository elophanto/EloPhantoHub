import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { createHash } from "crypto"

const HF_REPO = "EloPhanto/dataset"
const TRAIN_PATH = "data/train.jsonl"

/**
 * Upload a file to HuggingFace using the LFS protocol, then commit.
 * This handles files of any size (unlike the base64 commit API which caps ~10MB).
 */
async function uploadToHF(
  content: Buffer,
  commitMessage: string,
  token: string
): Promise<{ ok: boolean; commitOid?: string; error?: string }> {
  const sha256 = createHash("sha256").update(content).digest("hex")
  const size = content.length

  // Step 1: Request LFS upload URL via batch API
  const lfsResp = await fetch(
    `https://huggingface.co/api/datasets/${HF_REPO}.git/info/lfs/objects/batch`,
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

  const lfsData = await lfsResp.json()
  const obj = lfsData.objects?.[0]

  // Step 2: Upload the file to the LFS storage (if not already uploaded)
  if (obj?.actions?.upload) {
    const uploadUrl = obj.actions.upload.href
    const uploadHeaders: Record<string, string> = {
      ...(obj.actions.upload.header || {}),
    }

    const uploadResp = await fetch(uploadUrl, {
      method: "PUT",
      headers: uploadHeaders,
      body: new Uint8Array(content),
    })

    if (!uploadResp.ok) {
      return { ok: false, error: `LFS upload failed: ${uploadResp.status} ${await uploadResp.text()}` }
    }
  }

  // Step 3: Create a commit with the LFS pointer file
  const lfsPointer =
    `version https://git-lfs.github.com/spec/v1\n` +
    `oid sha256:${sha256}\n` +
    `size ${size}\n`

  const encodedPointer = Buffer.from(lfsPointer).toString("base64")

  const ndjsonLines = [
    JSON.stringify({
      key: "header",
      value: { summary: commitMessage },
    }),
    JSON.stringify({
      key: "lfsFile",
      value: {
        path: TRAIN_PATH,
        algo: "sha256",
        oid: sha256,
        size,
      },
    }),
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
    // Verify cron secret
    const authHeader = request.headers.get("authorization")
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const supabase = createServerSupabaseClient()

    // Fetch pending examples
    const { data: pending, error: fetchError } = await supabase
      .from("collect_buffer")
      .select("*")
      .eq("status", "pending")
      .limit(1000)

    if (fetchError) {
      console.error("Fetch error:", fetchError)
      return NextResponse.json(
        { error: "Failed to fetch pending examples" },
        { status: 500 }
      )
    }

    if (!pending || pending.length === 0) {
      return NextResponse.json({
        message: "No pending examples to push",
        examples_pushed: 0,
      })
    }

    // Format for HuggingFace dataset
    const datasetRows = pending.map((row) => ({
      task_id: row.task_id,
      conversations: row.conversations,
      metadata: row.metadata,
      agent_id: row.agent_id,
      created_at: row.created_at,
    }))

    if (!process.env.HF_TOKEN) {
      return NextResponse.json(
        { error: "HF_TOKEN not configured" },
        { status: 500 }
      )
    }

    // Ensure dataset repo exists (create if not)
    const repoCheck = await fetch(
      `https://huggingface.co/api/datasets/${HF_REPO}`,
      { headers: { Authorization: `Bearer ${process.env.HF_TOKEN}` } }
    )
    if (repoCheck.status === 404) {
      await fetch("https://huggingface.co/api/repos/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "dataset",
          type: "dataset",
          organization: "EloPhanto",
          private: false,
        }),
      })
    }

    // Download existing train.jsonl
    let existingContent = ""
    const dlResp = await fetch(
      `https://huggingface.co/datasets/${HF_REPO}/resolve/main/${TRAIN_PATH}`,
      { headers: { Authorization: `Bearer ${process.env.HF_TOKEN}` }, redirect: "follow" }
    )
    if (dlResp.ok) {
      existingContent = await dlResp.text()
      if (existingContent && !existingContent.endsWith("\n")) {
        existingContent += "\n"
      }
    }

    // Append new rows
    const newLines = datasetRows
      .map((row) => JSON.stringify(row))
      .join("\n")
    const mergedContent = existingContent + newLines + "\n"
    const fileBuffer = Buffer.from(mergedContent)

    // Upload via LFS protocol (handles any file size)
    const result = await uploadToHF(
      fileBuffer,
      `Add ${datasetRows.length} training examples`,
      process.env.HF_TOKEN
    )

    if (!result.ok) {
      console.error("HF push failed:", result.error)
      return NextResponse.json(
        { error: "HuggingFace push failed", details: result.error },
        { status: 502 }
      )
    }

    const hfCommitSha = result.commitOid || null

    // Get previous dataset size
    const { data: lastLog } = await supabase
      .from("collect_log")
      .select("dataset_size_after")
      .order("pushed_at", { ascending: false })
      .limit(1)

    const previousSize = lastLog?.[0]?.dataset_size_after ?? 0
    const newSize = previousSize + datasetRows.length

    // Log the push
    await supabase.from("collect_log").insert({
      examples_pushed: datasetRows.length,
      dataset_size_after: newSize,
      hf_commit_sha: hfCommitSha,
    })

    // Mark buffer rows as pushed only after successful HF push
    const ids = pending.map((row) => row.id)
    await supabase
      .from("collect_buffer")
      .update({ status: "pushed" })
      .in("id", ids)

    return NextResponse.json({
      examples_pushed: datasetRows.length,
      dataset_size_after: newSize,
      hf_commit_sha: hfCommitSha,
    })
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
