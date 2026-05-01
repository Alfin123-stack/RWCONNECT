"use client";

import { ArrowRight, Mail, Shield, User } from "lucide-react";
import { CheckCircle2 } from "lucide-react";
import { FormField }           from "../../components/auth/FormField";
import { PasswordInput }       from "../../components/auth/PasswordInput";
import { PasswordStrengthBar } from "../../components/auth/PasswordStrengthBar";
import { cn } from "../../utils";

interface RegisterStep1Props {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  errors: {
    full_name?: string;
    email?: string;
    password?: string;
    confirm_password?: string;
  };
  onChange: (field: string, value: string) => void;
  onNext: () => void;
}

/**
 * RegisterStep1
 * Step 1 pendaftaran: nama lengkap, email, password, konfirmasi.
 */
export function RegisterStep1({
  fullName,
  email,
  password,
  confirmPassword,
  errors,
  onChange,
  onNext,
}: RegisterStep1Props) {
  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Nama */}
      <FormField id="full_name" label="Nama Lengkap" icon={User} error={errors.full_name} required>
        <input
          id="full_name"
          type="text"
          value={fullName}
          onChange={(e) => onChange("full_name", e.target.value)}
          className={cn("input", errors.full_name && "border-red-300 focus:ring-red-500")}
          placeholder="Masukkan nama lengkap"
          autoComplete="name"
        />
      </FormField>

      {/* Email */}
      <FormField id="email" label="Email" icon={Mail} error={errors.email} required>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => onChange("email", e.target.value)}
          className={cn("input", errors.email && "border-red-300 focus:ring-red-500")}
          placeholder="nama../..email.com"
          autoComplete="email"
        />
      </FormField>

      {/* Password */}
      <FormField id="password" label="Password" icon={Shield} error={errors.password} required>
        <>
          <PasswordInput
            id="password"
            value={password}
            onChange={(e) => onChange("password", e.target.value)}
            hasError={!!errors.password}
            placeholder="Minimal 8 karakter"
            autoComplete="new-password"
          />
          <PasswordStrengthBar password={password} />
        </>
      </FormField>

      {/* Konfirmasi password */}
      <FormField
        id="confirm_password"
        label="Konfirmasi Password"
        icon={Shield}
        error={errors.confirm_password}
        required
      >
        <div className="relative">
          <PasswordInput
            id="confirm_password"
            value={confirmPassword}
            onChange={(e) => onChange("confirm_password", e.target.value)}
            hasError={!!errors.confirm_password}
            placeholder="Ulangi password"
            autoComplete="new-password"
            className={passwordsMatch ? "pr-16" : ""}
          />
          {/* Match checkmark */}
          {passwordsMatch && (
            <CheckCircle2 className="absolute right-10 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500 pointer-events-none" />
          )}
        </div>
      </FormField>

      <button
        type="button"
        onClick={onNext}
        className="w-full btn-primary justify-center py-3"
      >
        Lanjut <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
