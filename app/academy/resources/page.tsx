import type { Metadata } from "next";
import { AcademyPageHeader } from "@/components/academy/PageHeader";
import { PromptLibrary } from "@/components/academy/PromptLibrary";
import { AcademyCTA } from "@/components/academy/AcademyCTA";
import { AcademyButton, Arrow, Reveal, SectionHead } from "@/components/academy/primitives";
import { ACADEMY_ROUTES, DEFAULT_ENQUIRY_MESSAGE, whatsappHref } from "@/lib/academy/content";

export const metadata: Metadata = {
  title: "Resources — DFX Academy",
  description:
    "DFX Academy resources: the Master Prompt Library, the 8-week syllabus, and the deliverables you build during the program.",
  alternates: { canonical: "/academy/resources" },
};

/**
 * Resource shelf. Items without a real file link through to the team rather
 * than to a fabricated download — add the asset and swap `href` when ready.
 */
const RESOURCES = [
  {
    t: "8-week syllabus",
    d: "The full module-by-module breakdown, deliverables and monetization paths.",
    action: "Request the syllabus",
    href: whatsappHref("Hi DFX Academy, please send me the full 8-week syllabus."),
    external: true,
    event: "academy_syllabus_download" as const,
  },
  {
    t: "Master Prompt Library",
    d: "Lifetime access for program participants — the working prompts behind each stage.",
    action: "About the library",
    href: "#prompt-library",
    external: false,
  },
  {
    t: "Program overview",
    d: "What the program covers, who it is for, and how the weeks fit together.",
    action: "Explore the program",
    href: ACADEMY_ROUTES.course,
    external: false,
  },
  {
    t: "Talk to the team",
    d: "Batch dates, mode of learning and anything the FAQ does not cover.",
    action: "Message on WhatsApp",
    href: whatsappHref(DEFAULT_ENQUIRY_MESSAGE),
    external: true,
    event: "academy_whatsapp_click" as const,
  },
];

export default function AcademyResourcesPage() {
  return (
    <>
      <AcademyPageHeader
        eyebrow="Resources"
        title="Everything that supports the program."
        lead="The syllabus, the prompt library and the material you keep after the eight weeks are done."
      />

      <section className="academy-section container-px bg-white">
        <div className="max-w-container mx-auto">
          <SectionHead eyebrow="Resource shelf" title="Start here." />
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-academy-navy/10 bg-academy-navy/10 sm:grid-cols-2">
            {RESOURCES.map((r, i) => (
              <Reveal key={r.t} delay={i * 0.06} className="flex flex-col bg-white p-9">
                <h3 className="text-[1.15rem] font-semibold tracking-tight text-academy-navy">{r.t}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-academy-navy/60">{r.d}</p>
                <div className="mt-7">
                  <AcademyButton href={r.href} variant="ghost" external={r.external} event={r.event}>
                    {r.action} <Arrow />
                  </AcademyButton>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <PromptLibrary />
      <AcademyCTA />
    </>
  );
}
