// app/not-found.tsx
import Link from "next/link";
import { Home, FileQuestion } from "lucide-react";
import { BackButton } from "../components/ui/BackButton"; // ← buat file ini

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #e2e8f0 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-100/60 blur-3xl pointer-events-none" />

      <div className="relative text-center max-w-sm w-full animate-fade-in">
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-3xl bg-white border border-slate-200 shadow-xl flex items-center justify-center">
              <FileQuestion
                className="w-12 h-12 text-slate-300"
                strokeWidth={1.5}
              />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-xl bg-rose-100 border border-rose-200 flex items-center justify-center shadow-sm">
              <span className="text-rose-500 text-xs font-black">!</span>
            </div>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
          <span className="text-xs font-semibold text-slate-500 tracking-widest uppercase">
            Error 404
          </span>
        </div>

        <h1 className="text-2xl font-display font-bold text-slate-900 mb-3 leading-tight">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-slate-500 mb-8 text-sm leading-relaxed px-4">
          Halaman yang kamu cari tidak ada atau sudah dipindahkan. Kembali ke
          dashboard untuk melanjutkan.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/dashboard"
            className="btn-primary inline-flex items-center gap-2 w-full sm:w-auto justify-center">
            <Home className="w-4 h-4" />
            Ke Dashboard
          </Link>
          <BackButton /> {/* ← Client Component */}
        </div>
      </div>
    </div>
  );
}
