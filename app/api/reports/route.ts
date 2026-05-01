import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "../../../lib/supabase/server";
import type { ApiResponse } from "../../../types";

// GET /api/reports — dashboard stats for admin
export async function GET(_request: NextRequest) {
  const supabase = createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Unauthorized" },
      { status: 401 },
    );

  const [
    { count: totalAnnouncements },
    { count: totalEvents },
    { count: totalAspirations },
    { count: pendingAspirations },
    { count: resolvedAspirations },
  ] = await Promise.all([
    supabase
      .from("announcements")
      .select("*", { count: "exact", head: true })
      .eq("is_published", true),
    supabase
      .from("events")
      .select("*", { count: "exact", head: true })
      .gte("start_date", new Date().toISOString()),
    supabase.from("aspirations").select("*", { count: "exact", head: true }),
    supabase
      .from("aspirations")
      .select("*", { count: "exact", head: true })
      .eq("status", "baru"),
    supabase
      .from("aspirations")
      .select("*", { count: "exact", head: true })
      .eq("status", "selesai"),
  ]);

  return NextResponse.json<ApiResponse>({
    success: true,
    data: {
      totalAnnouncements,
      totalEvents,
      totalAspirations,
      pendingAspirations,
      resolvedAspirations,
    },
  });
}
