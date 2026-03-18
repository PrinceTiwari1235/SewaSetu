import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Github, Linkedin, Twitter } from 'lucide-react'

const team = [
  {
    name: 'Aarav Shrestha',
    role: 'Founder & Product Lead',
    bio: 'Former civil servant who spent years helping citizens navigate government paperwork. Built SewaSetu to solve the problem he lived every day.',
    initials: 'AS',
    color: 'bg-crimson-800',
    location: 'Kathmandu',
    links: { github: '#', linkedin: '#', twitter: '#' },
    skills: ['Product Strategy', 'Civic Tech', 'UX Research'],
  },
  {
    name: 'Priya Tamang',
    role: 'Lead Engineer',
    bio: 'Full-stack developer with 6 years of experience. Passionate about building technology that serves underserved communities in Nepal.',
    initials: 'PT',
    color: 'bg-mountain-700',
    location: 'Pokhara',
    links: { github: '#', linkedin: '#', twitter: '#' },
    skills: ['Next.js', 'Node.js', 'PostgreSQL'],
  },
  {
    name: 'Bikash Rai',
    role: 'UI/UX Designer',
    bio: 'Graphic designer turned UX specialist. Believes every citizen deserves a beautiful, intuitive experience — not just tech-savvy users.',
    initials: 'BR',
    color: 'bg-blue-800',
    location: 'Biratnagar',
    links: { github: '#', linkedin: '#', twitter: '#' },
    skills: ['Figma', 'Design Systems', 'Accessibility'],
  },
  {
    name: 'Sunita Adhikari',
    role: 'Content & Research Lead',
    bio: 'Journalist and civic researcher who has interviewed hundreds of Nepali citizens about their struggles with government services.',
    initials: 'SA',
    color: 'bg-teal-700',
    location: 'Lalitpur',
    links: { github: '#', linkedin: '#', twitter: '#' },
    skills: ['Nepali Content', 'Research', 'Govt. Processes'],
  },
  {
    name: 'Rohan KC',
    role: 'Backend Engineer',
    bio: 'Software engineer specialising in authentication, security and scalable APIs. Ensures SewaSetu stays fast and private for every user.',
    initials: 'RK',
    color: 'bg-purple-800',
    location: 'Kathmandu',
    links: { github: '#', linkedin: '#', twitter: '#' },
    skills: ['APIs', 'Security', 'DevOps'],
  },
  {
    name: 'Maya Gurung',
    role: 'Community & Outreach',
    bio: 'Worked with NGOs across rural Nepal to understand digital literacy challenges. Leads SewaSetu\'s outreach to underserved communities.',
    initials: 'MG',
    color: 'bg-orange-800',
    location: 'Dharan',
    links: { github: '#', linkedin: '#', twitter: '#' },
    skills: ['Community Building', 'Outreach', 'Digital Literacy'],
  },
]

const advisors = [
  { name: 'Dr. Ramesh Poudel',  role: 'Govt. Policy Advisor',   initials: 'RP', color: 'bg-slate-700' },
  { name: 'Anita Koirala',      role: 'Legal & Compliance',      initials: 'AK', color: 'bg-slate-700' },
  { name: 'Suresh Thapa',       role: 'Tech Infrastructure',     initials: 'ST', color: 'bg-slate-700' },
]

export default function TeamPage() {
  return (
    <main className="bg-slate-950 min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-20 right-1/3 w-[500px] h-[400px] bg-mountain-900/15 rounded-full blur-[120px]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="tag mb-6 mx-auto w-fit">✦ Our Team</div>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Nepalis building
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-crimson-400 to-orange-300">
              for Nepalis
            </span>
          </h1>
          <p className="text-white/60 text-xl leading-relaxed max-w-2xl mx-auto">
            We are a small, passionate team of engineers, designers, researchers, and civic advocates who believe technology can close the gap between citizens and their government.
          </p>
        </div>
      </section>

      {/* Team grid */}
      <section className="py-10 max-w-7xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map(member => (
            <div key={member.name} className="glass-card p-7 hover:bg-white/[0.05] transition-all group">
              {/* Avatar */}
              <div className="flex items-start justify-between mb-5">
                <div className={`w-14 h-14 rounded-2xl ${member.color} flex items-center justify-center text-white font-display font-bold text-lg`}>
                  {member.initials}
                </div>
                <div className="flex gap-1.5">
                  {Object.entries(member.links).map(([platform, href]) => {
                    const Icon = platform === 'github' ? Github : platform === 'linkedin' ? Linkedin : Twitter
                    return (
                      <a
                        key={platform}
                        href={href}
                        className="w-7 h-7 rounded-lg border border-white/[0.08] flex items-center justify-center text-white/30 hover:text-white/70 hover:border-white/20 transition-all"
                      >
                        <Icon size={13} />
                      </a>
                    )
                  })}
                </div>
              </div>

              <h3 className="text-white font-semibold text-lg font-display mb-0.5 group-hover:text-crimson-300 transition-colors">
                {member.name}
              </h3>
              <div className="text-crimson-500 text-xs font-semibold uppercase tracking-wider mb-1">{member.role}</div>
              <div className="text-white/25 text-xs mb-4">📍 {member.location}</div>
              <p className="text-white/50 text-sm leading-relaxed mb-5">{member.bio}</p>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5">
                {member.skills.map(s => (
                  <span key={s} className="text-[10px] bg-white/[0.05] text-white/35 border border-white/[0.07] px-2 py-0.5 rounded-full">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Advisors */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <h2 className="font-display text-2xl font-bold text-white mb-8 text-center">Advisors</h2>
        <div className="flex flex-wrap justify-center gap-5">
          {advisors.map(a => (
            <div key={a.name} className="glass-card px-6 py-5 flex items-center gap-4 hover:bg-white/[0.05] transition-all">
              <div className={`w-11 h-11 rounded-xl ${a.color} flex items-center justify-center text-white font-bold text-sm`}>
                {a.initials}
              </div>
              <div>
                <div className="text-white font-semibold text-sm">{a.name}</div>
                <div className="text-white/40 text-xs">{a.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Join the team */}
      <section className="py-20 max-w-3xl mx-auto px-6 text-center">
        <div className="glass-card p-10 border-crimson-900/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-crimson-950/30 to-transparent" />
          <div className="relative z-10">
            <div className="text-4xl mb-4">🤝</div>
            <h2 className="font-display text-3xl font-bold text-white mb-3">Want to join us?</h2>
            <p className="text-white/55 mb-7 leading-relaxed">
              We are always looking for passionate developers, content writers, and civic advocates who care about Nepal's e-governance future. All roles are remote-friendly.
            </p>
            <a
              href="mailto:team@sewasetu.com.np"
              className="btn-primary inline-flex items-center gap-2"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
