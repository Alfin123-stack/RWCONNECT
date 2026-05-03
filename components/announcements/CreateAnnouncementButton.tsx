"use client";

import { useState, useTransition } from "react";
import { Plus, X } from "lucide-react";
import { useToast } from "../../hooks/useToast";
import { createAnnouncement } from "../../actions/announcements";
import {
  ANNOUNCEMENT_CATEGORIES,
  ANNOUNCEMENT_PRIORITIES,
} from "../../constants";
import type { CreateAnnouncementPayload } from "../../types";

const EMPTY_FORM: CreateAnnouncementPayload = {
  title: "",
  content: "",
  category: "umum",
  priority: "rendah",
  is_pinned: false,
};

export function CreateAnnouncementButton() {
  const { showToast } = useToast();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<CreateAnnouncementPayload>(EMPTY_FORM);

  // useTransition gives us an isPending flag and keeps the UI responsive
  // while the Server Action is in-flight — no manual setLoading needed.
  const [isPending, startTransition] = useTransition();

  const handleClose = () => {
    if (isPending) return; // prevent closing mid-submit
    setOpen(false);
    setForm(EMPTY_FORM);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side guard (server also validates, this is just UX)
    if (!form.title.trim() || !form.content.trim()) {
      showToast(
        "warning",
        "Form tidak lengkap",
        "Judul dan isi pengumuman wajib diisi.",
      );
      return;
    }

    startTransition(async () => {
      const result = await createAnnouncement(form);

      if (!result.success) {
        showToast(
          "error",
          "Gagal menyimpan",
          result.error ?? "Terjadi kesalahan saat menyimpan pengumuman.",
        );
        return;
      }

      showToast(
        "success",
        "Pengumuman diterbitkan!",
        "Pengumuman berhasil dibuat dan dipublikasikan.",
      );
      handleClose();
      // No router.refresh() needed — revalidatePath inside the action
      // already invalidates the cache and Next.js re-renders the page.
    });
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="btn-primary">
        <Plus className="w-4 h-4" /> Buat Pengumuman
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-slide-up">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="font-display font-bold text-slate-900 text-lg">
                Buat Pengumuman Baru
              </h2>
              <button
                title="close"
                onClick={handleClose}
                disabled={isPending}
                className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-50">
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="label">Judul Pengumuman *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, title: e.target.value }))
                  }
                  className="input"
                  placeholder="Masukkan judul pengumuman..."
                  disabled={isPending}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Kategori</label>
                  <select
                    title="category"
                    value={form.category}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        category: e.target
                          .value as CreateAnnouncementPayload["category"],
                      }))
                    }
                    className="input"
                    disabled={isPending}>
                    {ANNOUNCEMENT_CATEGORIES.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label">Prioritas</label>
                  <select
                    title="priority"
                    value={form.priority}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        priority: e.target
                          .value as CreateAnnouncementPayload["priority"],
                      }))
                    }
                    className="input"
                    disabled={isPending}>
                    {ANNOUNCEMENT_PRIORITIES.map((p) => (
                      <option key={p.value} value={p.value}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="label">Isi Pengumuman *</label>
                <textarea
                  value={form.content}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, content: e.target.value }))
                  }
                  className="input resize-none"
                  rows={5}
                  placeholder="Tulis isi pengumuman di sini..."
                  disabled={isPending}
                />
              </div>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.is_pinned}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, is_pinned: e.target.checked }))
                    }
                    className="w-4 h-4 rounded accent-blue-600"
                    disabled={isPending}
                  />
                  <span className="text-sm font-medium text-slate-700">
                    Sematkan pengumuman ini
                  </span>
                </label>
              </div>

              <div className="flex gap-3 pt-2">
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
                      Menyimpan...
                    </>
                  ) : (
                    "Terbitkan"
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
