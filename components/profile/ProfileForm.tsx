"use client";

import { useState, useTransition } from "react";

import { User as UserIcon, Phone, MapPin, Hash, Shield } from "lucide-react";

import { useToast } from "../../hooks/useToast";

import { updateUserProfile } from "../../actions/users";

import { isValidPhone } from "../../utils";

import type { User } from "../../types";

interface ProfileFormProps {
  user: User | null;
}

const roleLabel: Record<string, string> = {
  admin: "Administrator",
  ketua_rw: "Ketua RW",
  warga: "Warga",
};

export function ProfileForm({ user }: ProfileFormProps) {
  const { showToast } = useToast();

  const [isPending, startTransition] = useTransition();

  const [form, setForm] = useState({
    full_name: user?.full_name ?? "",
    phone: user?.phone ?? "",
    address: user?.address ?? "",
    rt_number: user?.rt_number ?? "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.full_name.trim()) {
      showToast("warning", "Nama wajib diisi", "");

      return;
    }

    if (form.phone && !isValidPhone(form.phone)) {
      showToast(
        "warning",
        "Format nomor HP tidak valid",
        "Contoh: 08123456789",
      );

      return;
    }

    startTransition(async () => {
      const result = await updateUserProfile({
        ...form,
      });

      if (!result.success) {
        showToast(
          "error",
          "Gagal menyimpan",
          result.error ?? "Terjadi kesalahan. Silakan coba lagi.",
        );

        return;
      }

      showToast(
        "success",
        "Profil diperbarui!",
        "Informasi profil kamu berhasil disimpan.",
      );
    });
  };

  return (
    <div
      className="
        space-y-5 sm:space-y-6
        w-full
      ">
      {/* Avatar card */}
      <div
        className="
          card
          p-4 sm:p-6
          flex flex-col sm:flex-row
          items-start sm:items-center
          gap-4 sm:gap-5
          rounded-2xl
        ">
        {/* Avatar */}
        <div
          className="
            w-16 h-16 sm:w-20 sm:h-20
            rounded-2xl
            bg-gradient-to-br
            from-blue-500 to-cyan-500
            flex items-center justify-center
            text-white
            font-display font-bold
            text-2xl sm:text-3xl
            shadow-lg shadow-blue-200
            flex-shrink-0
          ">
          {user?.full_name?.[0]?.toUpperCase() ?? "W"}
        </div>

        {/* User info */}
        <div className="min-w-0 w-full">
          <h2
            className="
              font-display font-bold
              text-slate-900
              text-lg sm:text-xl
              leading-tight
              break-words
            ">
            {user?.full_name ?? "Warga"}
          </h2>

          <p
            className="
              text-slate-500
              text-xs sm:text-sm
              mt-1
              break-all
            ">
            {user?.email}
          </p>

          <div
            className="
              flex items-center gap-1.5
              mt-3
              flex-wrap
            ">
            <Shield
              className="
                w-3.5 h-3.5
                text-blue-600
                flex-shrink-0
              "
            />

            <span
              className="
                text-[10px] sm:text-xs
                font-semibold
                text-blue-700
                bg-blue-50
                px-2 py-0.5
                rounded-full
                border border-blue-100
                whitespace-nowrap
              ">
              {roleLabel[user?.role ?? "warga"]}
            </span>
          </div>
        </div>
      </div>

      {/* Form card */}
      <div
        className="
          card
          p-4 sm:p-6
          rounded-2xl
        ">
        <h3
          className="
            font-display font-bold
            text-slate-900
            text-base sm:text-lg
            mb-5
          ">
          Informasi Pribadi
        </h3>

        <form
          onSubmit={handleSubmit}
          className="
            space-y-4
            w-full
          ">
          {/* Nama */}
          <div>
            <label
              className="
                label
                text-sm
              ">
              <span
                className="
                  flex items-center gap-1.5
                  flex-wrap
                ">
                <UserIcon className="w-3.5 h-3.5 flex-shrink-0" />
                Nama Lengkap *
              </span>
            </label>

            <input
              type="text"
              value={form.full_name}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  full_name: e.target.value,
                }))
              }
              className="
                input
                w-full
                text-sm
              "
              placeholder="Masukkan nama lengkap"
              disabled={isPending}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="label text-sm">
              <span
                className="
                  flex items-center gap-1.5
                  flex-wrap
                ">
                <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                Nomor HP
              </span>
            </label>

            <input
              type="tel"
              value={form.phone}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  phone: e.target.value,
                }))
              }
              className="
                input
                w-full
                text-sm
              "
              placeholder="08123456789"
              disabled={isPending}
            />
          </div>

          {/* Address */}
          <div>
            <label className="label text-sm">
              <span
                className="
                  flex items-center gap-1.5
                  flex-wrap
                ">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                Alamat
              </span>
            </label>

            <input
              type="text"
              value={form.address}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  address: e.target.value,
                }))
              }
              className="
                input
                w-full
                text-sm
              "
              placeholder="Jl. Contoh No. 1"
              disabled={isPending}
            />
          </div>

          {/* RT */}
          <div>
            <label className="label text-sm">
              <span
                className="
                  flex items-center gap-1.5
                  flex-wrap
                ">
                <Hash className="w-3.5 h-3.5 flex-shrink-0" />
                Nomor RT
              </span>
            </label>

            <input
              type="text"
              value={form.rt_number}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  rt_number: e.target.value,
                }))
              }
              className="
                input
                w-full
                text-sm
              "
              placeholder="Contoh: RT 03"
              disabled={isPending}
            />
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="
                btn-primary
                w-full sm:w-auto
                justify-center
                text-sm
              "
              disabled={isPending}>
              {isPending ? (
                <>
                  <svg
                    className="
                      w-4 h-4
                      animate-spin
                    "
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
                "Simpan Perubahan"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
