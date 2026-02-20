import type { Metadata } from "next"
import { getHubIndex } from "@/lib/hub"
import { SearchResults } from "./search-results"

export const metadata: Metadata = {
  title: "Search Skills",
  description: "Search the EloPhantoHub skill registry.",
}

export default async function SearchPage() {
  const index = await getHubIndex()
  return (
    <SearchResults skills={index.skills} categories={index.categories} />
  )
}
