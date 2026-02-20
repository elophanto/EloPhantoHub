import mockData from "@/data/mock-index.json"

export type Skill = {
  name: string
  description: string
  version: string
  author: string
  author_tier: "new" | "verified" | "trusted" | "official"
  tags: string[]
  downloads: number
  url: string
  checksum: string
  checksum_metadata: string
  license: string
  elophanto_version: string
  created_at: string
  updated_at: string
  featured: boolean
  bundled: boolean
  category: string
}

export type Category = {
  id: string
  label: string
  icon: string
}

export type HubIndex = {
  version: string
  updated_at: string
  skills: Skill[]
  categories: Category[]
}

export async function getHubIndex(): Promise<HubIndex> {
  // In production: fetch from GitHub raw URL
  // https://raw.githubusercontent.com/elophanto/elophantohub/main/index.json
  return mockData as unknown as HubIndex
}

export async function getSkillByName(
  name: string
): Promise<Skill | undefined> {
  const index = await getHubIndex()
  return index.skills.find((s) => s.name === name)
}

export async function getFeaturedSkills(): Promise<Skill[]> {
  const index = await getHubIndex()
  return index.skills.filter((s) => s.featured)
}

export async function getRecentSkills(limit = 6): Promise<Skill[]> {
  const index = await getHubIndex()
  return [...index.skills]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .slice(0, limit)
}

export async function getPopularSkills(limit = 6): Promise<Skill[]> {
  const index = await getHubIndex()
  return [...index.skills]
    .sort((a, b) => b.downloads - a.downloads)
    .slice(0, limit)
}

export async function getRelatedSkills(
  skill: Skill,
  limit = 4
): Promise<Skill[]> {
  const index = await getHubIndex()
  return index.skills
    .filter(
      (s) =>
        s.name !== skill.name && s.tags.some((t) => skill.tags.includes(t))
    )
    .slice(0, limit)
}

export async function getAllSkillNames(): Promise<string[]> {
  const index = await getHubIndex()
  return index.skills.map((s) => s.name)
}
