import Link from 'next/link'
import { ExternalLink, ArrowRight } from 'lucide-react'
import type { Portal } from '@/data/portals'

interface PortalCardProps {
  portal: Portal
  compact?: boolean
}

export default function PortalCard({ portal, compact = false }: PortalCardProps) {
  return (
    <div className="glass-card p-5 hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-300 hover:shadow-card-hover group">
      <div className="flex items-start gap-3 mb-3">
        <span className="text-2xl flex-shrink-0 mt-0.5">{portal.icon}</span>
        <div className="min-w-0">
          <h3 className="text-white font-semibold text-sm leading-snug group-hover:text-crimson-300 transition-colors">
            {portal.name}
          </h3>
          <span className="text-white/30 text-xs">{portal.url.replace('https://', '')}</span>
        </div>
      </div>

      {!compact && (
        <p className="text-white/50 text-xs leading-relaxed mb-4 line-clamp-2">
          {portal.description}
        </p>
      )}

      <div className="flex flex-wrap gap-1 mb-4">
        {portal.tags.slice(0, 3).map(tag => (
          <span key={tag} className="text-[10px] bg-white/[0.05] text-white/40 px-2 py-0.5 rounded-full border border-white/[0.06]">
            {tag}
          </span>
        ))}
      </div>

      <a
        href={portal.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-crimson-400 hover:text-crimson-300 text-xs font-medium transition-colors group/link"
      >
        Open Portal
        <ExternalLink size={11} className="group-hover/link:translate-x-0.5 transition-transform" />
      </a>
    </div>
  )
}
