// components/ui/BackButton.tsx
"use client";

import { ArrowLeft } from "lucide-react";

export function BackButton() {
  return (
    <button
      onClick={() => history.back()}
      className="btn-ghost inline-flex items-center gap-2 w-full sm:w-auto justify-center text-sm text-slate-500 hover:text-slate-800">
      <ArrowLeft className="w-4 h-4" />
      Kembali
    </button>
  );
}
