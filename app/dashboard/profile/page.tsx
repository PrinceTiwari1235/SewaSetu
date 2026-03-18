'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Save, Loader2, CheckCircle2, User, Mail, Globe, Key } from 'lucide-react'

interface Profile {
  id: string; name: string; email: string; language: string; role: string
  createdAt: string; _count: { bookmarks: number; activities: number; reminders: number }
}

export default function ProfilePage() {
  const { data: session, update } = useSession()
  const [profile, setProfile]     = useState<Profile | null>(null)
  const [form, setForm]           = useState({ name: '', language: 'EN' })
  const [loading, setLoading]     = useState(true)
  const [saving, setSaving]       = useState(false)
  const [saved, setSaved]         = useState(false)
  const [pwForm, setPwForm]       = useState({ current: '', next: '', confirm: '' })
  const [pwMsg, setPwMsg]         = useState('')
  const [pwSaving, setPwSaving]   = useState(false)

  useEffect(() => {
    fetch('/api/user/profile')
      .then(r => r.json())
      .then(d => { setProfile(d.user); setForm({ name: d.user.name, language: d.user.language }) })
      .finally(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    setSaving(true); setSaved(false)
    const res = await fetch('/api/user/profile', {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) { await update({ name: form.name }); setSaved(true); setTimeout(() => setSaved(false), 3000) }
    setSaving(false)
  }

  const handlePasswordChange = async () => {
    if (pwForm.next !== pwForm.confirm) { setPwMsg('Passwords do not match.'); return }
    if (pwForm.next.length < 8) { setPwMsg('Password must be at least 8 characters.'); return }
    setPwSaving(true); setPwMsg('')
    const res  = await fetch('/api/user/password', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword: pwForm.current, newPassword: pwForm.next }),
    })
    const data = await res.json()
    setPwMsg(res.ok ? '✓ Password changed successfully.' : data.error || 'Failed.')
    if (res.ok) setPwForm({ current: '', next: '', confirm: '' })
    setPwSaving(false)
  }

  if (loading) return <div className="flex items-center justify-center h-60"><Loader2 size={24} className="text-white/30 animate-spin" /></div>

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-white mb-1">Profile Settings</h1>
        <p className="text-white/40 text-sm">Manage your account information and preferences</p>
      </div>

      {profile && (
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Saved Portals', value: profile._count.bookmarks  },
            { label: 'Activities',    value: profile._count.activities  },
            { label: 'Reminders',     value: profile._count.reminders   },
          ].map(s => (
            <div key={s.label} className="glass-card p-4 text-center">
              <div className="font-display text-2xl font-bold text-white">{s.value}</div>
              <div className="text-white/40 text-xs mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      )}

      <div className="glass-card p-6 space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-white/[0.06]">
          <div className="w-14 h-14 bg-crimson-700 rounded-2xl flex items-center justify-center text-white font-display font-bold text-xl flex-shrink-0">
            {form.name?.charAt(0)?.toUpperCase() || '?'}
          </div>
          <div>
            <div className="text-white font-semibold">{form.name}</div>
            <div className="text-white/40 text-sm">{profile?.email}</div>
            {profile?.role === 'ADMIN' && (
              <span className="text-[10px] bg-crimson-950/60 border border-crimson-800/40 text-crimson-400 px-2 py-0.5 rounded-full uppercase tracking-wide mt-1 inline-block">Admin</span>
            )}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-1.5 text-white/50 text-xs uppercase tracking-wider mb-2"><User size={11} /> Full Name</label>
            <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className="w-full bg-white/[0.04] border border-white/[0.09] rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-crimson-700/60 transition-all" />
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-white/50 text-xs uppercase tracking-wider mb-2"><Mail size={11} /> Email</label>
            <input type="email" value={profile?.email || ''} disabled
              className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-white/40 text-sm cursor-not-allowed" />
          </div>
        </div>

        <div>
          <label className="flex items-center gap-1.5 text-white/50 text-xs uppercase tracking-wider mb-2"><Globe size={11} /> Language</label>
          <select value={form.language} onChange={e => setForm(f => ({ ...f, language: e.target.value }))}
            className="w-full bg-white/[0.04] border border-white/[0.09] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-crimson-700/60 transition-all">
            <option value="EN" className="bg-slate-900">English</option>
            <option value="NP" className="bg-slate-900">नेपाली (Nepali)</option>
          </select>
        </div>

        <div className="flex items-center justify-between pt-2">
          {saved && <div className="flex items-center gap-1.5 text-green-400 text-sm"><CheckCircle2 size={14} /> Saved</div>}
          <button onClick={handleSave} disabled={saving}
            className="btn-primary ml-auto flex items-center gap-2 text-sm !py-2.5 !px-5 disabled:opacity-60">
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="glass-card p-6 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-white/[0.06]">
          <Key size={15} className="text-white/40" />
          <h2 className="text-white font-semibold text-sm">Change Password</h2>
        </div>
        {[
          { label: 'Current Password', key: 'current', placeholder: 'Your current password' },
          { label: 'New Password',     key: 'next',    placeholder: 'At least 8 characters' },
          { label: 'Confirm New',      key: 'confirm', placeholder: 'Repeat new password'   },
        ].map(f => (
          <div key={f.key}>
            <label className="block text-white/40 text-xs mb-1.5">{f.label}</label>
            <input type="password" value={(pwForm as any)[f.key]}
              onChange={e => setPwForm(p => ({ ...p, [f.key]: e.target.value }))}
              placeholder={f.placeholder}
              className="w-full bg-white/[0.04] border border-white/[0.09] rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-crimson-700/60 transition-all" />
          </div>
        ))}
        {pwMsg && <p className={`text-sm ${pwMsg.startsWith('✓') ? 'text-green-400' : 'text-red-400'}`}>{pwMsg}</p>}
        <button onClick={handlePasswordChange} disabled={pwSaving}
          className="btn-primary flex items-center gap-2 text-sm !py-2.5 !px-5 disabled:opacity-60">
          {pwSaving ? <Loader2 size={14} className="animate-spin" /> : <Key size={14} />}
          {pwSaving ? 'Updating…' : 'Update Password'}
        </button>
      </div>

      <div className="glass-card p-6 border border-red-900/20">
        <h2 className="text-white/60 font-semibold text-sm mb-3">Danger Zone</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/50 text-sm">Delete your account</p>
            <p className="text-white/30 text-xs mt-0.5">Permanently deletes all data. Cannot be undone.</p>
          </div>
          <button className="border border-red-800/50 text-red-400 hover:bg-red-950/30 text-xs px-4 py-2 rounded-lg transition-all">Delete Account</button>
        </div>
      </div>
    </div>
  )
}
