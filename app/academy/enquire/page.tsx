import type { Metadata } from "next";
import { AcademyPageHeader } from "@/components/academy/PageHeader";
import { AcademyEnquiry } from "@/components/academy/AcademyEnquiry";
import { AcademyFAQ } from "@/components/academy/AcademyFAQ";
import { AcademyCTA } from "@/components/academy/AcademyCTA";

export const metadata: Metadata = {
  title: "Enquire — DFX Academy",
  description:
    "Enquire about the DFX Academy 8-week AI Digital Marketing program — batch dates, online or in-person mode, and what the program covers.",
  alternates: { canonical: "/academy/enquire" },
  robots: { index: true, follow: true },
};

export default function AcademyEnquirePage() {
  return (
    <>
      <AcademyPageHeader
        eyebrow="Enquire"
        title="Start the conversation."
        lead="Send your details and the DFX Academy team will come back with program details and the next batch schedule."
      />
      <AcademyEnquiry />
      <AcademyFAQ />
      <AcademyCTA />
    </>
  );
}
