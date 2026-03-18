"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ExternalLink,
  Bookmark,
  CheckCircle2,
  Circle,
  ArrowLeft,
  FileText,
  AlertCircle,
  Clock,
  DollarSign,
  ChevronDown,
  ChevronUp,
  Share2,
} from "lucide-react";

interface Guide {
  id: string;
  portalId: string;
  title: string;
  titleNp: string | null;
  intro: string;
  introNp: string | null;
  steps: any;
  documents: any;
  fees: string | null;
  processingTime: string | null;
  tips: string[];
  updatedAt: Date;
}
interface Portal {
  id: string;
  slug: string;
  name: string;
  url: string;
  icon: string;
  category: string;
  description: string;
  tags: string[];
  featured: boolean;
  guide: Guide | null;
}

interface Props {
  portal: Portal;
  initialBookmarked: boolean;
  userId?: string;
}

export default function PortalDetailClient({
  portal,
  initialBookmarked,
  userId,
}: Props) {
  const [bookmarked, setBookmarked] = useState(initialBookmarked);
  const [bookmarking, setBookmarking] = useState(false);
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [expandedStep, setExpandedStep] = useState<number | null>(0);
  const [copied, setCopied] = useState(false);

  const guide = portal.guide as any;

  const toggleBookmark = async () => {
    if (!userId) return;
    setBookmarking(true);
    if (bookmarked) {
      await fetch(`/api/user/bookmarks?portalId=${portal.id}`, {
        method: "DELETE",
      });
      setBookmarked(false);
    } else {
      await fetch("/api/user/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ portalId: portal.id }),
      });
      setBookmarked(true);
    }
    setBookmarking(false);
  };

  const toggleCheck = (i: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const share = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const documents: any[] = guide?.documents || [];
  const steps: any[] = guide?.steps || [];
  const tips: string[] = guide?.tips || [];
  const allChecked =
    documents.length > 0 &&
    checked.size === documents.filter((d: any) => d.required).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back */}
      <Link
        href="/dashboard/portals"
        className="inline-flex items-center gap-1.5 text-white/40 hover:text-white text-sm transition-colors group"
      >
        <ArrowLeft
          size={14}
          className="group-hover:-translate-x-0.5 transition-transform"
        />{" "}
        All Portals
      </Link>

      {/* Header card */}
      <div className="glass-card p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <span className="text-4xl flex-shrink-0">{portal.icon}</span>
            <div>
              <h1 className="font-display text-2xl font-bold text-white mb-1">
                {portal.name}
              </h1>
              <a
                href={portal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/35 text-xs hover:text-crimson-400 transition-colors flex items-center gap-1"
              >
                {portal.url.replace("https://", "")} <ExternalLink size={10} />
              </a>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {portal.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] bg-white/[0.05] border border-white/[0.07] text-white/40 px-2 py-0.5 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={share}
              className="w-9 h-9 rounded-xl border border-white/[0.09] flex items-center justify-center text-white/35 hover:text-white hover:border-white/20 transition-all"
              title="Copy link"
            >
              <Share2 size={14} />
            </button>
            {userId && (
              <button
                onClick={toggleBookmark}
                disabled={bookmarking}
                className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all ${
                  bookmarked
                    ? "bg-crimson-900/40 border-crimson-700/50 text-crimson-400"
                    : "border-white/[0.09] text-white/35 hover:text-crimson-400 hover:border-crimson-800/40"
                }`}
                title={bookmarked ? "Remove bookmark" : "Save portal"}
              >
                <Bookmark
                  size={14}
                  fill={bookmarked ? "currentColor" : "none"}
                />
              </button>
            )}
            <a
              href={portal.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-2 text-sm !py-2 !px-4"
            >
              Open Portal <ExternalLink size={13} />
            </a>
          </div>
        </div>

        <p className="text-white/55 text-sm leading-relaxed mt-4">
          {portal.description}
        </p>

        {copied && (
          <div className="mt-3 text-xs text-green-400 flex items-center gap-1">
            <CheckCircle2 size={12} /> Link copied to clipboard
          </div>
        )}
      </div>

      {/* Quick info */}
      {guide && (
        <div className="grid grid-cols-3 gap-4">
          {guide.processingTime && (
            <div className="glass-card p-4 flex items-center gap-3">
              <Clock size={16} className="text-blue-400 flex-shrink-0" />
              <div>
                <div className="text-white/35 text-xs">Processing Time</div>
                <div className="text-white text-sm font-medium">
                  {guide.processingTime}
                </div>
              </div>
            </div>
          )}
          {guide.fees && (
            <div className="glass-card p-4 flex items-center gap-3">
              <DollarSign size={16} className="text-green-400 flex-shrink-0" />
              <div>
                <div className="text-white/35 text-xs">Fees</div>
                <div className="text-white text-sm font-medium">
                  {guide.fees}
                </div>
              </div>
            </div>
          )}
          <div className="glass-card p-4 flex items-center gap-3">
            <FileText size={16} className="text-yellow-400 flex-shrink-0" />
            <div>
              <div className="text-white/35 text-xs">Documents Required</div>
              <div className="text-white text-sm font-medium">
                {documents.filter((d: any) => d.required).length} required
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-5 gap-6">
        {/* Steps — takes 3 cols */}
        <div className="md:col-span-3 space-y-4">
          {steps.length > 0 ? (
            <>
              <h2 className="text-white font-semibold flex items-center gap-2">
                <span className="w-5 h-5 bg-crimson-800/60 border border-crimson-700/50 rounded-md flex items-center justify-center text-crimson-400 text-[10px] font-bold">
                  ✦
                </span>
                How to apply — step by step
              </h2>
              <div className="space-y-2">
                {steps.map((step: any, i: number) => (
                  <div key={i} className="glass-card overflow-hidden">
                    <button
                      onClick={() =>
                        setExpandedStep(expandedStep === i ? null : i)
                      }
                      className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-white/[0.03] transition-colors"
                    >
                      <div className="w-6 h-6 rounded-full bg-crimson-900/50 border border-crimson-800/40 flex items-center justify-center text-crimson-400 text-xs font-bold flex-shrink-0">
                        {i + 1}
                      </div>
                      <span className="text-white text-sm font-medium flex-1">
                        {step.title}
                      </span>
                      {expandedStep === i ? (
                        <ChevronUp
                          size={14}
                          className="text-white/30 flex-shrink-0"
                        />
                      ) : (
                        <ChevronDown
                          size={14}
                          className="text-white/30 flex-shrink-0"
                        />
                      )}
                    </button>
                    {expandedStep === i && (
                      <div className="px-5 pb-4 pt-0 text-white/55 text-sm leading-relaxed border-t border-white/[0.04]">
                        <div className="pt-3">{step.content}</div>
                        {step.contentNp && (
                          <div className="mt-2 text-white/30 text-xs">
                            {step.contentNp}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="glass-card p-8 text-center">
              <FileText size={32} className="text-white/15 mx-auto mb-3" />
              <p className="text-white/50 text-sm font-medium mb-1">
                No guide available yet
              </p>
              <p className="text-white/30 text-xs">
                Visit the official portal directly for instructions.
              </p>
              <a
                href={portal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-crimson-400 hover:text-crimson-300 text-sm transition-colors"
              >
                Open {portal.name} <ExternalLink size={12} />
              </a>
            </div>
          )}

          {/* Tips */}
          {tips.length > 0 && (
            <div className="glass-card p-5">
              <h3 className="text-white/60 text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <AlertCircle size={11} className="text-yellow-400" /> Helpful
                Tips
              </h3>
              <ul className="space-y-2">
                {tips.map((tip: string, i: number) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-white/50 text-sm"
                  >
                    <span className="text-yellow-500 mt-0.5 flex-shrink-0">
                      •
                    </span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Document checklist — takes 2 cols */}
        <div className="md:col-span-2 space-y-4">
          {documents.length > 0 ? (
            <div className="glass-card p-5 sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white font-semibold text-sm">
                  Documents Needed
                </h2>
                {allChecked && (
                  <span className="text-green-400 text-xs flex items-center gap-1">
                    <CheckCircle2 size={11} /> Ready!
                  </span>
                )}
              </div>

              {/* Progress bar */}
              <div className="h-1 bg-white/[0.06] rounded-full mb-4 overflow-hidden">
                <div
                  className="h-full bg-crimson-600 rounded-full transition-all duration-300"
                  style={{
                    width: `${documents.length ? (checked.size / documents.filter((d: any) => d.required).length) * 100 : 0}%`,
                  }}
                />
              </div>

              <div className="space-y-2">
                {documents.map((doc: any, i: number) => (
                  <button
                    key={i}
                    onClick={() => doc.required && toggleCheck(i)}
                    className={`w-full flex items-start gap-3 p-3 rounded-xl transition-all text-left ${
                      doc.required
                        ? checked.has(i)
                          ? "bg-green-950/30 border border-green-900/30"
                          : "bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06]"
                        : "bg-white/[0.02] border border-white/[0.04] opacity-60"
                    }`}
                  >
                    {doc.required ? (
                      checked.has(i) ? (
                        <CheckCircle2
                          size={15}
                          className="text-green-400 flex-shrink-0 mt-0.5"
                        />
                      ) : (
                        <Circle
                          size={15}
                          className="text-white/25 flex-shrink-0 mt-0.5"
                        />
                      )
                    ) : (
                      <Circle
                        size={15}
                        className="text-white/15 flex-shrink-0 mt-0.5"
                      />
                    )}
                    <div>
                      <div
                        className={`text-sm font-medium leading-snug ${checked.has(i) ? "text-green-400" : "text-white/70"}`}
                      >
                        {doc.name}
                        {!doc.required && (
                          <span className="text-white/25 font-normal text-xs ml-1">
                            (optional)
                          </span>
                        )}
                      </div>
                      {doc.note && (
                        <div className="text-white/30 text-xs mt-0.5 leading-snug">
                          {doc.note}
                        </div>
                      )}
                      {doc.nameNp && (
                        <div className="text-white/20 text-xs mt-0.5">
                          {doc.nameNp}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <p className="text-white/25 text-xs mt-3">
                {checked.size} of{" "}
                {documents.filter((d: any) => d.required).length} required
                documents checked
              </p>

              <a
                href={portal.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all ${
                  allChecked
                    ? "bg-crimson-700 hover:bg-crimson-600 text-white shadow-glow-red"
                    : "border border-white/[0.1] text-white/50 hover:text-white hover:border-white/20"
                }`}
              >
                Go to Portal <ExternalLink size={13} />
              </a>
            </div>
          ) : (
            <div className="glass-card p-5 text-center">
              <p className="text-white/40 text-sm mb-3">
                No document checklist available yet.
              </p>
              <a
                href={portal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center justify-center gap-2 text-sm !py-2.5"
              >
                Open Portal <ExternalLink size={13} />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
