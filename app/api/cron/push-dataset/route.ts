import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"

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

    // Push to HuggingFace (token is required)
    const HF_REPO = "EloPhanto/dataset"
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

    // Download existing train.jsonl and append new rows
    const TRAIN_PATH = "data/train.jsonl"
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

    const newLines = datasetRows
      .map((row) => JSON.stringify(row))
      .join("\n")
    const mergedContent = existingContent + newLines + "\n"
    const encodedContent = Buffer.from(mergedContent).toString("base64")

    const ndjsonLines = [
      JSON.stringify({
        key: "header",
        value: {
          summary: `Add ${datasetRows.length} training examples`,
        },
      }),
      JSON.stringify({
        key: "file",
        value: {
          content: encodedContent,
          path: TRAIN_PATH,
          encoding: "base64",
        },
      }),
    ].join("\n")

    const response = await fetch(
      `https://huggingface.co/api/datasets/${HF_REPO}/commit/main`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/x-ndjson",
        },
        body: ndjsonLines,
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error("HF push failed:", response.status, errorText)
      return NextResponse.json(
        { error: "HuggingFace push failed", details: errorText },
        { status: 502 }
      )
    }

    const result = await response.json()
    const hfCommitSha = result.commitOid || result.commit?.sha || null

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
