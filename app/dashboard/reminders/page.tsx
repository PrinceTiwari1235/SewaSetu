'use client'

import { useState, useEffect } from 'react'
import { Bell, Plus, Trash2, Calendar, Loader2, CheckCircle2, X } from 'lucide-react'

interface Reminder {
  id: string; title: string; note: string | null
  dueDate: string; recurring: boolean; sent: boolean
}

function daysUntil(date: string) {
  const diff = new Date(date).getTime() - Date.now()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

function urgencyClass(days: number) {
  if (days < 0)  return 'text-white/30 line-through'
  if (days <= 3) return 'text-red-400'
  if (days <= 7) return 'text-yellow-400'
  return 'text-green-400'
}

export default function RemindersPage() {
  const [reminders, setReminders] = useState<Reminder[]>([])
  const [loading, setLoading]     = useState(true)
  const [showForm, setShowForm]   = useState(false)
  const [form, setForm]           = useState({ title: '', note: '', dueDate: '', recurring: false })
  const [saving, setSaving]       = useState(false)
  const [deleting, setDeleting]   = useState<string | null>(null)

  useEffect(() => { fetchReminders() }, [])

  async function fetchReminders() {
    setLoading(true)
    try {
      const res  = await fetch('/api/user/reminders')
      const data = await res.json()
      setReminders(data.reminders || [])
    } finally { setLoading(false) }
  }

  async function handleAdd() {
    if (!form.title || !form.dueDate) return
    setSaving(true)
    const res = await fetch('/api/user/reminders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      setShowForm(false)
      setForm({ title: '', note: '', dueDate: '', recurring: false })
      fetchReminders()
    }
    setSaving(false)
  }

  async function handleDelete(id: string) {
    setDeleting(id)
    await fetch(`/api/user/reminders/${id}`, { method: 'DELETE' })
    setReminders(prev => prev.filter(r => r.id !== id))
    setDeleting(null)
  }

  const upcoming = reminders.filter(r => !r.sent && daysUntil(r.dueDate) >= 0)
  const past     = reminders.filter(r => r.sent || daysUntil(r.dueDate) < 0)

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white mb-1">Reminders</h1>
          <p className="text-white/40 text-sm">{upcoming.length} upcoming deadline{upcoming.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary flex items-center gap-2 text-sm !py-2 !px-4">
          <Plus size={14} /> Add Reminder
        </button>
      </div>

      {/* Quick suggestions */}
      <div className="glass-card p-4">
        <p className="text-white/40 text-xs mb-3 uppercase tracking-wider">Common deadlines to track</p>
        <div className="flex flex-wrap gap-2">
          {[
            'Lok Sewa PSC form deadline',
            'Income tax filing (Ashadh)',
            'NEB form fill-up',
            'Driving license renewal',
            'Health insurance enrollment',
            'Passport renewal',
          ].map(s => (
            <button
              key={s}
              onClick={() => { setForm(f => ({ ...f, title: s })); setShowForm(true) }}
              className="text-xs bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.07] text-white/50 hover:text-white px-3 py-1.5 rounded-full transition-all"
            >
              + {s}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="glass-card p-16 flex items-center justify-center">
          <Loader2 size={24} className="text-white/30 animate-spin" />
        </div>
      ) : upcoming.length === 0 && past.length === 0 ? (
        <div className="glass-card p-14 text-center">
          <Bell size={36} className="text-white/15 mx-auto mb-3" />
          <p className="text-white font-semibold mb-1">No reminders yet</p>
          <p className="text-white/40 text-sm">Track exam deadlines, tax dates, and license renewals.</p>
        </div>
      ) : (
        <>
          {upcoming.length > 0 && (
            <div>
              <h2 className="text-white/50 text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
                <Calendar size={12} /> Upcoming
              </h2>
              <div className="space-y-2">
                {upcoming.map(r => {
                  const days = daysUntil(r.dueDate)
                  return (
                    <div key={r.id} className="glass-card px-5 py-4 flex items-center gap-4 group hover:bg-white/[0.04] transition-all">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg font-display font-bold ${
                        days <= 3 ? 'bg-red-950/50 text-red-400' : days <= 7 ? 'bg-yellow-950/50 text-yellow-400' : 'bg-green-950/50 text-green-400'
                      }`}>
                        {days === 0 ? '!' : days}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white font-medium text-sm truncate">{r.title}</div>
                        <div className="text-white/35 text-xs mt-0.5 flex items-center gap-2">
                          <span>{new Date(r.dueDate).toLocaleDateString('en-NP', { dateStyle: 'medium' })}</span>
                          <span className={urgencyClass(days)}>
                            {days === 0 ? 'Today!' : days === 1 ? 'Tomorrow' : `${days} days left`}
                          </span>
                          {r.recurring && <span className="text-blue-400">↻ recurring</span>}
                        </div>
                        {r.note && <div className="text-white/25 text-xs mt-0.5 truncate">{r.note}</div>}
                      </div>
                      <button
                        onClick={() => handleDelete(r.id)}
                        disabled={deleting === r.id}
                        className="opacity-0 group-hover:opacity-100 w-7 h-7 rounded-lg border border-white/[0.07] flex items-center justify-center text-white/25 hover:text-red-400 hover:border-red-900/50 transition-all disabled:opacity-40"
                      >
                        {deleting === r.id ? <Loader2 size={11} className="animate-spin" /> : <Trash2 size={11} />}
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {past.length > 0 && (
            <div>
              <h2 className="text-white/30 text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
                <CheckCircle2 size={12} /> Past / Completed
              </h2>
              <div className="space-y-2">
                {past.map(r => (
                  <div key={r.id} className="glass-card px-5 py-3 flex items-center gap-4 opacity-50">
                    <CheckCircle2 size={16} className="text-white/20 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-white/40 text-sm line-through truncate">{r.title}</div>
                      <div className="text-white/25 text-xs">{new Date(r.dueDate).toLocaleDateString('en-NP', { dateStyle: 'medium' })}</div>
                    </div>
                    <button onClick={() => handleDelete(r.id)} disabled={deleting === r.id}
                      className="w-7 h-7 rounded-lg border border-white/[0.06] flex items-center justify-center text-white/20 hover:text-red-400/60 transition-all">
                      <Trash2 size={11} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Add form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-lg font-bold text-white">Add Reminder</h2>
              <button onClick={() => setShowForm(false)} className="text-white/40 hover:text-white transition-colors"><X size={18} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-white/50 text-xs mb-1.5">Title *</label>
                <input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  placeholder="e.g. PSC exam form deadline"
                  className="w-full bg-white/[0.04] border border-white/[0.09] rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-crimson-700/60 transition-all" />
              </div>
              <div>
                <label className="block text-white/50 text-xs mb-1.5">Due Date *</label>
                <input type="date" value={form.dueDate} onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))}
                  className="w-full bg-white/[0.04] border border-white/[0.09] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-crimson-700/60 transition-all" />
              </div>
              <div>
                <label className="block text-white/50 text-xs mb-1.5">Note (optional)</label>
                <textarea value={form.note} onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
                  placeholder="Any extra details…" rows={2}
                  className="w-full bg-white/[0.04] border border-white/[0.09] rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-crimson-700/60 transition-all resize-none" />
              </div>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <div onClick={() => setForm(f => ({ ...f, recurring: !f.recurring }))}
                  className={`w-10 h-5 rounded-full transition-colors ${form.recurring ? 'bg-crimson-600' : 'bg-white/10'} relative flex-shrink-0`}>
                  <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${form.recurring ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </div>
                <span className="text-white/60 text-sm">Repeat yearly</span>
              </label>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowForm(false)} className="btn-outline flex-1 text-sm !py-2.5">Cancel</button>
              <button onClick={handleAdd} disabled={saving || !form.title || !form.dueDate}
                className="btn-primary flex-1 flex items-center justify-center gap-2 text-sm !py-2.5 disabled:opacity-50">
                {saving ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
                {saving ? 'Saving…' : 'Add Reminder'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
