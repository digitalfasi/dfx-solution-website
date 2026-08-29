import { DEFAULT_COUNTRY_CODE } from "@/types/lead";
import { captureAttribution } from "@/utils/utm";
import { captureDeviceContext } from "@/utils/deviceContext";

export interface AcademyLeadInput {
  source: string;
  name: string;
  phone: string;
  email?: string;
  status: string;
  mode: string;
}

/**
 * Maps simple DFX Academy enquiry form inputs into the full lead payload expected by /api/leads.
 */
export function buildAcademyLeadPayload(input: AcademyLeadInput) {
  const trimmedName = (input.name || "Learner").trim();
  const nameParts = trimmedName.split(/\s+/);
  const firstName = nameParts[0] && nameParts[0].length >= 2 ? nameParts[0] : trimmedName;
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : undefined;

  // Phone & Country Code Normalization
  let digits = (input.phone || "").replace(/\D/g, "");
  let countryCode = DEFAULT_COUNTRY_CODE;

  if (digits.startsWith("91") && digits.length === 12) {
    digits = digits.slice(2);
    countryCode = "+91";
  }

  // Email fallback if omitted
  const cleanEmail = (input.email || "").trim().toLowerCase();
  const validEmail = cleanEmail && /^.+@.+\..+$/.test(cleanEmail) ? cleanEmail : "learner@dfxacademy.in";

  // UUID generator fallback
  const clientRequestId = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `acad-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

  // Same attribution/device capture the main lead form uses, so Academy leads
  // carry landing page, referrer, campaign and client/session ids too. Spread
  // first: `source` below must win over any utm_source so the Academy CTA
  // (academy_hub_cta / academy_popup_5s / academy_audience_modal) is preserved.
  const attribution = captureAttribution();
  const deviceContext = captureDeviceContext();

  return {
    ...attribution,
    ...deviceContext,

    firstName: firstName.slice(0, 50),
    lastName: lastName ? lastName.slice(0, 50) : undefined,
    email: validEmail,
    phone: digits,
    countryCode,
    company: `DFX Academy - ${input.status || "Learner"}`,
    website: "",

    // Default required business & project enums for Academy lead scoring
    industry: "EDUCATION",
    primaryService: "AI_AUTOMATION",
    companySize: "JUST_STARTED",
    marketingBudget: "NOT_DECIDED",

    primaryGoal: "BRAND_AWARENESS",
    timeline: "JUST_EXPLORING",
    hearAboutUs: "OTHER",
    projectBudget: "NEED_RECOMMENDATION",

    message: `DFX Academy Enquiry | Status: ${input.status || "General"} | Preferred Mode: ${input.mode || "Online"}`,

    // Anti-spam & metadata
    companyWebsiteHp: "",
    formRenderedAt: Date.now() - 3000,
    clientRequestId,
    source: input.source || "academy_hub",
  };
}
