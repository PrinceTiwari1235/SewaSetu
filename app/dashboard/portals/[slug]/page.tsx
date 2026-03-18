import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import PortalDetailClient from './PortalDetailClient'

interface Props { params: { slug: string } }

async function getPortalData(slug: string, userId?: string) {
  const portal = await prisma.portal.findFirst({
    where: { slug, isActive: true },
    include: { guide: true },
  })
  if (!portal) return null

  const isBookmarked = userId
    ? !!(await prisma.bookmark.findUnique({ where: { userId_portalId: { userId, portalId: portal.id } } }))
    : false

  // Log activity if user is logged in
  if (userId) {
    await prisma.activity.create({
      data: { userId, portalId: portal.id, type: 'VIEW_PORTAL' },
    }).catch(() => {}) // non-blocking
  }

  return { portal, isBookmarked }
}

export default async function PortalDetailPage({ params }: Props) {
  const session = await getServerSession(authOptions)
  const userId  = (session?.user as any)?.id

  const data = await getPortalData(params.slug, userId)
  if (!data) notFound()

  return <PortalDetailClient portal={data.portal} initialBookmarked={data.isBookmarked} userId={userId} />
}
