import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  MapPin,
  Plane,
  Car,
  Sun,
  Mountain,
  Waves,
  UtensilsCrossed,
  Clock,
} from "lucide-react"

export const metadata: Metadata = {
  title: "About Polo in Sotogrande | Location & History",
  description:
    "Learn about polo in Sotogrande, Spain. Discover the history of polo, how to get to Sotogrande, nearby attractions, and our partnership with local polo clubs.",
  keywords: [
    "sotogrande attractions",
    "what is polo",
    "polo history spain",
    "sotogrande location",
    "how to get to sotogrande",
    "polo rules",
  ],
  openGraph: {
    title: "About Polo in Sotogrande | Sotogrande Polo Tourism",
    description:
      "Learn about polo in Sotogrande, Spain. History, location, how to get there, and nearby attractions.",
    url: "https://sotograndepolo.com/about",
  },
  alternates: {
    canonical: "https://sotograndepolo.com/about",
  },
}

const gettingThere = [
  {
    icon: Plane,
    title: "Gibraltar Airport (GIB)",
    detail: "20 minutes by car",
    description:
      "The closest airport, served by British Airways and easyJet from London. Small and efficient.",
  },
  {
    icon: Plane,
    title: "Málaga Airport (AGP)",
    detail: "90 minutes by car",
    description:
      "Major international airport with flights from all European cities. Best for non-UK travelers.",
  },
  {
    icon: Car,
    title: "By Car",
    detail: "Easy motorway access",
    description:
      "Excellent road connections via the AP-7 motorway. Car rental recommended for exploring the area.",
  },
]

const nearbyAttractions = [
  {
    icon: Mountain,
    name: "Gibraltar",
    distance: "20 min",
    description:
      "Famous Rock, Barbary macaques, duty-free shopping, British culture meets Mediterranean warmth.",
  },
  {
    icon: Waves,
    name: "Tarifa",
    distance: "40 min",
    description:
      "Europe's southernmost point. Whale watching, world-class windsurfing, views of Africa across the strait.",
  },
  {
    icon: UtensilsCrossed,
    name: "Marbella",
    distance: "45 min",
    description:
      "Glamorous resort town with old-town charm, luxury shopping, fine dining, and vibrant nightlife.",
  },
  {
    icon: Mountain,
    name: "Ronda",
    distance: "1.5 hours",
    description:
      "Spectacular hilltop town with a Roman bridge spanning a dramatic gorge. One of Spain's most beautiful cities.",
  },
  {
    icon: UtensilsCrossed,
    name: "Jerez de la Frontera",
    distance: "1 hour",
    description:
      "Home of sherry wine, flamenco, and the Royal Andalusian School of Equestrian Art.",
  },
  {
    icon: Sun,
    name: "Playa de Bolonia",
    distance: "30 min",
    description:
      "One of Spain's most beautiful beaches with ancient Roman ruins nearby. Crystal clear waters.",
  },
]

const poloTerms = [
  {
    term: "Chukker",
    definition:
      "A period of play lasting 7 minutes. Matches typically have 4-6 chukkers.",
  },
  {
    term: "Handicap",
    definition:
      "A player's skill rating from -2 (beginner) to 10 (the best in the world). Only about 10 players worldwide hold a 10-goal rating.",
  },
  {
    term: "Mallet",
    definition:
      "The stick used to hit the ball, made of bamboo with a hardwood head. Length varies from 48-54 inches.",
  },
  {
    term: "Polo Pony",
    definition:
      "Despite the name, polo horses are full-sized thoroughbreds selected for speed, agility, and temperament.",
  },
  {
    term: "Throw-in",
    definition:
      "How play begins — the umpire bowls the ball between the two teams lined up facing each other.",
  },
  {
    term: "Line of the Ball",
    definition:
      "The imaginary line traced by the ball's path. Right of way follows this line — crossing it is a foul.",
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl font-bold text-white sm:text-5xl">
            About Polo in Sotogrande
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            Discover Sotogrande — Spain&apos;s polo capital, where sunshine,
            world-class facilities, and centuries of equestrian tradition come
            together.
          </p>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground">
                Where is Sotogrande?
              </h2>
              <p className="mt-4 text-muted-foreground">
                Sotogrande sits on Spain&apos;s southern coast, on the Costa de
                la Luz between Gibraltar and Marbella. This exclusive
                residential development enjoys over 300 days of sunshine per
                year and is surrounded by some of Andalusia&apos;s most
                spectacular attractions.
              </p>
              <p className="mt-4 text-muted-foreground">
                The area is famous for world-class golf (including the legendary
                Valderrama), pristine beaches, a vibrant marina, and — of
                course — polo. The Santa Maria Polo Club has hosted
                international tournaments for nearly 50 years, making
                Sotogrande the undisputed polo capital of Spain.
              </p>
              <div className="mt-8 flex items-center gap-2 rounded-lg bg-accent p-4">
                <MapPin className="h-5 w-5 text-secondary" />
                <span className="text-sm text-foreground">
                  Sotogrande, 11310 San Roque, Cádiz, Andalusia, Spain
                </span>
              </div>
            </div>
            <div className="rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 p-8">
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <MapPin className="mx-auto h-12 w-12 text-primary/40" />
                  <p className="mt-4 text-sm text-muted-foreground">
                    Interactive map placeholder
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Getting There */}
      <section className="bg-muted py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-serif text-3xl font-bold text-foreground">
            How to Get Here
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {gettingThere.map((item) => (
              <Card key={item.title}>
                <CardContent className="p-6">
                  <item.icon className="h-8 w-8 text-secondary" />
                  <h3 className="mt-4 font-serif text-lg font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-1 flex items-center gap-1 text-sm text-secondary">
                    <Clock className="h-3.5 w-3.5" />
                    {item.detail}
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Attractions */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-serif text-3xl font-bold text-foreground">
              Nearby Attractions
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Sotogrande is perfectly positioned for exploring Andalusia
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {nearbyAttractions.map((attraction) => (
              <div
                key={attraction.name}
                className="flex gap-4 rounded-lg border border-border p-4"
              >
                <attraction.icon className="h-6 w-6 shrink-0 text-secondary" />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-foreground">
                      {attraction.name}
                    </h3>
                    <span className="rounded-full bg-accent px-2 py-0.5 text-xs text-muted-foreground">
                      {attraction.distance}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {attraction.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Polo */}
      <section className="bg-primary py-16 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-serif text-3xl font-bold">
                What is Polo?
              </h2>
              <p className="mt-4 text-white/80">
                Polo is a team sport played on horseback between two teams of
                four riders. Players use long-handled mallets to drive a small
                ball through the opposing team&apos;s goal posts. Matches are
                divided into periods called &ldquo;chukkers,&rdquo; each lasting
                seven minutes.
              </p>
              <p className="mt-4 text-white/80">
                Often called &ldquo;the Sport of Kings,&rdquo; polo has a
                history stretching back over 2,500 years to Central Asia. Today,
                it is played in over 80 countries, with Argentina, England, and
                Spain among the top polo nations.
              </p>
              <h3 className="mt-8 font-serif text-xl font-bold text-secondary">
                A Brief History
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-white/80">
                <li className="flex gap-3">
                  <span className="font-medium text-secondary">500 BC:</span>
                  Polo originates in Central Asia as cavalry training
                </li>
                <li className="flex gap-3">
                  <span className="font-medium text-secondary">1850s:</span>
                  British officers discover polo in India
                </li>
                <li className="flex gap-3">
                  <span className="font-medium text-secondary">1870s:</span>
                  First polo clubs established in England and Argentina
                </li>
                <li className="flex gap-3">
                  <span className="font-medium text-secondary">1960s:</span>
                  Santa Maria Polo Club founded in Sotogrande
                </li>
                <li className="flex gap-3">
                  <span className="font-medium text-secondary">Today:</span>
                  Sotogrande hosts international tournaments annually
                </li>
              </ul>
              <div className="mt-8">
                <Button asChild variant="gold">
                  <Link href="/blog/what-is-polo-beginners-guide">
                    Read Our Full Beginner&apos;s Guide
                  </Link>
                </Button>
              </div>
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-secondary">
                Polo Terminology
              </h3>
              <div className="mt-6 space-y-4">
                {poloTerms.map((item) => (
                  <div
                    key={item.term}
                    className="rounded-lg bg-white/10 p-4"
                  >
                    <h4 className="font-medium text-secondary">{item.term}</h4>
                    <p className="mt-1 text-sm text-white/70">
                      {item.definition}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 sm:py-24" id="partners">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-serif text-3xl font-bold text-foreground">
              Our Partners
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We work with Sotogrande&apos;s finest polo clubs and hospitality
              providers
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <Card>
              <CardContent className="p-8">
                <h3 className="font-serif text-xl font-bold text-foreground">
                  Polo Valley
                </h3>
                <p className="mt-1 text-sm text-secondary">
                  Premier Polo Facility Partner
                </p>
                <p className="mt-4 text-muted-foreground">
                  Polo Valley is our primary facility partner, providing
                  world-class polo grounds, well-trained horses, and
                  professional instructors. Their learner-focused approach makes
                  them the perfect partner for our tourism experiences.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-8">
                <h3 className="font-serif text-xl font-bold text-foreground">
                  Santa Maria Polo Club
                </h3>
                <p className="mt-1 text-sm text-secondary">
                  Tournament & Events Partner
                </p>
                <p className="mt-4 text-muted-foreground">
                  The legendary Santa Maria Polo Club provides tournament
                  access, VIP experiences, and seasonal match-watching
                  opportunities for our guests during the summer polo season
                  (July-August).
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-muted py-16 sm:py-24" id="contact">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-serif text-3xl font-bold text-foreground">
              Contact Us
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Have questions? We&apos;d love to hear from you. Send us a message
              and we&apos;ll respond within 24 hours.
            </p>
          </div>
          <Card className="mt-12">
            <CardContent className="p-8">
              <form className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="How can we help?"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your plans..."
                    className="mt-1"
                    rows={5}
                  />
                </div>
                <Button type="submit" variant="gold" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}
