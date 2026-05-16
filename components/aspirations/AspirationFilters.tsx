"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

import { useCallback, useTransition, useRef, useEffect } from "react";

import {
  Search,
  X,
  Loader2,
  LayoutGrid,
  ListFilter,
  Clock,
  CheckCircle2,
  XCircle,
  Construction,
  Lock,
  Trash2,
  Handshake,
  ClipboardList,
  MapPin,
  type LucideIcon,
} from "lucide-react";

import type { AspirationCategory, AspirationStatus } from "../../types";

import { ASPIRATION_CATEGORIES } from "../../constants";

import { cn } from "../../utils";

/* ─────────────────────────────────────────────
 * ICONS
 * ───────────────────────────────────────────── */
const ASPIRATION_CATEGORY_ICONS: Record<string, LucideIcon> = {
  infrastruktur: Construction,
  keamanan: Lock,
  kebersihan: Trash2,
  sosial: Handshake,
  administrasi: ClipboardList,
  lainnya: MapPin,
};

const ASPIRATION_STATUSES: {
  value: AspirationStatus;
  label: string;
  icon: LucideIcon;
  activeClass: string;
}[] = [
  {
    value: "baru",
    label: "Baru",
    icon: Clock,
    activeClass: "bg-slate-800 text-white shadow-sm",
  },
  {
    value: "diproses",
    label: "Diproses",
    icon: Loader2,
    activeClass: "bg-amber-500 text-white shadow-sm",
  },
  {
    value: "selesai",
    label: "Selesai",
    icon: CheckCircle2,
    activeClass: "bg-green-600 text-white shadow-sm",
  },
  {
    value: "ditolak",
    label: "Ditolak",
    icon: XCircle,
    activeClass: "bg-red-500 text-white shadow-sm",
  },
];

/* ─────────────────────────────────────────────
 * TYPES
 * ───────────────────────────────────────────── */
interface AspirationFiltersProps {
  currentFilters: {
    category?: AspirationCategory;
    status?: AspirationStatus;
    search?: string;
  };
}

/* ─────────────────────────────────────────────
 * COMPONENT
 * ───────────────────────────────────────────── */
export function AspirationFilters({ currentFilters }: AspirationFiltersProps) {
  const router = useRouter();

  const pathname = usePathname();

  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();

  const inputRef = useRef<HTMLInputElement>(null);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ─────────────────────────────────────────
   * SYNC INPUT
   * ───────────────────────────────────────── */
  useEffect(() => {
    if (inputRef.current) {
      const currentSearch = searchParams.get("search") ?? "";

      if (inputRef.current.value !== currentSearch) {
        inputRef.current.value = currentSearch;
      }
    }
  }, [searchParams]);

  /* ─────────────────────────────────────────
   * UPDATE PARAM
   * ───────────────────────────────────────── */
  const updateParam = useCallback(
    (key: string, value: string | undefined) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }

      params.delete("page");

      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`);
      });
    },
    [searchParams, pathname, router],
  );

  /* ─────────────────────────────────────────
   * SEARCH
   * ───────────────────────────────────────── */
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        updateParam("search", val.trim() || undefined);
      }, 350);
    },
    [updateParam],
  );

  const clearSearch = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    updateParam("search", undefined);
  };

  /* ─────────────────────────────────────────
   * FILTER
   * ───────────────────────────────────────── */
  const updateFilter = useCallback(
    (key: string, value: string) => {
      updateParam(key, value || undefined);
    },
    [updateParam],
  );

  const hasActiveFilter =
    !!currentFilters.category ||
    !!currentFilters.status ||
    !!currentFilters.search;

  /* ─────────────────────────────────────────
   * CLEAR
   * ───────────────────────────────────────── */
  const clearAll = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    startTransition(() => {
      router.replace(pathname);
    });
  };

  return (
    <div
      className="
        overflow-hidden

        rounded-3xl
        border border-slate-100

        bg-white

        p-3 sm:p-4 lg:p-5

        shadow-sm

        space-y-4
      ">
      {/* =====================================
       * SEARCH
       * ===================================== */}
      <div className="relative">
        <Search
          className={cn(
            `
              pointer-events-none

              absolute left-3 top-1/2
              -translate-y-1/2

              h-4 w-4

              transition-colors
            `,
            isPending ? "animate-pulse text-blue-400" : "text-slate-400",
          )}
        />

        <input
          ref={inputRef}
          type="text"
          placeholder="Cari aspirasi..."
          defaultValue={currentFilters.search ?? ""}
          onChange={handleSearchChange}
          className="
            h-11 sm:h-12
            w-full

            rounded-2xl
            border border-slate-200

            bg-white

            pl-10
            pr-10

            text-sm
            text-slate-800

            placeholder:text-slate-400

            outline-none

            transition-all

            focus:border-blue-400
            focus:ring-2
            focus:ring-blue-300
          "
        />

        {currentFilters.search && (
          <button
            onClick={clearSearch}
            title="Hapus pencarian"
            className="
              absolute right-3 top-1/2
              -translate-y-1/2

              flex h-7 w-7
              items-center justify-center

              rounded-full

              text-slate-400

              transition-all

              hover:bg-slate-100
              hover:text-slate-700
            ">
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* =====================================
       * HEADER
       * ===================================== */}
      <div
        className="
          flex flex-col gap-2

          sm:flex-row
          sm:items-center
          sm:justify-between
        ">
        <span
          className="
            text-[11px]
            font-semibold
            uppercase
            tracking-wider

            text-slate-500
          ">
          Filter Aspirasi
        </span>

        {hasActiveFilter && (
          <button
            onClick={clearAll}
            className="
              inline-flex items-center justify-center gap-1

              rounded-xl

              bg-red-50

              px-3 py-2

              text-xs
              font-semibold

              text-red-500

              transition-all

              hover:bg-red-100

              w-full sm:w-auto
            ">
            <X className="h-3 w-3" />
            Reset Filter
          </button>
        )}
      </div>

      {/* =====================================
       * MOBILE DROPDOWN
       * ===================================== */}
      <div className="grid gap-3 sm:hidden">
        {/* CATEGORY */}
        <div className="space-y-1.5">
          <p
            className="
              text-[11px]
              font-semibold
              uppercase
              tracking-wide

              text-slate-400
            ">
            Kategori
          </p>

          <select
          t
            value={currentFilters.category ?? ""}
            onChange={(e) => updateFilter("category", e.target.value)}
            className="
              h-11
              w-full

              rounded-2xl
              border border-slate-200

              bg-white

              px-3

              text-sm
              text-slate-700

              outline-none

              transition-all

              focus:ring-2
              focus:ring-blue-200
            ">
            <option value="">Semua Kategori</option>

            {ASPIRATION_CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* STATUS */}
        <div className="space-y-1.5">
          <p
            className="
              text-[11px]
              font-semibold
              uppercase
              tracking-wide

              text-slate-400
            ">
            Status
          </p>

          <select
            title="Filter berdasarkan status aspirasi"
            value={currentFilters.status ?? ""}
            onChange={(e) => updateFilter("status", e.target.value)}
            className="
              h-11
              w-full

              rounded-2xl
              border border-slate-200

              bg-white

              px-3

              text-sm
              text-slate-700

              outline-none

              transition-all

              focus:ring-2
              focus:ring-blue-200
            ">
            <option value="">Semua Status</option>

            {ASPIRATION_STATUSES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* =====================================
       * DESKTOP/TABLET CHIP FILTERS
       * ===================================== */}
      <div className="hidden sm:block space-y-4">
        {/* CATEGORY */}
        <div className="space-y-2">
          <p
            className="
              text-[11px]
              font-semibold
              uppercase
              tracking-wide

              text-slate-400
            ">
            Kategori
          </p>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => updateFilter("category", "")}
              className={cn(
                `
                  inline-flex items-center gap-1.5

                  rounded-xl

                  px-3 py-2

                  text-xs
                  font-semibold

                  transition-all
                `,
                !currentFilters.category
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200",
              )}>
              <LayoutGrid className="h-3 w-3" />
              Semua
            </button>

            {ASPIRATION_CATEGORIES.map((cat) => {
              const Icon = ASPIRATION_CATEGORY_ICONS[cat.value] ?? MapPin;

              const isActive = currentFilters.category === cat.value;

              return (
                <button
                  key={cat.value}
                  onClick={() =>
                    updateFilter("category", isActive ? "" : cat.value)
                  }
                  className={cn(
                    `
                        inline-flex items-center gap-1.5

                        rounded-xl

                        px-3 py-2

                        text-xs
                        font-semibold

                        transition-all
                      `,
                    isActive
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200",
                  )}>
                  <Icon className="h-3 w-3" />

                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* STATUS */}
        <div className="space-y-2">
          <p
            className="
              text-[11px]
              font-semibold
              uppercase
              tracking-wide

              text-slate-400
            ">
            Status
          </p>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => updateFilter("status", "")}
              className={cn(
                `
                  inline-flex items-center gap-1.5

                  rounded-xl

                  px-3 py-2

                  text-xs
                  font-semibold

                  transition-all
                `,
                !currentFilters.status
                  ? "bg-slate-800 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200",
              )}>
              <ListFilter className="h-3 w-3" />
              Semua Status
            </button>

            {ASPIRATION_STATUSES.map((s) => {
              const Icon = s.icon;

              const isActive = currentFilters.status === s.value;

              return (
                <button
                  key={s.value}
                  onClick={() =>
                    updateFilter("status", isActive ? "" : s.value)
                  }
                  className={cn(
                    `
                        inline-flex items-center gap-1.5

                        rounded-xl

                        px-3 py-2

                        text-xs
                        font-semibold

                        transition-all
                      `,
                    isActive
                      ? s.activeClass
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200",
                  )}>
                  <Icon
                    className={cn(
                      "h-3 w-3",
                      s.value === "diproses" && isActive && "animate-spin",
                    )}
                  />

                  {s.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
