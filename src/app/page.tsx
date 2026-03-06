import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PackageCard } from "@/components/PackageCard"
import { TestimonialSection } from "@/components/TestimonialCard"
import { packages } from "@/lib/packages"
import {
  Award,
  Shield,
  Sun,
  Users,
  MapPin,
  Star,
  ArrowRight,
} from "lucide-react"

const whyChooseUs = [
  {
    icon: Shield,
    title: "No Experience Needed",
    description:
      "Our polo experiences are designed for complete beginners. Professional instructors guide you every step of the way.",
  },
  {
    icon: Sun,
    title: "300+ Days of Sunshine",
    description:
      "Sotogrande enjoys year-round sunshine, making it the perfect destination for outdoor polo experiences any time of year.",
  },
  {
    icon: Award,
    title: "World-Class Facilities",
    description:
      "Train at facilities used by professional polo players, with well-bred polo ponies and top-quality equipment provided.",
  },
  {
    icon: Users,
    title: "All-Inclusive Packages",
    description:
      "Everything is taken care of — from equipment and instruction to meals and photography. Just show up and enjoy.",
  },
  {
    icon: MapPin,
    title: "Perfect Location",
    description:
      "Between Gibraltar and Marbella, with easy access to beaches, golf, fine dining, and the best of Andalusia.",
  },
  {
    icon: Star,
    title: "Unforgettable Memories",
    description:
      "Professional photos, champagne celebrations, and the thrill of your first chukker — memories that last a lifetime.",
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] bg-gradient-to-br from-primary via-primary/90 to-primary/80">
        <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] opacity-5" />
        <div className="relative mx-auto flex min-h-[80vh] max-w-7xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
          <span className="mb-4 inline-block rounded-full bg-secondary/20 px-4 py-1.5 text-sm font-medium text-secondary">
            Sotogrande, Andalusia, Spain
          </span>
          <h1 className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Discover Polo in
            <span className="block text-secondary">Sotogrande</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80 sm:text-xl">
            Experience the Sport of Kings in one of Europe&apos;s premier polo
            destinations. No experience needed — just your sense of adventure.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button asChild variant="gold" size="xl">
              <Link href="/packages">
                Explore Packages
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="xl"
              className="border-white/30 text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/about">Learn About Polo</Link>
            </Button>
          </div>
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-white/60">
            <span>From €150 per person</span>
            <span className="hidden sm:inline">•</span>
            <span>No experience required</span>
            <span className="hidden sm:inline">•</span>
            <span>Professional instruction</span>
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Our Polo Experiences
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              From a 2-hour discovery to a full week immersion — find your
              perfect polo experience
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {packages.slice(0, 3).map((pkg) => (
              <PackageCard key={pkg.slug} pkg={pkg} />
            ))}
          </div>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {packages.slice(3).map((pkg) => (
              <PackageCard key={pkg.slug} pkg={pkg} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/packages">
                View All Packages & Pricing
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-muted py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Why Choose Sotogrande Polo
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              The perfect polo holiday starts with the right experience
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item) => (
              <div key={item.title} className="rounded-lg bg-white p-6 shadow-sm">
                <item.icon className="h-8 w-8 text-secondary" />
                <h3 className="mt-4 font-serif text-lg font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection />

      {/* CTA Section */}
      <section className="bg-primary py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
            Ready to Experience Polo?
          </h2>
          <p className="mt-4 text-lg text-white/80">
            Whether you&apos;re a complete beginner or looking for your next polo
            adventure, Sotogrande is waiting. Book your experience today and
            discover why polo is called the Sport of Kings.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild variant="gold" size="xl">
              <Link href="/packages">Browse Packages</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="xl"
              className="border-white/30 text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/about#contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Instagram Feed Placeholder */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Follow Our Adventures
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              @sotograndepolo on Instagram
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10"
              >
                <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                  Photo {i + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
