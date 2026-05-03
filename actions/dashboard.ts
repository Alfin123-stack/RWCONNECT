"use server";

import { createServerSupabaseClient } from "../lib/supabase/server";

export interface DashboardStats {
  announcements: number;
  events: number;
  aspirations: number;
  pendingAspirations: number;
}

export interface DashboardData {
  stats: DashboardStats;
  recentAnnouncements: any[];
  upcomingEvents: any[];
}

export async function getDashboardData(): Promise<DashboardData> {
  const supabase = createServerSupabaseClient();
  const now = new Date().toISOString();

  const [
    { count: announcementCount },
    { count: eventCount },
    { count: aspirationCount },
    { count: pendingCount },
    { data: recentAnnouncements },
    { data: upcomingEvents },
  ] = await Promise.all([
    supabase
      .from("announcements")
      .select("*", { count: "exact", head: true })
      .eq("is_published", true),
    supabase
      .from("events")
      .select("*", { count: "exact", head: true })
      .gte("start_date", now),
    supabase.from("aspirations").select("*", { count: "exact", head: true }),
    supabase
      .from("aspirations")
      .select("*", { count: "exact", head: true })
      .eq("status", "baru"),
    supabase
      .from("announcements")
      .select("*, author:users(full_name, avatar_url)")
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .limit(4),
    supabase
      .from("events")
      .select("*, organizer:users(full_name)")
      .gte("start_date", now)
      .order("start_date", { ascending: true })
      .limit(3),
  ]);

  return {
    stats: {
      announcements: announcementCount ?? 0,
      events: eventCount ?? 0,
      aspirations: aspirationCount ?? 0,
      pendingAspirations: pendingCount ?? 0,
    },
    recentAnnouncements: recentAnnouncements ?? [],
    upcomingEvents: upcomingEvents ?? [],
  };
}
