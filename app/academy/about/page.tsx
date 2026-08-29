import type { Metadata } from "next";
import { AcademyPageHeader } from "@/components/academy/PageHeader";
import { WhyDFX } from "@/components/academy/WhyDFX";
import { DFXCredibility } from "@/components/academy/DFXCredibility";
import { TrainerSection } from "@/components/academy/TrainerSection";
import { LearningExperience } from "@/components/academy/LearningExperience";
import { AcademyCTA } from "@/components/academy/AcademyCTA";
import { AcademyButton, Arrow } from "@/components/academy/primitives";
import { ACADEMY, ACADEMY_ROUTES } from "@/lib/academy/content";

export const metadata: Metadata = {
  title: "About DFX Academy — Trainers & Approach | DFX Solution",
  description:
    "DFX Academy is the education vertical of DFX Solution. Learn how the program is taught, who teaches it, and why the curriculum comes from live client practice.",
  alternates: { canonical: "/academy/about" },
};

export default function AcademyAboutPage() {
  return (
    <>
      <AcademyPageHeader
        eyebrow="About"
        title="A practical academy, run by an operating company."
        lead={`${ACADEMY.attribution} The systems taught here are the systems the company builds and runs for its clients.`}
      >
        <AcademyButton href={ACADEMY_ROUTES.course} variant="primary" event="academy_explore_program">
          Explore the Program <Arrow />
        </AcademyButton>
      </AcademyPageHeader>

      <WhyDFX />
      <LearningExperience />
      <TrainerSection />
      <DFXCredibility />
      <AcademyCTA />
    </>
  );
}
