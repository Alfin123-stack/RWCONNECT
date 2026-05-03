"use client";

import { useTransition } from "react";
import {
  ThumbsUp,
  EyeOff,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";
import { useToast } from "../../hooks/useToast";
import {
  upvoteAspiration,
  updateAspirationStatus,
} from "../../actions/aspirations";
import {
  getStatusColor,
  getStatusLabel,
  formatRelativeTime,
} from "../../utils";
import { ASPIRATION_CATEGORIES } from "../../constants";
import { Pagination } from "../../components/ui/Pagination";
import type { Aspiration, AspirationStatus } from "../../types";

interface AspirationListProps {
  aspirations: Aspiration[];
  total: number;
  page: number;
  limit: number;
  isAdmin: boolean;
  currentUserId: string;
}

const statusIcons: Record<AspirationStatus, React.ElementType> = {
  baru: Clock,
  diproses: Loader2,
  selesai: CheckCircle2,
  ditolak: XCircle,
};

export function AspirationList({
  aspirations,
  total,
  page,
  limit,
  isAdmin,
}: AspirationListProps) {
  const { showToast } = useToast();

  // Separate transitions so upvote and status change have independent
  // pending states and don't block each other.
  const [upvotePending, startUpvote] = useTransition();
  const [statusPending, startStatusChange] = useTransition();

  const handleUpvote = (id: string, currentCount: number) => {
    startUpvote(async () => {
      const result = await upvoteAspiration(id, currentCount);
      if (!result.success) {
        showToast("error", "Gagal", "Tidak bisa memberikan dukungan saat ini.");
      }
    });
  };

  const handleStatusChange = (id: string, status: AspirationStatus) => {
    startStatusChange(async () => {
      const result = await updateAspirationStatus(id, status);
      if (!result.success) {
        showToast("error", "Gagal", "Tidak bisa mengubah status saat ini.");
        return;
      }
      showToast(
        "success",
        "Status diperbarui",
        `Status aspirasi berhasil diubah menjadi "${getStatusLabel(status)}".`,
      );
    });
  };

  if (aspirations.length === 0) {
    return (
      <div className="card py-16 text-center">
        <p className="text-3xl mb-3">💬</p>
        <p className="font-semibold text-slate-700 mb-1">Belum ada aspirasi</p>
        <p className="text-sm text-slate-400">
          Jadilah yang pertama menyampaikan aspirasi!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {aspirations.map((asp, i) => {
        const cat = ASPIRATION_CATEGORIES.find((c) => c.value === asp.category);
        const StatusIcon = statusIcons[asp.status];

        return (
          <div
            key={asp.id}
            className="card p-5 animate-slide-up hover:shadow-card-hover transition-all duration-300"
            style={{ animationDelay: `${i * 50}ms` }}>
            <div className="flex items-start gap-4">
              {/* Category icon */}
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-xl flex-shrink-0">
                {cat?.icon ?? "📌"}
              </div>

              <div className="flex-1 min-w-0">
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h3 className="font-display font-bold text-slate-900 text-sm">
                      {asp.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span
                        className={`badge text-xs ${getStatusColor(asp.status)}`}>
                        <StatusIcon className="w-2.5 h-2.5 mr-1" />
                        {getStatusLabel(asp.status)}
                      </span>
                      <span className="badge bg-slate-50 text-slate-600 border-slate-100">
                        {cat?.label ?? "Lainnya"}
                      </span>
                    </div>
                  </div>

                  {/* Admin status change */}
                  {isAdmin && (
                    <select
                      title="status"
                      value={asp.status}
                      onChange={(e) =>
                        handleStatusChange(
                          asp.id,
                          e.target.value as AspirationStatus,
                        )
                      }
                      disabled={statusPending}
                      className="text-xs border border-slate-200 rounded-lg px-2 py-1 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500 flex-shrink-0 disabled:opacity-50">
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
                  )}
                </div>

                {/* Content */}
                <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed">
                  {asp.content}
                </p>

                {/* Admin response */}
                {asp.admin_response && (
                  <div className="mt-3 p-3 rounded-xl bg-blue-50 border border-blue-100">
                    <p className="text-xs font-semibold text-blue-700 mb-1">
                      Respon Pengurus:
                    </p>
                    <p className="text-xs text-blue-600">
                      {asp.admin_response}
                    </p>
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-50">
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    {asp.is_anonymous ? (
                      <>
                        <EyeOff className="w-3 h-3" /> Anonim
                      </>
                    ) : (
                      ((asp.author as any)?.full_name ?? "Warga")
                    )}
                  </span>
                  <span className="text-xs text-slate-400">
                    {formatRelativeTime(asp.created_at)}
                  </span>
                  <button
                    onClick={() => handleUpvote(asp.id, asp.upvote_count)}
                    disabled={upvotePending}
                    className="ml-auto flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors disabled:opacity-50">
                    <ThumbsUp
                      className={`w-3.5 h-3.5 ${upvotePending ? "animate-pulse" : ""}`}
                    />
                    {asp.upvote_count} Dukung
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <Pagination
        current={page}
        total={total}
        limit={limit}
        basePath="/dashboard/aspirations"
      />
    </div>
  );
}
