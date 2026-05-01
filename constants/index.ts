// ============================================================
// RWCONNECT - Application Constants
// ============================================================

export const APP_NAME = 'RWConnect'
export const APP_DESCRIPTION = 'Platform Informasi & Komunikasi Warga'
export const APP_VERSION = '1.0.0'

// ── Navigation Routes ─────────────────────────────────────────
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  ANNOUNCEMENTS: '/dashboard/announcements',
  CALENDAR: '/dashboard/calendar',
  ASPIRATIONS: '/dashboard/aspirations',
  REPORTS: '/dashboard/reports',
  PROFILE: '/dashboard/profile',
  ADMIN: '/dashboard/admin',
} as const

// ── Announcement Categories ───────────────────────────────────
export const ANNOUNCEMENT_CATEGORIES = [
  { value: 'penting', label: 'Penting', color: 'red' },
  { value: 'kegiatan', label: 'Kegiatan', color: 'blue' },
  { value: 'kesehatan', label: 'Kesehatan', color: 'green' },
  { value: 'keamanan', label: 'Keamanan', color: 'orange' },
  { value: 'sosial', label: 'Sosial', color: 'purple' },
  { value: 'umum', label: 'Umum', color: 'gray' },
] as const

export const ANNOUNCEMENT_PRIORITIES = [
  { value: 'tinggi', label: 'Tinggi', color: 'red' },
  { value: 'sedang', label: 'Sedang', color: 'yellow' },
  { value: 'rendah', label: 'Rendah', color: 'green' },
] as const

// ── Event Categories ──────────────────────────────────────────
export const EVENT_CATEGORIES = [
  { value: 'rapat', label: 'Rapat', icon: '🏛️' },
  { value: 'kerja_bakti', label: 'Kerja Bakti', icon: '🧹' },
  { value: 'posyandu', label: 'Posyandu', icon: '🏥' },
  { value: 'arisan', label: 'Arisan', icon: '💰' },
  { value: 'keamanan', label: 'Keamanan', icon: '🔒' },
  { value: 'sosial', label: 'Sosial', icon: '🤝' },
  { value: 'lainnya', label: 'Lainnya', icon: '📌' },
] as const

// ── Aspiration Categories ─────────────────────────────────────
export const ASPIRATION_CATEGORIES = [
  { value: 'infrastruktur', label: 'Infrastruktur', icon: '🏗️' },
  { value: 'keamanan', label: 'Keamanan', icon: '🔒' },
  { value: 'kebersihan', label: 'Kebersihan', icon: '🧹' },
  { value: 'sosial', label: 'Sosial', icon: '🤝' },
  { value: 'administrasi', label: 'Administrasi', icon: '📋' },
  { value: 'lainnya', label: 'Lainnya', icon: '📌' },
] as const

export const ASPIRATION_STATUSES = [
  { value: 'baru', label: 'Baru', color: 'blue' },
  { value: 'diproses', label: 'Diproses', color: 'yellow' },
  { value: 'selesai', label: 'Selesai', color: 'green' },
  { value: 'ditolak', label: 'Ditolak', color: 'red' },
] as const

// ── Pagination ────────────────────────────────────────────────
export const DEFAULT_PAGE_SIZE = 10
export const PAGE_SIZE_OPTIONS = [5, 10, 20, 50]

// ── Date Formats ──────────────────────────────────────────────
export const DATE_FORMAT = 'dd MMMM yyyy'
export const DATE_TIME_FORMAT = 'dd MMMM yyyy, HH:mm'
export const TIME_FORMAT = 'HH:mm'
export const MONTH_YEAR_FORMAT = 'MMMM yyyy'

// ── Local Storage Keys ────────────────────────────────────────
export const STORAGE_KEYS = {
  THEME: 'rwconnect_theme',
  SIDEBAR_COLLAPSED: 'rwconnect_sidebar',
  NOTIFICATIONS_READ: 'rwconnect_notif_read',
} as const

// ── Query Keys (React Query / SWR) ────────────────────────────
export const QUERY_KEYS = {
  ANNOUNCEMENTS: 'announcements',
  EVENTS: 'events',
  ASPIRATIONS: 'aspirations',
  NOTIFICATIONS: 'notifications',
  USER: 'user',
  STATS: 'stats',
} as const

// ── API Endpoints ─────────────────────────────────────────────
export const API_ENDPOINTS = {
  ANNOUNCEMENTS: '/api/announcements',
  ASPIRATIONS: '/api/aspirations',
  REPORTS: '/api/reports',
  EVENTS: '/api/events',
  NOTIFICATIONS: '/api/notifications',
} as const
