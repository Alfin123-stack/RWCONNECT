// AuthLayout.tsx

import { cn } from "../../utils";
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
 * Responsive layout:
 * - Mobile  : single column
 * - Tablet+ : two columns
 */
export function AuthLayout({
  panel,
  children,
  rightClassName,
}: AuthLayoutProps) {
  return (
    <div
      className="
        min-h-screen
        w-full
        overflow-x-hidden
        bg-slate-50
        lg:grid
        lg:grid-cols-2
      "
    >
      {/* Left Brand Panel */}
      <AuthBrandPanel {...panel} />

      {/* Right Content */}
      <div
        className={cn(
          `
          flex
          min-w-0
          items-center
          justify-center
          px-4
          py-6
          sm:px-6
          md:px-8
          lg:px-12
          lg:py-10
          overflow-y-auto
          `,
          rightClassName,
        )}
      >
        <div className="w-full max-w-md min-w-0">{children}</div>
      </div>
    </div>
  );
}
