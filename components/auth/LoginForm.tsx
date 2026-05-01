"use client";

import { useState }      from "react";
import { useRouter }     from "next/navigation";
import { Mail }          from "lucide-react";
import { createClient }  from "@/lib/supabase/client";
import { useToast }      from "@/hooks/useToast";
import { FormField }     from "@/components/auth/FormField";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { SubmitButton }  from "@/components/auth/SubmitButton";

/**
 * LoginForm
 * Komponen form login yang mengurus state, validasi,
 * dan autentikasi Supabase secara mandiri.
 */
export function LoginForm() {
  const router = useRouter();
  const { showToast } = useToast();

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      showToast("error", "Periksa kembali", "Email dan password wajib diisi.");
      return;
    }

    setIsLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      showToast("error", "Login Gagal", "Email atau password tidak tepat.");
      setIsLoading(false);
      return;
    }

    showToast("success", "Selamat datang!", "Berhasil masuk ke RWConnect.");
    router.push("/dashboard");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Email */}
      <FormField
        id="email"
        label="Email"
        icon={Mail}
        required
      >
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          placeholder="nama@email.com"
          autoComplete="email"
          disabled={isLoading}
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
            className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
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
      <SubmitButton
        isLoading={isLoading}
        loadingLabel="Memproses..."
        label="Masuk ke RWConnect"
      />
    </form>
  );
}
