"use client";

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  pills: string[];
  gradient: string;
  iconBg: string;
  iconColor: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  pills,
  gradient,
  iconBg,
  iconColor,
}: FeatureCardProps) {
  return (
    <article className="group relative rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 backdrop-blur-sm overflow-hidden">
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${gradient}`}
        aria-hidden
      />
      <div className="relative z-10">
        <div
          className={`w-11 h-11 rounded-2xl ${iconBg} flex items-center justify-center mb-4 shadow-lg`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
        <h3 className="text-white font-bold text-lg mb-2 leading-snug">
          {title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-4">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {pills.map((p) => (
            <span
              key={p}
              className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400">
              {p}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
