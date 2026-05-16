
import { Star } from "lucide-react";
import { TestiCard } from "./LandingCards";
import { TESTIMONIALS } from "../../constants";

export function TestimonialsSection() {
  return (
    <section
      className="py-16 sm:py-24 border-y border-white/10 bg-white/[0.02]"
      aria-labelledby="testi-title"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 mb-4">
            <Star className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-amber-300 text-xs font-medium">
              Kata Warga
            </span>
          </div>

          <h2
            id="testi-title"
            className="text-2xl sm:text-3xl xl:text-4xl font-bold mb-4"
          >
            Dipercaya oleh{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              ribuan warga
            </span>
          </h2>
        </div>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6"
          role="list"
        >
          {TESTIMONIALS.map((t) => (
            <TestiCard key={t.name} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}
