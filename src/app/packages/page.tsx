import type { Metadata } from "next"
import Link from "next/link"
import { PackageCard } from "@/components/PackageCard"
import { packages } from "@/lib/packages"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Check, X } from "lucide-react"

export const metadata: Metadata = {
  title: "Polo Packages & Lessons | From €150",
  description:
    "Book polo lessons in Sotogrande, Spain. Choose from Discovery (€199), Weekend (€599), Week Immersion (€1,499), Corporate (€2,500), or Private Lessons (€150/hr).",
  keywords: [
    "polo lessons sotogrande",
    "polo experience spain",
    "polo weekend spain",
    "luxury equestrian tourism",
    "polo vacation packages",
    "corporate polo events spain",
  ],
  openGraph: {
    title: "Polo Packages & Lessons | Sotogrande Polo Tourism",
    description:
      "Book polo lessons in Sotogrande. Discovery, Weekend, Week Immersion, Corporate, and Private Lesson packages available.",
    url: "https://sotograndepolo.com/packages",
  },
  alternates: {
    canonical: "https://sotograndepolo.com/packages",
  },
}

const comparisonFeatures = [
  { name: "Duration", discovery: "2 hours", weekend: "2 days", immersion: "5 days", corporate: "4 hours", private: "1 hour" },
  { name: "Riding Instruction", discovery: true, weekend: true, immersion: true, corporate: true, private: true },
  { name: "Equipment Provided", discovery: true, weekend: true, immersion: true, corporate: true, private: true },
  { name: "Lunch Included", discovery: false, weekend: true, immersion: true, corporate: true, private: false },
  { name: "Photo Package", discovery: true, weekend: true, immersion: true, corporate: true, private: false },
  { name: "Accommodation", discovery: false, weekend: false, immersion: true, corporate: false, private: false },
  { name: "Video Analysis", discovery: false, weekend: false, immersion: true, corporate: true, private: false },
  { name: "Certificate", discovery: false, weekend: true, immersion: true, corporate: false, private: false },
  { name: "Champagne Toast", discovery: true, weekend: true, immersion: true, corporate: true, private: false },
  { name: "Branded Polo Shirt", discovery: false, weekend: true, immersion: true, corporate: false, private: false },
]

const faqs = [
  {
    question: "Do I need horse riding experience to try polo?",
    answer:
      "No! All our experiences are designed for complete beginners. Our professional instructors start with basic riding skills before introducing polo-specific techniques. Polo ponies used for beginners are calm and well-trained.",
  },
  {
    question: "What should I wear to a polo lesson?",
    answer:
      "Wear comfortable long trousers (jeans are fine) and a breathable shirt. We provide all polo equipment including helmets, boots, and mallets. Bring sunscreen and sunglasses with a strap.",
  },
  {
    question: "What is the minimum age for polo lessons?",
    answer:
      "We recommend a minimum age of 12 for group experiences and 10 for private lessons. Children must be accompanied by a participating adult.",
  },
  {
    question: "What happens if it rains?",
    answer:
      "Sotogrande enjoys over 300 days of sunshine per year, so rain is rare. If weather forces a cancellation, we offer full rescheduling or a complete refund.",
  },
  {
    question: "How fit do I need to be?",
    answer:
      "Moderate fitness is helpful but not required. If you can ride a bicycle, you can manage a beginner polo lesson. The horses do most of the work — you just need to stay balanced and swing the mallet!",
  },
  {
    question: "Can I book for a large group?",
    answer:
      "Yes! Our Corporate Team Building package accommodates 6-12 people. For larger groups, contact us for a custom quote. We can arrange multiple sessions or extended events.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Full refund for cancellations made 48+ hours before the experience. 50% refund for 24-48 hours notice. No refund for less than 24 hours notice. We recommend travel insurance for international visitors.",
  },
  {
    question: "Do you offer accommodation packages?",
    answer:
      "Our Polo Week Immersion includes 4-star hotel accommodation. For other packages, we partner with local hotels and can recommend options ranging from €80-500 per night. Ask us for recommendations when booking.",
  },
  {
    question: "How do I get to Sotogrande?",
    answer:
      "The nearest airports are Gibraltar (GIB, 20 minutes) and Málaga (AGP, 90 minutes). We recommend renting a car. Airport transfer services are available as an add-on (€80 from Gibraltar, €150 from Málaga).",
  },
  {
    question: "Is polo safe?",
    answer:
      "Safety is our top priority. All participants wear helmets and knee guards. Our instructors are certified professionals, and our polo ponies are specially trained for beginners. Full liability insurance is included in every package.",
  },
]

export default function PackagesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl font-bold text-white sm:text-5xl">
            Polo Packages & Experiences
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            From a 2-hour discovery to a full week immersion — choose the polo
            experience that suits you. All packages include professional
            instruction and equipment.
          </p>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {packages.slice(0, 3).map((pkg) => (
              <PackageCard key={pkg.slug} pkg={pkg} />
            ))}
          </div>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {packages.slice(3).map((pkg) => (
              <PackageCard key={pkg.slug} pkg={pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Comparison Table */}
      <section className="bg-muted py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Compare Packages
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Find the right polo experience for your needs
            </p>
          </div>
          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[800px] border-collapse">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                    Feature
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-foreground">
                    Discovery
                    <div className="text-secondary">&euro;199</div>
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-foreground">
                    Weekend
                    <div className="text-secondary">&euro;599</div>
                  </th>
                  <th className="bg-primary/5 px-4 py-3 text-center text-sm font-medium text-foreground">
                    Week Immersion
                    <div className="text-secondary">&euro;1,499</div>
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-foreground">
                    Corporate
                    <div className="text-secondary">&euro;2,500</div>
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-foreground">
                    Private
                    <div className="text-secondary">&euro;150/hr</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, i) => (
                  <tr
                    key={feature.name}
                    className={i % 2 === 0 ? "bg-white" : "bg-muted/50"}
                  >
                    <td className="px-4 py-3 text-sm font-medium text-foreground">
                      {feature.name}
                    </td>
                    {(["discovery", "weekend", "immersion", "corporate", "private"] as const).map(
                      (pkg) => (
                        <td
                          key={pkg}
                          className={`px-4 py-3 text-center text-sm ${
                            pkg === "immersion" ? "bg-primary/5" : ""
                          }`}
                        >
                          {typeof feature[pkg] === "boolean" ? (
                            feature[pkg] ? (
                              <Check className="mx-auto h-5 w-5 text-primary" />
                            ) : (
                              <X className="mx-auto h-5 w-5 text-muted-foreground/30" />
                            )
                          ) : (
                            <span className="text-muted-foreground">
                              {feature[pkg]}
                            </span>
                          )}
                        </td>
                      )
                    )}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-border">
                  <td className="px-4 py-4"></td>
                  {packages.map((pkg) => (
                    <td key={pkg.slug} className={`px-4 py-4 text-center ${pkg.slug === "week-immersion" ? "bg-primary/5" : ""}`}>
                      <Button asChild variant={pkg.slug === "week-immersion" ? "gold" : "outline"} size="sm">
                        <Link href={`/booking/${pkg.slug}`}>Book</Link>
                      </Button>
                    </td>
                  ))}
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-24" id="faq">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Everything you need to know about polo in Sotogrande
            </p>
          </div>
          <div className="mt-12">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left text-base">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-white">
            Still Have Questions?
          </h2>
          <p className="mt-4 text-lg text-white/80">
            Contact us for help choosing the right package or to arrange a
            custom experience.
          </p>
          <Button asChild variant="gold" size="xl" className="mt-8">
            <Link href="/about#contact">Get in Touch</Link>
          </Button>
        </div>
      </section>
    </>
  )
}
