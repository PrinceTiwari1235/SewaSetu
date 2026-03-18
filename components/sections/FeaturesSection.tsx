import {
  Search, BookOpen, Bookmark, Globe, Shield, Smartphone,
  ArrowRight, CheckCircle2, FileText, Bell
} from 'lucide-react'

const features = [
  {
    icon: Search,
    title: 'Universal Search',
    description: 'Search any government service across all 50+ portals instantly. No more guessing which website has what.',
    color: 'crimson',
  },
  {
    icon: BookOpen,
    title: 'Step-by-Step Guides',
    description: 'Plain-language instructions in Nepali and English for every form — what to fill, what to bring.',
    color: 'blue',
  },
  {
    icon: FileText,
    title: 'Document Checklist',
    description: 'Know exactly what documents you need before visiting any office. Avoid wasted trips.',
    color: 'green',
  },
  {
    icon: Bookmark,
    title: 'Save Favourites',
    description: 'Bookmark your most-used portals (Lok Sewa, Passport, NEB) for instant access on every visit.',
    color: 'yellow',
  },
  {
    icon: Bell,
    title: 'Deadline Reminders',
    description: 'Get notified about exam form deadlines, tax filing dates, and license renewal schedules.',
    color: 'orange',
  },
  {
    icon: Globe,
    title: 'Bilingual Platform',
    description: 'Full support for both Nepali (नेपाली) and English — so no citizen is left behind.',
    color: 'purple',
  },
  {
    icon: Shield,
    title: 'Secure Login',
    description: 'Your data stays private. We never store your government credentials — we only link you.',
    color: 'teal',
  },
  {
    icon: Smartphone,
    title: 'Mobile Friendly',
    description: 'Works perfectly on any device. Access government services from your phone, tablet or laptop.',
    color: 'pink',
  },
]

const colorMap: Record<string, string> = {
  crimson: 'bg-crimson-950/50 border-crimson-900/40 text-crimson-400',
  blue:    'bg-blue-950/50    border-blue-900/40    text-blue-400',
  green:   'bg-green-950/50   border-green-900/40   text-green-400',
  yellow:  'bg-yellow-950/50  border-yellow-900/40  text-yellow-400',
  orange:  'bg-orange-950/50  border-orange-900/40  text-orange-400',
  purple:  'bg-purple-950/50  border-purple-900/40  text-purple-400',
  teal:    'bg-teal-950/50    border-teal-900/40    text-teal-400',
  pink:    'bg-pink-950/50    border-pink-900/40    text-pink-400',
}

export default function FeaturesSection() {
  return (
    <section id="features" className="py-28 relative">
      {/* Bg glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-mountain-900/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="tag mb-6">✦ Features</div>
          <h2 className="section-title mb-5">
            Everything you need to navigate
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-crimson-400 to-orange-300">
              Nepal's e-governance
            </span>
          </h2>
          <p className="section-subtitle mx-auto text-center">
            Designed from the ground up for Nepali citizens — no tech skills required. If you can use a smartphone, you can use SewaSetu.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, i) => {
            const Icon = feature.icon
            const cls = colorMap[feature.color]
            return (
              <div
                key={feature.title}
                className="glass-card p-6 hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-300 group"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-4 ${cls}`}>
                  <Icon size={18} />
                </div>
                <h3 className="text-white font-semibold mb-2 group-hover:text-crimson-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 glass-card p-8 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-crimson-950/50 to-transparent" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                Ready to simplify your government experience?
              </h3>
              <p className="text-white/50">Join thousands of Nepali citizens who already use SewaSetu.</p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <a href="/register" className="btn-primary flex items-center gap-2 whitespace-nowrap">
                Start for Free <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
