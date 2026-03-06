import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getBlogPostBySlug, getRelatedPosts, blogPosts } from "@/lib/blog"
import { BlogPostJsonLd } from "@/components/JsonLd"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, ArrowLeft, ArrowRight, Tag, Share2, Facebook, Twitter } from "lucide-react"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.excerpt,
    keywords: [post.category.toLowerCase(), "polo", "sotogrande", "spain"],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      url: `https://sotograndepolo.com/blog/${slug}`,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
    alternates: {
      canonical: `https://sotograndepolo.com/blog/${slug}`,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(slug, 3)

  return (
    <>
      <BlogPostJsonLd
        title={post.title}
        description={post.excerpt}
        date={post.date}
        slug={post.slug}
        image={post.image}
      />

      {/* Header */}
      <section className="bg-primary py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm text-white/70 hover:text-white"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Blog
          </Link>
          <div className="mt-4 flex items-center gap-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary/20 px-3 py-1 text-xs font-medium text-secondary">
              <Tag className="h-3 w-3" />
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-white/60">
              <Clock className="h-3 w-3" />
              {post.readTime}
            </span>
          </div>
          <h1 className="mt-4 font-serif text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center gap-4 text-sm text-white/70">
            <span>By {post.author}</span>
            <span>•</span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Article */}
            <article className="lg:col-span-2">
              <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-foreground prose-p:text-foreground/80 prose-a:text-secondary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-ul:text-foreground/80 prose-li:text-foreground/80">
                {post.content.split("\n\n").map((paragraph, i) => {
                  if (paragraph.startsWith("## ")) {
                    return (
                      <h2 key={i} className="mt-8 text-2xl font-bold">
                        {paragraph.replace("## ", "")}
                      </h2>
                    )
                  }
                  if (paragraph.startsWith("### ")) {
                    return (
                      <h3 key={i} className="mt-6 text-xl font-bold">
                        {paragraph.replace("### ", "")}
                      </h3>
                    )
                  }
                  if (paragraph.startsWith("- ") || paragraph.startsWith("1. ")) {
                    const items = paragraph.split("\n")
                    const isOrdered = paragraph.startsWith("1. ")
                    const ListTag = isOrdered ? "ol" : "ul"
                    return (
                      <ListTag key={i} className={`mt-4 space-y-1 ${isOrdered ? "list-decimal" : "list-disc"} pl-6`}>
                        {items.map((item, j) => (
                          <li key={j}>
                            {item.replace(/^[-\d]+\.\s?/, "").replace(/^\*\*(.+?)\*\*:?\s?/, "").trim()}
                          </li>
                        ))}
                      </ListTag>
                    )
                  }
                  if (paragraph.startsWith("|")) {
                    return null // Skip markdown tables for now
                  }
                  // Handle paragraphs with links
                  const parts = paragraph.split(/(\[.*?\]\(.*?\))/)
                  return (
                    <p key={i} className="mt-4">
                      {parts.map((part, j) => {
                        const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/)
                        if (linkMatch) {
                          return (
                            <Link
                              key={j}
                              href={linkMatch[2]}
                              className="text-secondary hover:underline"
                            >
                              {linkMatch[1]}
                            </Link>
                          )
                        }
                        // Handle bold text
                        const boldParts = part.split(/(\*\*.*?\*\*)/)
                        return boldParts.map((bp, k) => {
                          if (bp.startsWith("**") && bp.endsWith("**")) {
                            return (
                              <strong key={`${j}-${k}`}>
                                {bp.slice(2, -2)}
                              </strong>
                            )
                          }
                          return bp
                        })
                      })}
                    </p>
                  )
                })}
              </div>

              {/* Social Share */}
              <div className="mt-12 border-t border-border pt-8">
                <p className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Share2 className="h-4 w-4" />
                  Share this article
                </p>
                <div className="mt-3 flex gap-3">
                  <Button variant="outline" size="sm">
                    <span className="mr-2">Twitter</span>
                  </Button>
                  <Button variant="outline" size="sm">
                    <span className="mr-2">Facebook</span>
                  </Button>
                  <Button variant="outline" size="sm">
                    <span className="mr-2">LinkedIn</span>
                  </Button>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-12 rounded-lg bg-primary p-8 text-center text-white">
                <h3 className="font-serif text-2xl font-bold">
                  Ready to Try Polo?
                </h3>
                <p className="mt-2 text-white/80">
                  Book your polo experience in Sotogrande today.
                </p>
                <Button asChild variant="gold" size="lg" className="mt-6">
                  <Link href="/packages">View Packages</Link>
                </Button>
              </div>
            </article>

            {/* Sidebar */}
            <aside>
              <div className="sticky top-24 space-y-8">
                {/* Related Posts */}
                <div>
                  <h3 className="font-serif text-lg font-bold text-foreground">
                    Related Articles
                  </h3>
                  <div className="mt-4 space-y-4">
                    {relatedPosts.map((related) => (
                      <Card key={related.slug} className="group">
                        <CardContent className="p-4">
                          <span className="text-xs text-secondary">
                            {related.category}
                          </span>
                          <h4 className="mt-1 font-medium text-foreground group-hover:text-primary">
                            <Link href={`/blog/${related.slug}`}>
                              {related.title}
                            </Link>
                          </h4>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {related.readTime}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Newsletter */}
                <div className="rounded-lg bg-accent p-6">
                  <h3 className="font-serif text-lg font-bold text-foreground">
                    Newsletter
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Get polo tips and travel guides in your inbox.
                  </p>
                  <form className="mt-4 space-y-3">
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="flex h-10 w-full rounded-md border border-border bg-white px-3 py-2 text-sm"
                    />
                    <Button type="submit" variant="gold" size="sm" className="w-full">
                      Subscribe
                    </Button>
                  </form>
                </div>

                {/* Quick Links */}
                <div>
                  <h3 className="font-serif text-lg font-bold text-foreground">
                    Popular Packages
                  </h3>
                  <div className="mt-4 space-y-2">
                    <Link
                      href="/booking/discovery"
                      className="flex items-center justify-between rounded-lg border border-border p-3 text-sm transition-colors hover:bg-accent"
                    >
                      <span>Polo Discovery</span>
                      <span className="font-medium text-secondary">&euro;199</span>
                    </Link>
                    <Link
                      href="/booking/weekend"
                      className="flex items-center justify-between rounded-lg border border-border p-3 text-sm transition-colors hover:bg-accent"
                    >
                      <span>Weekend Package</span>
                      <span className="font-medium text-secondary">&euro;599</span>
                    </Link>
                    <Link
                      href="/booking/week-immersion"
                      className="flex items-center justify-between rounded-lg border border-border p-3 text-sm transition-colors hover:bg-accent"
                    >
                      <span>Week Immersion</span>
                      <span className="font-medium text-secondary">&euro;1,499</span>
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
