const SECRET_PATTERNS = [
  /(?:api[_-]?key|apikey)\s*[:=]\s*['"]?[\w-]{20,}/i,
  /(?:password|passwd|pwd)\s*[:=]\s*['"]?[^\s'"]{8,}/i,
  /(?:secret|token)\s*[:=]\s*['"]?[\w-]{20,}/i,
  /ghp_[a-zA-Z0-9]{36}/,
  /gho_[a-zA-Z0-9]{36}/,
  /github_pat_[a-zA-Z0-9]{22}_[a-zA-Z0-9]{59}/,
  /sk-[a-zA-Z0-9]{32,}/,
  /sk-proj-[a-zA-Z0-9-_]{80,}/,
  /Bearer\s+eyJ[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+/,
  /xox[bpors]-[a-zA-Z0-9-]+/,
  /-----BEGIN (?:RSA |EC )?PRIVATE KEY-----/,
  /AKIA[0-9A-Z]{16}/,
  /hf_[a-zA-Z0-9]{34}/,
]

export function scanForSecrets(text: string): string[] {
  const findings: string[] = []
  const stringified = typeof text === "string" ? text : JSON.stringify(text)

  for (const pattern of SECRET_PATTERNS) {
    if (pattern.test(stringified)) {
      findings.push(`secret_detected: ${pattern.source.slice(0, 30)}...`)
    }
  }
  return findings
}

export interface CollectPayload {
  agent_version?: string
  examples: CollectExample[]
}

export interface CollectExample {
  id: string
  conversations: unknown
  metadata: {
    task_type: string
    tools_used: string[]
    success: boolean
    duration_seconds: number
    model_used: string
    timestamp: string
  }
}

export function validateCollectPayload(
  payload: unknown
): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!payload || typeof payload !== "object") {
    return { valid: false, errors: ["Invalid payload"] }
  }

  const p = payload as Record<string, unknown>

  if (!Array.isArray(p.examples)) {
    errors.push("Missing or invalid 'examples' array")
    return { valid: false, errors }
  }

  if (p.examples.length === 0) {
    errors.push("Empty examples array")
    return { valid: false, errors }
  }

  if (p.examples.length > 50) {
    errors.push("Too many examples (max 50 per request)")
    return { valid: false, errors }
  }

  for (let i = 0; i < p.examples.length; i++) {
    const ex = p.examples[i] as Record<string, unknown>
    if (!ex.id || typeof ex.id !== "string") {
      errors.push(`examples[${i}]: missing or invalid 'id'`)
    }
    if (!ex.conversations) {
      errors.push(`examples[${i}]: missing 'conversations'`)
    }
    if (!ex.metadata || typeof ex.metadata !== "object") {
      errors.push(`examples[${i}]: missing or invalid 'metadata'`)
    }
  }

  return { valid: errors.length === 0, errors }
}
