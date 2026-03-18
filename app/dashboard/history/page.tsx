'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ExternalLink, Clock, Loader2, Search, Bookmark, Eye } from 'lucide-react'

interface Activity {
  id: string; type: string; createdAt: string; meta?: any
  portal?: { id: string; name: string; icon: string; url: string; slug: string } | null
}

function groupByDate(activities: Activity[]) {
  const groups: Record<string, Activity[]> = {}
  for (const a of activities) {
    const date = new Date(a.createdAt)
    const today    = new Date()
    const yesterday = new Date(today); yesterday.setDate(today.getDate() - 1)
    let label: string
    if (date.toDateString() === today.toDateString()) label = 'Today'
    else if (date.toDateString() === yesterday.toDateString()) label = 'Yesterday'
    else label = date.toLocaleDateString('en-NP', { weekday: 'short', month: 'short', day: 'numeric' })
    if (!groups[label]) groups[label] = []
    groups[label].push(a)
  }
  return groups
}

const typeLabel: Record<string, { icon: any; label: string; color: string }> = {
  VIEW_PORTAL:     { icon: Eye,      label: 'Viewed',    color: 'text-blue-400'   },
  SEARCH:          { icon: Search,   label: 'Searched',  color: 'text-yellow-400' },
  BOOKMARK_ADD:    { icon: Bookmark, label: 'Saved',     color: 'text-green-400'  },
  BOOKMARK_REMOVE: { icon: Bookmark, label: 'Unsaved',   color: 'text-red-400'    },
  OPEN_EXTERNAL:   { icon: ExternalLink, label: 'Opened', color: 'text-crimson-400' },
}

export default function HistoryPage() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading]       = useState(true)
  const [limit, setLimit]           = useState(30)
  const [hasMore, setHasMore]       = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/user/activity?limit=${limit + 1}`)
      .then(r => r.json())
      .then(d => {
        const list = d.activities || []
        setHasMore(list.length > limit)
        setActivities(list.slice(0, limit))
      })
      .finally(() => setLoading(false))
  }, [limit])

  const grouped = groupByDate(activities)

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-white mb-1">Activity History</h1>
        <p className="text-white/40 text-sm">Portals viewed, searches made, bookmarks saved</p>
      </div>

      {loading ? (
        <div className="glass-card p-16 flex items-center justify-center">
          <Loader2 size={24} className="text-white/30 animate-spin" />
        </div>
      ) : activities.length === 0 ? (
        <div className="glass-card p-14 text-center">
          <Clock size={36} className="text-white/15 mx-auto mb-3" />
          <p className="text-white font-semibold mb-1">No activity yet</p>
          <p className="text-white/40 text-sm mb-5">Start browsing portals to build your history.</p>
          <Link href="/dashboard/portals" className="btn-primary text-sm inline-flex items-center gap-1.5">
            Browse Portals
          </Link>
        </div>
      ) : (
        <>
          {Object.entries(grouped).map(([date, items]) => (
            <div key={date}>
              <div className="flex items-center gap-3 mb-3">
                <Clock size={11} className="text-white/20" />
                <span className="text-white/30 text-xs uppercase tracking-wider">{date}</span>
                <div className="flex-1 h-px bg-white/[0.04]" />
                <span className="text-white/20 text-xs">{items.length}</span>
              </div>
              <div className="space-y-1.5">
                {items.map(activity => {
                  const meta = typeLabel[activity.type] || typeLabel.VIEW_PORTAL
                  const Icon = meta.icon
                  return (
                    <div key={activity.id} className="glass-card px-4 py-3 flex items-center gap-3 hover:bg-white/[0.04] transition-colors group">
                      <Icon size={14} className={`${meta.color} flex-shrink-0`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-white/35 text-xs">{meta.label}</span>
                          {activity.portal && (
                            <Link href={`/dashboard/portals/${activity.portal.slug}`}
                              className="text-white text-sm font-medium hover:text-crimson-300 transition-colors truncate">
                              {activity.portal.icon} {activity.portal.name}
                            </Link>
                          )}
                          {activity.meta?.query && (
                            <span className="text-white/50 text-sm">"<span className="text-white">{activity.meta.query}</span>"</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-white/20 text-xs">
                          {new Date(activity.createdAt).toLocaleTimeString('en-NP', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {activity.portal && (
                          <a href={activity.portal.url} target="_blank" rel="noopener noreferrer"
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-white/30 hover:text-white">
                            <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
          {hasMore && (
            <button onClick={() => setLimit(l => l + 30)}
              className="w-full glass-card py-3 text-white/40 hover:text-white text-sm transition-all hover:bg-white/[0.04]">
              Load more
            </button>
          )}
        </>
      )}
    </div>
  )
}
