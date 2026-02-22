import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
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

    // Push to HuggingFace (if token is set)
    const HF_REPO = "EloPhanto/dataset"
    let hfCommitSha: string | null = null
    if (process.env.HF_TOKEN) {
      try {
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

        // Push batch file
        const response = await fetch(
          `https://huggingface.co/api/datasets/${HF_REPO}/commit/main`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.HF_TOKEN}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              commit_message: `Add ${datasetRows.length} training examples`,
              operations: [
                {
                  operation: "create",
                  path: `data/batch_${Date.now()}.jsonl`,
                  content: datasetRows
                    .map((row) => JSON.stringify(row))
                    .join("\n"),
                },
              ],
            }),
          }
        )
        if (response.ok) {
          const result = await response.json()
          hfCommitSha = result.commit?.sha || null
        }
      } catch (e) {
        console.error("HF push error:", e)
      }
    }

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

    // Mark buffer rows as pushed
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
