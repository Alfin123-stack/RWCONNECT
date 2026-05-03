import type { Metadata } from "next";

import { CalendarView } from "../../../components/calendar/CalendarView";
import { EventList } from "../../../components/calendar/EventList";
import { getMonthEvents } from "../../../actions/events";

export const metadata: Metadata = { title: "Kalender Kegiatan" };
export const revalidate = 300; // ISR — 5 minutes

export default async function CalendarPage() {
  const events = await getMonthEvents();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="section-title">Kalender Kegiatan</h1>
        <p className="section-subtitle">
          Jadwal kegiatan dan acara warga bulan ini
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <CalendarView events={events} />
        </div>
        <div>
          <EventList events={events} />
        </div>
      </div>
    </div>
  );
}
