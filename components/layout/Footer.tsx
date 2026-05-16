import Link from "next/link";

import { BrandLogo } from "../ui/BrandLogo";

import {
  FOOTER_ACCOUNT_LINKS,
  FOOTER_PLATFORM_LINKS,
} from "../../constants/index";

export function Footer() {
  return (
    <footer
      className="
        border-t border-white/10
        bg-slate-900/80
        w-full
      "
      role="contentinfo">
      {/* Top */}
      <div
        className="
          max-w-6xl
          mx-auto
          px-4 sm:px-6
          py-10 sm:py-12

          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3

          gap-8 sm:gap-10
        ">
        {/* Brand */}
        <div className="min-w-0">
          <BrandLogo size="sm" />

          <p
            className="
              text-slate-500
              text-sm
              leading-relaxed
              mt-3
              max-w-sm
              break-words
            ">
            Platform Informasi &amp; Komunikasi Warga Digital
          </p>
        </div>

        {/* Platform */}
        <nav aria-label="Tautan fitur" className="min-w-0">
          <h4
            className="
              text-[11px] sm:text-xs
              font-semibold
              uppercase
              tracking-widest
              text-slate-500
              mb-4
            ">
            Platform
          </h4>

          <ul className="space-y-2 list-none">
            {FOOTER_PLATFORM_LINKS.map(([label, href]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="
                      text-sm
                      text-slate-400
                      hover:text-white
                      transition-colors
                      break-words
                    ">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Account */}
        <nav aria-label="Tautan akun" className="min-w-0">
          <h4
            className="
              text-[11px] sm:text-xs
              font-semibold
              uppercase
              tracking-widest
              text-slate-500
              mb-4
            ">
            Akun
          </h4>

          <ul className="space-y-2 list-none">
            {FOOTER_ACCOUNT_LINKS.map(([label, href]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="
                      text-sm
                      text-slate-400
                      hover:text-white
                      transition-colors
                      break-words
                    ">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Bottom */}
      <div
        className="
          border-t border-white/10
          py-4 sm:py-5
          px-4
          text-center
        ">
        <p
          className="
            text-slate-600
            text-xs sm:text-sm
            leading-relaxed
            break-words
          ">
          © 2024 RWConnect · Dibuat untuk warga, oleh warga
        </p>
      </div>
    </footer>
  );
}
