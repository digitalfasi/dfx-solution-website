"use client";

import { Reveal, Eyebrow } from "./primitives";
import { Sparkles, ArrowRight } from "lucide-react";
import { MODULES } from "@/lib/academy/content";

/**
 * Section 05: THE 8-WEEK LEARNING JOURNEY
 * Premium product-roadmap timeline (horizontal on desktop, vertical on mobile).
 */
export function JourneyTimeline() {
  return (
    <section id="journey" className="academy-section container-px relative overflow-hidden bg-[#F2F7FF] py-16 lg:py-24">
      <div className="max-w-container mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <Eyebrow>Program Roadmap</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-semibold leading-[1.08] tracking-[-0.035em] text-academy-navy text-[clamp(1.9rem,3.4vw,2.9rem)]">
              Eight Weeks To Turn Learning <br className="hidden sm:inline" />
              <span className="text-academy-blue">Into Momentum.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-[15px] sm:text-[16px] leading-relaxed text-academy-navy/70">
              A structured, step-by-step practical progression designed to build real marketing capability week by week.
            </p>
          </Reveal>
        </div>

        {/* 8-Week Roadmap Grid (Responsive 4x2 on desktop, vertical on mobile) */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {MODULES.map((m, i) => (
            <Reveal key={m.week} delay={0.05 * i} className="h-full">
              <div className="h-full flex flex-col justify-between rounded-2xl bg-white p-6 border border-academy-navy/10 shadow-sm transition-all duration-300 hover:shadow-md hover:border-academy-blue/30 group relative overflow-hidden">
                <div className="absolute top-0 right-0 h-1.5 inset-x-0 bg-gradient-to-r from-transparent via-academy-blue to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tracking-[.18em] text-academy-blue bg-academy-tint px-2.5 py-1 rounded-md border border-academy-blue/15">
                      WEEK {m.week}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-academy-blue/80">
                      <Sparkles className="h-3 w-3" /> AI Integrated
                    </span>
                  </div>

                  <h3 className="mt-4 text-[15px] font-bold text-academy-navy leading-snug group-hover:text-academy-blue transition-colors duration-200">
                    {m.title}
                  </h3>

                  <p className="mt-2.5 text-[13px] leading-relaxed text-academy-navy/65">
                    {m.question}
                  </p>
                </div>

                <div className="mt-5 border-t border-academy-navy/10 pt-3.5">
                  <span className="block text-[10.5px] font-bold uppercase tracking-[.16em] text-academy-navy/45">
                    OUTCOME DELIVERABLE
                  </span>
                  <p className="mt-1 text-[12px] font-semibold text-academy-navy/90 flex items-center gap-1.5">
                    <ArrowRight className="h-3 w-3 text-academy-blue shrink-0" />
                    {m.deliverable}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
