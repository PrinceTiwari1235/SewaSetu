import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

type Params = { params: { id: string } }

// GET /api/portals/[id]/guide
export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const portal = await prisma.portal.findFirst({
      where: { OR: [{ id: params.id }, { slug: params.id }] },
      include: { guide: true },
    })
    if (!portal) return NextResponse.json({ error: 'Portal not found' }, { status: 404 })
    return NextResponse.json({ guide: portal.guide })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch guide' }, { status: 500 })
  }
}

// PUT /api/portals/[id]/guide — create or update guide (admin only)
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const portal = await prisma.portal.findFirst({
      where: { OR: [{ id: params.id }, { slug: params.id }] },
    })
    if (!portal) return NextResponse.json({ error: 'Portal not found' }, { status: 404 })

    const body = await req.json()
    const { title, intro, steps, documents, fees, processingTime, tips } = body

    const guide = await prisma.guide.upsert({
      where: { portalId: portal.id },
      create: {
        portalId: portal.id,
        title:   title || portal.name,
        intro:   intro || '',
        steps:   steps || [],
        documents: documents || [],
        fees:    fees || null,
        processingTime: processingTime || null,
        tips:    tips || [],
      },
      update: {
        title, intro, steps, documents, fees, processingTime, tips,
      },
    })

    return NextResponse.json({ guide })
  } catch (error) {
    console.error('[GUIDE PUT]', error)
    return NextResponse.json({ error: 'Failed to save guide' }, { status: 500 })
  }
}
