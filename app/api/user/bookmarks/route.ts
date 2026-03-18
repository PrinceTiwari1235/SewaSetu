import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET /api/user/bookmarks
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const bookmarks = await prisma.bookmark.findMany({
      where: { userId: (session.user as any).id },
      include: {
        portal: {
          select: { id: true, slug: true, name: true, url: true, icon: true, category: true, tags: true, description: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ bookmarks: bookmarks.map(b => b.portal) })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch bookmarks' }, { status: 500 })
  }
}

// POST /api/user/bookmarks — add bookmark { portalId }
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { portalId } = await req.json()
    if (!portalId) return NextResponse.json({ error: 'portalId required' }, { status: 400 })

    const bookmark = await prisma.bookmark.upsert({
      where: { userId_portalId: { userId: (session.user as any).id, portalId } },
      update: {},
      create: { userId: (session.user as any).id, portalId },
    })

    // Log activity
    await prisma.activity.create({
      data: { userId: (session.user as any).id, portalId, type: 'BOOKMARK_ADD' },
    })

    return NextResponse.json({ bookmark }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add bookmark' }, { status: 500 })
  }
}

// DELETE /api/user/bookmarks?portalId=xxx
export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const portalId = new URL(req.url).searchParams.get('portalId')
    if (!portalId) return NextResponse.json({ error: 'portalId required' }, { status: 400 })

    await prisma.bookmark.deleteMany({
      where: { userId: (session.user as any).id, portalId },
    })

    await prisma.activity.create({
      data: { userId: (session.user as any).id, portalId, type: 'BOOKMARK_REMOVE' },
    })

    return NextResponse.json({ message: 'Bookmark removed' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to remove bookmark' }, { status: 500 })
  }
}
