"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useTransition, useRef, useEffect } from "react";
import {
  Search,
  X,
  LayoutGrid,
  Zap,
  CalendarDays,
  HeartPulse,
  Shield,
  Users,
  Megaphone,
  TrendingUp,
  Bell,
  MessageSquareHeart,
  type LucideIcon,
} from "lucide-react";
import type { AnnouncementCategory, AnnouncementPriority } from "../../types";
import {
  ANNOUNCEMENT_CATEGORIES,
  ANNOUNCEMENT_PRIORITIES,
} from "../../constants";
import { cn } from "../../utils";

// ── Icon mapping lokal — kategori ────────────────────────────
// Disimpan di sini (Client Component), TIDAK di constants.ts,
// agar tidak melewati Server→Client boundary dan menyebabkan error serialisasi.
const ANNOUNCEMENT_CATEGORY_ICONS: Record<string, LucideIcon> = {
  penting: Zap,
  kegiatan: CalendarDays,
  kesehatan: HeartPulse,
  keamanan: Shield,
  sosial: Users,
  umum: Megaphone,
};

// ── Icon mapping lokal — prioritas ───────────────────────────
const ANNOUNCEMENT_PRIORITY_ICONS: Record<string, LucideIcon> = {
  tinggi: TrendingUp,
  sedang: Bell,
  rendah: MessageSquareHeart,
};

interface AnnouncementFiltersProps {
  currentFilters: {
    category?: AnnouncementCategory;
    priority?: AnnouncementPriority;
    search?: string;
  };
}

export function AnnouncementFilters({
  currentFilters,
}: AnnouncementFiltersProps) {
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
          placeholder="Cari pengumuman..."
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

      {/* Category & Priority Filters */}
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
          {ANNOUNCEMENT_CATEGORIES.map((cat) => {
            // ← icon di-resolve dari mapping lokal, bukan dari constants
            const Icon = ANNOUNCEMENT_CATEGORY_ICONS[cat.value] ?? Megaphone;
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

        {/* ── Prioritas ── */}
        <div className="flex gap-1.5 flex-wrap">
          {ANNOUNCEMENT_PRIORITIES.map((p) => {
            // ← icon di-resolve dari mapping lokal, bukan dari constants
            const Icon = ANNOUNCEMENT_PRIORITY_ICONS[p.value] ?? Bell;
            const isActive = currentFilters.priority === p.value;
            return (
              <button
                key={p.value}
                onClick={() =>
                  updateFilter("priority", isActive ? "" : p.value)
                }
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                  isActive
                    ? "bg-slate-800 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200",
                )}>
                <Icon className="w-3 h-3" />
                {p.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
