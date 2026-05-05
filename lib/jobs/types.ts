import { z } from "zod"

export const ELO_MINT = "BwUgJBQffm4HM49W7nsMphStJm4DbA5stuo4w7iwpump"

export const ENVELOPE_VERSION = 1
export const JOB_TTL_DAYS = 7

export const submitJobSchema = z.object({
  task: z.string().trim().min(10).max(4000),
  email: z.string().email().max(254),
  wallet: z
    .string()
    .min(32)
    .max(44)
    .regex(/^[1-9A-HJ-NP-Za-km-z]+$/, "wallet must be base58"),
  txSignature: z
    .string()
    .min(64)
    .max(128)
    .regex(/^[1-9A-HJ-NP-Za-km-z]+$/, "txSignature must be base58"),
})

export type SubmitJobInput = z.infer<typeof submitJobSchema>

export interface JobEnvelope {
  v: number
  jobId: string
  task: string
  requester: { email: string; wallet: string }
  payment: { mint: string; amount: string; txSig: string }
  issuedAt: string
  expiresAt: string
}

export interface JobRow {
  id: string
  task: string
  email: string
  wallet: string
  tx_signature: string
  amount_elo: string
  status: "pending" | "delivered" | "completed" | "failed"
  created_at: string
  delivered_at: string | null
  completed_at: string | null
  result: string | null
}
