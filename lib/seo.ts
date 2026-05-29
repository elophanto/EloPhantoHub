import type { Metadata } from "next"

export const siteConfig = {
  name: "EloPhanto",
  url: "https://elophanto.com",
  ogImage: "/og-image.png",
  description:
    "An open-source autonomous AI agent with a self-model that actually moves – identity, ego, and affect grounded in published psychology. Runs locally: your machine, your keys, your data.",
}

type CreateMetadataOptions = {
  title: string
  description: string
  path?: string
  canonicalPath?: string
  keywords?: string[]
  noIndex?: boolean
}

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString()
}

export function createMetadata({
  title,
  description,
  path = "/",
  canonicalPath,
  keywords,
  noIndex,
}: CreateMetadataOptions): Metadata {
  const url = absoluteUrl(path)
  const canonical = absoluteUrl(canonicalPath ?? path)

  return {
    title: { absolute: title },
    description,
    keywords,
    alternates: {
      canonical,
    },
    robots: noIndex
      ? {
          index: false,
          follow: true,
          googleBot: { index: false, follow: true },
        }
      : undefined,
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.ogImage],
    },
  }
}
