'use client'

import { useState, useEffect } from 'react'
import { Search, Plus, Edit2, Trash2, CheckCircle2, AlertCircle, ExternalLink, X, Save } from 'lucide-react'
import { categories } from '@/data/portals'

interface Portal {
  id: string; slug: string; name: string; url: string; category: string
  description: string; icon: string; tags: string[]; featured: boolean; isActive: boolean
  lastVerified: string; _count?: { bookmarks: number }
}

const emptyForm = { slug: '', name: '', url: 'https://', category: 'identity', description: '', icon: '🌐', tags: '', featured: false }

export default function AdminPortalsPage() {
  const [portals, setPortals]     = useState<Portal[]>([])
  const [loading, setLoading]     = useState(true)
  const [query, setQuery]         = useState('')
  const [showForm, setShowForm]   = useState(false)
  const [editPortal, setEdit]     = useState<Portal | null>(null)
  const [form, setForm]           = useState(emptyForm)
  const [saving, setSaving]       = useState(false)
  const [msg, setMsg]             = useState('')

  useEffect(() => { fetchPortals() }, [])

  async function fetchPortals() {
    setLoading(true)
    try {
      const res  = await fetch('/api/portals')
      const data = await res.json()
      setPortals(data.portals || [])
    } finally {
      setLoading(false)
    }
  }

  function openCreate() {
    setEdit(null)
    setForm(emptyForm)
    setShowForm(true)
  }

  function openEdit(portal: Portal) {
    setEdit(portal)
    setForm({
      slug: portal.slug, name: portal.name, url: portal.url,
      category: portal.category, description: portal.description,
      icon: portal.icon, tags: portal.tags.join(', '), featured: portal.featured,
    })
    setShowForm(true)
  }

  async function handleSave() {
    setSaving(true)
    setMsg('')
    try {
      const payload = { ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) }
      const res = editPortal
        ? await fetch(`/api/portals/${editPortal.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        : await fetch('/api/portals', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })

      if (res.ok) {
        setMsg(editPortal ? 'Portal updated!' : 'Portal created!')
        setShowForm(false)
        fetchPortals()
      } else {
        const d = await res.json()
        setMsg(d.error || 'Failed to save')
      }
    } finally {
      setSaving(false)
    }
  }

  async function toggleActive(portal: Portal) {
    await fetch(`/api/portals/${portal.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: !portal.isActive }),
    })
    fetchPortals()
  }

  const filtered = portals.filter(p =>
    !query || p.name.toLowerCase().includes(query.toLowerCase()) || p.category.includes(query.toLowerCase())
  )

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white mb-1">Portals</h1>
          <p className="text-white/40 text-sm">{portals.length} total portals</p>
        </div>
        <button onClick={openCreate} className="btn-primary flex items-center gap-2 text-sm">
          <Plus size={15} /> Add Portal
        </button>
      </div>

      {msg && (
        <div className={`px-4 py-3 rounded-lg text-sm border ${msg.includes('!') ? 'bg-green-950/50 border-green-800/50 text-green-400' : 'bg-red-950/50 border-red-800/50 text-red-400'}`}>
          {msg}
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
        <input
          type="text" value={query} onChange={e => setQuery(e.target.value)}
          placeholder="Search portals by name or category…"
          className="w-full bg-white/[0.04] border border-white/[0.09] rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-crimson-700/60 transition-all"
        />
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06] text-white/40 text-xs uppercase tracking-wider">
                <th className="text-left px-5 py-3 font-medium">Portal</th>
                <th className="text-left px-4 py-3 font-medium">Category</th>
                <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Bookmarks</th>
                <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Verified</th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
                <th className="text-right px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="text-center py-12 text-white/30 text-sm">Loading portals…</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-12 text-white/30 text-sm">No portals found</td></tr>
              ) : filtered.map(portal => (
                <tr key={portal.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors group">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{portal.icon}</span>
                      <div>
                        <div className="text-white font-medium group-hover:text-crimson-300 transition-colors leading-tight">{portal.name}</div>
                        <div className="text-white/25 text-xs">{portal.slug}</div>
                      </div>
                      {portal.featured && (
                        <span className="text-[9px] bg-crimson-950/60 border border-crimson-800/40 text-crimson-400 px-1.5 py-0.5 rounded uppercase tracking-wide">
                          Featured
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-white/50 text-xs capitalize">{portal.category}</span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="text-white/50 text-xs">{portal._count?.bookmarks ?? 0}</span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span className="text-white/30 text-xs">
                      {new Date(portal.lastVerified).toLocaleDateString('en-NP', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleActive(portal)} className={`flex items-center gap-1 text-xs font-medium transition-colors ${portal.isActive ? 'text-green-400 hover:text-yellow-400' : 'text-red-400 hover:text-green-400'}`}>
                      {portal.isActive
                        ? <><CheckCircle2 size={12} /> Active</>
                        : <><AlertCircle size={12} /> Inactive</>}
                    </button>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1.5">
                      <a href={portal.url} target="_blank" rel="noopener noreferrer"
                        className="w-7 h-7 rounded-lg border border-white/[0.07] flex items-center justify-center text-white/30 hover:text-white hover:border-white/20 transition-all">
                        <ExternalLink size={12} />
                      </a>
                      <button onClick={() => openEdit(portal)}
                        className="w-7 h-7 rounded-lg border border-white/[0.07] flex items-center justify-center text-white/30 hover:text-blue-400 hover:border-blue-800/50 transition-all">
                        <Edit2 size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-lg p-6 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-lg font-bold text-white">{editPortal ? 'Edit Portal' : 'Add New Portal'}</h2>
              <button onClick={() => setShowForm(false)} className="text-white/40 hover:text-white transition-colors"><X size={18} /></button>
            </div>

            <div className="space-y-4">
              {[
                { label: 'Slug (URL-safe ID)',   key: 'slug',        type: 'text',  placeholder: 'e.g. psconline' },
                { label: 'Portal Name',          key: 'name',        type: 'text',  placeholder: 'e.g. PSC Online Application' },
                { label: 'URL',                  key: 'url',         type: 'url',   placeholder: 'https://...' },
                { label: 'Icon (emoji)',          key: 'icon',        type: 'text',  placeholder: '📋' },
                { label: 'Tags (comma-separated)',key: 'tags',        type: 'text',  placeholder: 'PSC, Civil Service, Application' },
              ].map(field => (
                <div key={field.key}>
                  <label className="block text-white/50 text-xs mb-1.5">{field.label}</label>
                  <input
                    type={field.type}
                    value={(form as any)[field.key]}
                    onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                    placeholder={field.placeholder}
                    className="w-full bg-white/[0.04] border border-white/[0.09] rounded-lg px-3 py-2.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-crimson-700/60 transition-all"
                  />
                </div>
              ))}

              <div>
                <label className="block text-white/50 text-xs mb-1.5">Category</label>
                <select
                  value={form.category}
                  onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                  className="w-full bg-white/[0.04] border border-white/[0.09] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-crimson-700/60 transition-all"
                >
                  {categories.map(c => (
                    <option key={c.id} value={c.id} className="bg-slate-900">{c.icon} {c.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white/50 text-xs mb-1.5">Description</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Short description of what services this portal provides…"
                  rows={3}
                  className="w-full bg-white/[0.04] border border-white/[0.09] rounded-lg px-3 py-2.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-crimson-700/60 transition-all resize-none"
                />
              </div>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <div
                  onClick={() => setForm(f => ({ ...f, featured: !f.featured }))}
                  className={`w-10 h-5 rounded-full transition-colors ${form.featured ? 'bg-crimson-600' : 'bg-white/10'} relative flex-shrink-0`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${form.featured ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </div>
                <span className="text-white/60 text-sm">Mark as Featured</span>
              </label>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowForm(false)} className="btn-outline flex-1 text-sm !py-2.5">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="btn-primary flex-1 flex items-center justify-center gap-2 text-sm !py-2.5">
                {saving ? 'Saving…' : <><Save size={14} /> {editPortal ? 'Update' : 'Create'}</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
