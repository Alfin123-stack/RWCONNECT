"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      {/* Soft glow blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-rose-100/50 blur-3xl pointer-events-none" />

      <div className="relative text-center max-w-sm w-full animate-fade-in">
        {/* Icon */}
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-3xl bg-white border border-slate-200 shadow-xl flex items-center justify-center">
              <AlertTriangle
                className="w-12 h-12 text-amber-400"
                strokeWidth={1.5}
              />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center shadow-sm">
              <span className="text-amber-500 text-xs font-black">!</span>
            </div>
          </div>
        </div>

        {/* Label */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span className="text-xs font-semibold text-slate-500 tracking-widest uppercase">
            Terjadi Kesalahan
          </span>
        </div>

        <h2 className="text-2xl font-display font-bold text-slate-900 mb-3 leading-tight">
          Oops, Ada yang Salah
        </h2>
        <p className="text-slate-500 text-sm mb-3 leading-relaxed px-4">
          Maaf, terjadi kesalahan saat memuat halaman ini. Silakan coba lagi
          atau hubungi pengurus jika masalah berlanjut.
        </p>

        {/* Error digest */}
        {error.digest && (
          <div className="mx-auto mb-6 px-3 py-2 rounded-xl bg-slate-100 border border-slate-200 inline-flex items-center gap-2">
            <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wide">
              Kode:
            </span>
            <span className="text-[10px] font-mono text-slate-600 font-semibold">
              {error.digest}
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
          <button
            onClick={reset}
            className="btn-primary inline-flex items-center gap-2 w-full sm:w-auto justify-center">
            <RefreshCw className="w-4 h-4" />
            Coba Lagi
          </button>
          <Link
            href="/dashboard"
            className="btn-ghost inline-flex items-center gap-2 w-full sm:w-auto justify-center text-sm text-slate-500 hover:text-slate-800">
            <Home className="w-4 h-4" />
            Ke Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
