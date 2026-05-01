
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "../../../lib/supabase/server";
import { ProfileForm } from "../../../components/profile/ProfileForm";

export const metadata: Metadata = { title: "Profil Saya" };

export default async function ProfilePage() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();
  if (!authUser) redirect("/login");

  const { data: profile } = await supabase
    .from("users")
    .select("*")
    .eq("id", authUser.id)
    .single();

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div>
        <h1 className="section-title">Profil Saya</h1>
        <p className="section-subtitle">
          Kelola informasi profil dan akun kamu
        </p>
      </div>
      <ProfileForm user={profile} />
    </div>
  );
}
