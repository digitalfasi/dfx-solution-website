import type { Metadata } from "next";
import { AcademyHeroPremium } from "@/components/academy/AcademyHeroPremium";
import { WhyDFX } from "@/components/academy/WhyDFX";
import { AcademyAudience } from "@/components/academy/AcademyAudience";
import { AcademyPrograms } from "@/components/academy/AcademyPrograms";
import { JourneyTimeline } from "@/components/academy/JourneyTimeline";
import { AcademyCTA } from "@/components/academy/AcademyCTA";
import { AcademyPopup } from "@/components/academy/AcademyPopup";
import { academyCourseSchema, academyBreadcrumbSchema } from "@/lib/academy/schema";

export const metadata: Metadata = {
  title: "DFX Academy — AI-Integrated Digital Marketing | DFX Solution",
  description:
    "DFX Academy is an upcoming practical learning initiative from DFX Solution: an 8-week AI-integrated digital marketing program covering AI workflows, SEO, GEO, paid performance, CRM and analytics.",
  alternates: { canonical: "/academy" },
  openGraph: {
    type: "website",
    url: "https://dfxsolution.com/academy",
    title: "DFX Academy — AI-Integrated Digital Marketing",
    description:
      "An 8-week practical program to master modern digital marketing, AI search (GEO), performance campaigns, CRM automation and real project portfolios.",
    siteName: "DFX Solution",
    locale: "en_IN",
  },
};

export default function AcademyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(academyCourseSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(academyBreadcrumbSchema) }}
      />
      
      {/* ── ACADEMY LEAD POPUP (5-second delay, session-deduped) ── */}
      <AcademyPopup />

      {/* ── 6 MAJOR CONTENT SECTIONS ── */}
      {/* SECTION 01 — PREMIUM HERO */}
      <AcademyHeroPremium />

      {/* SECTION 02 — WHY DFX ACADEMY */}
      <WhyDFX />

      {/* SECTION 03 — WHO IT'S FOR & CAPABILITIES */}
      <AcademyAudience />

      {/* SECTION 04 — WHAT YOU WILL LEARN & WHAT YOU WILL BUILD */}
      <AcademyPrograms />

      {/* SECTION 05 — THE 8-WEEK LEARNING JOURNEY */}
      <JourneyTimeline />

      {/* SECTION 06 — FINAL MOTIVATIONAL CTA & ENQUIRY */}
      <AcademyCTA />
    </>
  );
}
