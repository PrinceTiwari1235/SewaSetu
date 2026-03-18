'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { LayoutDashboard, Globe, Bookmark, Clock, User, LogOut, Bell, Settings, ShieldCheck } from 'lucide-react'

const sidebarLinks = [
  { href: '/dashboard',            icon: LayoutDashboard, label: 'Dashboard'  },
  { href: '/dashboard/portals',    icon: Globe,           label: 'All Portals'},
  { href: '/dashboard/saved',      icon: Bookmark,        label: 'Saved'      },
  { href: '/dashboard/reminders',  icon: Bell,            label: 'Reminders'  },
  { href: '/dashboard/history',    icon: Clock,           label: 'History'    },
  { href: '/dashboard/profile',    icon: User,            label: 'Profile'    },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname        = usePathname()
  const { data: session } = useSession()
  const user            = session?.user
  const initials        = user?.name?.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase() || '?'
  const isAdmin         = (user as any)?.role === 'ADMIN'
  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-60 border-r border-white/[0.06] bg-slate-950/80 fixed left-0 top-0 bottom-0 z-40">
        {/* Logo */}
        <div className="p-5 border-b border-white/[0.06]">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-crimson-700 rounded-lg flex items-center justify-center text-white font-display font-bold text-sm">
              स
            </div>
            <div>
              <span className="font-display font-bold text-white text-base block leading-none">SewaSetu</span>
              <span className="text-white/30 text-[9px] tracking-widest uppercase">सेवासेतु</span>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5">
          {sidebarLinks.map(({ href, icon: Icon, label }) => {
            const active = pathname === href || (href !== '/dashboard' && pathname.startsWith(href))
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium group ${
                  active
                    ? 'bg-crimson-950/60 border border-crimson-900/40 text-crimson-300'
                    : 'text-white/50 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <Icon size={16} className={`flex-shrink-0 transition-colors ${active ? 'text-crimson-400' : 'group-hover:text-crimson-400'}`} />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-white/[0.06] space-y-0.5">
          {isAdmin && (
            <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-crimson-400/70 hover:text-crimson-300 hover:bg-crimson-950/30 transition-all text-sm">
              <ShieldCheck size={15} /> Admin Panel
            </Link>
          )}
          <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.05] transition-all text-sm">
            <Settings size={15} /> Settings
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-950/20 transition-all text-sm"
          >
            <LogOut size={15} /> Sign Out
          </button>
        </div>

        {/* User pill */}
        <div className="p-3 border-t border-white/[0.06]">
          <div className="flex items-center gap-3 px-3 py-2 glass-card">
            <div className="w-7 h-7 bg-crimson-800 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {initials}
            </div>
            <div className="min-w-0">
              <div className="text-white text-xs font-medium truncate">{user?.name || 'User'}</div>
              <div className="text-white/35 text-[10px] truncate">{user?.email || ''}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 md:ml-60 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="h-14 border-b border-white/[0.06] flex items-center justify-between px-6 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-30">
          <div className="flex items-center gap-3">
            {/* Mobile logo */}
            <Link href="/" className="md:hidden flex items-center gap-2">
              <div className="w-7 h-7 bg-crimson-700 rounded-lg flex items-center justify-center text-white font-display font-bold text-xs">स</div>
              <span className="font-display font-bold text-white text-base">SewaSetu</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-lg border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all relative">
              <Bell size={14} />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-crimson-500 rounded-full" />
            </button>
            <div className="w-8 h-8 bg-crimson-800 rounded-full flex items-center justify-center text-white text-xs font-bold cursor-pointer">
              {initials}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
