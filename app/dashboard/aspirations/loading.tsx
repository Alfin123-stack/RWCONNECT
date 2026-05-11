export default function Loading() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header skeleton */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="space-y-2">
          <div className="skeleton h-7 w-48" />
          <div className="skeleton h-4 w-72" />
        </div>
        <div className="skeleton h-9 w-36 rounded-lg" />
      </div>

      {/* Filter skeleton */}
      <div className="flex gap-2 flex-wrap">
        <div className="skeleton h-8 w-20 rounded-full" />
        <div className="skeleton h-8 w-24 rounded-full" />
        <div className="skeleton h-8 w-20 rounded-full" />
        <div className="skeleton h-8 w-20 rounded-full" />
      </div>

      {/* Card skeletons */}
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="card p-5">
            <div className="flex items-start gap-4">
              {/* Icon placeholder */}
              <div className="skeleton w-10 h-10 rounded-xl flex-shrink-0" />

              <div className="flex-1 space-y-3">
                {/* Title + badge row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-2 flex-1">
                    <div className="skeleton h-4 w-2/3" />
                    <div className="flex gap-2">
                      <div className="skeleton h-5 w-20 rounded-full" />
                      <div className="skeleton h-5 w-16 rounded-full" />
                    </div>
                  </div>
                  <div className="skeleton h-7 w-28 rounded-lg" />
                </div>

                {/* Content preview */}
                <div className="skeleton h-4 w-full" />
                <div className="skeleton h-4 w-4/5" />

                {/* Footer */}
                <div className="flex items-center gap-4 pt-3 border-t border-slate-50">
                  <div className="skeleton h-3 w-16" />
                  <div className="skeleton h-3 w-20" />
                  <div className="skeleton h-3 w-16 ml-auto" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
