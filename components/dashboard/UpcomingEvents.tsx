import Link from "next/link";
import {
  Calendar,
  ArrowRight,
  MapPin,
  Users,
  Hammer,
  HeartPulse,
  Coins,
  Shield,
  HandHeart,
  MoreHorizontal,
  type LucideIcon,
} from "lucide-react";
import { CalendarEvent } from "../../types";
import { EVENT_CATEGORIES, ROUTES } from "../../constants";
import { formatEventDate } from "../../utils";

const EVENT_CATEGORY_ICONS: Record<string, LucideIcon> = {
  rapat: Users,
  kerja_bakti: Hammer,
  posyandu: HeartPulse,
  arisan: Coins,
  keamanan: Shield,
  sosial: HandHeart,
  lainnya: MoreHorizontal,
};

interface UpcomingEventsProps {
  events: CalendarEvent[];
}

export function UpcomingEvents({ events }: UpcomingEventsProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden h-fit">
      <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 sm:py-4 border-b border-slate-50">
        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 flex-shrink-0" />
          <h2 className="font-display font-bold text-slate-900 text-sm sm:text-base">
            Kegiatan Mendatang
          </h2>
        </div>
        <Link
          href={ROUTES.CALENDAR}
          className="text-xs text-emerald-600 hover:text-emerald-800 font-semibold flex items-center gap-1 transition-colors flex-shrink-0">
          Lihat <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="px-4 sm:px-5 py-10 sm:py-12 text-center">
          <Calendar className="w-8 h-8 sm:w-10 sm:h-10 text-slate-200 mx-auto mb-3" />
          <p className="text-slate-400 text-sm">Tidak ada kegiatan mendatang</p>
        </div>
      ) : (
        <div className="p-2 sm:p-3 space-y-1.5 sm:space-y-2">
          {events.map((event) => {
            const CategoryIcon =
              EVENT_CATEGORY_ICONS[event.category] ?? Calendar;
            return (
              <div
                key={event.id}
                className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                  <CategoryIcon className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-xs sm:text-sm text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                    {event.title}
                  </p>
                  <p className="text-xs text-emerald-600 font-medium mt-0.5">
                    {formatEventDate(event.start_date)}
                  </p>
                  {event.location && (
                    <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1 truncate">
                      <MapPin className="w-2.5 h-2.5 flex-shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
