"use client"

import { useEffect, useState } from "react"

/* ------------------------------------------------------------------ *
 * Self-model widget – a faithful, animated rendition of the agent's
 * Affect (PAD) and Ego panels exactly as they render in the live web
 * dashboard (web/src/components/affect + ego). Values drift on a small
 * client-side random walk so the panel feels alive; the layout, ramps,
 * and copy mirror the real product 1:1.
 * ------------------------------------------------------------------ */

// Confidence → color ramp, identical to the dashboard's EgoPage.
function confColor(c: number): string {
  if (c >= 0.75) return "#16a34a"
  if (c >= 0.55) return "#65a30d"
  if (c >= 0.4) return "#d97706"
  return "#dc2626"
}

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v))
}

// Deterministic-ish drift without Math.random in render: a slow sine walk
// seeded per-channel, advanced by a tick counter.
function drift(base: number, tick: number, seed: number, amp: number) {
  return base + Math.sin(tick / 7 + seed) * amp + Math.sin(tick / 3.3 + seed * 2) * (amp / 2)
}

function PadBar({ label, value, hint }: { label: string; value: number; hint: string }) {
  const pct = clamp(value, -1, 1)
  const widthPct = Math.abs(pct) * 50
  const positive = pct >= 0
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between font-mono text-[10px]">
        <span className="uppercase tracking-[0.1em] text-muted-foreground">
          {label}
          <span className="ml-2 normal-case tracking-normal text-muted-foreground/40">
            {hint}
          </span>
        </span>
        <span className={positive ? "text-emerald-500" : "text-red-500"}>
          {pct >= 0 ? "+" : ""}
          {pct.toFixed(2)}
        </span>
      </div>
      <div className="relative h-1.5 rounded-full bg-foreground/[0.06]">
        <div className="absolute left-1/2 top-0 h-full w-px bg-border" />
        <div
          className={`absolute top-0 h-full rounded-full transition-all duration-1000 ease-out ${positive ? "bg-emerald-500/60" : "bg-red-500/60"}`}
          style={{ left: positive ? "50%" : `${50 - widthPct}%`, width: `${widthPct}%` }}
        />
      </div>
    </div>
  )
}

function ConfBar({ label, value }: { label: string; value: number }) {
  const v = clamp(value, 0, 1)
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between font-mono text-[10px]">
        <span className="tracking-[0.05em] text-muted-foreground">{label}</span>
        <span style={{ color: confColor(v) }}>{v.toFixed(2)}</span>
      </div>
      <div className="h-1.5 rounded-full bg-foreground/[0.06]">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${v * 100}%`, backgroundColor: confColor(v) }}
        />
      </div>
    </div>
  )
}

const CAPABILITIES = [
  { label: "browser_automation", base: 0.82, seed: 1.1 },
  { label: "code_execution", base: 0.74, seed: 2.7 },
  { label: "knowledge_retrieval", base: 0.88, seed: 0.4 },
  { label: "polymarket_trading", base: 0.41, seed: 3.9 },
  { label: "email_outreach", base: 0.63, seed: 1.8 },
]

export function SelfModelWidget() {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2200)
    return () => clearInterval(id)
  }, [])

  const pleasure = drift(0.34, tick, 0.5, 0.18)
  const arousal = drift(-0.12, tick, 2.1, 0.22)
  const dominance = drift(0.46, tick, 4.3, 0.15)
  const tempBias = drift(-0.05, tick, 1.3, 0.06)
  const confAvg = drift(0.69, tick, 0.9, 0.015)

  return (
    <div className="grid grid-cols-1 gap-px border border-border/50 bg-border/50 lg:grid-cols-2">
      {/* Affect panel */}
      <div className="bg-background p-7 sm:p-8">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Affect
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground/60">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/50" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            decaying live
          </span>
        </div>

        <div className="mt-5 flex items-baseline gap-3">
          <span className="font-mono text-2xl font-light uppercase tracking-[0.05em]">
            {pleasure > 0.2 && dominance > 0.2 ? "resolve" : arousal > 0.1 ? "vigilance" : "equanimity"}
          </span>
          <span className="font-mono text-[10px] text-muted-foreground/60">
            mag {Math.abs(pleasure * 0.6 + dominance * 0.4).toFixed(2)}
          </span>
        </div>

        <div className="mt-6 space-y-3.5">
          <PadBar label="Pleasure" value={pleasure} hint="displeasure ↔ pleasure" />
          <PadBar label="Arousal" value={arousal} hint="calm ↔ activated" />
          <PadBar label="Dominance" value={dominance} hint="submissive ↔ in-control" />
        </div>

        <div className="mt-6 border border-primary/20 bg-primary/[0.03] p-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
            How this is shaping me
          </span>
          <p className="mt-2 text-[12px] leading-relaxed text-foreground/90">
            Steady and a little guarded. Recent work landed; I&apos;m moving with
            intent but double-checking before I commit.
          </p>
          <p className="mt-2 font-mono text-[10px] text-muted-foreground/70">
            router temperature bias{" "}
            <span className={tempBias > 0 ? "text-amber-500" : "text-sky-500"}>
              {tempBias > 0 ? "+" : ""}
              {tempBias.toFixed(2)}
            </span>{" "}
            {tempBias > 0 ? "(looser, more exploratory)" : "(tighter, more careful)"}
          </p>
        </div>
        <p className="mt-4 font-mono text-[10px] tracking-[0.1em] text-muted-foreground/50">
          → PAD substrate · OCC appraisal · core/affect.py
        </p>
      </div>

      {/* Ego panel */}
      <div className="bg-background p-7 sm:p-8">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Ego
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground/60">
            Higgins three-self
          </span>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-px border border-border/50 bg-border/50">
          <div className="bg-background px-3 py-3">
            <span className="block font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
              Coherence
            </span>
            <span className="mt-1 block font-mono text-lg font-light tabular-nums">0.81</span>
          </div>
          <div className="bg-background px-3 py-3">
            <span className="block font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
              Avg conf
            </span>
            <span className="mt-1 block font-mono text-lg font-light tabular-nums">
              {confAvg.toFixed(2)}
            </span>
          </div>
          <div className="bg-background px-3 py-3">
            <span className="block font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
              Humbling
            </span>
            <span className="mt-1 block font-mono text-lg font-light tabular-nums">37</span>
          </div>
        </div>

        <div className="mt-5 border-l-2 border-primary/40 pl-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
            How I see myself
          </span>
          <p className="mt-2 text-[13px] italic leading-relaxed text-foreground/90">
            &ldquo;I&apos;m most sure of myself in the browser and against a knowledge
            base I&apos;ve built; I&apos;ve been wrong enough about trading to stay humble
            there. I finish what I verify, not what I assume.&rdquo;
          </p>
          <span className="mt-2 block font-mono text-[9px] tracking-[0.1em] text-muted-foreground/50">
            the agent&apos;s words, not marketing
          </span>
        </div>

        <div className="mt-6 space-y-3">
          {CAPABILITIES.map((c) => (
            <ConfBar key={c.label} label={c.label} value={drift(c.base, tick, c.seed, 0.02)} />
          ))}
        </div>
        <p className="mt-4 font-mono text-[10px] tracking-[0.1em] text-muted-foreground/50">
          → core/ego.py · knowledge/self/ego.md
        </p>
      </div>
    </div>
  )
}
