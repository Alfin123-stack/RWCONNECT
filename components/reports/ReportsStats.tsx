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
  {
    icon: LucideIcon;
    bg: string;
    iconColor: string;
  }
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

  pending: {
    icon: Clock,
    bg: "bg-amber-50",
    iconColor: "text-amber-600",
  },

  rate: {
    icon: TrendingUp,
    bg: "bg-cyan-50",
    iconColor: "text-cyan-600",
  },
};

interface Stat {
  label: string;
  value: number | string;
  type: string;
}

export function ReportsStats({ stats }: { stats: Stat[] }) {
  return (
    <div
      className="
        grid
        grid-cols-2
        lg:grid-cols-3
        gap-3 sm:gap-4
        w-full
      ">
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
            className="
              card
              p-3 sm:p-5
              rounded-2xl
              hover:shadow-card-hover
              transition-all duration-300
              hover:-translate-y-0.5
              min-w-0
            "
            style={{
              animationDelay: `${i * 60}ms`,
            }}>
            {/* Top */}
            <div
              className="
                flex items-center
                justify-between
                mb-3
              ">
              <div
                className={`
                  w-9 h-9 sm:w-10 sm:h-10
                  rounded-xl
                  ${bg}
                  flex items-center justify-center
                  flex-shrink-0
                `}>
                <Icon
                  className={`
                    w-4 h-4 sm:w-5 sm:h-5
                    ${iconColor}
                  `}
                />
              </div>
            </div>

            {/* Value */}
            <p
              className="
                text-lg sm:text-2xl
                font-display font-bold
                text-slate-900
                leading-tight
                break-words
              ">
              {s.value}
            </p>

            {/* Label */}
            <p
              className="
                text-[11px] sm:text-xs
                text-slate-500
                mt-1
                font-medium
                leading-relaxed
                break-words
              ">
              {s.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}
