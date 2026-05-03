import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUserProfile } from "../../../actions/users";
import { ProfileForm } from "../../../components/profile/ProfileForm";

export const metadata: Metadata = { title: "Profil Saya" };

export default async function ProfilePage() {
  const profile = await getCurrentUserProfile();

  // null means no active session
  if (!profile) redirect("/login");

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
