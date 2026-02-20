import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowDownToLine,
  Calendar,
  ExternalLink,
  Flag,
  GitBranch,
  Package,
} from "lucide-react"
import { InstallCommand } from "@/components/install-command"
import { SkillCard } from "@/components/skill-card"
import {
  getAllSkillNames,
  getSkillByName,
  getRelatedSkills,
} from "@/lib/hub"

const tierLabels: Record<string, string> = {
  official: "Official",
  trusted: "Trusted",
  verified: "Verified",
  new: "New Publisher",
}

export async function generateStaticParams() {
  const names = await getAllSkillNames()
  return names.map((name) => ({ skill: name }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ skill: string }>
}): Promise<Metadata> {
  const { skill: skillName } = await params
  const skill = await getSkillByName(skillName)
  if (!skill) return { title: "Skill Not Found" }
  return {
    title: `${skill.name} — EloPhantoHub`,
    description: skill.description,
  }
}

export default async function SkillDetailPage({
  params,
}: {
  params: Promise<{ skill: string }>
}) {
  const { skill: skillName } = await params
  const skill = await getSkillByName(skillName)
  if (!skill) notFound()

  const related = await getRelatedSkills(skill)

  return (
    <div className="mx-auto max-w-5xl px-6 pt-32 pb-24 sm:px-8 sm:pt-40 lg:px-12">
      {/* Header */}
      <div className="mb-16">
        <div className="mb-4 flex items-center gap-3">
          <Link
            href="/hub"
            className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-foreground"
          >
            Hub
          </Link>
          <span className="text-muted-foreground/30">/</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            {skill.category}
          </span>
        </div>

        <h1 className="text-3xl font-light tracking-tight sm:text-4xl">
          {skill.name}
        </h1>

        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
          {skill.description}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
          <span className="font-mono text-[11px] text-muted-foreground">
            by <span className="text-foreground">{skill.author}</span>
          </span>
          <span className="font-mono text-[11px] text-muted-foreground">
            v{skill.version}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground/60">
            {tierLabels[skill.author_tier] || skill.author_tier}
          </span>
          {skill.bundled && (
            <span className="flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground/60">
              <Package className="h-3 w-3" />
              Bundled
            </span>
          )}
        </div>
      </div>

      <div className="grid gap-16 lg:grid-cols-[1fr_280px]">
        {/* Main Content */}
        <div>
          {/* Install */}
          <div className="mb-12">
            <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Install
            </span>
            <InstallCommand
              command={`elophanto skills hub install ${skill.name}`}
            />
          </div>

          {/* Stats */}
          <div className="mb-12 grid grid-cols-2 gap-px border border-border/50 bg-border/50 sm:grid-cols-3">
            <div className="bg-background p-5">
              <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
                Downloads
              </span>
              <span className="mt-1 flex items-center gap-1.5 font-mono text-lg">
                <ArrowDownToLine className="h-3.5 w-3.5 text-muted-foreground/40" />
                {skill.downloads.toLocaleString()}
              </span>
            </div>
            <div className="bg-background p-5">
              <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
                License
              </span>
              <span className="mt-1 block font-mono text-lg">
                {skill.license}
              </span>
            </div>
            <div className="bg-background p-5">
              <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
                Compatibility
              </span>
              <span className="mt-1 block font-mono text-lg">
                {skill.elophanto_version}
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className="mb-12">
            <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Tags
            </span>
            <div className="flex flex-wrap gap-2">
              {skill.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/hub/search?tags=${tag}`}
                  className="border border-border/50 px-3 py-1 font-mono text-[11px] text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>

          {/* Report */}
          <button className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground/40 transition-colors hover:text-muted-foreground">
            <Flag className="h-3 w-3" />
            Report this skill
          </button>
        </div>

        {/* Sidebar */}
        <div>
          <div className="sticky top-28 border border-border/50">
            <div className="border-b border-border/50 px-5 py-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Metadata
              </span>
            </div>
            <div className="divide-y divide-border/50">
              <div className="flex justify-between px-5 py-3">
                <span className="font-mono text-[11px] text-muted-foreground/60">Version</span>
                <span className="font-mono text-[11px]">{skill.version}</span>
              </div>
              <div className="flex justify-between px-5 py-3">
                <span className="font-mono text-[11px] text-muted-foreground/60">Category</span>
                <span className="font-mono text-[11px] capitalize">{skill.category}</span>
              </div>
              <div className="flex justify-between px-5 py-3">
                <span className="font-mono text-[11px] text-muted-foreground/60">Updated</span>
                <span className="flex items-center gap-1 font-mono text-[11px]">
                  <Calendar className="h-3 w-3 text-muted-foreground/40" />
                  {new Date(skill.updated_at).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between px-5 py-3">
                <span className="font-mono text-[11px] text-muted-foreground/60">Published</span>
                <span className="font-mono text-[11px]">
                  {new Date(skill.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className="px-5 py-3">
                <span className="font-mono text-[11px] text-muted-foreground/60">Checksum</span>
                <p className="mt-1 truncate font-mono text-[10px] text-muted-foreground/40">
                  {skill.checksum}
                </p>
              </div>
              <div className="px-5 py-3">
                <a
                  href={skill.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  <GitBranch className="h-3 w-3" />
                  View Source
                  <ExternalLink className="h-2.5 w-2.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Skills */}
      {related.length > 0 && (
        <section className="mt-24">
          <span className="mb-8 block font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Related Skills
          </span>
          <div className="grid grid-cols-1 gap-px border border-border/50 bg-border/50 md:grid-cols-2 lg:grid-cols-4">
            {related.map((s) => (
              <SkillCard key={s.name} skill={s} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
