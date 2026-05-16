"use client";

import Link from "next/link";
import { Megaphone, Calendar, MessageSquarePlus, FileText } from "lucide-react";
import { ROUTES } from "../../constants";

const actions = [
  {
    href: ROUTES.ANNOUNCEMENTS,
    icon: Megaphone,
    label: "Lihat Pengumuman",
    desc: "Informasi terkini",
    gradient: "from-blue-600 to-blue-500",
    shadow: "shadow-blue-200",
  },
  {
    href: ROUTES.CALENDAR,
    icon: Calendar,
    label: "Kalender Kegiatan",
    desc: "Jadwal acara warga",
    gradient: "from-emerald-600 to-emerald-500",
    shadow: "shadow-emerald-200",
  },
  {
    href: ROUTES.ASPIRATIONS,
    icon: MessageSquarePlus,
    label: "Kirim Aspirasi",
    desc: "Sampaikan pendapatmu",
    gradient: "from-purple-600 to-purple-500",
    shadow: "shadow-purple-200",
  },
  {
    href: ROUTES.REPORTS,
    icon: FileText,
    label: "Buat Laporan",
    desc: "Laporkan masalah",
    gradient: "from-amber-600 to-amber-500",
    shadow: "shadow-amber-200",
  },
];

export function QuickActions() {
  return (
    <div>
      <h2 className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2 sm:mb-3">
        Aksi Cepat
      </h2>
      {/*
        320px  → 2 columns, compact layout (icon + label only, desc hidden)
        lg 1024px → 4 columns, full layout
      */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
        {actions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className={`flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-2xl bg-gradient-to-br ${action.gradient} text-white shadow-md ${action.shadow} hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 group`}>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-colors">
              <action.icon className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              {/* Truncate long labels gracefully */}
              <p className="font-semibold text-xs sm:text-sm leading-tight line-clamp-2">
                {action.label}
              </p>
              {/* Desc hidden on mobile to save space */}
              <p className="text-xs opacity-80 mt-0.5 truncate hidden sm:block">
                {action.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
