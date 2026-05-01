"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  const days = eachDayOfInterval({ start: calStart, end: calEnd });

  const getEventsForDay = (date: Date) =>
    events.filter((e) => isSameDay(new Date(e.start_date), date));

  const selectedDayEvents = selectedDate ? getEventsForDay(selectedDate) : [];

  return (
    <div className="card overflow-hidden">
      {/* Calendar Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-50">
        <h2 className="font-display font-bold text-slate-900 capitalize">
          {format(currentDate, "MMMM yyyy", { locale: id })}
        </h2>
        <div className="flex items-center gap-1">
          <button
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
            className="px-3 py-1.5 rounded-lg hover:bg-slate-100 text-xs font-semibold text-slate-600 transition-colors">
            Hari ini
          </button>
          <button
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

      <div className="p-4">
        {/* Day labels */}
        <div className="grid grid-cols-7 mb-2">
          {DAYS.map((d) => (
            <div
              key={d}
              className="text-center text-xs font-semibold text-slate-400 py-2">
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
                  "relative flex flex-col items-center p-2 rounded-xl transition-all duration-200 min-h-[52px]",
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
                    "text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full",
                    isTodayDate && !isSelected ? "text-blue-600" : "",
                  )}>
                  {format(day, "d")}
                </span>
                {dayEvents.length > 0 && (
                  <div className="flex gap-0.5 mt-1 flex-wrap justify-center">
                    {dayEvents.slice(0, 3).map((e, i) => (
                      <span
                        key={i}
                        className={cn(
                          "w-1.5 h-1.5 rounded-full",
                          isSelected ? "bg-white/70" : "bg-blue-500",
                        )}
                      />
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected day events */}
      {selectedDate && (
        <div className="border-t border-slate-100 p-4">
          <h3 className="font-semibold text-sm text-slate-700 mb-3">
            {format(selectedDate, "EEEE, dd MMMM yyyy", { locale: id })}
          </h3>
          {selectedDayEvents.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-4">
              Tidak ada kegiatan pada hari ini
            </p>
          ) : (
            <div className="space-y-2">
              {selectedDayEvents.map((event) => {
                const cat = EVENT_CATEGORIES.find(
                  (c) => c.value === event.category,
                );
                return (
                  <div
                    key={event.id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 border border-blue-100">
                    <span className="text-lg">{cat?.icon ?? "📌"}</span>
                    <div>
                      <p className="font-semibold text-sm text-slate-900">
                        {event.title}
                      </p>
                      {event.location && (
                        <p className="text-xs text-slate-500">
                          📍 {event.location}
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
