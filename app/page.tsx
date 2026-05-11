"use client";
import { HeroSection } from "../components/landing/HeroSection";
import { StatsBar } from "../components/landing/StatsBar";
import { FeaturesSection } from "../components/landing/FeaturesSection";
import { HowItWorksSection } from "../components/landing/HowItWorksSection";
import { WhySection } from "../components/landing/WhySection";
import { TestimonialsSection } from "../components/landing/TestimonialsSection";
import { CTASection } from "../components/landing/CTASection";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
      <Navbar />
      <HeroSection />
      <StatsBar />
      <FeaturesSection />
      <HowItWorksSection />
      <WhySection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
