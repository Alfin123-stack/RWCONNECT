"use client";

import { useState } from "react";
import { Bell, Search } from "lucide-react";
import { formatDate } from "../../utils";
import { User } from "../../types";
import { NotificationDropdown } from "../ui/NotificationDropdown";

interface TopBarProps {
  user: User;
}

export function TopBar({ user }: TopBarProps) {
  const [showNotif, setShowNotif] = useState(false);
  const today = formatDate(new Date().toISOString());

  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 lg:px-6 xl:px-8 py-3">
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="search"
              placeholder="Cari pengumuman, kegiatan..."
              className="input pl-9 py-2 bg-slate-50 border-slate-100 text-sm"
            />
          </div>
        </div>

        <div className="flex-1 md:hidden">
          <div>
            <p className="font-display font-bold text-slate-900 text-base leading-none">
              RWConnect
            </p>
            <p className="text-xs text-slate-400 mt-0.5">{today}</p>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Date (desktop) */}
          <div className="hidden md:block mr-2">
            <p className="text-xs text-slate-400 text-right">{today}</p>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotif(!showNotif)}
              className="relative w-9 h-9 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center transition-colors">
              <Bell className="w-4 h-4 text-slate-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-1 ring-white" />
            </button>
            {showNotif && (
              <NotificationDropdown onClose={() => setShowNotif(false)} />
            )}
          </div>

          {/* Avatar */}
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-sm shadow-blue-200">
            {user.full_name?.[0]?.toUpperCase() ?? "W"}
          </div>
        </div>
      </div>
    </header>
  );
}
