import type { MetadataRoute } from "next"
import { getHubIndex } from "@/lib/hub"
import { seoPages } from "@/lib/seo-pages"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://elophanto.com"
  const staticLastModified = new Date("2026-05-05")

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: staticLastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/hire`, lastModified: staticLastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/docs`, lastModified: staticLastModified, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/use-cases`, lastModified: staticLastModified, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/download`, lastModified: staticLastModified, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/hub`, lastModified: staticLastModified, changeFrequency: "weekly", priority: 0.75 },
    { url: `${baseUrl}/hub/submit`, lastModified: staticLastModified, changeFrequency: "monthly", priority: 0.5 },
    ...seoPages.map((page) => ({
      url: `${baseUrl}/${page.slug}`,
      lastModified: staticLastModified,
      changeFrequency: "monthly" as const,
      priority: page.slug === "ai-agent-jobs" ? 0.9 : 0.8,
    })),
  ]

  // Add all skill pages
  const index = await getHubIndex()
  const skillPages: MetadataRoute.Sitemap = index.skills.map((skill) => ({
    url: `${baseUrl}/hub/${encodeURIComponent(skill.name)}`,
    lastModified: new Date(skill.updated_at),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [...staticPages, ...skillPages]
}
