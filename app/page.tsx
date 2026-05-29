import type { Metadata } from "next"
import Link from "next/link"
import { JsonLd } from "@/components/json-ld"
import { InstallCommand } from "@/components/install-command"
import { ProductShowcase } from "@/components/product-showcase"
import { SelfModelWidget } from "@/components/self-model-widget"
import { AgentCore } from "@/components/agent-core"
import { Reveal } from "@/components/reveal"
import { CountUp } from "@/components/count-up"
import { absoluteUrl, createMetadata, siteConfig } from "@/lib/seo"

export const metadata: Metadata = createMetadata({
  title: "EloPhanto - The Autonomous AI Agent With a Self-Model",
  description:
    "EloPhanto is an open-source autonomous AI agent that works on its own, learns from every task, and builds the tools it's missing. A real self-model – identity, ego, and affect – grounded in published psychology. Run it on your own machine or in the cloud.",
  path: "/",
  keywords: [
    "AI agent",
    "autonomous AI agent",
    "local AI agent",
    "self-evolving AI agent",
    "agent self-model",
    "browser automation AI agent",
    "AI coding agent",
    "open source AI agent",
  ],
})

const homeStructuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/icon-512.png"),
    sameAs: [
      "https://github.com/elophanto/EloPhanto",
      "https://github.com/elophanto/elophantohub",
      "https://x.com/EloPhanto",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "macOS, Linux, Windows via WSL",
    url: siteConfig.url,
    downloadUrl: absoluteUrl("/download"),
    softwareHelp: absoluteUrl("/use-cases"),
    description:
      "An open-source autonomous AI agent with an evolving self-model – identity, ego, and affect – plus browser automation, self-extension, a specialist swarm, and decentralized agent-to-agent networking. Run it on your own machine or in the cloud.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  },
]

const features = [
  { label: "It learns how you work", detail: "Correct it once and it keeps the lesson. Findings from every task load automatically on the next similar one, so you stop explaining the same thing twice." },
  { label: "It builds its own tools", detail: "Hit a task it can't do? It researches, writes the tool, tests it, and uses it, then has it ready forever. The agent grows; it isn't a fixed script." },
  { label: "It works while you sleep", detail: "Daemon mode keeps the mind thinking between your messages and across reboots. Close the laptop, come back to finished work." },
  { label: "It becomes a team", detail: "When work goes parallel it spawns specialist clones, each a full agent with its own memory. Risky plans get reviewed by three models before anything ships." },
  { label: "Your real browser, your accounts", detail: "Real Chrome with your own sessions and cookies, 49 tools, plus pixel-level control of any desktop app. Already logged in everywhere you are." },
  { label: "Dangerous work, contained", detail: "It runs rm -rf, untrusted installs, anything risky inside a locked-down throwaway container that can't touch your machine. Blast radius: zero." },
]

const stats: { to?: number; suffix?: string; text?: string; label: string }[] = [
  { to: 200, suffix: "+", label: "Tools" },
  { to: 177, suffix: "+", label: "Skills" },
  { to: 2400, suffix: "+", label: "Tests" },
  { to: 7, label: "LLM Providers" },
  { text: "24/7", label: "Autonomous" },
]

function ArchLayer({ label, sublabel, muted = false }: { label: string; sublabel?: string; muted?: boolean }) {
  return (
    <div className={`border border-border/50 px-6 py-4 text-center ${muted ? "bg-card/50" : ""}`}>
      <span className="block font-mono text-[11px] uppercase tracking-[0.2em]">{label}</span>
      {sublabel && (
        <span className="mt-1.5 block font-mono text-[10px] tracking-[0.1em] text-muted-foreground">
          {sublabel}
        </span>
      )}
    </div>
  )
}

function VerticalLine() {
  return <div className="mx-auto h-6 w-px bg-border/40" />
}

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <JsonLd data={homeStructuredData} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* The agent's living core – the orb from the dashboard */}
        <div className="pointer-events-none absolute inset-0 z-0 hidden lg:block">
          <div className="relative mx-auto h-full max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="absolute right-0 top-24 opacity-90 xl:right-2">
              <AgentCore size={280} />
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 pt-28 sm:px-8 sm:pt-32 lg:px-12 lg:pt-36">
          <div className="crop-marks inline-block p-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Open-source autonomous AI agent
            </span>
          </div>

          <div className="mt-8 max-w-6xl">
            <h1 className="text-4xl font-light leading-[1.04] tracking-[-0.02em] sm:text-5xl lg:text-7xl xl:text-[5rem]">
              Your own AI agent.<br />
              It works while you sleep<br />
              <em className="font-serif italic">and improves itself.</em>
            </h1>
          </div>

          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            ChatGPT and Claude wait for your next prompt. EloPhanto doesn&apos;t. Give it a goal and
            it codes, browses, researches, and runs the long jobs on its own &ndash; then keeps
            working while you sleep. It learns from every task and builds the tools it&apos;s missing,
            so every week it does more and gets harder to replace. Run it on your own machine or in
            the cloud; the agent is yours either way.
          </p>

          <div className="mt-12 max-w-2xl space-y-4">
            <InstallCommand command="git clone https://github.com/elophanto/EloPhanto.git && cd EloPhanto && ./setup.sh" />
            <div className="grid grid-cols-3 gap-px border border-border/50 bg-border/50">
              <div className="bg-background px-5 pt-4 pb-5">
                <span className="mb-3 block font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Terminal</span>
                <InstallCommand command="./start.sh" />
              </div>
              <div className="bg-background px-5 pt-4 pb-5">
                <span className="mb-3 block font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Web Dashboard</span>
                <InstallCommand command="./start.sh --web" />
              </div>
              <div className="bg-background px-5 pt-4 pb-5">
                <span className="mb-3 block font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Daemon</span>
                <InstallCommand command="./start.sh --daemon" />
              </div>
            </div>
            <p className="font-mono text-[10px] tracking-[0.1em] text-muted-foreground/60">
              A few minutes to set up: one API key, or your existing ChatGPT login. Then you&apos;re talking to it.
            </p>
          </div>

          <div className="mt-10 flex items-center gap-8">
            <Link href="/download" className="font-mono text-xs uppercase tracking-[0.15em] border-b border-foreground pb-1 transition-opacity hover:opacity-60">
              Get Started
            </Link>
            <a href="https://github.com/elophanto/EloPhanto" target="_blank" rel="noopener noreferrer" className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground transition-opacity hover:opacity-100" style={{ opacity: 0.5 }}>
              Star on GitHub &rarr;
            </a>
          </div>
        </div>

        <Reveal as="div" className="mx-auto max-w-7xl px-6 pb-20 pt-28 sm:px-8 lg:px-12">
          <div className="flex flex-wrap gap-12 sm:gap-20">
            {stats.map((stat) => (
              <div key={stat.label}>
                <span className="block font-mono text-3xl font-light tabular-nums sm:text-4xl">
                  {stat.text ? stat.text : <CountUp value={stat.to ?? 0} suffix={stat.suffix} />}
                </span>
                <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* The self-model – the lead differentiator */}
      <section className="border-t border-border/50">
        <Reveal as="div" className="mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-32 lg:px-12">
          <div className="mb-16 max-w-3xl">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              The difference
            </span>
            <h2 className="mt-6 text-3xl font-light leading-tight sm:text-4xl">
              Three layers, each <em className="font-serif italic">mechanically wired.</em>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              The LLM never writes its own numbers. Confidence moves on real failure signals;
              emotion runs on a substrate that decays over time. This is what makes the third
              week of running feel different from the first &ndash; a self-image that has been
              hurt, recovered, and revised.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-px border border-border/50 bg-border/50 lg:grid-cols-3">
            {[
              {
                tag: "Identity",
                hook: "who it claims to be",
                body: "Values, beliefs, and capabilities discovered through reflection, written to a nature.md the agent edits over time. You name it in the setup wizard; the rename propagates end-to-end across DB, knowledge, dashboard, and LLM context.",
                cite: "nature.md · docs/17-IDENTITY",
              },
              {
                tag: "Ego",
                hook: "how reality graded that claim",
                body: "Per-capability confidence moved by three real failure channels: tool outcomes, verification PASS/FAIL, and a 13-rule user-correction detector. Failures hit harder than successes; unused capabilities decay. Grounded in Higgins' Self-Discrepancy Theory.",
                cite: "core/ego.py · docs/17",
              },
              {
                tag: "Affect",
                hook: "what it's feeling right now",
                body: "State-level emotion on a PAD substrate with OCC appraisal labels. Three channels decay over minutes-to-hours. Corrections fire frustration, checkpoints fire pride. Biases router temperature, prompt tone, and risk appetite.",
                cite: "core/affect.py · docs/69-AFFECT",
              },
            ].map((block) => (
              <div key={block.tag} className="bg-background p-8 sm:p-10">
                <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{block.tag}</span>
                <h3 className="mt-4 text-xl font-light leading-snug sm:text-2xl">{block.hook}</h3>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{block.body}</p>
                <span className="mt-8 block font-mono text-[10px] tracking-[0.1em] text-muted-foreground/50">&rarr; {block.cite}</span>
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Ego is who the agent has <span className="text-foreground">become</span>; affect is who it{" "}
            <span className="text-foreground">is right now</span>. Built on{" "}
            <a href="https://www.columbia.edu/cu/psychology/higgins/papers/HIGGINS=PSYCH%20REVIEW%201987.pdf" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-foreground">Higgins (1987)</a>,{" "}
            <a href="https://en.wikipedia.org/wiki/PAD_emotional_state_model" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-foreground">Mehrabian&apos;s PAD</a>, and{" "}
            <a href="https://en.wikipedia.org/wiki/Ortony,_Clore,_and_Collins_model" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-foreground">OCC appraisal</a>. To our knowledge, no other open-source autonomous agent ships all of this.
          </p>

          {/* Live widget */}
          <div className="mt-14">
            <div className="mb-5 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                The self-model, live
              </span>
              <span className="font-mono text-[10px] tracking-[0.1em] text-muted-foreground/50">
                as rendered in the dashboard
              </span>
            </div>
            <Reveal><SelfModelWidget /></Reveal>
          </div>
        </Reveal>
      </section>

      {/* Product proof */}
      <section className="border-t border-border/50">
        <Reveal as="div" className="mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-32 lg:px-12">
          <div className="mb-16 max-w-3xl">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              The product
            </span>
            <h2 className="mt-6 text-3xl font-light leading-tight sm:text-4xl">
              This is the <em className="font-serif italic">actual</em> software.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              A terminal chat and a real-time web dashboard, shipping today. Watch the mind think,
              browse the knowledge it built, audit every tool call, and inspect the ego and affect
              for yourself.
            </p>
          </div>
          <Reveal><ProductShowcase /></Reveal>
        </Reveal>
      </section>

      {/* How it grows */}
      <section className="border-t border-border/50">
        <Reveal as="div" className="mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-32 lg:px-12">
          <div className="mb-16 max-w-3xl">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              How it grows
            </span>
            <h2 className="mt-6 text-3xl font-light leading-tight sm:text-4xl">
              Useful in minutes.<br /><em className="font-serif italic">Irreplaceable in weeks.</em>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              From the first message it has 200+ tools and every channel, and it does real work
              right away. What changes over the weeks is how well it knows your work, how much it
              does on its own, and how much you let it.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-px border border-border/50 bg-border/50 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { phase: "Day 1", title: "Working immediately", body: "Clone it, name it, go. 200+ tools and every channel are live from the first message. You approve each action while you get the measure of it." },
              { phase: "Week 1", title: "It learns your way", body: "You correct mistakes and it keeps them. Every “no” or “not like that” is caught and saved as a lesson it won't repeat." },
              { phase: "Week 2", title: "It stops asking", body: "Lessons load automatically on similar tasks, skills kick in, and the safe work starts auto-approving. You stop repeating yourself." },
              { phase: "Week 3+", title: "It runs itself", body: "Goals run across sessions, the background mind works between your messages, and specialist clones take whole workstreams. You're the operator, not the driver." },
            ].map((step) => (
              <div key={step.phase} className="bg-background p-6 sm:p-8">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{step.phase}</span>
                <h3 className="mt-3 font-mono text-xs uppercase tracking-[0.1em]">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Capabilities */}
      <section className="border-t border-border/50">
        <Reveal as="div" className="mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-32 lg:px-12">
          <div className="mb-16 max-w-3xl">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Capabilities</span>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              200+ tools, 177+ skills, seven model providers (including your own ChatGPT
              subscription), its own wallet and inbox, and every major channel. A few of the
              things that means in practice:
            </p>
          </div>
          <div className="grid grid-cols-1 gap-px border border-border/50 bg-border/50 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.label} className="bg-background p-6 sm:p-8">
                <h3 className="font-mono text-xs uppercase tracking-[0.1em]">{feature.label}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{feature.detail}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* One entity, not a persona stable */}
      <section className="border-t border-border/50">
        <Reveal as="div" className="mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-32 lg:px-12">
          <div className="grid items-start gap-16 lg:grid-cols-2">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                The foundation
              </span>
              <h2 className="mt-6 text-3xl font-light leading-tight sm:text-4xl">
                One entity.<br /><em className="font-serif italic">Not a persona stable.</em>
              </h2>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
                Other &ldquo;agent platforms&rdquo; host N character personas behind one engine &ndash;
                swap the SOUL.md, swap the bot. EloPhanto is structurally different: this
                installation <span className="text-foreground">is</span> one agent. One identity, one
                wallet, one self-model grown over weeks. When you want more, you spawn another full
                EloPhanto &ndash; separate vault, separate wallet, separate self-model. Peers, not personas.
              </p>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                It gets harder to replace the longer it runs. That&apos;s the architecture, and
                everything else stands on it.
              </p>
            </div>
            <div className="lg:pt-4">
              <div className="grid grid-cols-1 gap-px border border-border/50 bg-border/50">
                {[
                  { k: "Ego", v: "accumulates per-capability confidence – for whom, if the persona is swappable per request?" },
                  { k: "Affect", v: "carries state between calls – whose frustration, whose pride?" },
                  { k: "One wallet", v: "builds on-chain reputation – five personas sharing one wallet is dilution." },
                  { k: "Calibration", v: "tracks a Brier score for this predictor – meaningless for a rotating set of facades." },
                  { k: "Peer trust", v: "pins known-hosts per PeerID – multiple personas behind one key would break it." },
                ].map((row) => (
                  <div key={row.k} className="bg-background px-6 py-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.15em]">{row.k}</span>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{row.v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Use Cases Teaser */}
      <section className="border-t border-border/50">
        <Reveal as="div" className="mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-32 lg:px-12">
          <div className="mb-16">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Use Cases</span>
          </div>
          <div className="grid grid-cols-1 gap-px border border-border/50 bg-border/50 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { number: "01", title: "Ship a SaaS overnight", summary: "“Build me an invoice SaaS.” It validates the market, plans the MVP, spawns coding agents in isolated worktrees, deploys to Vercel + Supabase. You approve at each gate." },
              { number: "02", title: "Development team", summary: "Give it a feature spec. Get back reviewed, tested code from multiple agents – Claude Code, Codex, Gemini – that challenged each other's work." },
              { number: "03", title: "Self-building", summary: "Ask it to do something it can't. Come back to find it built the tool, tested it, and already used it. Next time it just knows how." },
              { number: "04", title: "Cross-platform intel", summary: "Ask a question that needs email, web, and documents. Get one answer with sources, gathered across channels." },
              { number: "05", title: "Persistent specialists", summary: "“I need ongoing marketing and research.” It spawns clones with their own mind, vault, and schedule. Teach through feedback; trust-scoring auto-approves the good ones." },
              { number: "06", title: "Background mind", summary: "Close your laptop. The daemon keeps the mind thinking, executing, improving. Open it tomorrow to results." },
            ].map((uc) => (
              <div key={uc.number} className="bg-background p-6 sm:p-8">
                <span className="font-mono text-2xl font-extralight tabular-nums text-border">{uc.number}</span>
                <h3 className="mt-3 font-mono text-xs uppercase tracking-[0.1em]">{uc.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{uc.summary}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link href="/use-cases" className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground transition-opacity hover:opacity-100" style={{ opacity: 0.5 }}>
              View all use cases &rarr;
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Architecture */}
      <section className="border-t border-border/50">
        <Reveal as="div" className="mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-32 lg:px-12">
          <div className="grid items-start gap-16 lg:grid-cols-2">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Architecture</span>
              <h2 className="mt-6 text-3xl font-light leading-tight sm:text-4xl">
                You stay <em className="font-serif italic">in control.</em>
              </h2>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
                Run it on your own machine or in the cloud. One WebSocket gateway, one set of
                sessions across every channel, and a permission gate on every risky action.
                Nothing happens on its own until you say so.
              </p>
            </div>
            <div className="flex flex-col items-center lg:pt-4">
              <div className="w-full max-w-md space-y-0">
                <ArchLayer label="Channels" sublabel="CLI · Web · VS Code · Telegram · Discord · Slack" />
                <VerticalLine />
                <ArchLayer label="Gateway · Permissions" sublabel="One WebSocket · unified sessions · gate every risky action" />
                <VerticalLine />
                <ArchLayer label="Self-Model" sublabel="Identity · Ego (Higgins) · Affect (PAD + OCC)" />
                <VerticalLine />
                <ArchLayer label="Autonomous Mind · RLM" sublabel="Background think loop · recursive cognition" />
                <VerticalLine />
                <ArchLayer label="Tools · Skills · Team" sublabel="200+ tools · 177+ skills · cloned specialists · sandboxed kids" />
                <VerticalLine />
                <ArchLayer label="Decentralized Peers" sublabel="libp2p · Ed25519 · DHT · hole-punching" muted />
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
