"use server";

import { createServerSupabaseClient } from "../lib/supabase/server";

export interface ReportsData {
  totalAnnouncements: number;
  totalEvents: number;
  totalAspirations: number;
  pendingAspirations: number;
  resolvedAspirations: number;
  inProgressAspirations: number;
  recentAspirations: {
    title: string;
    status: string;
    category: string;
    created_at: string;
  }[];
  resolutionRate: number;
}

export async function getReportsData(): Promise<ReportsData> {
  const supabase = createServerSupabaseClient();

  const [
    { count: totalAnnouncements },
    { count: totalEvents },
    { count: totalAspirations },
    { count: pendingAspirations },
    { count: resolvedAspirations },
    { count: inProgressAspirations },
    { data: recentAspirations },
  ] = await Promise.all([
    supabase
      .from("announcements")
      .select("*", { count: "exact", head: true })
      .eq("is_published", true),
    supabase.from("events").select("*", { count: "exact", head: true }),
    supabase.from("aspirations").select("*", { count: "exact", head: true }),
    supabase
      .from("aspirations")
      .select("*", { count: "exact", head: true })
      .eq("status", "baru"),
    supabase
      .from("aspirations")
      .select("*", { count: "exact", head: true })
      .eq("status", "selesai"),
    supabase
      .from("aspirations")
      .select("*", { count: "exact", head: true })
      .eq("status", "diproses"),
    supabase
      .from("aspirations")
      .select("title, status, category, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const total = totalAspirations ?? 0;
  const resolved = resolvedAspirations ?? 0;
  const resolutionRate = total ? Math.round((resolved / total) * 100) : 0;

  return {
    totalAnnouncements: totalAnnouncements ?? 0,
    totalEvents: totalEvents ?? 0,
    totalAspirations: total,
    pendingAspirations: pendingAspirations ?? 0,
    resolvedAspirations: resolved,
    inProgressAspirations: inProgressAspirations ?? 0,
    recentAspirations: recentAspirations ?? [],
    resolutionRate,
  };
}
