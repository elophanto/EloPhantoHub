import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getPackageBySlug, packages } from "@/lib/packages"
import { BookingForm } from "./BookingForm"
import { Check, Clock, Users, MapPin } from "lucide-react"

type Props = {
  params: Promise<{ package: string }>
}

export async function generateStaticParams() {
  return packages.map((pkg) => ({
    package: pkg.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { package: slug } = await params
  const pkg = getPackageBySlug(slug)
  if (!pkg) return {}

  return {
    title: `Book ${pkg.name} | €${pkg.price}`,
    description: `Book your ${pkg.name} in Sotogrande, Spain. ${pkg.duration}, from €${pkg.price}. ${pkg.tagline}. Book online with instant confirmation.`,
    openGraph: {
      title: `Book ${pkg.name} | Sotogrande Polo Tourism`,
      description: `Book your ${pkg.name} in Sotogrande. ${pkg.duration}, €${pkg.price}. All equipment included.`,
      url: `https://sotograndepolo.com/booking/${slug}`,
    },
    alternates: {
      canonical: `https://sotograndepolo.com/booking/${slug}`,
    },
  }
}

export default async function BookingPage({ params }: Props) {
  const { package: slug } = await params
  const pkg = getPackageBySlug(slug)

  if (!pkg) {
    notFound()
  }

  return (
    <>
      {/* Header */}
      <section className="bg-primary py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl font-bold text-white sm:text-4xl">
            Book: {pkg.name}
          </h1>
          <p className="mt-2 text-lg text-white/80">{pkg.tagline}</p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/70">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-secondary" />
              {pkg.duration}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4 text-secondary" />
              {pkg.groupSize}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-secondary" />
              Sotogrande, Spain
            </span>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <BookingForm packageSlug={pkg.slug} packageName={pkg.name} packagePrice={pkg.price} />
            </div>

            {/* Sidebar */}
            <div>
              <div className="sticky top-24 rounded-lg border border-border bg-white p-6 shadow-sm">
                <h3 className="font-serif text-xl font-bold text-foreground">
                  {pkg.name}
                </h3>
                <div className="mt-4">
                  <span className="font-serif text-3xl font-bold text-primary">
                    &euro;{pkg.price}
                  </span>
                  <span className="text-muted-foreground">
                    {pkg.slug === "corporate" ? " /group" : " /person"}
                  </span>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-medium text-foreground">
                    What&apos;s Included:
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {pkg.includes.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-secondary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 rounded-lg bg-accent p-4">
                  <h4 className="text-sm font-medium text-foreground">
                    What to Expect:
                  </h4>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    {pkg.whatToExpect.slice(0, 3).map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 border-t border-border pt-4">
                  <p className="text-xs text-muted-foreground">
                    Full refund for cancellations 48+ hours in advance.
                    Secure payment via Stripe. Instant confirmation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
