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
Buka **SQL Editor** di dashboard Supabase kamu, lalu jalankan:
```
supabase/migrations/001_init.sql
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
├── app/                    # Next.js App Router
│   ├── login/              # Halaman login (CSR)
│   ├── dashboard/          # Dashboard layout & pages
│   │   ├── page.tsx        # Dashboard utama (SSR)
│   │   ├── announcements/  # Pengumuman (SSR + ISR)
│   │   ├── calendar/       # Kalender (SSR + ISR)
│   │   ├── aspirations/    # Aspirasi (SSR)
│   │   └── reports/        # Laporan (SSR)
│   └── api/                # API Routes
│       ├── announcements/
│       ├── aspirations/
│       └── reports/
├── components/
│   ├── layout/             # Sidebar, TopBar
│   ├── ui/                 # Komponen UI reusable
│   ├── dashboard/          # Widget dashboard
│   ├── announcements/      # Komponen pengumuman
│   ├── calendar/           # Komponen kalender
│   └── aspirations/        # Komponen aspirasi
├── lib/supabase/           # Supabase client (browser + server)
├── utils/                  # Helper functions
├── types/                  # TypeScript type definitions
├── constants/              # App constants
└── hooks/                  # Custom React hooks
```

---

## 🏗️ Rendering Strategy

| Halaman | Strategy | Alasan |
|---|---|---|
| `/login` | **CSR** | Form interaktif, state lokal |
| `/dashboard` | **SSR** | Data real-time, auth check |
| `/dashboard/announcements` | **SSR + ISR** (60s) | Semi-static, bisa di-cache |
| `/dashboard/calendar` | **SSR + ISR** (300s) | Jadwal berubah tidak sering |
| `/dashboard/aspirations` | **SSR** | Data user-specific |
| `/dashboard/reports` | **SSR** | Data statistik terkini |

---

## 🗄️ Database Schema

Tabel utama:
- **users** — profil warga (extends auth.users)
- **announcements** — pengumuman pengurus RW
- **events** — kalender kegiatan
- **aspirations** — aspirasi & laporan warga
- **notifications** — notifikasi per-user
- **aspiration_upvotes** — tracking dukungan aspirasi

---

## 🔐 Role & Akses

| Role | Akses |
|---|---|
| `warga` | Baca semua, kirim aspirasi |
| `ketua_rw` | + Buat pengumuman, ubah status aspirasi |
| `admin` | Full access |

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Database & Auth**: Supabase
- **Language**: TypeScript
- **Icons**: Lucide React
- **Date**: date-fns
