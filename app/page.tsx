import Link from "next/link"
import Image from "next/image"
import { InstallCommand } from "@/components/install-command"

const features = [
  { label: "Local-first", detail: "Runs entirely on your machine. Your data stays yours." },
  { label: "Multi-channel", detail: "CLI, Web, Telegram, Discord, Slack — one agent, all channels." },
  { label: "Browser control", detail: "Real Chrome automation with 49 tools using your existing sessions." },
  { label: "MCP tool servers", detail: "Connect any MCP server — filesystem, GitHub, databases, Slack, and more. Agent manages setup through conversation." },
  { label: "Self-evolving", detail: "Learns from tasks, builds its own tools, evolves its identity." },
  { label: "Skill ecosystem", detail: "28 bundled skills + community hub with one-command install." },
  { label: "Agent email", detail: "Own inbox with dual provider support — AgentMail cloud or your SMTP/IMAP server." },
  { label: "Crypto payments", detail: "Agent wallet on Base with spending limits, audit trail, and preview-before-execute." },
  { label: "Web dashboard", detail: "10-page real-time monitoring UI — chat, tools, knowledge, mind, schedule, channels, settings, history." },
  { label: "Document analysis", detail: "PDFs, images, DOCX, XLSX, PPTX, EPUB with OCR and RAG." },
]

const stats = [
  { value: "28", label: "Skills" },
  { value: "107+", label: "Tools" },
  { value: "5", label: "Channels" },
  { value: "MCP", label: "Support" },
  { value: "23", label: "Docs" },
]

function ArchLayer({ label, sublabel, muted = false }: { label: string; sublabel?: string; muted?: boolean }) {
  return (
    <div className={`border border-border/50 px-6 py-5 text-center ${muted ? "bg-card/50" : ""}`}>
      <span className="block font-mono text-[11px] uppercase tracking-[0.2em]">
        {label}
      </span>
      {sublabel && (
        <span className="mt-1.5 block font-mono text-[10px] tracking-[0.1em] text-muted-foreground">
          {sublabel}
        </span>
      )}
    </div>
  )
}

function VerticalLine() {
  return <div className="mx-auto h-8 w-px bg-border/40" />
}

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Geometric circles */}
        <div className="geo-circle right-[10%] top-[15%] h-[500px] w-[500px] hidden lg:block" />
        <div className="geo-circle right-[15%] top-[20%] h-[300px] w-[300px] hidden lg:block" />

        <div className="relative mx-auto max-w-7xl px-6 pt-28 sm:px-8 sm:pt-32 lg:px-12 lg:pt-36">
          {/* Crop mark label */}
          <div className="crop-marks inline-block p-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Self-evolving AI Agent
            </span>
          </div>

          <div className="mt-8 max-w-3xl">
            <h1 className="text-4xl font-light leading-[1.1] tracking-tight sm:text-5xl lg:text-7xl">
              A self-evolving<br />
              AI agent that lives<br />
              on <em className="font-serif italic">your machine.</em>
            </h1>
          </div>

          <p className="mt-10 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            Local-first, multi-channel, browser-capable.
            <br />
            Learns as it works.
          </p>

          <div className="mt-12 max-w-xl space-y-4">
            <InstallCommand command="git clone https://github.com/elophanto/EloPhanto.git && cd EloPhanto && ./setup.sh" />
            <div className="grid grid-cols-2 gap-px border border-border/50 bg-border/50">
              <div className="bg-background px-5 pt-4 pb-5">
                <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground mb-3">
                  Terminal
                </span>
                <InstallCommand command="./start.sh" />
              </div>
              <div className="bg-background px-5 pt-4 pb-5">
                <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground mb-3">
                  Web Dashboard
                </span>
                <InstallCommand command="./start.sh --web" />
              </div>
            </div>
          </div>

          <div className="mt-10 flex items-center gap-8">
            <Link
              href="/download"
              className="font-mono text-xs uppercase tracking-[0.15em] border-b border-foreground pb-1 transition-opacity hover:opacity-60"
            >
              Get Started
            </Link>
            <Link
              href="/hub"
              className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground transition-opacity hover:opacity-100"
              style={{ opacity: 0.5 }}
            >
              Browse Skills
            </Link>
          </div>
        </div>

        {/* Bottom stats */}
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-32 sm:px-8 lg:px-12">
          <div className="flex flex-wrap gap-12 sm:gap-20">
            {stats.map((stat) => (
              <div key={stat.label}>
                <span className="block font-mono text-3xl font-light tabular-nums sm:text-4xl">
                  {stat.value}
                </span>
                <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border/50">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-32 lg:px-12">
          <div className="mb-16">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Capabilities
            </span>
          </div>

          <div className="grid grid-cols-1 gap-px border border-border/50 bg-border/50 sm:grid-cols-2 lg:grid-cols-5">
            {features.map((feature) => (
              <div
                key={feature.label}
                className="bg-background p-6 sm:p-8"
              >
                <h3 className="font-mono text-xs uppercase tracking-[0.1em]">
                  {feature.label}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {feature.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Teaser */}
      <section className="border-t border-border/50">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-32 lg:px-12">
          <div className="mb-16">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Use Cases
            </span>
          </div>

          <div className="grid grid-cols-1 gap-px border border-border/50 bg-border/50 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { number: "01", title: "Autonomous Web Presence", summary: "Creates accounts, builds profiles, participates in communities — over days and weeks." },
              { number: "02", title: "Development Team", summary: "Spawns coding agents in isolated worktrees with cross-model review." },
              { number: "03", title: "Self-Building", summary: "Can't do something yet? It builds the capability, tests it, and deploys." },
              { number: "04", title: "Cross-Platform Intel", summary: "Orchestrates across email, browser, documents, and messaging channels." },
              { number: "05", title: "Revenue Operations", summary: "Finds gigs, delivers work, collects payment — full freelance pipeline." },
              { number: "06", title: "Background Mind", summary: "Runs autonomously between conversations. Evaluates, executes, sleeps, repeats." },
            ].map((uc) => (
              <div key={uc.number} className="bg-background p-6 sm:p-8">
                <span className="font-mono text-2xl font-extralight tabular-nums text-border">
                  {uc.number}
                </span>
                <h3 className="mt-3 font-mono text-xs uppercase tracking-[0.1em]">
                  {uc.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {uc.summary}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/use-cases"
              className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground transition-opacity hover:opacity-100"
              style={{ opacity: 0.5 }}
            >
              View all use cases &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="border-t border-border/50">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-32 lg:px-12">
          <div className="grid items-start gap-16 lg:grid-cols-2">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Architecture
              </span>
              <h2 className="mt-6 text-3xl font-light leading-tight sm:text-4xl">
                Runs locally,<br />connects everywhere.
              </h2>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
                EloPhanto runs on your machine, routes through multiple LLM
                providers, and connects to your channels — all while keeping
                your data private.
              </p>
            </div>

            {/* Architecture Diagram */}
            <div className="flex flex-col items-center lg:pt-8">
              <div className="w-full max-w-md space-y-0">
                <ArchLayer label="Communication" sublabel="CLI &middot; Web &middot; Telegram &middot; Discord &middot; Slack" />
                <VerticalLine />
                <ArchLayer label="Intelligence" sublabel="Multi-provider LLM routing &middot; Context management" />
                <VerticalLine />
                <ArchLayer label="Execution" sublabel="107+ tools &middot; Browser automation &middot; MCP &middot; 28 skills" />
                <VerticalLine />
                <ArchLayer label="Persistence" sublabel="Knowledge &middot; Identity &middot; Memory &middot; Evolution" muted />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
