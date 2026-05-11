"use client";

interface StatCardProps {
  value: string;
  label: string;
  icon: React.ElementType;
}

export function StatCard({ value, label, icon: Icon }: StatCardProps) {
  return (
    <div className="flex flex-col items-center gap-1 px-6 py-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
      <div className="w-8 h-8 rounded-xl bg-blue-500/20 flex items-center justify-center mb-1">
        <Icon className="w-4 h-4 text-blue-400" />
      </div>
      <span className="text-2xl font-bold text-white">{value}</span>
      <span className="text-slate-400 text-xs text-center">{label}</span>
    </div>
  );
}
