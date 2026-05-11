"use client";

import {
  Zap,
  CalendarDays,
  HeartPulse,
  Shield,
  Users,
  Megaphone,
  type LucideIcon,
} from "lucide-react";

const CATEGORY_CONFIG: Record<
  string,
  { label: string; icon: LucideIcon; className: string }
> = {
  penting: {
    label: "Penting",
    icon: Zap,
    className: "bg-red-50 text-red-600 border-red-100",
  },
  kegiatan: {
    label: "Kegiatan",
    icon: CalendarDays,
    className: "bg-blue-50 text-blue-600 border-blue-100",
  },
  kesehatan: {
    label: "Kesehatan",
    icon: HeartPulse,
    className: "bg-green-50 text-green-600 border-green-100",
  },
  keamanan: {
    label: "Keamanan",
    icon: Shield,
    className: "bg-orange-50 text-orange-600 border-orange-100",
  },
  sosial: {
    label: "Sosial",
    icon: Users,
    className: "bg-purple-50 text-purple-600 border-purple-100",
  },
  umum: {
    label: "Umum",
    icon: Megaphone,
    className: "bg-slate-50 text-slate-600 border-slate-100",
  },
};

export default function CategoryBadge({ category }: { category: string }) {
  const config = CATEGORY_CONFIG[category] ?? {
    label: category,
    icon: Megaphone,
    className: "bg-slate-50 text-slate-600 border-slate-100",
  };
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${config.className}`}>
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  );
}
