import { cn } from "../../utils";

interface SubmitButtonProps {
  isLoading: boolean;
  loadingLabel?: string;
  label: string;
  disabled?: boolean;
  className?: string;
  /** Icon di sebelah kiri label (saat tidak loading) */
  icon?: React.ReactNode;
}

function LoadingSpinner() {
  return (
    <svg
      className="w-4 h-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden>
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

/**
 * SubmitButton
 * Tombol submit dengan state loading bawaan.
 * Dipakai di LoginPage dan RegisterPage (step 3).
 */
export function SubmitButton({
  isLoading,
  loadingLabel = "Memproses...",
  label,
  disabled = false,
  className,
  icon,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading || disabled}
      className={cn(
        "w-full btn-primary justify-center py-3 text-base rounded-xl",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className,
      )}>
      {isLoading ? (
        <>
          <LoadingSpinner />
          {loadingLabel}
        </>
      ) : (
        <>
          {icon}
          {label}
        </>
      )}
    </button>
  );
}
