"use client";

import { Bell, Shield, Users, Wifi } from "lucide-react";
import { AuthLayout } from "../../components/auth/AuthLayout";
import { AuthMobileLogo } from "../../components/auth/AuthMobileLogo";
import { AuthFooter } from "../../components/auth/AuthFooter";
import { LoginForm } from "../../components/auth/LoginForm";

const FEATURES = [
  { icon: Bell, label: "Pengumuman real-time" },
  { icon: Users, label: "Kalender kegiatan warga" },
  { icon: Shield, label: "Aspirasi & laporan aman" },
  { icon: Wifi, label: "Akses kapan saja" },
];

export default function LoginPage() {
  return (
    <AuthLayout
      panel={{
        headingPrefix: "Warga Terhubung,",
        headingHighlight: "Lingkungan Terorganisir",
        description:
          "Platform digital untuk menyatukan informasi, kegiatan, dan aspirasi seluruh warga dalam satu tempat.",
        features: FEATURES,
        showFeatureCheck: false,
      }}>
      <div className="w-full max-w-md">
        <AuthMobileLogo />

        {/* Heading */}
        <div className="mb-8">
          <h2 className="text-3xl font-display font-bold text-slate-900 mb-2">
            Masuk
          </h2>
          <p className="text-slate-500">
            Akses informasi dan layanan warga RW kamu
          </p>
        </div>

        {/* Form */}
        <LoginForm />

        {/* Footer */}
        <AuthFooter
          text="Belum punya akun?"
          linkLabel="Daftar di sini"
          linkHref="/register"
        />
      </div>
    </AuthLayout>
  );
}
