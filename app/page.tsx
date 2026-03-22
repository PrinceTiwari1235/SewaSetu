import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import FeaturesSection from "@/components/sections/FeaturesSection";
import PortalsSection from "@/components/sections/PortalsSection";
import HowItWorks from "@/components/sections/HowItWorks";
import Testimonials from "@/components/sections/Testimonials";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SewaSetu - Easy Nepal Government Forms & Applications",
  description:
    "SewaSetu makes Nepal government forms and applications easy. Find the right portal, understand the process, and apply faster.",
  keywords: [
    "Sewasetu",
    "gov forms nepal",
    "nepal application form",
    "easy form nepal",
    "online gov application",
    "public service forms",
    "nepal citizen services",
  ],
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <main className="bg-slate-950 min-h-screen">
      <Navbar />
      <Hero />
      <HowItWorks />
      <FeaturesSection />
      <PortalsSection />
      <Testimonials />

      {/* Final CTA */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-crimson-950/20 to-slate-950" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-crimson-900/25 rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <div className="tag mb-8 mx-auto w-fit">✦ Get Started Today</div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Every Nepali citizen
            <br />
            deserves easy access to
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-crimson-400 to-orange-300">
              their government.
            </span>
          </h2>
          <p className="text-white/55 text-lg mb-10 leading-relaxed">
            Create your free account and access all of Nepal's government
            services — clearly guided, in one place, available 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="btn-primary flex items-center justify-center gap-2 text-base !px-10 !py-4"
            >
              Create Free Account <ArrowRight size={18} />
            </Link>
            <Link
              href="/portals"
              className="btn-outline flex items-center justify-center gap-2 text-base !px-10 !py-4"
            >
              Explore Portals
            </Link>
          </div>
          <p className="text-white/25 text-xs mt-6">
            Free forever · No credit card · No government login stored
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
