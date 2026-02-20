"use client"

import type { Category } from "@/lib/hub"

interface TagFilterProps {
  categories: Category[]
  selected: string[]
  onChange: (selected: string[]) => void
}

export function TagFilter({ categories, selected, onChange }: TagFilterProps) {
  const toggle = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id))
    } else {
      onChange([...selected, id])
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => {
        const isActive = selected.includes(cat.id)
        return (
          <button
            key={cat.id}
            onClick={() => toggle(cat.id)}
            className={`border px-3 py-1 font-mono text-[11px] transition-colors ${
              isActive
                ? "border-foreground/30 text-foreground"
                : "border-border/50 text-muted-foreground/50 hover:border-foreground/20 hover:text-muted-foreground"
            }`}
          >
            {cat.label}
          </button>
        )
      })}
    </div>
  )
}
