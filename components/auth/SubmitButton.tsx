// SubmitButton.tsx

import { cn } from "../../utils";

interface SubmitButtonProps {
  isLoading: boolean;

  loadingLabel?: string;

  label: string;

  disabled?: boolean;

  className?: string;

  /** Optional left icon */
  icon?: React.ReactNode;
}

/**
 * Loading Spinner
 */
function LoadingSpinner() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="
        w-4
        h-4
        sm:w-5
        sm:h-5
        animate-spin
        shrink-0
      ">
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        className="opacity-25"
      />

      <path
        fill="currentColor"
        className="opacity-75"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

/**
 * SubmitButton
 * Fully responsive
 * Safe for 320px+
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
        `
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

        disabled:cursor-not-allowed
        disabled:opacity-60
        disabled:hover:scale-100

        overflow-hidden
        `,
        className,
      )}>
      {isLoading ? (
        <>
          <LoadingSpinner />

          <span
            className="
              truncate
              whitespace-nowrap
            ">
            {loadingLabel}
          </span>
        </>
      ) : (
        <>
          {icon && <span className="shrink-0">{icon}</span>}

          <span
            className="
              truncate
              whitespace-nowrap
            ">
            {label}
          </span>
        </>
      )}
    </button>
  );
}
