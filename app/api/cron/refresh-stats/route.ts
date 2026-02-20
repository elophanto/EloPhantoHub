import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    // Verify cron secret
    const authHeader = request.headers.get("authorization")
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const supabase = createServerSupabaseClient()

    // Aggregate download counts per skill
    const { data: downloads, error } = await supabase
      .from("download_counts")
      .select("skill_name, count")

    if (error) {
      console.error("Stats refresh error:", error)
      return NextResponse.json(
        { error: "Failed to refresh stats" },
        { status: 500 }
      )
    }

    // Aggregate totals
    const totals: Record<string, number> = {}
    if (downloads) {
      for (const row of downloads) {
        totals[row.skill_name] = (totals[row.skill_name] || 0) + row.count
      }
    }

    return NextResponse.json({
      refreshed_at: new Date().toISOString(),
      skill_count: Object.keys(totals).length,
      totals,
    })
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
