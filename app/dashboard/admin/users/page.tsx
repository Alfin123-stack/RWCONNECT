import type { Metadata } from "next";
import { createServerSupabaseClient } from "../../../../lib/supabase/server";
import { redirect } from "next/navigation";
import { UserManagementTable } from "../../../../components/admin/UserManagementTable";

export const metadata: Metadata = { title: "Kelola Warga" };

export default async function AdminUsersPage() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();
  if (!profile || !["admin", "ketua_rw"].includes(profile.role))
    redirect("/dashboard");

  const { data: users, count } = await supabase
    .from("users")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="section-title">Kelola Warga</h1>
        <p className="section-subtitle">
          {count ?? 0} warga terdaftar di RWConnect
        </p>
      </div>
      <UserManagementTable users={users ?? []} currentUserId={user.id} />
    </div>
  );
}
