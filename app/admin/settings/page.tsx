'use client'

import { useState } from 'react'
import { Save, Loader2, CheckCircle2, Globe, Bell, Shield, Database, RefreshCw } from 'lucide-react'

const sections = [
  {
    id: 'general',
    icon: Globe,
    title: 'General Settings',
    fields: [
      { key: 'siteName',    label: 'Site Name',        type: 'text',  value: 'SewaSetu',                    placeholder: 'SewaSetu' },
      { key: 'siteTagline', label: 'Tagline',          type: 'text',  value: 'सेवासेतु — Nepal\'s Unified Government Portal', placeholder: 'Tagline' },
      { key: 'contactEmail',label: 'Contact Email',    type: 'email', value: 'contact@sewasetu.com.np',     placeholder: 'admin@example.com' },
      { key: 'maintenanceMode', label: 'Maintenance Mode', type: 'toggle', value: false },
    ],
  },
  {
    id: 'notifications',
    icon: Bell,
    title: 'Notifications',
    fields: [
      { key: 'emailNotifications', label: 'Send email notifications',    type: 'toggle', value: true  },
      { key: 'reminderEmails',     label: 'Reminder emails enabled',     type: 'toggle', value: true  },
      { key: 'weeklyDigest',       label: 'Weekly digest email',         type: 'toggle', value: false },
    ],
  },
  {
    id: 'security',
    icon: Shield,
    title: 'Security',
    fields: [
      { key: 'requireEmailVerification', label: 'Require email verification on signup', type: 'toggle', value: false },
      { key: 'allowRegistration',        label: 'Allow new registrations',              type: 'toggle', value: true  },
      { key: 'sessionTimeout',           label: 'Session timeout (days)',               type: 'number', value: '30', placeholder: '30' },
    ],
  },
]

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, any>>(() => {
    const init: Record<string, any> = {}
    sections.forEach(s => s.fields.forEach(f => { init[f.key] = f.value }))
    return init
  })
  const [saving, setSaving] = useState<string | null>(null)
  const [saved,  setSaved]  = useState<string | null>(null)

  const update = (key: string, val: any) => setSettings(s => ({ ...s, [key]: val }))

  const saveSection = async (sectionId: string) => {
    setSaving(sectionId)
    await new Promise(r => setTimeout(r, 800)) // simulate API call
    setSaved(sectionId)
    setSaving(null)
    setTimeout(() => setSaved(null), 3000)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-white mb-1">Settings</h1>
        <p className="text-white/40 text-sm">Site-wide configuration and preferences</p>
      </div>

      {sections.map(section => {
        const Icon = section.icon
        return (
          <div key={section.id} className="glass-card p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-crimson-950/50 border border-crimson-900/40 rounded-lg flex items-center justify-center">
                  <Icon size={15} className="text-crimson-400" />
                </div>
                <h2 className="text-white font-semibold">{section.title}</h2>
              </div>
              <button
                onClick={() => saveSection(section.id)}
                disabled={saving === section.id}
                className="flex items-center gap-1.5 text-xs font-medium text-crimson-400 hover:text-crimson-300 transition-colors disabled:opacity-50"
              >
                {saving === section.id
                  ? <><Loader2 size={12} className="animate-spin" /> Saving…</>
                  : saved === section.id
                  ? <><CheckCircle2 size={12} className="text-green-400" /> Saved</>
                  : <><Save size={12} /> Save</>
                }
              </button>
            </div>

            {section.fields.map(field => (
              <div key={field.key}>
                {field.type === 'toggle' ? (
                  <div className="flex items-center justify-between py-1">
                    <span className="text-white/65 text-sm">{field.label}</span>
                    <button
                      onClick={() => update(field.key, !settings[field.key])}
                      className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${
                        settings[field.key] ? 'bg-crimson-600' : 'bg-white/10'
                      }`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                        settings[field.key] ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                ) : (
                  <div>
                    <label className="block text-white/40 text-xs mb-1.5">{field.label}</label>
                    <input
                      type={field.type}
                      value={settings[field.key]}
                      onChange={e => update(field.key, e.target.value)}
                      placeholder={(field as any).placeholder}
                      className="w-full bg-white/[0.04] border border-white/[0.09] rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-crimson-700/60 transition-all"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )
      })}

      {/* Database section */}
      <div className="glass-card p-6 space-y-4">
        <div className="flex items-center gap-2.5 border-b border-white/[0.06] pb-4">
          <div className="w-8 h-8 bg-blue-950/50 border border-blue-900/40 rounded-lg flex items-center justify-center">
            <Database size={15} className="text-blue-400" />
          </div>
          <h2 className="text-white font-semibold">Database & Data</h2>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Re-sync portal data',     desc: 'Re-seeds portals from data file', icon: RefreshCw, color: 'text-blue-400' },
            { label: 'Clear activity logs',     desc: 'Deletes all activity history',     icon: Database,  color: 'text-yellow-400' },
          ].map(action => {
            const Icon = action.icon
            return (
              <div key={action.label} className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4">
                <Icon size={16} className={`${action.color} mb-2`} />
                <div className="text-white text-sm font-medium mb-1">{action.label}</div>
                <div className="text-white/30 text-xs mb-3">{action.desc}</div>
                <button className="text-xs border border-white/[0.1] text-white/50 hover:text-white hover:border-white/20 px-3 py-1.5 rounded-lg transition-all">
                  Run
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Version info */}
      <div className="glass-card p-5">
        <div className="grid grid-cols-3 gap-4 text-center">
          {[
            { label: 'Version',   value: 'v0.1.0' },
            { label: 'Framework', value: 'Next.js 14' },
            { label: 'Database',  value: 'PostgreSQL' },
          ].map(info => (
            <div key={info.label}>
              <div className="text-white/25 text-xs mb-1">{info.label}</div>
              <div className="text-white/60 text-sm font-medium">{info.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
