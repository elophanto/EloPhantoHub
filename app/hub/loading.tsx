function SkeletonCard() {
  return (
    <div className="bg-background p-5 sm:p-6">
      <div className="mb-3 flex items-center justify-between">
        <div className="h-3 w-28 animate-pulse bg-muted" />
        <div className="h-3 w-10 animate-pulse bg-muted" />
      </div>
      <div className="mb-4 space-y-2">
        <div className="h-3 w-full animate-pulse bg-muted" />
        <div className="h-3 w-3/4 animate-pulse bg-muted" />
      </div>
      <div className="flex gap-2">
        <div className="h-5 w-14 animate-pulse bg-muted" />
        <div className="h-5 w-18 animate-pulse bg-muted" />
      </div>
    </div>
  )
}

export default function HubLoading() {
  return (
    <div className="mx-auto max-w-7xl px-6 pt-32 pb-24 sm:px-8 sm:pt-40 lg:px-12">
      {/* Header skeleton */}
      <div className="mb-16">
        <div className="h-3 w-20 animate-pulse bg-muted" />
        <div className="mt-4 h-8 w-48 animate-pulse bg-muted" />
        <div className="mt-4 h-4 w-64 animate-pulse bg-muted" />
      </div>

      {/* Search skeleton */}
      <div className="mb-8 max-w-md">
        <div className="h-11 w-full animate-pulse border border-border/50 bg-muted/30" />
      </div>

      {/* Tags skeleton */}
      <div className="mb-16 flex gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-7 w-20 animate-pulse bg-muted" />
        ))}
      </div>

      {/* Section label skeleton */}
      <div className="mb-6 h-3 w-16 animate-pulse bg-muted" />

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 gap-px border border-border/50 bg-border/50 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  )
}
