// RegisterStep1.tsx

"use client";

import { ArrowRight, Mail, Shield, User, CheckCircle2 } from "lucide-react";

import { FormField } from "../../components/auth/FormField";
import { PasswordInput } from "../../components/auth/PasswordInput";
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
 * Responsive:
 * - 320px+
 * - mobile
 * - tablet
 * - desktop
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
  const passwordsMatch =
    confirmPassword.length > 0 && password === confirmPassword;

  return (
    <div
      className="
        w-full
        min-w-0

        space-y-4
        sm:space-y-5

        animate-fade-in
      "
    >
      {/* Full Name */}
      <FormField
        id="full_name"
        label="Nama Lengkap"
        icon={User}
        error={errors.full_name}
        required
      >
        <input
          id="full_name"
          type="text"
          value={fullName}
          onChange={(e) => onChange("full_name", e.target.value)}
          placeholder="Masukkan nama lengkap"
          autoComplete="name"
          className={cn(
            `
            w-full
            min-w-0

            h-11
            sm:h-12

            rounded-2xl

            border
            border-slate-200

            bg-white

            px-4

            text-sm
            sm:text-base

            text-slate-900

            placeholder:text-slate-400

            outline-none

            transition-all
            duration-200

            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-100
            `,
            errors.full_name &&
              `
              border-red-300
              focus:border-red-500
              focus:ring-red-100
            `,
          )}
        />
      </FormField>

      {/* Email */}
      <FormField
        id="email"
        label="Email"
        icon={Mail}
        error={errors.email}
        required
      >
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => onChange("email", e.target.value)}
          placeholder="nama@email.com"
          autoComplete="email"
          className={cn(
            `
            w-full
            min-w-0

            h-11
            sm:h-12

            rounded-2xl

            border
            border-slate-200

            bg-white

            px-4

            text-sm
            sm:text-base

            text-slate-900

            placeholder:text-slate-400

            outline-none

            transition-all
            duration-200

            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-100
            `,
            errors.email &&
              `
              border-red-300
              focus:border-red-500
              focus:ring-red-100
            `,
          )}
        />
      </FormField>

      {/* Password */}
      <FormField
        id="password"
        label="Password"
        icon={Shield}
        error={errors.password}
        required
      >
        <div className="space-y-2">
          <PasswordInput
            id="password"
            value={password}
            onChange={(e) => onChange("password", e.target.value)}
            hasError={!!errors.password}
            placeholder="Minimal 8 karakter"
            autoComplete="new-password"
          />

          <PasswordStrengthBar password={password} />
        </div>
      </FormField>

      {/* Confirm Password */}
      <FormField
        id="confirm_password"
        label="Konfirmasi Password"
        icon={Shield}
        error={errors.confirm_password}
        required
      >
        <div className="relative w-full min-w-0">
          <PasswordInput
            id="confirm_password"
            value={confirmPassword}
            onChange={(e) => onChange("confirm_password", e.target.value)}
            hasError={!!errors.confirm_password}
            placeholder="Ulangi password"
            autoComplete="new-password"
            className={passwordsMatch ? "pr-20" : ""}
          />

          {/* Match Icon */}
          {passwordsMatch && (
            <CheckCircle2
              className="
                absolute

                right-12
                top-1/2
                -translate-y-1/2

                w-4
                h-4

                text-emerald-500

                pointer-events-none
              "
            />
          )}
        </div>
      </FormField>

      {/* Next Button */}
      <button
        type="button"
        onClick={onNext}
        className="
          w-full
          min-w-0

          inline-flex
          items-center
          justify-center
          gap-2

          h-11
          sm:h-12

          rounded-2xl

          px-4

          text-sm
          sm:text-base

          font-semibold
          text-white

          bg-gradient-to-r
          from-blue-600
          to-cyan-500

          shadow-lg
          shadow-blue-500/20

          transition-all
          duration-200

          hover:scale-[1.01]
          hover:shadow-xl
          hover:shadow-blue-500/30

          active:scale-[0.99]

          focus:outline-none
          focus:ring-4
          focus:ring-blue-100
        "
      >
        <span className="truncate">Lanjut</span>

        <ArrowRight
          className="
            w-4
            h-4
            shrink-0
          "
        />
      </button>
    </div>
  );
}
