import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const reminders = await prisma.reminder.findMany({
      where: { userId: (session.user as any).id },
      orderBy: { dueDate: 'asc' },
    })
    return NextResponse.json({ reminders })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch reminders' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { title, note, dueDate, recurring } = await req.json()
    if (!title || !dueDate) return NextResponse.json({ error: 'title and dueDate required' }, { status: 400 })

    const reminder = await prisma.reminder.create({
      data: {
        userId: (session.user as any).id,
        title, note: note || null,
        dueDate: new Date(dueDate),
        recurring: recurring ?? false,
      },
    })
    return NextResponse.json({ reminder }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create reminder' }, { status: 500 })
  }
}
