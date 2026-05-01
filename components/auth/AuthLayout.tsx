import { cn } from "@/utils";
import { AuthBrandPanel } from "./AuthBrandPanel";

interface AuthLayoutProps {
  /** Props diteruskan ke AuthBrandPanel */
  panel: React.ComponentProps<typeof AuthBrandPanel>;
  /** Konten form (right panel) */
  children: React.ReactNode;
  /** Extra className untuk right panel */
  rightClassName?: string;
}

/**
 * AuthLayout
 * Wrapper dua kolom: kiri = brand panel, kanan = form/content.
 * Dipakai oleh LoginPage dan RegisterPage.
 */
export function AuthLayout({ panel, children, rightClassName }: AuthLayoutProps) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left brand panel */}
      <AuthBrandPanel {...panel} />

      {/* Right content panel */}
      <div
        className={cn(
          "flex items-center justify-center p-6 lg:p-12 bg-slate-50 overflow-y-auto",
          rightClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}
