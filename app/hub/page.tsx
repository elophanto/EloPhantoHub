import type { Metadata } from "next"
import {
  getHubIndex,
  getFeaturedSkills,
  getRecentSkills,
  getPopularSkills,
} from "@/lib/hub"
import { SkillCard } from "@/components/skill-card"
import { SearchBar } from "@/components/search-bar"
import { HubCategoryFilter } from "./hub-category-filter"

export const metadata: Metadata = {
  title: "EloPhantoHub — Skill Registry",
  description: "Browse, search, and install skills for EloPhanto.",
}

export default async function HubPage() {
  const [index, featured, recent, popular] = await Promise.all([
    getHubIndex(),
    getFeaturedSkills(),
    getRecentSkills(6),
    getPopularSkills(6),
  ])

  return (
    <div className="mx-auto max-w-7xl px-6 pt-32 pb-24 sm:px-8 sm:pt-40 lg:px-12">
      {/* Header */}
      <div className="mb-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          Skill Registry
        </span>
        <h1 className="mt-4 text-3xl font-light tracking-tight sm:text-4xl lg:text-5xl">
          EloPhanto<em className="font-serif italic">Hub</em>
        </h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
          Discover, install, and share skills for your agent.
        </p>
      </div>

      {/* Search */}
      <div className="mb-8 max-w-md">
        <SearchBar />
      </div>

      {/* Category Tags */}
      <div className="mb-16">
        <HubCategoryFilter categories={index.categories} skills={index.skills} />
      </div>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="mb-20">
          <span className="mb-6 block font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Featured
          </span>
          <div className="grid grid-cols-1 gap-px border border-border/50 bg-border/50 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>
        </section>
      )}

      {/* Most Popular */}
      {popular.length > 0 && (
        <section className="mb-20">
          <span className="mb-6 block font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Most Popular
          </span>
          <div className="grid grid-cols-1 gap-px border border-border/50 bg-border/50 md:grid-cols-2 lg:grid-cols-3">
            {popular.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>
        </section>
      )}

      {/* Recently Added */}
      {recent.length > 0 && (
        <section>
          <span className="mb-6 block font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Recently Added
          </span>
          <div className="grid grid-cols-1 gap-px border border-border/50 bg-border/50 md:grid-cols-2 lg:grid-cols-3">
            {recent.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
