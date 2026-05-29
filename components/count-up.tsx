"use client"

import { useEffect, useRef, useState } from "react"

/* Counts a number up from 0 when it scrolls into view. Pure rAF, no
 * animation library. Handles a numeric value with optional prefix/
 * suffix (e.g. "200+"). Non-numeric values (e.g. "24/7") should not use
 * this — render them directly. Honors prefers-reduced-motion. */
export function CountUp({
  value,
  suffix = "",
  duration = 1400,
  className,
}: {
  value: number
  suffix?: string
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches

    let raf = 0
    let start = 0
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        if (reduce) {
          setDisplay(value)
          return
        }
        const tick = (ts: number) => {
          if (!start) start = ts
          const p = Math.min(1, (ts - start) / duration)
          // easeOutCubic
          const eased = 1 - Math.pow(1 - p, 3)
          setDisplay(Math.round(value * eased))
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value, duration])

  return (
    <span ref={ref} className={className}>
      {display.toLocaleString()}
      {suffix}
    </span>
  )
}
