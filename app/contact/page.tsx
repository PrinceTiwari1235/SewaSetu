'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { useState } from 'react'
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, CheckCircle2 } from 'lucide-react'

const contactInfo = [
  { icon: Mail,    label: 'Email',    value: 'contact@sewasetu.com.np',  sub: 'We reply within 24 hours' },
  { icon: Phone,   label: 'Phone',    value: '+977 01-XXXXXXX',          sub: 'Sun–Fri, 9am–5pm NST' },
  { icon: MapPin,  label: 'Location', value: 'Kathmandu, Nepal',         sub: 'Bagmati Province' },
  { icon: Clock,   label: 'Hours',    value: '9:00am – 5:00pm',          sub: 'Nepal Standard Time' },
]

const faqs = [
  {
    q: 'Is SewaSetu an official government platform?',
    a: 'No. SewaSetu is an independent civic-tech platform. We link to official government websites — we are not affiliated with or endorsed by the Government of Nepal.',
  },
  {
    q: 'Does SewaSetu store my government login credentials?',
    a: 'Never. We only provide guides and direct links to official government portals. You log in directly on the government site, not through us.',
  },
  {
    q: 'How do I report an outdated guide or broken portal link?',
    a: 'Use the feedback button on any portal page, or email us at updates@sewasetu.com.np. We update guides within 48 hours of a verified change.',
  },
  {
    q: 'Is the platform free to use?',
    a: 'Yes. SewaSetu is completely free for all citizens. We may introduce optional premium features in the future, but core portal access and guides will always be free.',
  },
  {
    q: 'Can I contribute a guide for a portal not listed?',
    a: 'Absolutely. Email us at contribute@sewasetu.com.np with the portal details and we will review it for inclusion.',
  },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    setSent(true)
  }

  return (
    <main className="bg-slate-950 min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-crimson-900/10 rounded-full blur-[100px]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="tag mb-6 mx-auto w-fit">✦ Contact Us</div>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-5 leading-tight">
            We'd love to
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-crimson-400 to-orange-300">
              hear from you
            </span>
          </h1>
          <p className="text-white/55 text-xl max-w-xl mx-auto leading-relaxed">
            Have a question, a suggestion, or found an outdated guide? Reach out — we read every message.
          </p>
        </div>
      </section>

      {/* Contact grid */}
      <section className="py-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-8">

          {/* Left — info + FAQ */}
          <div className="lg:col-span-2 space-y-5">
            {/* Info cards */}
            {contactInfo.map(item => {
              const Icon = item.icon
              return (
                <div key={item.label} className="glass-card p-5 flex items-start gap-4 hover:bg-white/[0.05] transition-all">
                  <div className="w-9 h-9 bg-crimson-950/60 border border-crimson-800/40 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-crimson-400" />
                  </div>
                  <div>
                    <div className="text-white/35 text-xs uppercase tracking-wider mb-0.5">{item.label}</div>
                    <div className="text-white text-sm font-medium">{item.value}</div>
                    <div className="text-white/35 text-xs">{item.sub}</div>
                  </div>
                </div>
              )
            })}

            {/* Social */}
            <div className="glass-card p-5">
              <div className="flex items-center gap-2 text-white/40 text-xs uppercase tracking-wider mb-3">
                <MessageSquare size={12} />
                Also reach us on
              </div>
              <div className="flex gap-2">
                {['Facebook', 'Twitter / X', 'GitHub'].map(platform => (
                  <a
                    key={platform}
                    href="#"
                    className="text-xs bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.08] text-white/50 hover:text-white px-3 py-1.5 rounded-lg transition-all"
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — contact form */}
          <div className="lg:col-span-3">
            <div className="glass-card p-8">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <CheckCircle2 size={48} className="text-green-400 mb-4" />
                  <h3 className="font-display text-2xl font-bold text-white mb-2">Message sent!</h3>
                  <p className="text-white/50 max-w-xs">Thank you for reaching out. We will get back to you within 24 hours.</p>
                  <button onClick={() => { setSent(false); setForm({ name:'', email:'', subject:'', message:'' }) }} className="mt-6 btn-outline text-sm">
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="font-display text-xl font-bold text-white mb-6">Send us a message</h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Your Name</label>
                      <input
                        required
                        type="text"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder="Ramesh Sharma"
                        className="w-full bg-white/[0.04] border border-white/[0.09] rounded-lg px-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-crimson-700/60 focus:bg-white/[0.06] transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Email Address</label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full bg-white/[0.04] border border-white/[0.09] rounded-lg px-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-crimson-700/60 focus:bg-white/[0.06] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Subject</label>
                    <select
                      value={form.subject}
                      onChange={e => setForm({ ...form, subject: e.target.value })}
                      className="w-full bg-white/[0.04] border border-white/[0.09] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-crimson-700/60 focus:bg-white/[0.06] transition-all"
                    >
                      <option value="" className="bg-slate-900">Select a subject</option>
                      <option value="general"     className="bg-slate-900">General Enquiry</option>
                      <option value="outdated"    className="bg-slate-900">Outdated Portal / Guide</option>
                      <option value="bug"         className="bg-slate-900">Report a Bug</option>
                      <option value="contribute"  className="bg-slate-900">Contribute a Guide</option>
                      <option value="partnership" className="bg-slate-900">Partnership / Press</option>
                      <option value="other"       className="bg-slate-900">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us how we can help..."
                      className="w-full bg-white/[0.04] border border-white/[0.09] rounded-lg px-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-crimson-700/60 focus:bg-white/[0.06] transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full flex items-center justify-center gap-2 !py-4 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send size={16} /> Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 max-w-3xl mx-auto px-6">
        <h2 className="font-display text-3xl font-bold text-white mb-10 text-center">Frequently asked questions</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <details key={i} className="glass-card group">
              <summary className="px-6 py-5 cursor-pointer text-white font-medium text-sm flex items-center justify-between list-none hover:text-crimson-300 transition-colors">
                {faq.q}
                <span className="text-white/30 group-open:rotate-45 transition-transform duration-200 text-xl leading-none">+</span>
              </summary>
              <div className="px-6 pb-5 text-white/50 text-sm leading-relaxed border-t border-white/[0.05]">
                <div className="pt-4">{faq.a}</div>
              </div>
            </details>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
