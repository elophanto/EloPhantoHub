# elophanto.com

The official website for [EloPhanto](https://github.com/elophanto/EloPhanto) — a self-evolving AI agent that runs locally as your personal AI operating system.

## Submitting a Skill

Skills are community-contributed and managed via the [EloPhantoHub repository](https://github.com/elophanto/elophantohub).

### How to Submit

1. **Fork** [elophanto/elophantohub](https://github.com/elophanto/elophantohub)
2. **Create** `skills/<your-skill-name>/SKILL.md` and `metadata.json` in your fork
3. **Open a Pull Request** — CI automatically runs security scan, schema validation, and typosquat check
4. **Automated review** — scanner checks for malicious patterns, prompt injection, and obfuscation
5. **Human review** — new publishers need maintainer review; verified publishers need one community approval
6. **Published** — merged PRs auto-update `index.json` with SHA-256 checksums; your skill is live

### metadata.json Template

```json
{
  "name": "your-skill-name",
  "description": "A clear description of what your skill does.",
  "version": "1.0.0",
  "author": "your-github-username",
  "author_tier": "new",
  "tags": ["category1", "category2"],
  "license": "MIT",
  "elophanto_version": ">=0.1.0",
  "category": "productivity",
  "featured": false
}
```

### Publisher Tiers

| Tier     | Requirements                                                         |
|----------|----------------------------------------------------------------------|
| New      | First-time publisher. Full maintainer review required.               |
| Verified | 3+ published skills, GitHub account 90+ days, no security flags.     |
| Trusted  | 10+ published skills, high downloads, consistent quality.            |
| Official | Core team or vetted partner.                                         |

### Content Security Policy

All hub skills pass through a 7-layer security pipeline: publisher verification, automated CI scanning, human review, SHA-256 integrity checksums, content security policy, runtime protection, and incident response.

**Allowed:** Markdown formatting, code blocks, links, configuration examples, tool definitions.

**Blocked:** Embedded scripts, external resource loading, system prompt overrides, obfuscated content, remote script execution.

## Bundled Skills

These 29 skills ship with EloPhanto out of the box:

| Skill                        | Category      |
|------------------------------|---------------|
| browser-automation           | automation    |
| email-agent                  | communication |
| research                     | productivity  |
| frontend-design              | design        |
| ui-ux-pro-max                | design        |
| mcp-builder                  | development   |
| file-management              | productivity  |
| goals                        | productivity  |
| nextjs                       | development   |
| react-best-practices         | development   |
| typescript-nodejs            | development   |
| python                       | development   |
| shadcn                       | development   |
| prisma                       | development   |
| supabase                     | development   |
| design-lab                   | design        |
| interface-design             | design        |
| interaction-design           | design        |
| canvas-design                | design        |
| baseline-ui                  | design        |
| web-design-guidelines        | design        |
| 12-principles-of-animation   | design        |
| composition-patterns         | design        |
| swiftui-ui-patterns          | design        |
| webapp-testing               | development   |
| fixing-accessibility         | development   |
| fixing-metadata              | development   |
| fixing-motion-performance    | development   |
| wcag-audit-patterns          | development   |

## License

Apache 2.0
