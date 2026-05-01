// ============================================================
// RWCONNECT - Utility Helper Functions
// ============================================================
import { format, formatDistanceToNow, isToday, isTomorrow, isThisWeek } from 'date-fns'
import { id } from 'date-fns/locale'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { type AnnouncementCategory, type AspirationStatus, type AnnouncementPriority } from '@/types'

// ── Class Name Utility ────────────────────────────────────────
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ── Date Formatting ───────────────────────────────────────────
export function formatDate(date: string | Date): string {
  return format(new Date(date), 'dd MMMM yyyy', { locale: id })
}

export function formatDateTime(date: string | Date): string {
  return format(new Date(date), 'dd MMMM yyyy, HH:mm', { locale: id })
}

export function formatRelativeTime(date: string | Date): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: id })
}

export function formatEventDate(date: string | Date): string {
  const d = new Date(date)
  if (isToday(d)) return `Hari ini, ${format(d, 'HH:mm')}`
  if (isTomorrow(d)) return `Besok, ${format(d, 'HH:mm')}`
  if (isThisWeek(d)) return format(d, 'EEEE, HH:mm', { locale: id })
  return format(d, 'dd MMM yyyy', { locale: id })
}

export function formatMonthYear(date: string | Date): string {
  return format(new Date(date), 'MMMM yyyy', { locale: id })
}

// ── Category Color Mapping ────────────────────────────────────
export function getAnnouncementCategoryColor(category: AnnouncementCategory): string {
  const colorMap: Record<AnnouncementCategory, string> = {
    penting: 'bg-red-100 text-red-700 border-red-200',
    kegiatan: 'bg-blue-100 text-blue-700 border-blue-200',
    kesehatan: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    keamanan: 'bg-orange-100 text-orange-700 border-orange-200',
    sosial: 'bg-purple-100 text-purple-700 border-purple-200',
    umum: 'bg-gray-100 text-gray-700 border-gray-200',
  }
  return colorMap[category] ?? colorMap.umum
}

export function getPriorityColor(priority: AnnouncementPriority): string {
  const colorMap: Record<AnnouncementPriority, string> = {
    tinggi: 'bg-red-500',
    sedang: 'bg-yellow-500',
    rendah: 'bg-green-500',
  }
  return colorMap[priority] ?? colorMap.rendah
}

export function getStatusColor(status: AspirationStatus): string {
  const colorMap: Record<AspirationStatus, string> = {
    baru: 'bg-blue-100 text-blue-700 border-blue-200',
    diproses: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    selesai: 'bg-green-100 text-green-700 border-green-200',
    ditolak: 'bg-red-100 text-red-700 border-red-200',
  }
  return colorMap[status] ?? colorMap.baru
}

export function getStatusLabel(status: AspirationStatus): string {
  const labelMap: Record<AspirationStatus, string> = {
    baru: 'Baru',
    diproses: 'Sedang Diproses',
    selesai: 'Selesai',
    ditolak: 'Ditolak',
  }
  return labelMap[status]
}

// ── String Helpers ─────────────────────────────────────────────
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

// ── Number Helpers ─────────────────────────────────────────────
export function formatNumber(num: number): string {
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`
  return num.toString()
}

// ── ID Generator ──────────────────────────────────────────────
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}

// ── Validation ─────────────────────────────────────────────────
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function isValidPhone(phone: string): boolean {
  return /^(\+62|62|0)8[1-9][0-9]{7,10}$/.test(phone)
}

// ── API Helpers ────────────────────────────────────────────────
export function buildQueryString(params: Record<string, string | number | boolean | undefined>): string {
  const query = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== '')
    .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
    .join('&')
  return query ? `?${query}` : ''
}
