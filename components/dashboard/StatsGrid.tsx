import { Megaphone, Calendar, MessageSquarePlus, Clock } from 'lucide-react'

interface StatsGridProps {
  stats: {
    announcements: number
    events: number
    aspirations: number
    pendingAspirations: number
  }
}

export function StatsGrid({ stats }: StatsGridProps) {
  const items = [
    {
      label: 'Pengumuman Aktif',
      value: stats.announcements,
      icon: Megaphone,
      color: 'blue',
      bg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      gradient: 'from-blue-600 to-blue-500',
      desc: 'Pengumuman terpublikasi',
    },
    {
      label: 'Kegiatan Mendatang',
      value: stats.events,
      icon: Calendar,
      color: 'emerald',
      bg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      gradient: 'from-emerald-600 to-emerald-500',
      desc: 'Acara bulan ini',
    },
    {
      label: 'Total Aspirasi',
      value: stats.aspirations,
      icon: MessageSquarePlus,
      color: 'purple',
      bg: 'bg-purple-50',
      iconColor: 'text-purple-600',
      gradient: 'from-purple-600 to-purple-500',
      desc: 'Dari seluruh warga',
    },
    {
      label: 'Perlu Ditindak',
      value: stats.pendingAspirations,
      icon: Clock,
      color: 'amber',
      bg: 'bg-amber-50',
      iconColor: 'text-amber-600',
      gradient: 'from-amber-600 to-amber-500',
      desc: 'Aspirasi belum diproses',
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item, i) => (
        <div
          key={item.label}
          className="card p-5 space-y-3 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <div className="flex items-center justify-between">
            <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center`}>
              <item.icon className={`w-5 h-5 ${item.iconColor}`} />
            </div>
            <div className={`text-2xl font-display font-bold bg-gradient-to-br ${item.gradient} bg-clip-text text-transparent`}>
              {item.value}
            </div>
          </div>
          <div>
            <p className="font-semibold text-slate-800 text-sm">{item.label}</p>
            <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
