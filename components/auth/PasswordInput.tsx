"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/utils";

interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  hasError?: boolean;
  /** Tampilkan ikon match (✓) saat nilai cocok dengan passwordnya */
  showMatchIcon?: boolean;
}

/**
 * PasswordInput
 * Input tipe password dengan toggle show/hide bawaan.
 * Dipakai di LoginPage (field password) dan RegisterPage
 * (field password + konfirmasi password).
 */
export function PasswordInput({
  hasError = false,
  showMatchIcon = false,
  className,
  ...props
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        {...props}
        type={visible ? "text" : "password"}
        className={cn(
          "input",
          showMatchIcon ? "pr-16" : "pr-11",
          hasError && "border-red-300 focus:ring-red-500",
          className,
        )}
      />

      {/* Show/hide toggle */}
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        tabIndex={-1}
        aria-label={visible ? "Sembunyikan password" : "Tampilkan password"}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
      >
        {visible ? (
          <EyeOff className="w-4 h-4" />
        ) : (
          <Eye className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}
