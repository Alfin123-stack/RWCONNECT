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

  /* =========================================
   * SMART PAGINATION
   * ========================================= */
  const generatePages = () => {
    const pages: (number | "...")[] = [];

    // mobile friendly
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }

      return pages;
    }

    // awal
    if (current <= 3) {
      pages.push(1, 2, 3, 4, "...", totalPages);
    }

    // tengah
    else if (current < totalPages - 2) {
      pages.push(
        1,
        "...",
        current - 1,
        current,
        current + 1,
        "...",
        totalPages,
      );
    }

    // akhir
    else {
      pages.push(
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      );
    }

    return pages;
  };

  const pages = generatePages();

  const startData = Math.min((current - 1) * limit + 1, total);

  const endData = Math.min(current * limit, total);

  return (
    <div
      className="
        mt-4

        flex flex-col gap-3
        sm:flex-row sm:items-center sm:justify-between

        rounded-2xl
        border border-slate-100

        bg-white

        px-3 sm:px-4
        py-3

        shadow-sm
      ">
      {/* =====================================
       * INFO
       * ===================================== */}
      <p
        className="
          text-center
          text-[11px] sm:text-xs
          leading-relaxed
          text-slate-500

          sm:text-left
        ">
        Menampilkan{" "}
        <span className="font-semibold text-slate-700">{startData}</span>–
        <span className="font-semibold text-slate-700">{endData}</span> dari{" "}
        <span className="font-semibold text-slate-700">{total}</span> data
      </p>

      {/* =====================================
       * PAGINATION
       * ===================================== */}
      <div
        className="
          flex items-center justify-center
          gap-1

          overflow-x-auto
          scrollbar-hide
        ">
        {/* PREV */}
        <Link
          href={current > 1 ? getHref(current - 1) : "#"}
          aria-disabled={current <= 1}
          className={cn(
            `
              flex h-9 w-9 shrink-0
              items-center justify-center

              rounded-xl

              transition-all
            `,
            current <= 1
              ? "pointer-events-none text-slate-300"
              : `
                  text-slate-600
                  hover:bg-slate-100
                  active:scale-95
                `,
          )}>
          <ChevronLeft className="h-4 w-4" />
        </Link>

        {/* PAGE ITEMS */}
        {pages.map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`dots-${index}`}
                className="
                  flex h-9 min-w-[36px]
                  items-center justify-center

                  text-xs
                  font-semibold
                  text-slate-400
                ">
                ...
              </span>
            );
          }

          const active = current === page;

          return (
            <Link
              key={page}
              href={getHref(page)}
              className={cn(
                `
                  flex h-9 min-w-[36px]
                  shrink-0
                  items-center justify-center

                  rounded-xl

                  px-2

                  text-[11px] sm:text-xs
                  font-semibold

                  transition-all
                `,
                active
                  ? `
                      bg-blue-600
                      text-white
                      shadow-sm
                    `
                  : `
                      text-slate-600
                      hover:bg-slate-100
                      active:scale-95
                    `,
              )}>
              {page}
            </Link>
          );
        })}

        {/* NEXT */}
        <Link
          href={current < totalPages ? getHref(current + 1) : "#"}
          aria-disabled={current >= totalPages}
          className={cn(
            `
              flex h-9 w-9 shrink-0
              items-center justify-center

              rounded-xl

              transition-all
            `,
            current >= totalPages
              ? "pointer-events-none text-slate-300"
              : `
                  text-slate-600
                  hover:bg-slate-100
                  active:scale-95
                `,
          )}>
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
