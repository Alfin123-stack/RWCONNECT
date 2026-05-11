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

// ── Icon mapping lokal ─────────────────────────────────────────
// Disimpan di sini (Client Component), TIDAK di constants.ts,
// agar tidak melewati Server→Client boundary dan menyebabkan error serialisasi.
const ASPIRATION_CATEGORY_ICONS: Record<string, LucideIcon> = {
  infrastruktur: Construction,
  keamanan: Lock,
  kebersihan: Trash2,
  sosial: Handshake,
  administrasi: ClipboardList,
  lainnya: MapPin,
};

// ── Status options (lokal, tidak perlu di-export) ─────────────
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

interface AspirationFiltersProps {
  currentFilters: {
    category?: AspirationCategory;
    status?: AspirationStatus;
    search?: string;
  };
}

export function AspirationFilters({ currentFilters }: AspirationFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      const currentSearch = searchParams.get("search") ?? "";
      if (inputRef.current.value !== currentSearch) {
        inputRef.current.value = currentSearch;
      }
    }
  }, [searchParams]);

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

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        updateParam("search", val.trim() || undefined);
      }, 350);
    },
    [updateParam],
  );

  const clearSearch = () => {
    if (inputRef.current) inputRef.current.value = "";
    if (debounceRef.current) clearTimeout(debounceRef.current);
    updateParam("search", undefined);
  };

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

  const clearAll = () => {
    if (inputRef.current) inputRef.current.value = "";
    if (debounceRef.current) clearTimeout(debounceRef.current);
    startTransition(() => {
      router.replace(pathname);
    });
  };

  return (
    <div className="card p-4 space-y-3">
      {/* Search Bar */}
      <div className="relative">
        <Search
          className={cn(
            "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none transition-colors",
            isPending ? "text-blue-400 animate-pulse" : "text-slate-400",
          )}
        />
        <input
          ref={inputRef}
          type="text"
          placeholder="Cari aspirasi..."
          defaultValue={currentFilters.search ?? ""}
          onChange={handleSearchChange}
          className="w-full pl-9 pr-9 py-2.5 text-sm rounded-xl border border-slate-200
                     bg-white text-slate-800 placeholder:text-slate-400
                     focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400
                     transition-all duration-200"
        />
        {currentFilters.search && (
          <button
            onClick={clearSearch}
            title="Hapus pencarian"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full
                       text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Category & Status Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Filter:
        </span>

        {/* ── Kategori ── */}
        <div className="flex gap-1.5 flex-wrap">
          <button
            onClick={() => updateFilter("category", "")}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
              !currentFilters.category
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200",
            )}>
            <LayoutGrid className="w-3 h-3" />
            Semua
          </button>

          {ASPIRATION_CATEGORIES.map((cat) => {
            // ← icon di-resolve dari mapping lokal, bukan dari constants
            const Icon = ASPIRATION_CATEGORY_ICONS[cat.value] ?? MapPin;
            const isActive = currentFilters.category === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() =>
                  updateFilter("category", isActive ? "" : cat.value)
                }
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                  isActive
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200",
                )}>
                <Icon className="w-3 h-3" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* ── Status ── */}
        <div className="flex gap-1.5 flex-wrap">
          <button
            onClick={() => updateFilter("status", "")}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
              !currentFilters.status
                ? "bg-slate-800 text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200",
            )}>
            <ListFilter className="w-3 h-3" />
            Semua Status
          </button>

          {ASPIRATION_STATUSES.map((s) => {
            const Icon = s.icon;
            const isActive = currentFilters.status === s.value;
            return (
              <button
                key={s.value}
                onClick={() => updateFilter("status", isActive ? "" : s.value)}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                  isActive
                    ? s.activeClass
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200",
                )}>
                <Icon
                  className={cn(
                    "w-3 h-3",
                    s.value === "diproses" && isActive && "animate-spin",
                  )}
                />
                {s.label}
              </button>
            );
          })}
        </div>

        {/* Reset filter */}
        {hasActiveFilter && (
          <button
            onClick={clearAll}
            className="ml-auto inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs
                       font-semibold text-red-500 bg-red-50 hover:bg-red-100 transition-all">
            <X className="w-3 h-3" />
            Reset filter
          </button>
        )}
      </div>
    </div>
  );
}
