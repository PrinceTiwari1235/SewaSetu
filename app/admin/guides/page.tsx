"use client";

import { Suspense, useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import {
  Plus,
  Trash2,
  Save,
  Loader2,
  CheckCircle2,
  ChevronUp,
  ChevronDown,
  X,
} from "lucide-react";

interface Step {
  title: string;
  content: string;
  titleNp?: string;
  contentNp?: string;
}
interface Doc {
  name: string;
  required: boolean;
  note?: string;
  nameNp?: string;
}
interface Portal {
  id: string;
  slug: string;
  name: string;
  icon: string;
}

const emptyStep: Step = { title: "", content: "", titleNp: "", contentNp: "" };
const emptyDoc: Doc = { name: "", required: true, note: "", nameNp: "" };

function AdminGuidesPageContent() {
  const searchParams = useSearchParams();
  const [portals, setPortals] = useState<Portal[]>([]);
  const [selected, setSelected] = useState<string>(
    searchParams.get("portal") || "",
  );
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Guide fields
  const [title, setTitle] = useState("");
  const [intro, setIntro] = useState("");
  const [steps, setSteps] = useState<Step[]>([{ ...emptyStep }]);
  const [documents, setDocuments] = useState<Doc[]>([{ ...emptyDoc }]);
  const [fees, setFees] = useState("");
  const [processingTime, setProcessingTime] = useState("");
  const [tips, setTips] = useState<string[]>([""]);

  // Load portals list
  useEffect(() => {
    fetch("/api/portals")
      .then((r) => r.json())
      .then((d) => setPortals(d.portals || []));
  }, []);

  // Load existing guide when portal is selected
  const loadGuide = useCallback(
    async (portalId: string) => {
      if (!portalId) return;
      setLoading(true);
      try {
        const res = await fetch(`/api/portals/${portalId}/guide`);
        const data = await res.json();
        const g = data.guide;
        if (g) {
          const portal = portals.find(
            (p) => p.id === portalId || p.slug === portalId,
          );
          setTitle(g.title || portal?.name || "");
          setIntro(g.intro || "");
          setSteps(g.steps?.length ? g.steps : [{ ...emptyStep }]);
          setDocuments(g.documents?.length ? g.documents : [{ ...emptyDoc }]);
          setFees(g.fees || "");
          setProcessingTime(g.processingTime || "");
          setTips(g.tips?.length ? g.tips : [""]);
        } else {
          const portal = portals.find(
            (p) => p.id === portalId || p.slug === portalId,
          );
          setTitle(portal?.name || "");
          setIntro("");
          setSteps([{ ...emptyStep }]);
          setDocuments([{ ...emptyDoc }]);
          setFees("");
          setProcessingTime("");
          setTips([""]);
        }
      } finally {
        setLoading(false);
      }
    },
    [portals],
  );

  useEffect(() => {
    if (selected) loadGuide(selected);
  }, [selected, loadGuide]);

  const handleSave = async () => {
    if (!selected) return;
    setSaving(true);
    setSaved(false);
    const res = await fetch(`/api/portals/${selected}/guide`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        intro,
        steps: steps.filter((s) => s.title.trim()),
        documents: documents.filter((d) => d.name.trim()),
        fees: fees || null,
        processingTime: processingTime || null,
        tips: tips.filter((t) => t.trim()),
      }),
    });
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
    setSaving(false);
  };

  // Step helpers
  const addStep = () => setSteps((s) => [...s, { ...emptyStep }]);
  const removeStep = (i: number) =>
    setSteps((s) => s.filter((_, idx) => idx !== i));
  const moveStep = (i: number, dir: -1 | 1) => {
    const s = [...steps];
    [s[i], s[i + dir]] = [s[i + dir], s[i]];
    setSteps(s);
  };
  const updateStep = (i: number, field: keyof Step, val: string) =>
    setSteps((s) =>
      s.map((step, idx) => (idx === i ? { ...step, [field]: val } : step)),
    );

  // Doc helpers
  const addDoc = () => setDocuments((d) => [...d, { ...emptyDoc }]);
  const removeDoc = (i: number) =>
    setDocuments((d) => d.filter((_, idx) => idx !== i));
  const updateDoc = (i: number, field: keyof Doc, val: any) =>
    setDocuments((d) =>
      d.map((doc, idx) => (idx === i ? { ...doc, [field]: val } : doc)),
    );

  // Tip helpers
  const addTip = () => setTips((t) => [...t, ""]);
  const removeTip = (i: number) =>
    setTips((t) => t.filter((_, idx) => idx !== i));
  const updateTip = (i: number, val: string) =>
    setTips((t) => t.map((tip, idx) => (idx === i ? val : tip)));

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white mb-1">
            Guide Editor
          </h1>
          <p className="text-white/40 text-sm">
            Create step-by-step guides and document checklists for each portal
          </p>
        </div>
        {selected && (
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-primary flex items-center gap-2 text-sm disabled:opacity-60"
          >
            {saving ? (
              <Loader2 size={14} className="animate-spin" />
            ) : saved ? (
              <CheckCircle2 size={14} />
            ) : (
              <Save size={14} />
            )}
            {saving ? "Saving…" : saved ? "Saved!" : "Save Guide"}
          </button>
        )}
      </div>

      {/* Portal selector */}
      <div className="glass-card p-4">
        <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">
          Select Portal to Edit
        </label>
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="w-full bg-white/[0.04] border border-white/[0.09] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-crimson-700/60 transition-all"
        >
          <option value="" className="bg-slate-900">
            — Choose a portal —
          </option>
          {portals.map((p) => (
            <option key={p.id} value={p.id} className="bg-slate-900">
              {p.icon} {p.name}
            </option>
          ))}
        </select>
      </div>

      {!selected ? (
        <div className="glass-card p-16 text-center text-white/30 text-sm">
          Select a portal above to edit its guide
        </div>
      ) : loading ? (
        <div className="glass-card p-16 flex items-center justify-center">
          <Loader2 size={24} className="text-white/30 animate-spin" />
        </div>
      ) : (
        <>
          {/* Basic info */}
          <div className="glass-card p-5 space-y-4">
            <h2 className="text-white font-semibold text-sm border-b border-white/[0.06] pb-3">
              Basic Information
            </h2>
            <div>
              <label className="block text-white/40 text-xs mb-1.5">
                Guide Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/[0.09] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-crimson-700/60 transition-all"
              />
            </div>
            <div>
              <label className="block text-white/40 text-xs mb-1.5">
                Introduction
              </label>
              <textarea
                value={intro}
                onChange={(e) => setIntro(e.target.value)}
                rows={3}
                placeholder="Brief overview of what this portal is for and who should use it…"
                className="w-full bg-white/[0.04] border border-white/[0.09] rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-crimson-700/60 transition-all resize-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white/40 text-xs mb-1.5">
                  Processing Time
                </label>
                <input
                  type="text"
                  value={processingTime}
                  onChange={(e) => setProcessingTime(e.target.value)}
                  placeholder="e.g. 7–14 working days"
                  className="w-full bg-white/[0.04] border border-white/[0.09] rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-crimson-700/60 transition-all"
                />
              </div>
              <div>
                <label className="block text-white/40 text-xs mb-1.5">
                  Fees (NPR)
                </label>
                <input
                  type="text"
                  value={fees}
                  onChange={(e) => setFees(e.target.value)}
                  placeholder="e.g. Free / NPR 5,000"
                  className="w-full bg-white/[0.04] border border-white/[0.09] rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-crimson-700/60 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="glass-card p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <h2 className="text-white font-semibold text-sm">
                Steps ({steps.length})
              </h2>
              <button
                onClick={addStep}
                className="flex items-center gap-1.5 text-xs text-crimson-400 hover:text-crimson-300 transition-colors"
              >
                <Plus size={12} /> Add Step
              </button>
            </div>
            {steps.map((step, i) => (
              <div
                key={i}
                className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-crimson-500 text-xs font-bold">
                    Step {i + 1}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      disabled={i === 0}
                      onClick={() => moveStep(i, -1)}
                      className="w-6 h-6 rounded flex items-center justify-center text-white/25 hover:text-white disabled:opacity-20 transition-colors"
                    >
                      <ChevronUp size={12} />
                    </button>
                    <button
                      disabled={i === steps.length - 1}
                      onClick={() => moveStep(i, 1)}
                      className="w-6 h-6 rounded flex items-center justify-center text-white/25 hover:text-white disabled:opacity-20 transition-colors"
                    >
                      <ChevronDown size={12} />
                    </button>
                    <button
                      onClick={() => removeStep(i)}
                      className="w-6 h-6 rounded flex items-center justify-center text-white/25 hover:text-red-400 transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </div>
                </div>
                <input
                  type="text"
                  value={step.title}
                  onChange={(e) => updateStep(i, "title", e.target.value)}
                  placeholder="Step title (English) *"
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-crimson-700/60 transition-all"
                />
                <textarea
                  value={step.content}
                  onChange={(e) => updateStep(i, "content", e.target.value)}
                  rows={2}
                  placeholder="Step instructions (English) *"
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-crimson-700/60 transition-all resize-none"
                />
                <input
                  type="text"
                  value={step.titleNp || ""}
                  onChange={(e) => updateStep(i, "titleNp", e.target.value)}
                  placeholder="शीर्षक (नेपाली, optional)"
                  className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2 text-white/60 text-sm placeholder:text-white/15 focus:outline-none focus:border-crimson-700/40 transition-all"
                />
              </div>
            ))}
          </div>

          {/* Documents */}
          <div className="glass-card p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <h2 className="text-white font-semibold text-sm">
                Required Documents ({documents.length})
              </h2>
              <button
                onClick={addDoc}
                className="flex items-center gap-1.5 text-xs text-crimson-400 hover:text-crimson-300 transition-colors"
              >
                <Plus size={12} /> Add Document
              </button>
            </div>
            {documents.map((doc, i) => (
              <div
                key={i}
                className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <div
                      onClick={() => updateDoc(i, "required", !doc.required)}
                      className={`w-8 h-4 rounded-full transition-colors ${doc.required ? "bg-crimson-600" : "bg-white/10"} relative flex-shrink-0`}
                    >
                      <div
                        className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-transform ${doc.required ? "translate-x-4" : "translate-x-0.5"}`}
                      />
                    </div>
                    <span className="text-white/40 text-xs">
                      {doc.required ? "Required" : "Optional"}
                    </span>
                  </label>
                  <button
                    onClick={() => removeDoc(i)}
                    className="text-white/25 hover:text-red-400 transition-colors"
                  >
                    <X size={12} />
                  </button>
                </div>
                <input
                  type="text"
                  value={doc.name}
                  onChange={(e) => updateDoc(i, "name", e.target.value)}
                  placeholder="Document name (English) *"
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-crimson-700/60 transition-all"
                />
                <input
                  type="text"
                  value={doc.note || ""}
                  onChange={(e) => updateDoc(i, "note", e.target.value)}
                  placeholder="Note (e.g. Original + photocopy required)"
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-white/60 text-sm placeholder:text-white/15 focus:outline-none focus:border-crimson-700/40 transition-all"
                />
                <input
                  type="text"
                  value={doc.nameNp || ""}
                  onChange={(e) => updateDoc(i, "nameNp", e.target.value)}
                  placeholder="कागजातको नाम (नेपाली, optional)"
                  className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2 text-white/50 text-sm placeholder:text-white/15 focus:outline-none transition-all"
                />
              </div>
            ))}
          </div>

          {/* Tips */}
          <div className="glass-card p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <h2 className="text-white font-semibold text-sm">Helpful Tips</h2>
              <button
                onClick={addTip}
                className="flex items-center gap-1.5 text-xs text-crimson-400 hover:text-crimson-300 transition-colors"
              >
                <Plus size={12} /> Add Tip
              </button>
            </div>
            {tips.map((tip, i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="text"
                  value={tip}
                  onChange={(e) => updateTip(i, e.target.value)}
                  placeholder={`Tip ${i + 1} — e.g. Bring extra photocopies of all documents`}
                  className="flex-1 bg-white/[0.04] border border-white/[0.09] rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-crimson-700/60 transition-all"
                />
                <button
                  onClick={() => removeTip(i)}
                  className="w-9 h-9 rounded-lg border border-white/[0.07] flex items-center justify-center text-white/25 hover:text-red-400 hover:border-red-900/40 transition-all flex-shrink-0"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>

          {/* Save button bottom */}
          <div className="flex justify-end pb-6">
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn-primary flex items-center gap-2 disabled:opacity-60"
            >
              {saving ? (
                <Loader2 size={15} className="animate-spin" />
              ) : saved ? (
                <CheckCircle2 size={15} />
              ) : (
                <Save size={15} />
              )}
              {saving ? "Saving guide…" : saved ? "Guide saved!" : "Save Guide"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default function AdminGuidesPage() {
  return (
    <Suspense fallback={<div className="max-w-4xl mx-auto space-y-6" />}>
      <AdminGuidesPageContent />
    </Suspense>
  );
}
