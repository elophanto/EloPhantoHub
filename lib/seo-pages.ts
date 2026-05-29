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
      "Hire EloPhanto for AI agent jobs across coding, browser automation, research, revenue operations, and long-running workflows. You set the outcome; it does the work.",
    keywords: [
      "AI agent jobs",
      "hire AI agent",
      "autonomous AI agent jobs",
      "AI agent for freelance work",
      "AI agent for coding jobs",
    ],
    eyebrow: "AI agent jobs",
    heading: "Hire an AI agent that finishes the job.",
    lead:
      "EloPhanto takes the jobs that need judgment, not just a script: code, browser sessions, email, files, payments, follow-up. You describe the outcome. It plans the work, does it, checks its own results, and reports back when it's done.",
    primaryCta: "Hire EloPhanto",
    sections: [
      {
        title: "Built for messy jobs",
        body:
          "Most automation breaks the moment a page changes, a client replies, or the task needs a second decision. EloPhanto reads the situation and adapts, the way a capable freelancer would.",
        points: [
          "Coding tasks with implementation, tests, and a review loop",
          "Browser workflows that need real account sessions and recovery",
          "Research that ends in outreach, a report, or a shipped artifact",
        ],
      },
      {
        title: "One agent, every surface",
        body:
          "The same agent works through a terminal, a browser, the web dashboard, a wallet, an email inbox, and your messaging channels, and it remembers the whole job from start to finish.",
        points: [
          "Persistent memory and an encrypted vault for credentials",
          "Real Chrome automation for logged-in web work",
          "Solana and Base wallets for paid actions, with spending limits",
        ],
      },
    ],
    jobs: [
      {
        title: "Coding jobs",
        description:
          "Hand it a feature, bug, refactor, or integration. It coordinates the implementation and the review, then tells you what changed.",
      },
      {
        title: "Research jobs",
        description:
          "Point it at companies, docs, markets, or competitors. It comes back with an artifact you can use, not just a summary.",
      },
      {
        title: "Browser automation jobs",
        description:
          "Send it through web apps, forms, dashboards, inboxes, and account flows using a real browser.",
      },
    ],
    faqs: [
      {
        question: "What kind of AI agent jobs can EloPhanto take?",
        answer:
          "Anything that combines software work, browser automation, research, email follow-up, or a recurring operational goal. The harder the job is to script, the better it fits.",
      },
      {
        question: "How does hiring the agent work?",
        answer:
          "Describe the task, pay the listed $ELO price from a Solana wallet, and the agent picks up the job, does it, and replies to your email when it's done, usually within 24 hours.",
      },
    ],
  },
  {
    slug: "ai-coding-agent",
    title: "AI Coding Agent - Autonomous Development Work",
    description:
      "EloPhanto is an AI coding agent that runs a full development loop: plan, implement, test, review, and fix, with browser checks and long-running goals.",
    keywords: [
      "AI coding agent",
      "autonomous coding agent",
      "AI software engineer agent",
      "AI agent for developers",
      "coding agent jobs",
    ],
    eyebrow: "AI coding agent",
    heading: "A coding agent that runs the whole loop.",
    lead:
      "One code-generation pass is the easy part. EloPhanto handles the rest: it plans the work, loads your project's context, implements, runs the tests, reviews the result with a second model, and fixes what it finds.",
    primaryCta: "Hire for a coding job",
    sections: [
      {
        title: "From spec to reviewed code",
        body:
          "It breaks a development request into work units, hands them to specialist agents in isolated worktrees, inspects the output, and keeps a review trail before it returns the result.",
        points: [
          "Feature implementation and bug fixing",
          "Refactors with tests and compatibility checks",
          "Frontend changes verified in a real browser",
        ],
      },
      {
        title: "It learns your codebase",
        body:
          "EloPhanto reads your files, docs, architecture notes, and its own past lessons, so the next task starts with everything your project has already taught it, instead of from scratch.",
        points: [
          "A persistent knowledge base it writes itself",
          "Model routing across seven LLM providers",
          "Specialist agents for parallel development work",
        ],
      },
    ],
    jobs: [
      {
        title: "Build a feature",
        description:
          "Turn a product note or an issue into a scoped implementation with a test plan.",
      },
      {
        title: "Fix a production bug",
        description:
          "Trace the symptoms through the code, patch the real cause, and report exactly what changed.",
      },
      {
        title: "Review and improve code",
        description:
          "Put a second model on the implementation to catch risk, missing tests, and regressions.",
      },
    ],
    faqs: [
      {
        question: "Can EloPhanto work inside an existing repository?",
        answer:
          "Yes. It reads your project files, runs your tools, and remembers what your codebase has taught it, on your own machine or in the cloud.",
      },
      {
        question: "Does it only write code?",
        answer:
          "No. It also drives browsers, files, email, and other tools around the code when the job calls for it.",
      },
    ],
  },
  {
    slug: "ai-research-agent",
    title: "AI Research Agent - Research That Acts",
    description:
      "Use EloPhanto as an AI research agent that gathers, compares, and synthesizes, then acts on what it finds: reports, outreach, file updates, and monitoring.",
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
      "Most AI research stops at a summary. EloPhanto keeps going: it gathers the information, compares the sources, decides what matters, and then writes the report, drafts the outreach, updates the files, or watches for what changes next.",
    primaryCta: "Hire for research",
    sections: [
      {
        title: "Past the summary",
        body:
          "Research is rarely the deliverable; it's the start of one. EloPhanto uses what it learns to make a decision and produce something that moves the project forward.",
        points: [
          "Competitor and market research",
          "Documentation and API compatibility analysis",
          "Partner, customer, and lead research",
        ],
      },
      {
        title: "Every job makes the next one smarter",
        body:
          "Findings don't evaporate when the task ends. The agent keeps them in a knowledge base it can search, so related work later starts from a stronger position.",
        points: [
          "Semantic recall over everything it has learned",
          "Source-aware summaries with a clear action list",
          "Follow-up across email, browser, and files",
        ],
      },
    ],
    jobs: [
      {
        title: "Competitor research",
        description:
          "Pull positioning, pricing, features, and gaps from public sites and docs.",
      },
      {
        title: "Partner research",
        description:
          "Find the right companies, check the technical fit, and draft targeted outreach.",
      },
      {
        title: "Document analysis",
        description:
          "Read the long documents, compare versions, and hand back a decision-ready brief.",
      },
    ],
    faqs: [
      {
        question: "Can the agent act on what it finds?",
        answer:
          "Yes. That's the point. It connects the research to the next step: drafting, filing, outreach, or ongoing monitoring.",
      },
      {
        question: "Where does the research it gathers live?",
        answer:
          "In a knowledge base on disk you control. It compounds over time, so every job makes the next related one start smarter.",
      },
    ],
  },
  {
    slug: "browser-automation-agent",
    title: "Browser Automation AI Agent - Real Web Workflow Automation",
    description:
      "EloPhanto is a browser automation AI agent that drives a real Chrome browser through account flows, dashboards, email, forms, and multi-step web operations.",
    keywords: [
      "browser automation AI agent",
      "AI browser agent",
      "web automation agent",
      "Chrome automation AI agent",
      "AI agent for web tasks",
    ],
    eyebrow: "Browser automation agent",
    heading: "It drives a real browser, not an API.",
    lead:
      "EloPhanto works through real Chrome, using your existing sessions. It reads the page after every action, recovers when a flow changes, and keeps going across the multi-step web tasks that break ordinary scripts.",
    primaryCta: "Hire for browser work",
    sections: [
      {
        title: "Real browser, real sessions",
        body:
          "Most web jobs depend on cookies, logged-in dashboards, confirmation emails, and what's actually on the screen. EloPhanto works on that messy surface, not a clean API.",
        points: [
          "Chrome automation with your real session context",
          "Email verification and account flows handled end to end",
          "Dashboard, form, and web-app operations",
        ],
      },
      {
        title: "It recovers when pages change",
        body:
          "Instead of following one brittle path, it observes, decides, and carries on when a modal pops up, an error appears, or the layout shifts.",
        points: [
          "Reads the page state after every action",
          "Plans a fallback when something unexpected happens",
          "Reports cleanly when the job is done",
        ],
      },
    ],
    jobs: [
      {
        title: "Account setup",
        description:
          "Create accounts, verify the emails, store the credentials, and record where it registered.",
      },
      {
        title: "Dashboard operations",
        description:
          "Navigate web apps, pull the information you need, update the forms, and report the final state.",
      },
      {
        title: "Web monitoring",
        description:
          "Check a page or dashboard on a schedule and alert you the moment something meaningful changes.",
      },
    ],
    faqs: [
      {
        question: "Does EloPhanto use a real browser?",
        answer:
          "Yes. It drives a real Chrome browser with your existing sessions and cookies, with 49 browser tools, not just API calls.",
      },
      {
        question: "Is it only for scraping?",
        answer:
          "No. It's built for logged-in work: forms, dashboards, email verification, and multi-step operations that need real sessions.",
      },
    ],
  },
  {
    slug: "local-ai-agent",
    title: "Local AI Agent - EloPhanto Runs on Your Machine",
    description:
      "EloPhanto is a local-first AI agent: identity, memory, vault, and wallet on your own machine, with persistent memory, browser automation, skills, and any LLM.",
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
      "Your agent's identity, memory, vault, wallet, and working context stay on your own machine, with your keys and your data. You still route each task to the best model for the job, from local Ollama to the top cloud providers.",
    primaryCta: "Download EloPhanto",
    sections: [
      {
        title: "Your data stays with you",
        body:
          "EloPhanto is built around local files, local memory, and an encrypted vault, not a hosted account you rent. It runs with no telemetry by default.",
        points: [
          "A persistent knowledge base on disk you control",
          "Encrypted credential and wallet vault",
          "No telemetry by default",
        ],
      },
      {
        title: "Local doesn't mean cut off",
        body:
          "It still reaches the outside world when a job needs it: cloud or local models, real browser sessions, every messaging channel, and community skills.",
        points: [
          "Seven LLM providers, plus local Ollama",
          "CLI, web, VS Code, Telegram, Discord, and Slack",
          "One-command skills from EloPhantoHub",
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
          "Keep project knowledge next to the code and reuse it on every coding task.",
      },
      {
        title: "Long-running goals",
        description:
          "Let the background mind keep working between conversations and across restarts.",
      },
    ],
    faqs: [
      {
        question: "Do I have to self-host it?",
        answer:
          "EloPhanto is local-first: it runs on your own machine, with your keys and your data. A managed cloud option is on the way for anyone who'd rather not self-host.",
      },
      {
        question: "Can it use local models?",
        answer:
          "Yes. Run everything locally with Ollama, or route a task to a cloud model like GPT-5.5, Claude, or GLM when you want more power.",
      },
    ],
  },
]

export function getSeoPage(slug: string) {
  return seoPages.find((page) => page.slug === slug)
}
