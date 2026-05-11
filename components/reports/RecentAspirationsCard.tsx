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

interface Aspiration {
  title: string;
  category: string;
  status: string;
}

interface RecentAspirationsCardProps {
  aspirations: Aspiration[];
}

export function RecentAspirationsCard({
  aspirations,
}: RecentAspirationsCardProps) {
  return (
    <div className="card p-5">
      <h2 className="font-display font-bold text-slate-900 mb-4">
        Aspirasi Terbaru
      </h2>
      {aspirations.length === 0 ? (
        <p className="text-sm text-slate-400 text-center py-8">
          Belum ada data
        </p>
      ) : (
        <div className="space-y-3">
          {aspirations.map((asp, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
              <div
                className={`w-2 h-2 rounded-full flex-shrink-0 ${statusDotColor[asp.status] ?? "bg-blue-500"}`}
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
                className={`badge text-xs ${statusBadgeColor[asp.status] ?? "bg-blue-100 text-blue-700 border-blue-200"}`}>
                {asp.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
