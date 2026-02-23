import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "EloPhanto — A self-evolving AI agent",
    template: "%s | EloPhanto",
  },
  description:
    "A self-evolving AI agent that lives on your machine. Local-first, multi-channel, browser-capable — learns as it works.",
  metadataBase: new URL("https://elophanto.com"),
  keywords: [
    "AI agent",
    "local AI",
    "self-evolving",
    "browser automation",
    "MCP",
    "multi-channel",
    "open source",
    "EloPhanto",
  ],
  authors: [{ name: "EloPhanto", url: "https://elophanto.com" }],
  creator: "EloPhanto",
  publisher: "EloPhanto",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "EloPhanto — A self-evolving AI agent",
    description:
      "A self-evolving AI agent that lives on your machine. Local-first, multi-channel, browser-capable — learns as it works.",
    url: "https://elophanto.com",
    siteName: "EloPhanto",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "EloPhanto — A self-evolving AI agent",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EloPhanto — A self-evolving AI agent",
    description:
      "A self-evolving AI agent that lives on your machine. Local-first, multi-channel, browser-capable — learns as it works.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://elophanto.com",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
