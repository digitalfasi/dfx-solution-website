import { SectionHead, Reveal, MaskReveal } from "./primitives";
import { DELIVERABLES } from "@/lib/academy/content";
import { DELIVERABLE_MOCKS } from "./mockRegistry";

/**
 * What students build.
 *
 * Each deliverable is shown as a designed interface — the kind of artefact the
 * week actually produces — never a fabricated screenshot of student work. The
 * first two run full-width as feature pieces; the rest form the grid below.
 * Setting `image` on a DELIVERABLES entry swaps in a real screenshot.
 */
export function ProjectShowcase() {
  const [lead, second, ...rest] = DELIVERABLES;
  const [LeadMock, SecondMock, ...restMocks] = DELIVERABLE_MOCKS;

  return (
    <section id="projects" className="mock-quiet academy-section container-px bg-white">
      <div className="max-w-container mx-auto">
        <SectionHead
          eyebrow="What you build"
          title="You finish with work, not just notes."
          lead="Ten tangible outputs from eight weeks — the portfolio you show a client, an employer, or your own business."
        />

        {/* Two feature pieces set the standard for the grid below */}
        <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-2">
          {[
            { d: lead, M: LeadMock, i: 0 },
            { d: second, M: SecondMock, i: 1 },
          ].map(({ d, M, i }) => (
            <MaskReveal key={d.title} delay={i * 0.1}>
              <article className="group relative overflow-hidden rounded-2xl border border-academy-navy/10 bg-academy-tint p-6 transition-shadow duration-500 hover:shadow-[0_36px_90px_-52px_rgba(13,27,54,0.55)] sm:p-9">
                <div className="transition-transform duration-700 group-hover:-translate-y-1.5">
                  {d.image ? (
                    // eslint-disable-next-line @next/next/no-img-element -- CMS-supplied screenshot at unknown dimensions
                    <img
                      src={d.image}
                      alt={d.title}
                      className="aspect-[16/10] w-full rounded-xl border border-academy-navy/10 object-cover"
                    />
                  ) : (
                    <M />
                  )}
                </div>
                <div className="mt-7 flex items-start gap-4">
                  <span className="mt-0.5 text-[11px] font-bold tracking-[.14em] text-academy-blue">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[clamp(1.1rem,1.6vw,1.3rem)] font-semibold leading-snug tracking-tight text-academy-navy">
                      {d.title}
                    </h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-academy-navy/60">{d.note}</p>
                  </div>
                </div>
              </article>
            </MaskReveal>
          ))}
        </div>

        <div className="mt-6 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((d, idx) => {
            const M = restMocks[idx];
            return (
              <div key={d.title} className="group">
                <MaskReveal delay={(idx % 3) * 0.06}>
                  <div className="transition-transform duration-500 group-hover:-translate-y-1.5">
                    {d.image ? (
                      // eslint-disable-next-line @next/next/no-img-element -- CMS-supplied screenshot at unknown dimensions
                      <img
                        src={d.image}
                        alt={d.title}
                        className="aspect-[16/10] w-full rounded-xl border border-academy-navy/10 object-cover"
                      />
                    ) : M ? (
                      <M />
                    ) : null}
                  </div>
                </MaskReveal>
                <Reveal delay={0.08}>
                  <h3 className="mt-5 text-[14.5px] font-semibold leading-snug text-academy-navy">
                    <span className="mr-2.5 text-[11px] font-bold tracking-[.14em] text-academy-blue">
                      {String(idx + 3).padStart(2, "0")}
                    </span>
                    {d.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-academy-navy/55">{d.note}</p>
                </Reveal>
              </div>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-12 text-[12.5px] leading-relaxed text-academy-navy/40">
            Interfaces shown are representative of the work produced in each module — not screenshots of student
            results. Real project work replaces them as cohorts complete the program.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
