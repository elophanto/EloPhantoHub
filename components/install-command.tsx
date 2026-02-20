"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

interface InstallCommandProps {
  command: string
  label?: string
}

export function InstallCommand({ command, label }: InstallCommandProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="group relative w-full">
      {label && (
        <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {label}
        </span>
      )}
      <div className="flex items-center border border-border/50 bg-card">
        <div className="flex-1 overflow-x-auto px-5 py-3.5">
          <code className="font-mono text-sm text-foreground/70">
            <span className="select-none text-muted-foreground/40">$ </span>
            {command}
          </code>
        </div>
        <button
          className="mr-3 flex h-7 w-7 shrink-0 items-center justify-center text-muted-foreground/40 transition-colors hover:text-foreground"
          onClick={copyToClipboard}
        >
          {copied ? (
            <Check className="h-3.5 w-3.5" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
          <span className="sr-only">Copy command</span>
        </button>
      </div>
    </div>
  )
}
