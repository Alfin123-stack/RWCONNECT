"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Users,
  Hammer,
  HeartPulse,
  Coins,
  Shield,
  HandHeart,
  MoreHorizontal,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import { id } from "date-fns/locale";
import { cn } from "../../utils";
import { EVENT_CATEGORIES } from "../../constants";
import type { CalendarEvent } from "../../types";

const EVENT_CATEGORY_CONFIG: Record<
  string,
  { icon: LucideIcon; bg: string; color: string }
> = {
  rapat: { icon: Users, bg: "bg-blue-50", color: "text-blue-600" },
  kerja_bakti: { icon: Hammer, bg: "bg-amber-50", color: "text-amber-600" },
  posyandu: { icon: HeartPulse, bg: "bg-rose-50", color: "text-rose-600" },
  arisan: { icon: Coins, bg: "bg-yellow-50", color: "text-yellow-600" },
  keamanan: { icon: Shield, bg: "bg-orange-50", color: "text-orange-600" },
  sosial: { icon: HandHeart, bg: "bg-purple-50", color: "text-purple-600" },
  lainnya: {
    icon: MoreHorizontal,
    bg: "bg-slate-50",
    color: "text-slate-500",
  },
};

interface CalendarViewProps {
  events: CalendarEvent[];
}

const DAYS = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

export function CalendarView({ events }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const days = eachDayOfInterval({
    start: calStart,
    end: calEnd,
  });

  const getEventsForDay = (date: Date) =>
    events.filter((e) => isSameDay(new Date(e.start_date), date));

  const selectedDayEvents = selectedDate ? getEventsForDay(selectedDate) : [];

  return (
    <div className="card overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-6 py-4 border-b border-slate-50">
        <h2 className="font-display font-bold text-base sm:text-lg text-slate-900 capitalize">
          {format(currentDate, "MMMM yyyy", { locale: id })}
        </h2>

        <div className="flex items-center justify-between sm:justify-end gap-1">
          <button
            title="Bulan sebelumnya"
            onClick={() =>
              setCurrentDate(
                (d) => new Date(d.getFullYear(), d.getMonth() - 1, 1),
              )
            }
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
            <ChevronLeft className="w-4 h-4 text-slate-600" />
          </button>

          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-3 py-1.5 rounded-lg hover:bg-slate-100 text-xs sm:text-sm font-semibold text-slate-600 transition-colors whitespace-nowrap">
            Hari ini
          </button>

          <button
            title="Bulan berikutnya"
            onClick={() =>
              setCurrentDate(
                (d) => new Date(d.getFullYear(), d.getMonth() + 1, 1),
              )
            }
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
            <ChevronRight className="w-4 h-4 text-slate-600" />
          </button>
        </div>
      </div>

      {/* Calendar */}
      <div className="p-2 sm:p-4 overflow-x-auto">
        <div className="min-w-[320px]">
          {/* Day labels */}
          <div className="grid grid-cols-7 mb-1 sm:mb-2">
            {DAYS.map((d) => (
              <div
                key={d}
                className="text-center text-[10px] sm:text-xs font-semibold text-slate-400 py-2">
                {d}
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day) => {
              const dayEvents = getEventsForDay(day);

              const isSelected = selectedDate && isSameDay(day, selectedDate);

              const isCurrentMonth = isSameMonth(day, currentDate);

              const isTodayDate = isToday(day);

              return (
                <button
                  key={day.toISOString()}
                  onClick={() =>
                    setSelectedDate(
                      isSameDay(day, selectedDate ?? new Date(0)) ? null : day,
                    )
                  }
                  className={cn(
                    "relative flex flex-col items-center justify-start p-1.5 sm:p-2 rounded-xl transition-all duration-200 min-h-[52px] sm:min-h-[72px]",
                    isCurrentMonth ? "text-slate-900" : "text-slate-300",
                    isSelected
                      ? "bg-blue-600 text-white shadow-md"
                      : "hover:bg-slate-50",
                    isTodayDate && !isSelected
                      ? "ring-2 ring-blue-500 ring-offset-1"
                      : "",
                  )}>
                  <span
                    className={cn(
                      "text-[11px] sm:text-xs font-bold w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full",
                      isTodayDate && !isSelected ? "text-blue-600" : "",
                    )}>
                    {format(day, "d")}
                  </span>

                  {dayEvents.length > 0 && (
                    <div className="flex gap-0.5 mt-1 flex-wrap justify-center">
                      {dayEvents.slice(0, 3).map((e, i) => {
                        const cfg = EVENT_CATEGORY_CONFIG[e.category];

                        return (
                          <span
                            key={i}
                            className={cn(
                              "w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full",
                              isSelected
                                ? "bg-white/70"
                                : (cfg?.color.replace("text-", "bg-") ??
                                    "bg-blue-500"),
                            )}
                          />
                        );
                      })}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Events */}
      {selectedDate && (
        <div className="border-t border-slate-100 p-4 sm:p-5">
          <h3 className="font-semibold text-sm sm:text-base text-slate-700 mb-3">
            {format(selectedDate, "EEEE, dd MMMM yyyy", {
              locale: id,
            })}
          </h3>

          {selectedDayEvents.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-4">
              Tidak ada kegiatan pada hari ini
            </p>
          ) : (
            <div className="space-y-2">
              {selectedDayEvents.map((event) => {
                const cfg =
                  EVENT_CATEGORY_CONFIG[event.category] ??
                  EVENT_CATEGORY_CONFIG.lainnya;

                const CategoryIcon = cfg.icon;

                const cat = EVENT_CATEGORIES.find(
                  (c) => c.value === event.category,
                );

                return (
                  <div
                    key={event.id}
                    className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div
                      className={`w-9 h-9 rounded-lg ${cfg.bg} flex items-center justify-center flex-shrink-0`}>
                      <CategoryIcon className={`w-4 h-4 ${cfg.color}`} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-slate-900 line-clamp-2">
                        {event.title}
                      </p>

                      <p className={`text-xs font-medium mt-0.5 ${cfg.color}`}>
                        {cat?.label ?? event.category}
                      </p>

                      {event.location && (
                        <p className="text-xs text-slate-400 flex items-start gap-1 mt-1 break-words">
                          <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                          <span>{event.location}</span>
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
