"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { Bell, Check } from "lucide-react";
import {
  getNotifications,
  markNotificationsRead,
} from "../../actions/notifications";
import { formatRelativeTime } from "../../utils";

interface NotificationDropdownProps {
  onClose: () => void;
}

export function NotificationDropdown({ onClose }: NotificationDropdownProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  useEffect(() => {
    startTransition(async () => {
      const data = await getNotifications();
      setNotifications(data);
      setLoading(false);
    });
  }, []);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const handleMarkAllRead = () => {
    const ids = notifications.filter((n) => !n.is_read).map((n) => n.id);
    if (ids.length === 0) return;
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    startTransition(async () => {
      await markNotificationsRead(ids);
    });
  };

  return (
    <div
      ref={ref}
      // ✅ PERBAIKAN: w-80 (320px) overflow di layar 320px.
      // Gunakan clamp: ambil viewport width dikurangi margin kiri-kanan (2×0.75rem = 24px),
      // tapi tidak melebihi max-w-xs (320px) atau w-80 di layar ≥640px.
      className="absolute right-0 top-full mt-2 w-[calc(100vw-1.5rem)] max-w-xs sm:w-80 bg-white rounded-2xl shadow-xl border border-slate-100 z-50 animate-slide-up overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-3 border-b border-slate-50">
        <div className="flex items-center gap-2 min-w-0">
          <Bell className="w-4 h-4 text-slate-700 flex-shrink-0" />
          <span className="font-display font-bold text-sm text-slate-900 truncate">
            Notifikasi
          </span>
          {unreadCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold flex-shrink-0">
              {unreadCount}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            disabled={isPending}
            // ✅ PERBAIKAN: tambah flex-shrink-0 agar tombol tidak terjepit
            className="text-xs text-blue-600 font-semibold hover:text-blue-800 flex items-center gap-1 disabled:opacity-50 flex-shrink-0 ml-2">
            <Check className="w-3 h-3" />
            {/* ✅ PERBAIKAN: label diperpendek di layar sangat kecil */}
            <span className="hidden min-[360px]:inline">Tandai</span> semua
          </button>
        )}
      </div>

      {/* Body */}
      {/* ✅ PERBAIKAN: max-h sedikit dikurangi agar tidak overflow di layar pendek */}
      <div className="max-h-64 sm:max-h-72 overflow-y-auto scrollbar-thin">
        {loading ? (
          <div className="p-4 sm:p-6 space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="skeleton h-3 w-3/4" />
                <div className="skeleton h-3 w-full" />
              </div>
            ))}
          </div>
        ) : notifications.length === 0 ? (
          <div className="p-6 sm:p-8 text-center">
            <Bell className="w-8 h-8 text-slate-200 mx-auto mb-2" />
            <p className="text-sm text-slate-400">Tidak ada notifikasi</p>
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className={`px-3 sm:px-4 py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors ${
                !notif.is_read ? "bg-blue-50/30" : ""
              }`}>
              <div className="flex items-start gap-2">
                {!notif.is_read && (
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 mt-1.5" />
                )}
                <div
                  className={`min-w-0 flex-1 ${notif.is_read ? "pl-3.5" : ""}`}>
                  {/* ✅ PERBAIKAN: tambah truncate/break-words agar teks tidak overflow */}
                  <p className="text-sm font-semibold text-slate-900 break-words">
                    {notif.title}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5 break-words">
                    {notif.message}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {formatRelativeTime(notif.created_at)}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
