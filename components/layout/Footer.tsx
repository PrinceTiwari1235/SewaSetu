import Link from 'next/link'
import { Mail, Phone, MapPin, Github, Twitter, Facebook } from 'lucide-react'

const footerLinks = {
  Services: [
    { label: 'All Portals',      href: '/portals'  },
    { label: 'Identity & Civil', href: '/portals#identity'  },
    { label: 'Jobs & Exams',     href: '/portals#jobs'      },
    { label: 'Tax & Revenue',    href: '/portals#tax'       },
    { label: 'Education',        href: '/portals#education' },
  ],
  Company: [
    { label: 'About Us',    href: '/about'   },
    { label: 'Our Team',    href: '/team'    },
    { label: 'Features',    href: '/features'},
    { label: 'Contact',     href: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy',    href: '/privacy'   },
    { label: 'Terms of Service',  href: '/terms'     },
    { label: 'Cookie Policy',     href: '/cookies'   },
    { label: 'Disclaimer',        href: '/disclaimer'},
  ],
}

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/[0.06]">
      {/* Top strip */}
      <div className="h-0.5 bg-gradient-to-r from-crimson-800 via-crimson-600 to-crimson-800" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-crimson-700 rounded-lg flex items-center justify-center text-white font-display font-bold">
                स
              </div>
              <div>
                <span className="font-display font-bold text-white text-xl block leading-none">SewaSetu</span>
                <span className="text-white/40 text-[10px] tracking-widest uppercase">सेवासेतु</span>
              </div>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
              Nepal's unified government services portal. Making e-governance accessible to every citizen — from Kathmandu to the remotest village.
            </p>
            <div className="flex flex-col gap-2 text-sm text-white/40">
              <div className="flex items-center gap-2">
                <Mail size={13} />
                <span>contact@sewasetu.com.np</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={13} />
                <span>+977 01-XXXXXXX</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={13} />
                <span>Kathmandu, Nepal</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">{section}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-white/45 hover:text-white/80 text-sm transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} SewaSetu. Made with ❤️ for Nepal.
          </p>
          <div className="flex items-center gap-1">
            <span className="text-white/20 text-xs mr-2">Follow us</span>
            {[
              { Icon: Github,   href: '#' },
              { Icon: Twitter,  href: '#' },
              { Icon: Facebook, href: '#' },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                className="w-8 h-8 rounded-lg border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-white/25">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  )
}
