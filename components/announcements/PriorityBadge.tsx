"use client";

import {
  TrendingUp,
  Bell,
  MessageSquareHeart,
  type LucideIcon,
} from "lucide-react";

const PRIORITY_CONFIG: Record<
  string,
  {
    label: string;
    icon: LucideIcon;
    className: string;
  }
> = {
  tinggi: {
    label: "Prioritas Tinggi",
    icon: TrendingUp,
    className: "bg-red-50 text-red-600 border-red-100",
  },

  sedang: {
    label: "Prioritas Sedang",
    icon: Bell,
    className: "bg-amber-50 text-amber-600 border-amber-100",
  },

  rendah: {
    label: "Prioritas Rendah",
    icon: MessageSquareHeart,
    className: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
};

export default function PriorityBadge({ priority }: { priority: string }) {
  const config = PRIORITY_CONFIG[priority] ?? {
    label: priority,
    icon: Bell,
    className: "bg-slate-50 text-slate-500 border-slate-100",
  };

  const Icon = config.icon;

  return (
    <span
      className={`
        inline-flex items-center gap-1
        max-w-full
        px-2 py-0.5
        rounded-full border
        text-[10px] sm:text-xs
        font-medium
        whitespace-nowrap
        flex-shrink-0
        ${config.className}
      `}>
      <Icon className="w-3 h-3 flex-shrink-0" />

      <span className="truncate">{config.label}</span>
    </span>
  );
}
