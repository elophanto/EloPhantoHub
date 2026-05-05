import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export const runtime = "nodejs"

function authorized(request: NextRequest): boolean {
  const expected = process.env.JOBS_AGENT_BEARER
  if (!expected) return false
  const auth = request.headers.get("authorization") ?? ""
  if (!auth.startsWith("Bearer ")) return false
  return auth.slice(7) === expected
}

export async function GET(request: NextRequest) {
  if (!authorized(request)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  }
  const supabase = createServerSupabaseClient()
  const { searchParams } = new URL(request.url)
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "20", 10), 100)

  const { data, error } = await supabase
    .from("jobs")
    .select("id, payload, created_at")
    .eq("status", "pending")
    .order("created_at", { ascending: true })
    .limit(limit)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({
    jobs: (data ?? []).map((r) => ({
      jobId: r.id,
      payload: r.payload,
      createdAt: r.created_at,
    })),
  })
}
