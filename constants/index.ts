import {
  Megaphone,
  MessageSquareHeart,
  CalendarDays,
  Bell,
  Zap,
  Shield,
  Users,
  TrendingUp,
  Landmark,
  Trash2,
  HeartPulse,
  Coins,
  Lock,
  Handshake,
  MapPin,
  Construction,
  ClipboardList,
  type LucideIcon,
} from "lucide-react";

// ── App Info ──────────────────────────────────────────────────
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
// CATATAN: icon TIDAK disimpan di sini.
// Mapping icon dilakukan langsung di komponen yang membutuhkan.
export const ANNOUNCEMENT_CATEGORIES = [
  { value: "penting", label: "Penting", color: "red" },
  { value: "kegiatan", label: "Kegiatan", color: "blue" },
  { value: "kesehatan", label: "Kesehatan", color: "green" },
  { value: "keamanan", label: "Keamanan", color: "orange" },
  { value: "sosial", label: "Sosial", color: "purple" },
  { value: "umum", label: "Umum", color: "gray" },
] as const;

// ── Announcement Priorities ───────────────────────────────────
export const ANNOUNCEMENT_PRIORITIES = [
  { value: "tinggi", label: "Tinggi", color: "red" },
  { value: "sedang", label: "Sedang", color: "yellow" },
  { value: "rendah", label: "Rendah", color: "green" },
] as const;

// ── Event Categories ──────────────────────────────────────────
export const EVENT_CATEGORIES = [
  { value: "rapat", label: "Rapat" },
  { value: "kerja_bakti", label: "Kerja Bakti" },
  { value: "posyandu", label: "Posyandu" },
  { value: "arisan", label: "Arisan" },
  { value: "keamanan", label: "Keamanan" },
  { value: "sosial", label: "Sosial" },
  { value: "lainnya", label: "Lainnya" },
] as const;

// ── Aspiration Categories ─────────────────────────────────────
export const ASPIRATION_CATEGORIES = [
  { value: "infrastruktur", label: "Infrastruktur" },
  { value: "keamanan", label: "Keamanan" },
  { value: "kebersihan", label: "Kebersihan" },
  { value: "sosial", label: "Sosial" },
  { value: "administrasi", label: "Administrasi" },
  { value: "lainnya", label: "Lainnya" },
] as const;

// ── Derived type helpers ──────────────────────────────────────
export type AnnouncementCategoryValue =
  (typeof ANNOUNCEMENT_CATEGORIES)[number]["value"];

export type AnnouncementPriorityValue =
  (typeof ANNOUNCEMENT_PRIORITIES)[number]["value"];

export type EventCategoryValue = (typeof EVENT_CATEGORIES)[number]["value"];

export type AspirationCategoryValue =
  (typeof ASPIRATION_CATEGORIES)[number]["value"];

export const FEATURES = [
  {
    icon: Megaphone,
    title: "Pengumuman Langsung Sampai",
    description:
      "Setiap pengumuman dari Ketua RW langsung masuk sebagai notifikasi ke semua warga. Tidak ada lagi yang ketinggalan info penting.",
    pills: ["Prioritas tinggi/rendah", "Pin pengumuman", "6 kategori"],
    gradient: "bg-gradient-to-br from-blue-600/10 to-transparent",
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-400",
  },
  {
    icon: MessageSquareHeart,
    title: "Aspirasi Tanpa Takut",
    description:
      "Warga bisa menyampaikan aspirasi secara anonim. Yang lain bisa kasih dukungan. Suara warga benar-benar didengar.",
    pills: ["Kirim anonim", "Sistem upvote", "Pantau status"],
    gradient: "bg-gradient-to-br from-cyan-600/10 to-transparent",
    iconBg: "bg-cyan-500/20",
    iconColor: "text-cyan-400",
  },
  {
    icon: CalendarDays,
    title: "Kalender Kegiatan Warga",
    description:
      "Lihat semua jadwal kegiatan lingkungan dalam satu tampilan kalender interaktif. Dari posyandu hingga arisan RT.",
    pills: ["7 kategori kegiatan", "Detail per tanggal", "Real-time update"],
    gradient: "bg-gradient-to-br from-emerald-600/10 to-transparent",
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-400",
  },
  {
    icon: Bell,
    title: "Notifikasi Cerdas",
    description:
      "Bell icon di header selalu menunjukkan info terbaru. Notifikasi otomatis setiap ada pengumuman atau update aspirasi.",
    pills: ["Badge belum dibaca", "Tandai semua dibaca", "Auto-notif"],
    gradient: "bg-gradient-to-br from-purple-600/10 to-transparent",
    iconBg: "bg-purple-500/20",
    iconColor: "text-purple-400",
  },
];

export const BENEFITS = [
  {
    icon: Zap,
    iconBg: "bg-amber-500/20",
    iconColor: "text-amber-400",
    title: "Daftar dalam 2 menit",
    highlight: "Gratis selamanya",
    desc: "Tidak perlu antri ke kantor RW. Isi form online, langsung aktif. Tidak ada biaya tersembunyi.",
  },
  {
    icon: Shield,
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-400",
    title: "Identitas aman & terlindungi",
    highlight: "Privasi terjaga",
    desc: "Kirim aspirasi secara anonim. Data warga tidak dijual atau disebarkan ke pihak manapun.",
  },
  {
    icon: Bell,
    iconBg: "bg-cyan-500/20",
    iconColor: "text-cyan-400",
    title: "Info sampai, tidak ketinggalan",
    highlight: "Real-time",
    desc: "Notifikasi langsung masuk ke HP setiap ada pengumuman penting atau update dari Ketua RW.",
  },
  {
    icon: MessageSquareHeart,
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-400",
    title: "Suaramu benar-benar didengar",
    highlight: "Transparan",
    desc: "Pantau status aspirasimu dari diajukan hingga selesai ditangani. Tidak ada yang hilang begitu saja.",
  },
  {
    icon: Users,
    iconBg: "bg-purple-500/20",
    iconColor: "text-purple-400",
    title: "Komunitas warga lebih solid",
    highlight: "Kolaboratif",
    desc: "Dukung aspirasi warga lain, lihat siapa yang paling banyak didukung, dan bergerak bersama.",
  },
  {
    icon: TrendingUp,
    iconBg: "bg-rose-500/20",
    iconColor: "text-rose-400",
    title: "Lingkungan lebih cepat berbenah",
    highlight: "Terukur",
    desc: "Data aspirasi dan progres penanganan tersimpan rapi. Ketua RW bisa prioritaskan yang paling mendesak.",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Akhirnya nggak perlu nunggu pengumuman di papan RT. Semua langsung masuk ke HP. Kerja bakti pun nggak ada yang ketinggalan lagi.",
    name: "Siti Hartini",
    role: "Warga RT 03, Kel. Makmur Jaya",
    initials: "SH",
    color: "bg-blue-500",
  },
  {
    quote:
      "Sebagai Ketua RW, ini sangat membantu. Saya bisa langsung balas aspirasi warga dari mana saja. Tidak perlu tatap muka dulu.",
    name: "Bapak Priyatno",
    role: "Ketua RW 07, Kel. Sejahtera Baru",
    initials: "BP",
    color: "bg-cyan-500",
  },
  {
    quote:
      "Saya sempat ragu mau lapor soal jalan rusak. Ternyata bisa anonim! Setelah dilaporkan, langsung ditangani dalam seminggu.",
    name: "Wulandari S.",
    role: "Warga RT 11, Kel. Harapan Indah",
    initials: "WS",
    color: "bg-emerald-500",
  },
];

export const NAV_LINKS = [
  { href: "#fitur", label: "Fitur" },
  { href: "#cara-kerja", label: "Cara Kerja" },
  { href: "#kenapa", label: "Kenapa RWConnect" },
];

export const STATS = [
  { value: "1.200+", label: "Warga terdaftar" },
  { value: "340+", label: "Aspirasi tersampaikan" },
  { value: "98%", label: "Warga puas" },
  { value: "50+", label: "RW aktif" },
];

export const FOOTER_PLATFORM_LINKS = [
  ["Pengumuman", "/dashboard/announcements"],
  ["Kalender Kegiatan", "/dashboard/calendar"],
  ["Aspirasi Warga", "/dashboard/aspirations"],
  ["Statistik", "/dashboard/reports"],
] as const;

export const FOOTER_ACCOUNT_LINKS = [
  ["Daftar Warga", "/register"],
  ["Masuk", "/login"],
  ["Profil Saya", "/dashboard/profile"],
] as const;
