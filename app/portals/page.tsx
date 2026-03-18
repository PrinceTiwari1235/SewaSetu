'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { useState, useMemo } from 'react'
import { Search, ExternalLink, Filter, X } from 'lucide-react'
import { portals, categories } from '@/data/portals'

export default function PortalsPage() {
  const [query, setQuery]         = useState('')
  const [activeCategory, setActive] = useState<string | null>(null)

  const filtered = useMemo(() => {
    let list = portals
    if (activeCategory) list = list.filter(p => p.category === activeCategory)
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      )
    }
    return list
  }, [query, activeCategory])

  const groupedByCategory = useMemo(() => {
    if (query.trim() || activeCategory) return null
    const map: Record<string, typeof portals> = {}
    for (const cat of categories) {
      const items = portals.filter(p => p.category === cat.id)
      if (items.length) map[cat.id] = items
    }
    return map
  }, [query, activeCategory])

  return (
    <main className="bg-slate-950 min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-12 relative overflow-hidden">
        <div className="absolute top-10 right-1/4 w-[400px] h-[300px] bg-crimson-900/10 rounded-full blur-[100px]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="tag mb-5 mx-auto w-fit">✦ All Portals</div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Nepal Government
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-crimson-400 to-orange-300">
              Portal Directory
            </span>
          </h1>
          <p className="text-white/55 text-lg max-w-xl mx-auto mb-8">
            Browse all {portals.length}+ official government portals, filtered by category or searched by keyword.
          </p>

          {/* Search bar */}
          <div className="relative max-w-xl mx-auto">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search portals, services, or keywords…"
              className="w-full bg-white/[0.06] border border-white/[0.1] rounded-xl pl-11 pr-10 py-3.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-crimson-700/60 focus:bg-white/[0.08] transition-all"
            />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                <X size={15} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Category filters */}
      <section className="max-w-7xl mx-auto px-6 pb-6">
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setActive(null)}
            className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${
              activeCategory === null
                ? 'bg-crimson-800/60 border-crimson-700/60 text-white'
                : 'bg-white/[0.04] border-white/[0.07] text-white/50 hover:text-white hover:border-white/20'
            }`}
          >
            All Categories
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id === activeCategory ? null : cat.id)}
              className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${
                activeCategory === cat.id
                  ? 'bg-crimson-800/60 border-crimson-700/60 text-white'
                  : 'bg-white/[0.04] border-white/[0.07] text-white/50 hover:text-white hover:border-white/20'
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Results */}
      <section className="max-w-7xl mx-auto px-6 pb-28">
        {/* Flat search results */}
        {(query.trim() || activeCategory) && (
          <>
            <div className="flex items-center gap-2 mb-6 text-white/40 text-sm">
              <Filter size={13} />
              {filtered.length} portal{filtered.length !== 1 ? 's' : ''} found
              {activeCategory && <span className="bg-crimson-950/50 border border-crimson-800/40 text-crimson-300 text-xs px-2 py-0.5 rounded-full">{categories.find(c=>c.id===activeCategory)?.label}</span>}
              {query && <span className="bg-white/[0.05] border border-white/[0.08] text-white/40 text-xs px-2 py-0.5 rounded-full">"{query}"</span>}
            </div>
            {filtered.length === 0 ? (
              <div className="text-center py-20 text-white/30">
                <Search size={40} className="mx-auto mb-4 opacity-30" />
                <p className="text-lg">No portals found</p>
                <p className="text-sm mt-1">Try a different search term or category</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filtered.map(portal => (
                  <PortalItem key={portal.id} portal={portal} />
                ))}
              </div>
            )}
          </>
        )}

        {/* Grouped by category (default view) */}
        {!query.trim() && !activeCategory && groupedByCategory && (
          <div className="space-y-14">
            {categories.map(cat => {
              const items = groupedByCategory[cat.id]
              if (!items) return null
              return (
                <div key={cat.id} id={cat.id}>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">{cat.icon}</span>
                    <h2 className="font-display text-2xl font-bold text-white">{cat.label}</h2>
                    <span className="text-white/30 text-sm ml-auto">{items.length} portal{items.length > 1 ? 's' : ''}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {items.map(portal => (
                      <PortalItem key={portal.id} portal={portal} />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}

function PortalItem({ portal }: { portal: typeof portals[0] }) {
  return (
    <div className="glass-card p-5 hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300 group flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <span className="text-2xl">{portal.icon}</span>
        {portal.featured && (
          <span className="text-[9px] bg-crimson-950/60 border border-crimson-800/40 text-crimson-400 px-2 py-0.5 rounded-full font-bold tracking-wider uppercase">Popular</span>
        )}
      </div>
      <h3 className="text-white font-semibold text-sm mb-1.5 group-hover:text-crimson-300 transition-colors leading-snug flex-1">
        {portal.name}
      </h3>
      <p className="text-white/40 text-xs leading-relaxed mb-4 line-clamp-2">
        {portal.description}
      </p>
      <div className="flex flex-wrap gap-1 mb-4">
        {portal.tags.slice(0, 3).map(tag => (
          <span key={tag} className="text-[10px] bg-white/[0.05] text-white/30 px-2 py-0.5 rounded-full">
            {tag}
          </span>
        ))}
      </div>
      <a
        href={portal.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto flex items-center gap-1.5 text-crimson-500 hover:text-crimson-300 text-xs font-medium transition-colors"
      >
        Open Portal <ExternalLink size={11} />
      </a>
    </div>
  )
}
