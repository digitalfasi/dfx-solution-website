"use client";

import { SectionHead, Reveal } from "./primitives";
import { AUDIENCE_PATHS } from "@/lib/academy/content";

const AUDIENCE_IMAGES: Record<string, string> = {
  students: "/images/academy/audience-students.jpg",
  "working-professionals": "/images/academy/audience-working-women.jpg",
  "business-owners": "/images/academy/audience-business.jpg",
  "aspiring-freelancers": "/images/academy/audience-homemakers.jpg",
};

/**
 * Section 4: WHO IT'S FOR
 * Answers: "Is this for me?"
 * 4 audience groups with high visual recognition and clear value props.
 */
export function AudiencePaths() {
  return (
    <section id="audience" className="academy-section container-px bg-white relative overflow-hidden">
      <div className="max-w-container mx-auto">
        <SectionHead
          eyebrow="Who it's for"
          title="Designed for ambitious learners and practitioners."
          lead="Whether you are launching your career, upgrading skills, growing a business, or freelancing—the practical frameworks apply directly."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {AUDIENCE_PATHS.map((p, i) => {
            const imgSrc = AUDIENCE_IMAGES[p.id] || "/images/academy/audience-students.jpg";
            return (
              <Reveal key={p.id} delay={i * 0.07}>
                <div className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-academy-navy/10 bg-white p-5 text-left transition-all duration-300 hover:border-academy-blue/50 hover:shadow-lg">
                  {/* Photo header */}
                  <div className="relative h-44 w-full overflow-hidden rounded-xl bg-academy-navy">
                    <img
                      src={imgSrc}
                      alt={p.title}
                      className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-academy-navy/80 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 rounded-full bg-academy-navy/80 px-2.5 py-1 text-[10px] font-bold text-white border border-white/20 backdrop-blur-sm">
                      0{i + 1}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="flex flex-1 flex-col pt-5">
                    <h3 className="text-lg font-bold text-academy-navy group-hover:text-academy-blue transition-colors">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-xs font-semibold text-academy-blue">
                      {p.lead}
                    </p>
                    <p className="mt-3 text-xs leading-relaxed text-academy-navy/70">
                      {p.outcome}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

