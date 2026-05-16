import type { Metadata } from "next";
import { getDashboardData } from "../../actions/dashboard";
import { StatsGrid } from "../../components/dashboard/StatsGrid";
import { QuickActions } from "../../components/dashboard/QuickActions";
import { RecentAnnouncements } from "../../components/dashboard/RecentAnnouncements";
import { UpcomingEvents } from "../../components/dashboard/UpcomingEvents";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const { stats, recentAnnouncements, upcomingEvents } =
    await getDashboardData();

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div>
        {/* Heading scales from text-xl on 320px up to text-3xl on lg */}
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-slate-900">
          Dashboard
        </h1>
        <p className="text-slate-500 mt-1 text-xs sm:text-sm">
          Selamat datang di RWConnect. Pantau informasi terkini di lingkungan
          kamu.
        </p>
      </div>

      <StatsGrid stats={stats} />
      <QuickActions />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        <div className="xl:col-span-2">
          <RecentAnnouncements announcements={recentAnnouncements} />
        </div>
        <div>
          <UpcomingEvents events={upcomingEvents} />
        </div>
      </div>
    </div>
  );
}
