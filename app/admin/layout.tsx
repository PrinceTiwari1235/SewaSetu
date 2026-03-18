'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Globe, Users, BookOpen, Settings, LogOut, ShieldCheck } from 'lucide-react'

const adminLinks = [
  { href: '/admin',          icon: LayoutDashboard, label: 'Overview'  },
  { href: '/admin/portals',  icon: Globe,           label: 'Portals'   },
  { href: '/admin/guides',   icon: BookOpen,        label: 'Guides'    },
  { href: '/admin/users',    icon: Users,           label: 'Users'     },
  { href: '/admin/settings', icon: Settings,        label: 'Settings'  },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-56 border-r border-white/[0.06] fixed left-0 top-0 bottom-0 z-40 bg-[#08080f]">
        {/* Logo */}
        <div className="p-5 border-b border-white/[0.06]">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-crimson-700 rounded-lg flex items-center justify-center">
              <ShieldCheck size={15} className="text-white" />
            </div>
            <div>
              <span className="font-display font-bold text-white text-sm block leading-none">Admin</span>
              <span className="text-white/30 text-[9px] tracking-widest uppercase">SewaSetu</span>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5">
          {adminLinks.map(({ href, icon: Icon, label }) => {
            const active = pathname === href || (href !== '/admin' && pathname.startsWith(href))
            return (
              <Link key={href} href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium group ${
                  active
                    ? 'bg-crimson-950/60 border border-crimson-900/40 text-crimson-300'
                    : 'text-white/50 hover:text-white hover:bg-white/[0.05]'
                }`}>
                <Icon size={15} className={`flex-shrink-0 transition-colors ${active ? 'text-crimson-400' : 'group-hover:text-crimson-400'}`} />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-white/[0.06] space-y-0.5">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/35 hover:text-white/70 transition-all text-sm"
          >
            <LogOut size={14} /> Back to App
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 md:ml-56 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="h-14 border-b border-white/[0.06] flex items-center justify-between px-6 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-crimson-500 animate-pulse" />
            <span className="text-white/40 text-xs font-medium tracking-wide uppercase">Admin Panel</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="glass-card px-3 py-1.5 flex items-center gap-2">
              <div className="w-5 h-5 bg-crimson-800 rounded-full flex items-center justify-center text-white text-[9px] font-bold">A</div>
              <span className="text-white/60 text-xs">Admin</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
