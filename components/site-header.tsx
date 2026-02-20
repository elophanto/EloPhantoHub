"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/hub", label: "Hub" },
  { href: "/download", label: "Download" },
  { href: "/docs", label: "Docs", disabled: true },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo.webp"
            alt="EloPhanto"
            width={28}
            height={28}
            className="dark:invert"
          />
          <span className="font-mono text-xs font-medium uppercase tracking-[0.2em]">
            EloPhanto
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.disabled ? "#" : link.href}
              className={`font-mono text-[11px] uppercase tracking-[0.15em] transition-opacity ${
                link.disabled
                  ? "pointer-events-none opacity-20"
                  : "opacity-50 hover:opacity-100"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 md:hidden">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 border-border/50">
              <SheetTitle className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.2em]">
                <Image
                  src="/logo.webp"
                  alt="EloPhanto"
                  width={20}
                  height={20}
                  className="dark:invert"
                />
                EloPhanto
              </SheetTitle>
              <nav className="mt-12 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.disabled ? "#" : link.href}
                    onClick={() => setOpen(false)}
                    className={`py-3 font-mono text-xs uppercase tracking-[0.15em] transition-opacity ${
                      link.disabled
                        ? "pointer-events-none opacity-20"
                        : "opacity-50 hover:opacity-100"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
