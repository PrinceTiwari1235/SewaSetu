import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// GET /api/admin/stats
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const [
      totalUsers,
      totalPortals,
      activePortals,
      totalBookmarks,
      totalActivities,
      recentUsers,
      topPortals,
      activityByType,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.portal.count(),
      prisma.portal.count({ where: { isActive: true } }),
      prisma.bookmark.count(),
      prisma.activity.count(),

      // 5 newest users
      prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: { id: true, name: true, email: true, createdAt: true, role: true },
      }),

      // Top 5 most bookmarked portals
      prisma.portal.findMany({
        take: 5,
        orderBy: { bookmarks: { _count: 'desc' } },
        select: {
          id: true, slug: true, name: true, icon: true, category: true,
          _count: { select: { bookmarks: true, activities: true } },
        },
      }),

      // Activity counts by type
      prisma.activity.groupBy({
        by: ['type'],
        _count: { type: true },
      }),
    ])

    return NextResponse.json({
      stats: { totalUsers, totalPortals, activePortals, totalBookmarks, totalActivities },
      recentUsers,
      topPortals,
      activityByType,
    })
  } catch (error) {
    console.error('[ADMIN STATS]', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
