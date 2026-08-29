"use client";

import { Reveal, MaskReveal, Eyebrow } from "./primitives";
import { ACADEMY } from "@/lib/academy/content";
import { ArrowRight } from "lucide-react";

const DIFFERENTIATORS = [
  {
    num: "01",
    t: "Learn From Practitioners",
    d: "Learn concepts from a practical, real-world perspective based on how digital growth systems are actually operated daily.",
  },
  {
    num: "02",
    t: "AI Integrated From Day One",
    d: "Understand how AI fits into modern workflows—research, content, search, paid campaigns and automation—rather than treating it as a separate topic.",
  },
  {
    num: "03",
    t: "Build Real Projects",
    d: "Move beyond theory through hands-on practical exercises and project-based learning that produce tangible marketing assets.",
  },
  {
    num: "04",
    t: "Guided Mentorship",
    d: "Get direct feedback and guidance from practitioners who run real-world campaigns and growth infrastructure.",
  },
];

/**
 * Section 02: WHY DFX ACADEMY — Refined with editorial layout and smooth micro-interactions.
 */
export function WhyDFX() {
  return (
    <section id="why-dfx" className="academy-section container-px relative overflow-hidden bg-white py-16 lg:py-24">
      <div className="max-w-container mx-auto">

        {/* Section Header */}
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow>Why DFX Academy</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-semibold leading-[1.08] tracking-[-0.035em] text-academy-navy text-[clamp(2rem,3.6vw,3.1rem)]">
              Learn How Modern Digital Marketing <span className="text-academy-blue">Actually Works.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-[56ch] text-[15px] sm:text-[16px] leading-relaxed text-academy-navy/70">
              You are not learning from a theoretical institute. {ACADEMY.parent} builds and operates real-world digital growth systems—and DFX Academy brings those practical workflows, AI integration, and frameworks into the learning experience.
            </p>
          </Reveal>
        </div>

        {/* Desktop 2-Column Composition / Mobile Stack */}
        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-16">
          
          {/* MOBILE RESPONSIVE ORDER: On mobile, show image first after intro, then 4 reasons */}
          <div className="order-2 lg:order-1">
            <div className="flex flex-col divide-y divide-academy-navy/10 border-t border-b border-academy-navy/10">
              {DIFFERENTIATORS.map((p, i) => (
                <Reveal key={p.t} delay={0.06 * i}>
                  <div className="group flex gap-5 py-5 sm:py-6 transition-all duration-200 hover:bg-academy-navy/[0.02] sm:px-3 sm:-mx-3 rounded-2xl">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-academy-blue/10 text-[11px] font-bold tracking-wider text-academy-blue border border-academy-blue/20 transition-colors duration-200 group-hover:bg-academy-blue group-hover:text-white">
                      {p.num}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <b className="text-[16px] font-bold text-academy-navy transition-colors duration-200 group-hover:text-academy-blue">
                          {p.t}
                        </b>
                        <ArrowRight className="h-4 w-4 text-academy-navy/20 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:text-academy-blue transition-all duration-200" />
                      </div>
                      <p className="mt-1.5 text-[13.5px] sm:text-[14px] leading-relaxed text-academy-navy/70">
                        {p.d}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* RIGHT: Photography Card */}
          <div className="order-1 lg:order-2">
            <MaskReveal className="relative group">
              <div className="relative overflow-hidden rounded-[24px] bg-academy-navy shadow-xl border border-academy-navy/10">
                <div className="relative h-[320px] sm:h-[440px] w-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/academy/why-dfx-agency.jpg"
                    alt="DFX Academy Classroom & Practitioner Guidance"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ objectPosition: "center center" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-academy-navy via-academy-navy/30 to-transparent" />
                </div>

                {/* Integrated Caption */}
                <div className="relative p-6 sm:p-7 bg-academy-navy text-white">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-bold uppercase tracking-[.26em] text-academy-blue">
                      PRACTICAL LEARNING ENVIRONMENT
                    </p>
                    <span className="text-[11px] text-white/50">Guided Execution</span>
                  </div>
                  <h4 className="mt-2 text-base sm:text-lg font-semibold text-white">
                    Real Projects. Real Workflows. Real Experience.
                  </h4>
                  <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-white/70">
                    Learners practice with live tools, search interfaces, AI workflow engines, and performance campaign structures.
                  </p>
                </div>
              </div>
            </MaskReveal>
          </div>

        </div>

      </div>
    </section>
  );
}
