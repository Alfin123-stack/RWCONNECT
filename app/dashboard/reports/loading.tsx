export default function Loading() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header skeleton */}
      <div>
        <div className="skeleton h-7 w-52 mb-2" />
        <div className="skeleton h-4 w-72" />
      </div>

      {/* ReportsStats skeleton — 2 cols mobile, 3 cols desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="skeleton w-10 h-10 rounded-xl" />
            </div>
            <div className="skeleton h-7 w-16 mb-1.5" />
            <div className="skeleton h-3 w-28" />
          </div>
        ))}
      </div>

      {/* Bottom two cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Aspirasi skeleton */}
        <div className="card p-5">
          <div className="skeleton h-5 w-36 mb-4" />
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="skeleton h-4 w-20" />
                  <div className="skeleton h-4 w-8" />
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="skeleton h-full rounded-full"
                    style={{ width: `${[65, 45, 80][i]}%` }}
                  />
                </div>
                <div className="skeleton h-3 w-32 mt-1" />
              </div>
            ))}
          </div>
        </div>

        {/* Aspirasi Terbaru skeleton */}
        <div className="card p-5">
          <div className="skeleton h-5 w-36 mb-4" />
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                <div className="skeleton w-2 h-2 rounded-full flex-shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="skeleton h-4 w-3/4" />
                  <div className="skeleton h-3 w-20" />
                </div>
                <div className="skeleton h-5 w-16 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
