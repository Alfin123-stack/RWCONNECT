"use client";

import { useState, useTransition } from "react";
import { Shield, User, Search } from "lucide-react";
import { useToast } from "../../hooks/useToast";
import { updateUserRole } from "../../actions/users";
import { formatDate } from "../../utils";
import type { User as UserType, UserRole } from "../../types";

interface UserManagementTableProps {
  users: UserType[];
  currentUserId: string;
}

const roleOptions: { value: UserRole; label: string }[] = [
  { value: "warga", label: "Warga" },
  { value: "ketua_rw", label: "Ketua RW" },
  { value: "admin", label: "Admin" },
];

const roleColors: Record<UserRole, string> = {
  admin: "bg-red-100 text-red-700 border-red-200",
  ketua_rw: "bg-blue-100 text-blue-700 border-blue-200",
  warga: "bg-slate-100 text-slate-700 border-slate-200",
};

export function UserManagementTable({
  users,
  currentUserId,
}: UserManagementTableProps) {
  const { showToast } = useToast();
  const [search, setSearch] = useState("");

  const [pendingId, setPendingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const filtered = users.filter(
    (u) =>
      u.full_name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  );

  const handleRoleChange = (userId: string, newRole: UserRole) => {
    if (userId === currentUserId) {
      showToast(
        "warning",
        "Tidak bisa",
        "Kamu tidak bisa mengubah role diri sendiri.",
      );
      return;
    }

    setPendingId(userId);

    startTransition(async () => {
      const result = await updateUserRole(userId, newRole);

      if (!result.success) {
        showToast(
          "error",
          "Gagal",
          result.error ?? "Tidak bisa mengubah role pengguna.",
        );
      } else {
        showToast(
          "success",
          "Role diperbarui",
          "Role pengguna berhasil diubah.",
        );
      }

      setPendingId(null);
    });
  };

  return (
    <div className="card overflow-hidden">
      {/* Search */}
      <div className="p-4 border-b border-slate-100">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama atau email..."
            className="input pl-9 py-2 text-sm"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Warga
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">
                RT
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Role
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">
                Bergabung
              </th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center text-blue-700 font-bold text-sm flex-shrink-0">
                      {u.full_name?.[0]?.toUpperCase() ?? "W"}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">
                        {u.full_name}
                        {u.id === currentUserId && (
                          <span className="ml-1.5 text-xs text-blue-600 font-normal">
                            (Kamu)
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-slate-400">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 hidden md:table-cell">
                  <span className="text-slate-600">{u.rt_number ?? "—"}</span>
                </td>
                <td className="px-5 py-4">
                  <span className={`badge text-xs ${roleColors[u.role]}`}>
                    {u.role === "admin" || u.role === "ketua_rw" ? (
                      <Shield className="w-2.5 h-2.5 mr-1" />
                    ) : (
                      <User className="w-2.5 h-2.5 mr-1" />
                    )}
                    {roleOptions.find((r) => r.value === u.role)?.label ??
                      u.role}
                  </span>
                </td>
                <td className="px-5 py-4 hidden lg:table-cell text-slate-500 text-xs">
                  {formatDate(u.created_at)}
                </td>
                <td className="px-5 py-4">
                  <select
                    title="role"
                    value={u.role}
                    onChange={(e) =>
                      handleRoleChange(u.id, e.target.value as UserRole)
                    }
                    disabled={
                      (isPending && pendingId === u.id) ||
                      u.id === currentUserId
                    }
                    className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-40 disabled:cursor-not-allowed">
                    {roleOptions.map((r) => (
                      <option key={r.value} value={r.value}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-5 py-12 text-center text-slate-400 text-sm">
                  Tidak ada warga ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
