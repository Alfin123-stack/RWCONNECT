"use client";

import { useState, useTransition } from "react";
import { Plus, X, EyeOff } from "lucide-react";
import { useToast } from "../../hooks/useToast";
import { createAspiration } from "../../actions/aspirations";
import { ASPIRATION_CATEGORIES } from "../../constants";
import type { CreateAspirationPayload } from "../../types";

const EMPTY_FORM: CreateAspirationPayload = {
  title: "",
  content: "",
  category: "lainnya",
  is_anonymous: false,
};

export function AspirationFormModal() {
  const { showToast } = useToast();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<CreateAspirationPayload>(EMPTY_FORM);
  const [isPending, startTransition] = useTransition();

  const handleClose = () => {
    if (isPending) return;
    setOpen(false);
    setForm(EMPTY_FORM);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title.trim() || !form.content.trim()) {
      showToast(
        "warning",
        "Form tidak lengkap",
        "Judul dan isi aspirasi wajib diisi.",
      );
      return;
    }

    startTransition(async () => {
      const result = await createAspiration(form);

      if (!result.success) {
        showToast(
          "error",
          "Gagal mengirim",
          result.error ?? "Terjadi kesalahan. Silakan coba lagi.",
        );
        return;
      }

      showToast(
        "success",
        "Aspirasi terkirim!",
        "Aspirasi kamu sudah diterima dan akan segera ditindaklanjuti.",
      );
      handleClose();
    });
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="btn-primary">
        <Plus className="w-4 h-4" /> Kirim Aspirasi
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-slide-up">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div>
                <h2 className="font-display font-bold text-slate-900 text-lg">
                  Kirim Aspirasi / Laporan
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Sampaikan aspirasi atau laporan kamu kepada pengurus RW
                </p>
              </div>
              <button
                title="close"
                onClick={handleClose}
                disabled={isPending}
                className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-50">
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="label">Judul *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, title: e.target.value }))
                  }
                  className="input"
                  placeholder="Singkat dan jelas..."
                  disabled={isPending}
                />
              </div>

              <div>
                <label className="label">Kategori</label>
                <div className="grid grid-cols-3 gap-2">
                  {ASPIRATION_CATEGORIES.map((cat) => (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() =>
                        setForm((p) => ({
                          ...p,
                          category:
                            cat.value as CreateAspirationPayload["category"],
                        }))
                      }
                      disabled={isPending}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                        form.category === cat.value
                          ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                          : "bg-slate-50 text-slate-600 border-slate-200 hover:border-blue-300"
                      }`}>
                      <span>{cat.icon}</span>
                      <span>{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="label">Isi Aspirasi / Laporan *</label>
                <textarea
                  value={form.content}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, content: e.target.value }))
                  }
                  className="input resize-none"
                  rows={5}
                  placeholder="Jelaskan aspirasi atau laporan kamu secara detail..."
                  disabled={isPending}
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.is_anonymous}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, is_anonymous: e.target.checked }))
                    }
                    className="w-4 h-4 rounded accent-blue-600"
                    disabled={isPending}
                  />
                  <div>
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                      <EyeOff className="w-3.5 h-3.5" />
                      Kirim secara anonim
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Identitasmu tidak akan ditampilkan kepada warga lain
                    </p>
                  </div>
                </label>
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleClose}
                  className="btn-secondary flex-1"
                  disabled={isPending}>
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn-primary flex-1 justify-center"
                  disabled={isPending}>
                  {isPending ? (
                    <>
                      <svg
                        className="w-4 h-4 animate-spin"
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
                    </>
                  ) : (
                    "Kirim Aspirasi"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
