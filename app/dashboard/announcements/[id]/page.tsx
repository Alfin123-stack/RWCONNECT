import { ArrowLeft, Pin, Eye, Clock } from "lucide-react";
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
  getPriorityColor,
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

export default async function AnnouncementDetailPage({ params }: PageProps) {
  // Fetch content and fire view-count increment in parallel.
  // incrementViewCount never throws, so it won't block the render.
  const [ann] = await Promise.all([
    getAnnouncementById(params.id),
    incrementViewCount(params.id),
  ]);

  if (!ann) notFound();

  // The DB was already incremented above; show the updated value immediately.
  const displayViewCount = (ann.view_count ?? 0) + 1;
  const authorName = (ann.author as any)?.full_name ?? "Admin";

  return (
    <div className="max-w-2xl animate-fade-in">
      <Link
        href="/dashboard/announcements"
        className="btn-ghost mb-6 -ml-2 inline-flex">
        <ArrowLeft className="w-4 h-4" /> Kembali ke Pengumuman
      </Link>

      <div className="card p-6 lg:p-8">
        {/* Badges */}
        <div className="flex items-center gap-2 flex-wrap mb-4">
          <span
            className={`badge ${getAnnouncementCategoryColor(ann.category)}`}>
            {ann.category}
          </span>
          {ann.is_pinned && (
            <span className="flex items-center gap-1 badge bg-amber-50 text-amber-700 border-amber-200">
              <Pin className="w-2.5 h-2.5" /> Disematkan
            </span>
          )}
          <span className="flex items-center gap-1.5 text-xs text-slate-500">
            <span
              className={`w-2 h-2 rounded-full ${getPriorityColor(ann.priority)}`}
            />
            Prioritas {ann.priority}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl lg:text-3xl font-display font-bold text-slate-900 mb-4 leading-tight">
          {ann.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-slate-400 mb-6 pb-6 border-b border-slate-100 flex-wrap">
          <span className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">
              {authorName[0]}
            </div>
            {authorName}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" /> {formatDateTime(ann.created_at)}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="w-3 h-3" /> {displayViewCount} dilihat
          </span>
        </div>

        {/* Content */}
        <div className="prose prose-slate prose-sm max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap">
          {ann.content}
        </div>

        {ann.expires_at && (
          <div className="mt-6 p-3 rounded-xl bg-amber-50 border border-amber-100">
            <p className="text-xs text-amber-700 font-medium">
              ⏰ Pengumuman ini berlaku hingga {formatDateTime(ann.expires_at)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
