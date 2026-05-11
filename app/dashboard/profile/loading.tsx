export default function Loading() {
  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      {/* Header skeleton */}
      <div>
        <div className="skeleton h-7 w-36 mb-2" />
        <div className="skeleton h-4 w-64" />
      </div>

      <div className="space-y-6">
        {/* Avatar card skeleton */}
        <div className="card p-6 flex items-center gap-5">
          <div className="skeleton w-20 h-20 rounded-2xl flex-shrink-0" />
          <div className="space-y-2 flex-1">
            <div className="skeleton h-6 w-40" />
            <div className="skeleton h-4 w-52" />
            <div className="skeleton h-5 w-24 rounded-full mt-1" />
          </div>
        </div>

        {/* Edit form skeleton */}
        <div className="card p-6">
          <div className="skeleton h-5 w-40 mb-5" />
          <div className="space-y-4">
            {/* Nama Lengkap */}
            <div>
              <div className="skeleton h-4 w-28 mb-1.5" />
              <div className="skeleton h-10 w-full rounded-xl" />
            </div>

            {/* Nomor HP */}
            <div>
              <div className="skeleton h-4 w-24 mb-1.5" />
              <div className="skeleton h-10 w-full rounded-xl" />
            </div>

            {/* Alamat */}
            <div>
              <div className="skeleton h-4 w-16 mb-1.5" />
              <div className="skeleton h-10 w-full rounded-xl" />
            </div>

            {/* Nomor RT */}
            <div>
              <div className="skeleton h-4 w-20 mb-1.5" />
              <div className="skeleton h-10 w-full rounded-xl" />
            </div>

            {/* Submit button */}
            <div className="pt-2">
              <div className="skeleton h-10 w-36 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
