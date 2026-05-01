"use client";

import { Bell, Shield, Users, Wifi } from "lucide-react";
import { AuthLayout } from "../../components/auth/AuthLayout";
import { AuthMobileLogo } from "../../components/auth/AuthMobileLogo";
import { AuthFooter } from "../../components/auth/AuthFooter";
import { RegisterForm } from "../../components/auth/RegisterForm";

const FEATURES = [
  { icon: Bell, label: "Notifikasi pengumuman otomatis" },
  { icon: Users, label: "Kalender kegiatan warga" },
  { icon: Shield, label: "Kirim aspirasi secara anonim" },
  { icon: Wifi, label: "Akses kapan saja & di mana saja" },
];

export default function RegisterPage() {
  return (
    <AuthLayout
      panel={{
        headingPrefix: "Bergabung dengan",
        headingHighlight: "Komunitas Warga",
        description:
          "Daftarkan diri kamu dan nikmati kemudahan akses informasi, kegiatan, dan aspirasi warga lingkungan.",
        features: FEATURES,
        showFeatureCheck: true,
        badge: "Daftar Gratis",
      }}>
      <div className="w-full max-w-md py-6">
        <AuthMobileLogo />

        {/* Heading */}
        <div className="mb-6">
          <h2 className="text-2xl font-display font-bold text-slate-900 mb-1">
            Buat Akun Baru
          </h2>
          <p className="text-slate-500 text-sm">
            Daftarkan diri kamu sebagai warga lingkungan RW
          </p>
        </div>

        {/* Multi-step form */}
        <RegisterForm />

        {/* Footer */}
        <AuthFooter
          text="Sudah punya akun?"
          linkLabel="Masuk di sini"
          linkHref="/login"
        />
      </div>
    </AuthLayout>
  );
}
