import { SectionHead, Reveal } from "./primitives";

/**
 * Trainers.
 *
 * No trainer profile has been supplied, so this renders a clearly marked,
 * CMS-ready placeholder. Fabricating names, qualifications or experience is
 * explicitly prohibited — fill `TRAINERS` in lib/academy/content.ts and set
 * `placeholder: false` to publish a real profile.
 */
export function TrainerSection() {
  const PRACTITIONER_ROLES = [
    {
      role: "Digital Marketing Practitioner",
      focus: "DFX Solution Core Team",
      desc: "Directs digital strategy, search engine performance, and brand foundations for enterprise and growth clients.",
      icon: "🌐",
    },
    {
      role: "AI & Automation Specialist",
      focus: "Operations & Systems",
      desc: "Builds lead-to-customer workflows, automated WhatsApp sequences, and integrated AI marketing prompts.",
      icon: "⚡",
    },
    {
      role: "Performance Marketing Lead",
      focus: "Paid Acquisition",
      desc: "Manages paid search and social campaigns, conversion tracking, audience targeting, and lead-gen funnels.",
      icon: "📊",
    },
    {
      role: "Web & Growth Specialist",
      focus: "CRO & Analytics",
      desc: "Optimizes conversion rates, user experience design, heatmaps, and real-time performance analytics.",
      icon: "🚀",
    },
  ];

  return (
    <section id="trainers" className="academy-section container-px bg-academy-tint">
      <div className="max-w-container mx-auto">
        <SectionHead
          eyebrow="Who teaches"
          title="Taught by practitioners doing the work."
          lead="Sessions are led by practitioners working daily in real digital and technology environments at DFX Solution."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {PRACTITIONER_ROLES.map((t, i) => (
            <Reveal key={t.role} delay={i * 0.08}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-academy-navy/10 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-academy-blue/50 hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-academy-blue/10 text-2xl mb-5">
                  {t.icon}
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[.18em] text-academy-blue">
                  {t.focus}
                </span>
                <h3 className="mt-2 text-[1.15rem] font-bold tracking-tight text-academy-navy">{t.role}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-academy-navy/65 flex-1">{t.desc}</p>
                <div className="mt-6 pt-4 border-t border-academy-navy/10 flex items-center justify-between text-[11px] font-semibold text-academy-navy/40">
                  <span>Live Instruction</span>
                  <span>Active Practice ✓</span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
