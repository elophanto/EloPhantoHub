import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { OrganizationJsonLd } from "@/components/JsonLd"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://sotograndepolo.com"),
  title: {
    default: "Polo Holidays Spain | Sotogrande Polo Tourism",
    template: "%s | Sotogrande Polo Tourism",
  },
  description:
    "Discover polo in Sotogrande, Spain. Beginner-friendly polo lessons, weekend packages, and luxury equestrian holidays in Andalusia. Book your polo experience today.",
  keywords: [
    "polo holidays spain",
    "horse riding holidays andalucia",
    "sotogrande polo",
    "polo lessons sotogrande",
    "polo experience spain",
    "luxury equestrian tourism",
    "polo weekend spain",
    "corporate team building spain",
  ],
  authors: [{ name: "Sotogrande Polo Tourism" }],
  creator: "Sotogrande Polo Tourism",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://sotograndepolo.com",
    siteName: "Sotogrande Polo Tourism",
    title: "Polo Holidays Spain | Sotogrande Polo Tourism",
    description:
      "Discover polo in Sotogrande, Spain. Beginner-friendly polo lessons, weekend packages, and luxury equestrian holidays in Andalusia.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Polo in Sotogrande, Spain",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Polo Holidays Spain | Sotogrande Polo Tourism",
    description:
      "Discover polo in Sotogrande, Spain. Beginner-friendly polo lessons, weekend packages, and luxury equestrian holidays.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://sotograndepolo.com",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <OrganizationJsonLd />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
