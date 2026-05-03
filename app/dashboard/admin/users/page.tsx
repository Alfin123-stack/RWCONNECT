import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAllUsers } from "../../../../actions/users";
import { UserManagementTable } from "../../../../components/admin/UserManagementTable";

export const metadata: Metadata = { title: "Kelola Warga" };

export default async function AdminUsersPage() {
  const result = await getAllUsers();

  // null = unauthenticated or insufficient role
  if (!result) redirect("/dashboard");

  const { users, count, currentUserId } = result;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="section-title">Kelola Warga</h1>
        <p className="section-subtitle">{count} warga terdaftar di RWConnect</p>
      </div>
      <UserManagementTable users={users} currentUserId={currentUserId} />
    </div>
  );
}
