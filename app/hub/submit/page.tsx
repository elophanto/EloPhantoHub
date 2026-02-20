import type { Metadata } from "next"
import { InstallCommand } from "@/components/install-command"

export const metadata: Metadata = {
  title: "Submit a Skill",
  description: "Learn how to create and submit skills to the EloPhantoHub.",
}

const steps = [
  {
    number: "01",
    title: "Fork the Hub repo",
    description: "Fork elophanto/elophantohub on GitHub to your account.",
  },
  {
    number: "02",
    title: "Add your skill",
    description:
      "Create skills/<name>/SKILL.md and metadata.json in your fork.",
  },
  {
    number: "03",
    title: "Open a Pull Request",
    description:
      "CI runs security scan, schema validation, and typosquat check automatically.",
  },
  {
    number: "04",
    title: "Automated review",
    description:
      "The security scanner checks for malicious patterns, prompt injection, and obfuscation.",
  },
  {
    number: "05",
    title: "Human review",
    description:
      "New publishers need maintainer review. Verified publishers need one community approval.",
  },
  {
    number: "06",
    title: "Published",
    description:
      "Merged PRs auto-update index.json with SHA-256 checksums. Your skill is live.",
  },
]

const tiers = [
  {
    name: "New",
    requirements: "First-time publisher. Every skill requires full maintainer review.",
  },
  {
    name: "Verified",
    requirements:
      "3+ published skills, GitHub account 90+ days old, no security flags.",
  },
  {
    name: "Trusted",
    requirements:
      "10+ published skills with high download counts, consistent quality, community trust.",
  },
  {
    name: "Official",
    requirements:
      "Core team or vetted partner. Skills maintained by the EloPhanto project.",
  },
]

export default function SubmitPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 pt-32 pb-24 sm:px-8 sm:pt-40 lg:px-12">
      {/* Header */}
      <div className="mb-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          Contribute
        </span>
        <h1 className="mt-4 text-3xl font-light tracking-tight sm:text-4xl">
          Submit a Skill
        </h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
          Share your skills with the EloPhanto community through the GitHub PR
          workflow.
        </p>
      </div>

      {/* Steps */}
      <section className="mb-20">
        <span className="mb-8 block font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          How it Works
        </span>
        <div className="grid gap-px border border-border/50 bg-border/50 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="bg-background p-6 sm:p-8">
              <span className="mb-3 block font-mono text-2xl font-light text-muted-foreground/20">
                {step.number}
              </span>
              <h3 className="mb-2 font-mono text-[11px] uppercase tracking-[0.15em]">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Metadata Schema */}
      <section className="mb-20">
        <span className="mb-8 block font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          metadata.json Schema
        </span>
        <p className="mb-6 text-sm text-muted-foreground">
          Every skill requires a <code className="font-mono text-foreground">metadata.json</code>{" "}
          file. Copy this template and fill in your skill&apos;s details.
        </p>
        <div className="border border-border/50 bg-card p-6">
          <pre className="overflow-x-auto font-mono text-sm leading-relaxed text-foreground/70">
{`{
  "name": "your-skill-name",
  "description": "A clear description of what your skill does.",
  "version": "1.0.0",
  "author": "your-github-username",
  "author_tier": "new",
  "tags": ["category1", "category2"],
  "license": "MIT",
  "elophanto_version": ">=0.1.0",
  "category": "productivity",
  "featured": false
}`}
          </pre>
        </div>
      </section>

      {/* SKILL.md Template */}
      <section className="mb-20">
        <span className="mb-8 block font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          SKILL.md Template
        </span>
        <p className="mb-6 text-sm text-muted-foreground">
          Your <code className="font-mono text-foreground">SKILL.md</code> is the description
          that appears on the skill detail page.
        </p>
        <div className="border border-border/50 bg-card p-6">
          <pre className="overflow-x-auto font-mono text-sm leading-relaxed text-foreground/70">
{`# Your Skill Name

Brief description of what this skill does.

## Features

- Feature 1
- Feature 2
- Feature 3

## Usage

Describe how the agent uses this skill.

## Configuration

Any configuration options or environment variables needed.

## Examples

Show example interactions or use cases.`}
          </pre>
        </div>
      </section>

      {/* Publisher Tiers */}
      <section className="mb-20">
        <span className="mb-8 block font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          Publisher Tiers
        </span>
        <p className="mb-8 text-sm text-muted-foreground">
          Publishers progress through trust levels. Higher tiers get faster
          review and more visibility.
        </p>
        <div className="grid gap-px border border-border/50 bg-border/50 sm:grid-cols-2">
          {tiers.map((tier) => (
            <div key={tier.name} className="bg-background p-6 sm:p-8">
              <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.15em]">
                {tier.name}
              </span>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {tier.requirements}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Content Security Policy */}
      <section className="mb-20">
        <span className="mb-8 block font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          Content Security Policy
        </span>
        <div className="grid gap-px border border-border/50 bg-border/50 sm:grid-cols-2">
          <div className="bg-background p-6 sm:p-8">
            <span className="mb-4 block font-mono text-[11px] uppercase tracking-[0.15em] text-foreground/60">
              Allowed
            </span>
            <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
              <li>Markdown formatting, code blocks, lists, tables</li>
              <li>Links to documentation and repositories</li>
              <li>Configuration examples and usage instructions</li>
              <li>Tool definitions and parameter schemas</li>
            </ul>
          </div>
          <div className="bg-background p-6 sm:p-8">
            <span className="mb-4 block font-mono text-[11px] uppercase tracking-[0.15em] text-foreground/60">
              Blocked
            </span>
            <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
              <li>Embedded scripts or executable code in SKILL.md</li>
              <li>External resource loading (images, iframes)</li>
              <li>System prompt overrides or injection attempts</li>
              <li>Obfuscated content or encoded payloads</li>
              <li>References to downloading or executing remote scripts</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section>
        <span className="mb-8 block font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          Quick Links
        </span>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "EloPhantoHub Repo", href: "https://github.com/elophanto/elophantohub" },
            { label: "Contribution Guidelines", href: "https://github.com/elophanto/elophantohub/blob/main/CONTRIBUTING.md" },
            { label: "Report a Malicious Skill", href: "https://github.com/elophanto/elophantohub/issues/new?labels=security" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border/50 px-4 py-2 font-mono text-[11px] text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
