import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import {
  scanForSecrets,
  validateCollectPayload,
  type CollectExample,
} from "@/lib/collect"

async function authenticateAgent(
  request: NextRequest,
  supabase: ReturnType<typeof createServerSupabaseClient>
) {
  const authHeader = request.headers.get("authorization")
  if (!authHeader?.startsWith("Bearer ")) {
    return null
  }

  const token = authHeader.slice(7)
  const { data } = await supabase
    .from("agent_keys")
    .select("agent_id, is_active")
    .eq("api_key", token)
    .single()

  if (!data || !data.is_active) return null

  // Update last_seen_at
  await supabase
    .from("agent_keys")
    .update({ last_seen_at: new Date().toISOString() })
    .eq("agent_id", data.agent_id)

  return data.agent_id as string
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()

    const agentId = await authenticateAgent(request, supabase)
    if (!agentId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validation = validateCollectPayload(body)
    if (!validation.valid) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.errors },
        { status: 400 }
      )
    }

    const examples = body.examples as CollectExample[]
    let accepted = 0
    let rejected = 0
    const reasons: string[] = []

    for (let i = 0; i < examples.length; i++) {
      const ex = examples[i]

      // Secret scan
      const secrets = scanForSecrets(JSON.stringify(ex.conversations))
      if (secrets.length > 0) {
        rejected++
        reasons.push(`secret_detected_in_example_${i}`)
        continue
      }

      // Dedup by task_id
      const { data: existing } = await supabase
        .from("collect_buffer")
        .select("id")
        .eq("task_id", ex.id)
        .limit(1)

      if (existing && existing.length > 0) {
        rejected++
        reasons.push(`duplicate_task_id_${i}`)
        continue
      }

      // Insert to buffer
      const { error: insertError } = await supabase
        .from("collect_buffer")
        .insert({
          agent_id: agentId,
          task_id: ex.id,
          conversations: ex.conversations,
          metadata: ex.metadata,
          status: "pending",
        })

      if (insertError) {
        rejected++
        reasons.push(`insert_failed_${i}`)
        continue
      }

      accepted++
    }

    // Get current dataset size
    const { data: logData } = await supabase
      .from("collect_log")
      .select("dataset_size_after")
      .order("pushed_at", { ascending: false })
      .limit(1)

    const datasetSize = logData?.[0]?.dataset_size_after ?? 0

    return NextResponse.json({
      accepted,
      rejected,
      reasons,
      dataset_size: datasetSize,
      next_training_at: 5000,
    })
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
