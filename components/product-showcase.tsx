import Image from "next/image"

/* Framed product screenshots pulled straight from the running web
 * dashboard (misc/screenshots in the EloPhanto repo). These are the
 * actual UI, not mockups – proof the thing is real. */

function Frame({
  src,
  alt,
  label,
  caption,
  priority = false,
}: {
  src: string
  alt: string
  label: string
  caption: string
  priority?: boolean
}) {
  return (
    <figure className="group">
      <div className="overflow-hidden border border-border/50 bg-card">
        {/* faux window bar */}
        <div className="flex items-center gap-2 border-b border-border/50 px-4 py-2.5">
          <span className="h-2 w-2 rounded-full bg-border" />
          <span className="h-2 w-2 rounded-full bg-border" />
          <span className="h-2 w-2 rounded-full bg-border" />
          <span className="ml-3 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/60">
            localhost:3000 / {label}
          </span>
        </div>
        <Image
          src={src}
          alt={alt}
          width={3012}
          height={1580}
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 1100px"
          className="h-auto w-full"
        />
      </div>
      <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground/70">
        {caption}
      </figcaption>
    </figure>
  )
}

export function ProductShowcase() {
  return (
    <div className="space-y-10">
      <Frame
        src="/screenshots/dashboard.png"
        alt="EloPhanto web dashboard showing mind, goals, stats, capabilities, and swarm"
        label="dashboard"
        caption="The dashboard – mind, goals, tool registry, learned capabilities, and the specialist swarm, in real time."
        priority
      />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <Frame
          src="/screenshots/chat.png"
          alt="EloPhanto chat interface"
          label="chat"
          caption="Chat – one conversation across every channel."
        />
        <Frame
          src="/screenshots/knowledge.png"
          alt="EloPhanto knowledge base with embeddings and lesson extraction"
          label="knowledge"
          caption="Knowledge – markdown + embeddings, lessons it wrote itself."
        />
        <Frame
          src="/screenshots/tools.png"
          alt="EloPhanto tool registry with 116 registered tools"
          label="tools"
          caption="Tools – 200+ built-in, searchable, MCP-extensible."
        />
      </div>
    </div>
  )
}
