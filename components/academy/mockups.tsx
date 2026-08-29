"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

/**
 * Academy product mockups.
 *
 * Every deliverable in the program is represented by a designed interface
 * rather than a grey skeleton or a stock photo. These are drawn in markup —
 * no image assets, no network cost — and are explicitly labelled as
 * representative interfaces so nothing here can read as a real student
 * result. Swap any of them for a real screenshot by setting `image` on the
 * matching entry in DELIVERABLES.
 */

export function MockLabel({
  children = "Representative interface",
  dark = false,
}: {
  children?: string;
  dark?: boolean;
}) {
  return (
    <span
      data-mocklabel
      className={clsx(
        "pointer-events-none absolute bottom-2.5 right-3 z-10 text-[9px] font-semibold uppercase tracking-[.16em]",
        dark ? "text-white/25" : "text-academy-navy/25"
      )}
    >
      {children}
    </span>
  );
}

/** Canvas every mockup is drawn on; 16:10, matching the frame. */
const CANVAS_W = 460;
const CANVAS_H = 287.5;

function Frame({
  children,
  className,
  label,
  dark = false,
}: {
  children: React.ReactNode;
  className?: string;
  label?: string;
  dark?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Each interface is drawn once at CANVAS_W and scaled to whatever width the
  // container gives it, so one design stays legible in a hero card, a grid
  // cell and a phone column — instead of re-tuning type at every size.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const apply = (w: number) => setScale(w / CANVAS_W);
    apply(el.clientWidth);
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(([entry]) => apply(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={clsx(
        "mock relative aspect-[16/10] w-full overflow-hidden rounded-xl border",
        dark ? "border-white/10 bg-academy-navy2" : "border-academy-navy/10 bg-white",
        className
      )}
    >
      <div
        className="absolute left-0 top-0 flex origin-top-left flex-col"
        style={{ width: CANVAS_W, height: CANVAS_H, transform: `scale(${scale})` }}
      >
        {children}
        <MockLabel dark={dark}>{label}</MockLabel>
      </div>
    </div>
  );
}

/** Browser chrome with a live-looking address bar. */
function Chrome({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <>
      <div className="flex items-center gap-1.5 border-b border-academy-navy/10 bg-academy-tint px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-academy-navy/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-academy-navy/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-academy-navy/20" />
        <span className="ml-2 flex h-4 flex-1 items-center rounded-full bg-white px-2.5 text-[8px] font-medium text-academy-navy/40">
          {url}
        </span>
      </div>
      {children}
    </>
  );
}

/* ------------------------------------------------- 01 · website */

export function MockWebsite() {
  return (
    <Frame>
      <Chrome url="yourclient-brand.com">
        <div className="p-3 bg-slate-900 text-white h-full flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-[10px] font-bold text-academy-blue tracking-wide">STUDIO LABS</span>
            <div className="flex gap-3 text-[8px] text-white/70">
              <span>Services</span>
              <span>Work</span>
              <span className="bg-academy-blue text-white px-2 py-0.5 rounded-full font-medium">Contact</span>
            </div>
          </div>
          <div className="my-2 grid grid-cols-[1.2fr_0.8fr] gap-3 items-center">
            <div>
              <span className="text-[7px] uppercase font-semibold text-academy-blue tracking-widest block">AI-Driven Marketing</span>
              <h4 className="text-[11px] font-bold leading-tight mt-0.5 text-white">Scale Your Business Brand Online</h4>
              <p className="text-[8px] text-white/60 mt-1 leading-normal">High-converting digital foundation built for search performance and user engagement.</p>
              <div className="mt-2.5 flex gap-2">
                <span className="bg-academy-blue text-white text-[8px] font-bold px-2.5 py-1 rounded shadow-sm">Get Started</span>
                <span className="border border-white/20 text-white text-[8px] font-medium px-2.5 py-1 rounded">View Case Study</span>
              </div>
            </div>
            <div className="h-24 rounded-lg bg-gradient-to-tr from-academy-blue/40 to-indigo-600/30 p-2 border border-white/15 flex flex-col justify-end">
              <span className="text-[8px] font-bold text-white">Live Performance</span>
              <span className="text-[12px] font-extrabold text-emerald-400">+142% Traffic</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-white/10">
            <div className="bg-white/5 p-1.5 rounded border border-white/10">
              <span className="text-[7px] text-white/50 block">Speed Score</span>
              <span className="text-[9px] font-bold text-emerald-400">98 / 100</span>
            </div>
            <div className="bg-white/5 p-1.5 rounded border border-white/10">
              <span className="text-[7px] text-white/50 block">SEO Structure</span>
              <span className="text-[9px] font-bold text-academy-blue">Optimized</span>
            </div>
            <div className="bg-white/5 p-1.5 rounded border border-white/10">
              <span className="text-[7px] text-white/50 block">Conversion</span>
              <span className="text-[9px] font-bold text-white">4.8% Rate</span>
            </div>
          </div>
        </div>
      </Chrome>
    </Frame>
  );
}

/* ------------------------------------------------------ 02 · seo */

export function MockSEO() {
  const rows = [
    { q: "digital marketing course ambur", pos: "1", vol: "2.4K", diff: "Low" },
    { q: "best lead gen agency near me", pos: "2", vol: "5.1K", diff: "Med" },
    { q: "ai automation for small business", pos: "1", vol: "8.9K", diff: "High" },
  ];
  return (
    <Frame label="Representative interface">
      <div className="flex h-full flex-col p-3 bg-slate-950 text-white">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[9px] font-bold tracking-wider text-white">SEO PERFORMANCE CONSOLE</span>
          </div>
          <span className="text-[8px] bg-academy-blue/20 text-academy-blue border border-academy-blue/40 px-2 py-0.5 rounded-full font-semibold">Organic Growth +184%</span>
        </div>

        <div className="mt-2.5 space-y-1.5">
          {rows.map((r) => (
            <div key={r.q} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5">
              <div className="flex items-center gap-2">
                <span className="flex h-4 w-4 items-center justify-center rounded bg-academy-blue text-[9px] font-bold text-white">
                  #{r.pos}
                </span>
                <span className="text-[8.5px] font-medium text-white/90">{r.q}</span>
              </div>
              <div className="flex items-center gap-3 text-[8px]">
                <span className="text-white/50">{r.vol}/mo</span>
                <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-emerald-300 font-bold">Top Rank</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto grid grid-cols-3 gap-2 border-t border-white/10 pt-2.5">
          <div className="rounded bg-white/5 p-1.5 border border-white/10">
            <span className="block text-[7px] text-white/50 uppercase">Technical Score</span>
            <span className="text-[9.5px] font-bold text-emerald-400">96 / 100</span>
          </div>
          <div className="rounded bg-white/5 p-1.5 border border-white/10">
            <span className="block text-[7px] text-white/50 uppercase">Local Pack</span>
            <span className="text-[9.5px] font-bold text-academy-blue">Rank #1 Google</span>
          </div>
          <div className="rounded bg-white/5 p-1.5 border border-white/10">
            <span className="block text-[7px] text-white/50 uppercase">Keywords Indexed</span>
            <span className="text-[9.5px] font-bold text-white">340+ Terms</span>
          </div>
        </div>
      </div>
    </Frame>
  );
}

/* -------------------------------------------------- 03 · content */

export function MockContent() {
  return (
    <Frame>
      <div className="flex h-full flex-col p-3.5 bg-slate-900 text-white">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <span className="text-[9.5px] font-bold tracking-wider text-white">30-DAY CONTENT MATRIX</span>
          <span className="text-[8px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full font-medium">Multi-Channel Calendar</span>
        </div>
        <div className="mt-2.5 grid flex-1 grid-cols-[1.4fr_1fr] gap-3">
          <div className="grid grid-cols-7 grid-rows-4 gap-1 p-1 bg-white/5 rounded-lg border border-white/10">
            {Array.from({ length: 28 }).map((_, i) => (
              <div
                key={i}
                className={clsx(
                  "rounded flex flex-col justify-between p-0.5 text-[6px] font-bold transition-transform hover:scale-105",
                  [2, 4, 9, 11, 16, 18, 23, 25].includes(i)
                    ? "bg-academy-blue text-white"
                    : [1, 6, 13, 20, 27].includes(i)
                    ? "bg-indigo-600 text-white"
                    : "bg-white/10 text-white/40"
                )}
              >
                <span>{i + 1}</span>
                {[2, 4, 9, 11, 16, 18, 23, 25].includes(i) && <span className="text-[5px]">POST</span>}
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex-1 rounded-lg border border-white/10 bg-gradient-to-br from-indigo-900/40 to-academy-blue/20 p-2 flex flex-col justify-between">
              <span className="text-[7.5px] font-bold text-academy-blue uppercase">Creative Spotlight</span>
              <span className="text-[9px] font-semibold text-white leading-tight">&quot;3 AI Workflows to 10x Lead Output&quot;</span>
              <span className="text-[7px] text-emerald-400 font-bold">12.4K Reach · 84 Shares</span>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-1.5">
              <span className="text-[7px] text-white/50 block">Formats</span>
              <span className="text-[8px] font-bold text-white">Carousel · Reel · Thread</span>
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
}

/* ------------------------------------------------------ 04 · ads */

export function MockAds() {
  return (
    <Frame dark label="Representative interface">
      <div className="flex h-full gap-3 p-3.5 bg-slate-950 text-white">
        <div className="flex w-[44%] flex-col overflow-hidden rounded-lg border border-white/15 bg-white/5 p-2">
          <div className="flex-1 rounded bg-gradient-to-br from-blue-600 to-indigo-800 p-2 flex flex-col justify-end">
            <span className="text-[6.5px] bg-black/40 text-white px-1.5 py-0.5 rounded w-max mb-1 font-bold">SPONSORED</span>
            <span className="text-[8.5px] font-bold text-white leading-tight">Scale Qualified Leads with AI Automation</span>
          </div>
          <div className="pt-2">
            <span className="text-[7.5px] text-white/60 block">Meta Ads Campaign #04</span>
            <span className="mt-1 inline-block rounded bg-academy-blue text-white text-[7.5px] font-bold px-2 py-0.5">Claim Free Audit →</span>
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-between">
          <div className="space-y-1.5">
            <div className="flex justify-between items-center bg-white/5 p-1.5 rounded border border-white/10">
              <span className="text-[7.5px] text-white/60">Impressions</span>
              <span className="text-[9px] font-bold text-white">48,200</span>
            </div>
            <div className="flex justify-between items-center bg-white/5 p-1.5 rounded border border-white/10">
              <span className="text-[7.5px] text-white/60">Leads Generated</span>
              <span className="text-[9px] font-bold text-emerald-400">312 Leads</span>
            </div>
            <div className="flex justify-between items-center bg-white/5 p-1.5 rounded border border-white/10">
              <span className="text-[7.5px] text-white/60">Cost Per Lead</span>
              <span className="text-[9px] font-bold text-academy-blue">₹42.50</span>
            </div>
          </div>
          <div className="rounded bg-emerald-500/10 border border-emerald-500/30 p-1.5 text-center">
            <span className="text-[8px] text-emerald-300 font-bold">ROI: 4.8x Return on Ad Spend</span>
          </div>
        </div>
      </div>
    </Frame>
  );
}

/* ------------------------------------------------------ 05 · crm */

export function MockCRM() {
  const cols = [
    { t: "New Leads (14)", color: "bg-blue-500", items: ["Rahul M. — Web Lead", "Priya K. — Meta Ad"] },
    { t: "Contacted (8)", color: "bg-amber-500", items: ["Anand S. — Call Done"] },
    { t: "Converted (6)", color: "bg-emerald-500", items: ["Venkatesh — Enrolled"] },
  ];
  return (
    <Frame>
      <div className="flex h-full flex-col p-3 bg-slate-900 text-white">
        <div className="flex justify-between items-center border-b border-white/10 pb-1.5">
          <span className="text-[9px] font-bold tracking-wider text-white">CRM & AUTOMATION PIPELINE</span>
          <span className="text-[7.5px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">Auto Follow-up Active</span>
        </div>
        <div className="mt-2 grid flex-1 grid-cols-3 gap-2">
          {cols.map((c) => (
            <div key={c.t} className="flex flex-col rounded-lg bg-white/5 p-1.5 border border-white/10">
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className={clsx("h-1.5 w-1.5 rounded-full", c.color)} />
                <span className="text-[7.5px] font-bold text-white/80">{c.t}</span>
              </div>
              <div className="space-y-1">
                {c.items.map((item) => (
                  <div key={item} className="rounded bg-white/10 p-1.5 border border-white/10">
                    <span className="text-[7.5px] font-medium text-white block">{item}</span>
                    <span className="text-[6px] text-white/40 block mt-0.5">WhatsApp + Email Automated</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-2 flex items-center justify-between rounded bg-academy-blue/20 border border-academy-blue/40 px-2.5 py-1">
          <span className="text-[7.5px] text-academy-blue font-bold">Instant Notification Triggered</span>
          <span className="text-[7.5px] text-white/70">Response Time: &lt; 2 min</span>
        </div>
      </div>
    </Frame>
  );
}

/* ------------------------------------------------ 06 · analytics */

export function MockAnalytics() {
  return (
    <Frame dark>
      <div className="flex h-full flex-col p-3.5 bg-slate-950 text-white">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <span className="text-[9.5px] font-bold tracking-wider text-white">REAL-TIME ANALYTICS REPORT</span>
          <span className="rounded-full bg-academy-blue/20 text-academy-blue border border-academy-blue/40 px-2 py-0.5 text-[7.5px] font-bold">Last 30 Days</span>
        </div>
        <div className="relative mt-2 flex-1 overflow-hidden rounded-lg border border-white/10 bg-white/5 p-2">
          <div className="flex justify-between items-center text-[7.5px] text-white/50 mb-1">
            <span>Growth Curve (Revenue & Conversions)</span>
            <span className="text-emerald-400 font-bold">+210% YoY</span>
          </div>
          <svg viewBox="0 0 300 90" preserveAspectRatio="none" className="h-[75%] w-full">
            <defs>
              <linearGradient id="acArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#007BFF" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#007BFF" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0 70 L40 60 L80 65 L120 40 L160 48 L200 25 L240 30 L300 10 L300 90 L0 90 Z"
              fill="url(#acArea)"
            />
            <path
              d="M0 70 L40 60 L80 65 L120 40 L160 48 L200 25 L240 30 L300 10"
              fill="none"
              stroke="#007BFF"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-2 text-center">
          <div className="rounded bg-white/5 p-1 border border-white/10">
            <span className="block text-[6.5px] text-white/50 uppercase">Total Sessions</span>
            <span className="text-[9px] font-bold text-white">42,800</span>
          </div>
          <div className="rounded bg-white/5 p-1 border border-white/10">
            <span className="block text-[6.5px] text-white/50 uppercase">Form Conversions</span>
            <span className="text-[9px] font-bold text-emerald-400">1,420</span>
          </div>
          <div className="rounded bg-white/5 p-1 border border-white/10">
            <span className="block text-[6.5px] text-white/50 uppercase">Avg. Conv Rate</span>
            <span className="text-[9px] font-bold text-academy-blue">3.32%</span>
          </div>
        </div>
      </div>
    </Frame>
  );
}

/* ------------------------------------------------------ 07 · cro */

export function MockCRO() {
  return (
    <Frame>
      <div className="grid h-full grid-cols-2 gap-3 p-3.5 bg-slate-900 text-white">
        <div className="flex flex-col rounded-lg border border-white/10 bg-white/5 p-2">
          <span className="text-[8px] font-bold uppercase tracking-wider text-white/50">Control (Variant A)</span>
          <div className="mt-2 flex flex-1 flex-col justify-between border border-white/10 rounded p-2 bg-slate-950">
            <div>
              <span className="text-[8px] font-bold text-white block">Standard Headline</span>
              <span className="text-[7px] text-white/40 block mt-0.5">Generic Contact Form</span>
            </div>
            <div className="bg-white/10 p-1 rounded text-[7px] text-white/50 text-center">
              Conv Rate: 1.8%
            </div>
          </div>
        </div>
        <div className="flex flex-col rounded-lg border border-academy-blue/50 bg-academy-blue/10 p-2">
          <span className="text-[8px] font-bold uppercase tracking-wider text-academy-blue">Winner (Variant B)</span>
          <div className="mt-2 flex flex-1 flex-col justify-between border border-academy-blue/40 rounded p-2 bg-slate-950">
            <div>
              <span className="text-[8px] font-bold text-emerald-400 block">AI Interactive Audit Hook</span>
              <span className="text-[7px] text-white/70 block mt-0.5">1-Click WhatsApp CTA</span>
            </div>
            <div className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 p-1 rounded text-[7px] font-bold text-center">
              Conv Rate: 4.6% (+155% Lift)
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
}

/* ------------------------------------------------ 08 · portfolio */

export function MockPortfolio() {
  return (
    <Frame>
      <Chrome url="alex-marketing.portfolio">
        <div className="p-3 bg-slate-950 text-white h-full flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
            <span className="text-[9.5px] font-bold text-white tracking-wide">Alex M. · Digital Marketer</span>
            <span className="text-[7.5px] bg-academy-blue text-white font-bold px-2 py-0.5 rounded-full">Available for Work</span>
          </div>
          <div className="my-2 grid grid-cols-3 gap-2">
            <div className="rounded border border-white/10 bg-white/5 p-1.5">
              <span className="text-[7px] text-academy-blue font-bold block">SEO Strategy</span>
              <span className="text-[6.5px] text-white/60 block mt-0.5">+240% Traffic for E-com</span>
            </div>
            <div className="rounded border border-white/10 bg-white/5 p-1.5">
              <span className="text-[7px] text-indigo-400 font-bold block">Meta Paid Campaign</span>
              <span className="text-[6.5px] text-white/60 block mt-0.5">4.2x ROAS Lead Gen</span>
            </div>
            <div className="rounded border border-white/10 bg-white/5 p-1.5">
              <span className="text-[7px] text-emerald-400 font-bold block">CRM Automation</span>
              <span className="text-[6.5px] text-white/60 block mt-0.5">WhatsApp Funnel Setup</span>
            </div>
          </div>
          <div className="border-t border-white/10 pt-1.5 flex justify-between items-center text-[7.5px]">
            <span className="text-white/60">Verified Deliverables · DFX Academy Certified</span>
            <span className="text-academy-blue font-bold">Download Offer Deck →</span>
          </div>
        </div>
      </Chrome>
    </Frame>
  );
}

/* ------------------------------------------- prompt library */

export function MockPromptLibrary({ categories }: { categories: readonly string[] }) {
  const prompts = [
    { t: "Local SEO audit — service business", m: "SEO · Week 02" },
    { t: "30-day content calendar from one offer", m: "Content · Week 03" },
    { t: "Meta lead-gen angle generator", m: "Ads · Week 04" },
    { t: "Follow-up sequence from a cold enquiry", m: "CRM · Week 05" },
  ];
  return (
    <div className="overflow-hidden rounded-2xl border border-white/12 bg-white/[0.035] shadow-[0_40px_120px_-60px_rgba(0,0,0,0.9)] backdrop-blur-sm">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="ml-3 text-[10px] font-semibold uppercase tracking-[.2em] text-white/35">
          DFX Master Prompt Library
        </span>
      </div>

      <div className="grid gap-0 sm:grid-cols-[0.9fr_1.6fr]">
        <div className="border-b border-white/10 p-4 sm:border-b-0 sm:border-r">
          <div className="flex items-center gap-2 rounded-lg border border-white/12 bg-academy-navy/50 px-3 py-2">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 flex-shrink-0 text-white/30" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" strokeLinecap="round" />
            </svg>
            <span className="text-[12px] text-white/30">Search…</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {categories.map((c, i) => (
              <span
                key={c}
                className={clsx(
                  "rounded-full px-2.5 py-1 text-[11px]",
                  i === 2
                    ? "bg-academy-blue font-semibold text-white"
                    : "border border-white/12 text-white/50"
                )}
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className="p-4">
          <div className="space-y-2">
            {prompts.map((p, i) => (
              <div
                key={p.t}
                className={clsx(
                  "rounded-lg border px-3.5 py-3 transition-colors duration-300",
                  i === 0 ? "border-academy-blue/40 bg-academy-blue/[0.08]" : "border-white/10 bg-academy-navy/40"
                )}
              >
                <p className="text-[13px] font-medium text-white/90">{p.t}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[.16em] text-white/30">{p.m}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[10px] uppercase tracking-[.16em] text-white/25">Preview of the library interface</p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------- 09 · prompt card */

export function MockPromptShelf() {
  return (
    <Frame dark>
      <div className="flex h-full flex-col p-4">
        <span className="text-[9px] font-semibold uppercase tracking-[.16em] text-white/45">
          Master Prompt Library
        </span>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {["Research", "SEO", "Content", "Ads", "CRM"].map((c, i) => (
            <span
              key={c}
              className={clsx(
                "rounded-full px-2 py-0.5 text-[8px]",
                i === 1 ? "bg-academy-blue font-semibold text-white" : "border border-white/12 text-white/45"
              )}
            >
              {c}
            </span>
          ))}
        </div>
        <div className="mt-3 flex flex-1 flex-col gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={clsx(
                "flex-1 rounded-md border px-2.5 py-2",
                i === 0 ? "border-academy-blue/40 bg-academy-blue/[0.08]" : "border-white/10"
              )}
            >
              <span className="block h-1 w-[75%] rounded-full bg-white/30" />
              <span className="mt-1.5 block h-1 w-[40%] rounded-full bg-white/12" />
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

/* -------------------------------------------- 10 · certificate */

export function MockCertificate() {
  return (
    <Frame>
      <div className="flex h-full items-center justify-center p-5">
        <div className="flex h-full w-[78%] flex-col items-center justify-center rounded-lg border border-academy-navy/12 bg-academy-tint px-5 text-center">
          <span className="text-[8px] font-semibold uppercase tracking-[.28em] text-academy-blue">
            DFX Academy
          </span>
          <span className="mt-3 block h-1.5 w-24 rounded-full bg-academy-navy/25" />
          <span className="mt-2 block h-1 w-16 rounded-full bg-academy-navy/12" />
          <span className="mt-4 h-px w-20 bg-academy-navy/15" />
          <span className="mt-3 text-[7px] uppercase tracking-[.2em] text-academy-navy/35">
            Certificate of completion
          </span>
        </div>
      </div>
    </Frame>
  );
}
