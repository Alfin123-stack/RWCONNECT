import type { Metadata } from "next";

import { redirect } from "next/navigation";

import { getCurrentUserProfile } from "../../../actions/users";

import { ProfileForm } from "../../../components/profile/ProfileForm";

export const metadata: Metadata = {
  title: "Profil Saya",
};

export default async function ProfilePage() {
  const profile = await getCurrentUserProfile();

  // no active session
  if (!profile) {
    redirect("/login");
  }

  return (
    <div
      className="
        w-full
        max-w-2xl
        space-y-5 sm:space-y-6
        animate-fade-in
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
          Profil Saya
        </h1>

        <p
          className="
            section-subtitle
            text-sm sm:text-base
            leading-relaxed
            break-words
            mt-1
          ">
          Kelola informasi profil dan akun kamu
        </p>
      </div>

      {/* Form */}
      <div className="w-full overflow-hidden">
        <ProfileForm user={profile} />
      </div>
    </div>
  );
}
