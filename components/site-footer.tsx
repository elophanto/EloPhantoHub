import Link from "next/link"
import Image from "next/image"

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-border/50">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5">
              <Image
                src="/logo.webp"
                alt="EloPhanto"
                width={24}
                height={24}
                className="dark:invert"
              />
              <span className="font-mono text-xs uppercase tracking-[0.2em]">
                EloPhanto
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A self-evolving AI agent<br />that lives on your machine.
            </p>
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Product
            </span>
            <ul className="mt-4 space-y-3">
              {[
                { label: "Download", href: "/download" },
                { label: "Hub", href: "/hub" },
                { label: "Submit a Skill", href: "/hub/submit" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-opacity hover:opacity-100"
                    style={{ opacity: 0.6 }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Community
            </span>
            <ul className="mt-4 space-y-3">
              {[
                { label: "GitHub", href: "https://github.com/elophanto/EloPhanto" },
                { label: "Hub Repository", href: "https://github.com/elophanto/elophantohub" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground transition-opacity hover:opacity-100"
                    style={{ opacity: 0.6 }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Legal
            </span>
            <ul className="mt-4 space-y-3">
              {[
                { label: "Apache 2.0 License", href: "https://github.com/elophanto/EloPhanto/blob/main/LICENSE" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-sm text-muted-foreground transition-opacity hover:opacity-100"
                    style={{ opacity: 0.6 }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-16 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground/40">
            &copy; {new Date().getFullYear()} EloPhanto
          </span>
        </div>
      </div>
    </footer>
  )
}
