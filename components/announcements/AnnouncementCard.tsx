// components/announcements/AnnouncementCard.tsx
"use client";

import { Eye, Pin, Trash2, AlertTriangle, X } from "lucide-react";
import Link from "next/link";
import CategoryBadge from "./CategoryBadge";
import PriorityBadge from "./PriorityBadge";
import type { Announcement } from "../../types";

interface CardProps {
  item: Announcement;
  isAdmin: boolean;
  confirmId: string | null;
  deletingId: string | null;
  onAskConfirm: (id: string) => void;
  onCancelConfirm: () => void;
  onDelete: (id: string) => void;
}

export default function AnnouncementCard({
  item,
  isAdmin,
  confirmId,
  deletingId,
  onAskConfirm,
  onCancelConfirm,
  onDelete,
}: CardProps) {
  const isConfirming = confirmId === item.id;
  const isOptimistic = item.id.startsWith("temp-");
  const isDeleting = deletingId === item.id;

  return (
    <div
      className={`
        relative card overflow-hidden
        transition-all duration-300
        rounded-2xl
        ${isDeleting || isOptimistic ? "opacity-50 pointer-events-none" : ""}
      `}>
      {/* Delete confirmation overlay */}
      {isConfirming && (
        <div
          className="
            absolute inset-0 z-10
            bg-white/95 backdrop-blur-sm
            flex flex-col items-center justify-center
            gap-4 rounded-2xl
            animate-fade-in
            p-4
          ">
          <div
            className="
              w-12 h-12 rounded-2xl
              bg-red-50
              flex items-center justify-center
            ">
            <AlertTriangle className="w-6 h-6 text-red-500" />
          </div>

          <div className="text-center">
            <p className="font-semibold text-slate-900 text-sm">
              Hapus pengumuman ini?
            </p>

            <p className="text-xs text-slate-400 mt-1">
              Tindakan ini tidak dapat dibatalkan
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-center">
            <button
              onClick={onCancelConfirm}
              className="
                inline-flex items-center gap-1.5
                px-4 py-2
                rounded-xl
                text-xs font-semibold
                bg-slate-100 text-slate-600
                hover:bg-slate-200
                transition-colors
              ">
              <X className="w-3.5 h-3.5" />
              Batal
            </button>

            <button
              onClick={() => onDelete(item.id)}
              className="
                inline-flex items-center gap-1.5
                px-4 py-2
                rounded-xl
                text-xs font-semibold
                bg-red-500 text-white
                hover:bg-red-600
                transition-colors
                shadow-sm shadow-red-200
              ">
              <Trash2 className="w-3.5 h-3.5" />
              Ya, Hapus
            </button>
          </div>
        </div>
      )}

      <div className="p-4 sm:p-5 space-y-3">
        {/* Top row */}
        <div
          className="
            flex items-start justify-between
            gap-2
          ">
          {/* Badges */}
          <div
            className="
              flex items-center gap-1.5
              flex-wrap
              min-w-0 flex-1
            ">
            {item.is_pinned && (
              <span
                className="
                  inline-flex items-center gap-1
                  px-2 py-0.5
                  rounded-full
                  text-[10px] sm:text-xs
                  font-semibold
                  bg-amber-50 text-amber-600
                  border border-amber-100
                  whitespace-nowrap
                ">
                <Pin className="w-3 h-3" />
                Disematkan
              </span>
            )}

            {isOptimistic && (
              <span
                className="
                  inline-flex items-center gap-1
                  px-2 py-0.5
                  rounded-full
                  text-[10px] sm:text-xs
                  font-medium
                  bg-slate-100 text-slate-500
                  border border-slate-200
                  whitespace-nowrap
                ">
                <svg
                  className="w-3 h-3 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />

                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Menyimpan...
              </span>
            )}

            <CategoryBadge category={item.category} />
            <PriorityBadge priority={item.priority} />
          </div>

          {/* Delete button */}
          {isAdmin && !isOptimistic && (
            <button
              onClick={() => onAskConfirm(item.id)}
              title="Hapus pengumuman"
              className="
                p-1.5
                rounded-lg
                text-slate-300
                hover:text-red-500
                hover:bg-red-50
                transition-colors
                flex-shrink-0
              ">
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Title */}
        <Link href={`/dashboard/announcements/${item.id}`}>
          <h3
            className="
              font-display font-bold
              text-slate-900
              text-sm sm:text-base
              leading-snug
              hover:text-blue-600
              transition-colors
              line-clamp-2
              break-words
            ">
            {item.title}
          </h3>
        </Link>

        {/* Content preview */}
        <Link
          href={`/dashboard/announcements/${item.id}`}
          className="block group">
          <p
            className="
              text-slate-500
              text-xs sm:text-sm
              leading-relaxed
              line-clamp-3 sm:line-clamp-2
              group-hover:text-slate-700
              transition-colors
              break-words
            ">
            {item.content.replace(/<[^>]*>/g, "")}
          </p>
        </Link>

        {/* Footer */}
        <div
          className="
            flex flex-col sm:flex-row
            sm:items-center sm:justify-between
            gap-3
            pt-3
            border-t border-slate-50
          ">
          {/* Author */}
          <div className="flex items-center gap-2 min-w-0">
            {item.author?.avatar_url ? (
              <img
                src={item.author.avatar_url}
                alt={item.author.full_name ?? ""}
                className="
                  w-6 h-6
                  rounded-full
                  object-cover
                  ring-1 ring-slate-200
                  flex-shrink-0
                "
              />
            ) : (
              <div
                className="
                  w-6 h-6
                  rounded-full
                  bg-gradient-to-br
                  from-blue-400 to-blue-600
                  flex items-center justify-center
                  text-[10px]
                  font-bold text-white
                  flex-shrink-0
                ">
                {(item.author?.full_name ?? "?")[0].toUpperCase()}
              </div>
            )}

            <span
              className="
                text-xs text-slate-500
                font-medium
                truncate
              ">
              {item.author?.full_name ?? "Anonim"}
            </span>
          </div>

          {/* Meta */}
          <div
            className="
              flex flex-wrap items-center
              gap-x-3 gap-y-1
              text-[11px] sm:text-xs
              text-slate-400
            ">
            <span className="flex items-center gap-1 whitespace-nowrap">
              <Eye className="w-3 h-3" />
              {item.view_count ?? 0}
            </span>

            <span className="whitespace-nowrap">
              {new Date(item.created_at).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>

            <Link
              href={`/dashboard/announcements/${item.id}`}
              className="
                text-blue-500
                hover:text-blue-700
                font-semibold
                transition-colors
                whitespace-nowrap
              ">
              Baca →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
