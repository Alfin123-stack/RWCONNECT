import Link from "next/link";
import { Megaphone, Pin, ArrowRight } from "lucide-react";
import { Announcement } from "../../types";
import { formatRelativeTime, getAnnouncementCategoryColor, truncate } from "../../utils";
import { ROUTES } from "../../constants";

interface RecentAnnouncementsProps {
  announcements: Announcement[];
}

export function RecentAnnouncements({
  announcements,
}: RecentAnnouncementsProps) {
  return (
    <div className="card">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-50">
        <div className="flex items-center gap-2">
          <Megaphone className="w-4 h-4 text-blue-600" />
          <h2 className="font-display font-bold text-slate-900">
            Pengumuman Terbaru
          </h2>
        </div>
        <Link
          href={ROUTES.ANNOUNCEMENTS}
          className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 transition-colors">
          Lihat semua <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {announcements.length === 0 ? (
        <div className="px-5 py-12 text-center">
          <Megaphone className="w-10 h-10 text-slate-200 mx-auto mb-3" />
          <p className="text-slate-400 text-sm">Belum ada pengumuman</p>
        </div>
      ) : (
        <div className="divide-y divide-slate-50">
          {announcements.map((ann) => (
            <div
              key={ann.id}
              className="px-5 py-4 hover:bg-slate-50/50 transition-colors group cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span
                      className={`badge text-xs ${getAnnouncementCategoryColor(ann.category)}`}>
                      {ann.category}
                    </span>
                    {ann.is_pinned && (
                      <span className="flex items-center gap-1 text-xs text-amber-600 font-medium">
                        <Pin className="w-2.5 h-2.5" /> Disematkan
                      </span>
                    )}
                  </div>
                  <p className="font-semibold text-slate-900 text-sm group-hover:text-blue-700 transition-colors">
                    {ann.title}
                  </p>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                    {truncate(ann.content.replace(/<[^>]*>/g, ""), 100)}
                  </p>
                  <p className="text-xs text-slate-400 mt-1.5">
                    {formatRelativeTime(ann.created_at)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
