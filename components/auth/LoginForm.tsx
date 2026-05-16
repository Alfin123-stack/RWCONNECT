// LoginForm.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail } from "lucide-react";
import { createClient } from "../../lib/supabase/client";
import { useToast } from "../../hooks/useToast";
import { FormField } from "../../components/auth/FormField";
import { PasswordInput } from "../../components/auth/PasswordInput";
import { SubmitButton } from "../../components/auth/SubmitButton";

/**
 * LoginForm
 * Responsive + mobile friendly
 */
export function LoginForm() {
  const router = useRouter();
  const { showToast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      showToast("error", "Periksa kembali", "Email dan password wajib diisi.");
      return;
    }

    try {
      setIsLoading(true);

      const supabase = createClient();

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        showToast("error", "Login Gagal", "Email atau password tidak tepat.");
        return;
      }

      showToast("success", "Selamat datang!", "Berhasil masuk ke RWConnect.");

      router.push("/dashboard");
      router.refresh();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="
        w-full
        space-y-4
        sm:space-y-5
      "
    >
      {/* Email */}
      <FormField id="email" label="Email" icon={Mail} required>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="nama@email.com"
          autoComplete="email"
          disabled={isLoading}
          className="
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

            outline-none

            transition-all
            duration-200

            placeholder:text-slate-400

            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-100

            disabled:opacity-60
            disabled:cursor-not-allowed
          "
        />
      </FormField>

      {/* Password */}
      <FormField
        id="password"
        label="Password"
        required
        labelRight={
          <button
            type="button"
            className="
              text-[11px]
              sm:text-xs

              text-blue-600
              hover:text-blue-800

              font-medium

              transition-colors

              whitespace-nowrap
            "
          >
            Lupa password?
          </button>
        }
      >
        <PasswordInput
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          autoComplete="current-password"
          disabled={isLoading}
        />
      </FormField>

      {/* Submit */}
      <div className="pt-2">
        <SubmitButton
          isLoading={isLoading}
          loadingLabel="Memproses..."
          label="Masuk ke RWConnect"
        />
      </div>
    </form>
  );
}
