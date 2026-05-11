import { Clock } from "lucide-react";

import { StepItem, NotifPreview } from "./LandingCards";

export function HowItWorksSection() {
  return (
    <section
      id="cara-kerja"
      className="py-24 border-y border-white/10 bg-white/[0.02]"
      aria-labelledby="hiw-title"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Steps */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-500/30 mb-4">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-blue-300 text-xs font-medium">
                Cara Kerja
              </span>
            </div>

            <h2 id="hiw-title" className="text-3xl xl:text-4xl font-bold mb-4">
              Mulai dalam{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                3 langkah mudah
              </span>
            </h2>

            <p className="text-slate-400 leading-relaxed mb-10">
              Daftar sendiri, langsung aktif. Tidak perlu diajari teknis.
            </p>

            <ol className="space-y-6" role="list">
              <StepItem
                num={1}
                title="Daftar akun warga"
                desc="Isi data diri lewat form 3 langkah di /register. Proses cepat, tidak lebih dari 2 menit."
              />
              <StepItem
                num={2}
                title="Jelajahi dashboard"
                desc="Lihat pengumuman terbaru, kegiatan mendatang, dan statistik lingkungan langsung dari halaman utama."
              />
              <StepItem
                num={3}
                title="Sampaikan aspirasimu"
                desc="Ada keluhan soal jalan rusak? Lampu mati? Kirim aspirasi — anonim atau dengan nama — dan pantau prosesnya."
              />
            </ol>
          </div>

          {/* Right: Notification preview */}
          <div aria-label="Contoh notifikasi platform">
            <NotifPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
