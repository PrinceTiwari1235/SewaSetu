'use client'

import { useState, useMemo, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { Search, ExternalLink, Bookmark, X, Filter, Loader2 } from 'lucide-react'
import { categories } from '@/data/portals'

interface Portal {
  id: string; slug: string; name: string; url: string; icon: string
  category: string; description: string; tags: string[]; featured: boolean
}

export default function DashboardPortalsPage() {
  const [portals, setPortals]       = useState<Portal[]>([])
  const [loading, setLoading]       = useState(true)
  const [query, setQuery]           = useState('')
  const [activeCategory, setActive] = useState<string | null>(null)
  const [saved, setSaved]           = useState<Set<string>>(new Set())
  const [toggling, setToggling]     = useState<string | null>(null)

  // Fetch portals from real API
  const fetchPortals = useCallback(async (q?: string, cat?: string | null) => {
    setLoading(true)
    const params = new URLSearchParams()
    if (q)   params.set('q', q)
    if (cat) params.set('category', cat)
    try {
      const res  = await fetch(`/api/portals?${params}`)
      const data = await res.json()
      setPortals(data.portals || [])
    } finally { setLoading(false) }
  }, [])

  // Fetch saved bookmarks
  const fetchSaved = useCallback(async () => {
    const res  = await fetch('/api/user/bookmarks')
    const data = await res.json()
    setSaved(new Set((data.bookmarks || []).map((p: Portal) => p.id)))
  }, [])

  useEffect(() => { fetchPortals(); fetchSaved() }, [fetchPortals, fetchSaved])

  // Debounced search
  useEffect(() => {
    const t = setTimeout(() => fetchPortals(query, activeCategory), 300)
    return () => clearTimeout(t)
  }, [query, activeCategory, fetchPortals])

  const toggleSave = async (portal: Portal) => {
    setToggling(portal.id)
    if (saved.has(portal.id)) {
      await fetch(`/api/user/bookmarks?portalId=${portal.id}`, { method: 'DELETE' })
      setSaved(prev => { const n = new Set(prev); n.delete(portal.id); return n })
    } else {
      await fetch('/api/user/bookmarks', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ portalId: portal.id }),
      })
      setSaved(prev => new Set([...prev, portal.id]))
    }
    setToggling(null)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-white mb-1">All Portals</h1>
        <p className="text-white/40 text-sm">{loading ? '…' : `${portals.length} portals`} across 14 categories</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
        <input type="text" value={query} onChange={e => setQuery(e.target.value)}
          placeholder="Search portals — passport, Lok Sewa, PAN, driving license…"
          className="w-full bg-white/[0.04] border border-white/[0.09] rounded-xl pl-10 pr-9 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-crimson-700/60 transition-all" />
        {query && (
          <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
            <X size={13} />
          </button>
        )}
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setActive(null)}
          className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${!activeCategory ? 'bg-crimson-800/60 border-crimson-700/60 text-white' : 'bg-white/[0.04] border-white/[0.07] text-white/50 hover:text-white'}`}>
          All
        </button>
        {categories.map(c => (
          <button key={c.id} onClick={() => setActive(c.id === activeCategory ? null : c.id)}
            className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${activeCategory === c.id ? 'bg-crimson-800/60 border-crimson-700/60 text-white' : 'bg-white/[0.04] border-white/[0.07] text-white/50 hover:text-white'}`}>
            {c.icon} {c.label}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="flex items-center gap-2 text-white/30 text-xs">
        <Filter size={11} />
        {loading ? 'Searching…' : `${portals.length} portal${portals.length !== 1 ? 's' : ''}`}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={24} className="text-white/30 animate-spin" />
        </div>
      ) : portals.length === 0 ? (
        <div className="glass-card p-14 text-center">
          <Search size={32} className="text-white/15 mx-auto mb-3" />
          <p className="text-white/50 text-sm font-medium">No portals found</p>
          <p className="text-white/30 text-xs mt-1">Try a different search term or clear the filter</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {portals.map(portal => (
            <div key={portal.id} className="glass-card p-5 hover:bg-white/[0.06] hover:border-white/[0.12] transition-all group flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">{portal.icon}</span>
                <button onClick={() => toggleSave(portal)} disabled={toggling === portal.id}
                  className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-all ${
                    saved.has(portal.id)
                      ? 'bg-crimson-900/50 border-crimson-700/50 text-crimson-400'
                      : 'border-white/[0.08] text-white/25 hover:border-white/20 hover:text-white/50'
                  }`}>
                  {toggling === portal.id
                    ? <Loader2 size={11} className="animate-spin" />
                    : <Bookmark size={12} fill={saved.has(portal.id) ? 'currentColor' : 'none'} />
                  }
                </button>
              </div>

              <Link href={`/dashboard/portals/${portal.slug}`}>
                <h3 className="text-white font-semibold text-sm mb-1.5 group-hover:text-crimson-300 transition-colors leading-snug cursor-pointer">
                  {portal.name}
                </h3>
              </Link>

              <p className="text-white/40 text-xs leading-relaxed mb-3 flex-1 line-clamp-2">{portal.description}</p>

              <div className="flex flex-wrap gap-1 mb-3">
                {portal.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="text-[10px] bg-white/[0.04] text-white/30 px-2 py-0.5 rounded-full">{tag}</span>
                ))}
              </div>

              <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/[0.05]">
                <Link href={`/dashboard/portals/${portal.slug}`}
                  className="text-crimson-500 hover:text-crimson-300 text-xs font-medium transition-colors">
                  View Guide →
                </Link>
                <a href={portal.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1 text-white/30 hover:text-white text-xs transition-colors">
                  Open <ExternalLink size={10} />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
