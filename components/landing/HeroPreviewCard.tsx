"use client";

import { CheckCircle2, MapPin, MessageSquareHeart, ThumbsUp } from "lucide-react";

export function HeroPreviewCard() {
  return (
    <div className="relative w-full max-w-sm mx-auto lg:mx-0">
      <div
        className="absolute -top-4 -right-4 w-full rounded-2xl bg-white/5 border border-white/10 p-4 rotate-3 backdrop-blur-sm"
        aria-hidden>
        <div className="h-3 w-24 rounded bg-white/10 mb-2" />
        <div className="h-2 w-36 rounded bg-white/5" />
      </div>
      <div className="relative z-10 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-5 shadow-2xl shadow-black/40">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-blue-500/20 flex items-center justify-center">
            <MessageSquareHeart className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <p className="text-white text-sm font-semibold">Aspirasi Baru</p>
            <p className="text-slate-400 text-xs">3 menit lalu</p>
          </div>
          <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
            Baru
          </span>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed mb-4">
          Perbaikan lampu jalan di Gang Melati sangat diperlukan. Sudah gelap 2
          minggu.
        </p>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <ThumbsUp className="w-3 h-3" />
            <span>24 warga mendukung</span>
          </div>
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <MapPin className="w-3 h-3" /> RT 04
          </span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-white/10">
          <div className="h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 w-3/4" />
        </div>
        <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <p className="text-xs text-slate-400">Ketua RW sedang memproses…</p>
        </div>
      </div>
      <div className="absolute -bottom-3 -left-3 flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/30 backdrop-blur-sm z-20">
        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        <span className="text-emerald-300 text-xs font-semibold">
          Selesai ditangani
        </span>
      </div>
    </div>
  );
}
