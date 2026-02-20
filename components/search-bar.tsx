"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"

interface SearchBarProps {
  defaultValue?: string
  placeholder?: string
}

export function SearchBar({
  defaultValue = "",
  placeholder = "Search skills...",
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/hub/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <Search className="absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/40" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="h-11 w-full border border-border/50 bg-transparent pl-11 pr-4 font-mono text-sm text-foreground placeholder:text-muted-foreground/30 focus:border-foreground/20 focus:outline-none"
      />
    </form>
  )
}
