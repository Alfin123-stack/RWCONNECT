import type { Metadata } from "next";

import { CalendarView } from "../../../components/calendar/CalendarView";
import { EventList } from "../../../components/calendar/EventList";
import { getMonthEvents } from "../../../actions/events";

export const metadata: Metadata = { title: "Kalender Kegiatan" };
export const revalidate = 300; // ISR — 5 minutes

export default async function CalendarPage() {
  const events = await getMonthEvents();

  return (
    <div className="space-y-5 sm:space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-1 px-1 sm:px-0">
        <h1 className="section-title text-2xl sm:text-3xl">
          Kalender Kegiatan
        </h1>

        <p className="section-subtitle text-sm sm:text-base leading-relaxed">
          Jadwal kegiatan dan acara warga bulan ini
        </p>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        {/* Calendar */}
        <div className="xl:col-span-2 min-w-0 overflow-hidden">
          <CalendarView events={events} />
        </div>

        {/* Event List */}
        <div className="min-w-0">
          <EventList events={events} />
        </div>
      </div>
    </div>
  );
}
