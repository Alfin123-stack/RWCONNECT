"use client";

import { useState, useEffect, useRef } from "react";
import {
  Plus,
  X,
  EyeOff,
  Send,
  AlertTriangle,
  Lock,
  Construction,
  Trash2,
  Handshake,
  ClipboardList,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "../../hooks/useToast";
import { createAspiration } from "../../actions/aspirations";
import { ASPIRATION_CATEGORIES } from "../../constants";
import { useAspirations } from "../../contexts/AspirationContext";
import type { Aspiration, CreateAspirationPayload } from "../../types";

// ── Icon mapping lokal ─────────────────────────────────────────
// Disimpan di sini (Client Component), TIDAK di constants.ts,
// agar tidak melewati Server→Client boundary dan menyebabkan error serialisasi.
const ASPIRATION_CATEGORY_ICONS: Record<string, LucideIcon> = {
  infrastruktur: Construction,
  keamanan: Lock,
  kebersihan: Trash2,
  sosial: Handshake,
  administrasi: ClipboardList,
  lainnya: MapPin,
};

const EMPTY_FORM: CreateAspirationPayload = {
  title: "",
  content: "",
  category: "lainnya",
  is_anonymous: false,
};

function validateForm(form: CreateAspirationPayload): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!form.title.trim()) errors.title = "Judul wajib diisi";
  else if (form.title.trim().length > 100) errors.title = "Maks. 100 karakter";
  if (!form.content.trim()) errors.content = "Isi aspirasi wajib diisi";
  else if (form.content.trim().length < 10) errors.content = "Min. 10 karakter";
  else if (form.content.trim().length > 2000)
    errors.content = "Maks. 2000 karakter";
  return errors;
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="flex items-center gap-1 text-xs text-red-500 mt-1.5 animate-slide-up">
      <AlertTriangle className="w-3 h-3 flex-shrink-0" />
      {msg}
    </p>
  );
}

export function AspirationFormModal() {
  const router = useRouter();
  const { showToast } = useToast();
  const { optimisticAdd, optimisticRemove, startAddTransition } =
    useAspirations();

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<CreateAspirationPayload>(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const titleRef = useRef<HTMLInputElement>(null);

  const contentLen = form.content.length;
  const contentPct = Math.min((contentLen / 2000) * 100, 100);

  useEffect(() => {
    if (open) setTimeout(() => titleRef.current?.focus(), 80);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const handleClose = () => {
    setOpen(false);
    setForm(EMPTY_FORM);
    setFieldErrors({});
  };

  const setField = <K extends keyof CreateAspirationPayload>(
    key: K,
    value: CreateAspirationPayload[K],
  ) => {
    setForm((p) => ({ ...p, [key]: value }));
    if (fieldErrors[key]) setFieldErrors((p) => ({ ...p, [key]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clientErrors = validateForm(form);
    if (Object.keys(clientErrors).length > 0) {
      setFieldErrors(clientErrors);
      return;
    }

    const tempId = `temp-${Date.now()}`;
    const snapshot = { ...form };

    handleClose();

    startAddTransition(async () => {
      const tempItem: Aspiration = {
        id: tempId,
        title: snapshot.title,
        content: snapshot.content,
        category: snapshot.category,
        status: "baru",
        author_id: "",
        author: undefined,
        is_anonymous: snapshot.is_anonymous,
        image_url: undefined,
        admin_response: undefined,
        admin_response_at: undefined,
        upvote_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      optimisticAdd(tempItem);

      const result = await createAspiration(snapshot);

      if (!result.success) {
        optimisticRemove(tempId);
        showToast(
          "error",
          "Gagal mengirim",
          result.error ?? "Terjadi kesalahan, coba lagi.",
        );
        return;
      }

      router.refresh();

      showToast(
        "success",
        "Aspirasi terkirim!",
        "Aspirasi kamu sudah diterima dan akan segera ditindaklanjuti.",
      );
    });
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="btn-primary gap-2 text-sm">
        <Plus className="w-4 h-4 flex-shrink-0" />
        <span className="hidden xs:inline">Kirim Aspirasi</span>
        <span className="xs:hidden">Kirim</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/50 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && handleClose()}>
          <div className="bg-white w-full flex flex-col rounded-t-3xl sm:rounded-2xl max-h-[92dvh] sm:max-h-[88vh] sm:max-w-lg shadow-2xl animate-slide-up">
            {/* Drag handle (mobile) */}
            <div className="flex justify-center pt-3 pb-1 sm:hidden flex-shrink-0">
              <div className="w-10 h-1 rounded-full bg-slate-200" />
            </div>

            {/* Header */}
            <div className="flex items-start justify-between px-5 sm:px-6 pt-4 sm:pt-5 pb-4 border-b border-slate-100 flex-shrink-0">
              <div>
                <h2 className="font-display font-bold text-slate-900 text-lg leading-tight">
                  Kirim Aspirasi
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Sampaikan aspirasi atau laporan kepada pengurus RW
                </p>
              </div>
              <button
                title="Tutup"
                onClick={handleClose}
                className="ml-3 p-1.5 rounded-xl hover:bg-slate-100 transition-colors flex-shrink-0 -mt-0.5">
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            {/* Body */}
            <div className="overflow-y-auto flex-1 px-5 sm:px-6 py-5">
              <form
                id="aspiration-form"
                onSubmit={handleSubmit}
                className="space-y-5">
                {/* Judul */}
                <div>
                  <label className="label mb-1.5">
                    Judul<span className="text-red-400 ml-0.5">*</span>
                  </label>
                  <input
                    ref={titleRef}
                    type="text"
                    value={form.title}
                    onChange={(e) => setField("title", e.target.value)}
                    className={`input transition-shadow ${fieldErrors.title ? "border-red-400 focus:ring-red-300" : "focus:ring-blue-200"}`}
                    placeholder="Singkat dan jelas..."
                    maxLength={100}
                  />
                  <div className="flex items-center justify-between mt-1">
                    <FieldError msg={fieldErrors.title} />
                    <span
                      className={`text-xs ml-auto ${form.title.length > 80 ? "text-amber-500" : "text-slate-300"}`}>
                      {form.title.length}/100
                    </span>
                  </div>
                </div>

                {/* Kategori */}
                <div>
                  <label className="label mb-2">Kategori</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {ASPIRATION_CATEGORIES.map((cat) => {
                      // ← icon di-resolve dari mapping lokal, bukan dari constants
                      const Icon =
                        ASPIRATION_CATEGORY_ICONS[cat.value] ?? MapPin;
                      const active = form.category === cat.value;
                      return (
                        <button
                          key={cat.value}
                          type="button"
                          onClick={() =>
                            setField(
                              "category",
                              cat.value as CreateAspirationPayload["category"],
                            )
                          }
                          className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 text-xs font-semibold transition-all ${
                            active
                              ? "bg-blue-600 text-white border-blue-600 shadow-sm scale-[1.02]"
                              : "bg-slate-50 text-slate-600 border-slate-200 hover:border-blue-300 hover:bg-blue-50"
                          }`}>
                          <Icon className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">{cat.label}</span>
                        </button>
                      );
                    })}
                  </div>
                  <FieldError msg={fieldErrors.category} />
                </div>

                {/* Konten */}
                <div>
                  <label className="label mb-1.5">
                    Isi Aspirasi / Laporan
                    <span className="text-red-400 ml-0.5">*</span>
                  </label>
                  <textarea
                    value={form.content}
                    onChange={(e) => setField("content", e.target.value)}
                    className={`input resize-none transition-shadow ${fieldErrors.content ? "border-red-400 focus:ring-red-300" : "focus:ring-blue-200"}`}
                    rows={5}
                    placeholder="Jelaskan aspirasi atau laporan kamu secara detail..."
                  />
                  <div className="mt-2 space-y-1">
                    <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${contentPct > 90 ? "bg-red-400" : contentPct > 70 ? "bg-amber-400" : "bg-blue-400"}`}
                        style={{ width: `${contentPct}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <FieldError msg={fieldErrors.content} />
                      <span
                        className={`text-xs ml-auto ${contentLen > 1800 ? "text-red-500" : "text-slate-400"}`}>
                        {contentLen.toLocaleString()}/2.000
                      </span>
                    </div>
                  </div>
                </div>

                {/* Toggle anonim */}
                <button
                  type="button"
                  onClick={() => setField("is_anonymous", !form.is_anonymous)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 transition-all text-left ${
                    form.is_anonymous
                      ? "bg-violet-50 border-violet-300 text-violet-800"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}>
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${form.is_anonymous ? "bg-violet-200" : "bg-slate-200"}`}>
                    <EyeOff
                      className={`w-4 h-4 ${form.is_anonymous ? "text-violet-700" : "text-slate-500"}`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold leading-tight">
                      Kirim secara anonim
                    </p>
                    <p className="text-xs opacity-70 mt-0.5 leading-tight">
                      Identitasmu tidak akan ditampilkan ke warga lain
                    </p>
                  </div>
                  <div
                    className={`w-10 h-6 rounded-full flex-shrink-0 transition-colors relative ${form.is_anonymous ? "bg-violet-400" : "bg-slate-300"}`}>
                    <span
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${form.is_anonymous ? "left-5" : "left-1"}`}
                    />
                  </div>
                </button>

                {/* Keterangan anonim */}
                {form.is_anonymous && (
                  <div className="flex items-start gap-2.5 px-3.5 py-3 rounded-xl bg-violet-50 border border-violet-100 animate-slide-up">
                    <Lock className="w-4 h-4 text-violet-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-violet-700 leading-relaxed">
                      Pengurus RW tetap bisa melihat identitasmu untuk keperluan
                      tindak lanjut, namun tidak akan ditampilkan secara publik.
                    </p>
                  </div>
                )}
              </form>
            </div>

            {/* Footer */}
            <div className="flex gap-3 px-5 sm:px-6 py-4 border-t border-slate-100 flex-shrink-0">
              <button
                type="button"
                onClick={handleClose}
                className="btn-secondary flex-1 sm:flex-none sm:px-6">
                Batal
              </button>
              <button
                type="submit"
                form="aspiration-form"
                className="btn-primary flex-1 justify-center gap-2">
                <Send className="w-4 h-4" />
                <span>Kirim Aspirasi</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
