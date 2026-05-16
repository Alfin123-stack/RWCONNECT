// AuthBrandPanel.tsx

"use client";

import { CheckCircle2 } from "lucide-react";
import { cn } from "../../utils";

// ── Types ─────────────────────────────────────────────────────

interface Feature {
  icon: React.ElementType;
  label: string;
}

interface AuthBrandPanelProps {
  headingPrefix: string;
  headingHighlight: string;
  description: string;
  features: Feature[];
  showFeatureCheck?: boolean;
  badge?: string;
  memberCount?: string;
}

// ── Avatar Stack ──────────────────────────────────────────────

const AVATAR_INITIALS = ["B", "S", "A", "R"] as const;

const AVATAR_COLORS = [
  "bg-blue-500",
  "bg-cyan-500",
  "bg-emerald-500",
  "bg-purple-500",
] as const;

function AvatarStack() {
  return (
    <div className="flex -space-x-2 shrink-0">
      {AVATAR_INITIALS.map((initial, i) => (
        <div
          key={initial}
          className={cn(
            `
            w-7 h-7
            sm:w-8 sm:h-8
            rounded-full
            border-2
            border-slate-800
            flex
            items-center
            justify-center
            text-[10px]
            sm:text-xs
            font-bold
            text-white
            `,
            AVATAR_COLORS[i],
          )}>
          {initial}
        </div>
      ))}
    </div>
  );
}

// ── Background Decorations ───────────────────────────────────

function PanelBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      {/* Blob 1 */}
      <div
        className="
          absolute
          -top-24
          -left-24
          w-72
          h-72
          sm:w-96
          sm:h-96
          rounded-full
          bg-blue-600/20
          blur-3xl
        "
      />

      {/* Blob 2 */}
      <div
        className="
          absolute
          -bottom-24
          -right-24
          w-72
          h-72
          sm:w-96
          sm:h-96
          rounded-full
          bg-cyan-500/20
          blur-3xl
        "
      />

      {/* Center Blob */}
      <div
        className="
          absolute
          top-1/2
          left-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-52
          h-52
          sm:w-64
          sm:h-64
          rounded-full
          bg-blue-800/30
          blur-2xl
        "
      />

      {/* Grid */}
      <div
        className="
          absolute
          inset-0
          bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]
          bg-[size:48px_48px]
        "
      />
    </div>
  );
}

// ── Logo ─────────────────────────────────────────────────────

function BrandLogo() {
  return (
    <div className="flex items-center gap-3">
      <div
        className="
          w-10
          h-10
          rounded-2xl
          bg-gradient-to-br
          from-blue-500
          to-cyan-400
          flex
          items-center
          justify-center
          shadow-lg
          shadow-blue-500/30
          shrink-0
        ">
        <span className="text-white font-bold text-sm">RW</span>
      </div>

      <span
        className="
          text-white
          font-display
          font-bold
          text-lg
          sm:text-xl
          truncate
        ">
        Connect
      </span>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────

export function AuthBrandPanel({
  headingPrefix,
  headingHighlight,
  description,
  features,
  showFeatureCheck = false,
  badge,
  memberCount = "200+ warga",
}: AuthBrandPanelProps) {
  return (
    <div
      className="
        relative
        overflow-hidden
        bg-gradient-to-br
        from-slate-900
        via-blue-950
        to-slate-900

        flex
        flex-col
        justify-between

        min-h-[320px]

        px-4
        py-6

        sm:px-6
        sm:py-8

        md:px-8
        md:py-10

        lg:px-12
        lg:py-12
      ">
      <PanelBackground />

      {/* ── TOP ───────────────────────────────────────────── */}
      <div className="relative z-10">
        {/* Logo */}
        <div className="mb-8 sm:mb-10 lg:mb-16">
          <BrandLogo />
        </div>

        {/* Heading */}
        <div className="mb-6 sm:mb-8 lg:mb-10">
          {badge && (
            <div
              className="
                inline-flex
                items-center
                gap-2
                px-3
                py-1.5
                rounded-full
                bg-blue-500/20
                border
                border-blue-500/30
                mb-4
              ">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />

              <span className="text-blue-300 text-xs font-medium">{badge}</span>
            </div>
          )}

          <h1
            className="
              text-2xl
              sm:text-3xl
              lg:text-4xl
              xl:text-5xl
              font-display
              font-bold
              text-white
              leading-tight
              break-words
            ">
            {headingPrefix}{" "}
            <span
              className="
                bg-gradient-to-r
                from-blue-400
                to-cyan-400
                bg-clip-text
                text-transparent
              ">
              {headingHighlight}
            </span>
          </h1>

          <p
            className="
              mt-4
              text-sm
              sm:text-base
              lg:text-lg
              text-slate-400
              leading-relaxed
              max-w-xl
            ">
            {description}
          </p>
        </div>

        {/* Feature List */}
        <div
          className={cn(
            `
            grid
            gap-3
            `,
            showFeatureCheck ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2",
          )}>
          {features.map((f, i) => (
            <div
              key={f.label}
              className="
                flex
                items-center
                gap-3
                rounded-2xl
                bg-white/5
                border
                border-white/10
                backdrop-blur-sm

                px-3
                py-3

                sm:px-4
              "
              style={{
                animationDelay: `${i * 80}ms`,
              }}>
              <div
                className="
                  w-8
                  h-8
                  rounded-xl
                  bg-blue-500/20
                  flex
                  items-center
                  justify-center
                  shrink-0
                ">
                <f.icon className="w-4 h-4 text-blue-400" />
              </div>

              <span
                className="
                  text-slate-300
                  text-sm
                  font-medium
                  flex-1
                  break-words
                ">
                {f.label}
              </span>

              {showFeatureCheck && (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom Badge ─────────────────────────────────── */}
      <div className="relative z-10 mt-6 sm:mt-8">
        <div
          className="
            flex
            items-center
            gap-3
            rounded-2xl
            bg-white/5
            border
            border-white/10

            px-4
            py-4
          ">
          <AvatarStack />

          <div className="min-w-0">
            <p
              className="
                text-sm
                font-semibold
                text-white
                truncate
              ">
              {memberCount}
            </p>

            <p
              className="
                text-xs
                text-slate-400
                break-words
              ">
              sudah bergabung di RWConnect
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
