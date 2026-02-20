import Link from "next/link"

export default function SkillNotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6">
      <span className="mb-8 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground/40">
        Not Found
      </span>
      <h1 className="text-3xl font-light tracking-tight sm:text-4xl">
        Skill Not Found
      </h1>
      <p className="mt-4 text-sm text-muted-foreground">
        This skill doesn&apos;t exist or may have been removed.
      </p>
      <div className="mt-10 flex gap-4">
        <Link
          href="/hub"
          className="border border-foreground bg-foreground px-6 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-background transition-colors hover:bg-foreground/90"
        >
          Browse Hub
        </Link>
        <Link
          href="/hub/submit"
          className="border border-border/50 px-6 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
        >
          Submit a Skill
        </Link>
      </div>
    </div>
  )
}
