'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/',          label: 'Home'     },
  { href: '/about',     label: 'About'    },
  { href: '/features',  label: 'Features' },
  { href: '/portals',   label: 'Portals'  },
  { href: '/team',      label: 'Team'     },
  { href: '/contact',   label: 'Contact'  },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-white/[0.06] shadow-card'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-crimson-700 rounded-lg flex items-center justify-center text-white font-display font-bold text-sm shadow-glow-red group-hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] transition-shadow">
            स
          </div>
          <div>
            <span className="font-display font-bold text-white text-lg leading-none block">SewaSetu</span>
            <span className="text-white/40 text-[10px] tracking-widest uppercase leading-none">सेवासेतु</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="nav-link">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login" className="btn-outline !py-2 !px-4 text-sm">
            Sign In
          </Link>
          <Link href="/register" className="btn-primary !py-2 !px-4 text-sm">
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white/70 hover:text-white transition-colors"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-slate-950/95 backdrop-blur-md border-b border-white/[0.06] px-6 pb-6 pt-2">
          <nav className="flex flex-col gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-white/70 hover:text-white py-3 text-sm font-medium transition-colors border-b border-white/[0.04]"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-3 mt-4">
              <Link href="/login"    className="btn-outline !py-2 !px-4 text-sm flex-1 text-center">Sign In</Link>
              <Link href="/register" className="btn-primary !py-2 !px-4 text-sm flex-1 text-center">Get Started</Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
