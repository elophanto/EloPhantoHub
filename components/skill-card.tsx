import Link from "next/link"
import { ArrowDownToLine, Package } from "lucide-react"
import type { Skill } from "@/lib/hub"

export function SkillCard({ skill }: { skill: Skill }) {
  return (
    <Link href={`/hub/${skill.name}`} className="group block">
      <div className="h-full border border-border/50 bg-background p-5 transition-colors hover:bg-card sm:p-6">
        <div className="mb-3 flex items-start justify-between">
          <h3 className="font-mono text-xs uppercase tracking-[0.05em] group-hover:opacity-70">
            {skill.name}
          </h3>
          <div className="flex shrink-0 items-center gap-2">
            {skill.bundled && (
              <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted-foreground/60">
                <Package className="mr-0.5 inline h-3 w-3" />
                Bundled
              </span>
            )}
            <span className="font-mono text-[10px] text-muted-foreground/40">
              {skill.version}
            </span>
          </div>
        </div>
        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {skill.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {skill.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted-foreground/50"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground/40">
            <ArrowDownToLine className="h-3 w-3" />
            {skill.downloads}
          </span>
        </div>
      </div>
    </Link>
  )
}
