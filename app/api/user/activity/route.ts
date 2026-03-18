import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET /api/user/activity — fetch recent activity
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const limit = Number(new URL(req.url).searchParams.get('limit') || 20)

    const activities = await prisma.activity.findMany({
      where: { userId: (session.user as any).id },
      include: {
        portal: {
          select: { id: true, slug: true, name: true, icon: true, url: true, category: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: Math.min(limit, 100),
    })

    return NextResponse.json({ activities })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch activity' }, { status: 500 })
  }
}

// POST /api/user/activity — log an event
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { portalId, type, meta } = await req.json()
    if (!type) return NextResponse.json({ error: 'type required' }, { status: 400 })

    const activity = await prisma.activity.create({
      data: { userId: (session.user as any).id, portalId: portalId || null, type, meta },
    })

    return NextResponse.json({ activity }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to log activity' }, { status: 500 })
  }
}
