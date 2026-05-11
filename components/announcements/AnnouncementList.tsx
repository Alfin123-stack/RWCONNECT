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
    setDeletingId(id); // dim hanya card yang sedang dihapus

    startTransition(async () => {
      // UI langsung berubah — server action jalan di background
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

  if (items.length === 0) {
    return (
      <div className="card p-10 text-center space-y-3">
        <AlertCircle className="w-10 h-10 text-slate-300 mx-auto" />
        <p className="text-slate-500 font-medium">Belum ada pengumuman</p>
        <p className="text-slate-400 text-sm">
          Pengumuman yang diterbitkan akan muncul di sini.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
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
        <PaginationInfo total={total} page={page} limit={limit} />
      )}
    </div>
  );
}
