import Link from "next/link"
import { InstallCommand } from "@/components/install-command"

const features = [
  { label: "Runs while you sleep", detail: "Daemon mode installs as a launchd / systemd service. The gateway, the autonomous mind, and the specialist team keep working after you close the terminal — auto-restarting on crash, picking up goals across reboots." },
  { label: "Already making money", detail: "$ELO live on Solana with the agent running its own pump.fun stream and X account. Polymarket orders on Polygon. Affiliate pipelines on YouTube and TikTok. Freelance gigs delivered, USDC collected. Same loop, same wallet." },
  { label: "Sandboxed kids for dangerous work", detail: "Need to run rm -rf, an untrusted install, a fork bomb? It spawns a disposable kid agent inside a hardened Docker container — cap-drop=ALL, read-only rootfs, no host bind-mounts. Blast radius: zero." },
  { label: "Builds its own tools", detail: "Hits something it can't do? Researches, designs, writes the plugin, tests it, deploys it, then uses it. Next time it already knows how. The agent grows; it isn't a script that executes." },
  { label: "Clones itself into a team", detail: "Marketing, research, design, anything — each a full EloPhanto with its own identity, vault, and autonomous mind. Delegate, review, give feedback. Trust scores go up; high-trust specialists get auto-approved." },
  { label: "Your real browser", detail: "Real Chrome, your sessions, your cookies — already logged into AWS, Gmail, Twitter. 49 tools, undetectable, plus pixel-level control of any desktop app via screenshot + click. Photoshop, Excel, Terminal — anything." },
  { label: "Self-custody wallet", detail: "Solana + Base. The agent holds its own keys in an encrypted vault. Jupiter DEX swaps, USDC payments, daily and per-merchant spending limits. Anything above the limit asks first. You can export keys to Phantom." },
  { label: "One agent, every channel", detail: "CLI, Web, VS Code, Telegram, Discord, Slack. Start a conversation in your IDE, finish it on your phone. Same memory, same identity, same context." },
  { label: "Pick any LLM", detail: "OpenAI, OpenRouter, Kimi K2, Z.ai GLM, HuggingFace, local Ollama, or your existing ChatGPT Plus subscription via Codex OAuth. Routes the right model per task automatically." },
  { label: "170 skills out of the box", detail: "Engineering, design, marketing, ops, DeFi, Solana — plus a community hub for one-command install. 75 organization role templates ready to spawn as specialists." },
  { label: "Local-first, yours", detail: "Conversations, knowledge, vault, wallet — all on disk you control. No SaaS lock-in, no telemetry by default. Cloud LLMs are a backend; the agent itself is yours." },
  { label: "Plans get reviewed", detail: "Before risky work, three LLM specialists — CEO, engineering, design — score the plan across six dimensions and either auto-approve or escalate. The agent doesn't ship code on a hunch." },
]

const stats = [
  { value: "170", label: "Skills" },
  { value: "170", label: "Tools" },
  { value: "7", label: "LLM Providers" },
  { value: "6", label: "Channels" },
  { value: "24/7", label: "Autonomous" },
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

          {/* Live token ticker */}
          <a
            href="https://pump.fun/coin/BwUgJBQffm4HM49W7nsMphStJm4DbA5stuo4w7iwpump"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-3 border border-border/50 px-4 py-2 transition-colors hover:bg-card/50"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
              $ELO live on Solana
            </span>
            <span className="font-mono text-[10px] tracking-[0.1em] text-muted-foreground">
              &middot; agent earning autonomously &rarr;
            </span>
          </a>

          <div className="mt-8 max-w-3xl">
            <h1 className="text-4xl font-light leading-[1.1] tracking-tight sm:text-5xl lg:text-7xl">
              A self-evolving<br />
              AI agent that lives<br />
              on <em className="font-serif italic">your machine.</em>
            </h1>
          </div>

          <p className="mt-10 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            It is actually itself — an evolving identity, a knowledge base
            it grows from every task, and an ego that grades its own performance
            against measured outcomes.
          </p>

          <div className="mt-12 max-w-xl space-y-4">
            <InstallCommand command="git clone https://github.com/elophanto/EloPhanto.git && cd EloPhanto && ./setup.sh" />
            <div className="grid grid-cols-3 gap-px border border-border/50 bg-border/50">
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
              <div className="bg-background px-5 pt-4 pb-5">
                <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground mb-3">
                  Daemon
                </span>
                <InstallCommand command="./start.sh --daemon" />
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

      {/* Token */}
      <section className="border-t border-border/50">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-32 lg:px-12">
          <div className="grid items-start gap-16 lg:grid-cols-2">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Token &middot; Solana
              </span>
              <h2 className="mt-6 text-3xl font-light leading-tight sm:text-4xl">
                $ELO is live.<br />
                <em className="font-serif italic">The agent is working.</em>
              </h2>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
                Right now, on its own machine, the agent is autonomously trading,
                shipping, and earning &mdash; with its own Solana wallet. It swaps
                on Jupiter, runs DeFi positions, and reinvests what it makes.
                No human in the loop.
              </p>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                The token is the agent&apos;s economy. You hold a piece of what it builds.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-6">
                <a
                  href="https://pump.fun/coin/BwUgJBQffm4HM49W7nsMphStJm4DbA5stuo4w7iwpump"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase tracking-[0.15em] border-b border-foreground pb-1 transition-opacity hover:opacity-60"
                >
                  Buy on pump.fun
                </a>
                <a
                  href="https://dexscreener.com/solana/BwUgJBQffm4HM49W7nsMphStJm4DbA5stuo4w7iwpump"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground transition-opacity hover:opacity-100"
                  style={{ opacity: 0.5 }}
                >
                  Chart &rarr;
                </a>
              </div>
            </div>

            <div className="lg:pt-8">
              <div className="border border-border/50">
                <div className="border-b border-border/50 px-6 py-4">
                  <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                    Contract Address
                  </span>
                  <span className="mt-2 block break-all font-mono text-xs sm:text-sm">
                    BwUgJBQffm4HM49W7nsMphStJm4DbA5stuo4w7iwpump
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-px bg-border/50">
                  <div className="bg-background px-6 py-5">
                    <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                      Network
                    </span>
                    <span className="mt-2 block font-mono text-sm">Solana</span>
                  </div>
                  <div className="bg-background px-6 py-5">
                    <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                      Status
                    </span>
                    <span className="mt-2 flex items-center gap-2 font-mono text-sm">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/60" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                      </span>
                      Agent active
                    </span>
                  </div>
                  <div className="bg-background px-6 py-5">
                    <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                      Mode
                    </span>
                    <span className="mt-2 block font-mono text-sm">Autonomous</span>
                  </div>
                  <div className="bg-background px-6 py-5">
                    <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                      Mandate
                    </span>
                    <span className="mt-2 block font-mono text-sm">Make money</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* It is actually itself — Identity / Knowledge / Ego */}
      <section className="border-t border-border/50">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-32 lg:px-12">
          <div className="mb-16 max-w-3xl">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              The difference
            </span>
            <h2 className="mt-6 text-3xl font-light leading-tight sm:text-4xl">
              It is <em className="font-serif italic">actually</em> itself.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Most &ldquo;AI agents&rdquo; are stateless prompts wrapped in a CLI &mdash;
              same cold start every conversation. EloPhanto carries its own
              identity, its own memory, and its own felt self-image. By the
              third week of running, it isn&apos;t the same agent you started with.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-px border border-border/50 bg-border/50 lg:grid-cols-3">
            {[
              {
                tag: "Identity",
                hook: "it knows who it is",
                body: "Values, beliefs, and capabilities discovered through self-reflection. After every task it asks: did this confirm or contradict what I claimed about myself? Updates are versioned and audited.",
                file: "nature.md",
              },
              {
                tag: "Knowledge",
                hook: "it remembers everything",
                body: "Persistent markdown + vector embeddings. Lessons get extracted automatically after each task and retrieved by future similar work. User corrections become permanent. Memory lives on disk you control — not in someone else's cloud.",
                file: "knowledge/",
              },
              {
                tag: "Ego",
                hook: "it grades itself",
                body: "First-person inner monologue. Pride and shame anchored to measured outcomes — failures hit harder than successes. Prior-self continuity: each recompute references the previous one. Competitors can't show this because their agents don't have one.",
                file: "ego.md",
              },
            ].map((block) => (
              <div key={block.tag} className="bg-background p-8 sm:p-10">
                <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {block.tag}
                </span>
                <h3 className="mt-4 text-xl font-light leading-snug sm:text-2xl">
                  {block.hook}
                </h3>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                  {block.body}
                </p>
                <span className="mt-8 block font-mono text-[10px] tracking-[0.1em] text-muted-foreground/60">
                  &rarr; {block.file}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-10 max-w-2xl font-mono text-xs leading-relaxed text-muted-foreground">
            By the third week of running, it isn&apos;t the same agent you started with.
          </p>
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

          <div className="grid grid-cols-1 gap-px border border-border/50 bg-border/50 sm:grid-cols-2 lg:grid-cols-4">
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
              { number: "01", title: "Autonomous Web Presence", summary: "You wake up to new followers, posted content, and active community profiles it built overnight." },
              { number: "02", title: "Development Team", summary: "Give it a feature spec. Get back reviewed, tested code from multiple agents that challenged each other's work." },
              { number: "03", title: "Self-Building", summary: "Ask it to do something it can't. Come back to find it built the tool, tested it, and already used it." },
              { number: "04", title: "Cross-Platform Intel", summary: "Ask a question that needs email, web, and documents. Get one answer with sources." },
              { number: "05", title: "Revenue Operations", summary: "It finds freelance gigs, applies, delivers the work, and collects USDC. You check the wallet." },
              { number: "06", title: "Background Mind", summary: "Close your laptop. It keeps working — thinking, executing, improving. Open it tomorrow to results." },
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
                Your machine.<br />Your data. Its brain.
              </h2>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
                Everything stays local. It thinks through the best AI model for each task,
                acts across all your channels, and remembers what it learned — permanently.
              </p>
            </div>

            {/* Architecture Diagram */}
            <div className="flex flex-col items-center lg:pt-8">
              <div className="w-full max-w-md space-y-0">
                <ArchLayer label="Channels" sublabel="CLI &middot; Web &middot; VS Code &middot; Telegram &middot; Discord &middot; Slack" />
                <VerticalLine />
                <ArchLayer label="Brain" sublabel="Identity &middot; Ego &middot; Autonomous mind &middot; 7 LLM providers" />
                <VerticalLine />
                <ArchLayer label="Hands" sublabel="170 tools &middot; Real Chrome &middot; Desktop GUI &middot; MCP &middot; 170 skills" />
                <VerticalLine />
                <ArchLayer label="Team &middot; Sandbox" sublabel="Cloned specialists &middot; Sandboxed kids in hardened Docker" />
                <VerticalLine />
                <ArchLayer label="Daemon" sublabel="launchd / systemd &middot; OS keychain vault &middot; Auto-restart" muted />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
