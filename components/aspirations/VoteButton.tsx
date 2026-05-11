"use client";

import { ThumbsUp } from "lucide-react";

interface VoteButtonProps {
  count: number;
  voted: boolean;
  onToggle: () => void;
}

export function VoteButton({ count, voted, onToggle }: VoteButtonProps) {
  return (
    <button
      onClick={onToggle}
      title={voted ? "Batalkan dukungan" : "Dukung aspirasi ini"}
      className={`
        ml-auto group relative flex items-center gap-0 rounded-full
        border-2 overflow-hidden transition-all duration-300 flex-shrink-0
        ${
          voted
            ? "border-blue-400 bg-blue-500 text-white shadow-sm shadow-blue-200"
            : "border-slate-200 bg-white text-slate-500 hover:border-blue-300 hover:text-blue-500"
        }
      `}>
      <span
        className={`flex items-center justify-center w-8 h-7 transition-all duration-300 ${voted ? "text-white" : "text-slate-400 group-hover:text-blue-500"}`}>
        <ThumbsUp
          className={`w-3.5 h-3.5 transition-all duration-300 ${voted ? "fill-white scale-110" : "group-hover:scale-110"}`}
        />
      </span>
      <span
        className={`w-px h-4 transition-colors duration-300 ${voted ? "bg-blue-400" : "bg-slate-200 group-hover:bg-blue-200"}`}
      />
      <span
        className={`flex items-center gap-1 px-2.5 h-7 text-xs font-bold transition-all duration-300 ${voted ? "text-white" : "text-slate-600 group-hover:text-blue-600"}`}>
        <span className="tabular-nums">{count}</span>
        <span
          className={`hidden sm:inline transition-all duration-300 font-semibold ${voted ? "text-blue-100" : "text-slate-400 group-hover:text-blue-400"}`}>
          {voted ? "Didukung" : "Dukung"}
        </span>
      </span>
    </button>
  );
}
