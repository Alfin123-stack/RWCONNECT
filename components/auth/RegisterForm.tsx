// RegisterForm.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";
import { useToast } from "../../hooks/useToast";
import { isValidEmail, isValidPhone } from "../../utils";

import { StepIndicator } from "../../components/auth/StepIndicator";
import { RegisterStep1 } from "../../components/auth/RegisterStep1";
import { RegisterStep2 } from "../../components/auth/RegisterStep2";
import { RegisterStep3 } from "../../components/auth/RegisterStep3";

import type { Step } from "../../components/auth/StepIndicator";

// ── Steps ────────────────────────────────────────────────────

const STEPS: Step[] = [
  {
    id: 1,
    title: "Informasi Akun",
    desc: "Email & password untuk login",
  },
  {
    id: 2,
    title: "Data Pribadi",
    desc: "Identitas & alamat warga",
  },
  {
    id: 3,
    title: "Konfirmasi",
    desc: "Periksa data sebelum daftar",
  },
];

// ── Types ────────────────────────────────────────────────────

interface FormState {
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
  phone: string;
  rt_number: string;
  address: string;
}

interface FieldErrors {
  full_name?: string;
  email?: string;
  password?: string;
  confirm_password?: string;
  phone?: string;
}

// ── Initial State ────────────────────────────────────────────

const INITIAL_FORM: FormState = {
  full_name: "",
  email: "",
  password: "",
  confirm_password: "",
  phone: "",
  rt_number: "",
  address: "",
};

// ── Validators ───────────────────────────────────────────────

function validateStep1(f: FormState): FieldErrors {
  const e: FieldErrors = {};

  if (!f.full_name.trim()) {
    e.full_name = "Nama lengkap wajib diisi";
  } else if (f.full_name.trim().length < 3) {
    e.full_name = "Nama minimal 3 karakter";
  }

  if (!f.email.trim()) {
    e.email = "Email wajib diisi";
  } else if (!isValidEmail(f.email)) {
    e.email = "Format email tidak valid";
  }

  if (!f.password) {
    e.password = "Password wajib diisi";
  } else if (f.password.length < 8) {
    e.password = "Password minimal 8 karakter";
  }

  if (!f.confirm_password) {
    e.confirm_password = "Konfirmasi password wajib diisi";
  } else if (f.password !== f.confirm_password) {
    e.confirm_password = "Password tidak cocok";
  }

  return e;
}

function validateStep2(f: FormState): FieldErrors {
  const e: FieldErrors = {};

  if (f.phone && !isValidPhone(f.phone)) {
    e.phone = "Format nomor HP tidak valid (contoh: 08123456789)";
  }

  return e;
}

// ── Main Component ───────────────────────────────────────────

/**
 * RegisterForm
 * Fully responsive for:
 * - 320px+
 * - mobile
 * - tablet
 * - desktop
 */
export function RegisterForm() {
  const router = useRouter();
  const { showToast } = useToast();

  const [step, setStep] = useState(1);

  const [isLoading, setLoading] = useState(false);

  const [agreed, setAgreed] = useState(false);

  const [errors, setErrors] = useState<FieldErrors>({});

  const [form, setForm] = useState<FormState>(INITIAL_FORM);

  // ── Handle Change ────────────────────────────────────────

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field as keyof FieldErrors]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  // ── Navigation ───────────────────────────────────────────

  const goNext = () => {
    let errs: FieldErrors = {};

    if (step === 1) {
      errs = validateStep1(form);
    }

    if (step === 2) {
      errs = validateStep2(form);
    }

    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setErrors({});

    setStep((s) => s + 1);
  };

  const goBack = () => {
    setErrors({});
    setStep((s) => s - 1);
  };

  // ── Submit ───────────────────────────────────────────────

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreed) {
      showToast(
        "warning",
        "Setujui syarat & ketentuan",
        "Centang kotak persetujuan terlebih dahulu.",
      );

      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();

      const { data, error: signUpError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            full_name: form.full_name,
            phone: form.phone || null,
            address: form.address || null,
            rt_number: form.rt_number || null,
          },
        },
      });

      if (signUpError) {
        const isAlreadyRegistered =
          signUpError.message.includes("already registered");

        showToast(
          "error",
          isAlreadyRegistered ? "Email sudah terdaftar" : "Pendaftaran gagal",
          isAlreadyRegistered
            ? "Gunakan email lain atau login dengan akun yang ada."
            : signUpError.message,
        );

        return;
      }

      // Sync public.users
      if (data.user) {
        await supabase.from("users").upsert({
          id: data.user.id,
          email: form.email,
          full_name: form.full_name,
          phone: form.phone || null,
          address: form.address || null,
          rt_number: form.rt_number || null,
          role: "warga",
        });
      }

      showToast(
        "success",
        "Pendaftaran berhasil!",
        "Akun kamu sudah dibuat. Silakan masuk dengan email dan password kamu.",
        6000,
      );

      router.push("/login");
    } catch {
      showToast(
        "error",
        "Terjadi kesalahan",
        "Silakan coba lagi beberapa saat.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="
        w-full
        min-w-0

        space-y-5
        sm:space-y-6

        overflow-hidden
      "
    >
      {/* Step Indicator */}
      <div className="w-full overflow-x-auto pb-1">
        <StepIndicator steps={STEPS} current={step} />
      </div>

      {/* Step Content */}
      <div
        className="
          w-full
          min-w-0

          rounded-2xl

          transition-all
          duration-300
        "
      >
        {step === 1 && (
          <RegisterStep1
            fullName={form.full_name}
            email={form.email}
            password={form.password}
            confirmPassword={form.confirm_password}
            errors={errors}
            onChange={handleChange}
            onNext={goNext}
          />
        )}

        {step === 2 && (
          <RegisterStep2
            phone={form.phone}
            rtNumber={form.rt_number}
            address={form.address}
            errors={errors}
            onChange={handleChange}
            onNext={goNext}
            onBack={goBack}
          />
        )}

        {step === 3 && (
          <RegisterStep3
            fullName={form.full_name}
            email={form.email}
            phone={form.phone}
            rtNumber={form.rt_number}
            address={form.address}
            agreed={agreed}
            isLoading={isLoading}
            onAgreementChange={setAgreed}
            onBack={goBack}
          />
        )}
      </div>
    </form>
  );
}
