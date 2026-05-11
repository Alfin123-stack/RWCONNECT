"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { useToast } from "../../hooks/useToast";
import {
  upvoteAspiration,
  unvoteAspiration,
  updateAspirationStatus,
  deleteAspiration,
} from "../../actions/aspirations";
import { getStatusLabel } from "../../utils";
import { Pagination } from "../../components/ui/Pagination";
import { useAspirations } from "../../contexts/AspirationContext";
import { AspirationCard } from "./AspirationCard";
import type { AspirationStatus } from "../../types";

interface AspirationListProps {
  total: number;
  page: number;
  limit: number;
  isAdmin: boolean;
  currentUserId: string;
}

export function AspirationList({
  total,
  page,
  limit,
  isAdmin,
}: AspirationListProps) {
  const { showToast } = useToast();
  const {
    items,
    isStatusPending,
    hasVoted,
    markVoted,
    markUnvoted,
    optimisticUpvote,
    optimisticUnvote,
    optimisticUpdateStatus,
    optimisticDelete,
    startUpvoteTransition,
    startStatusTransition,
    startDeleteTransition,
  } = useAspirations();

  const [confirmId, setConfirmId] = useState<string | null>(null);

  const handleToggleVote = (id: string) => {
    const alreadyVoted = hasVoted(id);
    const asp = items.find((a) => a.id === id);

    if (alreadyVoted) {
      optimisticUnvote(id);
      markUnvoted(id);
    } else {
      optimisticUpvote(id);
      markVoted(id);
    }

    startUpvoteTransition(async () => {
      if (alreadyVoted) {
        const result = await unvoteAspiration(id, asp?.upvote_count ?? 0);
        if (!result.success) {
          optimisticUpvote(id);
          markVoted(id);
          showToast(
            "error",
            "Gagal",
            "Tidak bisa membatalkan dukungan saat ini.",
          );
        }
      } else {
        const result = await upvoteAspiration(id, asp?.upvote_count ?? 0);
        if (!result.success) {
          optimisticUnvote(id);
          markUnvoted(id);
          showToast(
            "error",
            "Gagal",
            "Tidak bisa memberikan dukungan saat ini.",
          );
        }
      }
    });
  };

  const handleStatusChange = (id: string, status: AspirationStatus) => {
    startStatusTransition(async () => {
      optimisticUpdateStatus(id, status);
      const result = await updateAspirationStatus(id, status);
      if (!result.success) {
        showToast("error", "Gagal", "Tidak bisa mengubah status saat ini.");
        return;
      }
      showToast(
        "success",
        "Status diperbarui",
        `Status berhasil diubah menjadi "${getStatusLabel(status)}".`,
      );
    });
  };

  const handleDelete = (id: string) => {
    setConfirmId(null);
    startDeleteTransition(async () => {
      optimisticDelete(id);
      const result = await deleteAspiration(id);
      if (!result.success) {
        showToast("error", "Gagal", "Tidak bisa menghapus aspirasi saat ini.");
      } else {
        showToast("success", "Dihapus", "Aspirasi berhasil dihapus.");
      }
    });
  };

  if (items.length === 0) {
    return (
      <div className="card py-16 text-center">
        <div className="flex justify-center mb-3">
          <MessageCircle className="w-10 h-10 text-slate-300" />
        </div>
        <p className="font-semibold text-slate-700 mb-1">Belum ada aspirasi</p>
        <p className="text-sm text-slate-400">
          Jadilah yang pertama menyampaikan aspirasi!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((asp, i) => (
        <AspirationCard
          key={asp.id}
          asp={asp}
          index={i}
          isAdmin={isAdmin}
          isStatusPending={isStatusPending}
          voted={hasVoted(asp.id)}
          confirmId={confirmId}
          onToggleVote={handleToggleVote}
          onStatusChange={handleStatusChange}
          onAskConfirm={setConfirmId}
          onCancelConfirm={() => setConfirmId(null)}
          onDelete={handleDelete}
        />
      ))}

      <Pagination
        current={page}
        total={total}
        limit={limit}
        basePath="/dashboard/aspirations"
      />
    </div>
  );
}
