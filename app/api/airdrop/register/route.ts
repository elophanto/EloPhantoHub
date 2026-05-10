import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { PublicKey } from "@solana/web3.js"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export const runtime = "nodejs"

const bodySchema = z.object({
  wallet: z.string().min(32).max(64),
  balance: z.number().nonnegative(),
})

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 })
  }

  const parsed = bodySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation_failed", details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  try {
    new PublicKey(parsed.data.wallet)
  } catch {
    return NextResponse.json({ error: "invalid_wallet" }, { status: 400 })
  }

  const supabase = createServerSupabaseClient()
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    null
  const ua = request.headers.get("user-agent") || null

  const { error } = await supabase
    .from("airdrop_registrations")
    .upsert(
      {
        wallet: parsed.data.wallet,
        balance_at_registration: parsed.data.balance,
        ip,
        user_agent: ua,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "wallet" }
    )

  if (error) {
    return NextResponse.json(
      { error: "db_upsert_failed", reason: error.message },
      { status: 500 }
    )
  }

  return NextResponse.json({ ok: true })
}
