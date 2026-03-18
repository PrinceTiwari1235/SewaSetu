'use client'

import { useState, useEffect } from 'react'
import { Search, ShieldCheck, ShieldOff, Loader2, User, Mail, Calendar } from 'lucide-react'

interface UserRow {
  id: string; name: string; email: string; role: string; language: string
  createdAt: string; _count: { bookmarks: number; activities: number }
}

export default function AdminUsersPage() {
  const [users, setUsers]     = useState<UserRow[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery]     = useState('')
  const [toggling, setToggling] = useState<string | null>(null)
  const [msg, setMsg]         = useState('')

  useEffect(() => { fetchUsers() }, [])

  async function fetchUsers() {
    setLoading(true)
    try {
      const res  = await fetch('/api/admin/users')
      const data = await res.json()
      setUsers(data.users || [])
    } finally { setLoading(false) }
  }

  async function toggleRole(user: UserRow) {
    setToggling(user.id)
    const newRole = user.role === 'ADMIN' ? 'USER' : 'ADMIN'
    const res = await fetch(`/api/admin/users/${user.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: newRole }),
    })
    if (res.ok) {
      setUsers(prev => prev.map(u => u.id === user.id ? { ...u, role: newRole } : u))
      setMsg(`${user.name} is now ${newRole}`)
      setTimeout(() => setMsg(''), 3000)
    }
    setToggling(null)
  }

  const filtered = users.filter(u =>
    !query || u.name.toLowerCase().includes(query.toLowerCase()) || u.email.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white mb-1">Users</h1>
          <p className="text-white/40 text-sm">{users.length} registered accounts</p>
        </div>
      </div>

      {msg && (
        <div className="px-4 py-3 rounded-lg text-sm bg-green-950/50 border border-green-800/50 text-green-400">{msg}</div>
      )}

      <div className="relative">
        <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
        <input type="text" value={query} onChange={e => setQuery(e.target.value)}
          placeholder="Search by name or email…"
          className="w-full bg-white/[0.04] border border-white/[0.09] rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-crimson-700/60 transition-all" />
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06] text-white/40 text-xs uppercase tracking-wider">
                <th className="text-left px-5 py-3 font-medium">User</th>
                <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Language</th>
                <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Bookmarks</th>
                <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Joined</th>
                <th className="text-left px-4 py-3 font-medium">Role</th>
                <th className="text-right px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="text-center py-12"><Loader2 size={20} className="text-white/30 animate-spin mx-auto" /></td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-12 text-white/30 text-sm">No users found</td></tr>
              ) : filtered.map(user => (
                <tr key={user.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors group">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${user.role === 'ADMIN' ? 'bg-crimson-700' : 'bg-mountain-700'}`}>
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-white font-medium group-hover:text-crimson-300 transition-colors">{user.name}</div>
                        <div className="text-white/35 text-xs">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="text-white/40 text-xs">{user.language}</span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="text-white/40 text-xs">{user._count.bookmarks}</span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span className="text-white/30 text-xs">
                      {new Date(user.createdAt).toLocaleDateString('en-NP', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${
                      user.role === 'ADMIN'
                        ? 'bg-crimson-950/50 border-crimson-800/40 text-crimson-400'
                        : 'bg-white/[0.04] border-white/[0.08] text-white/40'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end">
                      <button
                        onClick={() => toggleRole(user)}
                        disabled={toggling === user.id}
                        title={user.role === 'ADMIN' ? 'Demote to User' : 'Promote to Admin'}
                        className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-all disabled:opacity-40 ${
                          user.role === 'ADMIN'
                            ? 'border-crimson-800/50 text-crimson-400 hover:bg-crimson-950/50'
                            : 'border-white/[0.08] text-white/30 hover:text-crimson-400 hover:border-crimson-800/50'
                        }`}
                      >
                        {toggling === user.id
                          ? <Loader2 size={12} className="animate-spin" />
                          : user.role === 'ADMIN' ? <ShieldOff size={12} /> : <ShieldCheck size={12} />
                        }
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
