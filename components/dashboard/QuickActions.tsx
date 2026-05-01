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
      <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
        Aksi Cepat
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {actions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className={`flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-br ${action.gradient} text-white shadow-md ${action.shadow} hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 group`}>
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-colors">
              <action.icon className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-sm leading-tight">
                {action.label}
              </p>
              <p className="text-xs opacity-80 mt-0.5 truncate">
                {action.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
