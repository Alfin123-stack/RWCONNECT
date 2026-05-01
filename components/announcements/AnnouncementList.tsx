"use client";

import Link from "next/link";
import { Pin, Eye, User } from "lucide-react";
import { Announcement } from "../../types";
import {
  formatRelativeTime,
  getAnnouncementCategoryColor,
  getPriorityColor,
  truncate,
} from "../../utils";
import { Pagination } from "../ui/Pagination";

interface AnnouncementListProps {
  announcements: Announcement[];
  total: number;
  page: number;
  limit: number;
}

export function AnnouncementList({
  announcements,
  total,
  page,
  limit,
}: AnnouncementListProps) {
  if (announcements.length === 0) {
    return (
      <div className="card py-16 text-center">
        <p className="text-3xl mb-3">📢</p>
        <p className="font-semibold text-slate-700 mb-1">
          Tidak ada pengumuman ditemukan
        </p>
        <p className="text-sm text-slate-400">
          Coba ubah filter atau kata kunci pencarian
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {announcements.map((ann, i) => (
        <div
          key={ann.id}
          className="card p-5 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5 animate-slide-up cursor-pointer group"
          style={{ animationDelay: `${i * 50}ms` }}>
          {/* Priority stripe */}
          <div
            className={`absolute left-0 top-3 bottom-3 w-0.5 rounded-r-full ${getPriorityColor(ann.priority)}`}
          />

          <div className="relative">
            {/* Header */}
            <div className="flex items-start gap-3 mb-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <span
                    className={`badge ${getAnnouncementCategoryColor(ann.category)}`}>
                    {ann.category}
                  </span>
                  {ann.is_pinned && (
                    <span className="flex items-center gap-1 text-xs text-amber-600 font-semibold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
                      <Pin className="w-2.5 h-2.5" /> Disematkan
                    </span>
                  )}
                  <span
                    className={`flex items-center gap-1 text-xs font-medium`}>
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${getPriorityColor(ann.priority)}`}
                    />
                    Prioritas {ann.priority}
                  </span>
                </div>
                <h3 className="font-display font-bold text-slate-900 text-base group-hover:text-blue-700 transition-colors">
                  {ann.title}
                </h3>
              </div>
            </div>

            {/* Content */}
            <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
              {truncate(ann.content.replace(/<[^>]*>/g, ""), 180)}
            </p>

            {/* Footer */}
            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-50">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <User className="w-3 h-3" />
                <span>{(ann.author as any)?.full_name ?? "Admin"}</span>
              </div>
              <span className="text-xs text-slate-400">
                {formatRelativeTime(ann.created_at)}
              </span>
              <div className="ml-auto flex items-center gap-1 text-xs text-slate-400">
                <Eye className="w-3 h-3" />
                <span>{ann.view_count} dilihat</span>
              </div>
            </div>
          </div>
        </div>
      ))}

      <Pagination
        current={page}
        total={total}
        limit={limit}
        basePath="/dashboard/announcements"
      />
    </div>
  );
}
