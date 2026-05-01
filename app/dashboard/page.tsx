import type { Metadata } from "next";
import { createServerSupabaseClient } from "../../lib/supabase/server";
import { StatsGrid } from "../../components/dashboard/StatsGrid";
import { QuickActions } from "../../components/dashboard/QuickActions";
import { RecentAnnouncements } from "../../components/dashboard/RecentAnnouncements";
import { UpcomingEvents } from "../../components/dashboard/UpcomingEvents";

export const metadata: Metadata = { title: "Dashboard" };

// SSR - fetch data di server
export default async function DashboardPage() {
  const supabase = createServerSupabaseClient();

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
      .gte("start_date", new Date().toISOString()),
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
      .gte("start_date", new Date().toISOString())
      .order("start_date", { ascending: true })
      .limit(3),
  ]);

  const stats = {
    announcements: announcementCount ?? 0,
    events: eventCount ?? 0,
    aspirations: aspirationCount ?? 0,
    pendingAspirations: pendingCount ?? 0,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-display font-bold text-slate-900">
          Dashboard
        </h1>
        <p className="text-slate-500 mt-1 text-sm">
          Selamat datang di RWConnect. Pantau informasi terkini di lingkungan
          kamu.
        </p>
      </div>

      {/* Stats */}
      <StatsGrid stats={stats} />

      {/* Quick Actions */}
      <QuickActions />

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <RecentAnnouncements announcements={recentAnnouncements ?? []} />
        </div>
        <div>
          <UpcomingEvents events={upcomingEvents ?? []} />
        </div>
      </div>
    </div>
  );
}
