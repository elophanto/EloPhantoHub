import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InstallCommand } from "@/components/install-command"

export const metadata: Metadata = {
  title: "Download",
  description: "Install EloPhanto on your machine — macOS, Linux, or Windows (WSL).",
}

export default function DownloadPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 pt-32 pb-24 sm:px-8 sm:pt-40 lg:px-12">
      {/* Header */}
      <div className="mb-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          Install
        </span>
        <h1 className="mt-4 text-3xl font-light tracking-tight sm:text-4xl">
          Get EloPhanto<br />running in under a minute.
        </h1>
      </div>

      {/* Install Methods */}
      <div className="mb-20 grid gap-px border border-border/50 bg-border/50 md:grid-cols-3">
        <div className="bg-background p-6 sm:p-8">
          <div className="mb-4 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
              Git Clone
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground/60">
              Recommended
            </span>
          </div>
          <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
            Clone the repo and run the setup script. Works everywhere.
          </p>
          <InstallCommand command="git clone https://github.com/elophanto/EloPhanto.git" />
        </div>

        <div className="bg-background p-6 opacity-40 sm:p-8">
          <div className="mb-4 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
              pip
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground/60">
              Coming Soon
            </span>
          </div>
          <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
            Install via Python package manager. One command.
          </p>
          <div className="border border-border/30 px-5 py-3.5">
            <code className="font-mono text-sm text-muted-foreground">
              pip install elophanto
            </code>
          </div>
        </div>

        <div className="bg-background p-6 opacity-40 sm:p-8">
          <div className="mb-4 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
              Docker
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground/60">
              Coming Soon
            </span>
          </div>
          <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
            Run in a container. Fully isolated environment.
          </p>
          <div className="border border-border/30 px-5 py-3.5">
            <code className="font-mono text-sm text-muted-foreground">
              docker pull elophanto/elophanto
            </code>
          </div>
        </div>
      </div>

      {/* Platform Tabs */}
      <div className="mb-20">
        <span className="mb-8 block font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          Setup by Platform
        </span>
        <Tabs defaultValue="macos">
          <TabsList className="bg-transparent border-b border-border/50 rounded-none p-0 h-auto gap-0">
            <TabsTrigger value="macos" className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none font-mono text-[11px] uppercase tracking-[0.1em] px-4 py-2.5">
              macOS
            </TabsTrigger>
            <TabsTrigger value="linux" className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none font-mono text-[11px] uppercase tracking-[0.1em] px-4 py-2.5">
              Linux
            </TabsTrigger>
            <TabsTrigger value="windows" className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none font-mono text-[11px] uppercase tracking-[0.1em] px-4 py-2.5">
              Windows
            </TabsTrigger>
          </TabsList>

          <TabsContent value="macos" className="mt-8">
            <p className="mb-6 text-sm text-muted-foreground">
              Requires Python 3.12+, <a href="https://docs.astral.sh/uv/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-foreground">uv</a> package manager, and Node.js 24+ LTS.
            </p>
            <div className="space-y-4">
              <InstallCommand label="1. Clone" command="git clone https://github.com/elophanto/EloPhanto.git && cd EloPhanto" />
              <InstallCommand label="2. Setup" command="./setup.sh" />
              <InstallCommand label="3. Start" command="./start.sh" />
            </div>
          </TabsContent>

          <TabsContent value="linux" className="mt-8">
            <p className="mb-6 text-sm text-muted-foreground">
              Tested on Ubuntu 22.04+, Debian 12+, and Fedora 38+. Requires Python 3.12+, <a href="https://docs.astral.sh/uv/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-foreground">uv</a>, and Node.js 24+ LTS.
            </p>
            <div className="space-y-4">
              <InstallCommand label="1. Clone and setup" command="git clone https://github.com/elophanto/EloPhanto.git && cd EloPhanto && ./setup.sh" />
              <InstallCommand label="2. Start" command="./start.sh" />
            </div>
          </TabsContent>

          <TabsContent value="windows" className="mt-8">
            <p className="mb-6 text-sm text-muted-foreground">
              Requires WSL2 with Ubuntu. Native Windows is not supported yet.
            </p>
            <div className="space-y-4">
              <InstallCommand label="1. Install WSL2" command="wsl --install" />
              <InstallCommand label="2. Inside WSL" command="git clone https://github.com/elophanto/EloPhanto.git && cd EloPhanto && ./setup.sh" />
              <InstallCommand label="3. Start" command="./start.sh" />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Quick Start */}
      <div>
        <span className="mb-8 block font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          Quick Start
        </span>
        <p className="mb-6 text-sm text-muted-foreground">
          After setup, just start the agent.
        </p>
        <InstallCommand command="./start.sh" />
      </div>
    </div>
  )
}
