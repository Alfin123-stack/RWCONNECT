"use client";

import { BrandLogo } from "../ui/BrandLogo";

import { NavAuthButton } from "../landing/NavAuthButton";

import { NAV_LINKS } from "../../constants";

import { useAuth } from "../../hooks/useAuth";

export function Navbar() {
  const { isLoggedIn, loading } = useAuth();

  return (
    <header
      className="
        sticky top-0 z-50
        border-b border-white/10
        bg-slate-900/80
        backdrop-blur-md
        w-full
      ">
      <nav
        className="
          max-w-6xl
          mx-auto

          px-4 sm:px-6

          h-16

          flex items-center
          justify-between
          gap-3
        "
        role="navigation"
        aria-label="Navigasi utama">
        {/* Logo */}
        <div className="flex-shrink-0">
          <BrandLogo size="sm" />
        </div>

        {/* Desktop nav */}
        <ul
          className="
            hidden md:flex
            items-center
            gap-1
            list-none
            min-w-0
          "
          role="list">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className="
                    flex items-center gap-1.5

                    px-3 py-2

                    rounded-lg

                    text-sm
                    text-slate-400

                    hover:text-white
                    hover:bg-white/5

                    transition-all duration-200

                    font-medium
                    whitespace-nowrap
                  ">
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div
          className="
            flex items-center
            justify-end
            flex-shrink-0
          ">
          {loading ? (
            <div
              className="
                w-24 sm:w-32
                h-9
                rounded-xl
                bg-white/10
                animate-pulse
              "
            />
          ) : (
            <NavAuthButton isLoggedIn={isLoggedIn} />
          )}
        </div>
      </nav>
    </header>
  );
}
