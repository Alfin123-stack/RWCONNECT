import type { Metadata } from "next";

import { redirect } from "next/navigation";

import { getAllUsers } from "../../../../actions/users";

import { UserManagementTable } from "../../../../components/admin/UserManagementTable";

export const metadata: Metadata = {
  title: "Kelola Warga",
};

export default async function AdminUsersPage() {
  const result = await getAllUsers();

  // unauthenticated / unauthorized
  if (!result) {
    redirect("/dashboard");
  }

  const { users, count, currentUserId } = result;

  return (
    <div
      className="
        space-y-5 sm:space-y-6
        animate-fade-in
        w-full
      ">
      {/* Header */}
      <div className="min-w-0">
        <h1
          className="
            section-title
            text-2xl sm:text-3xl
            leading-tight
            break-words
          ">
          Kelola Warga
        </h1>

        <p
          className="
            section-subtitle
            text-sm sm:text-base
            leading-relaxed
            break-words
            mt-1
          ">
          {count} warga terdaftar di RWConnect
        </p>
      </div>

      {/* Table wrapper */}
      <div
        className="
          w-full
          overflow-x-auto
          rounded-2xl
        ">
        <UserManagementTable users={users} currentUserId={currentUserId} />
      </div>
    </div>
  );
}
