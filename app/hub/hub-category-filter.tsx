"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { TagFilter } from "@/components/tag-filter"
import type { Category, Skill } from "@/lib/hub"

interface HubCategoryFilterProps {
  categories: Category[]
  skills: Skill[]
}

export function HubCategoryFilter({ categories }: HubCategoryFilterProps) {
  const [selected, setSelected] = useState<string[]>([])
  const router = useRouter()

  const handleChange = (newSelected: string[]) => {
    setSelected(newSelected)
    if (newSelected.length > 0) {
      router.push(`/hub/search?tags=${newSelected.join(",")}`)
    }
  }

  return (
    <TagFilter
      categories={categories}
      selected={selected}
      onChange={handleChange}
    />
  )
}
