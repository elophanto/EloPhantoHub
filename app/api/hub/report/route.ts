import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { skill_name, reporter, reason, details } = body

    if (!skill_name || typeof skill_name !== "string") {
      return NextResponse.json(
        { error: "skill_name is required" },
        { status: 400 }
      )
    }

    if (!reason || typeof reason !== "string") {
      return NextResponse.json(
        { error: "reason is required" },
        { status: 400 }
      )
    }

    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase
      .from("skill_reports")
      .insert({
        skill_name,
        reporter: reporter || "web",
        reason,
        details: details || null,
        status: "open",
      })
      .select("id, status")
      .single()

    if (error) {
      console.error("Report insert error:", error)
      return NextResponse.json(
        { error: "Failed to submit report" },
        { status: 500 }
      )
    }

    // Optionally create a GitHub issue
    if (process.env.GITHUB_TOKEN) {
      try {
        await fetch(
          "https://api.github.com/repos/elophanto/elophantohub/issues",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
              "Content-Type": "application/json",
              Accept: "application/vnd.github+json",
            },
            body: JSON.stringify({
              title: `[Report] Skill: ${skill_name} — ${reason}`,
              body: `**Skill:** ${skill_name}\n**Reporter:** ${reporter || "web"}\n**Reason:** ${reason}\n**Details:** ${details || "None"}\n\n---\n*Auto-generated from elophanto.com skill report.*`,
              labels: ["security", "skill-report"],
            }),
          }
        )
      } catch {
        // Non-critical — don't fail the response
      }
    }

    return NextResponse.json({
      report_id: data.id,
      status: data.status,
    })
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
