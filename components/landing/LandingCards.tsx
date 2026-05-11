"use client";

import { Bell, Star } from "lucide-react";

// ── Step Item ──────────────────────────────────────────────
export function StepItem({
  num,
  title,
  desc,
}: {
  num: number;
  title: string;
  desc: string;
}) {
  return (
    <li className="flex gap-4 items-start">
      <div className="w-10 h-10 min-w-[40px] rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30 text-white font-bold text-sm mt-0.5">
        {num}
      </div>
      <div>
        <h3 className="text-white font-semibold mb-1">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
      </div>
    </li>
  );
}

// ── Benefit Card ──────────────────────────────────────────
export function BenefitCard({
  icon: Icon,
  iconBg,
  iconColor,
  title,
  desc,
  highlight,
}: {
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  title: string;
  desc: string;
  highlight: string;
}) {
  return (
    <article className="flex gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300">
      <div
        className={`w-10 h-10 min-w-[40px] rounded-xl ${iconBg} flex items-center justify-center shadow-lg mt-0.5`}>
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>
      <div>
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <h3 className="text-white font-bold text-sm">{title}</h3>
          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 font-medium">
            {highlight}
          </span>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
      </div>
    </article>
  );
}

// ── Testimonial Card ──────────────────────────────────────
export function TestiCard({
  quote,
  name,
  role,
  initials,
  color,
}: {
  quote: string;
  name: string;
  role: string;
  initials: string;
  color: string;
}) {
  return (
    <article className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300">
      <div className="flex gap-0.5 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
        ))}
      </div>
      <blockquote className="text-slate-300 text-sm leading-relaxed mb-5 italic">
        "{quote}"
      </blockquote>
      <div className="flex items-center gap-3">
        <div
          className={`w-9 h-9 rounded-xl ${color} flex items-center justify-center text-white font-bold text-sm`}>
          {initials}
        </div>
        <div>
          <p className="text-white text-sm font-semibold">{name}</p>
          <p className="text-slate-500 text-xs">{role}</p>
        </div>
      </div>
    </article>
  );
}

// ── Notification Preview ──────────────────────────────────
const NOTIFS = [
  {
    dot: "bg-blue-500",
    title: "Pengumuman: Jadwal Posyandu Juni",
    sub: "Dari Ketua RW · 5 menit lalu",
  },
  {
    dot: "bg-emerald-500",
    title: "Aspirasi kamu sudah diproses ✓",
    sub: "Perbaikan jalan Gang Melati · 2 jam lalu",
  },
  {
    dot: "bg-blue-500",
    title: "Kegiatan baru: Kerja Bakti RT 04",
    sub: "Minggu, 9 Juni · 07.00 WIB",
  },
  {
    dot: "bg-slate-500",
    title: "24 warga mendukung aspirasi kamu",
    sub: "Lampu jalan Gang Anggrek · kemarin",
  },
];

export function NotifPreview() {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-5">
      <div className="flex items-center gap-2 mb-4">
        <Bell className="w-4 h-4 text-blue-400" />
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Notifikasi Terbaru
        </p>
        <span className="ml-auto w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
          4
        </span>
      </div>
      <div className="divide-y divide-white/5">
        {NOTIFS.map((n, i) => (
          <div key={i} className="flex items-start gap-3 py-3">
            <div
              className={`w-2 h-2 rounded-full ${n.dot} mt-1.5 flex-shrink-0`}
            />
            <div>
              <p className="text-white text-sm font-medium leading-snug">
                {n.title}
              </p>
              <p className="text-slate-500 text-xs mt-0.5">{n.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
