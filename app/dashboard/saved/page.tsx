'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Bookmark, ExternalLink, Trash2, Plus, Search, Loader2 } from 'lucide-react'

interface Portal {
  id: string; slug: string; name: string; url: string
  icon: string; category: string; tags: string[]; description: string
}

export default function SavedPage() {
  const [portals, setPortals]   = useState<Portal[]>([])
  const [loading, setLoading]   = useState(true)
  const [removing, setRemoving] = useState<string | null>(null)

  const fetchBookmarks = useCallback(async () => {
    setLoading(true)
    try {
      const res  = await fetch('/api/user/bookmarks')
      const data = await res.json()
      setPortals(data.bookmarks || [])
    } finally { setLoading(false) }
  }, [])

  useEffect(() => { fetchBookmarks() }, [fetchBookmarks])

  const remove = async (portalId: string) => {
    setRemoving(portalId)
    await fetch(`/api/user/bookmarks?portalId=${portalId}`, { method: 'DELETE' })
    setPortals(prev => prev.filter(p => p.id !== portalId))
    setRemoving(null)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white mb-1">Saved Portals</h1>
          <p className="text-white/40 text-sm">
            {loading ? 'Loading…' : `${portals.length} bookmarked portal${portals.length !== 1 ? 's' : ''}`}
          </p>
        </div>
        <Link href="/dashboard/portals" className="btn-outline !py-2 !px-4 text-xs flex items-center gap-1.5">
          <Plus size={13} /> Add More
        </Link>
      </div>

      {loading ? (
        <div className="glass-card p-16 flex items-center justify-center">
          <Loader2 size={24} className="text-white/30 animate-spin" />
        </div>
      ) : portals.length === 0 ? (
        <div className="glass-card p-16 text-center">
          <Bookmark size={40} className="text-white/15 mx-auto mb-4" />
          <h3 className="text-white font-semibold mb-2">No saved portals yet</h3>
          <p className="text-white/40 text-sm mb-6">Browse portals and bookmark the ones you use frequently.</p>
          <Link href="/dashboard/portals" className="btn-primary text-sm inline-flex items-center gap-1.5">
            <Search size={14} /> Browse Portals
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {portals.map(portal => (
            <div key={portal.id} className="glass-card px-5 py-4 flex items-center gap-4 hover:bg-white/[0.05] transition-all group">
              <span className="text-2xl flex-shrink-0">{portal.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="text-white font-medium text-sm group-hover:text-crimson-300 transition-colors truncate">{portal.name}</div>
                <div className="text-white/35 text-xs truncate">{portal.url.replace('https://', '')}</div>
              </div>
              <div className="hidden sm:flex flex-wrap gap-1">
                {portal.tags.slice(0, 2).map(t => (
                  <span key={t} className="text-[10px] bg-white/[0.04] text-white/25 px-2 py-0.5 rounded-full">{t}</span>
                ))}
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <a href={portal.url} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg border border-white/[0.08] flex items-center justify-center text-white/35 hover:text-crimson-400 hover:border-crimson-800/50 transition-all">
                  <ExternalLink size={13} />
                </a>
                <button onClick={() => remove(portal.id)} disabled={removing === portal.id}
                  className="w-8 h-8 rounded-lg border border-white/[0.08] flex items-center justify-center text-white/25 hover:text-red-400 hover:border-red-900/50 transition-all disabled:opacity-40">
                  {removing === portal.id ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
