"use client";

const AVATAR_INITIALS = ["B", "S", "A", "R"] as const;
const AVATAR_COLORS = [
  "bg-blue-500",
  "bg-cyan-500",
  "bg-emerald-500",
  "bg-purple-500",
] as const;

export function AvatarStack() {
  return (
    <div className="flex -space-x-2">
      {AVATAR_INITIALS.map((initial, i) => (
        <div
          key={initial}
          className={`w-8 h-8 rounded-full border-2 border-slate-800 flex items-center justify-center text-xs font-bold text-white ${AVATAR_COLORS[i]}`}>
          {initial}
        </div>
      ))}
    </div>
  );
}
