"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import {
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js"
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_2022_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  createTransferCheckedInstruction,
  getAssociatedTokenAddress,
  getMint,
} from "@solana/spl-token"
import {
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react"
import dynamic from "next/dynamic"
import { ArrowRight, Check, Loader2, AlertCircle } from "lucide-react"

// WalletMultiButton renders different markup on mount (icon span) than during
// SSR, which triggers React hydration warnings. Load it client-only.
const WalletMultiButton = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then(
      (m) => m.WalletMultiButton
    ),
  { ssr: false }
)

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const ELO_MINT = new PublicKey(
  "BwUgJBQffm4HM49W7nsMphStJm4DbA5stuo4w7iwpump"
)
const PRICE_ELO = Number(process.env.NEXT_PUBLIC_JOB_PRICE_ELO || "100000")
const TREASURY = process.env.NEXT_PUBLIC_TREASURY_WALLET || ""

type Stage = "compose" | "paying" | "submitting" | "done" | "error"

export function JobForm() {
  const { connection } = useConnection()
  const { publicKey, sendTransaction, connected } = useWallet()

  const [task, setTask] = useState("")
  const [email, setEmail] = useState("")
  const [stage, setStage] = useState<Stage>("compose")
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [jobId, setJobId] = useState<string | null>(null)

  const [decimals, setDecimals] = useState<number | null>(null)
  const [tokenProgramId, setTokenProgramId] = useState<PublicKey | null>(null)
  const [balance, setBalance] = useState<number | null>(null)
  const [balanceError, setBalanceError] = useState<string | null>(null)
  const [usd, setUsd] = useState<number | null>(null)

  const treasuryPubkey = useMemo(() => {
    try {
      return TREASURY ? new PublicKey(TREASURY) : null
    } catch {
      return null
    }
  }, [])

  const priceRaw = useMemo(() => {
    if (decimals === null) return null
    return BigInt(PRICE_ELO) * BigInt(10) ** BigInt(decimals)
  }, [decimals])

  // Detect token program (legacy SPL vs Token-2022) + decimals once
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const info = await connection.getAccountInfo(ELO_MINT)
        if (!info) throw new Error("mint account not found via RPC")
        const programId = info.owner.equals(TOKEN_2022_PROGRAM_ID)
          ? TOKEN_2022_PROGRAM_ID
          : TOKEN_PROGRAM_ID
        const m = await getMint(connection, ELO_MINT, undefined, programId)
        if (!cancelled) {
          setTokenProgramId(programId)
          setDecimals(m.decimals)
        }
      } catch (e) {
        console.error("[hire] mint detection failed:", e)
        if (!cancelled) {
          setBalanceError(
            `RPC error reading $ELO mint: ${(e as Error).message}. Check NEXT_PUBLIC_SOLANA_RPC.`
          )
        }
      }
    })()
    return () => {
      cancelled = true
    }
  }, [connection])

  // Load balance when wallet connects
  useEffect(() => {
    if (!publicKey || decimals === null || !tokenProgramId) {
      setBalance(null)
      return
    }
    let cancelled = false
    ;(async () => {
      try {
        const ata = await getAssociatedTokenAddress(
          ELO_MINT,
          publicKey,
          false,
          tokenProgramId,
          ASSOCIATED_TOKEN_PROGRAM_ID
        )
        const acc = await connection.getTokenAccountBalance(ata)
        if (!cancelled) {
          setBalance(Number(acc.value.uiAmount ?? 0))
          setBalanceError(null)
        }
      } catch (e) {
        console.error("[hire] balance read failed:", e)
        if (!cancelled) {
          // ATA not found = 0 balance (legitimate). Other errors = surface them.
          const msg = (e as Error).message ?? ""
          if (msg.includes("could not find account")) {
            setBalance(0)
          } else {
            setBalanceError(`Balance lookup failed: ${msg}`)
            setBalance(null)
          }
        }
      }
    })()
    return () => {
      cancelled = true
    }
  }, [publicKey, connection, decimals, tokenProgramId])

  // Best-effort USD price (Jupiter)
  useEffect(() => {
    let cancelled = false
    fetch(`https://price.jup.ag/v6/price?ids=${ELO_MINT.toBase58()}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        const p = j?.data?.[ELO_MINT.toBase58()]?.price
        if (!cancelled && typeof p === "number") setUsd(p * PRICE_ELO)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  const validCompose = task.trim().length >= 10 && /\S+@\S+\.\S+/.test(email)
  const insufficient =
    balance !== null && balance < PRICE_ELO

  const handlePay = useCallback(async () => {
    setErrorMsg(null)
    if (
      !publicKey ||
      !treasuryPubkey ||
      decimals === null ||
      priceRaw === null ||
      !tokenProgramId
    ) {
      setErrorMsg("Wallet or treasury not ready.")
      return
    }
    setStage("paying")
    try {
      const fromAta = await getAssociatedTokenAddress(
        ELO_MINT,
        publicKey,
        false,
        tokenProgramId,
        ASSOCIATED_TOKEN_PROGRAM_ID
      )
      const toAta = await getAssociatedTokenAddress(
        ELO_MINT,
        treasuryPubkey,
        false,
        tokenProgramId,
        ASSOCIATED_TOKEN_PROGRAM_ID
      )

      const ixs: TransactionInstruction[] = []
      const toInfo = await connection.getAccountInfo(toAta)
      if (!toInfo) {
        ixs.push(
          createAssociatedTokenAccountInstruction(
            publicKey,
            toAta,
            treasuryPubkey,
            ELO_MINT,
            tokenProgramId,
            ASSOCIATED_TOKEN_PROGRAM_ID
          )
        )
      }
      ixs.push(
        createTransferCheckedInstruction(
          fromAta,
          ELO_MINT,
          toAta,
          publicKey,
          priceRaw,
          decimals,
          [],
          tokenProgramId
        )
      )

      const { blockhash, lastValidBlockHeight } =
        await connection.getLatestBlockhash("confirmed")
      const tx = new Transaction({
        feePayer: publicKey,
        blockhash,
        lastValidBlockHeight,
      }).add(...ixs)

      const sig = await sendTransaction(tx, connection)
      await connection.confirmTransaction(
        { signature: sig, blockhash, lastValidBlockHeight },
        "confirmed"
      )

      setStage("submitting")
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          task: task.trim(),
          email: email.trim(),
          wallet: publicKey.toBase58(),
          txSignature: sig,
        }),
      })
      const json = await res.json()
      if (!res.ok) {
        throw new Error(json?.reason || json?.error || "submission failed")
      }
      setJobId(json.jobId)
      setStage("done")
    } catch (e) {
      setErrorMsg((e as Error).message || "Something went wrong.")
      setStage("error")
    }
  }, [publicKey, treasuryPubkey, decimals, priceRaw, connection, sendTransaction, task, email])

  if (stage === "done" && jobId) {
    return (
      <div className="border border-border/50 p-8">
        <div className="flex items-center gap-3">
          <Check className="h-4 w-4 text-emerald-500" />
          <span className="font-mono text-[11px] uppercase tracking-[0.2em]">
            Job submitted
          </span>
        </div>
        <p className="mt-6 font-light text-lg">
          EloPhanto received your job and will reply to{" "}
          <span className="font-mono">{email}</span> within 24 hours.
        </p>
        <div className="mt-8 grid gap-px bg-border/50 sm:grid-cols-2">
          <div className="bg-background p-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Job ID
            </div>
            <div className="mt-2 font-mono text-xs break-all">{jobId}</div>
          </div>
          <div className="bg-background p-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Reply to
            </div>
            <div className="mt-2 font-mono text-xs break-all">{email}</div>
          </div>
        </div>
        <div className="mt-8 flex gap-3">
          <Button asChild variant="outline" size="sm">
            <Link href="/">Back to home</Link>
          </Button>
          <Button
            size="sm"
            onClick={() => {
              setStage("compose")
              setTask("")
              setJobId(null)
            }}
          >
            Submit another <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="border border-border/50">
      {/* Step 1: Task */}
      <div className="border-b border-border/50 p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            01 — The task
          </span>
          <span className="font-mono text-[10px] tracking-[0.1em] text-muted-foreground">
            {task.length} / 4000
          </span>
        </div>
        <textarea
          value={task}
          onChange={(e) => setTask(e.target.value.slice(0, 4000))}
          placeholder="Describe what you want EloPhanto to do. Be specific. The agent will read this and execute."
          rows={6}
          className="mt-4 w-full resize-y border border-input bg-transparent p-3 text-sm font-light leading-relaxed outline-none transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
        />
      </div>

      {/* Step 2: Email */}
      <div className="border-b border-border/50 p-6 sm:p-8">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          02 — Where to send the result
        </span>
        <Input
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-4"
        />
      </div>

      {/* Step 3: Wallet + payment */}
      <div className="p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            03 — Pay {PRICE_ELO.toLocaleString()} $ELO
          </span>
          {usd !== null && (
            <span className="font-mono text-[10px] tracking-[0.1em] text-muted-foreground">
              ≈ ${usd.toFixed(2)}
            </span>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <WalletMultiButton />
          {connected && publicKey && (
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              Balance:{" "}
              {balance === null
                ? "…"
                : `${balance.toLocaleString(undefined, { maximumFractionDigits: 2 })} $ELO`}
            </span>
          )}
        </div>

        {connected && insufficient && (
          <div className="mt-6 border border-border/50 p-5">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-3.5 w-3.5 text-amber-500" />
              <div className="text-sm font-light">
                Not enough $ELO. Swap from SOL or USDC on Jupiter, then come
                back.
                <div className="mt-3">
                  <Button asChild variant="outline" size="sm">
                    <a
                      href={`https://jup.ag/swap?sell=So11111111111111111111111111111111111111112&buy=${ELO_MINT.toBase58()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Swap to $ELO →
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {!treasuryPubkey && (
          <div className="mt-4 font-mono text-[10px] tracking-[0.1em] text-amber-500">
            Treasury wallet not configured (NEXT_PUBLIC_TREASURY_WALLET).
          </div>
        )}

        {balanceError && (
          <div className="mt-4 border border-amber-500/40 p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-3.5 w-3.5 text-amber-500" />
              <div className="font-mono text-xs leading-relaxed text-amber-500">
                {balanceError}
              </div>
            </div>
          </div>
        )}

        {errorMsg && (
          <div className="mt-4 border border-destructive/50 p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-3.5 w-3.5 text-destructive" />
              <div className="font-mono text-xs text-destructive">{errorMsg}</div>
            </div>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between">
          <span className="font-mono text-[10px] tracking-[0.1em] text-muted-foreground">
            Payment goes to EloPhanto&rsquo;s self-custody wallet.
          </span>
          <Button
            onClick={handlePay}
            disabled={
              !validCompose ||
              !connected ||
              !treasuryPubkey ||
              insufficient ||
              !tokenProgramId ||
              decimals === null ||
              stage === "paying" ||
              stage === "submitting"
            }
          >
            {stage === "paying" && (
              <>
                <Loader2 className="h-3 w-3 animate-spin" /> Confirming payment…
              </>
            )}
            {stage === "submitting" && (
              <>
                <Loader2 className="h-3 w-3 animate-spin" /> Submitting…
              </>
            )}
            {stage !== "paying" && stage !== "submitting" && (
              <>
                Pay &amp; submit <ArrowRight className="h-3 w-3" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
