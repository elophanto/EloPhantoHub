import Link from "next/link"
import { Clock, Users, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import type { Package } from "@/lib/packages"

export function PackageCard({ pkg }: { pkg: Package }) {
  return (
    <Card className="flex flex-col transition-shadow hover:shadow-lg" id={pkg.slug}>
      <div className="relative h-48 w-full overflow-hidden rounded-t-lg bg-gradient-to-br from-primary/20 to-primary/5">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-serif text-4xl text-primary/30">Polo</span>
        </div>
      </div>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-serif text-xl font-bold text-foreground">
              {pkg.name}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{pkg.tagline}</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {pkg.duration}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {pkg.groupSize}
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-foreground/80">{pkg.description}</p>
        <div className="mt-4">
          <p className="text-sm font-medium text-foreground">Includes:</p>
          <ul className="mt-2 space-y-1">
            {pkg.includes.slice(0, 4).map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-secondary" />
                {item}
              </li>
            ))}
            {pkg.includes.length > 4 && (
              <li className="text-sm text-secondary">
                +{pkg.includes.length - 4} more included
              </li>
            )}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t border-border pt-6">
        <div>
          <span className="font-serif text-2xl font-bold text-primary">
            &euro;{pkg.price}
          </span>
          <span className="text-sm text-muted-foreground">
            {pkg.slug === "corporate" ? " /group" : " /person"}
          </span>
        </div>
        <Button asChild variant="gold">
          <Link href={`/booking/${pkg.slug}`}>Book Now</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
