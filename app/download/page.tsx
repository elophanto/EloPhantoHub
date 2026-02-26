import type { Metadata } from "next"
import { InstallCommand } from "@/components/install-command"

export const metadata: Metadata = {
  title: "Download",
  description: "Install EloPhanto on your machine — macOS, Linux, or Windows (WSL).",
}

export default function DownloadPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-32 pb-24 sm:px-8 sm:pt-40 lg:px-12">
      {/* Header */}
      <div className="mb-20">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          Install
        </span>
        <h1 className="mt-4 text-3xl font-light tracking-tight sm:text-4xl">
          Three commands. That's it.
        </h1>
      </div>

      {/* Steps */}
      <div className="space-y-6 mb-20">
        <InstallCommand label="1. Clone" command="git clone https://github.com/elophanto/EloPhanto.git && cd EloPhanto" />
        <InstallCommand label="2. Setup" command="./setup.sh" />
      </div>

      {/* Start options */}
      <div className="mb-20">
        <span className="mb-8 block font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          3. Start
        </span>
        <div className="grid gap-px border border-border/50 bg-border/50 sm:grid-cols-2">
          <div className="bg-background p-6 sm:p-8">
            <span className="block font-mono text-[10px] uppercase tracking-[0.2em] mb-2">
              Terminal
            </span>
            <p className="mb-4 text-sm text-muted-foreground">
              Chat directly in your terminal.
            </p>
            <InstallCommand command="./start.sh" />
          </div>
          <div className="bg-background p-6 sm:p-8">
            <span className="block font-mono text-[10px] uppercase tracking-[0.2em] mb-2">
              Web Dashboard
            </span>
            <p className="mb-4 text-sm text-muted-foreground">
              Real-time dashboard at localhost:3000.
            </p>
            <InstallCommand command="./start.sh --web" />
          </div>
        </div>
      </div>

      {/* Requirements + Platform notes */}
      <div className="grid gap-px border border-border/50 bg-border/50 sm:grid-cols-2">
        <div className="bg-background p-6 sm:p-8">
          <span className="block font-mono text-[10px] uppercase tracking-[0.2em] mb-4">
            Requirements
          </span>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Python 3.12+</li>
            <li><a href="https://docs.astral.sh/uv/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-foreground">uv</a> package manager</li>
            <li>Node.js 24+ LTS</li>
            <li>Git</li>
          </ul>
        </div>

        <div className="bg-background p-6 sm:p-8">
          <span className="block font-mono text-[10px] uppercase tracking-[0.2em] mb-4">
            Platforms
          </span>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>macOS (Intel & Apple Silicon)</li>
            <li>Linux (Ubuntu 22.04+, Debian 12+, Fedora 38+)</li>
            <li>Windows (requires <a href="https://learn.microsoft.com/en-us/windows/wsl/install" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-foreground">WSL2</a>)</li>
          </ul>
        </div>
      </div>

      {/* Coming soon */}
      <div className="mt-16 flex gap-8">
        <div>
          <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40 mb-2">
            Coming soon
          </span>
          <span className="font-mono text-sm text-muted-foreground/30">
            pip install elophanto
          </span>
        </div>
        <div>
          <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40 mb-2">
            Coming soon
          </span>
          <span className="font-mono text-sm text-muted-foreground/30">
            docker pull elophanto/elophanto
          </span>
        </div>
      </div>
    </div>
  )
}
