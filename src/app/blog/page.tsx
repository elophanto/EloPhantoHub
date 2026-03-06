import type { Metadata } from "next"
import Link from "next/link"
import { blogPosts } from "@/lib/blog"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Clock, ArrowRight, Tag } from "lucide-react"

export const metadata: Metadata = {
  title: "Polo Blog | Tips, Guides & Travel Stories",
  description:
    "Read our polo blog for tips, travel guides, and stories about polo in Sotogrande, Spain. Learn about polo rules, history, destinations, and how to plan your polo holiday.",
  keywords: [
    "polo blog",
    "polo tips",
    "polo travel guide",
    "sotogrande travel",
    "polo for beginners",
    "equestrian tourism blog",
  ],
  openGraph: {
    title: "Polo Blog | Sotogrande Polo Tourism",
    description:
      "Tips, travel guides, and stories about polo in Sotogrande. Learn about the Sport of Kings.",
    url: "https://sotograndepolo.com/blog",
  },
  alternates: {
    canonical: "https://sotograndepolo.com/blog",
  },
}

const categories = ["All", "Polo Tips", "Travel Guides", "Events"]

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl font-bold text-white sm:text-5xl">
            Polo Blog
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            Tips, travel guides, and stories about polo in Sotogrande and
            beyond. Your guide to the Sport of Kings.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4 overflow-x-auto py-4">
            {categories.map((category) => (
              <span
                key={category}
                className={`inline-flex shrink-0 items-center rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  category === "All"
                    ? "bg-primary text-primary-foreground"
                    : "bg-accent text-foreground hover:bg-accent/80"
                }`}
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Card
                key={post.slug}
                className="group flex flex-col overflow-hidden transition-shadow hover:shadow-lg"
              >
                <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/10">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-serif text-2xl text-primary/20">
                      Polo
                    </span>
                  </div>
                  <div className="absolute left-4 top-4">
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-primary">
                      <Tag className="h-3 w-3" />
                      {post.category}
                    </span>
                  </div>
                </div>
                <CardContent className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-GB", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <h2 className="mt-3 font-serif text-xl font-bold text-foreground group-hover:text-primary">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-4 inline-flex items-center text-sm font-medium text-secondary hover:text-secondary/80"
                  >
                    Read More
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-primary py-16 sm:py-24">
        <div className="mx-auto max-w-xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-white">
            Stay in the Saddle
          </h2>
          <p className="mt-4 text-white/80">
            Get polo tips, travel guides, and exclusive offers delivered to your
            inbox. No spam, unsubscribe anytime.
          </p>
          <form className="mt-8 flex gap-3">
            <Input
              type="email"
              placeholder="your@email.com"
              className="bg-white/10 text-white placeholder:text-white/50 border-white/20 focus-visible:ring-secondary"
            />
            <Button type="submit" variant="gold">
              Subscribe
            </Button>
          </form>
          <p className="mt-3 text-xs text-white/50">
            Join 500+ polo enthusiasts. We send 1-2 emails per month.
          </p>
        </div>
      </section>
    </>
  )
}
