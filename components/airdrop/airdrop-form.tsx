"use client"

import { useCallback, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { PublicKey } from "@solana/web3.js"
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_2022_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
  getMint,
} from "@solana/spl-token"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { AlertCircle, Check, Loader2, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

const WalletMultiButton = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then((m) => m.WalletMultiButton),
  { ssr: false }
)

const ELO_MINT = new PublicKey(
  "BwUgJBQffm4HM49W7nsMphStJm4DbA5stuo4w7iwpump"
)

type Stage = "idle" | "registering" | "registered" | "error"

export function AirdropForm() {
  const { connection } = useConnection()
  const { publicKey, connected } = useWallet()

  const [tokenProgramId, setTokenProgramId] = useState<PublicKey | null>(null)
  const [decimals, setDecimals] = useState<number | null>(null)
  const [balance, setBalance] = useState<number | null>(null)
  const [balanceError, setBalanceError] = useState<string | null>(null)

  const [stage, setStage] = useState<Stage>("idle")
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  // Same pattern as /hire: detect Token-2022 vs legacy SPL + decimals once.
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
        if (!cancelled) {
          setBalanceError(
            `RPC error reading $ELO mint: ${(e as Error).message}.`
          )
        }
      }
    })()
    return () => {
      cancelled = true
    }
  }, [connection])

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
        if (!cancelled) {
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

  // Reset registration UI when wallet changes.
  useEffect(() => {
    setStage("idle")
    setErrorMsg(null)
  }, [publicKey])

  const handleRegister = useCallback(async () => {
    if (!publicKey || balance === null) return
    setStage("registering")
    setErrorMsg(null)
    try {
      const res = await fetch("/api/airdrop/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          wallet: publicKey.toBase58(),
          balance,
        }),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(json?.reason || json?.error || "registration failed")
      }
      setStage("registered")
    } catch (e) {
      setErrorMsg((e as Error).message || "Something went wrong.")
      setStage("error")
    }
  }, [publicKey, balance])

  return (
    <div className="border border-border/50">
      <div className="border-b border-border/50 p-6 sm:p-8">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          01 – Connect your Solana wallet
        </span>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <WalletMultiButton />
          {connected && publicKey && (
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              {publicKey.toBase58().slice(0, 4)}…{publicKey.toBase58().slice(-4)}
            </span>
          )}
        </div>
      </div>

      <div className="border-b border-border/50 p-6 sm:p-8">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          02 – Current $ELO balance
        </span>
        <div className="mt-4 font-mono text-2xl font-extralight tabular-nums">
          {!connected
            ? "–"
            : balance === null
            ? "…"
            : `${balance.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })} $ELO`}
        </div>
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
          Your balance is read live from the Solana mainnet. Eligibility at
          snapshot time is determined by continuous holding history, not the
          balance shown here.
        </p>

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
      </div>

      <div className="p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            03 – Register for the snapshot
          </span>
          <span className="font-mono text-[10px] tracking-[0.1em] text-muted-foreground">
            Snapshot Dec 31, 2026
          </span>
        </div>

        <p className="mt-4 text-sm font-light leading-relaxed text-muted-foreground">
          Registration is optional. It helps us prioritize scanning your
          wallet during verification, but is not required to qualify.
          Eligibility is determined by on-chain holding history, not by
          registration.
        </p>

        {errorMsg && (
          <div className="mt-4 border border-destructive/50 p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-3.5 w-3.5 text-destructive" />
              <div className="font-mono text-xs text-destructive">
                {errorMsg}
              </div>
            </div>
          </div>
        )}

        {stage === "registered" && (
          <div className="mt-4 border border-emerald-500/40 p-4">
            <div className="flex items-start gap-3">
              <Check className="mt-0.5 h-3.5 w-3.5 text-emerald-500" />
              <div className="font-mono text-xs leading-relaxed text-emerald-500">
                Wallet registered. Keep ≥500,000 $ELO in this wallet through
                the snapshot on Dec 31, 2026 to qualify.
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between">
          <span className="font-mono text-[10px] tracking-[0.1em] text-muted-foreground">
            One wallet per registration. Re-registering updates the record.
          </span>
          <Button
            onClick={handleRegister}
            disabled={
              !connected ||
              balance === null ||
              stage === "registering" ||
              stage === "registered"
            }
          >
            {stage === "registering" && (
              <>
                <Loader2 className="h-3 w-3 animate-spin" /> Registering…
              </>
            )}
            {stage === "registered" && <>Registered</>}
            {stage !== "registering" && stage !== "registered" && (
              <>
                Register wallet <ArrowRight className="h-3 w-3" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
