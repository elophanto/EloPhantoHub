import { Connection, PublicKey } from "@solana/web3.js"
import { ELO_MINT } from "./types"

const MAX_TX_AGE_SECONDS = 600 // 5 min RPC drift + slack

function getConnection(): Connection {
  const rpc = process.env.SOLANA_RPC_URL
  if (!rpc) throw new Error("SOLANA_RPC_URL not set")
  return new Connection(rpc, "confirmed")
}

function getTreasury(): PublicKey {
  const t = process.env.ELOPHANTO_TREASURY_WALLET
  if (!t) throw new Error("ELOPHANTO_TREASURY_WALLET not set")
  return new PublicKey(t)
}

function getMinPayment(): bigint {
  const v = process.env.JOB_PRICE_ELO_RAW
  if (!v) throw new Error("JOB_PRICE_ELO_RAW not set (raw token units)")
  return BigInt(v)
}

export interface VerifiedPayment {
  amountRaw: bigint
  blockTime: number
}

/**
 * Verify an SPL token transfer on Solana.
 *  - tx is confirmed, recent
 *  - it transfers >= JOB_PRICE_ELO_RAW of $ELO
 *  - sender token-account owner = `claimedSender`
 *  - destination token-account owner = treasury
 */
export async function verifyJobPayment(
  txSignature: string,
  claimedSender: string
): Promise<VerifiedPayment> {
  const conn = getConnection()
  const treasury = getTreasury()
  const minAmount = getMinPayment()
  const sender = new PublicKey(claimedSender)

  const tx = await conn.getParsedTransaction(txSignature, {
    maxSupportedTransactionVersion: 0,
    commitment: "confirmed",
  })
  if (!tx) throw new Error("transaction not found")
  if (tx.meta?.err) throw new Error("transaction failed on-chain")

  const blockTime = tx.blockTime ?? 0
  const ageSec = Math.floor(Date.now() / 1000) - blockTime
  if (blockTime === 0 || ageSec > MAX_TX_AGE_SECONDS) {
    throw new Error("transaction is too old or missing block time")
  }

  // Find a token-balance delta showing the transfer:
  //   sender lost >= minAmount  AND  treasury gained >= minAmount  (same mint).
  const pre = tx.meta?.preTokenBalances ?? []
  const post = tx.meta?.postTokenBalances ?? []

  // index → owner+mint+amount
  type Bal = { owner: string; mint: string; amount: bigint }
  const toBal = (b: { owner?: string; mint: string; uiTokenAmount: { amount: string } }): Bal => ({
    owner: b.owner ?? "",
    mint: b.mint,
    amount: BigInt(b.uiTokenAmount.amount),
  })

  // Sum deltas per (owner, mint)
  const deltas = new Map<string, bigint>()
  const key = (owner: string, mint: string) => `${owner}|${mint}`
  for (const b of pre) {
    const x = toBal(b)
    deltas.set(key(x.owner, x.mint), (deltas.get(key(x.owner, x.mint)) ?? BigInt(0)) - x.amount)
  }
  for (const b of post) {
    const x = toBal(b)
    deltas.set(key(x.owner, x.mint), (deltas.get(key(x.owner, x.mint)) ?? BigInt(0)) + x.amount)
  }

  const senderDelta = deltas.get(key(sender.toBase58(), ELO_MINT)) ?? BigInt(0)
  const treasuryDelta = deltas.get(key(treasury.toBase58(), ELO_MINT)) ?? BigInt(0)

  if (treasuryDelta < minAmount) {
    throw new Error("treasury did not receive required $ELO amount")
  }
  if (-senderDelta < minAmount) {
    throw new Error("sender did not debit required $ELO amount")
  }

  return { amountRaw: treasuryDelta, blockTime }
}
