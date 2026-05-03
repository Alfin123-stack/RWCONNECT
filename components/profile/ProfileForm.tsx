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
      // revalidatePath("/profile") inside the action handles cache bust —
      // no router.refresh() needed.
    });
  };

  return (
    <div className="space-y-6">
      {/* Avatar card */}
      <div className="card p-6 flex items-center gap-5">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-display font-bold text-3xl shadow-lg shadow-blue-200 flex-shrink-0">
          {user?.full_name?.[0]?.toUpperCase() ?? "W"}
        </div>
        <div>
          <h2 className="font-display font-bold text-slate-900 text-xl">
            {user?.full_name ?? "Warga"}
          </h2>
          <p className="text-slate-500 text-sm mt-0.5">{user?.email}</p>
          <div className="flex items-center gap-1.5 mt-2">
            <Shield className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
              {roleLabel[user?.role ?? "warga"]}
            </span>
          </div>
        </div>
      </div>

      {/* Edit form */}
      <div className="card p-6">
        <h3 className="font-display font-bold text-slate-900 mb-5">
          Informasi Pribadi
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">
              <span className="flex items-center gap-1.5">
                <UserIcon className="w-3.5 h-3.5" /> Nama Lengkap *
              </span>
            </label>
            <input
              type="text"
              value={form.full_name}
              onChange={(e) =>
                setForm((p) => ({ ...p, full_name: e.target.value }))
              }
              className="input"
              placeholder="Masukkan nama lengkap"
              disabled={isPending}
            />
          </div>

          <div>
            <label className="label">
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" /> Nomor HP
              </span>
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) =>
                setForm((p) => ({ ...p, phone: e.target.value }))
              }
              className="input"
              placeholder="08123456789"
              disabled={isPending}
            />
          </div>

          <div>
            <label className="label">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> Alamat
              </span>
            </label>
            <input
              type="text"
              value={form.address}
              onChange={(e) =>
                setForm((p) => ({ ...p, address: e.target.value }))
              }
              className="input"
              placeholder="Jl. Contoh No. 1"
              disabled={isPending}
            />
          </div>

          <div>
            <label className="label">
              <span className="flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5" /> Nomor RT
              </span>
            </label>
            <input
              type="text"
              value={form.rt_number}
              onChange={(e) =>
                setForm((p) => ({ ...p, rt_number: e.target.value }))
              }
              className="input"
              placeholder="Contoh: RT 03"
              disabled={isPending}
            />
          </div>

          <div className="pt-2">
            <button type="submit" className="btn-primary" disabled={isPending}>
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
                "Simpan Perubahan"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
