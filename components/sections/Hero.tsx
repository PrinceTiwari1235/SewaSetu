import Link from 'next/link'
import { ArrowRight, Shield, Zap, Globe } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-hero-gradient" />

      {/* Radial glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-crimson-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-mountain-800/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Nepal flag motif — abstract triangle */}
      <div className="absolute right-0 top-0 h-full w-1/2 overflow-hidden opacity-[0.04] pointer-events-none">
        <svg viewBox="0 0 400 800" className="h-full" preserveAspectRatio="xMidYMid slice">
          <polygon points="0,0 400,0 0,480" fill="white" />
          <polygon points="0,480 340,480 0,800" fill="white" />
        </svg>
      </div>

      {/* Floating orbs */}
      <div className="absolute top-20 right-[10%] w-2 h-2 bg-crimson-500 rounded-full animate-float opacity-60" />
      <div className="absolute top-1/3 right-[20%] w-1 h-1 bg-white/40 rounded-full animate-float delay-300" />
      <div className="absolute bottom-1/3 left-[15%] w-1.5 h-1.5 bg-mountain-400/60 rounded-full animate-float delay-500" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-20 text-center">
        {/* Badge */}
        <div className="anim-hidden animate-fade-up delay-100 inline-flex items-center gap-2 bg-crimson-950/60 border border-crimson-800/50 text-crimson-300 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-8">
          <span className="w-1.5 h-1.5 bg-crimson-400 rounded-full animate-pulse" />
          Nepal's Unified Government Portal
        </div>

        {/* Headline */}
        <h1 className="anim-hidden animate-fade-up delay-200 font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] mb-6">
          All Government
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-crimson-400 via-crimson-300 to-orange-300">
            Services, One Place
          </span>
        </h1>

        {/* Nepali subtitle */}
        <p className="anim-hidden animate-fade-up delay-300 text-white/40 text-lg md:text-xl mb-4 font-light tracking-wide">
          सरकारी सेवाहरू — सरल, द्रुत, एकीकृत
        </p>

        {/* Description */}
        <p className="anim-hidden animate-fade-up delay-400 text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
          Stop jumping between dozens of government websites. SewaSetu brings all 50+ Nepal government portals, forms, and services into one clean, accessible platform.
        </p>

        {/* CTA Buttons */}
        <div className="anim-hidden animate-fade-up delay-500 flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/register"
            className="btn-primary flex items-center gap-2 text-base !px-8 !py-4 w-full sm:w-auto justify-center"
          >
            Get Started Free
            <ArrowRight size={18} />
          </Link>
          <Link
            href="/portals"
            className="btn-outline flex items-center gap-2 text-base !px-8 !py-4 w-full sm:w-auto justify-center"
          >
            Browse All Portals
          </Link>
        </div>

        {/* Trust badges */}
        <div className="anim-hidden animate-fade-up delay-600 flex flex-wrap items-center justify-center gap-6 text-sm text-white/35">
          <div className="flex items-center gap-2">
            <Shield size={14} className="text-green-400" />
            <span>Secure & Private</span>
          </div>
          <div className="w-px h-4 bg-white/10" />
          <div className="flex items-center gap-2">
            <Zap size={14} className="text-yellow-400" />
            <span>50+ Portals</span>
          </div>
          <div className="w-px h-4 bg-white/10" />
          <div className="flex items-center gap-2">
            <Globe size={14} className="text-blue-400" />
            <span>Nepali & English</span>
          </div>
        </div>

        {/* Stats row */}
        <div className="anim-hidden animate-fade-up delay-700 mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {[
            { value: '50+',   label: 'Government Portals'  },
            { value: '14',    label: 'Service Categories'  },
            { value: '200+',  label: 'Form Types Covered'  },
            { value: '10M+',  label: 'Citizens Can Benefit'},
          ].map(stat => (
            <div key={stat.label} className="glass-card p-4 text-center">
              <div className="font-display text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-white/40 text-xs leading-snug">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20 animate-bounce">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
      </div>
    </section>
  )
}
