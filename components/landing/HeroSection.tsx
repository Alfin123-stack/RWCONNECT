"use client";

import { HeroBackground } from "../ui/HeroBackground";
import { AvatarStack } from "../ui/AvatarStack";
import { HeroCTA } from "./HeroCTA";
import { HeroPreviewCard } from "./HeroPreviewCard";
import { useAuth } from "../../hooks/useAuth";

export function HeroSection() {
  const { isLoggedIn } = useAuth();
  return (
    <section
      className="relative min-h-[90vh] flex items-center overflow-hidden"
      aria-labelledby="hero-title"
    >
      <HeroBackground />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-500/30 mb-5 sm:mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-blue-300 text-xs font-medium">
                Platform Warga Digital Pertama Anda
              </span>
            </div>

            {/*
              320px  → text-3xl  (30px)
              sm 640px → text-4xl (36px)
              xl 1280px → text-6xl (60px)
            */}
            <h1
              id="hero-title"
              className="text-3xl sm:text-4xl xl:text-6xl font-bold leading-tight mb-5 sm:mb-6"
            >
              Suara warga,{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                satu tempat
              </span>
            </h1>

            <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-7 sm:mb-8 max-w-lg">
              RWConnect menyatukan pengumuman, aspirasi, dan kegiatan warga
              dalam satu platform digital yang mudah dipakai siapa saja — dari
              pak RT sampai ibu-ibu arisan.
            </p>

            <div className="mb-8 sm:mb-10">
              <HeroCTA isLoggedIn={isLoggedIn} />
            </div>

            {/* Avatar + count – stacks nicely on narrow screens */}
            <div className="flex items-center gap-3 p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10 w-fit max-w-full">
              <AvatarStack />
              <div className="min-w-0">
                <p className="text-sm text-white font-semibold truncate">
                  1.200+ warga
                </p>
                <p className="text-xs text-slate-400 truncate">
                  sudah bergabung di RWConnect
                </p>
              </div>
            </div>
          </div>

          {/* Right: Preview card – only lg+ */}
          <div className="hidden lg:flex justify-end">
            <HeroPreviewCard />
          </div>
        </div>
      </div>
    </section>
  );
}
