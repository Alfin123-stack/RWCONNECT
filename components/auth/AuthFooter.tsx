import Link from "next/link";

interface AuthFooterProps {
  text: string;
  linkLabel: string;
  linkHref: string;
}

/**
 * AuthFooter
 * Baris "Belum punya akun? Daftar di sini" atau sebaliknya.
 * Dipakai di LoginPage dan RegisterPage.
 */
export function AuthFooter({ text, linkLabel, linkHref }: AuthFooterProps) {
  return (
    <div className="mt-8 pt-6 border-t border-slate-200 space-y-4">
      <p className="text-slate-500 text-sm text-center">
        {text}{" "}
        <Link
          href={linkHref}
          className="text-blue-600 font-semibold hover:text-blue-800 transition-colors"
        >
          {linkLabel}
        </Link>
      </p>
      <div className="p-3 rounded-xl bg-blue-50 border border-blue-100">
        <p className="text-xs text-blue-700 text-center">
          🔒 Data kamu aman dan terenkripsi. RWConnect tidak pernah membagikan
          informasi pribadi kamu.
        </p>
      </div>
    </div>
  );
}
