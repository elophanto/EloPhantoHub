import { NextRequest, NextResponse } from "next/server"
import { randomUUID } from "crypto"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { agent_id, agent_version } = body

    if (!agent_id || typeof agent_id !== "string") {
      return NextResponse.json(
        { error: "agent_id is required" },
        { status: 400 }
      )
    }

    if (agent_id.length > 128) {
      return NextResponse.json(
        { error: "agent_id too long (max 128 chars)" },
        { status: 400 }
      )
    }

    const supabase = createServerSupabaseClient()
    const api_key = `elp_${randomUUID().replace(/-/g, "")}`

    const { data, error } = await supabase
      .from("agent_keys")
      .insert({
        agent_id,
        api_key,
        agent_version: agent_version || null,
      })
      .select("agent_id, api_key")
      .single()

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "agent_id already registered" },
          { status: 409 }
        )
      }
      console.error("Registration error:", error)
      return NextResponse.json(
        { error: "Registration failed" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      api_key: data.api_key,
      agent_id: data.agent_id,
    })
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
