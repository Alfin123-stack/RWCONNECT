"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../utils";

interface PaginationProps {
  current: number;
  total: number;
  limit: number;
  basePath: string;
}

export function Pagination({
  current,
  total,
  limit,
  basePath,
}: PaginationProps) {
  const totalPages = Math.ceil(total / limit);
  if (totalPages <= 1) return null;

  const getHref = (page: number) => `${basePath}?page=${page}`;

  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-xs text-slate-500">
        Menampilkan {Math.min((current - 1) * limit + 1, total)}–
        {Math.min(current * limit, total)} dari {total} data
      </p>
      <div className="flex items-center gap-1">
        <Link
          href={getHref(current - 1)}
          className={cn(
            "p-2 rounded-lg transition-colors",
            current <= 1
              ? "text-slate-300 pointer-events-none"
              : "hover:bg-slate-100 text-slate-600",
          )}
          aria-disabled={current <= 1}>
          <ChevronLeft className="w-4 h-4" />
        </Link>
        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
          const page = i + 1;
          return (
            <Link
              key={page}
              href={getHref(page)}
              className={cn(
                "w-8 h-8 flex items-center justify-center rounded-lg text-xs font-semibold transition-all",
                current === page
                  ? "bg-blue-600 text-white shadow-sm"
                  : "hover:bg-slate-100 text-slate-600",
              )}>
              {page}
            </Link>
          );
        })}
        <Link
          href={getHref(current + 1)}
          className={cn(
            "p-2 rounded-lg transition-colors",
            current >= totalPages
              ? "text-slate-300 pointer-events-none"
              : "hover:bg-slate-100 text-slate-600",
          )}
          aria-disabled={current >= totalPages}>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
