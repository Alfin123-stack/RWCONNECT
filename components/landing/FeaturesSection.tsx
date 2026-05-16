// ============================================================
// FILE: components/landing/FeaturesSection.tsx  — Responsive fix
// ============================================================
import { Sparkles } from "lucide-react";
import { FeatureCard } from "./FeatureCard";
import { FEATURES } from "../../constants";

export function FeaturesSection() {
  return (
    <section
      id="fitur"
      className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6"
      aria-labelledby="fitur-title"
    >
      <div className="text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-500/30 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-blue-300 text-xs font-medium">Fitur Utama</span>
        </div>

        <h2
          id="fitur-title"
          className="text-2xl sm:text-3xl xl:text-5xl font-bold mb-4"
        >
          Semua yang dibutuhkan warga,{" "}
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            ada di sini
          </span>
        </h2>

        <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          Dirancang sederhana agar siapa pun bisa langsung pakai — tanpa perlu
          pelatihan teknis.
        </p>
      </div>

      {/*
        320px  → 1 column
        sm 640px → 2 columns
      */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
        role="list"
      >
        {FEATURES.map((f) => (
          <FeatureCard key={f.title} {...f} />
        ))}
      </div>
    </section>
  );
}
