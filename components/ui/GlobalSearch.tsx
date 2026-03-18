'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X, ExternalLink, ArrowRight, Loader2 } from 'lucide-react'

interface Portal {
  id: string; slug: string; name: string; icon: string
  category: string; description: string; url: string; tags: string[]
}

interface GlobalSearchProps {
  placeholder?: string
  className?: string
  autofocus?: boolean
}

export default function GlobalSearch({ placeholder, className, autofocus }: GlobalSearchProps) {
  const router        = useRouter()
  const inputRef      = useRef<HTMLInputElement>(null)
  const [query, setQ] = useState('')
  const [results, setResults] = useState<Portal[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen]       = useState(false)
  const [sel, setSel]         = useState(-1)
  const debounceRef           = useRef<NodeJS.Timeout>()

  // Keyboard shortcut: Ctrl+K / Cmd+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
        setOpen(true)
      }
      if (e.key === 'Escape') { setOpen(false); setQ('') }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const search = useCallback(async (q: string) => {
    if (!q.trim()) { setResults([]); setOpen(false); return }
    setLoading(true)
    try {
      const res  = await fetch(`/api/portals?q=${encodeURIComponent(q)}`)
      const data = await res.json()
      setResults((data.portals || []).slice(0, 8))
      setOpen(true)
      setSel(-1)
    } finally {
      setLoading(false)
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setQ(val)
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => search(val), 250)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open || results.length === 0) return
    if (e.key === 'ArrowDown') { e.preventDefault(); setSel(s => Math.min(s + 1, results.length - 1)) }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setSel(s => Math.max(s - 1, -1)) }
    if (e.key === 'Enter' && sel >= 0) {
      router.push(`/dashboard/portals/${results[sel].slug}`)
      setOpen(false); setQ('')
    }
    if (e.key === 'Enter' && sel === -1 && query.trim()) {
      router.push(`/dashboard/portals?q=${encodeURIComponent(query)}`)
      setOpen(false)
    }
  }

  const clearSearch = () => { setQ(''); setResults([]); setOpen(false); inputRef.current?.focus() }

  // Log search activity
  const logSearch = useCallback(async (q: string) => {
    if (!q.trim()) return
    fetch('/api/user/activity', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'SEARCH', meta: { query: q } }),
    }).catch(() => {})
  }, [])

  return (
    <div className={`relative ${className}`}>
      {/* Input */}
      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          autoFocus={autofocus}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query && setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder={placeholder || 'Search portals… (⌘K)'}
          className="w-full bg-white/[0.04] border border-white/[0.09] rounded-xl pl-11 pr-10 py-3.5 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-crimson-700/60 focus:bg-white/[0.06] transition-all"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {loading && <Loader2 size={14} className="text-white/30 animate-spin" />}
          {query && !loading && (
            <button onClick={clearSearch} className="text-white/30 hover:text-white/60 transition-colors">
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Dropdown */}
      {open && (results.length > 0 || query.trim()) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900/95 backdrop-blur-md border border-white/[0.1] rounded-xl shadow-card overflow-hidden z-50">
          {results.length === 0 && query.trim() && !loading && (
            <div className="px-4 py-8 text-center text-white/30 text-sm">
              No portals found for "{query}"
            </div>
          )}
          {results.map((portal, i) => (
            <button
              key={portal.id}
              onMouseDown={() => {
                router.push(`/dashboard/portals/${portal.slug}`)
                logSearch(query)
                setOpen(false); setQ('')
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/[0.06] transition-colors border-b border-white/[0.04] last:border-0 ${
                sel === i ? 'bg-white/[0.06]' : ''
              }`}
            >
              <span className="text-xl flex-shrink-0">{portal.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="text-white text-sm font-medium truncate">{portal.name}</div>
                <div className="text-white/35 text-xs truncate">{portal.description}</div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-white/20 text-[10px] capitalize hidden sm:block">{portal.category}</span>
                <ArrowRight size={12} className="text-white/20" />
              </div>
            </button>
          ))}
          {results.length > 0 && (
            <button
              onMouseDown={() => {
                router.push(`/dashboard/portals?q=${encodeURIComponent(query)}`)
                logSearch(query)
                setOpen(false)
              }}
              className="w-full px-4 py-3 text-crimson-400 hover:text-crimson-300 text-xs font-medium hover:bg-white/[0.04] transition-colors flex items-center justify-center gap-1.5"
            >
              <Search size={11} /> See all results for "{query}"
            </button>
          )}
        </div>
      )}
    </div>
  )
}
