"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, Check, X } from "lucide-react";
import { createClient } from "../../lib/supabase/client";
import { formatRelativeTime } from "../../utils";

interface NotificationDropdownProps {
  onClose: () => void;
}

export function NotificationDropdown({ onClose }: NotificationDropdownProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  useEffect(() => {
    async function fetchNotifs() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(8);
      setNotifications(data ?? []);
      setLoading(false);
    }
    fetchNotifs();
  }, []);

  const markAllRead = async () => {
    const supabase = createClient();
    const ids = notifications.filter((n) => !n?.is_read).map((n) => n?.id);
    if (ids.length === 0) return;
    await supabase
      .from("notifications")
      .update({ is_read: true })
      .in("id", ids);
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return (
    <div
      ref={ref}
      className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 z-50 animate-slide-up overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-50">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-slate-700" />
          <span className="font-display font-bold text-sm text-slate-900">
            Notifikasi
          </span>
          {unreadCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
              {unreadCount}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="text-xs text-blue-600 font-semibold hover:text-blue-800 flex items-center gap-1">
            <Check className="w-3 h-3" /> Tandai semua
          </button>
        )}
      </div>

      <div className="max-h-72 overflow-y-auto scrollbar-thin">
        {loading ? (
          <div className="p-6 space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="skeleton h-3 w-3/4" />
                <div className="skeleton h-3 w-full" />
              </div>
            ))}
          </div>
        ) : notifications.length === 0 ? (
          <div className="p-8 text-center">
            <Bell className="w-8 h-8 text-slate-200 mx-auto mb-2" />
            <p className="text-sm text-slate-400">Tidak ada notifikasi</p>
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className={`px-4 py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors ${!notif.is_read ? "bg-blue-50/30" : ""}`}>
              <div className="flex items-start gap-2">
                {!notif.is_read && (
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 mt-1.5" />
                )}
                <div className={notif.is_read ? "pl-3.5" : ""}>
                  <p className="text-sm font-semibold text-slate-900">
                    {notif.title}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
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
