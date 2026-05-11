"use client";

import {
  BarChart2,
  TrendingUp,
  CheckCircle2,
  Clock,
  MessageSquarePlus,
  Megaphone,
  type LucideIcon,
} from "lucide-react";

const STAT_ICONS: Record<
  string,
  { icon: LucideIcon; bg: string; iconColor: string }
> = {
  announcements: {
    icon: Megaphone,
    bg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  events: {
    icon: BarChart2,
    bg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  aspirations: {
    icon: MessageSquarePlus,
    bg: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  resolved: {
    icon: CheckCircle2,
    bg: "bg-green-50",
    iconColor: "text-green-600",
  },
  pending: { icon: Clock, bg: "bg-amber-50", iconColor: "text-amber-600" },
  rate: { icon: TrendingUp, bg: "bg-cyan-50", iconColor: "text-cyan-600" },
};

interface Stat {
  label: string;
  value: number | string;
  type: string; // ← ganti dari icon/bg/iconColor ke type
}

export function ReportsStats({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((s, i) => {
        const {
          icon: Icon,
          bg,
          iconColor,
        } = STAT_ICONS[s.type] ?? {
          icon: BarChart2,
          bg: "bg-slate-50",
          iconColor: "text-slate-600",
        };
        return (
          <div
            key={s.label}
            className="card p-5 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5"
            style={{ animationDelay: `${i * 60}ms` }}>
            <div className="flex items-center justify-between mb-3">
              <div
                className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${iconColor}`} />
              </div>
            </div>
            <p className="text-2xl font-display font-bold text-slate-900">
              {s.value}
            </p>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">
              {s.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}
