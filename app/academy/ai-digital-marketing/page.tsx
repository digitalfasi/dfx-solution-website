import type { Metadata } from "next";
import { AcademyPageHeader } from "@/components/academy/PageHeader";
import { JourneyTimeline } from "@/components/academy/JourneyTimeline";
import { ProjectShowcase } from "@/components/academy/ProjectShowcase";
import { LearningExperience } from "@/components/academy/LearningExperience";
import { AIIntegration } from "@/components/academy/AIIntegration";
import { MonetizationPaths } from "@/components/academy/MonetizationPaths";
import { PromptLibrary } from "@/components/academy/PromptLibrary";
import { AcademyFAQ } from "@/components/academy/AcademyFAQ";
import { AcademyEnquiry } from "@/components/academy/AcademyEnquiry";
import { AcademyCTA } from "@/components/academy/AcademyCTA";
import { AcademyButton, Arrow } from "@/components/academy/primitives";
import { academyCourseSchema } from "@/lib/academy/schema";
import { ACADEMY_ROUTES } from "@/lib/academy/content";

export const metadata: Metadata = {
  title: "AI Digital Marketing Course — 8 Weeks, Practical | DFX Academy",
  description:
    "The DFX Academy AI Digital Marketing program: 8 weeks, 8 deliverables — website, SEO, content, paid ads, CRM and automation, analytics, CRO and client acquisition, with AI integrated throughout.",
  alternates: { canonical: "/academy/ai-digital-marketing" },
};

export default function AIDigitalMarketingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(academyCourseSchema) }} />
      <AcademyPageHeader
        eyebrow="Program"
        title="AI Digital Marketing."
        lead="Eight weeks, live and practical. Each module answers one business question, ends in a deliverable you keep, and opens a way to earn from the skill."
      >
        <div className="flex flex-wrap gap-4">
          <AcademyButton href={ACADEMY_ROUTES.enquire} variant="primary" event="academy_enquire_click" eventParams={{ location: "course_header" }}>
            Enquire Now <Arrow />
          </AcademyButton>
          <AcademyButton href="#journey" variant="onDark" event="academy_explore_program">
            See the 8-week journey <Arrow />
          </AcademyButton>
        </div>
      </AcademyPageHeader>

      <JourneyTimeline />
      <ProjectShowcase />
      <LearningExperience />
      <AIIntegration />
      <MonetizationPaths />
      <PromptLibrary />
      <AcademyFAQ />
      <AcademyEnquiry />
      <AcademyCTA />
    </>
  );
}
