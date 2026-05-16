import Link from "next/link";
import { Megaphone, Pin, ArrowRight } from "lucide-react";
import { Announcement } from "../../types";
import {
  formatRelativeTime,
  getAnnouncementCategoryColor,
  truncate,
} from "../../utils";
import { ROUTES } from "../../constants";

interface RecentAnnouncementsProps {
  announcements: Announcement[];
}

export function RecentAnnouncements({
  announcements,
}: RecentAnnouncementsProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 sm:py-4 border-b border-slate-50">
        <div className="flex items-center gap-2">
          <Megaphone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0" />
          <h2 className="font-display font-bold text-slate-900 text-sm sm:text-base">
            Pengumuman Terbaru
          </h2>
        </div>
        <Link
          href={ROUTES.ANNOUNCEMENTS}
          className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 transition-colors flex-shrink-0">
          Lihat semua <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {announcements.length === 0 ? (
        <div className="px-4 sm:px-5 py-10 sm:py-12 text-center">
          <Megaphone className="w-8 h-8 sm:w-10 sm:h-10 text-slate-200 mx-auto mb-3" />
          <p className="text-slate-400 text-sm">Belum ada pengumuman</p>
        </div>
      ) : (
        <div className="divide-y divide-slate-50">
          {announcements.map((ann) => (
            <div
              key={ann.id}
              className="px-4 sm:px-5 py-3.5 sm:py-4 hover:bg-slate-50/50 transition-colors group cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-1.5 flex-wrap">
                    <span
                      className={`badge text-xs ${getAnnouncementCategoryColor(ann.category)}`}>
                      {ann.category}
                    </span>
                    {ann.is_pinned && (
                      <span className="flex items-center gap-1 text-xs text-amber-600 font-medium">
                        <Pin className="w-2.5 h-2.5" />
                        <span className="hidden sm:inline">Disematkan</span>
                      </span>
                    )}
                  </div>
                  <p className="font-semibold text-slate-900 text-xs sm:text-sm group-hover:text-blue-700 transition-colors line-clamp-2 sm:line-clamp-1">
                    {ann.title}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5 sm:mt-1 line-clamp-1 hidden sm:block">
                    {truncate(ann.content.replace(/<[^>]*>/g, ""), 100)}
                  </p>
                  <p className="text-xs text-slate-400 mt-1 sm:mt-1.5">
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
