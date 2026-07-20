"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "What is an AI Growth System?",
    a: "An AI Growth System is a connected setup of website, SEO, paid advertising, automation and CRM working from shared data instead of running as separate, disconnected tools. DFX Solution builds and manages this as one system, so a change in one area — like a new landing page — improves the others automatically instead of needing separate updates everywhere.",
  },
  {
    q: "How is DFX Solution different from a regular digital marketing agency?",
    a: "Most agencies hand off pieces of your marketing to different specialists or subcontractors with their own tools and reporting. DFX Solution builds the website, SEO, ads, automation and CRM as one connected system with one team, and also builds its own AI products (like ReviewOS and AI Voice Agent) — so you're working with a technology partner, not just a media-buying service.",
  },
  {
    q: "Which industries does DFX Solution work with?",
    a: "DFX Solution specialises in healthcare, jewellery, hospitality, manufacturing, education, real estate, restaurants and small-to-medium businesses. Each industry runs on a different growth playbook — for example, healthcare focuses on appointment automation and patient reminders, while jewellery focuses on premium D2C storefronts and local search visibility.",
  },
  {
    q: "How long does SEO take to show results?",
    a: "SEO typically takes 3–6 months to show measurable ranking and traffic improvements, since search engines need time to recrawl and re-index a site after technical and content changes. Paid advertising (Google Ads, Meta Ads) can show results within weeks, while automation and CRM improvements — like faster response times — start improving conversion from the day they go live.",
  },
  {
    q: "What is ReviewOS and how does it work?",
    a: "ReviewOS is DFX Solution's own review-management product. It lets customers leave a Google review in one tap through a QR code or NFC card, tracks review volume and sentiment on a dashboard, and uses AI to draft replies to incoming reviews — helping a business collect and manage reviews without manual follow-up.",
  },
  {
    q: "Does DFX Solution offer AI automation like WhatsApp bots and call reminders?",
    a: "Yes. DFX Solution builds AI automation including WhatsApp-based lead qualification, an AI Voice Agent for outbound calls (payment reminders, offers, follow-ups), and Tablet Reminder for healthcare appointment and medication reminders — all connected to the same CRM so nothing falls through manually.",
  },
  {
    q: "Do I need a new website if I already have one?",
    a: "Not always. A Growth Audit first evaluates your current website's performance, technical SEO health and conversion setup — a rebuild is only recommended when the existing site is actually limiting results (slow load times, poor mobile experience, weak technical SEO). In some cases, targeted improvements to the existing site are more effective than a full rebuild.",
  },
  {
    q: "How do I get started with DFX Solution?",
    a: "The first step is a Free Growth Audit — a review of your current website, SEO position and marketing setup against your competitors, delivered with specific recommendations. From there, DFX Solution proposes which systems (website, SEO, ads, automation, CRM) would have the most impact first, based on your business's actual gaps rather than a fixed package.",
  },
];

const faqSchemaLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="section section-tight container-px">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaLd) }} />
      <div className="max-w-container mx-auto">
        <div className="mb-10 max-w-[640px]">
          <p className="text-xs font-semibold uppercase tracking-[.2em] text-highlight mb-4">Frequently Asked Questions</p>
          <h2 className="font-semibold tracking-tight text-tx text-[clamp(1.9rem,4.2vw,3rem)]">Common questions, answered.</h2>
        </div>
        <div className="max-w-[820px]">
          {FAQS.map((f, i) => (
            <div key={f.q} className="border-b border-border">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex justify-between items-center gap-6 py-6 text-left font-semibold text-tx"
                aria-expanded={open === i}
              >
                <span>{f.q}</span>
                <span className={`flex-shrink-0 text-highlight transition-transform duration-300 ${open === i ? "rotate-45" : ""}`}>+</span>
              </button>
              <div
                className="overflow-hidden transition-[max-height] duration-400"
                style={{ maxHeight: open === i ? 240 : 0 }}
              >
                <p className="pb-6 text-muted text-sm md:text-base leading-relaxed max-w-[68ch]">{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
