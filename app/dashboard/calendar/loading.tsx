export default function Loading() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header skeleton */}
      <div>
        <div className="skeleton h-7 w-48 mb-2" />
        <div className="skeleton h-4 w-64" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* CalendarView skeleton */}
        <div className="xl:col-span-2 card overflow-hidden">
          {/* Calendar header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-50">
            <div className="skeleton h-5 w-36" />
            <div className="flex items-center gap-1">
              <div className="skeleton w-8 h-8 rounded-lg" />
              <div className="skeleton w-16 h-7 rounded-lg" />
              <div className="skeleton w-8 h-8 rounded-lg" />
            </div>
          </div>

          <div className="p-4">
            {/* Day labels */}
            <div className="grid grid-cols-7 mb-2">
              {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((d) => (
                <div
                  key={d}
                  className="text-center text-xs font-semibold text-slate-300 py-2">
                  {d}
                </div>
              ))}
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-7 gap-1">
              {[...Array(35)].map((_, i) => (
                <div
                  key={i}
                  className="skeleton rounded-xl min-h-[52px]"
                  style={{ opacity: 1 - (i % 7) * 0.03 }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* EventList skeleton */}
        <div className="card">
          <div className="px-5 py-4 border-b border-slate-50 space-y-1.5">
            <div className="skeleton h-5 w-36" />
            <div className="skeleton h-3 w-20" />
          </div>

          <div className="p-3 space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="p-3 rounded-xl">
                <div className="flex items-start gap-3">
                  <div className="skeleton w-10 h-10 rounded-xl flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="skeleton h-4 w-3/4" />
                    <div className="skeleton h-3 w-24" />
                    <div className="skeleton h-3 w-36" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
