// ============================================================
// FILE: components/landing/StatsBar.tsx  — Responsive fix
// ============================================================
import { Users, MessageSquareHeart, TrendingUp, Shield } from "lucide-react";
import { StatCard } from "../ui/StatCard";
import { STATS } from "../../constants";

const STAT_ICONS = [Users, MessageSquareHeart, TrendingUp, Shield];

export function StatsBar() {
  return (
    <div className="border-y border-white/10 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
 
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {STATS.map((s, i) => (
            <StatCard
              key={s.label}
              value={s.value}
              label={s.label}
              icon={STAT_ICONS[i]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
