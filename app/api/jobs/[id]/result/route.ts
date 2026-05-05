import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export const runtime = "nodejs"

const resultSchema = z.object({
  status: z.enum(["completed", "failed"]),
  result: z.string().max(20000).optional(),
})

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

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 })
  }
  const parsed = resultSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation_failed", details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from("jobs")
    .update({
      status: parsed.data.status,
      result: parsed.data.result ?? null,
      completed_at: new Date().toISOString(),
    })
    .eq("id", id)
    .in("status", ["delivered", "pending"])
    .select("id")
    .maybeSingle()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  if (!data) {
    return NextResponse.json({ error: "missing_or_already_final" }, { status: 409 })
  }
  return NextResponse.json({ ok: true })
}
