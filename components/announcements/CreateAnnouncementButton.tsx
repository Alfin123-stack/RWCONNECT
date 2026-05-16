"use client";

import { useState, useEffect, useRef } from "react";
import {
  Plus,
  X,
  Pin,
  Zap,
  CalendarDays,
  HeartPulse,
  Shield,
  Users,
  Megaphone,
  TrendingUp,
  Bell,
  MessageSquareHeart,
  type LucideIcon,
} from "lucide-react";
import { useToast } from "../../hooks/useToast";
import { createAnnouncement } from "../../actions/announcements";
import {
  ANNOUNCEMENT_CATEGORIES,
  ANNOUNCEMENT_PRIORITIES,
} from "../../constants";
import { useAnnouncements } from "../../contexts/AnnouncementContext";
import type { Announcement, CreateAnnouncementPayload } from "../../types";

const ANNOUNCEMENT_CATEGORY_ICONS: Record<string, LucideIcon> = {
  penting: Zap,
  kegiatan: CalendarDays,
  kesehatan: HeartPulse,
  keamanan: Shield,
  sosial: Users,
  umum: Megaphone,
};

const ANNOUNCEMENT_PRIORITY_ICONS: Record<string, LucideIcon> = {
  tinggi: TrendingUp,
  sedang: Bell,
  rendah: MessageSquareHeart,
};

const EMPTY_FORM: CreateAnnouncementPayload = {
  title: "",
  content: "",
  category: "umum",
  priority: "rendah",
  is_pinned: false,
};

const PRIORITY_CONFIG = {
  rendah: {
    label: "Rendah",
    dot: "bg-emerald-400",
    ring: "ring-emerald-200",
    text: "text-emerald-700",
    bg: "bg-emerald-50",
  },
  sedang: {
    label: "Sedang",
    dot: "bg-amber-400",
    ring: "ring-amber-200",
    text: "text-amber-700",
    bg: "bg-amber-50",
  },
  tinggi: {
    label: "Tinggi",
    dot: "bg-red-400",
    ring: "ring-red-200",
    text: "text-red-700",
    bg: "bg-red-50",
  },
} as const;

function validateForm(form: CreateAnnouncementPayload): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!form.title.trim()) errors.title = "Judul wajib diisi";
  else if (form.title.trim().length > 150) errors.title = "Maks. 150 karakter";
  if (!form.content.trim()) errors.content = "Isi pengumuman wajib diisi";
  else if (form.content.trim().length < 10) errors.content = "Min. 10 karakter";
  else if (form.content.trim().length > 5000)
    errors.content = "Maks. 5000 karakter";
  return errors;
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="flex items-center gap-1 text-xs text-red-500 mt-1.5 animate-slide-up">
      <span aria-hidden>⚠</span> {msg}
    </p>
  );
}

export function CreateAnnouncementButton() {
  const { showToast } = useToast();
  const { optimisticAdd, startTransition } = useAnnouncements();

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<CreateAnnouncementPayload>(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const titleRef = useRef<HTMLInputElement>(null);
  const contentLen = form.content.length;
  const contentPct = Math.min((contentLen / 5000) * 100, 100);

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

  // Lock body scroll when modal open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleClose = () => {
    setOpen(false);
    setForm(EMPTY_FORM);
    setFieldErrors({});
  };

  const setField = <K extends keyof CreateAnnouncementPayload>(
    key: K,
    value: CreateAnnouncementPayload[K],
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

    const snapshot = { ...form };
    handleClose();

    startTransition(async () => {
      optimisticAdd({
        id: `temp-${Date.now()}`,
        title: snapshot.title,
        content: snapshot.content,
        category: snapshot.category,
        priority: snapshot.priority,
        is_pinned: snapshot.is_pinned ?? false,
        is_published: true,
        author_id: "",
        author: undefined,
        image_url: undefined,
        published_at: new Date().toISOString(),
        expires_at: undefined,
        view_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      const result = await createAnnouncement(snapshot);

      if (!result.success) {
        showToast(
          "error",
          "Gagal menyimpan",
          result.error ?? "Terjadi kesalahan.",
        );
        return;
      }

      showToast(
        "success",
        "Pengumuman diterbitkan!",
        "Berhasil dipublikasikan.",
      );
    });
  };

  return (
    <>
      {/* Trigger button — label shortens on very small screens */}
      <button
        onClick={() => setOpen(true)}
        className="btn-primary gap-1.5 sm:gap-2 text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2.5">
        <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
        <span className="hidden xs:inline sm:hidden">Buat</span>
        <span className="hidden sm:inline">Buat Pengumuman</span>
        <span className="xs:hidden">Buat</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/50 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && handleClose()}>
          {/*
            Mobile  → bottom sheet, slides up, rounded top corners
            sm 640px+ → centered modal, rounded all corners, max-w-lg
          */}
          <div className="bg-white w-full flex flex-col rounded-t-3xl sm:rounded-2xl max-h-[92dvh] sm:max-h-[88vh] sm:max-w-lg shadow-2xl animate-slide-up">
            {/* Drag handle — mobile only */}
            <div className="flex justify-center pt-3 pb-1 sm:hidden flex-shrink-0">
              <div className="w-10 h-1 rounded-full bg-slate-200" />
            </div>

            {/* Header */}
            <div className="flex items-start justify-between px-4 sm:px-6 pt-3 sm:pt-5 pb-3 sm:pb-4 border-b border-slate-100 flex-shrink-0">
              <div>
                <h2 className="font-display font-bold text-slate-900 text-base sm:text-lg leading-tight">
                  Buat Pengumuman
                </h2>
                <p className="text-xs text-slate-400 mt-0.5 hidden sm:block">
                  Informasi akan langsung tampil ke seluruh warga
                </p>
              </div>
              <button
                title="Tutup"
                onClick={handleClose}
                className="ml-3 p-1.5 rounded-xl hover:bg-slate-100 transition-colors flex-shrink-0">
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto flex-1 px-4 sm:px-6 py-4 sm:py-5">
              <form
                id="announcement-form"
                onSubmit={handleSubmit}
                className="space-y-4 sm:space-y-5">
                {/* Judul */}
                <div>
                  <label className="label mb-1.5 text-xs sm:text-sm">
                    Judul Pengumuman
                    <span className="text-red-400 ml-0.5">*</span>
                  </label>
                  <input
                    ref={titleRef}
                    type="text"
                    value={form.title}
                    onChange={(e) => setField("title", e.target.value)}
                    className={`input text-sm transition-shadow ${fieldErrors.title ? "border-red-400 focus:ring-red-300" : "focus:ring-blue-200"}`}
                    placeholder="Contoh: Jadwal Kerja Bakti RT 04..."
                    maxLength={150}
                  />
                  <div className="flex items-center justify-between mt-1">
                    <FieldError msg={fieldErrors.title} />
                    <span
                      className={`text-xs ml-auto ${form.title.length > 130 ? "text-amber-500" : "text-slate-300"}`}>
                      {form.title.length}/150
                    </span>
                  </div>
                </div>

                {/* Kategori */}
                <div>
                  <label className="label mb-1.5 sm:mb-2 text-xs sm:text-sm">
                    Kategori
                  </label>
                  {/*
                    On 320px chips wrap naturally; gap is tighter.
                    On sm+ slightly looser gap.
                  */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {ANNOUNCEMENT_CATEGORIES.map((c) => {
                      const Icon =
                        ANNOUNCEMENT_CATEGORY_ICONS[c.value] ?? Megaphone;
                      const isActive = form.category === c.value;
                      return (
                        <button
                          key={c.value}
                          type="button"
                          onClick={() =>
                            setField(
                              "category",
                              c.value as CreateAnnouncementPayload["category"],
                            )
                          }
                          className={`inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                            isActive
                              ? "bg-blue-600 text-white border-blue-600 shadow-sm scale-[1.03]"
                              : "bg-slate-50 text-slate-600 border-slate-200 hover:border-blue-300 hover:bg-blue-50"
                          }`}>
                          <Icon className="w-3 h-3" />
                          {c.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Prioritas */}
                <div>
                  <label className="label mb-1.5 sm:mb-2 text-xs sm:text-sm">
                    Prioritas
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                    {ANNOUNCEMENT_PRIORITIES.map((p) => {
                      const cfg =
                        PRIORITY_CONFIG[
                          p.value as keyof typeof PRIORITY_CONFIG
                        ];
                      const Icon = ANNOUNCEMENT_PRIORITY_ICONS[p.value] ?? Bell;
                      const active = form.priority === p.value;
                      return (
                        <button
                          key={p.value}
                          type="button"
                          onClick={() =>
                            setField(
                              "priority",
                              p.value as CreateAnnouncementPayload["priority"],
                            )
                          }
                          className={`relative flex flex-col items-center gap-1 sm:gap-1.5 py-2.5 sm:py-3 px-1.5 sm:px-2 rounded-xl border-2 transition-all text-center ${
                            active
                              ? `${cfg.bg} ${cfg.text} border-current ring-2 ${cfg.ring} shadow-sm`
                              : "bg-slate-50 text-slate-500 border-slate-100 hover:border-slate-300"
                          }`}>
                          <Icon
                            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${active ? cfg.text : "text-slate-400"}`}
                          />
                          <span className="text-xs font-semibold">
                            {cfg.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Konten */}
                <div>
                  <label className="label mb-1.5 text-xs sm:text-sm">
                    Isi Pengumuman<span className="text-red-400 ml-0.5">*</span>
                  </label>
                  <textarea
                    value={form.content}
                    onChange={(e) => setField("content", e.target.value)}
                    className={`input resize-none text-sm transition-shadow ${fieldErrors.content ? "border-red-400 focus:ring-red-300" : "focus:ring-blue-200"}`}
                    rows={4}
                    placeholder="Tulis detail pengumuman di sini..."
                  />
                  <div className="mt-1.5 sm:mt-2 space-y-1">
                    <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          contentPct > 90
                            ? "bg-red-400"
                            : contentPct > 70
                              ? "bg-amber-400"
                              : "bg-blue-400"
                        }`}
                        style={{ width: `${contentPct}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <FieldError msg={fieldErrors.content} />
                      <span
                        className={`text-xs ml-auto ${contentLen > 4500 ? "text-red-500" : "text-slate-400"}`}>
                        {contentLen.toLocaleString()}/5.000
                      </span>
                    </div>
                  </div>
                </div>

                {/* Pin toggle */}
                <button
                  type="button"
                  onClick={() => setField("is_pinned", !form.is_pinned)}
                  className={`w-full flex items-center gap-2.5 sm:gap-3 px-3 sm:px-4 py-3 sm:py-3.5 rounded-xl border-2 transition-all text-left ${
                    form.is_pinned
                      ? "bg-amber-50 border-amber-300 text-amber-800"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}>
                  <div
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                      form.is_pinned ? "bg-amber-200" : "bg-slate-200"
                    }`}>
                    <Pin
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${form.is_pinned ? "text-amber-700" : "text-slate-500"}`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-semibold leading-tight">
                      Sematkan pengumuman
                    </p>
                    <p className="text-xs opacity-70 mt-0.5 leading-tight hidden sm:block">
                      Tampil di bagian paling atas daftar
                    </p>
                  </div>
                  {/* Toggle pill */}
                  <div
                    className={`w-9 sm:w-10 h-5 sm:h-6 rounded-full flex-shrink-0 transition-colors relative ${
                      form.is_pinned ? "bg-amber-400" : "bg-slate-300"
                    }`}>
                    <span
                      className={`absolute top-0.5 sm:top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${
                        form.is_pinned
                          ? "left-4 sm:left-5"
                          : "left-0.5 sm:left-1"
                      }`}
                    />
                  </div>
                </button>
              </form>
            </div>

            {/* Footer actions */}
            <div className="flex gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 border-t border-slate-100 flex-shrink-0">
              <button
                type="button"
                onClick={handleClose}
                className="btn-secondary flex-1 sm:flex-none sm:px-6 text-xs sm:text-sm py-2 sm:py-2.5">
                Batal
              </button>
              <button
                type="submit"
                form="announcement-form"
                className="btn-primary flex-1 justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm py-2 sm:py-2.5">
                <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Terbitkan</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
