import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

type Params = { params: { id: string } }

// GET /api/portals/[id]
export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const portal = await prisma.portal.findFirst({
      where: { OR: [{ id: params.id }, { slug: params.id }], isActive: true },
      include: { guide: true },
    })
    if (!portal) return NextResponse.json({ error: 'Portal not found' }, { status: 404 })
    return NextResponse.json({ portal })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch portal' }, { status: 500 })
  }
}

// PATCH /api/portals/[id] — admin only
export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const portal = await prisma.portal.update({
      where: { id: params.id },
      data: {
        ...body,
        updatedAt: new Date(),
        ...(body.verified ? { lastVerified: new Date() } : {}),
      },
    })
    return NextResponse.json({ portal })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update portal' }, { status: 500 })
  }
}

// DELETE /api/portals/[id] — admin only (soft delete)
export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.portal.update({
      where: { id: params.id },
      data: { isActive: false },
    })
    return NextResponse.json({ message: 'Portal deactivated' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete portal' }, { status: 500 })
  }
}
