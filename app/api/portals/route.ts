import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET /api/portals — fetch all active portals (optionally filtered)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')
    const query    = searchParams.get('q')
    const featured = searchParams.get('featured')

    const where: any = { isActive: true }

    if (category) where.category = category
    if (featured === 'true') where.featured = true
    if (query) {
      where.OR = [
        { name:        { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { tags:        { has: query } },
      ]
    }

    const portals = await prisma.portal.findMany({
      where,
      orderBy: [{ featured: 'desc' }, { name: 'asc' }],
      select: {
        id: true, slug: true, name: true, url: true,
        category: true, description: true, icon: true,
        tags: true, featured: true, lastVerified: true,
      },
    })

    return NextResponse.json({ portals, count: portals.length })
  } catch (error) {
    console.error('[PORTALS GET]', error)
    return NextResponse.json({ error: 'Failed to fetch portals' }, { status: 500 })
  }
}

// POST /api/portals — create a new portal (admin only)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { slug, name, url, category, description, icon, tags, featured } = body

    if (!slug || !name || !url || !category || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const portal = await prisma.portal.create({
      data: { slug, name, url, category, description, icon: icon || '🌐', tags: tags || [], featured: featured || false },
    })

    return NextResponse.json({ portal }, { status: 201 })
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'A portal with this slug already exists' }, { status: 409 })
    }
    console.error('[PORTALS POST]', error)
    return NextResponse.json({ error: 'Failed to create portal' }, { status: 500 })
  }
}
