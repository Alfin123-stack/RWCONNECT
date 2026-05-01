"use client";

import { CheckCircle2 } from "lucide-react";
import { cn } from "../../utils";

// ── Types ─────────────────────────────────────────────────────
interface Feature {
  icon: React.ElementType;
  label: string;
}

interface AuthBrandPanelProps {
  /** Heading sebelum highlighted text */
  headingPrefix: string;
  /** Teks yang diberi gradient highlight */
  headingHighlight: string;
  /** Paragraf deskripsi di bawah heading */
  description: string;
  /** Daftar fitur yang ditampilkan */
  features: Feature[];
  /** Tampilkan centang (✓) di setiap feature — cocok untuk halaman register */
  showFeatureCheck?: boolean;
  /** Label badge kecil di atas heading (opsional, contoh: "Daftar Gratis") */
  badge?: string;
  /** Jumlah warga yang sudah bergabung */
  memberCount?: string;
}

// ── Avatar stack (statis, dekoratif) ─────────────────────────
const AVATAR_INITIALS = ["B", "S", "A", "R"] as const;
const AVATAR_COLORS = [
  "bg-blue-500",
  "bg-cyan-500",
  "bg-emerald-500",
  "bg-purple-500",
] as const;

function AvatarStack() {
  return (
    <div className="flex -space-x-2">
      {AVATAR_INITIALS.map((initial, i) => (
        <div
          key={initial}
          className={cn(
            "w-8 h-8 rounded-full border-2 border-slate-800",
            "flex items-center justify-center text-xs font-bold text-white",
            AVATAR_COLORS[i],
          )}
        >
          {initial}
        </div>
      ))}
    </div>
  );
}

// ── Background decorations ────────────────────────────────────
function PanelBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      {/* Blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-blue-800/30 blur-2xl" />
      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px]" />
    </div>
  );
}

// ── Logo ──────────────────────────────────────────────────────
function BrandLogo() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
        <span className="text-white font-bold text-sm">RW</span>
      </div>
      <span className="text-white font-display font-bold text-xl">Connect</span>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────
export function AuthBrandPanel({
  headingPrefix,
  headingHighlight,
  description,
  features,
  showFeatureCheck = false,
  badge,
  memberCount = "200+ warga",
}: AuthBrandPanelProps) {
  return (
    <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 relative overflow-hidden">
      <PanelBackground />

      {/* ── Top section ─────────────────────────────────────── */}
      <div className="relative z-10">
        <div className="mb-16">
          <BrandLogo />
        </div>

        {/* Heading */}
        <div className="mb-10">
          {badge && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-500/30 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-blue-300 text-xs font-medium">{badge}</span>
            </div>
          )}
          <h1 className="text-4xl xl:text-5xl font-display font-bold text-white leading-tight mb-4">
            {headingPrefix}{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {headingHighlight}
            </span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">{description}</p>
        </div>

        {/* Feature list */}
        <div
          className={cn(
            "grid gap-3",
            showFeatureCheck ? "grid-cols-1" : "grid-cols-2",
          )}
        >
          {features.map((f, i) => (
            <div
              key={f.label}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="w-8 h-8 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                <f.icon className="w-4 h-4 text-blue-400" />
              </div>
              <span className="text-slate-300 text-sm font-medium flex-1">
                {f.label}
              </span>
              {showFeatureCheck && (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom member badge ──────────────────────────────── */}
      <div className="relative z-10">
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
          <AvatarStack />
          <div>
            <p className="text-sm text-white font-semibold">{memberCount}</p>
            <p className="text-xs text-slate-400">sudah bergabung di RWConnect</p>
          </div>
        </div>
      </div>
    </div>
  );
}
