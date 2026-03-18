import { UserPlus, Search, FileCheck, ExternalLink } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Create a free account',
    description: 'Sign up in 30 seconds. No government credentials needed — just your name and email.',
  },
  {
    number: '02',
    icon: Search,
    title: 'Search or browse',
    description: 'Search for any service (e.g. "Lok Sewa form") or browse by category to find what you need.',
  },
  {
    number: '03',
    icon: FileCheck,
    title: 'Read the guide',
    description: 'Follow our step-by-step guide: what to prepare, documents needed, and how to fill the form.',
  },
  {
    number: '04',
    icon: ExternalLink,
    title: 'Go to the portal',
    description: 'Click the direct link to the official government website — fully prepared and confident.',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-28 relative">
      {/* Horizontal line decor */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="tag mb-6">✦ How It Works</div>
          <h2 className="section-title mb-5">
            From confusion to confidence
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-crimson-400 to-orange-300">
              in 4 simple steps
            </span>
          </h2>
          <p className="section-subtitle mx-auto text-center">
            No more asking friends or paying agents. SewaSetu gives you everything you need to handle your government paperwork yourself.
          </p>
        </div>

        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-crimson-900/0 via-crimson-800/50 to-crimson-900/0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <div key={step.number} className="text-center group">
                  {/* Number + icon circle */}
                  <div className="relative mx-auto w-24 h-24 mb-6">
                    <div className="absolute inset-0 rounded-full bg-crimson-900/30 border border-crimson-800/40 group-hover:bg-crimson-900/50 group-hover:border-crimson-700/60 transition-all" />
                    <div className="absolute inset-0 rounded-full bg-crimson-900/10 blur-md group-hover:blur-lg transition-all" />
                    <div className="relative h-full flex items-center justify-center flex-col gap-0.5">
                      <Icon size={20} className="text-crimson-400" />
                      <span className="text-crimson-600 text-[10px] font-bold tracking-widest">{step.number}</span>
                    </div>
                  </div>

                  <h3 className="text-white font-semibold text-base mb-3 group-hover:text-crimson-300 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-white/45 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
