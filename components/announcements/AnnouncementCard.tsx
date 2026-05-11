"use client";
import { Eye, Pin, Trash2 } from "lucide-react";
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
      className={`card p-5 space-y-3 transition-all duration-300 ${
        isDeleting || isOptimistic
          ? "opacity-60 pointer-events-none"
          : "opacity-100"
      }`}>
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          {item.is_pinned && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
              <Pin className="w-3 h-3" /> Disematkan
            </span>
          )}
          {isOptimistic && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-500">
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

        {isAdmin && !isOptimistic && (
          <div className="flex items-center gap-2">
            {isConfirming ? (
              <div className="flex items-center gap-2 animate-slide-up">
                <span className="text-xs text-red-600 font-medium">
                  Hapus pengumuman ini?
                </span>
                <button
                  onClick={() => onDelete(item.id)}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors">
                  Ya, Hapus
                </button>
                <button
                  onClick={onCancelConfirm}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
                  Batal
                </button>
              </div>
            ) : (
              <button
                onClick={() => onAskConfirm(item.id)}
                title="Hapus pengumuman"
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>

      <Link href={`/dashboard/announcements/${item.id}`}>
        <h3 className="font-display font-semibold text-slate-900 text-base leading-snug hover:text-blue-600 transition-colors">
          {item.title}
        </h3>
      </Link>

      <Link
        href={`/dashboard/announcements/${item.id}`}
        className="block group">
        <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 group-hover:text-slate-800 transition-colors">
          {item.content}
        </p>
      </Link>

      <div className="flex items-center justify-between pt-1 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          {item.author?.avatar_url ? (
            <img
              src={item.author.avatar_url}
              alt={item.author.full_name ?? ""}
              className="w-6 h-6 rounded-full object-cover"
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">
              {(item.author?.full_name ?? "?")[0].toUpperCase()}
            </div>
          )}
          <span>{item.author?.full_name ?? "Anonim"}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {item.view_count ?? 0}
          </span>
          <span>
            {new Date(item.created_at).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
          <Link
            href={`/dashboard/announcements/${item.id}`}
            className="ml-1 text-blue-500 hover:text-blue-700 font-medium transition-colors">
            Selengkapnya →
          </Link>
        </div>
      </div>
    </div>
  );
}
