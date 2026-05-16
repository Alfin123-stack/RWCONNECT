// PasswordInput.tsx

"use client";

import { useState } from "react";
import { Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { cn } from "../../utils";

interface PasswordInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  hasError?: boolean;

  /** Tampilkan icon centang */
  showMatchIcon?: boolean;
}

/**
 * PasswordInput
 * Responsive password field
 * Support:
 * - show/hide password
 * - error state
 * - match icon
 */
export function PasswordInput({
  hasError = false,
  showMatchIcon = false,
  className,
  ...props
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative w-full min-w-0">
      {/* Input */}
      <input
        {...props}
        type={visible ? "text" : "password"}
        className={cn(
          `
          w-full
          min-w-0

          h-11
          sm:h-12

          rounded-2xl

          border
          bg-white

          px-4

          text-sm
          sm:text-base
          text-slate-900

          placeholder:text-slate-400

          outline-none

          transition-all
          duration-200

          disabled:cursor-not-allowed
          disabled:opacity-60

          focus:ring-4

          `,
          hasError
            ? `
              border-red-300
              focus:border-red-500
              focus:ring-red-100
            `
            : `
              border-slate-200
              focus:border-blue-500
              focus:ring-blue-100
            `,
          showMatchIcon ? "pr-20" : "pr-12",
          className,
        )}
      />

      {/* Right Actions */}
      <div
        className="
          absolute
          right-3
          top-1/2
          -translate-y-1/2

          flex
          items-center
          gap-2
        "
      >
        {/* Match Icon */}
        {showMatchIcon && (
          <CheckCircle2
            className="
              w-4
              h-4
              text-emerald-500
              shrink-0
            "
          />
        )}

        {/* Toggle Password */}
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Sembunyikan password" : "Tampilkan password"}
          className="
            flex
            items-center
            justify-center

            text-slate-400
            hover:text-slate-600

            transition-colors
            duration-200

            shrink-0
          "
        >
          {visible ? (
            <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
          ) : (
            <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
          )}
        </button>
      </div>
    </div>
  );
}
