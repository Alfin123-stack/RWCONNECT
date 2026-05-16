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

  // Sync text ketika response berubah
  useEffect(() => {
    setText(currentResponse ?? "");
  }, [currentResponse]);

  // Auto focus textarea
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
      // rollback
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
    <div className="mt-3 w-full min-w-0">
      {/* ================= RESPONSE VIEW ================= */}
      {hasResponse && !isEditing && (
        <div
          className="
            w-full min-w-0
            rounded-2xl
            border border-blue-100
            bg-blue-50
            p-3 sm:p-4
            shadow-sm
          ">
          {/* Header */}
          <div
            className="
              flex flex-col gap-2
              xs:flex-row xs:items-start xs:justify-between
            ">
            <div className="flex items-center gap-1.5 min-w-0">
              <MessageSquareReply className="w-3.5 h-3.5 shrink-0 text-blue-700" />

              <p
                className="
                  text-[11px] sm:text-xs
                  font-semibold
                  text-blue-700
                  truncate
                ">
                Respon Pengurus
              </p>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={handleOpen}
                title="Edit respon"
                className="
                  flex items-center justify-center
                  h-8 w-8
                  rounded-lg
                  text-blue-500
                  hover:text-blue-700
                  hover:bg-blue-100
                  active:scale-95
                  transition-all
                ">
                <Pencil className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleDelete}
                disabled={isDeleting}
                title="Hapus respon"
                className="
                  flex items-center justify-center
                  h-8 w-8
                  rounded-lg
                  text-blue-500
                  hover:text-red-500
                  hover:bg-red-50
                  disabled:opacity-50
                  active:scale-95
                  transition-all
                ">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="mt-2">
            <p
              className="
                break-words
                whitespace-pre-wrap
                text-[11px] sm:text-xs
                leading-relaxed
                text-blue-800
              ">
              {currentResponse}
            </p>

            {currentResponseAt && (
              <p
                className="
                  mt-2
                  text-[10px]
                  text-blue-500
                ">
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
        </div>
      )}

      {/* ================= OPEN BUTTON ================= */}
      {!hasResponse && !isEditing && (
        <button
          onClick={handleOpen}
          className="
            inline-flex items-center gap-1.5
            rounded-xl
            px-3 py-2
            text-[11px] sm:text-xs
            font-medium
            text-blue-600
            hover:bg-blue-50
            hover:text-blue-700
            active:scale-[0.98]
            transition-all
          ">
          <MessageSquareReply className="w-3.5 h-3.5 shrink-0" />

          <span className="truncate">Balas aspirasi ini</span>
        </button>
      )}

      {/* ================= FORM ================= */}
      {isEditing && (
        <form
          onSubmit={handleSubmit}
          className="
            w-full min-w-0
            overflow-hidden
            rounded-2xl
            border border-blue-200
            bg-blue-50
            shadow-sm
            animate-slide-up
          ">
          {/* Header */}
          <div
            className="
              flex items-start justify-between gap-2
              px-3 sm:px-4
              pt-3
              pb-2
            ">
            <div className="flex items-center gap-1.5 min-w-0">
              <MessageSquareReply className="w-3.5 h-3.5 shrink-0 text-blue-700" />

              <p
                className="
                  text-[11px] sm:text-xs
                  font-semibold
                  text-blue-700
                  break-words
                ">
                {hasResponse ? "Edit Respon Pengurus" : "Tulis Respon Pengurus"}
              </p>
            </div>

            <button
              type="button"
              title="Close"
              onClick={handleClose}
              className="
                flex items-center justify-center
                h-8 w-8
                shrink-0
                rounded-lg
                text-blue-400
                hover:text-blue-700
                hover:bg-blue-100
                active:scale-95
                transition-all
              ">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Textarea */}
          <div className="px-3 sm:px-4 pb-2">
            <textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => {
                setText(e.target.value);

                if (error) setError(null);
              }}
              rows={4}
              maxLength={1000}
              placeholder="Tulis respon atau tindak lanjut untuk warga..."
              className={`
                w-full min-w-0
                resize-none
                rounded-xl
                border
                bg-white
                px-3 py-2.5
                text-[12px] sm:text-xs
                leading-relaxed
                text-slate-700
                placeholder:text-slate-400
                outline-none
                transition-all
                focus:ring-2

                ${
                  error
                    ? "border-red-300 focus:ring-red-200"
                    : "border-blue-200 focus:ring-blue-200"
                }
              `}
            />

            {/* Footer info */}
            <div
              className="
                mt-1.5
                flex flex-col gap-1
                sm:flex-row sm:items-center sm:justify-between
              ">
              <div className="min-h-[16px]">
                {error && (
                  <p
                    className="
                      flex items-start gap-1
                      text-[10px]
                      leading-relaxed
                      text-red-500
                      break-words
                    ">
                    <span aria-hidden>⚠</span>
                    <span>{error}</span>
                  </p>
                )}
              </div>

              <span
                className={`
                  text-[10px]
                  sm:ml-auto
                  ${charLeft < 100 ? "text-amber-500" : "text-slate-400"}
                `}>
                {charLeft} karakter tersisa
              </span>
            </div>
          </div>

          {/* Actions */}
          <div
            className="
              flex flex-col-reverse gap-2
              border-t border-blue-100
              px-3 sm:px-4
              py-3

              xs:flex-row
              xs:items-center
              xs:justify-end
            ">
            <button
              type="button"
              onClick={handleClose}
              className="
                w-full xs:w-auto
                rounded-xl
                border border-slate-200
                bg-white
                px-4 py-2
                text-[11px] sm:text-xs
                font-semibold
                text-slate-600
                hover:bg-slate-50
                active:scale-[0.98]
                transition-all
              ">
              Batal
            </button>

            <button
              type="submit"
              disabled={isPending || !text.trim()}
              className="
                flex w-full xs:w-auto
                items-center justify-center gap-1.5
                rounded-xl
                bg-blue-600
                px-4 py-2
                text-[11px] sm:text-xs
                font-semibold
                text-white
                hover:bg-blue-700
                disabled:cursor-not-allowed
                disabled:opacity-50
                active:scale-[0.98]
                transition-all
              ">
              <Send className="w-3.5 h-3.5 shrink-0" />

              <span className="truncate">
                {isPending
                  ? "Menyimpan..."
                  : hasResponse
                    ? "Perbarui Respon"
                    : "Kirim Respon"}
              </span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
