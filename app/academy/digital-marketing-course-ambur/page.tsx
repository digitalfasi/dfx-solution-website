import type { Metadata } from "next";
import { AcademyPageHeader } from "@/components/academy/PageHeader";
import { AudiencePaths } from "@/components/academy/AudiencePaths";
import { JourneyTimeline } from "@/components/academy/JourneyTimeline";
import { ProjectShowcase } from "@/components/academy/ProjectShowcase";
import { AcademyFAQ } from "@/components/academy/AcademyFAQ";
import { AcademyEnquiry } from "@/components/academy/AcademyEnquiry";
import { AcademyCTA } from "@/components/academy/AcademyCTA";
import { AcademyButton, Arrow, Reveal, SectionHead } from "@/components/academy/primitives";
import { ACADEMY, ACADEMY_ROUTES } from "@/lib/academy/content";

export const metadata: Metadata = {
  title: `Digital Marketing Course in ${ACADEMY.locationCity} | DFX Academy`,
  description: `Learn AI digital marketing in ${ACADEMY.locationCity} with DFX Academy — an 8-week live practical program, available in-person and online, built around real projects and a portfolio.`,
  alternates: { canonical: "/academy/digital-marketing-course-ambur" },
};

const LOCAL_POINTS = [
  {
    t: "In-person or online",
    d: `Attend the live sessions in ${ACADEMY.locationCity}, or join the same program remotely.`,
  },
  {
    t: "Taught by an operating company",
    d: `${ACADEMY.parent} builds and runs digital growth systems — the Academy teaches that same practice.`,
  },
  {
    t: "Built for local businesses too",
    d: "Owners can apply each week directly to their own business — website, local search, ads and follow-up.",
  },
];

export default function AmburCoursePage() {
  return (
    <>
      <AcademyPageHeader
        eyebrow={`Digital marketing course · ${ACADEMY.locationCity}`}
        title={`Learn AI digital marketing in ${ACADEMY.locationCity}.`}
        lead="An 8-week live practical program from DFX Academy — available in-person locally and online, built around real projects rather than theory."
      >
        <div className="flex flex-wrap gap-4">
          <AcademyButton
            href={ACADEMY_ROUTES.enquire}
            variant="primary"
            event="academy_enquire_click"
            eventParams={{ location: "ambur_header" }}
          >
            Enquire Now <Arrow />
          </AcademyButton>
          <AcademyButton href={ACADEMY_ROUTES.course} variant="onDark" event="academy_explore_program">
            Explore the Program <Arrow />
          </AcademyButton>
        </div>
      </AcademyPageHeader>

      <section className="academy-section container-px bg-white">
        <div className="max-w-container mx-auto">
          <SectionHead
            eyebrow="Locally, or from anywhere"
            title={`The same program, taught in ${ACADEMY.locationCity}.`}
            lead="Everything in the 8-week journey is delivered live. The only choice is whether you attend in the room or remotely."
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {LOCAL_POINTS.map((p, i) => (
              <Reveal key={p.t} delay={i * 0.08}>
                <article className="h-full rounded-2xl border border-academy-navy/10 bg-academy-tint p-8">
                  <h3 className="text-[1.1rem] font-semibold tracking-tight text-academy-navy">{p.t}</h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-academy-navy/60">{p.d}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <p className="mt-10 text-[13px] leading-relaxed text-academy-navy/45">
              Venue address for in-person sessions is confirmed on enquiry. {ACADEMY.attribution}
            </p>
          </Reveal>
        </div>
      </section>

      <AudiencePaths />
      <JourneyTimeline />
      <ProjectShowcase />
      <AcademyFAQ />
      <AcademyEnquiry />
      <AcademyCTA />
    </>
  );
}
