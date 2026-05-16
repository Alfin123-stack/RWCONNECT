"use client";

import { useState } from "react";
import { AlertCircle } from "lucide-react";

import { useToast } from "../../hooks/useToast";
import { deleteAnnouncement } from "../../actions/announcements";
import { useAnnouncements } from "../../contexts/AnnouncementContext";

import PaginationInfo from "./PaginationInfo";
import AnnouncementCard from "./AnnouncementCard";

interface AnnouncementListProps {
  total: number;
  page: number;
  limit: number;
  isAdmin?: boolean;
}

export function AnnouncementList({
  total,
  page,
  limit,
  isAdmin = false,
}: AnnouncementListProps) {
  const { showToast } = useToast();

  const { items, optimisticDelete, startTransition } = useAnnouncements();

  const [confirmId, setConfirmId] = useState<string | null>(null);

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setConfirmId(null);

    // dim hanya card yang dihapus
    setDeletingId(id);

    startTransition(async () => {
      // optimistic UI
      optimisticDelete(id);

      const result = await deleteAnnouncement(id);

      setDeletingId(null);

      if (!result.success) {
        showToast(
          "error",
          "Gagal menghapus",
          result.error ?? "Terjadi kesalahan saat menghapus pengumuman.",
        );
      } else {
        showToast("success", "Dihapus", "Pengumuman berhasil dihapus.");
      }
    });
  };

  // Empty state
  if (items.length === 0) {
    return (
      <div
        className="
          card
          p-6 sm:p-10
          text-center
          space-y-3
          rounded-2xl
        ">
        <div
          className="
            w-14 h-14
            mx-auto
            rounded-2xl
            bg-slate-50
            flex items-center justify-center
          ">
          <AlertCircle className="w-7 h-7 text-slate-300" />
        </div>

        <div className="space-y-1">
          <p
            className="
              text-slate-500
              font-semibold
              text-sm sm:text-base
            ">
            Belum ada pengumuman
          </p>

          <p
            className="
              text-slate-400
              text-xs sm:text-sm
              leading-relaxed
              max-w-md
              mx-auto
            ">
            Pengumuman yang diterbitkan akan muncul di sini.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        space-y-3 sm:space-y-4
        w-full
      ">
      {items.map((item) => (
        <AnnouncementCard
          key={item.id}
          item={item}
          isAdmin={isAdmin}
          confirmId={confirmId}
          deletingId={deletingId}
          onAskConfirm={setConfirmId}
          onCancelConfirm={() => setConfirmId(null)}
          onDelete={handleDelete}
        />
      ))}

      {total > limit && (
        <div className="pt-1 sm:pt-2">
          <PaginationInfo total={total} page={page} limit={limit} />
        </div>
      )}
    </div>
  );
}
