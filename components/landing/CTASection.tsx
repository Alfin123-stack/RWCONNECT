"use client";

import Link from "next/link";
import { LayoutDashboard, LogIn, Sparkles, Zap } from "lucide-react";

import { HeroBackground } from "../ui/HeroBackground";
import { useAuth } from "../../hooks/useAuth";

interface CTASectionProps {
  isLoggedIn: boolean;
}

export function CTASection() {
  const { isLoggedIn } = useAuth();
  return (
    <section
      className="relative py-32 overflow-hidden"
      aria-labelledby="cta-title">
      <HeroBackground />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-500/30 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-blue-300 text-xs font-medium">
            Bergabung Sekarang
          </span>
        </div>

        <h2 id="cta-title" className="text-4xl xl:text-5xl font-bold mb-4">
          Jadikan lingkunganmu{" "}
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            lebih terhubung
          </span>
        </h2>

        <p className="text-slate-400 text-lg mb-10 leading-relaxed">
          Daftar gratis dalam 2 menit. Tidak perlu kartu kredit. Langsung aktif.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {isLoggedIn ? (
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-lg font-semibold shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all duration-200">
              <LayoutDashboard className="w-5 h-5" />
              Buka Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-lg font-semibold shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all duration-200">
                <Zap className="w-5 h-5" />
                Daftar sebagai Warga
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-lg font-semibold hover:bg-white/10 hover:border-white/20 transition-all duration-200">
                <LogIn className="w-5 h-5" />
                Masuk ke akun
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
