// ============================================================
// RWCONNECT - Type Definitions
// ============================================================

// ── User & Auth ──────────────────────────────────────────────
export type UserRole = 'admin' | 'ketua_rw' | 'warga'

export interface User {
  id: string
  email: string
  full_name: string
  phone?: string
  address?: string
  rt_number?: string
  role: UserRole
  avatar_url?: string
  created_at: string
  updated_at: string
}

// ── Announcement ─────────────────────────────────────────────
export type AnnouncementCategory =
  | 'penting'
  | 'kegiatan'
  | 'kesehatan'
  | 'keamanan'
  | 'sosial'
  | 'umum'

export type AnnouncementPriority = 'tinggi' | 'sedang' | 'rendah'

export interface Announcement {
  id: string
  title: string
  content: string
  category: AnnouncementCategory
  priority: AnnouncementPriority
  author_id: string
  author?: User
  image_url?: string
  is_pinned: boolean
  is_published: boolean
  published_at?: string
  expires_at?: string
  view_count: number
  created_at: string
  updated_at: string
}

export interface CreateAnnouncementPayload {
  title: string
  content: string
  category: AnnouncementCategory
  priority: AnnouncementPriority
  image_url?: string
  is_pinned?: boolean
  expires_at?: string
}

// ── Calendar / Event ─────────────────────────────────────────
export type EventCategory =
  | 'rapat'
  | 'kerja_bakti'
  | 'posyandu'
  | 'arisan'
  | 'keamanan'
  | 'sosial'
  | 'lainnya'

export interface CalendarEvent {
  id: string
  title: string
  description?: string
  category: EventCategory
  location?: string
  start_date: string
  end_date?: string
  is_all_day: boolean
  organizer_id: string
  organizer?: User
  max_participants?: number
  created_at: string
  updated_at: string
}

export interface CreateEventPayload {
  title: string
  description?: string
  category: EventCategory
  location?: string
  start_date: string
  end_date?: string
  is_all_day: boolean
  max_participants?: number
}

// ── Aspiration / Laporan ─────────────────────────────────────
export type AspirationStatus = 'baru' | 'diproses' | 'selesai' | 'ditolak'
export type AspirationCategory =
  | 'infrastruktur'
  | 'keamanan'
  | 'kebersihan'
  | 'sosial'
  | 'administrasi'
  | 'lainnya'

export interface Aspiration {
  id: string
  title: string
  content: string
  category: AspirationCategory
  status: AspirationStatus
  author_id: string
  author?: User
  is_anonymous: boolean
  image_url?: string
  admin_response?: string
  admin_response_at?: string
  upvote_count: number
  created_at: string
  updated_at: string
}

export interface CreateAspirationPayload {
  title: string
  content: string
  category: AspirationCategory
  is_anonymous: boolean
  image_url?: string
}

// ── Notification ──────────────────────────────────────────────
export type NotificationType = 'announcement' | 'event' | 'aspiration_update'

export interface Notification {
  id: string
  user_id: string
  type: NotificationType
  title: string
  message: string
  is_read: boolean
  reference_id?: string
  created_at: string
}

// ── API Response ──────────────────────────────────────────────
export interface ApiResponse<T = unknown> {
  data?: T
  error?: string
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  count: number
  page: number
  limit: number
  total_pages: number
}

// ── UI State ──────────────────────────────────────────────────
export interface LoadingState {
  isLoading: boolean
  error: string | null
}

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  type: ToastType
  title: string
  message?: string
  duration?: number
}

// ── Filter & Sort ─────────────────────────────────────────────
export interface AnnouncementFilter {
  category?: AnnouncementCategory
  priority?: AnnouncementPriority
  search?: string
}

export interface AspirationFilter {
  category?: AspirationCategory
  status?: AspirationStatus
  search?: string
}

export interface DateRange {
  from: Date
  to?: Date
}
