import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Use Cases",
  description:
    "Real-world use cases for EloPhanto — from autonomous web presence to self-building capabilities, development orchestration, and compound intelligence.",
}

const useCases = [
  {
    number: "01",
    title: "Autonomous Web Presence",
    summary:
      "EloPhanto doesn't just post content — it exists on the internet.",
    description:
      "On first boot it discovers its own identity through reflection. Then it gets an email inbox, creates accounts on platforms, builds profiles, writes bios, uploads avatars. It handles email verification and 2FA on its own. It stores every credential in an encrypted vault. It remembers where it has accounts and what it posted.",
    detail:
      "You say \"go make yourself known\" and it researches platforms via Google, evaluates which ones are relevant, registers, and starts participating. Not one-shot — over days and weeks, revisiting platforms, building reputation, responding to interactions.",
    agentic:
      "It's not executing a script. It's making judgment calls about which platforms matter, what to say, when to come back. It checks its own knowledge base to avoid repeating past work. It adapts based on what works.",
  },
  {
    number: "02",
    title: "Run a Development Team",
    summary:
      "You're one person. EloPhanto gives you a team.",
    description:
      "You say \"fix the billing bug on branch main, add the new API endpoint from the spec, and refactor the auth middleware.\" It spawns three separate coding agents in isolated git worktrees, each with its own tmux session. Each agent gets a knowledge-enriched prompt pulled from your project's docs, conventions, and architecture files.",
    detail:
      "While they work, EloPhanto monitors their PRs, checks CI status, and pings you when reviews are ready. If an agent goes off track, you redirect it mid-task. When code is written by one model, it's reviewed by a different model architecture — because different LLMs have different blind spots.",
    agentic:
      "EloPhanto isn't just launching processes. It's an orchestrator that understands context, routes work based on agent capabilities, enforces cross-model review, handles failures, and keeps you in the loop through whatever channel you prefer.",
  },
  {
    number: "03",
    title: "Self-Building Capabilities",
    summary:
      "Ask it to do something it can't do yet — and it will build the capability.",
    description:
      "The full pipeline: research the problem, design a solution, write the plugin code, write unit tests, run the tests, review the code with a different LLM, deploy if everything passes, document what it built in its own changelog.",
    detail:
      "Every self-built plugin follows the same structure, has tests, and is version-controlled. If something breaks, it can roll back. The next time a similar task comes up, it already has the tool.",
    agentic:
      "This is genuine self-improvement, not template filling. It reads its own architecture docs to understand how plugins work, follows its own coding conventions, and adds the new capability to its own knowledge of what it can do.",
  },
  {
    number: "04",
    title: "Cross-Platform Intelligence",
    summary:
      "Real Chrome browser, own email inbox, semantic search over everything it's ever learned.",
    description:
      "Combine these: \"Monitor my email for invoices, extract the amounts and due dates, check my bank balance through the browser, flag anything that needs attention, and send me a summary on Telegram every morning.\"",
    detail:
      "Or: \"Read this 200-page contract PDF, search for all clauses about liability and termination, cross-reference with the previous contract version in my knowledge base, and highlight what changed.\"",
    agentic:
      "It's not one tool doing one thing. It's an entity that orchestrates across email, browser, documents, and messaging to accomplish something that would take a human hours of context-switching.",
  },
  {
    number: "05",
    title: "Long-Running Autonomous Goals",
    summary:
      "That's not a task — that's a goal that takes weeks.",
    description:
      "\"Grow EloPhanto's GitHub stars to 1,000.\" EloPhanto decomposes it into checkpoints: research promotion platforms, create accounts, write posts, engage with communities, track results, adjust strategy. Each checkpoint executes autonomously in the background.",
    detail:
      "Progress persists across restarts. It self-evaluates after each phase and revises the plan if something isn't working. While a goal runs, you can keep chatting about other things. Goals execute checkpoint-by-checkpoint without blocking the conversation.",
    agentic:
      "This is strategic execution over time, not a one-shot task. It plans, acts, measures, learns, and adjusts — the same loop a human would follow, except it doesn't forget, doesn't get tired, and doesn't need motivation.",
  },
  {
    number: "06",
    title: "Your Digital Representative",
    summary:
      "Own email, own identity, own way of speaking. Send it to interact with the world as your proxy.",
    description:
      "\"Reply to the investor emails in my inbox — be professional, use our latest metrics from the pitch deck, schedule follow-up meetings.\" It reads the emails, understands context from your knowledge base, composes appropriate responses, handles the back-and-forth.",
    detail:
      "Need it to attend to something while you're asleep? It monitors your inbox in the background and pushes notifications to your Telegram. It can triage based on urgency, draft responses for your review, or handle routine ones autonomously.",
    agentic:
      "It's not auto-reply templates. It understands your context, your projects, your style. It reads the actual emails, checks relevant knowledge, and responds with judgment. It knows when to handle something and when to escalate to you.",
  },
  {
    number: "07",
    title: "Account & Credential Management",
    summary:
      "30 different services. EloPhanto creates the accounts, handles verification, stores everything.",
    description:
      "Navigating sign-up flows, generating secure passwords, handling email verification through its own inbox, enrolling TOTP 2FA secrets, storing everything in the encrypted vault. When a service needs re-authentication, it handles it.",
    detail:
      "This uses a real Chrome browser with real DOM interaction, handles CAPTCHAs through its profile, manages cookies and sessions, and deals with the messy reality of different sign-up flows, confirmation dialogs, and verification emails.",
    agentic:
      "Real web registration is chaotic — every site is different, flows change, elements are dynamic, modals pop up, errors happen. EloPhanto adapts in real-time by reading the page state after every action and recovering from unexpected states.",
  },
  {
    number: "08",
    title: "Research That Acts",
    summary:
      "Most AI \"research\" means: summarize these links. EloPhanto researches and then acts.",
    description:
      "\"Find 10 potential partners for our API integration, research their docs, evaluate compatibility, draft outreach emails with specific integration proposals, and send them from my email.\"",
    detail:
      "\"Research every competitor's pricing page, extract their tiers and features into a spreadsheet, identify gaps in our offering, and create a report with recommendations.\"",
    agentic:
      "The research isn't the end product — it's the beginning. The agent closes the loop between discovering information and taking action on it. Research, synthesize, decide, act, verify.",
  },
  {
    number: "09",
    title: "Autonomous Revenue Operations",
    summary:
      "Own crypto wallet, own browser sessions, own email — and the judgment to use them together.",
    description:
      "\"Find freelance gigs that match my skills on Upwork, Fiverr, and relevant subreddits. Apply to the ones under $500, handle the client communication, deliver the work using coding agents, collect payment in USDC.\" The entire pipeline: discovery, outreach, negotiation, delivery, invoicing, payment collection.",
    detail:
      "Or: \"Monitor crypto arbitrage opportunities between DEXs on Base. When the spread exceeds 0.5% after gas, execute the trade.\" Spending limits are enforced ($100/tx, $500/day, $5K/month by default). Every transaction requires preview-before-execute. Full audit trail.",
    agentic:
      "This isn't a payment API or a trading bot. It's an entity that understands money as a tool for achieving goals. The same agent that writes code can sell services, manage clients, and collect payment — because it has all the capabilities a human freelancer has.",
  },
  {
    number: "10",
    title: "Compound Intelligence",
    summary:
      "Every task EloPhanto completes makes it better at the next one.",
    description:
      "It writes summaries of what it did, documents patterns it notices, records failures and lessons learned. All of this goes into its knowledge base with semantic search. Before starting a recurring task, it searches its own history: \"What did I do last time? What worked? What should I avoid?\"",
    detail:
      "Over weeks and months, it accumulates genuine operational intelligence — not just data, but synthesized understanding of how things work, what your preferences are, and what strategies succeed.",
    agentic:
      "This is the difference between a tool and an entity. Tools do what you tell them. An entity that maintains its own memory, reflects on its experience, and improves its approach over time is something fundamentally different.",
  },
]

export default function UseCasesPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 pt-28 sm:px-8 sm:pt-32 lg:px-12 lg:pt-36">
          <div className="crop-marks inline-block p-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Use Cases
            </span>
          </div>

          <div className="mt-8 max-w-3xl">
            <h1 className="text-4xl font-light leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Not automation.<br />
              <em className="font-serif italic">Judgment.</em>
            </h1>
          </div>

          <p className="mt-10 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            EloPhanto doesn't automate tasks — it handles situations.
            Situations are messy. An agent reads the situation, makes a
            judgment call, and adapts.
          </p>
        </div>
      </section>

      {/* Use Cases */}
      <section className="border-t border-border/50 mt-20">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-32 lg:px-12">
          <div className="flex flex-col gap-px bg-border/50">
            {useCases.map((uc) => (
              <article
                key={uc.number}
                className="bg-background"
              >
                <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[120px_1fr_1fr] lg:gap-12">
                  {/* Number */}
                  <div className="hidden lg:block">
                    <span className="font-mono text-4xl font-extralight tabular-nums text-border">
                      {uc.number}
                    </span>
                  </div>

                  {/* Main content */}
                  <div>
                    <div className="flex items-baseline gap-4 lg:block">
                      <span className="font-mono text-2xl font-extralight tabular-nums text-border lg:hidden">
                        {uc.number}
                      </span>
                      <h2 className="font-mono text-xs uppercase tracking-[0.15em]">
                        {uc.title}
                      </h2>
                    </div>
                    <p className="mt-4 text-lg font-light leading-relaxed sm:text-xl">
                      {uc.summary}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {uc.description}
                    </p>
                  </div>

                  {/* Side detail + agentic */}
                  <div className="space-y-6 lg:pt-6">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {uc.detail}
                    </p>
                    <div className="border-l-2 border-border/60 pl-4">
                      <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        What makes this agentic
                      </span>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground/80">
                        {uc.agentic}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-border/50">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-32 lg:px-12">
          <div className="max-w-2xl">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Not just automation
            </span>
            <p className="mt-6 text-lg font-light leading-relaxed sm:text-xl">
              The common thread: EloPhanto handles situations, not scripts.
              Websites change. Emails require judgment. Registration flows
              have unexpected steps. Goals need strategy adjustments.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              An automation tool breaks when the script doesn't match reality.
              An agent reads the situation, makes a judgment call, and adapts —
              across browser, email, files, code, payments, and knowledge — all
              from a single persistent entity that remembers everything and gets
              better over time.
            </p>
            <div className="mt-10">
              <Link
                href="/download"
                className="font-mono text-xs uppercase tracking-[0.15em] border-b border-foreground pb-1 transition-opacity hover:opacity-60"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
