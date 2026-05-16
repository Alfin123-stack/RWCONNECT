// AuthFooter.tsx

import Link from "next/link";
import { ShieldCheck } from "lucide-react";

interface AuthFooterProps {
  text: string;
  linkLabel: string;
  linkHref: string;
}

/**
 * AuthFooter
 * Responsive footer for login/register page
 */
export function AuthFooter({ text, linkLabel, linkHref }: AuthFooterProps) {
  return (
    <div
      className="
        mt-6
        sm:mt-8

        pt-5
        sm:pt-6

        border-t
        border-slate-200

        space-y-4
        w-full
      "
    >
      {/* Auth Link */}
      <p
        className="
          text-center

          text-sm
          sm:text-[15px]

          text-slate-500

          leading-relaxed
          break-words
        "
      >
        {text}{" "}
        <Link
          href={linkHref}
          className="
            inline-flex
            items-center

            text-blue-600
            font-semibold

            hover:text-blue-800

            transition-colors
            duration-200
          "
        >
          {linkLabel}
        </Link>
      </p>

      {/* Security Info */}
      <div
        className="
          flex
          items-start
          gap-3

          rounded-2xl

          border
          border-blue-100

          bg-blue-50

          px-3
          py-3

          sm:px-4
        "
      >
        {/* Icon */}
        <div
          className="
            flex
            items-center
            justify-center

            w-9
            h-9

            rounded-xl

            bg-blue-100

            shrink-0
          "
        >
          <ShieldCheck
            className="
              w-4
              h-4
              text-blue-700
            "
          />
        </div>

        {/* Text */}
        <div className="min-w-0">
          <p
            className="
              text-xs
              sm:text-sm

              text-blue-800

              leading-relaxed
              break-words
            "
          >
            Data kamu aman dan terenkripsi. RWConnect tidak pernah membagikan
            informasi pribadi kamu.
          </p>
        </div>
      </div>
    </div>
  );
}
