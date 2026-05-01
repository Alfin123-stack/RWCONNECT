import { cn } from "../../utils";

// ── Strength calculation (pure function, reusable) ────────────
export interface PasswordStrength {
  score: number; // 0–5
  label: string;
  color: string; // Tailwind bg-* class
  textColor: string; // Tailwind text-* class
}

export function getPasswordStrength(password: string): PasswordStrength {
  if (!password) return { score: 0, label: "", color: "", textColor: "" };

  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1)
    return {
      score,
      label: "Sangat Lemah",
      color: "bg-red-500",
      textColor: "text-red-600",
    };
  if (score === 2)
    return {
      score,
      label: "Lemah",
      color: "bg-orange-500",
      textColor: "text-orange-600",
    };
  if (score === 3)
    return {
      score,
      label: "Sedang",
      color: "bg-yellow-500",
      textColor: "text-yellow-600",
    };
  if (score === 4)
    return {
      score,
      label: "Kuat",
      color: "bg-blue-500",
      textColor: "text-blue-600",
    };
  return {
    score,
    label: "Sangat Kuat",
    color: "bg-emerald-500",
    textColor: "text-emerald-600",
  };
}

// ── Visual component ──────────────────────────────────────────
interface PasswordStrengthBarProps {
  password: string;
}

const TOTAL_SEGMENTS = 5;

/**
 * PasswordStrengthBar
 * Bar 5 segmen yang menunjukkan kekuatan password secara visual.
 * Hanya render jika password tidak kosong.
 * Dipakai di RegisterPage field password.
 */
export function PasswordStrengthBar({ password }: PasswordStrengthBarProps) {
  const strength = getPasswordStrength(password);

  if (!password) return null;

  return (
    <div className="mt-2 space-y-1">
      {/* Segments */}
      <div className="flex gap-1">
        {Array.from({ length: TOTAL_SEGMENTS }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full transition-all duration-300",
              i < strength.score ? strength.color : "bg-slate-200",
            )}
          />
        ))}
      </div>
      {/* Label */}
      <p className="text-xs text-slate-500">
        Kekuatan:{" "}
        <span className={cn("font-semibold", strength.textColor)}>
          {strength.label}
        </span>
      </p>
    </div>
  );
}
