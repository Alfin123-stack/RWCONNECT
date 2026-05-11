"use client";

export function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-blue-600/20 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-cyan-500/15 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-800/20 blur-2xl" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:48px_48px]" />
    </div>
  );
}
