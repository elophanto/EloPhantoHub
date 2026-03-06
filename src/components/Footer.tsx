import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

const footerLinks = {
  experiences: [
    { name: "Polo Discovery", href: "/packages#discovery" },
    { name: "Weekend Package", href: "/packages#weekend" },
    { name: "Week Immersion", href: "/packages#week-immersion" },
    { name: "Corporate Events", href: "/packages#corporate" },
    { name: "Private Lessons", href: "/packages#private-lessons" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/about#contact" },
    { name: "Partners", href: "/about#partners" },
  ],
  resources: [
    { name: "What is Polo?", href: "/blog/what-is-polo-beginners-guide" },
    { name: "History of Polo in Spain", href: "/blog/history-of-polo-in-spain" },
    { name: "Polo vs Horse Riding", href: "/blog/polo-vs-horse-riding-difference" },
    { name: "Planning Guide", href: "/blog/planning-first-polo-weekend-spain" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-xl font-bold text-secondary">
              Sotogrande Polo
            </h3>
            <p className="mt-4 text-sm text-primary-foreground/80">
              Premium polo experiences in Sotogrande, Spain. Discover the Sport of Kings in one of Europe&apos;s finest polo destinations.
            </p>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
                <MapPin className="h-4 w-4 text-secondary" />
                <span>Sotogrande, Andalusia, Spain</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
                <Phone className="h-4 w-4 text-secondary" />
                <span>+34 690 036 016</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
                <Mail className="h-4 w-4 text-secondary" />
                <span>info@sotograndepolo.com</span>
              </div>
            </div>
          </div>

          {/* Experiences */}
          <div>
            <h4 className="font-semibold text-secondary">Experiences</h4>
            <ul className="mt-4 space-y-2">
              {footerLinks.experiences.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 transition-colors hover:text-secondary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-secondary">Company</h4>
            <ul className="mt-4 space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 transition-colors hover:text-secondary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-secondary">Resources</h4>
            <ul className="mt-4 space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 transition-colors hover:text-secondary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-primary-foreground/20 pt-8">
          <p className="text-center text-sm text-primary-foreground/60">
            &copy; {new Date().getFullYear()} Sotogrande Polo Tourism. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
