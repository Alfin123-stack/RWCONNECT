"use client";

import Link from "next/link";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import { LayoutDashboard, LogIn, LogOut, Zap } from "lucide-react";

interface NavAuthButtonProps {
  isLoggedIn: boolean;
}

export function NavAuthButton({ isLoggedIn }: NavAuthButtonProps) {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
    await supabase.auth.signOut();
    router.refresh();
  };

  if (isLoggedIn) {
    return (
      <div className="flex items-center gap-1.5 sm:gap-2">
        <Link
          href="/dashboard"
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-px transition-all duration-200"
        >
          <LayoutDashboard className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
          {/* Hide label on very small screens, show on sm+ */}
          <span className="hidden xs:inline sm:inline">Dashboard</span>
        </Link>
        <button
          onClick={handleLogout}
          title="Keluar"
          className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-400 border border-white/10 bg-white/5 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 transition-all duration-200"
        >
          <LogOut className="w-3.5 h-3.5 shrink-0" />
          <span className="hidden sm:inline">Keluar</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      <Link
        href="/login"
        className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-200"
      >
        <LogIn className="w-3.5 h-3.5 shrink-0" />
        <span className="hidden xs:inline sm:inline">Masuk</span>
      </Link>
      <Link
        href="/register"
        className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-px transition-all duration-200"
      >
        <Zap className="w-3.5 h-3.5 shrink-0" />
        {/* On mobile show "Daftar", on sm+ show full label */}
        <span className="inline sm:hidden">Daftar</span>
        <span className="hidden sm:inline">Daftar Gratis</span>
      </Link>
    </div>
  );
}
