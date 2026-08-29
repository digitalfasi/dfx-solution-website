"use client";

import { Reveal, Eyebrow } from "./primitives";
import { Sparkles, Globe, Search, Layers, Megaphone, Workflow, BarChart2, Target, FolderCheck, Gift, ArrowRight } from "lucide-react";

const LEARN_MODULES = [
  {
    num: "01",
    title: "Digital Foundation",
    points: [
      "Marketing Fundamentals",
      "Buyer Persona & Market Research",
      "Website Planning & Essentials",
    ],
  },
  {
    num: "02",
    title: "Search & Content",
    points: [
      "SEO + GEO (AI Search Optimization)",
      "Content Strategy & Creation",
      "Blogging, Landing Pages, Content Hubs",
    ],
  },
  {
    num: "03",
    title: "Growth & Conversion",
    points: [
      "Social Media Marketing",
      "Paid Advertising (Meta, Google, LinkedIn)",
      "Lead Generation & CRO",
    ],
  },
  {
    num: "04",
    title: "Measurement & Optimization",
    points: [
      "Analytics & Tracking",
      "Reporting & Dashboards",
      "Scaling with AI & Automation",
    ],
  },
];

const BUILD_CARDS = [
  {
    image: "/images/academy/build-business-website.jpg",
    icon: Globe,
    title: "Business Website",
    desc: "Live marketing-ready website",
  },
  {
    image: "/images/academy/build-seo-geo.jpg",
    icon: Search,
    title: "SEO & GEO Audit",
    desc: "Rank improvement strategy",
  },
  {
    image: "/images/academy/build-content-system.jpg",
    icon: Layers,
    title: "30-Day Content System",
    desc: "Content plan + assets ready to publish",
  },
  {
    image: "/images/academy/build-paid-campaign.jpg",
    icon: Megaphone,
    title: "Paid Campaign",
    desc: "Live ad campaign with results",
  },
  {
    image: "/images/academy/build-crm-automation.jpg",
    icon: Workflow,
    title: "CRM Automation",
    desc: "Leads → follow-up → conversion flow",
  },
  {
    image: "/images/academy/build-analytics.jpg",
    icon: BarChart2,
    title: "Analytics Dashboard",
    desc: "Real-time performance tracking",
  },
  {
    image: "/images/academy/build-cro.jpg",
    icon: Target,
    title: "CRO Plan",
    desc: "Convert more visitors into customers",
  },
  {
    image: "/images/academy/build-portfolio.jpg",
    icon: FolderCheck,
    title: "Portfolio Assets",
    desc: "Case studies, reports, screenshots",
  },
  {
    image: "/images/academy/build-prompt-library.jpg",
    icon: Sparkles,
    title: "DFX Prompt Library",
    desc: "AI prompts for marketing automation",
  },
];

/**
 * Section 04: CURRICULUM & DELIVERABLES
 * Enhanced with 9 premium deliverable imagery cards and smooth hover interactions.
 */
export function AcademyPrograms() {
  return (
    <section id="programs" className="academy-section container-px relative overflow-hidden bg-white py-16 lg:py-24">
      <div className="max-w-container mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <Eyebrow>Curriculum & Deliverables</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-semibold leading-[1.08] tracking-[-0.035em] text-academy-navy text-[clamp(1.9rem,3.4vw,2.9rem)]">
              Learn Skills That Create <br className="hidden sm:inline" />
              <span className="text-academy-blue">Real-World Results.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-[15px] sm:text-[16px] leading-relaxed text-academy-navy/70">
              A practical, future-ready curriculum designed to build real-world marketing capability and tangible portfolio deliverables.
            </p>
          </Reveal>
        </div>

        {/* 2-Column Balanced Roadmap Layout */}
        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-10 items-stretch">
          
          {/* LEFT: WHAT YOU WILL LEARN */}
          <div className="flex flex-col justify-between rounded-[24px] bg-[#FAFCFF] p-6 sm:p-8 border border-academy-navy/10 shadow-xs">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[.2em] text-academy-navy border-b border-academy-navy/10 pb-4 flex items-center justify-between">
                <span>WHAT YOU WILL LEARN</span>
                <span className="text-[10px] text-academy-blue font-semibold">4 CORE MODULES</span>
              </h3>

              <div className="mt-7 flex flex-col divide-y divide-academy-navy/8">
                {LEARN_MODULES.map((m, i) => (
                  <Reveal key={m.num} delay={0.05 * i} className="py-6 first:pt-0 last:pb-2">
                    <div>
                      {/* Module Number + Title Header */}
                      <div className="flex items-center gap-3">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-academy-blue/10 border border-academy-blue/20 text-academy-blue text-[11px] font-bold tracking-wider shrink-0">
                          {m.num}
                        </span>
                        <h4 className="text-[16px] font-bold text-academy-navy">
                          {m.title}
                        </h4>
                      </div>

                      {/* Learning Points Bullet List */}
                      <ul className="mt-3.5 pl-2 space-y-2.5">
                        {m.points.map((pt) => (
                          <li key={pt} className="text-[14px] font-medium text-academy-navy/80 flex items-start gap-2.5 leading-relaxed">
                            <span className="h-1.5 w-1.5 rounded-full bg-academy-blue shrink-0 mt-2" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Bottom Banner Left */}
            <div className="mt-8 flex items-center justify-center gap-2 rounded-2xl bg-academy-blue/10 border border-academy-blue/20 p-3.5 text-xs font-semibold text-academy-blue">
              <Sparkles className="h-4 w-4" />
              <span>AI Integrated Across All Modules</span>
            </div>
          </div>

          {/* RIGHT: WHAT YOU WILL BUILD (9 Premium Imagery Cards) */}
          <div className="flex flex-col justify-between rounded-[24px] bg-[#FAFCFF] p-6 sm:p-8 border border-academy-navy/10 shadow-xs">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[.2em] text-academy-navy border-b border-academy-navy/10 pb-4 flex items-center justify-between">
                <span>WHAT YOU WILL BUILD</span>
                <span className="text-[10px] text-academy-blue font-semibold">9 PORTFOLIO OUTPUTS</span>
              </h3>

              <div className="mt-7 grid gap-4 sm:grid-cols-3">
                {BUILD_CARDS.map((card, i) => {
                  const IconComp = card.icon;
                  return (
                    <Reveal key={card.title} delay={0.03 * i}>
                      <div className="h-full flex flex-col justify-between overflow-hidden rounded-[18px] bg-white border border-academy-navy/10 shadow-2xs hover:border-academy-blue/40 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
                        
                        {/* Premium Image Header (~35% card height) */}
                        <div className="relative h-28 sm:h-32 w-full overflow-hidden bg-academy-navy">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={card.image}
                            alt={card.title}
                            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        {/* Card Content Area */}
                        <div className="flex flex-1 flex-col justify-between p-4">
                          <div>
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-academy-blue/10 text-academy-blue border border-academy-blue/15 group-hover:bg-academy-blue group-hover:text-white transition-colors duration-200">
                              <IconComp className="h-4 w-4" />
                            </div>
                            <h4 className="mt-2.5 text-[13.5px] font-bold text-academy-navy leading-snug group-hover:text-academy-blue transition-colors duration-200">
                              {card.title}
                            </h4>
                            <p className="mt-1 text-[11.5px] leading-relaxed text-academy-navy/65">
                              {card.desc}
                            </p>
                          </div>
                          
                          <div className="mt-3 flex items-center justify-end">
                            <ArrowRight className="h-3 w-3 text-academy-navy/30 group-hover:text-academy-blue group-hover:translate-x-1 transition-all duration-200" />
                          </div>
                        </div>

                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>

            {/* Bottom Banner Right */}
            <div className="mt-8 flex items-center justify-center gap-2 rounded-2xl bg-emerald-50 border border-emerald-200 p-3.5 text-xs font-semibold text-emerald-800">
              <Gift className="h-4 w-4 text-emerald-600" />
              <span>Every learner leaves with a portfolio that gets noticed.</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
