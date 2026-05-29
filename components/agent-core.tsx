"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

/* The agent's living "core" — the luminous orb from the web dashboard,
 * refined for the marketing site. Pure CSS keyframes (no animation
 * library — Safari-safe). Color shifts are animated via registered
 * @property custom colors (see globals.css), so the sphere's gradient
 * morphs smoothly instead of snapping. Breathing speed is fixed so the
 * timing never jumps; only the hue drifts across an analogous
 * blue→violet palette every few seconds, so it feels alive on a static
 * page. */

type Tone = { c1: string; c2: string; c3: string }

// Analogous blue-violet tones — morph cleanly between each other.
const TONES: Tone[] = [
  { c1: "#efe9ff", c2: "#8b5cf6", c3: "#5b21b6" }, // violet
  { c1: "#e8ecff", c2: "#6d7cf6", c3: "#3730a3" }, // indigo
  { c1: "#e6f3ff", c2: "#5b9df6", c3: "#1e40af" }, // blue
  { c1: "#e8ecff", c2: "#6d7cf6", c3: "#3730a3" }, // indigo
]

export function AgentCore({
  size = 360,
  className,
  cycle = true,
}: {
  size?: number
  className?: string
  cycle?: boolean
}) {
  const [i, setI] = useState(0)

  useEffect(() => {
    if (!cycle) return
    const id = setInterval(() => setI((n) => (n + 1) % TONES.length), 5200)
    return () => clearInterval(id)
  }, [cycle])

  const t = TONES[i]
  const particleCount = 7

  // Colors flow down via inherited @property vars; the transition lives
  // on the root so descendants get interpolated values each frame.
  const rootStyle: React.CSSProperties = {
    width: size,
    height: size,
    // @ts-expect-error custom props
    "--core-c1": t.c1,
    "--core-c2": t.c2,
    "--core-c3": t.c3,
    transition: "--core-c1 1.6s ease, --core-c2 1.6s ease, --core-c3 1.6s ease",
  }

  return (
    <div className={cn("orb relative", className)} style={rootStyle} aria-hidden>
      {/* Soft outer glow — refined, not a flat haze */}
      <div
        className="orb-halo core-anim absolute inset-[8%] rounded-full blur-2xl"
        style={{ background: "var(--core-c2)", animation: "core-glow 5.2s ease-in-out infinite" }}
      />

      {/* Structural rings — thin, instrument-like */}
      <div
        className="core-anim absolute inset-0 rounded-full border"
        style={{ borderColor: "var(--core-c2)", opacity: 0.16, animation: "core-ring 6s ease-in-out infinite" }}
      />
      <div
        className="core-anim absolute inset-[12%] rounded-full border"
        style={{ borderColor: "var(--core-c2)", opacity: 0.28, animation: "core-ring 5.2s ease-in-out infinite reverse" }}
      />
      <div
        className="core-anim absolute inset-[22%] rounded-full border"
        style={{ borderColor: "var(--core-c2)", opacity: 0.45, animation: "core-ring 4.4s ease-in-out infinite" }}
      />

      {/* Orbiting particles — fine, always present (no pop) */}
      <div className="core-anim absolute inset-0" style={{ animation: "core-orbit 16s linear infinite" }}>
        {Array.from({ length: particleCount }).map((_, p) => {
          const angle = (p / particleCount) * 360
          const r = p % 2 === 0 ? 0.46 : 0.34
          return (
            <span
              key={p}
              className="absolute left-1/2 top-1/2 rounded-full"
              style={{
                width: Math.max(1.5, size * 0.012),
                height: Math.max(1.5, size * 0.012),
                background: "var(--core-c1)",
                boxShadow: `0 0 ${size * 0.04}px var(--core-c2)`,
                transform: `rotate(${angle}deg) translateX(${size * r}px)`,
              }}
            />
          )
        })}
      </div>

      {/* The core sphere — glassy, with specular highlight + rim light */}
      <div
        className="core-anim absolute inset-[30%] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 36% 30%, var(--core-c1), var(--core-c2) 50%, var(--core-c3) 100%)",
          boxShadow: `0 0 ${size * 0.22}px var(--core-c2), inset 0 0 ${size * 0.05}px var(--core-c1), inset 0 ${size * -0.04}px ${size * 0.06}px var(--core-c3)`,
          animation: "core-breathe 5.6s ease-in-out infinite",
        }}
      />
      {/* Sharp specular dot */}
      <div
        className="absolute rounded-full"
        style={{
          left: "39%",
          top: "37%",
          width: size * 0.08,
          height: size * 0.08,
          background: "rgba(255,255,255,0.9)",
          filter: `blur(${size * 0.012}px)`,
        }}
      />
    </div>
  )
}
