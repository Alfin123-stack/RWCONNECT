import { ArrowLeft, Pin, Eye, Clock, Tag, CalendarClock } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAnnouncementById,
  getAnnouncementTitle,
  incrementViewCount,
} from "../../../../actions/announcements";
import {
  formatDateTime,
  getAnnouncementCategoryColor,
} from "../../../../utils";

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const title = await getAnnouncementTitle(params.id);
  return { title: title ?? "Pengumuman" };
}

export const revalidate = 60;

const priorityAccent: Record<string, string> = {
  tinggi: "bg-rose-500",
  high: "bg-rose-500",
  sedang: "bg-amber-400",
  medium: "bg-amber-400",
  rendah: "bg-emerald-500",
  low: "bg-emerald-500",
};

const priorityLabel: Record<string, string> = {
  tinggi: "Tinggi",
  high: "Tinggi",
  sedang: "Sedang",
  medium: "Sedang",
  rendah: "Rendah",
  low: "Rendah",
};

const priorityDot: Record<string, string> = {
  tinggi: "bg-rose-500",
  high: "bg-rose-500",
  sedang: "bg-amber-500",
  medium: "bg-amber-500",
  rendah: "bg-emerald-500",
  low: "bg-emerald-500",
};

export default async function AnnouncementDetailPage({ params }: PageProps) {
  const [ann] = await Promise.all([
    getAnnouncementById(params.id),
    incrementViewCount(params.id),
  ]);

  if (!ann) notFound();

  const displayViewCount = (ann.view_count ?? 0) + 1;
  const authorName = (ann.author as any)?.full_name ?? "Admin";
  const authorInitial = authorName[0].toUpperCase();

  const priorityKey = ann.priority?.toLowerCase() ?? "rendah";
  const accentBar = priorityAccent[priorityKey] ?? "bg-slate-300";
  const dotColor = priorityDot[priorityKey] ?? "bg-slate-400";
  const prioLabel = priorityLabel[priorityKey] ?? ann.priority;

  return (
    // Outer wrapper: full-width on mobile, constrained on larger screens
    <div className="w-full px-4 sm:px-6 md:px-8 py-4 sm:py-6 animate-fade-in">
      <div className="max-w-2xl mx-auto space-y-4 sm:space-y-5">
        {/* Back button */}
        <Link
          href="/dashboard/announcements"
          className="btn-ghost -ml-1 sm:-ml-2 inline-flex group gap-1.5 items-center
                     text-sm text-slate-500 hover:text-slate-800 transition-colors
                     py-1.5 px-2 rounded-lg hover:bg-slate-100 active:bg-slate-200
                     touch-manipulation">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5 flex-shrink-0" />
          <span>Kembali ke Pengumuman</span>
        </Link>

        {/* Priority accent bar */}
        <div className={`h-1 w-full rounded-t-2xl ${accentBar}`} />

        {/* Main card */}
        <div
          className="card rounded-t-none border-t-0 shadow-sm overflow-hidden
                        p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-5">
          {/* Badges row */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Category badge */}
            <span
              className={`badge text-xs flex items-center gap-1 flex-shrink-0
                          ${getAnnouncementCategoryColor(ann.category)}`}>
              <Tag className="w-2.5 h-2.5 flex-shrink-0" />
              <span className="truncate max-w-[120px] sm:max-w-none">
                {ann.category}
              </span>
            </span>

            {/* Pinned badge */}
            {ann.is_pinned && (
              <span
                className="badge bg-amber-50 text-amber-700 border border-amber-200
                               text-xs flex items-center gap-1 flex-shrink-0">
                <Pin className="w-2.5 h-2.5 flex-shrink-0" />
                Disematkan
              </span>
            )}

            {/* Priority pill — pushed right, wraps gracefully */}
            <span
              className="ml-auto flex items-center gap-1.5 text-xs font-semibold
                             text-slate-500 bg-slate-50 border border-slate-100
                             rounded-full px-2.5 py-1 flex-shrink-0 whitespace-nowrap">
              <span
                className={`w-2 h-2 rounded-full ${dotColor} flex-shrink-0`}
              />
              Prioritas {prioLabel}
            </span>
          </div>

          {/* Title — fluid size from mobile to desktop */}
          <h1
            className="font-display font-bold text-slate-900
                         text-xl sm:text-2xl lg:text-3xl
                         leading-snug break-words">
            {ann.title}
          </h1>

          {/* Meta strip — stacks on mobile, 3-col on sm+ */}
          <div
            className="grid grid-cols-1 xs:grid-cols-3 sm:grid-cols-3 gap-3
                          pb-4 sm:pb-5 border-b border-slate-100">
            {/* Author */}
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center
                              text-blue-700 font-bold text-sm flex-shrink-0 ring-1 ring-blue-200">
                {authorInitial}
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-slate-400 uppercase tracking-wide font-medium">
                  Penulis
                </p>
                <p className="text-xs text-slate-700 font-semibold truncate">
                  {authorName}
                </p>
              </div>
            </div>

            {/* Published */}
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 text-slate-500" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-slate-400 uppercase tracking-wide font-medium">
                  Diterbitkan
                </p>
                <p className="text-xs text-slate-700 font-semibold break-words">
                  {formatDateTime(ann.created_at)}
                </p>
              </div>
            </div>

            {/* View count */}
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                <Eye className="w-4 h-4 text-slate-500" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-slate-400 uppercase tracking-wide font-medium">
                  Dilihat
                </p>
                <p className="text-xs text-slate-700 font-semibold">
                  {displayViewCount.toLocaleString("id-ID")}×
                </p>
              </div>
            </div>
          </div>

          {/* Content — readable on every screen width */}
          <div
            className="prose prose-slate prose-sm max-w-none
                          text-slate-700 leading-relaxed whitespace-pre-wrap
                          break-words overflow-wrap-anywhere
                          prose-headings:text-slate-800
                          prose-a:text-blue-600 prose-a:underline-offset-2">
            {ann.content}
          </div>

          {/* Expiry notice */}
          {ann.expires_at && (
            <div className="flex gap-3 p-3 sm:p-4 rounded-2xl bg-amber-50 border border-amber-100">
              <CalendarClock className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <div className="space-y-0.5 min-w-0">
                <p className="text-xs font-semibold text-amber-700">
                  Batas Berlaku
                </p>
                <p className="text-sm text-amber-600 leading-relaxed break-words">
                  Pengumuman ini berlaku hingga{" "}
                  <span className="font-bold">
                    {formatDateTime(ann.expires_at)}
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer ID hint */}
        <p className="text-center text-xs text-slate-300 mt-3 sm:mt-4 pb-4 break-all">
          ID pengumuman: <span className="font-mono">{params.id}</span>
        </p>
      </div>
    </div>
  );
}
