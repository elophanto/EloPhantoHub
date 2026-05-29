import type { Metadata } from "next"
import { JsonLd } from "@/components/json-ld"
import { HireWalletProvider } from "@/components/hire/wallet-provider"
import { JobForm } from "@/components/hire/job-form"
import { absoluteUrl, createMetadata, siteConfig } from "@/lib/seo"

const hireDescription =
  "Hire EloPhanto for autonomous AI agent jobs across coding, browser automation, research, revenue operations, and long-running workflows."

export const metadata: Metadata = createMetadata({
  title: "Hire an Autonomous AI Agent for Jobs - EloPhanto",
  description: hireDescription,
  path: "/hire",
  keywords: [
    "hire AI agent",
    "AI agent jobs",
    "autonomous AI agent for hire",
    "hire coding agent",
    "hire browser automation agent",
    "AI research agent for hire",
  ],
})

const jobTypes = [
  {
    title: "Coding jobs",
    description:
      "Implementation, bug fixing, refactors, browser checks, and reviewed development work.",
  },
  {
    title: "Research jobs",
    description:
      "Market research, competitor analysis, partner lists, API research, and decision-ready briefs.",
  },
  {
    title: "Browser automation",
    description:
      "Logged-in workflows, dashboard operations, form fills, account setup, and web monitoring.",
  },
]

const workflow = [
  {
    title: "Describe the outcome",
    description:
      "Give the agent the job, constraints, and the email address where it should report back.",
  },
  {
    title: "Pay with $ELO",
    description:
      "Submit the signed Solana payment envelope so the job can be picked up by the agent.",
  },
  {
    title: "Get the result",
    description:
      "EloPhanto executes the task and replies with the finished work, notes, or next-step questions.",
  },
]

const faqs = [
  {
    question: "What jobs can I send to EloPhanto?",
    answer:
      "EloPhanto is best for jobs that combine code, browser work, research, files, email, or longer-running operations.",
  },
  {
    question: "How fast does the agent respond?",
    answer:
      "The hire page advertises a usual turnaround under 24 hours, with the final result sent to your email.",
  },
]

export default function HirePage() {
  const hireStructuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Hire EloPhanto autonomous AI agent",
      description: hireDescription,
      url: absoluteUrl("/hire"),
      provider: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
      },
      areaServed: "Worldwide",
      serviceType: "Autonomous AI agent jobs",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "AI agent jobs",
        itemListElement: jobTypes.map((job) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: job.title,
            description: job.description,
          },
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden">
      <JsonLd data={hireStructuredData} />

      <div className="geo-circle right-[8%] top-[18%] hidden h-[420px] w-[420px] lg:block" />
      <div className="geo-circle right-[14%] top-[24%] hidden h-[260px] w-[260px] lg:block" />

      <div className="relative mx-auto max-w-4xl px-6 pt-28 pb-24 sm:px-8 sm:pt-32 lg:px-12 lg:pt-36">
        <div className="crop-marks inline-block p-8">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Hire the agent for jobs
          </span>
        </div>

        <h1 className="mt-6 max-w-3xl text-4xl font-light leading-[1.1] tracking-tight sm:text-5xl">
          Hire an autonomous AI agent for real jobs.
        </h1>
        <p className="mt-6 max-w-2xl font-light text-lg leading-relaxed text-muted-foreground">
          Describe the task. Pay 50,000 $ELO from your Solana wallet – or
          buy $ELO inline with SOL or USDC via Jupiter if you don&rsquo;t hold
          it yet. The agent picks up the signed envelope, executes, and
          replies to your email – usually within 24 hours.
        </p>

        <div className="mt-12">
          <HireWalletProvider>
            <JobForm />
          </HireWalletProvider>
        </div>

        <div className="mt-12 grid gap-px border border-border/50 bg-border/50 sm:grid-cols-3">
          <div className="bg-background p-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Price
            </div>
            <div className="mt-2 font-mono text-sm">50,000 $ELO</div>
          </div>
          <div className="bg-background p-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Network
            </div>
            <div className="mt-2 font-mono text-sm">Solana mainnet</div>
          </div>
          <div className="bg-background p-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Turnaround
            </div>
            <div className="mt-2 font-mono text-sm">&lt; 24 hours</div>
          </div>
        </div>

        <section className="mt-16 grid gap-px border border-border/50 bg-border/50 sm:grid-cols-3">
          {jobTypes.map((job) => (
            <article key={job.title} className="bg-background p-5">
              <h2 className="font-mono text-[10px] uppercase tracking-[0.2em]">
                {job.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {job.description}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-16 grid gap-px border border-border/50 bg-border/50 sm:grid-cols-3">
          {workflow.map((step, index) => (
            <article key={step.title} className="bg-background p-5">
              <span className="font-mono text-2xl font-extralight tabular-nums text-border">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em]">
                {step.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-16 border-y border-border/50">
          {faqs.map((faq) => (
            <article key={faq.question} className="py-6">
              <h2 className="font-mono text-[10px] uppercase tracking-[0.2em]">
                {faq.question}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {faq.answer}
              </p>
            </article>
          ))}
        </section>
      </div>
    </div>
  )
}
