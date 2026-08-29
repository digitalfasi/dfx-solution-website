"use client";

import { useState } from "react";
import clsx from "clsx";
import { SectionHead, Reveal } from "./primitives";
import { FAQS } from "@/lib/academy/content";
import { trackAcademy } from "@/lib/academy/track";

const faqSchemaLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export function AcademyFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="academy-section container-px bg-academy-tint">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaLd) }} />
      <div className="max-w-container mx-auto">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHead eyebrow="FAQ" title="Questions, answered plainly." />

          <div className="border-t border-academy-navy/10">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={f.q} delay={i * 0.03}>
                  <div
                    className={clsx(
                      "group relative border-b border-academy-navy/10 transition-colors duration-500",
                      isOpen && "bg-white/60"
                    )}
                  >
                    <span
                      aria-hidden
                      className={clsx(
                        "absolute left-0 top-0 h-full w-[2px] origin-top bg-academy-blue transition-transform duration-500",
                        isOpen ? "scale-y-100" : "scale-y-0"
                      )}
                    />
                    <h3>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => {
                          setOpen(isOpen ? null : i);
                          if (!isOpen) trackAcademy("academy_faq_open", { question: f.q });
                        }}
                        className={clsx(
                          "flex w-full items-start justify-between gap-8 py-7 text-left transition-[padding] duration-500",
                          isOpen ? "pl-6" : "pl-0 group-hover:pl-2"
                        )}
                      >
                        <span
                          className={clsx(
                            "pr-2 text-[clamp(1.05rem,1.5vw,1.3rem)] font-semibold leading-snug tracking-[-0.01em] transition-colors duration-300",
                            isOpen ? "text-academy-blue" : "text-academy-navy group-hover:text-academy-blue"
                          )}
                        >
                          {f.q}
                        </span>
                        <span
                          aria-hidden
                          className={clsx(
                            "relative mt-1.5 h-3.5 w-3.5 flex-shrink-0 transition-transform duration-500",
                            isOpen && "rotate-45"
                          )}
                        >
                          <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-academy-navy/50" />
                          <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-academy-navy/50" />
                        </span>
                      </button>
                    </h3>
                    <div
                      className={clsx(
                        "grid transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)]",
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className={clsx("max-w-[62ch] pb-8 text-[15.5px] leading-relaxed text-academy-navy/60", isOpen && "pl-6")}>{f.a}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
