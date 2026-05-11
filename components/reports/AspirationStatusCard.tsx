interface StatusItem {
  label: string;
  count: number;
  color: string;
  pct: number;
}

interface AspirationStatusCardProps {
  items: StatusItem[];
}

export function AspirationStatusCard({ items }: AspirationStatusCardProps) {
  return (
    <div className="card p-5">
      <h2 className="font-display font-bold text-slate-900 mb-4">
        Status Aspirasi
      </h2>
      <div className="space-y-4">
        {items.map((item) => (
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
  );
}
