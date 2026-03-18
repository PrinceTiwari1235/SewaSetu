import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

type Params = { params: { id: string } }

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const reminder = await prisma.reminder.updateMany({
      where: { id: params.id, userId: (session.user as any).id },
      data: {
        ...(body.title   !== undefined ? { title: body.title }         : {}),
        ...(body.note    !== undefined ? { note: body.note }           : {}),
        ...(body.dueDate !== undefined ? { dueDate: new Date(body.dueDate) } : {}),
        ...(body.sent    !== undefined ? { sent: body.sent }           : {}),
      },
    })
    return NextResponse.json({ updated: reminder.count })
  } catch {
    return NextResponse.json({ error: 'Failed to update reminder' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await prisma.reminder.deleteMany({
      where: { id: params.id, userId: (session.user as any).id },
    })
    return NextResponse.json({ message: 'Reminder deleted' })
  } catch {
    return NextResponse.json({ error: 'Failed to delete reminder' }, { status: 500 })
  }
}
