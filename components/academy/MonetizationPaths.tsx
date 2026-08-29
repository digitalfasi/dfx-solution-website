import { SectionHead, Reveal } from "./primitives";
import { MONETIZATION_PATHS } from "@/lib/academy/content";
import { MockPortfolio, MockWebsite, MockAnalytics } from "./mockups";

const VISUALS = [MockPortfolio, MockWebsite, MockAnalytics];
const NOTES = [
  "Portfolio, service offer and outreach — the assets a client asks for.",
  "The same build applied to something you own.",
  "Measurement first, then the changes that follow from it.",
];

/**
 * Three practical directions after the program. No income figures, no earnings
 * screenshots, no guarantees — the brief prohibits them, and the visuals show
 * the work rather than a promised result.
 */
export function MonetizationPaths() {
  return (
    <section id="monetize" className="academy-section container-px bg-white">
      <div className="max-w-container mx-auto">
        <SectionHead
          eyebrow="After the program"
          title="Three ways the skill turns into work."
          lead="Week 08 exists to make this concrete: a portfolio, a service offer and an outreach system you can actually use."
        />

        <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-3">
          {MONETIZATION_PATHS.map((p, i) => {
            const V = VISUALS[i];
            return (
              <Reveal key={p.title} delay={i * 0.08}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-academy-navy/10 bg-academy-tint transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_40px_90px_-56px_rgba(13,27,54,0.55)]">
                  <div className="mock-quiet overflow-hidden px-6 pt-7">
                    <div className="translate-y-2 rotate-[1deg] transition-transform duration-700 group-hover:translate-y-0">
                      <V />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <span className="text-[11px] font-semibold uppercase tracking-[.24em] text-academy-blue">
                      Path {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 text-[clamp(1.3rem,2vw,1.6rem)] font-semibold tracking-tight text-academy-navy">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-[14.5px] leading-relaxed text-academy-navy/60">{p.desc}</p>
                    <p className="mt-auto pt-6 text-[13px] leading-relaxed text-academy-navy/40">{NOTES[i]}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-10 max-w-[62ch] text-[13px] leading-relaxed text-academy-navy/45">
            Interfaces shown are representative of the work, not client results. DFX Academy teaches the skills
            and the client-acquisition process — it does not promise income, placement or guaranteed results;
            outcomes depend on the work you put in after the program.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
