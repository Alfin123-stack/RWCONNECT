export default function Loading() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header skeleton */}
      <div>
        <div className="skeleton h-7 w-40 mb-2" />
        <div className="skeleton h-4 w-52" />
      </div>

      <div className="card overflow-hidden">
        {/* Search bar skeleton */}
        <div className="p-4 border-b border-slate-100">
          <div className="skeleton h-9 w-72 rounded-xl" />
        </div>

        {/* Table skeleton */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                {/* Warga */}
                <th className="px-5 py-3">
                  <div className="skeleton h-3 w-12" />
                </th>
                {/* RT */}
                <th className="px-5 py-3 hidden md:table-cell">
                  <div className="skeleton h-3 w-6" />
                </th>
                {/* Role */}
                <th className="px-5 py-3">
                  <div className="skeleton h-3 w-8" />
                </th>
                {/* Bergabung */}
                <th className="px-5 py-3 hidden lg:table-cell">
                  <div className="skeleton h-3 w-16" />
                </th>
                {/* Actions */}
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[...Array(8)].map((_, i) => (
                <tr key={i}>
                  {/* Warga: avatar + nama + email */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="skeleton w-9 h-9 rounded-xl flex-shrink-0" />
                      <div className="space-y-1.5">
                        <div className="skeleton h-4 w-32" />
                        <div className="skeleton h-3 w-44" />
                      </div>
                    </div>
                  </td>
                  {/* RT */}
                  <td className="px-5 py-4 hidden md:table-cell">
                    <div className="skeleton h-4 w-10" />
                  </td>
                  {/* Role badge */}
                  <td className="px-5 py-4">
                    <div className="skeleton h-5 w-16 rounded-full" />
                  </td>
                  {/* Bergabung */}
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <div className="skeleton h-3 w-20" />
                  </td>
                  {/* Select */}
                  <td className="px-5 py-4">
                    <div className="skeleton h-7 w-24 rounded-lg" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
