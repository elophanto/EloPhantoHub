export interface AgentCensus {
  agent_id: string
  version: string | null
  platform: string | null
  python_version: string | null
  first_seen_at: string
  last_seen_at: string
}

export interface AgentKey {
  id: string
  agent_id: string
  api_key: string
  agent_version: string | null
  created_at: string
  last_seen_at: string | null
  is_active: boolean
}

export interface CollectBuffer {
  id: string
  agent_id: string
  task_id: string
  conversations: unknown
  metadata: CollectMetadata
  embedding: number[] | null
  status: "pending" | "pushed" | "rejected"
  rejection_reason: string | null
  created_at: string
}

export interface CollectMetadata {
  task_type: string
  tools_used: string[]
  success: boolean
  duration_seconds: number
  model_used: string
  timestamp: string
}

export interface CollectLog {
  id: string
  examples_pushed: number
  dataset_size_after: number
  hf_commit_sha: string | null
  pushed_at: string
}

export interface DownloadCount {
  skill_name: string
  date: string
  count: number
}

export interface SkillReport {
  id: string
  skill_name: string
  reporter: string | null
  reason: string
  details: string | null
  status: "open" | "investigating" | "resolved" | "dismissed"
  created_at: string
}
