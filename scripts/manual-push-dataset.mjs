#!/usr/bin/env node
// One-off manual push of ALL pending collect_buffer rows to HuggingFace.
// Mirrors app/api/cron/push-dataset/route.ts but without the 1000-row cap.
import { createHash } from "node:crypto"
import { readFileSync } from "node:fs"

// Load .env.local
const env = Object.fromEntries(
  readFileSync(new URL("../.env.local", import.meta.url), "utf8")
    .split("\n")
    .filter((l) => l && !l.startsWith("#") && l.includes("="))
    .map((l) => {
      const i = l.indexOf("=")
      return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^["']|["']$/g, "")]
    })
)

const SUPABASE_URL = env.SUPABASE_URL
const SUPABASE_KEY = env.SUPABASE_SERVICE_ROLE_KEY
const HF_TOKEN = env.HF_TOKEN
const HF_REPO = "EloPhanto/dataset"
const TRAIN_PATH = "data/train.jsonl"

if (!SUPABASE_URL || !SUPABASE_KEY || !HF_TOKEN) {
  console.error("Missing env vars")
  process.exit(1)
}

const sbHeaders = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  "Content-Type": "application/json",
}

async function fetchAllPending() {
  const all = []
  const pageSize = 1000
  let from = 0
  while (true) {
    const url = `${SUPABASE_URL}/rest/v1/collect_buffer?select=*&status=eq.pending&order=created_at.asc&limit=${pageSize}&offset=${from}`
    const r = await fetch(url, { headers: sbHeaders })
    if (!r.ok) throw new Error(`Supabase fetch failed: ${r.status} ${await r.text()}`)
    const batch = await r.json()
    all.push(...batch)
    console.log(`  fetched ${all.length} pending so far...`)
    if (batch.length < pageSize) break
    from += pageSize
  }
  return all
}

async function uploadToHF(content, commitMessage) {
  const sha256 = createHash("sha256").update(content).digest("hex")
  const size = content.length
  console.log(`  file size: ${(size / 1024 / 1024).toFixed(2)} MB, sha256: ${sha256.slice(0, 12)}...`)

  const lfsResp = await fetch(
    `https://huggingface.co/datasets/${HF_REPO}.git/info/lfs/objects/batch`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
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
  if (!lfsResp.ok) throw new Error(`LFS batch failed: ${lfsResp.status} ${await lfsResp.text()}`)
  const lfsData = await lfsResp.json()
  const obj = lfsData.objects?.[0]

  if (obj?.actions?.upload) {
    console.log(`  uploading to LFS storage...`)
    const uploadResp = await fetch(obj.actions.upload.href, {
      method: "PUT",
      headers: { ...(obj.actions.upload.header || {}) },
      body: content,
    })
    if (!uploadResp.ok)
      throw new Error(`LFS upload failed: ${uploadResp.status} ${await uploadResp.text()}`)
  } else {
    console.log(`  LFS object already exists, skipping upload`)
  }

  const ndjson = [
    JSON.stringify({ key: "header", value: { summary: commitMessage } }),
    JSON.stringify({
      key: "lfsFile",
      value: { path: TRAIN_PATH, algo: "sha256", oid: sha256, size },
    }),
  ].join("\n")

  console.log(`  committing to ${HF_REPO}...`)
  const commitResp = await fetch(
    `https://huggingface.co/api/datasets/${HF_REPO}/commit/main`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/x-ndjson",
      },
      body: ndjson,
    }
  )
  if (!commitResp.ok) throw new Error(`Commit failed: ${commitResp.status} ${await commitResp.text()}`)
  const result = await commitResp.json()
  return result.commitOid || result.commit?.sha
}

async function main() {
  console.log(`Fetching all pending rows from Supabase...`)
  const pending = await fetchAllPending()
  console.log(`Total pending: ${pending.length}`)
  if (pending.length === 0) return

  console.log(`Downloading existing ${TRAIN_PATH}...`)
  let existing = ""
  const dl = await fetch(
    `https://huggingface.co/datasets/${HF_REPO}/resolve/main/${TRAIN_PATH}`,
    { headers: { Authorization: `Bearer ${HF_TOKEN}` }, redirect: "follow" }
  )
  if (dl.ok) {
    existing = await dl.text()
    if (existing && !existing.endsWith("\n")) existing += "\n"
    const existingLines = existing ? existing.split("\n").filter(Boolean).length : 0
    console.log(`  existing rows: ${existingLines}`)
  } else {
    console.log(`  no existing file (status ${dl.status})`)
  }

  const rows = pending.map((r) => ({
    task_id: r.task_id,
    conversations: r.conversations,
    metadata: r.metadata,
    agent_id: r.agent_id,
    created_at: r.created_at,
  }))
  const newLines = rows.map((r) => JSON.stringify(r)).join("\n") + "\n"
  const merged = Buffer.from(existing + newLines)

  console.log(`Uploading merged file (${pending.length} new rows)...`)
  const commitSha = await uploadToHF(merged, `Add ${pending.length} training examples (manual backfill)`)
  console.log(`Commit: ${commitSha}`)

  // Determine previous dataset_size_after for log continuity
  const lastLogResp = await fetch(
    `${SUPABASE_URL}/rest/v1/collect_log?select=dataset_size_after&order=pushed_at.desc&limit=1`,
    { headers: sbHeaders }
  )
  const lastLog = await lastLogResp.json()
  const prevSize = lastLog?.[0]?.dataset_size_after ?? 0
  const newSize = prevSize + pending.length

  console.log(`Inserting collect_log entry (size ${prevSize} -> ${newSize})...`)
  await fetch(`${SUPABASE_URL}/rest/v1/collect_log`, {
    method: "POST",
    headers: sbHeaders,
    body: JSON.stringify({
      examples_pushed: pending.length,
      dataset_size_after: newSize,
      hf_commit_sha: commitSha,
    }),
  })

  console.log(`Marking ${pending.length} buffer rows as pushed (in chunks)...`)
  const ids = pending.map((r) => r.id)
  const chunkSize = 500
  for (let i = 0; i < ids.length; i += chunkSize) {
    const chunk = ids.slice(i, i + chunkSize)
    const inList = `(${chunk.map((id) => `"${id}"`).join(",")})`
    const r = await fetch(
      `${SUPABASE_URL}/rest/v1/collect_buffer?id=in.${encodeURIComponent(inList)}`,
      {
        method: "PATCH",
        headers: sbHeaders,
        body: JSON.stringify({ status: "pushed" }),
      }
    )
    if (!r.ok) throw new Error(`Patch failed: ${r.status} ${await r.text()}`)
    console.log(`  marked ${Math.min(i + chunkSize, ids.length)}/${ids.length}`)
  }

  console.log(`Done. dataset_size_after=${newSize}, commit=${commitSha}`)
}

main().catch((e) => {
  console.error("FAILED:", e)
  process.exit(1)
})
