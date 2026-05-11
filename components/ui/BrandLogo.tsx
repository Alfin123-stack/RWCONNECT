"use client";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
}

export function BrandLogo({ size = "md" }: BrandLogoProps) {
  const iconSize =
    size === "sm" ? "w-8 h-8" : size === "lg" ? "w-12 h-12" : "w-10 h-10";
  const textSize =
    size === "sm" ? "text-lg" : size === "lg" ? "text-2xl" : "text-xl";

  return (
    <div className="flex items-center gap-3">
      <div
        className={`${iconSize} rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30`}>
        <span className="text-white font-bold text-sm">RW</span>
      </div>
      <span className={`text-white font-bold ${textSize}`}>Connect</span>
    </div>
  );
}
