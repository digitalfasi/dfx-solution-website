import { Reveal, Eyebrow } from "./primitives";
import { ACADEMY, ACADEMY_JUMP_LINKS } from "@/lib/academy/content";

const FACTS = [
  { k: "8 weeks", v: "Eight modules, one per week" },
  { k: "Live", v: "Taught sessions, not recordings" },
  { k: "Online + In-person", v: `Remote, or in ${ACADEMY.locationCity}` },
  { k: "Portfolio-first", v: "Every week ends in a deliverable" },
];

/**
 * The answer to "what is this?" — placed immediately after the hero so a
 * first-time visitor is oriented within seconds.
 */
export function AcademyIntro() {
  return (
    <section id="program" className="academy-section container-px bg-academy-tint">
      <div className="max-w-container mx-auto">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
          <div>
            <Reveal>
              <Eyebrow>The Program</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-semibold tracking-[-0.025em] leading-[1.05] text-academy-navy text-[clamp(1.9rem,4.4vw,3.1rem)]">
                A practical digital marketing program, run by a company that does the work.
              </h2>
            </Reveal>

          {/* Contextual in-page links — subordinate to the global DFX
              Solution navbar, never a second navigation bar. */}
          <Reveal delay={0.25}>
            <nav
              aria-label="On this page"
              className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-academy-navy/10 pt-7"
            >
              <span className="text-[10px] font-semibold uppercase tracking-[.22em] text-academy-navy/35">
                On this page
              </span>
              {ACADEMY_JUMP_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="group inline-flex items-center gap-1.5 text-[13.5px] font-medium text-academy-navy/70 transition-colors duration-300 hover:text-academy-blue"
                >
                  {l.label}
                  <span aria-hidden className="text-academy-blue transition-transform duration-300 group-hover:translate-y-0.5">
                    ↓
                  </span>
                </a>
              ))}
            </nav>
          </Reveal>
          </div>

          <div className="lg:pt-4">
            <Reveal delay={0.1}>
              <p className="text-[clamp(1.05rem,1.4vw,1.25rem)] leading-relaxed text-academy-navy/75">
                DFX Academy is the education vertical of {ACADEMY.parent}. Over eight weeks you learn digital
                marketing the way it is actually practised — by building a website, ranking it, filling it with
                content, running ads to it, capturing and following up leads, measuring what happened, improving
                it, and then turning that capability into freelance or business work.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 text-[clamp(1rem,1.3vw,1.125rem)] leading-relaxed text-academy-navy/60">
                AI is not bolted on at the end. It is integrated into every module — in research, content,
                creative, analysis, automation and optimization — because that is how the work gets done.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-9 border-t border-academy-navy/10 pt-10 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                {FACTS.map((f) => (
                  <div key={f.k}>
                    <dt className="text-[clamp(1.05rem,1.5vw,1.35rem)] font-semibold tracking-tight text-academy-navy">
                      {f.k}
                    </dt>
                    <dd className="mt-2 text-[13px] leading-relaxed text-academy-navy/55">{f.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

          </div>
        </div>
      </div>
    </section>
  );
}
