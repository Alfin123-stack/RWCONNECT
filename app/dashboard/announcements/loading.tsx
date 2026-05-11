// app/dashboard/loading.tsx
// Next.js otomatis menampilkan file ini saat terjadi route transition
// atau saat Server Component induk sedang mem-fetch data.

export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* ── Header ─────────────────────────────────────── */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="space-y-2">
          <div className="skeleton h-7 w-48 rounded-lg" />
          <div className="skeleton h-4 w-72 rounded-md" />
        </div>
        <div className="skeleton h-9 w-36 rounded-xl" />
      </div>

      {/* ── Filter Bar ─────────────────────────────────── */}
      <div className="flex gap-3 flex-wrap">
        <div className="skeleton h-9 w-28 rounded-lg" />
        <div className="skeleton h-9 w-24 rounded-lg" />
        <div className="skeleton h-9 w-32 rounded-lg" />
        <div className="skeleton h-9 w-20 rounded-lg" />
      </div>

      {/* ── Cards ──────────────────────────────────────── */}
      <div className="space-y-4">
        {[0, 80, 160, 240].map((delay) => (
          <div
            key={delay}
            className="card p-5 space-y-3"
            style={{ animationDelay: `${delay}ms` }}>
            <div className="flex items-center gap-2">
              <div className="skeleton h-5 w-20 rounded-full" />
              <div className="skeleton h-5 w-16 rounded-full" />
            </div>
            <div className="skeleton h-5 w-3/4 rounded-md" />
            <div className="space-y-2">
              <div className="skeleton h-4 w-full rounded-md" />
              <div className="skeleton h-4 w-5/6 rounded-md" />
              <div className="skeleton h-4 w-2/3 rounded-md" />
            </div>
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <div className="skeleton h-7 w-7 rounded-full" />
                <div className="skeleton h-4 w-28 rounded-md" />
              </div>
              <div className="skeleton h-4 w-20 rounded-md" />
            </div>
          </div>
        ))}
      </div>

      {/* ── Pagination ─────────────────────────────────── */}
      <div className="flex justify-center gap-2 pt-2">
        <div className="skeleton h-9 w-9 rounded-lg" />
        <div className="skeleton h-9 w-9 rounded-lg" />
        <div className="skeleton h-9 w-9 rounded-lg" />
      </div>
    </div>
  );
}
