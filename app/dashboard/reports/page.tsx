import type { Metadata } from "next";
import { getReportsData } from "../../../actions/reports";
import { ReportsStats } from "../../../components/reports/ReportsStats";
import { AspirationStatusCard } from "../../../components/reports/AspirationStatusCard";
import { RecentAspirationsCard } from "../../../components/reports/RecentAspirationsCard";

export const metadata: Metadata = { title: "Laporan & Statistik" };

export default async function ReportsPage() {
  const {
    totalAnnouncements,
    totalEvents,
    totalAspirations,
    pendingAspirations,
    resolvedAspirations,
    inProgressAspirations,
    recentAspirations,
    resolutionRate,
  } = await getReportsData();

  const stats = [
    {
      label: "Total Pengumuman",
      value: totalAnnouncements,
      type: "announcements",
    },
    { label: "Total Kegiatan", value: totalEvents, type: "events" },
    { label: "Total Aspirasi", value: totalAspirations, type: "aspirations" },
    { label: "Aspirasi Selesai", value: resolvedAspirations, type: "resolved" },
    { label: "Menunggu Tindak", value: pendingAspirations, type: "pending" },
    { label: "Tingkat Resolusi", value: `${resolutionRate}%`, type: "rate" },
  ];

  const aspirationStatusItems = [
    {
      label: "Baru",
      count: pendingAspirations,
      color: "bg-blue-500",
      pct: totalAspirations ? (pendingAspirations / totalAspirations) * 100 : 0,
    },
    {
      label: "Diproses",
      count: inProgressAspirations,
      color: "bg-yellow-500",
      pct: totalAspirations
        ? (inProgressAspirations / totalAspirations) * 100
        : 0,
    },
    {
      label: "Selesai",
      count: resolvedAspirations,
      color: "bg-green-500",
      pct: totalAspirations
        ? (resolvedAspirations / totalAspirations) * 100
        : 0,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="section-title">Laporan & Statistik</h1>
        <p className="section-subtitle">
          Ringkasan aktivitas warga dan pengurus RW
        </p>
      </div>

      <ReportsStats stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AspirationStatusCard items={aspirationStatusItems} />
        <RecentAspirationsCard aspirations={recentAspirations} />
      </div>
    </div>
  );
}
