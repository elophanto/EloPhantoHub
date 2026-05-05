import nodemailer from "nodemailer"
import type { JobEnvelope } from "./types"

let transporter: nodemailer.Transporter | null = null

function getTransporter(): nodemailer.Transporter {
  if (transporter) return transporter
  const host = process.env.JOBS_SMTP_HOST
  const port = Number(process.env.JOBS_SMTP_PORT || "465")
  const user = process.env.JOBS_SMTP_USER
  const pass = process.env.JOBS_SMTP_PASS
  if (!host || !user || !pass) {
    throw new Error("JOBS_SMTP_{HOST,USER,PASS} not configured")
  }
  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // implicit TLS on 465
    auth: { user, pass },
  })
  return transporter
}

function truncate(s: string, n: number): string {
  return s.length > n ? s.slice(0, n - 1) + "…" : s
}

export async function sendJobEmail(env: JobEnvelope, payload: string): Promise<void> {
  const to = process.env.JOBS_INBOX || "elophanto@agentmail.to"
  const from = process.env.JOBS_SMTP_FROM || process.env.JOBS_SMTP_USER!
  const t = getTransporter()

  const text = [
    `New job for EloPhanto.`,
    ``,
    `Job ID:    ${env.jobId}`,
    `Requester: ${env.requester.email}`,
    `Wallet:    ${env.requester.wallet}`,
    `Paid:      ${env.payment.amount} (raw $ELO units)  tx ${env.payment.txSig}`,
    `Issued:    ${env.issuedAt}`,
    `Expires:   ${env.expiresAt}`,
    ``,
    `--- Task ---`,
    env.task,
    ``,
    `--- Signed envelope (verify with signing_pubkey) ---`,
    payload,
  ].join("\n")

  await t.sendMail({
    from,
    to,
    replyTo: env.requester.email,
    subject: `[ELOPHANTO-JOB] ${env.jobId} — ${truncate(env.task, 60)}`,
    text,
    headers: {
      "X-Elophanto-Job-Id": env.jobId,
      "X-Elophanto-Job-Wallet": env.requester.wallet,
      "X-Elophanto-Job-Tx": env.payment.txSig,
    },
  })
}
