import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  EyeOff,
  ThumbsUp,
  Tag,
  CalendarDays,
  MessageSquareQuote,
} from "lucide-react";
import { getAspirationById } from "../../../../actions/aspirations";
import { getCurrentUserRole } from "../../../../actions/announcements";
import {
  getStatusColor,
  getStatusLabel,
  formatRelativeTime,
} from "../../../../utils";
import { ASPIRATION_CATEGORIES } from "../../../../constants"; // ← perbaikan path
import type { AspirationStatus } from "../../../../types";

const statusIcons: Record<AspirationStatus, React.ElementType> = {
  baru: Clock,
  diproses: Loader2,
  selesai: CheckCircle2,
  ditolak: XCircle,
};

const statusAccent: Record<AspirationStatus, string> = {
  baru: "bg-slate-400",
  diproses: "bg-amber-400",
  selesai: "bg-emerald-500",
  ditolak: "bg-rose-500",
};

interface Props {
  params: { id: string };
}

export default async function AspirationDetailPage({ params }: Props) {
  const [asp, { isAdmin }] = await Promise.all([
    getAspirationById(params.id),
    getCurrentUserRole(),
  ]);

  if (!asp) notFound();

  const cat = ASPIRATION_CATEGORIES.find((c) => c.value === asp.category);
  const StatusIcon = statusIcons[asp.status as AspirationStatus];
  const accentBar =
    statusAccent[asp.status as AspirationStatus] ?? "bg-slate-300";

  const authorName = asp.is_anonymous
    ? null
    : ((asp.author as any)?.full_name ?? "Warga");
  const avatarUrl = asp.is_anonymous ? null : (asp.author as any)?.avatar_url;
  const authorInitial = asp.is_anonymous
    ? "?"
    : (authorName?.[0] ?? "?").toUpperCase();

  const fullDate = new Date(asp.created_at).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="max-w-2xl mx-auto space-y-5 animate-fade-in">
      {/* Back */}
      <Link
        href="/dashboard/aspirations"
        className="btn-ghost -ml-2 inline-flex group gap-1.5 items-center text-sm text-slate-500 hover:text-slate-800 transition-colors">
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
        Kembali ke Aspirasi
      </Link>

      {/* Status accent bar */}
      <div className={`h-1 w-full rounded-t-2xl ${accentBar}`} />

      {/* Main card */}
      <div className="card rounded-t-none border-t-0 p-6 lg:p-8 shadow-sm space-y-5">
        {/* Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`badge text-xs flex items-center gap-1 ${getStatusColor(asp.status)}`}>
            <StatusIcon
              className={`w-2.5 h-2.5 ${asp.status === "diproses" ? "animate-spin" : ""}`}
            />
            {getStatusLabel(asp.status)}
          </span>

          {/* ← cat?.icon dihapus karena constants tidak lagi menyimpan icon */}
          <span className="badge bg-slate-50 text-slate-600 border-slate-100 text-xs flex items-center gap-1">
            <Tag className="w-2.5 h-2.5" />
            {cat?.label ?? "Lainnya"}
          </span>

          {asp.is_anonymous && (
            <span className="badge bg-slate-100 text-slate-500 text-xs flex items-center gap-1">
              <EyeOff className="w-3 h-3" />
              Anonim
            </span>
          )}

          <span className="ml-auto flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-slate-50 border border-slate-100 rounded-full px-2.5 py-1">
            <ThumbsUp className="w-3 h-3 text-blue-400" />
            {asp.upvote_count} dukungan
          </span>
        </div>

        {/* Title */}
        <h1 className="font-display font-bold text-slate-900 text-2xl lg:text-3xl leading-snug">
          {asp.title}
        </h1>

        {/* Meta strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pb-5 border-b border-slate-100">
          {/* Author */}
          <div className="flex items-center gap-2.5">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={authorName ?? ""}
                className="w-8 h-8 rounded-xl object-cover ring-1 ring-slate-200 flex-shrink-0"
              />
            ) : (
              <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm flex-shrink-0 ring-1 ring-blue-200">
                {authorInitial}
              </div>
            )}
            <div className="min-w-0">
              <p className="text-[10px] text-slate-400 uppercase tracking-wide font-medium">
                Pengirim
              </p>
              <p className="text-xs text-slate-700 font-semibold truncate">
                {asp.is_anonymous ? "Anonim" : authorName}
              </p>
            </div>
          </div>

          {/* Relative time */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
              <Clock className="w-4 h-4 text-slate-500" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wide font-medium">
                Disampaikan
              </p>
              <p className="text-xs text-slate-700 font-semibold">
                {formatRelativeTime(asp.created_at)}
              </p>
            </div>
          </div>

          {/* Full date */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
              <CalendarDays className="w-4 h-4 text-slate-500" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wide font-medium">
                Tanggal
              </p>
              <p className="text-xs text-slate-700 font-semibold">{fullDate}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
          {asp.content}
        </p>

        {/* Admin response */}
        {asp.admin_response && (
          <div className="flex gap-3 p-4 rounded-2xl bg-blue-50 border border-blue-100">
            <MessageSquareQuote className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <div className="space-y-1">
              <p className="text-xs font-semibold text-blue-700">
                Respon Pengurus
              </p>
              <p className="text-sm text-blue-600 leading-relaxed">
                {asp.admin_response}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer ID hint */}
      <p className="text-center text-xs text-slate-300">
        ID aspirasi: <span className="font-mono">{params.id}</span>
      </p>
    </div>
  );
}
