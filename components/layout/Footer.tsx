import Link from "next/link";

import { BrandLogo } from "../ui/BrandLogo";
import {
  FOOTER_ACCOUNT_LINKS,
  FOOTER_PLATFORM_LINKS,
} from "../../constants/index";

export function Footer() {
  return (
    <footer
      className="border-t border-white/10 bg-slate-900/80"
      role="contentinfo">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-wrap gap-10 justify-between">
        {/* Brand */}
        <div>
          <BrandLogo size="sm" />
          <p className="text-slate-500 text-sm mt-3">
            Platform Informasi &amp; Komunikasi Warga Digital
          </p>
        </div>

        {/* Platform links */}
        <nav aria-label="Tautan fitur">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
            Platform
          </h4>
          <ul className="space-y-2 list-none">
            {FOOTER_PLATFORM_LINKS.map(([label, href]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm text-slate-400 hover:text-white transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Account links */}
        <nav aria-label="Tautan akun">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
            Akun
          </h4>
          <ul className="space-y-2 list-none">
            {FOOTER_ACCOUNT_LINKS.map(([label, href]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm text-slate-400 hover:text-white transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10 py-5 text-center">
        <p className="text-slate-600 text-sm">
          © 2024 RWConnect · Dibuat untuk warga, oleh warga
        </p>
      </div>
    </footer>
  );
}
