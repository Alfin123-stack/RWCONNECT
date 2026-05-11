"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquareReply, Send, Pencil, Trash2, X } from "lucide-react";
import { useToast } from "../../hooks/useToast";
import {
  respondAspiration,
  deleteAdminResponse,
} from "../../actions/aspirations";
import { useAspirations } from "../../contexts/AspirationContext";

interface AdminResponseFormProps {
  aspirationId: string;
  currentResponse?: string | null;
  currentResponseAt?: string | null;
}

export function AdminResponseForm({
  aspirationId,
  currentResponse,
  currentResponseAt,
}: AdminResponseFormProps) {
  const { showToast } = useToast();
  const { optimisticUpdateResponse } = useAspirations();

  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState(currentResponse ?? "");
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const hasResponse = !!currentResponse;
  const charLeft = 1000 - text.length;
  const isEditing = isOpen;

  // Sync text saat currentResponse berubah (setelah revalidate)
  useEffect(() => {
    setText(currentResponse ?? "");
  }, [currentResponse]);

  // Auto-focus textarea saat form terbuka
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => textareaRef.current?.focus(), 80);
    }
  }, [isOpen]);

  const handleOpen = () => {
    setText(currentResponse ?? "");
    setError(null);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!text.trim()) {
      setError("Respon tidak boleh kosong");
      return;
    }
    if (text.trim().length > 1000) {
      setError("Respon maksimal 1000 karakter");
      return;
    }

    setIsPending(true);
    setError(null);

    // Optimistic update
    optimisticUpdateResponse?.(aspirationId, text.trim());
    handleClose();

    const result = await respondAspiration(aspirationId, text.trim());

    setIsPending(false);

    if (!result.success) {
      // Rollback
      optimisticUpdateResponse?.(aspirationId, currentResponse ?? null);
      setError(
        result.error ??
          result.fieldErrors?.admin_response ??
          "Gagal menyimpan respon.",
      );
      setIsOpen(true);
      showToast(
        "error",
        "Gagal",
        result.error ?? "Tidak bisa menyimpan respon saat ini.",
      );
    } else {
      showToast(
        "success",
        "Respon disimpan",
        "Respon berhasil dikirim ke warga.",
      );
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);

    optimisticUpdateResponse?.(aspirationId, null);

    const result = await deleteAdminResponse(aspirationId);

    setIsDeleting(false);

    if (!result.success) {
      optimisticUpdateResponse?.(aspirationId, currentResponse ?? null);
      showToast("error", "Gagal", "Tidak bisa menghapus respon saat ini.");
    } else {
      setText("");
      showToast("success", "Respon dihapus", "Respon berhasil dihapus.");
    }
  };

  return (
    <div className="mt-3">
      {/* Tampilan respon yang sudah ada */}
      {hasResponse && !isEditing && (
        <div className="p-3 rounded-xl bg-blue-50 border border-blue-100">
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-xs font-semibold text-blue-700 flex items-center gap-1.5">
              <MessageSquareReply className="w-3 h-3" />
              Respon Pengurus:
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={handleOpen}
                title="Edit respon"
                className="p-1 rounded-lg text-blue-400 hover:text-blue-600 hover:bg-blue-100 transition-colors">
                <Pencil className="w-3 h-3" />
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                title="Hapus respon"
                className="p-1 rounded-lg text-blue-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50">
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>
          <p className="text-xs text-blue-700 leading-relaxed">
            {currentResponse}
          </p>
          {currentResponseAt && (
            <p className="text-[10px] text-blue-400 mt-1.5">
              {new Date(currentResponseAt).toLocaleDateString("id-ID", {
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

      {/* Tombol buka form jika belum ada respon */}
      {!hasResponse && !isEditing && (
        <button
          onClick={handleOpen}
          className="flex items-center gap-1.5 text-xs text-blue-500 hover:text-blue-700
                     font-medium transition-colors px-2 py-1 rounded-lg hover:bg-blue-50">
          <MessageSquareReply className="w-3.5 h-3.5" />
          Balas aspirasi ini
        </button>
      )}

      {/* Form respon */}
      {isEditing && (
        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-blue-200 bg-blue-50 overflow-hidden animate-slide-up">
          <div className="flex items-center justify-between px-3 pt-3 pb-2">
            <p className="text-xs font-semibold text-blue-700 flex items-center gap-1.5">
              <MessageSquareReply className="w-3.5 h-3.5" />
              {hasResponse ? "Edit Respon Pengurus" : "Tulis Respon Pengurus"}
            </p>
            <button
              title="close"
              type="button"
              onClick={handleClose}
              className="p-1 rounded-lg text-blue-400 hover:text-blue-600 hover:bg-blue-100 transition-colors">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="px-3 pb-2">
            <textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                if (error) setError(null);
              }}
              rows={3}
              maxLength={1000}
              placeholder="Tulis respon atau tindak lanjut untuk warga..."
              className={`w-full text-xs rounded-lg border px-3 py-2 resize-none
                         bg-white text-slate-700 placeholder:text-slate-400
                         focus:outline-none focus:ring-2 transition-all
                         ${
                           error
                             ? "border-red-300 focus:ring-red-200"
                             : "border-blue-200 focus:ring-blue-200"
                         }`}
            />
            <div className="flex items-center justify-between mt-1">
              {error ? (
                <p className="text-[10px] text-red-500 flex items-center gap-1">
                  <span aria-hidden>⚠</span> {error}
                </p>
              ) : (
                <span />
              )}
              <span
                className={`text-[10px] ml-auto ${charLeft < 100 ? "text-amber-500" : "text-slate-400"}`}>
                {charLeft} karakter tersisa
              </span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 px-3 pb-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg
                         bg-white text-slate-600 border border-slate-200
                         hover:bg-slate-50 transition-colors">
              Batal
            </button>
            <button
              type="submit"
              disabled={isPending || !text.trim()}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold
                         rounded-lg bg-blue-600 text-white hover:bg-blue-700
                         disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              <Send className="w-3 h-3" />
              {isPending
                ? "Menyimpan..."
                : hasResponse
                  ? "Perbarui Respon"
                  : "Kirim Respon"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
