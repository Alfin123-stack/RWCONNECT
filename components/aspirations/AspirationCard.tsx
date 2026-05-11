"use client";

import {
  EyeOff,
  Trash2,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  Construction,
  Lock,
  Handshake,
  ClipboardList,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import {
  getStatusColor,
  getStatusLabel,
  formatRelativeTime,
} from "../../utils";
import { ASPIRATION_CATEGORIES } from "../../constants";
import { AdminResponseForm } from "./AdminResponseForm";
import { VoteButton } from "./VoteButton";
import type { Aspiration, AspirationStatus } from "../../types";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  infrastruktur: Construction,
  keamanan: Lock,
  kebersihan: Trash2,
  sosial: Handshake,
  administrasi: ClipboardList,
  lainnya: MapPin,
};

const STATUS_ICONS: Record<AspirationStatus, LucideIcon> = {
  baru: Clock,
  diproses: Loader2,
  selesai: CheckCircle2,
  ditolak: XCircle,
};

interface AspirationCardProps {
  asp: Aspiration;
  index: number;
  isAdmin: boolean;
  isStatusPending: boolean;
  voted: boolean;
  confirmId: string | null;
  onToggleVote: (id: string) => void;
  onStatusChange: (id: string, status: AspirationStatus) => void;
  onAskConfirm: (id: string) => void;
  onCancelConfirm: () => void;
  onDelete: (id: string) => void;
}

export function AspirationCard({
  asp,
  index,
  isAdmin,
  isStatusPending,
  voted,
  confirmId,
  onToggleVote,
  onStatusChange,
  onAskConfirm,
  onCancelConfirm,
  onDelete,
}: AspirationCardProps) {
  const isOptimistic = asp.id.startsWith("temp-");
  const isConfirming = confirmId === asp.id;

  const cat = ASPIRATION_CATEGORIES.find((c) => c.value === asp.category);
  const CategoryIcon = CATEGORY_ICONS[asp.category] ?? null;
  const StatusIcon = STATUS_ICONS[asp.status] ?? Clock;

  return (
    <div
      className={`card p-5 animate-slide-up hover:shadow-card-hover transition-all duration-300 ${
        isOptimistic ? "opacity-60 pointer-events-none" : "opacity-100"
      }`}
      style={{ animationDelay: `${index * 50}ms` }}>
      <div className="flex items-start gap-4">
        {/* Ikon kategori */}
        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0">
          {CategoryIcon ? (
            <CategoryIcon className="w-5 h-5 text-slate-500" />
          ) : (
            <span className="text-slate-400 text-base">—</span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          {/* Header: badges + admin controls */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="min-w-0">
              <Link href={`/dashboard/aspirations/${asp.id}`}>
                <h3 className="font-display font-bold text-slate-900 text-sm leading-snug hover:text-blue-600 transition-colors">
                  {asp.title}
                </h3>
              </Link>

              <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                <span
                  className={`badge text-xs inline-flex items-center ${getStatusColor(asp.status)}`}>
                  <StatusIcon
                    className={`w-2.5 h-2.5 mr-1 ${asp.status === "diproses" ? "animate-spin" : ""}`}
                  />
                  {getStatusLabel(asp.status)}
                </span>
                <span className="badge bg-slate-50 text-slate-600 border-slate-100 text-xs inline-flex items-center gap-1">
                  {CategoryIcon && <CategoryIcon className="w-2.5 h-2.5" />}
                  {cat?.label ?? "Lainnya"}
                </span>
                {isOptimistic && (
                  <span className="badge bg-slate-100 text-slate-500 text-xs inline-flex items-center">
                    <svg
                      className="w-2.5 h-2.5 mr-1 animate-spin"
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
                    Mengirim...
                  </span>
                )}
              </div>
            </div>

            {/* Admin: status select + delete */}
            {isAdmin && !isOptimistic && (
              <div className="flex items-center gap-2 flex-shrink-0">
                <select
                  title="status"
                  value={asp.status}
                  disabled={isStatusPending}
                  onChange={(e) =>
                    onStatusChange(asp.id, e.target.value as AspirationStatus)
                  }
                  className="text-xs border border-slate-200 rounded-lg px-2 py-1 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50">
                  {(
                    [
                      "baru",
                      "diproses",
                      "selesai",
                      "ditolak",
                    ] as AspirationStatus[]
                  ).map((s) => (
                    <option key={s} value={s}>
                      {getStatusLabel(s)}
                    </option>
                  ))}
                </select>

                {isConfirming ? (
                  <div className="flex items-center gap-2 animate-slide-up">
                    <span className="text-xs text-red-600 font-medium whitespace-nowrap">
                      Hapus aspirasi ini?
                    </span>
                    <button
                      onClick={() => onDelete(asp.id)}
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
                    onClick={() => onAskConfirm(asp.id)}
                    title="Hapus aspirasi"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Konten → link ke detail */}
          <Link
            href={`/dashboard/aspirations/${asp.id}`}
            className="block group">
            <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed group-hover:text-slate-800 transition-colors">
              {asp.content}
            </p>
          </Link>

          {/* Respon admin (untuk non-admin) */}
          {!isOptimistic && !isAdmin && asp.admin_response && (
            <div className="mt-3 p-3 rounded-xl bg-blue-50 border border-blue-100">
              <p className="text-xs font-semibold text-blue-700 mb-1">
                Respon Pengurus:
              </p>
              <p className="text-xs text-blue-600">{asp.admin_response}</p>
              {asp.admin_response_at && (
                <p className="text-[10px] text-blue-400 mt-1">
                  {new Date(asp.admin_response_at).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              )}
            </div>
          )}

          {/* Form respon admin */}
          {isAdmin && !isOptimistic && (
            <AdminResponseForm
              aspirationId={asp.id}
              currentResponse={asp.admin_response}
              currentResponseAt={asp.admin_response_at}
            />
          )}

          {/* Footer */}
          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-slate-50">
            <span className="text-xs text-slate-400 flex items-center gap-1 min-w-0 truncate">
              {asp.is_anonymous ? (
                <>
                  <EyeOff className="w-3 h-3 flex-shrink-0" />
                  <span>Anonim</span>
                </>
              ) : (
                ((asp.author as any)?.full_name ?? "Warga")
              )}
            </span>

            <span className="text-xs text-slate-400 flex-shrink-0">
              {formatRelativeTime(asp.created_at)}
            </span>

            <Link
              href={`/dashboard/aspirations/${asp.id}`}
              className="text-xs text-blue-500 hover:text-blue-700 font-medium transition-colors flex-shrink-0">
              Detail →
            </Link>

            <VoteButton
              count={asp.upvote_count}
              voted={voted}
              onToggle={() => onToggleVote(asp.id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
