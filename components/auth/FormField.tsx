import { cn } from "../../utils";

interface FormFieldProps {
  id: string;
  label: string;
  /** Icon yang tampil di sebelah label */
  icon?: React.ElementType;
  error?: string;
  /** Tandai field sebagai wajib diisi */
  required?: boolean;
  children: React.ReactNode;
  /** Elemen opsional di sebelah kanan label (misal: link "Lupa password?") */
  labelRight?: React.ReactNode;
}

/**
 * FormField
 * Wrapper label + children + pesan error.
 * Dipakai di LoginPage (email, password) dan RegisterPage
 * (semua field input).
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
    <div>
      {/* Label row */}
      <div
        className={cn(
          "flex items-center mb-1.5",
          labelRight ? "justify-between" : "",
        )}>
        <label
          htmlFor={id}
          className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
          {Icon && <Icon className="w-3.5 h-3.5 text-slate-500" />}
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        {labelRight}
      </div>

      {/* Input slot */}
      {children}

      {/* Error message */}
      {error && (
        <p className="mt-1.5 text-xs text-red-600 font-medium flex items-center gap-1">
          <span className="w-3.5 h-3.5 rounded-full bg-red-100 flex items-center justify-center text-[10px] font-bold flex-shrink-0">
            !
          </span>
          {error}
        </p>
      )}
    </div>
  );
}
