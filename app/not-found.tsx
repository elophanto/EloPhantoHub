import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6">
      <span className="mb-8 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground/40">
        Error 404
      </span>
      <h1 className="text-6xl font-light tracking-tight sm:text-8xl">
        404
      </h1>
      <p className="mt-6 text-sm text-muted-foreground">
        This page doesn&apos;t exist. The phantom has escaped.
      </p>
      <div className="mt-10 flex gap-4">
        <Link
          href="/"
          className="border border-foreground bg-foreground px-6 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-background transition-colors hover:bg-foreground/90"
        >
          Go Home
        </Link>
        <Link
          href="/hub"
          className="border border-border/50 px-6 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
        >
          Browse Hub
        </Link>
      </div>
    </div>
  )
}
