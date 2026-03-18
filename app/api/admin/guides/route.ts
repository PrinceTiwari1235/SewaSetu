import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET /api/admin/guides — all portals with guide status
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const portals = await prisma.portal.findMany({
      where: { isActive: true },
      select: {
        id: true, slug: true, name: true, icon: true, category: true,
        guide: { select: { id: true, title: true, updatedAt: true } },
      },
      orderBy: { name: 'asc' },
    })

    return NextResponse.json({ portals })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}
