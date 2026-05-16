// FormField.tsx

import { cn } from "../../utils";

interface FormFieldProps {
  id: string;
  label: string;

  /** Icon di sebelah label */
  icon?: React.ElementType;

  error?: string;

  /** Field wajib */
  required?: boolean;

  children: React.ReactNode;

  /** Elemen kanan label */
  labelRight?: React.ReactNode;
}

/**
 * FormField
 * Fully responsive
 */
export function FormField({
  id,
  label,
  icon: Icon,
  error,
  required,
  children,
  labelRight,
}: FormFieldProps) {
  return (
    <div className="w-full min-w-0">
      {/* Label Row */}
      <div
        className={cn(
          `
          mb-2
          flex
          items-center
          gap-2
          `,
          labelRight ? "justify-between" : "justify-start",
        )}
      >
        {/* Left Label */}
        <label
          htmlFor={id}
          className="
            min-w-0

            flex
            items-center
            gap-1.5

            text-sm
            font-semibold
            text-slate-700

            break-words
          "
        >
          {Icon && (
            <Icon
              className="
                w-3.5
                h-3.5
                text-slate-500
                shrink-0
              "
            />
          )}

          <span className="truncate">{label}</span>

          {required && <span className="text-red-500 shrink-0">*</span>}
        </label>

        {/* Right Label */}
        {labelRight && <div className="shrink-0">{labelRight}</div>}
      </div>

      {/* Input */}
      <div className="w-full min-w-0">{children}</div>

      {/* Error */}
      {error && (
        <p
          className="
            mt-2

            flex
            items-start
            gap-2

            text-xs
            font-medium
            text-red-600

            leading-relaxed
          "
        >
          <span
            className="
              mt-[1px]

              w-4
              h-4

              rounded-full
              bg-red-100

              flex
              items-center
              justify-center

              text-[10px]
              font-bold

              shrink-0
            "
          >
            !
          </span>

          <span className="break-words">{error}</span>
        </p>
      )}
    </div>
  );
}
