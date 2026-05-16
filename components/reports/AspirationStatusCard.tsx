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
    <div
      className="
        card
        p-4 sm:p-5
        rounded-2xl
        w-full
      ">
      {/* Header */}
      <h2
        className="
          font-display font-bold
          text-slate-900
          text-base sm:text-lg
          mb-4
          break-words
        ">
        Status Aspirasi
      </h2>

      {/* Content */}
      <div
        className="
          space-y-4 sm:space-y-5
          w-full
        ">
        {items.map((item) => (
          <div key={item.label} className="min-w-0">
            {/* Top */}
            <div
              className="
                flex items-center justify-between
                gap-3
                mb-1.5
              ">
              <span
                className="
                  text-sm
                  font-medium
                  text-slate-700
                  break-words
                ">
                {item.label}
              </span>

              <span
                className="
                  text-sm
                  font-bold
                  text-slate-900
                  whitespace-nowrap
                  flex-shrink-0
                ">
                {item.count}
              </span>
            </div>

            {/* Progress */}
            <div
              className="
                w-full
                h-2.5
                rounded-full
                bg-slate-100
                overflow-hidden
              ">
              <div
                className={`
                  h-full
                  rounded-full
                  ${item.color}
                  transition-all duration-700
                `}
                style={{
                  width: `${item.pct}%`,
                }}
              />
            </div>

            {/* Percentage */}
            <p
              className="
                text-[11px] sm:text-xs
                text-slate-400
                mt-1
                break-words
              ">
              {Math.round(item.pct)}% dari total aspirasi
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
