import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, ExternalLink, Clock, TrendingUp, Bookmark, Search } from 'lucide-react'
import { categories } from '@/data/portals'
import GlobalSearch from '@/components/ui/GlobalSearch'

async function getDashboardData(userId: string) {
  const [bookmarks, activities, activityCount] = await Promise.all([
    prisma.bookmark.findMany({
      where: { userId },
      include: { portal: { select: { id: true, slug: true, name: true, icon: true, url: true, category: true } } },
      orderBy: { createdAt: 'desc' },
      take: 8,
    }),
    prisma.activity.findMany({
      where: { userId },
      include: { portal: { select: { id: true, name: true, icon: true, url: true } } },
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
    prisma.activity.count({ where: { userId } }),
  ])
  return { bookmarks, activities, activityCount }
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect('/login')

  const userId = (session.user as any).id
  const { bookmarks, activities, activityCount } = await getDashboardData(userId)

  const hour     = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
  const firstName = session.user.name?.split(' ')[0] || 'there'

  const quickAccess = bookmarks.length > 0
    ? bookmarks.slice(0, 8).map(b => b.portal)
    : []

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="font-display text-3xl font-bold text-white mb-1">
          {greeting}, {firstName} 👋
        </h1>
        <p className="text-white/45 text-sm">Here's your government services overview.</p>
      </div>

      {/* Search bar */}
      <GlobalSearch placeholder="Search any government service — passport, Lok Sewa, PAN, driving license… (⌘K)" />

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Bookmark,   label: 'Saved Portals',    value: bookmarks.length,  color: 'text-crimson-400' },
          { icon: Clock,      label: 'Recently Viewed',  value: activities.length, color: 'text-blue-400'    },
          { icon: TrendingUp, label: 'Total Activities', value: activityCount,     color: 'text-green-400'   },
          { icon: Search,     label: 'Categories',       value: categories.length, color: 'text-yellow-400'  },
        ].map(stat => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="glass-card p-5">
              <Icon size={18} className={`${stat.color} mb-3`} />
              <div className="font-display text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-white/40 text-xs mt-0.5">{stat.label}</div>
            </div>
          )
        })}
      </div>

      {/* Quick access grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-semibold">Quick Access</h2>
          <Link href="/dashboard/portals" className="text-crimson-400 hover:text-crimson-300 text-xs flex items-center gap-1 transition-colors">
            View all <ArrowRight size={12} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickAccess.map(portal => (
            <a
              key={portal.id}
              href={portal.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-4 flex flex-col items-center text-center hover:bg-white/[0.07] hover:border-white/[0.14] transition-all group"
            >
              <span className="text-2xl mb-2">{portal.icon}</span>
              <span className="text-white text-xs font-medium leading-snug group-hover:text-crimson-300 transition-colors line-clamp-2">
                {portal.name}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-semibold">Browse by Category</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {categories.map(cat => (
            <Link
              key={cat.id}
              href={`/dashboard/portals?category=${cat.id}`}
              className="glass-card p-4 flex items-center gap-3 hover:bg-white/[0.07] hover:border-white/[0.14] transition-all group"
            >
              <span className="text-xl flex-shrink-0">{cat.icon}</span>
              <span className="text-white/60 text-xs font-medium group-hover:text-white transition-colors leading-snug">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent activity */}
      <div>
        <h2 className="text-white font-semibold mb-4">Recently Viewed</h2>
        {activities.length === 0 ? (
          <div className="glass-card p-10 text-center">
            <Clock size={32} className="text-white/15 mx-auto mb-3" />
            <p className="text-white/40 text-sm">No activity yet. Start browsing portals!</p>
            <Link href="/dashboard/portals" className="mt-4 inline-flex items-center gap-1.5 text-crimson-400 hover:text-crimson-300 text-sm transition-colors">
              Browse Portals <ArrowRight size={13} />
            </Link>
          </div>
        ) : (
          <div className="glass-card divide-y divide-white/[0.05]">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.03] transition-colors group">
                <span className="text-xl flex-shrink-0">{activity.portal?.icon ?? '🌐'}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-medium truncate group-hover:text-crimson-300 transition-colors">
                    {activity.portal?.name ?? 'Unknown portal'}
                  </div>
                  <div className="text-white/30 text-xs">
                    {new Date(activity.createdAt).toLocaleString('en-NP', { dateStyle: 'medium', timeStyle: 'short' })}
                  </div>
                </div>
                {activity.portal?.url && (
                  <a
                    href={activity.portal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-white/40 hover:text-white"
                  >
                    <ExternalLink size={13} />
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
