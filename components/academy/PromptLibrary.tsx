import { Reveal, MaskReveal, Eyebrow } from "./primitives";
import { PROMPT_LIBRARY_CATEGORIES } from "@/lib/academy/content";
import { MockPromptLibrary } from "./mockups";

/**
 * The Master Prompt Library, treated as a product rather than a bullet point.
 * The interface shown is a representation of the resource — wire it to real
 * data if the library ever ships as a live surface.
 */
export function PromptLibrary() {
  return (
    <section id="prompt-library" className="relative overflow-hidden bg-academy-navy2 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_70%_at_80%_20%,rgba(0,123,255,0.22)_0%,transparent_62%)]"
      />
      <div className="academy-section container-px relative">
        <div className="max-w-container mx-auto grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20">
          <div>
            <Reveal>
              <Eyebrow onDark>Master Prompt Library</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="inline-flex items-center gap-2 rounded-full border border-academy-blue/40 bg-academy-blue/15 px-3.5 py-1.5 text-xs font-semibold text-academy-blue mb-4">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                LIFETIME DIGITAL ASSET ACCESS
              </div>
              <h2 className="mt-2 font-semibold leading-[1.04] tracking-[-0.03em] text-[clamp(1.9rem,4.2vw,3.1rem)] text-white">
                Your AI advantage doesn&rsquo;t end with the course.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-[46ch] text-[clamp(1rem,1.3vw,1.125rem)] leading-relaxed text-white/70">
                Every participant keeps lifetime access to the DFX Master Prompt Library — the working prompts
                behind research, copy, SEO, creative, ads, CRM, analytics and client outreach, organised by the
                stage of work you are in.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <ul className="mt-8 flex flex-col gap-3.5 text-[14.5px] text-white/80">
                {[
                  "Organised by stage of work, not by tool name",
                  "Written & tested for the systems taught in the program",
                  "Continuously updated as marketing models evolve",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-3">
                    <span className="h-2 w-2 flex-shrink-0 rounded-full bg-academy-blue shadow-[0_0_8px_#007BFF]" aria-hidden />
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <MaskReveal delay={0.08}>
            <div className="rotate-[-0.6deg] drop-shadow-[0_50px_110px_rgba(0,0,0,0.65)]">
              <MockPromptLibrary categories={PROMPT_LIBRARY_CATEGORIES} />
            </div>
          </MaskReveal>
        </div>
      </div>
    </section>
  );
}
