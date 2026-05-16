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

/* ─────────────────────────────────────────────
 * ICON MAP
 * ───────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────
 * VALIDATION
 * ───────────────────────────────────────────── */
function validateForm(form: CreateAspirationPayload): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!form.title.trim()) {
    errors.title = "Judul wajib diisi";
  } else if (form.title.trim().length > 100) {
    errors.title = "Maksimal 100 karakter";
  }

  if (!form.content.trim()) {
    errors.content = "Isi aspirasi wajib diisi";
  } else if (form.content.trim().length < 10) {
    errors.content = "Minimal 10 karakter";
  } else if (form.content.trim().length > 2000) {
    errors.content = "Maksimal 2000 karakter";
  }

  return errors;
}

/* ─────────────────────────────────────────────
 * FIELD ERROR
 * ───────────────────────────────────────────── */
function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;

  return (
    <p
      className="
        mt-1.5
        flex items-start gap-1
        text-[10px] sm:text-xs
        leading-relaxed
        text-red-500
        break-words
        animate-slide-up
      ">
      <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0" />
      <span>{msg}</span>
    </p>
  );
}

/* ─────────────────────────────────────────────
 * COMPONENT
 * ───────────────────────────────────────────── */
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

  /* ─────────────────────────────────────────────
   * AUTO FOCUS
   * ───────────────────────────────────────────── */
  useEffect(() => {
    if (open) {
      setTimeout(() => titleRef.current?.focus(), 80);
    }
  }, [open]);

  /* ─────────────────────────────────────────────
   * ESC CLOSE
   * ───────────────────────────────────────────── */
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  /* ─────────────────────────────────────────────
   * CLOSE
   * ───────────────────────────────────────────── */
  const handleClose = () => {
    setOpen(false);
    setForm(EMPTY_FORM);
    setFieldErrors({});
  };

  /* ─────────────────────────────────────────────
   * SET FIELD
   * ───────────────────────────────────────────── */
  const setField = <K extends keyof CreateAspirationPayload>(
    key: K,
    value: CreateAspirationPayload[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

    if (fieldErrors[key]) {
      setFieldErrors((prev) => ({
        ...prev,
        [key]: "",
      }));
    }
  };

  /* ─────────────────────────────────────────────
   * SUBMIT
   * ───────────────────────────────────────────── */
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
      {/* =========================================
       * OPEN BUTTON
       * ========================================= */}
      <button
        onClick={() => setOpen(true)}
        className="
          inline-flex items-center justify-center gap-2

          rounded-xl
          bg-blue-600

          px-3 sm:px-4
          py-2.5

          text-[11px] sm:text-sm
          font-semibold
          text-white

          shadow-sm

          hover:bg-blue-700
          active:scale-[0.98]

          transition-all
        ">
        <Plus className="h-4 w-4 shrink-0" />

        <span className="hidden xs:inline">Kirim Aspirasi</span>

        <span className="xs:hidden">Kirim</span>
      </button>

      {/* =========================================
       * MODAL
       * ========================================= */}
      {open && (
        <div
          className="
            fixed inset-0 z-50

            flex items-end
            sm:items-center sm:justify-center

            bg-black/50
            backdrop-blur-sm

            sm:p-4
          "
          onClick={(e) => e.target === e.currentTarget && handleClose()}>
          {/* =====================================
           * CONTAINER
           * ===================================== */}
          <div
            className="
              flex w-full flex-col

              rounded-t-3xl
              bg-white

              shadow-2xl

              animate-slide-up

              max-h-[92dvh]

              sm:max-h-[88vh]
              sm:max-w-2xl
              sm:rounded-3xl
            ">
            {/* MOBILE HANDLE */}
            <div
              className="
                flex justify-center
                pt-3 pb-1
                sm:hidden
              ">
              <div
                className="
                  h-1 w-10
                  rounded-full
                  bg-slate-200
                "
              />
            </div>

            {/* =====================================
             * HEADER
             * ===================================== */}
            <div
              className="
                flex items-start justify-between gap-3

                border-b border-slate-100

                px-4 sm:px-6
                pt-4 sm:pt-5
                pb-4

                shrink-0
              ">
              <div className="min-w-0 flex-1">
                <h2
                  className="
                    text-lg sm:text-xl
                    font-bold
                    text-slate-900
                    leading-tight
                    break-words
                  ">
                  Kirim Aspirasi
                </h2>

                <p
                  className="
                    mt-1
                    text-[11px] sm:text-xs
                    leading-relaxed
                    text-slate-400
                  ">
                  Sampaikan aspirasi atau laporan kepada pengurus RW
                </p>
              </div>

              <button
                title="Tutup"
                onClick={handleClose}
                className="
                  flex h-9 w-9
                  items-center justify-center

                  rounded-xl

                  text-slate-500

                  hover:bg-slate-100
                  hover:text-slate-700

                  active:scale-95

                  transition-all
                  shrink-0
                ">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* =====================================
             * BODY
             * ===================================== */}
            <div
              className="
                flex-1 overflow-y-auto

                px-4 sm:px-6
                py-5
              ">
              <form
                id="aspiration-form"
                onSubmit={handleSubmit}
                className="space-y-5">
                {/* =================================
                 * TITLE
                 * ================================= */}
                <div>
                  <label
                    className="
                      mb-1.5 block

                      text-[11px] sm:text-xs
                      font-semibold
                      text-slate-700
                    ">
                    Judul
                    <span className="ml-0.5 text-red-400">*</span>
                  </label>

                  <input
                    ref={titleRef}
                    type="text"
                    value={form.title}
                    onChange={(e) => setField("title", e.target.value)}
                    placeholder="Singkat dan jelas..."
                    maxLength={100}
                    className={`
                      w-full

                      rounded-xl
                      border

                      bg-white

                      px-3 py-3

                      text-[12px] sm:text-sm
                      text-slate-700

                      placeholder:text-slate-400

                      outline-none

                      transition-all

                      focus:ring-2

                      ${
                        fieldErrors.title
                          ? "border-red-400 focus:ring-red-300"
                          : "border-slate-200 focus:ring-blue-200"
                      }
                    `}
                  />

                  <div
                    className="
                      mt-1
                      flex items-start justify-between gap-2
                    ">
                    <FieldError msg={fieldErrors.title} />

                    <span
                      className={`
                        ml-auto
                        shrink-0

                        text-[10px]

                        ${
                          form.title.length > 80
                            ? "text-amber-500"
                            : "text-slate-300"
                        }
                      `}>
                      {form.title.length}/100
                    </span>
                  </div>
                </div>

                {/* =================================
                 * CATEGORY
                 * ================================= */}
                <div>
                  <label
                    className="
                      mb-2 block

                      text-[11px] sm:text-xs
                      font-semibold
                      text-slate-700
                    ">
                    Kategori
                  </label>

                  <div
                    className="
                      grid grid-cols-2
                      gap-2

                      sm:grid-cols-3
                    ">
                    {ASPIRATION_CATEGORIES.map((cat) => {
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
                          className={`
                              flex items-center gap-2

                              rounded-xl
                              border-2

                              px-3 py-3

                              text-[11px] sm:text-xs
                              font-semibold

                              transition-all

                              min-w-0

                              ${
                                active
                                  ? "border-blue-600 bg-blue-600 text-white shadow-sm scale-[1.02]"
                                  : "border-slate-200 bg-slate-50 text-slate-600 hover:border-blue-300 hover:bg-blue-50"
                              }
                            `}>
                          <Icon
                            className="
                                h-4 w-4
                                shrink-0
                              "
                          />

                          <span className="truncate">{cat.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  <FieldError msg={fieldErrors.category} />
                </div>

                {/* =================================
                 * CONTENT
                 * ================================= */}
                <div>
                  <label
                    className="
                      mb-1.5 block

                      text-[11px] sm:text-xs
                      font-semibold
                      text-slate-700
                    ">
                    Isi Aspirasi / Laporan
                    <span className="ml-0.5 text-red-400">*</span>
                  </label>

                  <textarea
                    value={form.content}
                    onChange={(e) => setField("content", e.target.value)}
                    rows={6}
                    placeholder="Jelaskan aspirasi atau laporan kamu secara detail..."
                    className={`
                      w-full

                      resize-none

                      rounded-xl
                      border

                      bg-white

                      px-3 py-3

                      text-[12px] sm:text-sm
                      leading-relaxed
                      text-slate-700

                      placeholder:text-slate-400

                      outline-none

                      transition-all

                      focus:ring-2

                      ${
                        fieldErrors.content
                          ? "border-red-400 focus:ring-red-300"
                          : "border-slate-200 focus:ring-blue-200"
                      }
                    `}
                  />

                  <div className="mt-2 space-y-1.5">
                    {/* progress */}
                    <div
                      className="
                        h-1 w-full
                        overflow-hidden
                        rounded-full
                        bg-slate-100
                      ">
                      <div
                        className={`
                          h-full rounded-full
                          transition-all duration-300

                          ${
                            contentPct > 90
                              ? "bg-red-400"
                              : contentPct > 70
                                ? "bg-amber-400"
                                : "bg-blue-400"
                          }
                        `}
                        style={{
                          width: `${contentPct}%`,
                        }}
                      />
                    </div>

                    <div
                      className="
                        flex items-start justify-between gap-2
                      ">
                      <FieldError msg={fieldErrors.content} />

                      <span
                        className={`
                          ml-auto
                          shrink-0

                          text-[10px]

                          ${
                            contentLen > 1800
                              ? "text-red-500"
                              : "text-slate-400"
                          }
                        `}>
                        {contentLen.toLocaleString()}
                        /2.000
                      </span>
                    </div>
                  </div>
                </div>

                {/* =================================
                 * ANONYMOUS
                 * ================================= */}
                <button
                  type="button"
                  onClick={() => setField("is_anonymous", !form.is_anonymous)}
                  className={`
                    flex w-full items-start gap-3

                    rounded-2xl
                    border-2

                    px-3 sm:px-4
                    py-3.5

                    text-left

                    transition-all

                    ${
                      form.is_anonymous
                        ? "border-violet-300 bg-violet-50 text-violet-800"
                        : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300"
                    }
                  `}>
                  {/* icon */}
                  <div
                    className={`
                      flex h-10 w-10
                      items-center justify-center

                      rounded-xl
                      shrink-0

                      ${form.is_anonymous ? "bg-violet-200" : "bg-slate-200"}
                    `}>
                    <EyeOff
                      className={`
                        h-4 w-4

                        ${
                          form.is_anonymous
                            ? "text-violet-700"
                            : "text-slate-500"
                        }
                      `}
                    />
                  </div>

                  {/* text */}
                  <div className="min-w-0 flex-1">
                    <p
                      className="
                        text-sm
                        font-semibold
                        leading-tight
                        break-words
                      ">
                      Kirim secara anonim
                    </p>

                    <p
                      className="
                        mt-1

                        text-[11px] sm:text-xs
                        leading-relaxed

                        opacity-70
                      ">
                      Identitasmu tidak akan ditampilkan ke warga lain
                    </p>
                  </div>

                  {/* toggle */}
                  <div
                    className={`
                      relative

                      h-6 w-10
                      shrink-0

                      rounded-full

                      transition-colors

                      ${form.is_anonymous ? "bg-violet-400" : "bg-slate-300"}
                    `}>
                    <span
                      className={`
                        absolute top-1

                        h-4 w-4
                        rounded-full
                        bg-white
                        shadow

                        transition-all

                        ${form.is_anonymous ? "left-5" : "left-1"}
                      `}
                    />
                  </div>
                </button>

                {/* =================================
                 * INFO
                 * ================================= */}
                {form.is_anonymous && (
                  <div
                    className="
                      flex items-start gap-2.5

                      rounded-xl
                      border border-violet-100
                      bg-violet-50

                      px-3.5 py-3

                      animate-slide-up
                    ">
                    <Lock
                      className="
                        mt-0.5
                        h-4 w-4
                        shrink-0
                        text-violet-500
                      "
                    />

                    <p
                      className="
                        text-[11px] sm:text-xs
                        leading-relaxed
                        text-violet-700
                      ">
                      Pengurus RW tetap bisa melihat identitasmu untuk keperluan
                      tindak lanjut, namun tidak akan ditampilkan secara publik.
                    </p>
                  </div>
                )}
              </form>
            </div>

            {/* =====================================
             * FOOTER
             * ===================================== */}
            <div
              className="
                flex flex-col-reverse gap-2

                border-t border-slate-100

                px-4 sm:px-6
                py-4

                sm:flex-row sm:justify-end

                shrink-0
              ">
              <button
                type="button"
                onClick={handleClose}
                className="
                  w-full sm:w-auto

                  rounded-xl
                  border border-slate-200

                  bg-white

                  px-4 sm:px-6
                  py-2.5

                  text-[11px] sm:text-sm
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
                form="aspiration-form"
                className="
                  flex w-full sm:w-auto
                  items-center justify-center gap-2

                  rounded-xl

                  bg-blue-600

                  px-4 sm:px-6
                  py-2.5

                  text-[11px] sm:text-sm
                  font-semibold
                  text-white

                  shadow-sm

                  hover:bg-blue-700

                  active:scale-[0.98]

                  transition-all
                ">
                <Send className="h-4 w-4 shrink-0" />

                <span>Kirim Aspirasi</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
