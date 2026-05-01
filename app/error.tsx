"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="text-5xl mb-4">⚠️</div>
        <h2 className="text-xl font-display font-bold text-slate-900 mb-2">
          Terjadi Kesalahan
        </h2>
        <p className="text-slate-500 text-sm mb-6">
          Maaf, terjadi kesalahan saat memuat halaman ini. Silakan coba lagi
          atau hubungi pengurus jika masalah berlanjut.
        </p>
        <button onClick={reset} className="btn-primary">
          Coba Lagi
        </button>
      </div>
    </div>
  );
}
