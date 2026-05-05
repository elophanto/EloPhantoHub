import { NextRequest, NextResponse } from "next/server"
import { ulid } from "ulid"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import {
  ELO_MINT,
  ENVELOPE_VERSION,
  JOB_TTL_DAYS,
  JobEnvelope,
  submitJobSchema,
} from "@/lib/jobs/types"
import { signEnvelope } from "@/lib/jobs/sign"
import { sendJobEmail } from "@/lib/jobs/email"
import { verifyJobPayment } from "@/lib/jobs/verify-tx"

export const runtime = "nodejs"

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 })
  }

  const parsed = submitJobSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation_failed", details: parsed.error.flatten() },
      { status: 400 }
    )
  }
  const { task, email, wallet, txSignature } = parsed.data

  const supabase = createServerSupabaseClient()

  // Replay guard before doing chain work
  const { data: existing } = await supabase
    .from("jobs")
    .select("id")
    .eq("tx_signature", txSignature)
    .maybeSingle()
  if (existing) {
    return NextResponse.json(
      { error: "tx_already_used" },
      { status: 409 }
    )
  }

  let amountRaw: bigint
  try {
    const verified = await verifyJobPayment(txSignature, wallet)
    amountRaw = verified.amountRaw
  } catch (e) {
    return NextResponse.json(
      { error: "payment_verification_failed", reason: (e as Error).message },
      { status: 402 }
    )
  }

  const jobId = ulid()
  const now = new Date()
  const expires = new Date(now.getTime() + JOB_TTL_DAYS * 24 * 3600 * 1000)

  const envelope: JobEnvelope = {
    v: ENVELOPE_VERSION,
    jobId,
    task,
    requester: { email, wallet },
    payment: {
      mint: ELO_MINT,
      amount: amountRaw.toString(),
      txSig: txSignature,
    },
    issuedAt: now.toISOString(),
    expiresAt: expires.toISOString(),
  }

  let payload: string
  try {
    payload = signEnvelope(envelope)
  } catch (e) {
    return NextResponse.json(
      { error: "signing_failed", reason: (e as Error).message },
      { status: 500 }
    )
  }

  const { error: insertError } = await supabase.from("jobs").insert({
    id: jobId,
    task,
    email,
    wallet,
    tx_signature: txSignature,
    amount_elo: amountRaw.toString(),
    status: "pending",
    payload,
    expires_at: expires.toISOString(),
  })
  if (insertError) {
    return NextResponse.json(
      { error: "db_insert_failed", reason: insertError.message },
      { status: 500 }
    )
  }

  // Email the signed envelope to AgentMail. Don't fail the request if SMTP
  // breaks — the job is in the DB and the pull endpoint can still deliver it.
  try {
    await sendJobEmail(envelope, payload)
    await supabase
      .from("jobs")
      .update({ delivered_at: new Date().toISOString() })
      .eq("id", jobId)
  } catch (e) {
    console.error("[jobs] email send failed:", e)
  }

  return NextResponse.json({ jobId, expiresAt: envelope.expiresAt })
}
