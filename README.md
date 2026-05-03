# RWConnect — Platform Informasi Warga Digital

Platform digital untuk menyatukan informasi, kegiatan, dan aspirasi warga dalam satu tempat.

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Setup environment
```bash
cp .env.example .env.local
```
Isi `.env.local` dengan URL dan Key dari project Supabase kamu:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
```

### 3. Setup database Supabase
Buka **SQL Editor** di dashboard Supabase kamu, lalu jalankan secara berurutan:
```
supabase/migrations/001_init.sql   ← schema, trigger, RLS
supabase/migrations/002_seed.sql   ← data contoh (opsional)
```

### 4. Jalankan development server
```bash
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000)

---

## 📁 Struktur Project

```
src/
├── actions/                # Server Actions — semua operasi data
│   ├── announcements.ts    # Read & mutasi pengumuman
│   ├── aspirations.ts      # Read & mutasi aspirasi
│   ├── dashboard.ts        # Fetch data dashboard & kalender
│   ├── events.ts           # Mutasi kegiatan
│   ├── notifications.ts    # Fetch & mark-read notifikasi
│   ├── reports.ts          # Fetch data statistik laporan
│   └── users.ts            # Read & mutasi profil & role warga
│
├── app/                    # Next.js App Router
│   ├── login/              # Halaman login (CSR)
│   ├── register/           # Halaman register multi-step (CSR)
│   └── dashboard/          # Dashboard layout & pages
│       ├── page.tsx                    # Dashboard utama (SSR)
│       ├── announcements/              # Pengumuman (SSR + ISR)
│       │   └── [id]/                   # Detail pengumuman (SSR + ISR)
│       ├── calendar/                   # Kalender kegiatan (SSR + ISR)
│       ├── aspirations/                # Aspirasi & laporan (SSR)
│       ├── reports/                    # Statistik (SSR)
│       ├── profile/                    # Profil pengguna (SSR)
│       └── admin/users/                # Kelola warga (SSR)
│
├── components/
│   ├── auth/               # Komponen auth reusable
│   ├── layout/             # Sidebar, TopBar
│   ├── ui/                 # Komponen UI reusable
│   ├── dashboard/          # Widget dashboard
│   ├── announcements/      # Komponen pengumuman
│   ├── calendar/           # Komponen kalender
│   ├── aspirations/        # Komponen aspirasi
│   ├── profile/            # Form profil
│   └── admin/              # Tabel manajemen warga
│
├── lib/supabase/           # Supabase client (browser + server)
├── types/                  # TypeScript type definitions
├── constants/              # App constants
├── utils/                  # Helper functions
└── hooks/                  # Custom React hooks
```

---

## 🏗️ Rendering Strategy

| Halaman | Strategy | Alasan |
|---|---|---|
| `/login` | **CSR** | Form interaktif, state lokal |
| `/register` | **CSR** | Multi-step form, state lokal |
| `/dashboard` | **SSR** | Data real-time, auth check |
| `/dashboard/announcements` | **SSR + ISR** (60s) | Semi-static, bisa di-cache |
| `/dashboard/calendar` | **SSR + ISR** (300s) | Jadwal berubah tidak sering |
| `/dashboard/aspirations` | **SSR** | Data user-specific |
| `/dashboard/reports` | **SSR** | Data statistik terkini |
| `/dashboard/profile` | **SSR** | Data user-specific |
| `/dashboard/admin/users` | **SSR** | Data sensitif, auth check ketat |

---

## ⚙️ Server Actions

Semua operasi data menggunakan **Server Actions** — tidak ada API Routes. Logika berjalan di server sehingga Supabase key tidak pernah terekspos ke browser.

### `announcements.ts`
| Action | Jenis | Keterangan |
|---|---|---|
| `getAnnouncements(options)` | Read | Fetch pengumuman dengan filter & pagination |
| `getAnnouncementById(id)` | Read | Fetch satu pengumuman by ID |
| `getAnnouncementTitle(id)` | Read | Fetch judul saja — untuk `generateMetadata` |
| `incrementViewCount(id)` | Mutasi | Tambah view count, pakai RPC + fallback |
| `getCurrentUserRole()` | Read | Cek role user yang sedang login |
| `createAnnouncement(payload)` | Mutasi | Buat pengumuman baru (admin/ketua_rw) |

### `aspirations.ts`
| Action | Jenis | Keterangan |
|---|---|---|
| `getAspirations(options)` | Read | Fetch aspirasi dengan filter & pagination |
| `createAspiration(payload)` | Mutasi | Kirim aspirasi baru |
| `upvoteAspiration(id, count)` | Mutasi | Tambah dukungan, pakai RPC + fallback |
| `updateAspirationStatus(id, status)` | Mutasi | Ubah status (admin/ketua_rw) |

### `dashboard.ts`
| Action | Jenis | Keterangan |
|---|---|---|
| `getDashboardData()` | Read | Stats, pengumuman terbaru, & kegiatan mendatang |
| `getMonthEvents()` | Read | Fetch kegiatan bulan ini untuk kalender |

### `events.ts`
| Action | Jenis | Keterangan |
|---|---|---|
| `createEventAction(payload)` | Mutasi | Tambah kegiatan baru (admin/ketua_rw) |
| `deleteEventAction(id)` | Mutasi | Hapus kegiatan (admin/ketua_rw) |

### `notifications.ts`
| Action | Jenis | Keterangan |
|---|---|---|
| `getNotifications()` | Read | Fetch notifikasi user yang login |
| `markNotificationsRead(ids)` | Mutasi | Tandai notifikasi sudah dibaca |

### `reports.ts`
| Action | Jenis | Keterangan |
|---|---|---|
| `getReportsData()` | Read | Semua statistik platform dalam satu call |

### `users.ts`
| Action | Jenis | Keterangan |
|---|---|---|
| `getCurrentUserProfile()` | Read | Fetch profil user yang sedang login |
| `updateUserProfile(updates)` | Mutasi | Simpan perubahan profil |
| `getAllUsers()` | Read | Fetch semua warga (admin/ketua_rw) |
| `updateUserRole(targetId, role)` | Mutasi | Ubah role warga (admin/ketua_rw) |

---

## 🗄️ Database Schema

| Tabel | Fungsi |
|---|---|
| `users` | Profil & role warga (extends auth.users) |
| `announcements` | Pengumuman dari pengurus RW |
| `events` | Kalender kegiatan warga |
| `aspirations` | Aspirasi & laporan warga |
| `notifications` | Notifikasi per-user |
| `aspiration_upvotes` | Tracking dukungan aspirasi |

Fitur database:
- **RLS** — Row Level Security aktif di semua tabel
- **Trigger** `handle_new_user` — profil otomatis dibuat saat register
- **Trigger** `notify_announcement` — notifikasi otomatis ke semua warga saat ada pengumuman baru
- **Trigger** `updated_at` — kolom updated_at otomatis diperbarui

---

## 🔐 Role & Akses

| Role | Akses |
|---|---|
| `warga` | Baca semua, kirim aspirasi, upvote, edit profil. Bisa daftar sendiri lewat `/register` |
| `ketua_rw` | + Buat pengumuman, ubah status aspirasi, kelola warga |
| `admin` | Full access |

> Akun `ketua_rw` dan `admin` hanya bisa dibuat oleh Admin dari halaman `/dashboard/admin/users`.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Database & Auth**: Supabase (PostgreSQL)
- **Language**: TypeScript
- **Icons**: Lucide React
- **Date**: date-fns
