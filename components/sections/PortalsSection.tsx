import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { featuredPortals, categories } from '@/data/portals'

export default function PortalsSection() {
  return (
    <section id="portals" className="py-28 relative">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-crimson-950/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="tag mb-5">✦ Portals</div>
            <h2 className="section-title">
              Popular government
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-crimson-400 to-orange-300">
                portals & services
              </span>
            </h2>
          </div>
          <Link
            href="/portals"
            className="flex items-center gap-2 text-crimson-400 hover:text-crimson-300 font-medium text-sm transition-colors group flex-shrink-0"
          >
            View all 50+ portals
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map(cat => (
            <Link
              key={cat.id}
              href={`/portals#${cat.id}`}
              className="flex items-center gap-1.5 text-xs font-medium text-white/50 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] hover:border-white/[0.14] px-3 py-1.5 rounded-full transition-all"
            >
              <span>{cat.icon}</span>
              {cat.label}
            </Link>
          ))}
        </div>

        {/* Featured portals grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {featuredPortals.map((portal) => (
            <div
              key={portal.id}
              className="glass-card p-5 hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">{portal.icon}</span>
                <a
                  href={portal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-white/30 hover:text-white/70"
                >
                  <ExternalLink size={13} />
                </a>
              </div>
              <h3 className="text-white font-semibold text-sm mb-1.5 group-hover:text-crimson-300 transition-colors leading-snug">
                {portal.name}
              </h3>
              <p className="text-white/40 text-xs leading-relaxed mb-4 line-clamp-2">
                {portal.description}
              </p>
              <div className="flex flex-wrap gap-1">
                {portal.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="text-[10px] bg-white/[0.05] text-white/35 px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* View more card */}
        <Link
          href="/portals"
          className="mt-4 glass-card p-5 flex items-center justify-center gap-3 text-white/50 hover:text-white hover:bg-white/[0.06] hover:border-white/[0.12] transition-all group"
        >
          <span className="text-sm font-medium">See all 50+ government portals</span>
          <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  )
}
