import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Target, Eye, Heart, Users, Globe, Zap } from 'lucide-react'

const values = [
  {
    icon: Heart,
    title: 'Citizen-First',
    description: 'Every decision we make is guided by one question: does this make it easier for a Nepali citizen?',
  },
  {
    icon: Globe,
    title: 'Inclusive Access',
    description: 'We build for every Nepali — urban and rural, tech-savvy and not, Nepali-speaking and English-speaking.',
  },
  {
    icon: Zap,
    title: 'Simplicity',
    description: 'Government processes are complex. Our job is to translate that complexity into simple, clear guidance.',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Built by Nepalis, for Nepalis. We are open to contributions from developers, writers, and civic advocates.',
  },
]

const milestones = [
  { year: '2024', event: 'SewaSetu concept born — research into Nepal government portals begins.' },
  { year: '2024', event: 'First 50 government portals catalogued and verified.' },
  { year: '2025', event: 'Beta platform launched with 14 service categories.' },
  { year: '2025', event: 'Bilingual (Nepali + English) content added for all major portals.' },
  { year: '2026', event: 'Public launch — open to all Nepali citizens.' },
]

export default function AboutPage() {
  return (
    <main className="bg-slate-950 min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-crimson-950/20 to-transparent" />
        <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-crimson-900/15 rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-crimson-950/60 border border-crimson-800/50 text-crimson-300 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-8">
            ✦ About SewaSetu
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Bridging citizens
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-crimson-400 to-orange-300">
              to their government
            </span>
          </h1>
          <p className="text-white/60 text-xl leading-relaxed">
            SewaSetu (सेवासेतु) was born from a simple frustration: why does dealing with the Nepal government require visiting 15 different websites, each with different interfaces, languages, and processes?
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass-card p-8 border-crimson-900/30">
            <div className="w-12 h-12 bg-crimson-950/60 border border-crimson-800/50 rounded-xl flex items-center justify-center mb-5">
              <Target size={22} className="text-crimson-400" />
            </div>
            <h2 className="font-display text-2xl font-bold text-white mb-3">Our Mission</h2>
            <p className="text-white/60 leading-relaxed">
              To make Nepal's government e-services genuinely accessible to every citizen — regardless of their digital literacy, language preference, or geographic location. We believe that navigating government services should not require a degree or an agent.
            </p>
          </div>
          <div className="glass-card p-8">
            <div className="w-12 h-12 bg-mountain-900/60 border border-mountain-700/50 rounded-xl flex items-center justify-center mb-5">
              <Eye size={22} className="text-mountain-300" />
            </div>
            <h2 className="font-display text-2xl font-bold text-white mb-3">Our Vision</h2>
            <p className="text-white/60 leading-relaxed">
              A Nepal where every citizen can access their rights, complete government processes, and engage with public institutions — confidently and independently — from any device, in their own language.
            </p>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-20 max-w-4xl mx-auto px-6">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-8 text-center">
          The problem we're solving
        </h2>
        <div className="glass-card p-8 space-y-4">
          {[
            '🌐 50+ separate government websites, each with different design and navigation',
            '🇳🇵 Many portals only in Nepali, others only in English — citizens fall through the gaps',
            '📋 No centralized checklist of documents needed — wasted trips to government offices',
            '💸 Citizens paying agents ₹200–₹2000 to fill basic forms they could do themselves',
            '⏰ No reminders for exam deadlines, tax dates, license renewals — people miss them',
            '📱 Most government sites not mobile-friendly — excluding rural and lower-income citizens',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 text-white/65 text-base py-3 border-b border-white/[0.05] last:border-0">
              <span className="text-xl flex-shrink-0">{item.slice(0, 2)}</span>
              <span>{item.slice(3)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-10 text-center">Our values</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map(v => {
            const Icon = v.icon
            return (
              <div key={v.title} className="glass-card p-6 text-center hover:bg-white/[0.05] transition-all group">
                <div className="w-12 h-12 mx-auto bg-crimson-950/50 border border-crimson-900/40 rounded-xl flex items-center justify-center mb-4 group-hover:bg-crimson-900/40 transition-all">
                  <Icon size={20} className="text-crimson-400" />
                </div>
                <h3 className="text-white font-semibold mb-2 group-hover:text-crimson-300 transition-colors">{v.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{v.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 max-w-3xl mx-auto px-6">
        <h2 className="font-display text-3xl font-bold text-white mb-12 text-center">Our journey</h2>
        <div className="relative pl-8 border-l border-crimson-900/40">
          {milestones.map((m, i) => (
            <div key={i} className="mb-8 relative">
              <div className="absolute -left-[25px] w-3 h-3 rounded-full bg-crimson-700 border-2 border-crimson-500 top-1" />
              <div className="text-crimson-500 text-xs font-bold tracking-widest uppercase mb-1">{m.year}</div>
              <p className="text-white/65 text-sm leading-relaxed">{m.event}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
