import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

interface Testimonial {
  name: string
  location: string
  text: string
  rating: number
  package: string
}

const testimonials: Testimonial[] = [
  {
    name: "James W.",
    location: "London, UK",
    text: "An incredible experience! I had never been on a horse before and within two hours I was playing my first chukker. The instructors were patient and professional.",
    rating: 5,
    package: "Polo Discovery",
  },
  {
    name: "Anna K.",
    location: "Munich, Germany",
    text: "The Weekend Package was the highlight of our trip to Spain. My husband and I both loved it. The champagne toast at the end was the perfect finish.",
    rating: 5,
    package: "Weekend Package",
  },
  {
    name: "Sophie L.",
    location: "Stockholm, Sweden",
    text: "We booked the corporate package for our team retreat and it exceeded all expectations. Everyone was talking about it for weeks afterwards. Truly unique.",
    rating: 5,
    package: "Corporate Team Building",
  },
]

export function TestimonialSection() {
  return (
    <section className="bg-accent py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
            What Our Guests Say
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Hear from visitors who discovered polo in Sotogrande
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name} className="bg-white">
              <CardContent className="p-6">
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-secondary text-secondary"
                    />
                  ))}
                </div>
                <p className="mt-4 text-foreground/80">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-4 border-t border-border pt-4">
                  <p className="font-medium text-foreground">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.location}</p>
                  <p className="mt-1 text-xs text-secondary">{t.package}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
