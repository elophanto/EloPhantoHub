import type { Metadata } from "next"
import { getHubIndex } from "@/lib/hub"
import { createMetadata } from "@/lib/seo"
import { SearchResults } from "./search-results"

export const metadata: Metadata = createMetadata({
  title: "Search EloPhantoHub Skills",
  description:
    "Search the EloPhantoHub AI agent skill registry by keyword, category, tag, popularity, or recency.",
  path: "/hub/search",
  canonicalPath: "/hub",
  noIndex: true,
})

export default async function SearchPage() {
  const index = await getHubIndex()
  return (
    <SearchResults skills={index.skills} categories={index.categories} />
  )
}
