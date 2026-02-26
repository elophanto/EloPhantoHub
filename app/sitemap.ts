import type { MetadataRoute } from "next"
import { getHubIndex } from "@/lib/hub"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://elophanto.com"

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/use-cases`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/download`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/hub`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/hub/search`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.5 },
    { url: `${baseUrl}/hub/submit`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ]

  // Add all skill pages
  const index = await getHubIndex()
  const skillPages: MetadataRoute.Sitemap = index.skills.map((skill) => ({
    url: `${baseUrl}/hub/${skill.name}`,
    lastModified: new Date(skill.updated_at),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [...staticPages, ...skillPages]
}
