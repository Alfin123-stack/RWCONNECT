"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { AnnouncementCategory, AnnouncementPriority } from "../../types";
import {
  ANNOUNCEMENT_CATEGORIES,
  ANNOUNCEMENT_PRIORITIES,
} from "../../constants";
import { cn } from "../../utils";

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
  const searchParams = useSearchParams();

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page");
    router.push(`/dashboard/announcements?${params.toString()}`);
  };

  return (
    <div className="card p-4 flex flex-wrap gap-3 items-center">
      <div className="flex items-center gap-2 flex-wrap flex-1">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Filter:
        </span>

        {/* Category */}
        <div className="flex gap-1.5 flex-wrap">
          <button
            onClick={() => updateFilter("category", "")}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
              !currentFilters.category
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200",
            )}>
            Semua
          </button>
          {ANNOUNCEMENT_CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() =>
                updateFilter(
                  "category",
                  currentFilters.category === cat.value ? "" : cat.value,
                )
              }
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                currentFilters.category === cat.value
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200",
              )}>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Priority filter */}
      <div className="flex gap-1.5">
        {ANNOUNCEMENT_PRIORITIES.map((p) => (
          <button
            key={p.value}
            onClick={() =>
              updateFilter(
                "priority",
                currentFilters.priority === p.value ? "" : p.value,
              )
            }
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
              currentFilters.priority === p.value
                ? "bg-slate-800 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200",
            )}>
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}
