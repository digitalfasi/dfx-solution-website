import Image from "next/image";
import { Reveal, Eyebrow, AcademyLogo, AcademyButton, Arrow } from "./primitives";
import { ACADEMY } from "@/lib/academy/content";

const CHAIN = [
  { t: "DFX Solution", d: "An operating digital and technology company." },
  { t: "Real industry work", d: "Client websites, search, ads, automation and CRM." },
  { t: "Real systems", d: "Repeatable methods, refined on live projects." },
  { t: "DFX Academy", d: "The same practice, taught in sequence." },
  { t: "Practical education", d: "You build what the work actually requires." },
];

/**
 * Credibility, built around one statement.
 *
 * The proof offered is the parent company's operating practice — no client
 * counts, satisfaction rates, revenue or student numbers, none of which are
 * verified. The chain shows where the curriculum comes from.
 */
export function DFXCredibility() {
  return (
    <section id="credibility" className="academy-section container-px bg-white">
      <div className="max-w-container mx-auto">
        <Reveal>
          <Eyebrow>Credibility</Eyebrow>
        </Reveal>

        {/* The statement, set as the largest type on the page */}
        <Reveal delay={0.05}>
          <h2 className="mt-8 font-semibold leading-[0.94] tracking-[-0.045em] text-academy-navy text-[clamp(2.6rem,10vw,8.5rem)]">
            We do it.
            <br />
            <span className="text-academy-blue">We teach it.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-12 border-t border-academy-navy/10 pt-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <Reveal delay={0.05}>
              <div className="flex items-center gap-5">
                <Image
                  src="/logo/dfx-solution-logo.png"
                  alt="DFX Solution"
                  width={400}
                  height={214}
                  className="h-9 w-auto"
                />
                <span className="h-8 w-px bg-academy-navy/10" aria-hidden />
                <AcademyLogo className="h-8" />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-7 max-w-[42ch] text-[15.5px] leading-relaxed text-academy-navy/60">
                {ACADEMY.attribution} The systems taught in the Academy are the systems the company builds and
                runs for its clients — websites, search, paid media, automation and CRM, operated as one.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8">
                <AcademyButton href="/#services" variant="ghost">
                  See what DFX Solution builds <Arrow />
                </AcademyButton>
              </div>
            </Reveal>
          </div>

          {/* The chain, as a horizontal progression on desktop */}
          <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
            <span
              className="absolute left-0 right-0 top-[11px] hidden h-0.5 bg-gradient-to-r from-academy-blue/30 via-academy-blue to-academy-blue/30 lg:block"
              aria-hidden
            />
            {CHAIN.map((c, i) => (
              <Reveal as="li" key={c.t} delay={i * 0.07} className="relative group rounded-xl border border-academy-navy/10 bg-academy-tint p-4 transition-all duration-300 hover:border-academy-blue hover:shadow-lg">
                <span
                  className="relative z-10 flex h-[23px] w-[23px] items-center justify-center rounded-full border border-academy-blue bg-white shadow-sm transition-transform duration-300 group-hover:scale-110"
                  aria-hidden
                >
                  <span className="h-[7px] w-[7px] rounded-full bg-academy-blue" />
                </span>
                <h3 className="mt-4 text-[15px] font-bold leading-snug tracking-tight text-academy-navy group-hover:text-academy-blue transition-colors duration-300">
                  {c.t}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-academy-navy/65">{c.d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
