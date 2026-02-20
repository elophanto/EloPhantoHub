import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = createServerSupabaseClient()

    // Latest push stats
    const { data: logData } = await supabase
      .from("collect_log")
      .select("dataset_size_after, pushed_at")
      .order("pushed_at", { ascending: false })
      .limit(1)

    // Pending buffer count
    const { count: bufferSize } = await supabase
      .from("collect_buffer")
      .select("id", { count: "exact", head: true })
      .eq("status", "pending")

    return NextResponse.json({
      dataset_size: logData?.[0]?.dataset_size_after ?? 0,
      buffer_size: bufferSize ?? 0,
      next_training_at: 5000,
      last_push_at: logData?.[0]?.pushed_at ?? null,
    })
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
