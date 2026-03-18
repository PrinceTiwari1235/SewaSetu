import { PrismaClient } from '@prisma/client'
import { portals } from '../data/portals'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // ─── Seed admin user ────────────────────────────────────────────────────────
  const adminPassword = await bcrypt.hash('admin123!', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@sewasetu.com.np' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@sewasetu.com.np',
      password: adminPassword,
      role: 'ADMIN',
    },
  })
  console.log(`✅ Admin user: ${admin.email}`)

  // ─── Seed demo user ─────────────────────────────────────────────────────────
  const userPassword = await bcrypt.hash('demo1234', 12)
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@sewasetu.com.np' },
    update: {},
    create: {
      name: 'Ramesh Adhikari',
      email: 'demo@sewasetu.com.np',
      password: userPassword,
      role: 'USER',
    },
  })
  console.log(`✅ Demo user: ${demoUser.email}`)

  // ─── Seed portals ───────────────────────────────────────────────────────────
  let count = 0
  for (const portal of portals) {
    await prisma.portal.upsert({
      where: { slug: portal.id },
      update: {
        name: portal.name,
        url: portal.url,
        category: portal.category,
        description: portal.description,
        icon: portal.icon,
        tags: portal.tags,
        featured: portal.featured ?? false,
      },
      create: {
        slug: portal.id,
        name: portal.name,
        url: portal.url,
        category: portal.category,
        description: portal.description,
        icon: portal.icon,
        tags: portal.tags,
        featured: portal.featured ?? false,
      },
    })
    count++
  }
  console.log(`✅ Seeded ${count} portals`)

  // ─── Seed sample bookmarks for demo user ────────────────────────────────────
  const bookmarkSlugs = ['psc', 'psconline', 'ird', 'dotm', 'neb', 'meroshare']
  for (const slug of bookmarkSlugs) {
    const p = await prisma.portal.findUnique({ where: { slug } })
    if (p) {
      await prisma.bookmark.upsert({
        where: { userId_portalId: { userId: demoUser.id, portalId: p.id } },
        update: {},
        create: { userId: demoUser.id, portalId: p.id },
      })
    }
  }
  console.log(`✅ Seeded sample bookmarks`)

  console.log('\n🎉 Database seeded successfully!')
  console.log(`   Admin login:  admin@sewasetu.com.np / admin123!`)
  console.log(`   Demo login:   demo@sewasetu.com.np / demo1234`)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
