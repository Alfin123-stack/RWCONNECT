"use client";

import Link from "next/link";

import {
  EyeOff,
  Trash2,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  Construction,
  Lock,
  Handshake,
  ClipboardList,
  MapPin,
  type LucideIcon,
} from "lucide-react";

import {
  getStatusColor,
  getStatusLabel,
  formatRelativeTime,
  cn,
} from "../../utils";

import { ASPIRATION_CATEGORIES } from "../../constants";

import { AdminResponseForm } from "./AdminResponseForm";
import { VoteButton } from "./VoteButton";

import type { Aspiration, AspirationStatus } from "../../types";

/* ─────────────────────────────────────────────
 * ICONS
 * ───────────────────────────────────────────── */
const CATEGORY_ICONS: Record<string, LucideIcon> = {
  infrastruktur: Construction,
  keamanan: Lock,
  kebersihan: Trash2,
  sosial: Handshake,
  administrasi: ClipboardList,
  lainnya: MapPin,
};

const STATUS_ICONS: Record<AspirationStatus, LucideIcon> = {
  baru: Clock,
  diproses: Loader2,
  selesai: CheckCircle2,
  ditolak: XCircle,
};

const STATUS_OPTIONS: AspirationStatus[] = [
  "baru",
  "diproses",
  "selesai",
  "ditolak",
];

/* ─────────────────────────────────────────────
 * TYPES
 * ───────────────────────────────────────────── */
interface AspirationCardProps {
  asp: Aspiration;
  index: number;
  isAdmin: boolean;
  isStatusPending: boolean;
  voted: boolean;
  confirmId: string | null;

  onToggleVote: (id: string) => void;

  onStatusChange: (id: string, status: AspirationStatus) => void;

  onAskConfirm: (id: string) => void;

  onCancelConfirm: () => void;

  onDelete: (id: string) => void;
}

/* ─────────────────────────────────────────────
 * COMPONENT
 * ───────────────────────────────────────────── */
export function AspirationCard({
  asp,
  index,
  isAdmin,
  isStatusPending,
  voted,
  confirmId,
  onToggleVote,
  onStatusChange,
  onAskConfirm,
  onCancelConfirm,
  onDelete,
}: AspirationCardProps) {
  const isOptimistic = asp.id.startsWith("temp-");

  const isConfirming = confirmId === asp.id;

  const cat = ASPIRATION_CATEGORIES.find((c) => c.value === asp.category);

  const CategoryIcon = CATEGORY_ICONS[asp.category];

  const StatusIcon = STATUS_ICONS[asp.status] ?? Clock;

  const authorName = asp.is_anonymous
    ? "Anonim"
    : (asp.author?.full_name ?? "Warga");

  return (
    <article
      className={cn(
        `
          overflow-hidden

          rounded-3xl
          border border-slate-100

          bg-white

          p-3 sm:p-4 lg:p-5

          shadow-sm

          transition-all duration-300

          hover:shadow-lg
        `,
        isOptimistic ? "pointer-events-none opacity-60" : "opacity-100",
      )}
      style={{
        animationDelay: `${index * 50}ms`,
      }}>
      {/* =====================================
       * WRAPPER
       * ===================================== */}
      <div className="flex gap-3 sm:gap-4">
        {/* =====================================
         * CATEGORY ICON
         * ===================================== */}
        <div
          className="
            flex h-10 w-10
            shrink-0
            items-center justify-center

            rounded-2xl

            bg-slate-50

            sm:h-11 sm:w-11
          ">
          {CategoryIcon ? (
            <CategoryIcon
              className="
                h-4 w-4
                text-slate-500

                sm:h-5 sm:w-5
              "
            />
          ) : (
            <span className="text-slate-400">—</span>
          )}
        </div>

        {/* =====================================
         * CONTENT
         * ===================================== */}
        <div className="min-w-0 flex-1">
          {/* ===================================
           * TOP AREA
           * =================================== */}
          <div
            className="
              flex flex-col gap-3
              xl:flex-row xl:items-start xl:justify-between
            ">
            {/* =================================
             * LEFT
             * ================================= */}
            <div className="min-w-0 flex-1">
              {/* TITLE */}
              <Link href={`/dashboard/aspirations/${asp.id}`} className="block">
                <h3
                  className="
                    break-words

                    text-[13px] sm:text-[15px]

                    font-bold
                    leading-snug

                    text-slate-900

                    transition-colors

                    hover:text-blue-600
                  ">
                  {asp.title}
                </h3>
              </Link>

              {/* BADGES */}
              <div
                className="
                  mt-2

                  flex flex-wrap
                  items-center
                  gap-1.5
                ">
                {/* STATUS */}
                <span
                  className={cn(
                    `
                      inline-flex items-center

                      rounded-full

                      px-2 py-1

                      text-[10px]
                      font-semibold
                    `,
                    getStatusColor(asp.status),
                  )}>
                  <StatusIcon
                    className={cn(
                      "mr-1 h-3 w-3 shrink-0",
                      asp.status === "diproses" && "animate-spin",
                    )}
                  />

                  <span className="truncate">{getStatusLabel(asp.status)}</span>
                </span>

                {/* CATEGORY */}
                <span
                  className="
                    inline-flex items-center gap-1

                    rounded-full

                    border border-slate-100

                    bg-slate-50

                    px-2 py-1

                    text-[10px]
                    font-semibold

                    text-slate-600
                  ">
                  {CategoryIcon && (
                    <CategoryIcon className="h-3 w-3 shrink-0" />
                  )}

                  <span className="truncate">{cat?.label ?? "Lainnya"}</span>
                </span>

                {/* OPTIMISTIC */}
                {isOptimistic && (
                  <span
                    className="
                      inline-flex items-center

                      rounded-full

                      bg-slate-100

                      px-2 py-1

                      text-[10px]
                      font-semibold

                      text-slate-500
                    ">
                    <svg
                      className="
                        mr-1 h-3 w-3
                        animate-spin
                      "
                      viewBox="0 0 24 24"
                      fill="none">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />

                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Mengirim...
                  </span>
                )}
              </div>
            </div>

            {/* =================================
             * ADMIN ACTIONS
             * ================================= */}
            {isAdmin && !isOptimistic && (
              <div
                className="
                    flex w-full flex-col gap-2

                    sm:flex-row
                    sm:items-center

                    xl:w-auto
                  ">
                {/* SELECT */}
                <select
                  title="Status aspirasi"
                  aria-label="Ubah status"
                  value={asp.status}
                  disabled={isStatusPending}
                  onChange={(e) =>
                    onStatusChange(asp.id, e.target.value as AspirationStatus)
                  }
                  className="
                      h-10
                      w-full

                      rounded-xl
                      border border-slate-200

                      bg-white

                      px-3

                      text-xs
                      text-slate-700

                      outline-none

                      transition-all

                      focus:ring-2 focus:ring-blue-200

                      disabled:opacity-50

                      sm:w-auto
                    ">
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {getStatusLabel(s)}
                    </option>
                  ))}
                </select>

                {/* DELETE */}
                {isConfirming ? (
                  <div
                    className="
                        flex flex-col gap-2

                        sm:flex-row sm:items-center
                      ">
                    <span
                      className="
                          text-[11px]
                          font-medium
                          text-red-500
                        ">
                      Hapus aspirasi?
                    </span>

                    <div className="flex gap-2">
                      <button
                        onClick={() => onDelete(asp.id)}
                        className="
                            rounded-xl

                            bg-red-500

                            px-3 py-2

                            text-[11px]
                            font-semibold
                            text-white

                            transition-all

                            hover:bg-red-600
                          ">
                        Ya
                      </button>

                      <button
                        onClick={onCancelConfirm}
                        className="
                            rounded-xl

                            bg-slate-100

                            px-3 py-2

                            text-[11px]
                            font-semibold

                            text-slate-600

                            transition-all

                            hover:bg-slate-200
                          ">
                        Batal
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => onAskConfirm(asp.id)}
                    title="Hapus aspirasi"
                    className="
                        flex h-10 w-10
                        items-center justify-center

                        rounded-xl

                        text-slate-400

                        transition-all

                        hover:bg-red-50
                        hover:text-red-500
                      ">
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* ===================================
           * CONTENT TEXT
           * =================================== */}
          <Link
            href={`/dashboard/aspirations/${asp.id}`}
            className="group block mt-3">
            <p
              className="
                line-clamp-3

                break-words

                text-[11px] sm:text-sm
                leading-relaxed

                text-slate-600

                transition-colors

                group-hover:text-slate-800
              ">
              {asp.content}
            </p>
          </Link>

          {/* ===================================
           * USER RESPONSE
           * =================================== */}
          {!isOptimistic && !isAdmin && asp.admin_response && (
            <div
              className="
                  mt-3

                  rounded-2xl

                  border border-blue-100

                  bg-blue-50

                  p-3
                ">
              <p
                className="
                    mb-1

                    text-[11px]
                    font-semibold

                    text-blue-700
                  ">
                Respon Pengurus
              </p>

              <p
                className="
                    break-words

                    text-[11px] sm:text-sm
                    leading-relaxed

                    text-blue-700
                  ">
                {asp.admin_response}
              </p>

              {asp.admin_response_at && (
                <p
                  className="
                      mt-2

                      text-[10px]

                      text-blue-400
                    ">
                  {new Date(asp.admin_response_at).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              )}
            </div>
          )}

          {/* ===================================
           * ADMIN RESPONSE FORM
           * =================================== */}
          {isAdmin && !isOptimistic && (
            <div className="mt-3">
              <AdminResponseForm
                aspirationId={asp.id}
                currentResponse={asp.admin_response}
                currentResponseAt={asp.admin_response_at}
              />
            </div>
          )}

          {/* ===================================
           * FOOTER
           * =================================== */}
          <div
            className="
              mt-4

              flex flex-col gap-3

              border-t border-slate-100

              pt-3

              sm:flex-row
              sm:flex-wrap
              sm:items-center
            ">
            {/* LEFT INFO */}
            <div
              className="
                flex min-w-0 flex-wrap
                items-center gap-x-3 gap-y-2
              ">
              {/* AUTHOR */}
              <span
                className="
                  flex items-center gap-1

                  text-[11px]
                  text-slate-400
                ">
                {asp.is_anonymous ? (
                  <>
                    <EyeOff className="h-3 w-3 shrink-0" />

                    <span className="truncate">Anonim</span>
                  </>
                ) : (
                  <span className="truncate max-w-[120px] sm:max-w-[180px]">
                    {authorName}
                  </span>
                )}
              </span>

              {/* TIME */}
              <span
                className="
                  text-[11px]
                  text-slate-400
                ">
                {formatRelativeTime(asp.created_at)}
              </span>

              {/* DETAIL */}
              <Link
                href={`/dashboard/aspirations/${asp.id}`}
                className="
                  text-[11px]
                  font-semibold

                  text-blue-500

                  transition-colors

                  hover:text-blue-700
                ">
                Detail →
              </Link>
            </div>

            {/* VOTE */}
            <div
              className="
                w-full

                sm:ml-auto
                sm:w-auto
              ">
              <VoteButton
                count={asp.upvote_count}
                voted={voted}
                onToggle={() => onToggleVote(asp.id)}
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
