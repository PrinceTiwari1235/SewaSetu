import { prisma } from '@/lib/prisma'
import { Users, Globe, Bookmark, Activity, TrendingUp, CheckCircle2, AlertCircle, Clock } from 'lucide-react'
import Link from 'next/link'

async function getStats() {
  const [totalUsers, totalPortals, activePortals, totalBookmarks, totalActivities, recentUsers, topPortals] = await Promise.all([
    prisma.user.count(),
    prisma.portal.count(),
    prisma.portal.count({ where: { isActive: true } }),
    prisma.bookmark.count(),
    prisma.activity.count(),
    prisma.user.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: { id: true, name: true, email: true, createdAt: true, role: true },
    }),
    prisma.portal.findMany({
      take: 6,
      orderBy: { bookmarks: { _count: 'desc' } },
      select: {
        id: true, slug: true, name: true, icon: true, category: true, isActive: true, lastVerified: true,
        _count: { select: { bookmarks: true, activities: true } },
      },
    }),
  ])
  return { totalUsers, totalPortals, activePortals, totalBookmarks, totalActivities, recentUsers, topPortals }
}

export default async function AdminOverviewPage() {
  const { totalUsers, totalPortals, activePortals, totalBookmarks, totalActivities, recentUsers, topPortals } = await getStats()

  const metricCards = [
    { label: 'Total Users',     value: totalUsers,       icon: Users,    color: 'text-blue-400',   bg: 'bg-blue-950/50   border-blue-900/30'   },
    { label: 'Active Portals',  value: activePortals,    icon: Globe,    color: 'text-crimson-400',bg: 'bg-crimson-950/50 border-crimson-900/30'},
    { label: 'Total Bookmarks', value: totalBookmarks,   icon: Bookmark, color: 'text-yellow-400', bg: 'bg-yellow-950/50 border-yellow-900/30'  },
    { label: 'Activities Logged',value: totalActivities, icon: Activity, color: 'text-green-400',  bg: 'bg-green-950/50  border-green-900/30'   },
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-bold text-white mb-1">Overview</h1>
        <p className="text-white/40 text-sm">Platform stats and recent activity</p>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards.map(card => {
          const Icon = card.icon
          return (
            <div key={card.label} className={`glass-card p-5 border ${card.bg}`}>
              <div className="flex items-start justify-between mb-3">
                <Icon size={18} className={card.color} />
                <TrendingUp size={12} className="text-white/20" />
              </div>
              <div className="font-display text-3xl font-bold text-white mb-1">{card.value.toLocaleString()}</div>
              <div className="text-white/40 text-xs">{card.label}</div>
            </div>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top portals */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-semibold text-sm">Most Bookmarked Portals</h2>
            <Link href="/admin/portals" className="text-crimson-400 hover:text-crimson-300 text-xs transition-colors">
              Manage all →
            </Link>
          </div>
          <div className="glass-card divide-y divide-white/[0.04]">
            {topPortals.map((portal, i) => (
              <div key={portal.id} className="flex items-center gap-3 px-4 py-3 hover:bg-white/[0.02] transition-colors group">
                <span className="text-white/20 text-xs w-4 text-center">{i + 1}</span>
                <span className="text-lg flex-shrink-0">{portal.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm truncate group-hover:text-crimson-300 transition-colors">{portal.name}</div>
                  <div className="text-white/30 text-xs capitalize">{portal.category}</div>
                </div>
                <div className="flex items-center gap-3 text-xs text-white/30 flex-shrink-0">
                  <div className="flex items-center gap-1">
                    <Bookmark size={10} />
                    {portal._count.bookmarks}
                  </div>
                  <div className={`flex items-center gap-1 ${portal.isActive ? 'text-green-500' : 'text-red-500'}`}>
                    {portal.isActive ? <CheckCircle2 size={10} /> : <AlertCircle size={10} />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent users */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-semibold text-sm">Recent Signups</h2>
            <Link href="/admin/users" className="text-crimson-400 hover:text-crimson-300 text-xs transition-colors">
              View all →
            </Link>
          </div>
          <div className="glass-card divide-y divide-white/[0.04]">
            {recentUsers.map(user => (
              <div key={user.id} className="flex items-center gap-3 px-4 py-3 hover:bg-white/[0.02] transition-colors">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${user.role === 'ADMIN' ? 'bg-crimson-700' : 'bg-mountain-700'}`}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm truncate">{user.name}</div>
                  <div className="text-white/30 text-xs truncate">{user.email}</div>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {user.role === 'ADMIN' && (
                    <span className="text-[10px] bg-crimson-950/60 border border-crimson-800/40 text-crimson-400 px-1.5 py-0.5 rounded">Admin</span>
                  )}
                  <span className="text-white/25 text-[10px]">
                    {new Date(user.createdAt).toLocaleDateString('en-NP', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Portal health */}
      <div>
        <h2 className="text-white font-semibold text-sm mb-4">Portal Health</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="glass-card p-4 text-center">
            <CheckCircle2 size={20} className="text-green-400 mx-auto mb-2" />
            <div className="font-display text-xl font-bold text-white">{activePortals}</div>
            <div className="text-white/40 text-xs mt-0.5">Active Portals</div>
          </div>
          <div className="glass-card p-4 text-center">
            <AlertCircle size={20} className="text-yellow-400 mx-auto mb-2" />
            <div className="font-display text-xl font-bold text-white">{totalPortals - activePortals}</div>
            <div className="text-white/40 text-xs mt-0.5">Inactive / Disabled</div>
          </div>
          <div className="glass-card p-4 text-center">
            <Clock size={20} className="text-blue-400 mx-auto mb-2" />
            <div className="font-display text-xl font-bold text-white">0</div>
            <div className="text-white/40 text-xs mt-0.5">Pending Verification</div>
          </div>
        </div>
      </div>
    </div>
  )
}
