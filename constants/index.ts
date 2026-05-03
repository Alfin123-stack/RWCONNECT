// ============================================================
// RWCONNECT - Application Constants
// ============================================================

export const APP_NAME = "RWConnect";
export const APP_DESCRIPTION = "Platform Informasi & Komunikasi Warga";
export const APP_VERSION = "1.0.0";

// ── Navigation Routes ─────────────────────────────────────────
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  ANNOUNCEMENTS: "/dashboard/announcements",
  CALENDAR: "/dashboard/calendar",
  ASPIRATIONS: "/dashboard/aspirations",
  REPORTS: "/dashboard/reports",
  PROFILE: "/dashboard/profile",
  ADMIN: "/dashboard/admin",
} as const;

// ── Announcement Categories ───────────────────────────────────
export const ANNOUNCEMENT_CATEGORIES = [
  { value: "penting", label: "Penting", color: "red" },
  { value: "kegiatan", label: "Kegiatan", color: "blue" },
  { value: "kesehatan", label: "Kesehatan", color: "green" },
  { value: "keamanan", label: "Keamanan", color: "orange" },
  { value: "sosial", label: "Sosial", color: "purple" },
  { value: "umum", label: "Umum", color: "gray" },
] as const;

export const ANNOUNCEMENT_PRIORITIES = [
  { value: "tinggi", label: "Tinggi", color: "red" },
  { value: "sedang", label: "Sedang", color: "yellow" },
  { value: "rendah", label: "Rendah", color: "green" },
] as const;

// ── Event Categories ──────────────────────────────────────────
export const EVENT_CATEGORIES = [
  { value: "rapat", label: "Rapat", icon: "🏛️" },
  { value: "kerja_bakti", label: "Kerja Bakti", icon: "🧹" },
  { value: "posyandu", label: "Posyandu", icon: "🏥" },
  { value: "arisan", label: "Arisan", icon: "💰" },
  { value: "keamanan", label: "Keamanan", icon: "🔒" },
  { value: "sosial", label: "Sosial", icon: "🤝" },
  { value: "lainnya", label: "Lainnya", icon: "📌" },
] as const;

// ── Aspiration Categories ─────────────────────────────────────
export const ASPIRATION_CATEGORIES = [
  { value: "infrastruktur", label: "Infrastruktur", icon: "🏗️" },
  { value: "keamanan", label: "Keamanan", icon: "🔒" },
  { value: "kebersihan", label: "Kebersihan", icon: "🧹" },
  { value: "sosial", label: "Sosial", icon: "🤝" },
  { value: "administrasi", label: "Administrasi", icon: "📋" },
  { value: "lainnya", label: "Lainnya", icon: "📌" },
] as const;
