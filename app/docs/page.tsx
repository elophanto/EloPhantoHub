import type { Metadata } from "next"
import Link from "next/link"
import { JsonLd } from "@/components/json-ld"
import { InstallCommand } from "@/components/install-command"
import { absoluteUrl, createMetadata, siteConfig } from "@/lib/seo"

export const metadata: Metadata = createMetadata({
  title: "EloPhanto Docs - Install, Run, and Extend the AI Agent",
  description:
    "Documentation entry point for installing EloPhanto, running the local AI agent, using skills, hiring the agent, and contributing to EloPhantoHub.",
  path: "/docs",
  keywords: [
    "EloPhanto docs",
    "AI agent documentation",
    "local AI agent docs",
    "EloPhanto install",
    "EloPhantoHub docs",
  ],
})

const docSections = [
  {
    title: "Install and run",
    description:
      "Clone EloPhanto, run setup, then start the agent in terminal, web dashboard, or daemon mode.",
    href: "/download",
  },
  {
    title: "Use cases",
    description:
      "See how the autonomous agent works across coding, browser automation, research, email, payments, and long-running goals.",
    href: "/use-cases",
  },
  {
    title: "Skills",
    description:
      "Browse EloPhantoHub to install skills for development, automation, design, research, accessibility, and operations.",
    href: "/hub",
  },
  {
    title: "Hire the agent",
    description:
      "Submit a paid job to EloPhanto and get the completed work back by email.",
    href: "/hire",
  },
]

export default function DocsPage() {
  const docsStructuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "EloPhanto documentation",
    description: metadata.description,
    url: absoluteUrl("/docs"),
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  }

  return (
    <div className="mx-auto max-w-5xl px-6 pt-32 pb-24 sm:px-8 sm:pt-40 lg:px-12">
      <JsonLd data={docsStructuredData} />

      <section>
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          Documentation
        </span>
        <h1 className="mt-6 max-w-3xl text-4xl font-light leading-[1.1] tracking-tight sm:text-5xl">
          Install, run, and extend EloPhanto.
        </h1>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Start with the local agent, then add skills, browser workflows,
          autonomous goals, and job submissions as your use case grows.
        </p>
      </section>

      <section className="mt-12">
        <InstallCommand command="git clone https://github.com/elophanto/EloPhanto.git && cd EloPhanto && ./setup.sh" />
      </section>

      <section className="mt-20 grid gap-px border border-border/50 bg-border/50 sm:grid-cols-2">
        {docSections.map((section) => (
          <Link key={section.href} href={section.href} className="group block">
            <article className="h-full bg-background p-8 transition-colors group-hover:bg-card">
              <h2 className="font-mono text-xs uppercase tracking-[0.12em]">
                {section.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {section.description}
              </p>
            </article>
          </Link>
        ))}
      </section>

      <section className="mt-20 border-y border-border/50 py-8">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          Source
        </span>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          The full project source, deeper implementation notes, and license
          live in the GitHub repository.
        </p>
        <a
          href="https://github.com/elophanto/EloPhanto"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block font-mono text-xs uppercase tracking-[0.15em] border-b border-foreground pb-1 transition-opacity hover:opacity-60"
        >
          View repository
        </a>
      </section>
    </div>
  )
}
