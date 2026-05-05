export type SeoLandingPage = {
  slug: string
  title: string
  description: string
  keywords: string[]
  eyebrow: string
  heading: string
  lead: string
  primaryCta: string
  sections: {
    title: string
    body: string
    points: string[]
  }[]
  jobs: {
    title: string
    description: string
  }[]
  faqs: {
    question: string
    answer: string
  }[]
}

export const seoPages: SeoLandingPage[] = [
  {
    slug: "ai-agent-jobs",
    title: "AI Agent Jobs - Hire EloPhanto for Autonomous Work",
    description:
      "Hire EloPhanto for AI agent jobs across coding, browser automation, research, revenue operations, and long-running workflows.",
    keywords: [
      "AI agent jobs",
      "hire AI agent",
      "autonomous AI agent jobs",
      "AI agent for freelance work",
      "AI agent for coding jobs",
    ],
    eyebrow: "AI agent jobs",
    heading: "Hire an autonomous AI agent for real work.",
    lead:
      "EloPhanto takes jobs that need judgment across code, browser sessions, email, files, payments, and follow-up. You describe the outcome; the agent plans, executes, verifies, and reports back.",
    primaryCta: "Hire EloPhanto",
    sections: [
      {
        title: "Built for messy jobs",
        body:
          "Most automation breaks when a page changes, a client replies, or the task needs a second decision. EloPhanto is designed for jobs where the agent has to read the situation and adapt.",
        points: [
          "Coding tasks with implementation, tests, and review loops",
          "Browser workflows that require real account sessions and recovery",
          "Research jobs that end in outreach, reports, or shipped artifacts",
        ],
      },
      {
        title: "One agent, many surfaces",
        body:
          "The same persistent agent can work through a terminal, browser, web dashboard, wallet, email inbox, and messaging channels while preserving memory across the whole job.",
        points: [
          "Local-first memory and encrypted vault storage",
          "Real Chrome automation for web workflows",
          "Solana and Base wallet support for paid actions",
        ],
      },
    ],
    jobs: [
      {
        title: "Coding jobs",
        description:
          "Give EloPhanto a feature, bug, refactor, or integration and let it coordinate implementation with review.",
      },
      {
        title: "Research jobs",
        description:
          "Ask it to investigate companies, docs, markets, or competitors and turn the results into a usable artifact.",
      },
      {
        title: "Browser automation jobs",
        description:
          "Send it through web apps, forms, dashboards, inboxes, and account flows using real browser control.",
      },
    ],
    faqs: [
      {
        question: "What kind of AI agent jobs can EloPhanto take?",
        answer:
          "EloPhanto is strongest on jobs that combine software work, browser automation, research, email follow-up, or recurring operational goals.",
      },
      {
        question: "How does hiring the agent work?",
        answer:
          "You submit a task, pay the listed $ELO price from a Solana wallet, and the agent replies by email when the job is complete.",
      },
    ],
  },
  {
    slug: "ai-coding-agent",
    title: "AI Coding Agent - Autonomous Development Work",
    description:
      "EloPhanto is an AI coding agent that can coordinate implementation, tests, reviews, browser checks, and long-running development goals.",
    keywords: [
      "AI coding agent",
      "autonomous coding agent",
      "AI software engineer agent",
      "AI agent for developers",
      "coding agent jobs",
    ],
    eyebrow: "AI coding agent",
    heading: "An AI coding agent that can run a development loop.",
    lead:
      "EloPhanto is built for development jobs that need more than a single code generation pass: planning, context loading, implementation, testing, review, and correction.",
    primaryCta: "Hire for a coding job",
    sections: [
      {
        title: "From spec to reviewed code",
        body:
          "The agent can break a development request into work units, route them to specialist agents, inspect outputs, and keep a review trail before returning the result.",
        points: [
          "Feature implementation and bug fixing",
          "Refactors with tests and compatibility checks",
          "Frontend changes with browser verification",
        ],
      },
      {
        title: "Project context matters",
        body:
          "EloPhanto reads local files, docs, architecture notes, and prior lessons so future work starts with the context your project has already taught it.",
        points: [
          "Persistent knowledge base on disk",
          "Model routing across multiple LLM providers",
          "Specialist agents for parallel development tasks",
        ],
      },
    ],
    jobs: [
      {
        title: "Build a feature",
        description:
          "Turn a product note or issue into a scoped implementation with a test plan.",
      },
      {
        title: "Fix a production bug",
        description:
          "Trace symptoms through code, patch the underlying issue, and report what changed.",
      },
      {
        title: "Review and improve code",
        description:
          "Use a separate model path to inspect implementation risk, missing tests, and regressions.",
      },
    ],
    faqs: [
      {
        question: "Can EloPhanto work inside an existing repository?",
        answer:
          "Yes. It is local-first and is designed to read project files, run tools, and preserve learned project context on your machine.",
      },
      {
        question: "Does it only write code?",
        answer:
          "No. It can also use browsers, files, email, and other tools around the code work when the job requires it.",
      },
    ],
  },
  {
    slug: "ai-research-agent",
    title: "AI Research Agent - Research That Acts",
    description:
      "Use EloPhanto as an AI research agent for web research, document synthesis, competitive analysis, outreach prep, and follow-through.",
    keywords: [
      "AI research agent",
      "autonomous research agent",
      "AI agent for research",
      "web research AI agent",
      "research automation agent",
    ],
    eyebrow: "AI research agent",
    heading: "Research that turns into action.",
    lead:
      "EloPhanto can gather information, compare sources, synthesize findings, and then continue into the next step: writing reports, preparing outreach, updating files, or monitoring changes.",
    primaryCta: "Hire for research",
    sections: [
      {
        title: "Beyond summaries",
        body:
          "Research work rarely ends at a paragraph. EloPhanto can use what it learns to make decisions and produce artifacts that move a project forward.",
        points: [
          "Competitor and market research",
          "Documentation and API compatibility analysis",
          "Partner, customer, and lead research",
        ],
      },
      {
        title: "Memory compounds",
        body:
          "Research findings are not thrown away after the task. The agent can preserve lessons in its knowledge base so related future jobs start from a stronger position.",
        points: [
          "Semantic retrieval over prior work",
          "Source-aware summaries and action lists",
          "Follow-up tasks across email, browser, and files",
        ],
      },
    ],
    jobs: [
      {
        title: "Competitor research",
        description:
          "Extract positioning, pricing, features, and gaps from public websites and docs.",
      },
      {
        title: "Partner research",
        description:
          "Find relevant companies, inspect technical fit, and draft targeted outreach.",
      },
      {
        title: "Document analysis",
        description:
          "Read long documents, compare changes, and produce a decision-ready brief.",
      },
    ],
    faqs: [
      {
        question: "Can the agent act after research?",
        answer:
          "Yes. EloPhanto is designed to connect research to follow-up work like drafting, filing, outreach, or monitoring.",
      },
      {
        question: "Where does research memory live?",
        answer:
          "The knowledge base is local-first, stored on disk you control rather than locked inside a SaaS account.",
      },
    ],
  },
  {
    slug: "browser-automation-agent",
    title: "Browser Automation AI Agent - Real Web Workflow Automation",
    description:
      "EloPhanto is a browser automation AI agent with real Chrome control for account flows, dashboards, email, forms, and web operations.",
    keywords: [
      "browser automation AI agent",
      "AI browser agent",
      "web automation agent",
      "Chrome automation AI agent",
      "AI agent for web tasks",
    ],
    eyebrow: "Browser automation agent",
    heading: "An AI browser agent for real web workflows.",
    lead:
      "EloPhanto can operate through a real browser, use existing sessions, inspect page state, recover from changing flows, and keep working across multi-step web tasks.",
    primaryCta: "Hire for browser work",
    sections: [
      {
        title: "Real browser context",
        body:
          "Many web jobs depend on cookies, logged-in dashboards, confirmation emails, and visual state. EloPhanto is designed for that messy web surface.",
        points: [
          "Chrome automation with session context",
          "Email verification and account workflow support",
          "Dashboard, form, and web app operations",
        ],
      },
      {
        title: "Recover when pages change",
        body:
          "Instead of depending on one brittle script path, the agent can observe, decide, and continue when modals, errors, and layout changes appear.",
        points: [
          "Page inspection after each action",
          "Fallback planning for unexpected states",
          "Audit-friendly reporting after completion",
        ],
      },
    ],
    jobs: [
      {
        title: "Account setup",
        description:
          "Create accounts, verify emails, store credentials, and document where the agent registered.",
      },
      {
        title: "Dashboard operations",
        description:
          "Navigate web apps, extract information, update forms, and report final state.",
      },
      {
        title: "Web monitoring",
        description:
          "Check pages or dashboards repeatedly and alert when a meaningful change appears.",
      },
    ],
    faqs: [
      {
        question: "Does EloPhanto use a real browser?",
        answer:
          "Yes. The product copy and install flow are built around real Chrome browser control rather than only API calls.",
      },
      {
        question: "Is it only for scraping?",
        answer:
          "No. The browser surface is useful for logged-in workflows, forms, dashboards, email verification, and multi-step operations.",
      },
    ],
  },
  {
    slug: "local-ai-agent",
    title: "Local AI Agent - EloPhanto Runs on Your Machine",
    description:
      "EloPhanto is a local-first AI agent with persistent memory, browser automation, wallet support, skills, and multi-channel access.",
    keywords: [
      "local AI agent",
      "self hosted AI agent",
      "open source AI agent",
      "AI agent on your machine",
      "local-first AI agent",
    ],
    eyebrow: "Local AI agent",
    heading: "A local-first AI agent that lives on your machine.",
    lead:
      "EloPhanto keeps its identity, memory, vault, wallet, and working context local-first while still letting you route tasks through the best model provider for the job.",
    primaryCta: "Download EloPhanto",
    sections: [
      {
        title: "Your data stays close",
        body:
          "The agent is designed around local files, local memory, and an encrypted vault instead of forcing every workflow into a hosted account.",
        points: [
          "Persistent knowledge base on disk",
          "Encrypted credential and wallet vault",
          "No telemetry by default",
        ],
      },
      {
        title: "Local does not mean isolated",
        body:
          "EloPhanto can still work through cloud LLMs, local Ollama, browser sessions, messaging channels, and community skills when a job needs them.",
        points: [
          "Multiple LLM provider options",
          "CLI, web, VS Code, Telegram, Discord, and Slack channels",
          "Installable skills through EloPhantoHub",
        ],
      },
    ],
    jobs: [
      {
        title: "Personal operations",
        description:
          "Use local context to handle recurring work across files, email, browser, and reminders.",
      },
      {
        title: "Developer workflows",
        description:
          "Keep project-specific knowledge near the code and reuse it across coding tasks.",
      },
      {
        title: "Long-running goals",
        description:
          "Let the background mind continue work between conversations and across restarts.",
      },
    ],
    faqs: [
      {
        question: "Is EloPhanto a hosted SaaS agent?",
        answer:
          "No. It is positioned as a local-first agent that lives on your machine while using model providers as backends.",
      },
      {
        question: "Can it use local models?",
        answer:
          "Yes. The site describes support for local Ollama alongside cloud LLM providers.",
      },
    ],
  },
]

export function getSeoPage(slug: string) {
  return seoPages.find((page) => page.slug === slug)
}
