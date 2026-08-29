import { Reveal, MaskReveal, Eyebrow } from "./primitives";
import { AI_AREAS, MODULES } from "@/lib/academy/content";

/**
 * AI positioning, drawn rather than listed.
 *
 * The diagram states the claim visually: the eight weeks run along the top,
 * the marketing workflow along the middle, and AI is the layer underneath all
 * of it — not a module sitting beside them, and not a list of tool logos.
 */
export function AIIntegration() {
  return (
    <section id="ai" className="relative overflow-hidden bg-academy-navy text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_20%_10%,rgba(0,123,255,0.18)_0%,transparent_60%)]"
      />
      <div className="academy-section container-px relative">
        <div className="max-w-container mx-auto">
          <div className="max-w-[760px]">
            <Reveal>
              <Eyebrow onDark>AI integration</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-semibold leading-[1.04] tracking-[-0.03em] text-[clamp(1.9rem,4.4vw,3.2rem)]">
                AI is not a separate module. It&rsquo;s integrated into how you learn, build and execute.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-7 max-w-[58ch] text-[clamp(1rem,1.3vw,1.125rem)] leading-relaxed text-white/60">
                You will not spend a week memorising tool names. You use AI inside the actual marketing work — the
                way it is used on live projects — and learn where it earns its place and where it does not.
              </p>
            </Reveal>
          </div>

          <MaskReveal delay={0.1}>
            <div className="mt-14 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-9 lg:mt-20">
              {/* Weeks */}
              <p className="text-[10px] font-semibold uppercase tracking-[.24em] text-white/35">
                Across every week
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {MODULES.map((m) => (
                  <span
                    key={m.week}
                    className="rounded-full border border-white/12 px-3 py-1.5 text-[11px] font-semibold text-white/55"
                  >
                    Week {m.week}
                  </span>
                ))}
              </div>

              {/* Workflow nodes */}
              <p className="mt-10 text-[10px] font-semibold uppercase tracking-[.24em] text-white/40">
                Inside the practical marketing pipeline
              </p>
              
              <div className="mt-6 relative">
                {/* Connecting glowing pipeline line */}
                <div className="hidden lg:block absolute top-[44px] left-8 right-8 h-0.5 bg-gradient-to-r from-academy-blue/20 via-academy-blue to-academy-blue/20 z-0" />
                
                <ol className="relative z-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {AI_AREAS.map((a, i) => (
                    <li
                      key={a.title}
                      className="group relative rounded-xl border border-white/12 bg-slate-950/80 p-5 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-academy-blue hover:shadow-[0_20px_50px_-20px_rgba(0,123,255,0.5)]"
                    >
                      <div className="flex items-center justify-between">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-academy-blue/20 text-xs font-bold text-academy-blue border border-academy-blue/40">
                          0{i + 1}
                        </span>
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      </div>
                      <h3 className="mt-4 text-[16px] font-bold text-white group-hover:text-academy-blue transition-colors duration-300">
                        {a.title}
                      </h3>
                      <p className="mt-2 text-[13px] leading-relaxed text-white/60">{a.desc}</p>
                    </li>
                  ))}
                  <li className="flex flex-col justify-center rounded-xl border border-academy-blue/40 bg-gradient-to-br from-academy-blue/20 to-slate-950 p-5 backdrop-blur-md">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-academy-blue">Continuous System</span>
                    <p className="mt-2 text-[13.5px] font-semibold leading-relaxed text-white">
                      Applied inside real marketing work — never demonstrated in isolation.
                    </p>
                  </li>
                </ol>
              </div>

              {/* The layer */}
              <div className="relative mt-12 pt-6 border-t border-white/10">
                <div className="h-[3px] w-full rounded-full bg-[linear-gradient(90deg,transparent,#007BFF_50%,transparent)] shadow-[0_0_15px_#007BFF]" />
                <p className="mt-4 text-center text-[11px] font-bold uppercase tracking-[.28em] text-academy-blue">
                  AI — Integrated core operational layer
                </p>
              </div>
            </div>
          </MaskReveal>
        </div>
      </div>
    </section>
  );
}
