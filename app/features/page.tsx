import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import {
  Search, BookOpen, Bookmark, Globe, Shield, Smartphone,
  Bell, FileText, ArrowRight, CheckCircle2, Lock, Zap,
  BarChart2, RefreshCw, Users, HeartHandshake
} from 'lucide-react'

const mainFeatures = [
  {
    icon: Search,
    title: 'Universal Search',
    description: 'One search bar. Every Nepal government service. Type "driving license", "Lok Sewa form", "PAN registration" — and find the exact portal instantly, with a guide ready to go.',
    badge: 'Core Feature',
    color: 'crimson',
    bullets: [
      'Search across all 50+ portals simultaneously',
      'Results ranked by relevance and popularity',
      'Search in Nepali or English',
    ],
  },
  {
    icon: BookOpen,
    title: 'Step-by-Step Guides',
    description: 'Every major government form has a plain-language guide written by our team. No legal jargon. No assumptions. Just clear instructions from start to finish.',
    badge: 'Most Loved',
    color: 'blue',
    bullets: [
      'Available in Nepali and English',
      'Includes screenshots of actual portal pages',
      'Updated when government sites change',
    ],
  },
  {
    icon: FileText,
    title: 'Document Checklists',
    description: 'Know exactly what you need before you go. Each portal guide includes a checklist of required documents, fees, and office hours — so you are fully prepared.',
    badge: 'Time Saver',
    color: 'green',
    bullets: [
      'Documents listed for every form type',
      'Printable checklist for offline use',
      'Notes on photocopies vs originals',
    ],
  },
  {
    icon: Bell,
    title: 'Smart Reminders',
    description: 'Government deadlines are easy to miss. SewaSetu lets you set reminders for exam form deadlines, tax filing dates, license renewals, and more.',
    badge: 'Coming Soon',
    color: 'orange',
    bullets: [
      'Email and browser reminders',
      'Pre-filled calendar events',
      'Alert before deadline, not on the day',
    ],
  },
  {
    icon: Bookmark,
    title: 'Personal Dashboard',
    description: 'Save your most-used portals and pick up right where you left off. Your dashboard remembers your history, saved portals, and favourite categories.',
    badge: 'For Members',
    color: 'purple',
    bullets: [
      'Bookmark any portal with one click',
      'View recently visited portals',
      'Personalised category suggestions',
    ],
  },
  {
    icon: Globe,
    title: 'Bilingual Interface',
    description: 'Every guide and interface element is available in both Nepali (नेपाली) and English. Switch languages instantly without losing your place.',
    badge: 'Inclusive',
    color: 'teal',
    bullets: [
      'Full UI in Nepali and English',
      'Government terms explained in plain language',
      'Devanagari script throughout',
    ],
  },
]

const secondaryFeatures = [
  { icon: Lock,         title: 'Secure & Private',       desc: 'We never store your government credentials. SewaSetu links you to official sites — your data stays yours.' },
  { icon: Smartphone,   title: 'Mobile First',            desc: 'Optimised for phones and tablets. Access guides on your way to the government office.' },
  { icon: Zap,          title: 'Instant Access',          desc: 'No delays, no queues. Government information available 24 hours a day, 7 days a week.' },
  { icon: RefreshCw,    title: 'Always Up to Date',       desc: 'Our team monitors government portals for changes. Guides are updated whenever processes change.' },
  { icon: BarChart2,    title: 'Popularity Rankings',     desc: 'See which portals and forms are most used by other citizens — helpful when you are not sure where to start.' },
  { icon: HeartHandshake, title: 'Community Contributed', desc: 'Citizens can submit tips and corrections. Guides improve over time through collective knowledge.' },
]

const colorMap: Record<string, { card: string; icon: string; badge: string }> = {
  crimson: { card: 'border-crimson-900/40',  icon: 'bg-crimson-950/60 border-crimson-800/50 text-crimson-400',  badge: 'bg-crimson-950/70 text-crimson-300 border-crimson-800/50' },
  blue:    { card: 'border-blue-900/30',     icon: 'bg-blue-950/60    border-blue-800/50    text-blue-400',     badge: 'bg-blue-950/70    text-blue-300    border-blue-800/50'    },
  green:   { card: 'border-green-900/30',    icon: 'bg-green-950/60   border-green-800/50   text-green-400',    badge: 'bg-green-950/70   text-green-300   border-green-800/50'   },
  orange:  { card: 'border-orange-900/30',   icon: 'bg-orange-950/60  border-orange-800/50  text-orange-400',   badge: 'bg-orange-950/70  text-orange-300  border-orange-800/50'  },
  purple:  { card: 'border-purple-900/30',   icon: 'bg-purple-950/60  border-purple-800/50  text-purple-400',   badge: 'bg-purple-950/70  text-purple-300  border-purple-800/50'  },
  teal:    { card: 'border-teal-900/30',     icon: 'bg-teal-950/60    border-teal-800/50    text-teal-400',     badge: 'bg-teal-950/70    text-teal-300    border-teal-800/50'    },
}

export default function FeaturesPage() {
  return (
    <main className="bg-slate-950 min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-mountain-950/30 to-transparent" />
        <div className="absolute top-20 left-1/3 w-[500px] h-[500px] bg-crimson-900/10 rounded-full blur-[120px]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="tag mb-6 mx-auto w-fit">✦ Platform Features</div>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Built for every
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-crimson-400 to-orange-300">
              Nepali citizen
            </span>
          </h1>
          <p className="text-white/60 text-xl leading-relaxed max-w-2xl mx-auto">
            Every feature in SewaSetu exists to solve a real problem that Nepali citizens face when dealing with government services. Here is what we built — and why.
          </p>
        </div>
      </section>

      {/* Main features */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mainFeatures.map((f) => {
            const Icon = f.icon
            const c = colorMap[f.color]
            return (
              <div key={f.title} className={`glass-card p-7 border ${c.card} hover:bg-white/[0.05] transition-all group`}>
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-11 h-11 rounded-xl border flex items-center justify-center ${c.icon}`}>
                    <Icon size={19} />
                  </div>
                  <span className={`text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border ${c.badge}`}>
                    {f.badge}
                  </span>
                </div>
                <h3 className="text-white font-semibold text-lg mb-3 group-hover:text-crimson-300 transition-colors font-display">
                  {f.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-5">
                  {f.description}
                </p>
                <ul className="space-y-2">
                  {f.bullets.map(b => (
                    <li key={b} className="flex items-center gap-2 text-xs text-white/40">
                      <CheckCircle2 size={12} className="text-green-500 flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </section>

      {/* Secondary features */}
      <section className="py-20 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white text-center mb-12">
            And much more
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {secondaryFeatures.map(f => {
              const Icon = f.icon
              return (
                <div key={f.title} className="glass-card p-6 flex gap-4 hover:bg-white/[0.05] transition-all group">
                  <div className="w-9 h-9 flex-shrink-0 bg-white/[0.04] border border-white/[0.07] rounded-lg flex items-center justify-center">
                    <Icon size={16} className="text-white/50 group-hover:text-crimson-400 transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm mb-1 group-hover:text-crimson-300 transition-colors">{f.title}</h4>
                    <p className="text-white/40 text-xs leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">
          Ready to experience it?
        </h2>
        <p className="text-white/50 text-lg mb-8">
          Create your free account and access every feature today. No credit card. No government credentials stored.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register" className="btn-primary flex items-center justify-center gap-2 text-base !px-10 !py-4">
            Get Started Free <ArrowRight size={18} />
          </Link>
          <Link href="/portals" className="btn-outline flex items-center justify-center gap-2 text-base !px-10 !py-4">
            Browse Portals
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
