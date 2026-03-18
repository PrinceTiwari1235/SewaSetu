import { Quote } from 'lucide-react'

const testimonials = [
  {
    quote: "I used to pay an agent to fill my Lok Sewa form. Now I do it myself in 20 minutes using SewaSetu's guide. Saved me ₹500 each time.",
    name: "Ramesh Adhikari",
    role: "Teacher, Pokhara",
    initials: "RA",
    color: "bg-crimson-800",
  },
  {
    quote: "Found all the documents I needed for my passport renewal in one place. The checklist feature is brilliant — no wasted trips to the office.",
    name: "Sita Shrestha",
    role: "Student, Kathmandu",
    initials: "SS",
    color: "bg-mountain-700",
  },
  {
    quote: "As a small business owner, I need to deal with OCR, IRD, and the municipality regularly. SewaSetu saves me hours every month.",
    name: "Bikash Tamang",
    role: "Entrepreneur, Lalitpur",
    initials: "BT",
    color: "bg-blue-800",
  },
  {
    quote: "My parents don't speak English. The Nepali interface helped them register for health insurance without needing my help.",
    name: "Priya Gurung",
    role: "Software Engineer, Biratnagar",
    initials: "PG",
    color: "bg-teal-800",
  },
]

export default function Testimonials() {
  return (
    <section className="py-28 relative">
      <div className="absolute top-0 left-1/3 w-[400px] h-[400px] bg-mountain-900/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="tag mb-5">✦ Stories</div>
          <h2 className="section-title">
            Citizens using SewaSetu
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-crimson-400 to-orange-300">
              every single day
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {testimonials.map((t, i) => (
            <div key={i} className="glass-card p-7 hover:bg-white/[0.05] transition-all group">
              <Quote size={24} className="text-crimson-800 mb-4" />
              <p className="text-white/70 text-base leading-relaxed mb-6 italic">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                  {t.initials}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-white/40 text-xs">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
