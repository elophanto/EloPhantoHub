import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { skill_name } = body

    if (!skill_name || typeof skill_name !== "string") {
      return NextResponse.json(
        { error: "skill_name is required" },
        { status: 400 }
      )
    }

    const supabase = createServerSupabaseClient()
    const today = new Date().toISOString().split("T")[0]

    // Upsert download count for today
    const { error } = await supabase.rpc("increment_download_count", {
      p_skill_name: skill_name,
      p_date: today,
    })

    // Fallback if RPC doesn't exist yet — manual upsert
    if (error) {
      const { data: existing } = await supabase
        .from("download_counts")
        .select("count")
        .eq("skill_name", skill_name)
        .eq("date", today)
        .single()

      if (existing) {
        await supabase
          .from("download_counts")
          .update({ count: existing.count + 1 })
          .eq("skill_name", skill_name)
          .eq("date", today)
      } else {
        await supabase
          .from("download_counts")
          .insert({ skill_name, date: today, count: 1 })
      }
    }

    // Get total downloads
    const { data: totals } = await supabase
      .from("download_counts")
      .select("count")
      .eq("skill_name", skill_name)

    const totalDownloads =
      totals?.reduce((sum, row) => sum + (row.count || 0), 0) ?? 0

    return NextResponse.json({ total_downloads: totalDownloads })
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
