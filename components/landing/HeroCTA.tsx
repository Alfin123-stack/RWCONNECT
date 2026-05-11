"use client";

import Link from "next/link";
import { LayoutDashboard, LogIn, Zap } from "lucide-react";

interface HeroCTAProps {
  isLoggedIn: boolean;
}

export function HeroCTA({ isLoggedIn }: HeroCTAProps) {
  if (isLoggedIn) {
    return (
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all duration-200">
        <LayoutDashboard className="w-5 h-5" />
        Buka Dashboard
      </Link>
    );
  }

  return (
    <div className="flex flex-wrap gap-4">
      <Link
        href="/register"
        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all duration-200">
        <Zap className="w-5 h-5" />
        Daftar Sekarang
      </Link>
      <Link
        href="/login"
        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 font-semibold hover:bg-white/10 hover:border-white/20 transition-all duration-200">
        <LogIn className="w-5 h-5" />
        Masuk
      </Link>
    </div>
  );
}
