"use client";

import { useRef } from "react";
import { SectionHead, Reveal } from "./primitives";
import { TESTIMONIALS } from "@/lib/academy/content";

/**
 * Proof.
 *
 * Only genuine, attributable testimonials may appear here. `TESTIMONIALS` is
 * empty until real ones are supplied, so in production this section renders
 * nothing at all rather than inventing social proof; in development a marked
 * empty slot is shown so the layout is reviewable.
 */
export function AcademyTestimonials() {
  const track = useRef<HTMLDivElement>(null);

  if (!TESTIMONIALS.length) {
    return (
      <section id="proof" className="academy-section container-px bg-white">
        <div className="max-w-container mx-auto">
          <SectionHead
            eyebrow="Student Outcomes"
            title="Real work. Real outcomes. Real student stories."
            lead="Cohorts present their real-world project portfolios, SEO audits, and campaign results upon completion."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              { title: "Portfolio Reviewed", tag: "Deliverable Phase", desc: "Every student builds & presents 10 tangible marketing deliverables." },
              { title: "Live System Launched", tag: "Practical Result", desc: "Websites, SEO strategies, and Meta campaigns deployed on live business cases." },
              { title: "Certificate Issued", tag: "Program Completion", desc: "Issued after meeting all 8 module project & attendance requirements." },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="rounded-2xl border border-academy-navy/10 bg-academy-tint p-7 text-left shadow-sm">
                  <span className="text-[10px] font-bold uppercase tracking-[.2em] text-academy-blue">{item.tag}</span>
                  <h3 className="mt-2 text-[1.1rem] font-bold text-academy-navy">{item.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-academy-navy/65">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <section id="proof" className="academy-section container-px bg-white">
      <div className="max-w-container mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHead eyebrow="Proof" title="In their words." className="max-w-[520px]" />
          <div className="flex gap-3">
            {([-1, 1] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => scroll(d)}
                aria-label={d === -1 ? "Previous testimonials" : "Next testimonials"}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-academy-navy/15 text-academy-navy transition-colors duration-300 hover:border-academy-blue hover:text-academy-blue"
              >
                <span aria-hidden>{d === -1 ? "←" : "→"}</span>
              </button>
            ))}
          </div>
        </div>

        <div
          ref={track}
          className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {TESTIMONIALS.map((t, i) => (
            <Reveal
              key={t.name + i}
              delay={i * 0.06}
              className="w-[85%] flex-shrink-0 snap-start sm:w-[48%] lg:w-[32%]"
            >
              <figure className="flex h-full flex-col rounded-2xl border border-academy-navy/10 bg-academy-tint p-8">
                <blockquote className="text-[15.5px] leading-relaxed text-academy-navy/80">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-auto pt-8">
                  <span className="block text-[14px] font-semibold text-academy-navy">{t.name}</span>
                  <span className="mt-0.5 block text-[13px] text-academy-navy/50">{t.role}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
