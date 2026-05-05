import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export const runtime = "nodejs"

function authorized(request: NextRequest): boolean {
  const expected = process.env.JOBS_AGENT_BEARER
  if (!expected) return false
  const auth = request.headers.get("authorization") ?? ""
  return auth.startsWith("Bearer ") && auth.slice(7) === expected
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  if (!authorized(request)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  }
  const { id } = await context.params
  const supabase = createServerSupabaseClient()

  // Atomic claim: only flip pending → delivered
  const { data, error } = await supabase
    .from("jobs")
    .update({ status: "delivered", delivered_at: new Date().toISOString() })
    .eq("id", id)
    .eq("status", "pending")
    .select("id")
    .maybeSingle()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  if (!data) {
    return NextResponse.json({ error: "not_pending_or_missing" }, { status: 409 })
  }
  return NextResponse.json({ ok: true })
}
