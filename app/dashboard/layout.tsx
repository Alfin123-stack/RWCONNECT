import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "../../lib/supabase/server";
import { User } from "../../types";
import { Sidebar } from "../../components/layout/Sidebar";
import { TopBar } from "../../components/layout/TopBar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerSupabaseClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) {
    redirect("/login");
  }

  // Fetch user profile
  const { data: profile } = await supabase
    .from("users")
    .select("*")
    .eq("id", authUser.id)
    .single();

  const user: Partial<User> = profile ?? {
    id: authUser.id,
    email: authUser.email ?? "",
    full_name: authUser.user_metadata?.full_name ?? "Warga",
    role: "warga",
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar user={user as User} />
      <div className="flex-1 flex flex-col min-h-screen lg:ml-64">
        <TopBar user={user as User} />
        <main className="flex-1 p-4 lg:p-6 xl:p-8 overflow-x-hidden">
          {children}
        </main>
        <footer className="px-6 py-4 border-t border-slate-100 bg-white">
          <p className="text-xs text-slate-400 text-center">
            © 2024 RWConnect — Platform Informasi Warga Digital
          </p>
        </footer>
      </div>
    </div>
  );
}
