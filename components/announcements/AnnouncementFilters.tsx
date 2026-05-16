"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useTransition, useRef, useEffect, useState } from "react";
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
  SlidersHorizontal,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import type { AnnouncementCategory, AnnouncementPriority } from "../../types";
import {
  ANNOUNCEMENT_CATEGORIES,
  ANNOUNCEMENT_PRIORITIES,
} from "../../constants";
import { cn } from "../../utils";

const ANNOUNCEMENT_CATEGORY_ICONS: Record<string, LucideIcon> = {
  penting: Zap,
  kegiatan: CalendarDays,
  kesehatan: HeartPulse,
  keamanan: Shield,
  sosial: Users,
  umum: Megaphone,
};

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

  // Mobile: collapsible filter panel
  const [filterOpen, setFilterOpen] = useState(false);

  const hasActiveFilter = !!(
    currentFilters.category || currentFilters.priority
  );

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
      if (value) params.set(key, value);
      else params.delete(key);
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
    (key: string, value: string) => updateParam(key, value || undefined),
    [updateParam],
  );

  // Shared chip style
  const chip = (active: boolean, accent = "blue") =>
    cn(
      "inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap",
      active
        ? accent === "blue"
          ? "bg-blue-600 text-white shadow-sm"
          : "bg-slate-800 text-white shadow-sm"
        : "bg-slate-100 text-slate-600 hover:bg-slate-200",
    );

  return (
    <div className="card p-3 sm:p-4 space-y-3">
      {/* ── Row 1: Search + mobile filter toggle ── */}
      <div className="flex gap-2">
        {/* Search bar — grows to fill available space */}
        <div className="relative flex-1 min-w-0">
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

        {/* Mobile: filter toggle button */}
        <button
          onClick={() => setFilterOpen((v) => !v)}
          className={cn(
            "sm:hidden flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all flex-shrink-0",
            filterOpen || hasActiveFilter
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200",
          )}>
          <SlidersHorizontal className="w-3.5 h-3.5" />
          Filter
          {hasActiveFilter && (
            <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
          )}
          <ChevronDown
            className={cn(
              "w-3 h-3 transition-transform duration-200",
              filterOpen ? "rotate-180" : "rotate-0",
            )}
          />
        </button>
      </div>

      {/* ── Row 2: Filter chips ──
           Desktop: always visible in a single flex row
           Mobile:  collapsible panel below the search row        */}
      <div
        className={cn(
          // Mobile hidden/visible transition
          "overflow-hidden transition-all duration-200",
          // On mobile, toggle; on sm+ always show
          filterOpen ? "max-h-96" : "max-h-0 sm:max-h-96",
        )}>
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-3 sm:items-center pt-1 sm:pt-0">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:inline">
            Filter:
          </span>

          {/* ── Kategori ── */}
          <div className="flex gap-1.5 flex-wrap">
            <button
              onClick={() => updateFilter("category", "")}
              className={chip(!currentFilters.category)}>
              <LayoutGrid className="w-3 h-3" />
              Semua
            </button>
            {ANNOUNCEMENT_CATEGORIES.map((cat) => {
              const Icon = ANNOUNCEMENT_CATEGORY_ICONS[cat.value] ?? Megaphone;
              const isActive = currentFilters.category === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() =>
                    updateFilter("category", isActive ? "" : cat.value)
                  }
                  className={chip(isActive)}>
                  <Icon className="w-3 h-3" />
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Divider — desktop only */}
          <div className="hidden sm:block w-px h-5 bg-slate-200" />

          {/* ── Prioritas ── */}
          <div className="flex gap-1.5 flex-wrap">
            {ANNOUNCEMENT_PRIORITIES.map((p) => {
              const Icon = ANNOUNCEMENT_PRIORITY_ICONS[p.value] ?? Bell;
              const isActive = currentFilters.priority === p.value;
              return (
                <button
                  key={p.value}
                  onClick={() =>
                    updateFilter("priority", isActive ? "" : p.value)
                  }
                  className={chip(isActive, "slate")}>
                  <Icon className="w-3 h-3" />
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
