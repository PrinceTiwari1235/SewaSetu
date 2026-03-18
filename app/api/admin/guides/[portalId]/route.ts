import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

type Params = { params: { portalId: string } }

// GET /api/admin/guides/[portalId]
export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const guide = await prisma.guide.findUnique({
      where: { portalId: params.portalId },
    })

    const portal = await prisma.portal.findUnique({
      where: { id: params.portalId },
      select: { id: true, name: true, icon: true, slug: true },
    })

    return NextResponse.json({ guide, portal })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch guide' }, { status: 500 })
  }
}

// PUT /api/admin/guides/[portalId] — create or update
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { title, titleNp, intro, introNp, steps, documents, fees, processingTime, tips } = body

    if (!title || !intro) {
      return NextResponse.json({ error: 'title and intro required' }, { status: 400 })
    }

    const guide = await prisma.guide.upsert({
      where: { portalId: params.portalId },
      update: { title, titleNp, intro, introNp, steps, documents, fees, processingTime, tips },
      create: {
        portalId: params.portalId,
        title, titleNp, intro, introNp,
        steps:    steps    ?? [],
        documents: documents ?? [],
        fees,
        processingTime,
        tips:     tips     ?? [],
      },
    })

    return NextResponse.json({ guide })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to save guide' }, { status: 500 })
  }
}

// DELETE /api/admin/guides/[portalId]
export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.guide.delete({ where: { portalId: params.portalId } })
    return NextResponse.json({ message: 'Guide deleted' })
  } catch {
    return NextResponse.json({ error: 'Failed to delete guide' }, { status: 500 })
  }
}
