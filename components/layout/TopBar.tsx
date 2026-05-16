"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bell,
  ChevronDown,
  Home,
  LogOut,
  Shield,
  User as UserIcon,
  Loader2,
} from "lucide-react";
import { formatDate } from "../../utils";
import { User } from "../../types";
import { NotificationDropdown } from "../ui/NotificationDropdown";
import { createClient } from "../../lib/supabase/client";

interface TopBarProps {
  user: User;
}

export function TopBar({ user }: TopBarProps) {
  const [showNotif, setShowNotif] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const today = formatDate(new Date().toISOString());

  const isAdmin = user.role === "admin" || user.role === "ketua_rw";

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-100 px-3 sm:px-4 lg:px-6 xl:px-8 py-2.5 sm:py-3">
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Brand — mobile only */}
        <div className="flex-1 lg:hidden min-w-0">
          <p className="font-display font-bold text-slate-900 text-sm sm:text-base leading-none truncate">
            RWConnect
          </p>
          <p className="text-xs text-slate-400 mt-0.5 hidden sm:block">
            {today}
          </p>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 ml-auto">
          {/* Date — desktop only */}
          <div className="hidden lg:block mr-2">
            <p className="text-xs text-slate-400 text-right">{today}</p>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              title="Notifikasi"
              onClick={() => {
                setShowNotif(!showNotif);
                setShowUserMenu(false);
              }}
              className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center transition-colors">
              <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500 ring-1 ring-white" />
            </button>
            {showNotif && (
              <NotificationDropdown onClose={() => setShowNotif(false)} />
            )}
          </div>

          {/* Avatar + User Dropdown */}
          <div className="relative" ref={userMenuRef}>
            <button
              title="Menu pengguna"
              onClick={() => {
                setShowUserMenu(!showUserMenu);
                setShowNotif(false);
              }}
              className="flex items-center gap-1 sm:gap-1.5 pl-1 pr-1.5 sm:pr-2 py-1 rounded-xl hover:bg-slate-100 transition-colors group">
              {/* Avatar */}
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xs shadow-sm shadow-blue-200 flex-shrink-0">
                {user.full_name?.[0]?.toUpperCase() ?? "W"}
              </div>
              {/* Name — md+ only */}
              <span className="hidden md:block text-xs sm:text-sm font-medium text-slate-700 group-hover:text-slate-900 max-w-[80px] lg:max-w-[120px] truncate">
                {user.full_name}
              </span>
              <ChevronDown
                className={`w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400 group-hover:text-slate-600 transition-transform duration-200 ${
                  showUserMenu ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-52 sm:w-56 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50">
                {/* User info */}
                <div className="px-3 sm:px-4 py-3 bg-slate-50">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center text-blue-700 font-bold text-sm flex-shrink-0">
                      {user.full_name?.[0]?.toUpperCase() ?? "W"}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-xs sm:text-sm text-slate-900 truncate">
                        {user.full_name}
                      </p>
                      <div className="flex items-center gap-1 mt-0.5">
                        {isAdmin && (
                          <Shield className="w-3 h-3 text-blue-600 flex-shrink-0" />
                        )}
                        <span className="text-xs text-slate-500 capitalize truncate">
                          {user.role?.replace("_", " ") ?? "Warga"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="px-2 sm:px-3 pt-2 pb-1">
                  <p className="px-2 mb-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    Navigasi
                  </p>
                  <Link
                    href="/"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2 sm:gap-2.5 px-2 py-2 rounded-lg text-xs sm:text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors">
                    <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
                    Beranda
                  </Link>
                  <Link
                    href="/dashboard/profile"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2 sm:gap-2.5 px-2 py-2 rounded-lg text-xs sm:text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors">
                    <UserIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
                    Profil Saya
                  </Link>
                </div>

                <div className="border-t border-slate-100 mx-2 sm:mx-3" />

                {/* Account */}
                <div className="px-2 sm:px-3 pt-1 pb-2">
                  <p className="px-2 mb-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    Akun
                  </p>
                  <button
                    onClick={handleLogout}
                    disabled={loggingOut}
                    className="w-full flex items-center gap-2 sm:gap-2.5 px-2 py-2 rounded-lg text-xs sm:text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    {loggingOut ? (
                      <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" />
                    ) : (
                      <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    )}
                    {loggingOut ? "Sedang keluar..." : "Keluar"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
