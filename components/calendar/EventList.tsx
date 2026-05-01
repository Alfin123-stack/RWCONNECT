import { MapPin, Clock } from 'lucide-react'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { EVENT_CATEGORIES } from '../../constants'
import type { CalendarEvent } from '../../types'

interface EventListProps {
  events: CalendarEvent[]
}

export function EventList({ events }: EventListProps) {
  const upcoming = events.filter(e => new Date(e.start_date) >= new Date()).slice(0, 8)

  return (
    <div className="card">
      <div className="px-5 py-4 border-b border-slate-50">
        <h2 className="font-display font-bold text-slate-900">Kegiatan Bulan Ini</h2>
        <p className="text-xs text-slate-400 mt-0.5">{upcoming.length} kegiatan</p>
      </div>
      
      {upcoming.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-3xl mb-3">📅</p>
          <p className="text-sm text-slate-400">Belum ada kegiatan</p>
        </div>
      ) : (
        <div className="p-3 space-y-2">
          {upcoming.map(event => {
            const cat = EVENT_CATEGORIES.find(c => c.value === event.category)
            return (
              <div key={event.id} className="group p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-lg flex-shrink-0">
                    {cat?.icon ?? '📌'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                      {event.title}
                    </p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Clock className="w-2.5 h-2.5 text-slate-400" />
                      <p className="text-xs text-slate-500">
                        {format(new Date(event.start_date), 'dd MMM, HH:mm', { locale: id })}
                      </p>
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-1 mt-0.5">
                        <MapPin className="w-2.5 h-2.5 text-slate-400" />
                        <p className="text-xs text-slate-400 truncate">{event.location}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
