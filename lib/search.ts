import Fuse from "fuse.js"
import type { Skill } from "./hub"

export function createSkillSearch(skills: Skill[]) {
  return new Fuse(skills, {
    keys: [
      { name: "name", weight: 3 },
      { name: "description", weight: 2 },
      { name: "tags", weight: 1.5 },
      { name: "author", weight: 0.5 },
    ],
    threshold: 0.3,
    includeScore: true,
  })
}
