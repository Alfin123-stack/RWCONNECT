"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  LayoutDashboard,
  Megaphone,
  Calendar,
  MessageSquarePlus,
  LogOut,
  X,
  Menu,
  ChevronRight,
  Shield,
  Users,
} from "lucide-react";
import { User } from "../../types";
import { ROUTES } from "../../constants";
import { createClient } from "../../lib/supabase/client";
import { cn } from "../../utils";

interface SidebarProps {
  user: User;
}

const navItems = [
  {
    href: ROUTES.DASHBOARD,
    icon: LayoutDashboard,
    label: "Dashboard",
    exact: true,
  },
  { href: ROUTES.ANNOUNCEMENTS, icon: Megaphone, label: "Pengumuman" },
  { href: ROUTES.CALENDAR, icon: Calendar, label: "Kalender Kegiatan" },
  {
    href: ROUTES.ASPIRATIONS,
    icon: MessageSquarePlus,
    label: "Aspirasi & Laporan",
  },
];

const adminItems = [
  { href: "/dashboard/admin/users", icon: Users, label: "Kelola Warga" },
];

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const isActive = (href: string, exact = false) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const isAdmin = user.role === "admin" || user.role === "ketua_rw";

  const NavContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-md shadow-blue-200 flex-shrink-0">
            <span className="text-white font-bold text-xs">RW</span>
          </div>
          <div>
            <span className="font-display font-bold text-slate-900 text-lg leading-none">
              RWConnect
            </span>
            <p className="text-xs text-slate-400 mt-0.5">
              Platform Warga Digital
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto scrollbar-thin">
        <p className="px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Menu Utama
        </p>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={cn(
              isActive(item.href, item.exact) ? "nav-item-active" : "nav-item",
            )}>
            <item.icon className="w-4 h-4 flex-shrink-0" />
            <span className="flex-1">{item.label}</span>
            {isActive(item.href, item.exact) && (
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            )}
          </Link>
        ))}

        {isAdmin && (
          <>
            <p className="px-3 mb-2 mt-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Admin
            </p>
            {adminItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  isActive(item.href) ? "nav-item-active" : "nav-item",
                )}>
                <item.icon className="w-4 h-4 flex-shrink-0" />
                <span className="flex-1">{item.label}</span>
              </Link>
            ))}
          </>
        )}
      </nav>

      {/* User Profile */}
      <div className="p-3 border-t border-slate-100">
        <Link
          href="profile"
          onClick={() => setOpen(false)}
          className="block mb-2">
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center text-blue-700 font-bold text-sm flex-shrink-0">
              {user.full_name?.[0]?.toUpperCase() ?? "W"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-slate-900 truncate">
                {user.full_name}
              </p>
              <div className="flex items-center gap-1 mt-0.5">
                {isAdmin && <Shield className="w-3 h-3 text-blue-600" />}
                <p className="text-xs text-slate-500 capitalize">
                  {user.role?.replace("_", " ") ?? "Warga"}
                </p>
              </div>
            </div>
          </div>
        </Link>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 text-sm font-medium">
          <LogOut className="w-4 h-4" />
          {loggingOut ? "Keluar..." : "Keluar"}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-100 shadow-nav z-30">
        <NavContent />
      </aside>

      {/* Mobile Toggle */}
      <button
        title="close"
        onClick={() => setOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 w-12 h-12 rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-200 flex items-center justify-center">
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile Overlay */}
      {open && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setOpen(false)}
          />
          <aside className="lg:hidden fixed inset-y-0 left-0 w-72 bg-white z-50 shadow-2xl flex flex-col animate-slide-in">
            <button
              title="open"
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-slate-100 transition-colors">
              <X className="w-4 h-4 text-slate-500" />
            </button>
            <NavContent />
          </aside>
        </>
      )}
    </>
  );
}
