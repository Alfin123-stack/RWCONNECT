import { CheckCircle2 } from "lucide-react";

import { BenefitCard } from "./LandingCards";
import { BENEFITS } from "../../constants";

export function WhySection() {
  return (
    <section
      id="kenapa"
      className="py-24 max-w-6xl mx-auto px-6"
      aria-labelledby="why-title">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 mb-4">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-emerald-300 text-xs font-medium">
            Kenapa RWConnect?
          </span>
        </div>

        <h2 id="why-title" className="text-3xl xl:text-4xl font-bold mb-4">
          Bukan sekadar aplikasi,{" "}
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            ini solusi nyata
          </span>
        </h2>

        <p className="text-slate-400 text-lg max-w-xl mx-auto">
          Ribuan warga sudah merasakannya. Ini alasan mereka tidak mau balik ke
          cara lama.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4" role="list">
        {BENEFITS.map((b) => (
          <BenefitCard key={b.title} {...b} />
        ))}
      </div>
    </section>
  );
}
