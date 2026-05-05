import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { JsonLd } from "@/components/json-ld"
import { absoluteUrl, createMetadata, siteConfig } from "@/lib/seo"
import { getSeoPage, seoPages } from "@/lib/seo-pages"

export const dynamicParams = false

export function generateStaticParams() {
  return seoPages.map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const page = getSeoPage(slug)
  if (!page) return {}

  return createMetadata({
    title: page.title,
    description: page.description,
    path: `/${page.slug}`,
    keywords: page.keywords,
  })
}

export default async function SeoLandingPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const page = getSeoPage(slug)
  if (!page) notFound()

  const pageUrl = absoluteUrl(`/${page.slug}`)
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: page.title,
      description: page.description,
      url: pageUrl,
      provider: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
      },
      areaServed: "Worldwide",
      serviceType: page.eyebrow,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqs.map((faq) => ({
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
    <div className="mx-auto max-w-7xl px-6 pt-32 pb-24 sm:px-8 sm:pt-40 lg:px-12">
      <JsonLd data={structuredData} />

      <section className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            {page.eyebrow}
          </span>
          <h1 className="mt-6 max-w-3xl text-4xl font-light leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            {page.heading}
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {page.lead}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-8">
            <Link
              href={page.slug === "local-ai-agent" ? "/download" : "/hire"}
              className="font-mono text-xs uppercase tracking-[0.15em] border-b border-foreground pb-1 transition-opacity hover:opacity-60"
            >
              {page.primaryCta}
            </Link>
            <Link
              href="/use-cases"
              className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground transition-opacity hover:opacity-100"
              style={{ opacity: 0.5 }}
            >
              View use cases
            </Link>
          </div>
        </div>

        <div className="border border-border/50">
          <div className="border-b border-border/50 px-6 py-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Common jobs
            </span>
          </div>
          <div className="divide-y divide-border/50">
            {page.jobs.map((job) => (
              <article key={job.title} className="px-6 py-5">
                <h2 className="font-mono text-xs uppercase tracking-[0.12em]">
                  {job.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {job.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-24 grid gap-px border border-border/50 bg-border/50 lg:grid-cols-2">
        {page.sections.map((section) => (
          <article key={section.title} className="bg-background p-8 sm:p-10">
            <h2 className="text-2xl font-light leading-tight">
              {section.title}
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              {section.body}
            </p>
            <ul className="mt-8 space-y-3 text-sm leading-relaxed text-muted-foreground">
              {section.points.map((point) => (
                <li key={point} className="border-l border-border/60 pl-4">
                  {point}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="mt-24 max-w-3xl">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          Questions
        </span>
        <div className="mt-8 divide-y divide-border/50 border-y border-border/50">
          {page.faqs.map((faq) => (
            <article key={faq.question} className="py-6">
              <h2 className="font-mono text-xs uppercase tracking-[0.12em]">
                {faq.question}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {faq.answer}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
