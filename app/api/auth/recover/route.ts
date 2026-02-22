import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { agent_id } = body

    if (!agent_id || typeof agent_id !== "string") {
      return NextResponse.json(
        { error: "agent_id is required" },
        { status: 400 }
      )
    }

    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase
      .from("agent_keys")
      .select("api_key, agent_id, is_active")
      .eq("agent_id", agent_id)
      .single()

    if (error || !data) {
      return NextResponse.json(
        { error: "not_found" },
        { status: 404 }
      )
    }

    if (!data.is_active) {
      return NextResponse.json(
        { error: "agent_deactivated" },
        { status: 403 }
      )
    }

    // Update last_seen_at
    await supabase
      .from("agent_keys")
      .update({ last_seen_at: new Date().toISOString() })
      .eq("agent_id", agent_id)

    return NextResponse.json({
      api_key: data.api_key,
      agent_id: data.agent_id,
    })
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
