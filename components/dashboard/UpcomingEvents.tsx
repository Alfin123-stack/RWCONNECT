import Link from "next/link";
import { Calendar, ArrowRight, MapPin } from "lucide-react";
import { CalendarEvent } from "../../types";
import { EVENT_CATEGORIES, ROUTES } from "../../constants";
import { formatEventDate } from "../../utils";

interface UpcomingEventsProps {
  events: CalendarEvent[];
}

export function UpcomingEvents({ events }: UpcomingEventsProps) {
  return (
    <div className="card h-fit">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-50">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-emerald-600" />
          <h2 className="font-display font-bold text-slate-900">
            Kegiatan Mendatang
          </h2>
        </div>
        <Link
          href={ROUTES.CALENDAR}
          className="text-xs text-emerald-600 hover:text-emerald-800 font-semibold flex items-center gap-1 transition-colors">
          Lihat <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="px-5 py-12 text-center">
          <Calendar className="w-10 h-10 text-slate-200 mx-auto mb-3" />
          <p className="text-slate-400 text-sm">Tidak ada kegiatan mendatang</p>
        </div>
      ) : (
        <div className="p-3 space-y-2">
          {events.map((event) => {
            const cat = EVENT_CATEGORIES.find(
              (c) => c.value === event.category,
            );
            return (
              <div
                key={event.id}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0 text-lg">
                  {cat?.icon ?? "📌"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                    {event.title}
                  </p>
                  <p className="text-xs text-emerald-600 font-medium mt-0.5">
                    {formatEventDate(event.start_date)}
                  </p>
                  {event.location && (
                    <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                      <MapPin className="w-2.5 h-2.5" /> {event.location}
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
