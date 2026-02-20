"use client"

import { useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { SearchBar } from "@/components/search-bar"
import { TagFilter } from "@/components/tag-filter"
import { SkillCard } from "@/components/skill-card"
import { createSkillSearch } from "@/lib/search"
import type { Skill, Category } from "@/lib/hub"

interface SearchResultsProps {
  skills: Skill[]
  categories: Category[]
}

export function SearchResults({ skills, categories }: SearchResultsProps) {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const tagsParam = searchParams.get("tags") || ""

  const [selectedTags, setSelectedTags] = useState<string[]>(
    tagsParam ? tagsParam.split(",") : []
  )
  const [sortBy, setSortBy] = useState<string>("relevance")

  const fuse = useMemo(() => createSkillSearch(skills), [skills])

  const results = useMemo(() => {
    let filtered: Skill[]

    if (query) {
      filtered = fuse.search(query).map((r) => r.item)
    } else {
      filtered = [...skills]
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter((s) =>
        selectedTags.some((t) => s.tags.includes(t) || s.category === t)
      )
    }

    if (sortBy === "downloads") {
      filtered.sort((a, b) => b.downloads - a.downloads)
    } else if (sortBy === "newest") {
      filtered.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
    }

    return filtered
  }, [query, selectedTags, sortBy, fuse, skills])

  return (
    <div className="mx-auto max-w-7xl px-6 pt-32 pb-24 sm:px-8 sm:pt-40 lg:px-12">
      {/* Header */}
      <div className="mb-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          Search
        </span>
        <h1 className="mt-4 text-3xl font-light tracking-tight sm:text-4xl">
          Find Skills
        </h1>
      </div>

      {/* Search */}
      <div className="mb-8 max-w-md">
        <SearchBar defaultValue={query} />
      </div>

      {/* Filters */}
      <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <TagFilter
          categories={categories}
          selected={selectedTags}
          onChange={setSelectedTags}
        />
        <div className="flex items-center gap-2">
          {["relevance", "downloads", "newest"].map((option) => (
            <button
              key={option}
              onClick={() => setSortBy(option)}
              className={`font-mono text-[11px] uppercase tracking-[0.1em] transition-colors ${
                sortBy === option
                  ? "text-foreground"
                  : "text-muted-foreground/40 hover:text-muted-foreground"
              }`}
            >
              {option === "downloads" ? "Popular" : option}
            </button>
          ))}
        </div>
      </div>

      {results.length > 0 ? (
        <>
          <p className="mb-6 font-mono text-[11px] text-muted-foreground">
            {results.length} skill{results.length !== 1 ? "s" : ""} found
            {query && (
              <>
                {" "}for &ldquo;<span className="text-foreground">{query}</span>&rdquo;
              </>
            )}
          </p>
          <div className="grid grid-cols-1 gap-px border border-border/50 bg-border/50 md:grid-cols-2 lg:grid-cols-3">
            {results.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>
        </>
      ) : (
        <div className="py-24 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            No skills found
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Want to create one?{" "}
            <Link href="/hub/submit" className="text-foreground underline underline-offset-4">
              Submit a skill
            </Link>
          </p>
        </div>
      )}
    </div>
  )
}
