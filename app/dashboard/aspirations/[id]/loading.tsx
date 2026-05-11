export default function Loading() {
  return (
    <div className="max-w-2xl mx-auto space-y-5 animate-pulse">
      {/* Back button */}
      <div className="inline-flex items-center gap-1.5 -ml-2">
        <div className="w-4 h-4 rounded bg-slate-200" />
        <div className="w-32 h-4 rounded-lg bg-slate-200" />
      </div>

      {/* Status accent bar */}
      <div className="h-1 w-full rounded-t-2xl bg-slate-200" />

      {/* Card */}
      <div className="card rounded-t-none border-t-0 p-6 lg:p-8 shadow-sm space-y-5">
        {/* Badges row */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="w-20 h-5 rounded-full bg-slate-200" />
          <div className="w-24 h-5 rounded-full bg-slate-200" />
          <div className="ml-auto w-24 h-5 rounded-full bg-slate-200" />
        </div>

        {/* Title */}
        <div className="space-y-2.5">
          <div className="h-8 w-full rounded-xl bg-slate-200" />
          <div className="h-8 w-2/3 rounded-xl bg-slate-200" />
        </div>

        {/* Meta strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pb-5 border-b border-slate-100">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-slate-200 flex-shrink-0" />
              <div className="space-y-1.5">
                <div className="w-12 h-2.5 rounded bg-slate-200" />
                <div className="w-20 h-3.5 rounded bg-slate-200" />
              </div>
            </div>
          ))}
        </div>

        {/* Content body */}
        <div className="space-y-2.5">
          {[100, 92, 96, 78, 100, 85, 70, 88].map((w, i) => (
            <div
              key={i}
              className="h-3.5 rounded-lg bg-slate-200"
              style={{ width: `${w}%` }}
            />
          ))}

          <div className="pt-2" />

          {[95, 83, 100, 74, 60].map((w, i) => (
            <div
              key={i + 10}
              className="h-3.5 rounded-lg bg-slate-200"
              style={{ width: `${w}%` }}
            />
          ))}
        </div>

        {/* Admin response skeleton */}
        <div className="flex gap-3 p-4 rounded-2xl bg-slate-100 border border-slate-200">
          <div className="w-4 h-4 rounded bg-slate-300 mt-0.5 flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="w-28 h-3 rounded bg-slate-300" />
            <div className="w-full h-3 rounded bg-slate-200" />
            <div className="w-3/4 h-3 rounded bg-slate-200" />
          </div>
        </div>
      </div>

      {/* Footer ID */}
      <div className="flex justify-center">
        <div className="w-36 h-3 rounded-lg bg-slate-200" />
      </div>
    </div>
  );
}
