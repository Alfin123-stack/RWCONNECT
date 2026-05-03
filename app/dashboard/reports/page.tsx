import {
  BarChart2,
  TrendingUp,
  CheckCircle2,
  Clock,
  MessageSquarePlus,
  Megaphone,
} from "lucide-react";
import type { Metadata } from "next";
import { getReportsData } from "../../../actions/reports";

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
      icon: Megaphone,
      bg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      label: "Total Kegiatan",
      value: totalEvents,
      icon: BarChart2,
      bg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      label: "Total Aspirasi",
      value: totalAspirations,
      icon: MessageSquarePlus,
      bg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      label: "Aspirasi Selesai",
      value: resolvedAspirations,
      icon: CheckCircle2,
      bg: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      label: "Menunggu Tindak",
      value: pendingAspirations,
      icon: Clock,
      bg: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      label: "Tingkat Resolusi",
      value: `${resolutionRate}%`,
      icon: TrendingUp,
      bg: "bg-cyan-50",
      iconColor: "text-cyan-600",
    },
  ];

  const aspirationStatusData = [
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

  const statusBadgeColor: Record<string, string> = {
    selesai: "bg-green-100 text-green-700 border-green-200",
    diproses: "bg-yellow-100 text-yellow-700 border-yellow-200",
    ditolak: "bg-red-100 text-red-700 border-red-200",
    baru: "bg-blue-100 text-blue-700 border-blue-200",
  };

  const statusDotColor: Record<string, string> = {
    selesai: "bg-green-500",
    diproses: "bg-yellow-500",
    ditolak: "bg-red-500",
    baru: "bg-blue-500",
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="section-title">Laporan & Statistik</h1>
        <p className="section-subtitle">
          Ringkasan aktivitas warga dan pengurus RW
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="card p-5 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5"
            style={{ animationDelay: `${i * 60}ms` }}>
            <div className="flex items-center justify-between mb-3">
              <div
                className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
                <s.icon className={`w-5 h-5 ${s.iconColor}`} />
              </div>
            </div>
            <p className="text-2xl font-display font-bold text-slate-900">
              {s.value}
            </p>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Breakdown + recent */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Aspiration status breakdown */}
        <div className="card p-5">
          <h2 className="font-display font-bold text-slate-900 mb-4">
            Status Aspirasi
          </h2>
          <div className="space-y-4">
            {aspirationStatusData.map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-slate-700">
                    {item.label}
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    {item.count}
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.color} transition-all duration-700`}
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {Math.round(item.pct)}% dari total aspirasi
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent aspirations */}
        <div className="card p-5">
          <h2 className="font-display font-bold text-slate-900 mb-4">
            Aspirasi Terbaru
          </h2>
          {recentAspirations.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-8">
              Belum ada data
            </p>
          ) : (
            <div className="space-y-3">
              {recentAspirations.map((asp, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                  <div
                    className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      statusDotColor[asp.status] ?? "bg-blue-500"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">
                      {asp.title}
                    </p>
                    <p className="text-xs text-slate-400 capitalize">
                      {asp.category}
                    </p>
                  </div>
                  <span
                    className={`badge text-xs ${
                      statusBadgeColor[asp.status] ??
                      "bg-blue-100 text-blue-700 border-blue-200"
                    }`}>
                    {asp.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
