"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Megaphone,
  Calendar,
  MessageSquarePlus,
  X,
  Menu,
  ChevronRight,
  Users,
} from "lucide-react";
import { User } from "../../types";
import { cn } from "../../utils";
import { ROUTES } from "../../constants";

interface SidebarProps {
  user: User;
}

const navItems = [
  { href: ROUTES.DASHBOARD, icon: LayoutDashboard, label: "Dashboard", exact: true },
  { href: ROUTES.ANNOUNCEMENTS, icon: Megaphone, label: "Pengumuman" },
  { href: ROUTES.CALENDAR, icon: Calendar, label: "Kalender Kegiatan" },
  { href: ROUTES.ASPIRATIONS, icon: MessageSquarePlus, label: "Aspirasi & Laporan" },
];

const adminItems = [
  { href: "/dashboard/admin/users", icon: Users, label: "Kelola Warga" },
];

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string, exact = false) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  const isAdmin = user.role === "admin" || user.role === "ketua_rw";

  const NavContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-md shadow-blue-200 flex-shrink-0">
            <span className="text-white font-bold text-xs">RW</span>
          </div>
          <div>
            <span className="font-display font-bold text-slate-900 text-base sm:text-lg leading-none">
              RWConnect
            </span>
            <p className="text-xs text-slate-400 mt-0.5">Platform Warga Digital</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 sm:px-3 py-4 space-y-0.5 overflow-y-auto">
        <p className="px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Menu Utama
        </p>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 mt-1",
              isActive(item.href, item.exact)
                ? "bg-blue-600 text-white shadow-sm shadow-blue-200"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            )}
          >
            <item.icon className="w-4 h-4 flex-shrink-0" />
            <span className="flex-1 truncate">{item.label}</span>
            {isActive(item.href, item.exact) && (
              <ChevronRight className="w-3.5 h-3.5 opacity-60 flex-shrink-0" />
            )}
          </Link>
        ))}

        {isAdmin && (
          <>
            <p className="px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mt-6">
              Admin
            </p>
            {adminItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive(item.href)
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-200"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                <span className="flex-1 truncate">{item.label}</span>
              </Link>
            ))}
          </>
        )}
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-100 shadow-sm z-30">
        <NavContent />
      </aside>

      {/* Mobile FAB toggle */}
      <button
        title="Buka menu"
        onClick={() => setOpen(true)}
        className="lg:hidden fixed bottom-5 right-5 z-40 w-12 h-12 rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-300 flex items-center justify-center active:scale-95 transition-transform"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile overlay */}
      {open && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setOpen(false)}
          />
          <aside className="lg:hidden fixed inset-y-0 left-0 w-[280px] sm:w-72 bg-white z-50 shadow-2xl flex flex-col animate-slide-in">
            <button
              title="Tutup menu"
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4 text-slate-500" />
            </button>
            <NavContent />
          </aside>
        </>
      )}
    </>
  );
}