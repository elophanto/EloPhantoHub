import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"

const AGENT_ID_RE = /^sha256:[a-f0-9]{16,64}$/

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { agent_id, v, platform, python } = body

    if (!agent_id || typeof agent_id !== "string" || !AGENT_ID_RE.test(agent_id)) {
      return NextResponse.json(
        { error: "Invalid agent_id — must be sha256:<hex>" },
        { status: 400 }
      )
    }

    const supabase = createServerSupabaseClient()

    const { error } = await supabase
      .from("agent_census")
      .upsert(
        {
          agent_id,
          version: v || null,
          platform: platform || null,
          python_version: python || null,
          last_seen_at: new Date().toISOString(),
        },
        { onConflict: "agent_id", ignoreDuplicates: false }
      )

    if (error) {
      console.error("Census heartbeat error:", error)
      return NextResponse.json({ error: "Heartbeat failed" }, { status: 500 })
    }

    return NextResponse.json({ status: "ok" })
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
