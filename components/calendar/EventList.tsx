import {
  MapPin,
  Clock,
  Users,
  Hammer,
  HeartPulse,
  Coins,
  Shield,
  HandHeart,
  MoreHorizontal,
  type LucideIcon,
} from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { EVENT_CATEGORIES } from "../../constants";
import type { CalendarEvent } from "../../types";

const EVENT_CATEGORY_ICONS: Record<string, LucideIcon> = {
  rapat: Users,
  kerja_bakti: Hammer,
  posyandu: HeartPulse,
  arisan: Coins,
  keamanan: Shield,
  sosial: HandHeart,
  lainnya: MoreHorizontal,
};

interface EventListProps {
  events: CalendarEvent[];
}

export function EventList({ events }: EventListProps) {
  const upcoming = events
    .filter((e) => new Date(e.start_date) >= new Date())
    .slice(0, 8);

  return (
    <div className="card overflow-hidden">
      {/* Header */}
      <div className="px-4 sm:px-5 py-4 border-b border-slate-50">
        <h2 className="font-display font-bold text-base sm:text-lg text-slate-900">
          Kegiatan Bulan Ini
        </h2>

        <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
          {upcoming.length} kegiatan
        </p>
      </div>

      {/* Empty */}
      {upcoming.length === 0 ? (
        <div className="py-10 sm:py-12 px-4 text-center">
          <MoreHorizontal className="w-8 h-8 text-slate-200 mx-auto mb-3" />

          <p className="text-sm text-slate-400">Belum ada kegiatan</p>
        </div>
      ) : (
        <div className="p-2 sm:p-3 space-y-2">
          {upcoming.map((event) => {
            const CategoryIcon =
              EVENT_CATEGORY_ICONS[event.category] ?? MoreHorizontal;

            const cat = EVENT_CATEGORIES.find(
              (c) => c.value === event.category,
            );

            return (
              <div
                key={event.id}
                className="group p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                    <CategoryIcon className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Title */}
                    <p className="font-semibold text-sm sm:text-[15px] text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 break-words">
                      {event.title}
                    </p>

                    {/* Date */}
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3 text-slate-400 flex-shrink-0" />

                      <p className="text-[11px] sm:text-xs text-slate-500">
                        {format(new Date(event.start_date), "dd MMM, HH:mm", {
                          locale: id,
                        })}
                      </p>
                    </div>

                    {/* Location */}
                    {event.location && (
                      <div className="flex items-start gap-1 mt-1">
                        <MapPin className="w-3 h-3 text-slate-400 mt-0.5 flex-shrink-0" />

                        <p className="text-[11px] sm:text-xs text-slate-400 break-words line-clamp-2">
                          {event.location}
                        </p>
                      </div>
                    )}

                    {/* Category */}
                    <div className="mt-2">
                      <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] sm:text-xs font-medium text-slate-600">
                        {cat?.label ?? event.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
