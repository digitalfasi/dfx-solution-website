/**
 * Client-safe lead types. Kept independent from `@prisma/client` so this file
 * can be imported from client components without pulling server-only code
 * into the browser bundle. Values line up 1:1 with the Prisma enums in
 * prisma/schema.prisma.
 */

function options<const T extends readonly { value: string; label: string }[]>(opts: T) {
  return opts;
}

export const DEFAULT_COUNTRY_CODE = "+91";

export const INDUSTRY_OPTIONS = options([
  { value: "HEALTHCARE_HOSPITAL", label: "Healthcare / Hospital" },
  { value: "DENTAL_CLINIC", label: "Dental Clinic" },
  { value: "EDUCATION", label: "Education" },
  { value: "REAL_ESTATE", label: "Real Estate" },
  { value: "ECOMMERCE", label: "E-commerce" },
  { value: "RETAIL", label: "Retail" },
  { value: "RESTAURANT_CAFE", label: "Restaurant / Cafe" },
  { value: "MANUFACTURING", label: "Manufacturing" },
  { value: "LEATHER_INDUSTRY", label: "Leather Industry" },
  { value: "JEWELLERY", label: "Jewellery" },
  { value: "FINANCE", label: "Finance" },
  { value: "TRAVEL_TOURISM", label: "Travel & Tourism" },
  { value: "CONSTRUCTION", label: "Construction" },
  { value: "AUTOMOBILE", label: "Automobile" },
  { value: "TECHNOLOGY", label: "Technology" },
  { value: "OTHER", label: "Other" },
]);

export const PRIMARY_SERVICE_OPTIONS = options([
  { value: "WEBSITE_DEVELOPMENT", label: "Website Development" },
  { value: "META_ADS", label: "Meta Ads" },
  { value: "GOOGLE_ADS", label: "Google Ads" },
  { value: "SEO", label: "SEO" },
  { value: "SOCIAL_MEDIA_MARKETING", label: "Social Media Marketing" },
  { value: "AI_AUTOMATION", label: "AI Automation" },
  { value: "CRM_DEVELOPMENT", label: "CRM Development" },
  { value: "CUSTOM_SOFTWARE_DEVELOPMENT", label: "Custom Software Development" },
  { value: "SAAS_DEVELOPMENT", label: "SaaS Development" },
  { value: "BRANDING", label: "Branding" },
  { value: "MULTIPLE_SERVICES", label: "Multiple Services" },
  { value: "NOT_SURE", label: "Not Sure (Need Consultation)" },
]);

export const COMPANY_SIZE_OPTIONS = options([
  { value: "JUST_STARTED", label: "Just Started" },
  { value: "SIZE_1_10", label: "1–10 Employees" },
  { value: "SIZE_11_50", label: "11–50 Employees" },
  { value: "SIZE_51_200", label: "51–200 Employees" },
  { value: "SIZE_200_PLUS", label: "200+ Employees" },
]);

/** Company sizes at or above this bracket score the "large company" lead-scoring bonus. */
export const LARGE_COMPANY_SIZES = new Set(["SIZE_51_200", "SIZE_200_PLUS"]);

export const MARKETING_BUDGET_OPTIONS = options([
  { value: "UNDER_25K", label: "Under ₹25,000" },
  { value: "RANGE_25K_50K", label: "₹25K – ₹50K" },
  { value: "RANGE_50K_1L", label: "₹50K – ₹1 Lakh" },
  { value: "RANGE_1L_3L", label: "₹1L – ₹3 Lakhs" },
  { value: "ABOVE_3L", label: "₹3 Lakhs+" },
  { value: "NOT_DECIDED", label: "Not Decided" },
]);

/** Marketing budgets at or above this bracket score the "high budget" lead-scoring bonus. */
export const HIGH_MARKETING_BUDGET_VALUES = new Set(["RANGE_1L_3L", "ABOVE_3L"]);

export const PRIMARY_GOAL_OPTIONS = options([
  { value: "GENERATE_MORE_LEADS", label: "Generate More Leads" },
  { value: "INCREASE_SALES", label: "Increase Sales" },
  { value: "BUILD_PREMIUM_WEBSITE", label: "Build Premium Website" },
  { value: "IMPROVE_SEO", label: "Improve SEO" },
  { value: "RUN_META_ADS", label: "Run Meta Ads" },
  { value: "RUN_GOOGLE_ADS", label: "Run Google Ads" },
  { value: "AI_AUTOMATION", label: "AI Automation" },
  { value: "CRM_DEVELOPMENT", label: "CRM Development" },
  { value: "SAAS_DEVELOPMENT", label: "SaaS Development" },
  { value: "BRAND_AWARENESS", label: "Brand Awareness" },
  { value: "NEED_COMPLETE_GROWTH_STRATEGY", label: "Need Complete Growth Strategy" },
]);

export const TIMELINE_OPTIONS = options([
  { value: "IMMEDIATELY", label: "Immediately" },
  { value: "WITHIN_1_MONTH", label: "Within 1 Month" },
  { value: "WITHIN_3_MONTHS", label: "Within 3 Months" },
  { value: "JUST_EXPLORING", label: "Just Exploring" },
]);

/** Timelines this urgent score the "urgent timeline" lead-scoring bonus. */
export const URGENT_TIMELINE_VALUES = new Set(["IMMEDIATELY", "WITHIN_1_MONTH"]);

export const HEAR_ABOUT_US_OPTIONS = options([
  { value: "GOOGLE_SEARCH", label: "Google Search" },
  { value: "INSTAGRAM", label: "Instagram" },
  { value: "FACEBOOK", label: "Facebook" },
  { value: "LINKEDIN", label: "LinkedIn" },
  { value: "REFERRAL", label: "Referral" },
  { value: "YOUTUBE", label: "YouTube" },
  { value: "WHATSAPP", label: "WhatsApp" },
  { value: "EXISTING_CLIENT", label: "Existing Client" },
  { value: "OTHER", label: "Other" },
]);

export const PROJECT_BUDGET_OPTIONS = options([
  { value: "UNDER_50K", label: "Under ₹50K" },
  { value: "RANGE_50K_1L", label: "₹50K – ₹1 Lakh" },
  { value: "RANGE_1L_3L", label: "₹1L – ₹3 Lakhs" },
  { value: "RANGE_3L_5L", label: "₹3L – ₹5 Lakhs" },
  { value: "ABOVE_5L", label: "₹5 Lakhs+" },
  { value: "NEED_RECOMMENDATION", label: "Need Recommendation" },
]);

/** Project budgets at or above this bracket also score the "high budget" lead-scoring bonus. */
export const HIGH_PROJECT_BUDGET_VALUES = new Set(["RANGE_3L_5L", "ABOVE_5L"]);

function values<T extends { value: string }>(opts: readonly T[]) {
  return opts.map((o) => o.value) as [T["value"], ...T["value"][]];
}

export const INDUSTRY_VALUES = values(INDUSTRY_OPTIONS);
export const PRIMARY_SERVICE_VALUES = values(PRIMARY_SERVICE_OPTIONS);
export const COMPANY_SIZE_VALUES = values(COMPANY_SIZE_OPTIONS);
export const MARKETING_BUDGET_VALUES = values(MARKETING_BUDGET_OPTIONS);
export const PRIMARY_GOAL_VALUES = values(PRIMARY_GOAL_OPTIONS);
export const TIMELINE_VALUES = values(TIMELINE_OPTIONS);
export const HEAR_ABOUT_US_VALUES = values(HEAR_ABOUT_US_OPTIONS);
export const PROJECT_BUDGET_VALUES = values(PROJECT_BUDGET_OPTIONS);

export type Industry = (typeof INDUSTRY_OPTIONS)[number]["value"];
export type PrimaryService = (typeof PRIMARY_SERVICE_OPTIONS)[number]["value"];
export type CompanySize = (typeof COMPANY_SIZE_OPTIONS)[number]["value"];
export type MarketingBudget = (typeof MARKETING_BUDGET_OPTIONS)[number]["value"];
export type PrimaryGoal = (typeof PRIMARY_GOAL_OPTIONS)[number]["value"];
export type Timeline = (typeof TIMELINE_OPTIONS)[number]["value"];
export type HearAboutUs = (typeof HEAR_ABOUT_US_OPTIONS)[number]["value"];
export type ProjectBudget = (typeof PROJECT_BUDGET_OPTIONS)[number]["value"];

export type LeadStatus =
  | "NEW"
  | "CONTACTED"
  | "QUALIFIED"
  | "MEETING_BOOKED"
  | "PROPOSAL_SENT"
  | "NEGOTIATION"
  | "WON"
  | "LOST"
  | "SPAM";

export type LeadPriority = "HOT" | "WARM" | "COLD";

/** Step 1 — Contact details. */
export interface LeadStepPersonal {
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
  countryCode: string;
  company: string;
  website?: string;
}

/** Step 2 — Business information. */
export interface LeadStepBusiness {
  industry: Industry | "";
  primaryService: PrimaryService | "";
  companySize: CompanySize | "";
  marketingBudget: MarketingBudget | "";
}

/** Step 3 — Project information. */
export interface LeadStepProject {
  primaryGoal: PrimaryGoal | "";
  timeline: Timeline | "";
  hearAboutUs: HearAboutUs | "";
  projectBudget: ProjectBudget | "";
  message?: string;
}

export interface LeadFormMeta {
  /** Honeypot field — must stay empty. Hidden from real users via CSS. */
  companyWebsiteHp?: string;
  /** Client-render timestamp (ms epoch), used as a bot-timing trap. */
  formRenderedAt: number;
  /** Per-mount UUID so retried/duplicate submits are idempotent server-side. */
  clientRequestId: string;
}

export type LeadFormValues = LeadStepPersonal & LeadStepBusiness & LeadStepProject & LeadFormMeta;

export interface AttributionData {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
  gclid?: string;
  fbclid?: string;
  landingPage?: string;
  referrer?: string;
  clientId?: string;
  sessionId?: string;
}

export interface ClientDeviceContext {
  screenResolution?: string;
  timezone?: string;
  language?: string;
}

export type CreateLeadRequest = LeadFormValues & AttributionData & ClientDeviceContext;

export interface CreateLeadResponse {
  success: boolean;
  leadId?: string;
  error?: string;
  /** Field-level validation errors, keyed by field name. */
  fieldErrors?: Partial<Record<keyof LeadFormValues, string>>;
}

/** Public-safe summary returned to the thank-you page — no internal ids, IP, notes, etc. */
export interface LeadSummary {
  leadId: string;
  fullName: string;
  firstName: string;
  company: string;
  email: string;
  phone: string;
  primaryService: PrimaryService;
  marketingBudget: MarketingBudget;
  timeline: Timeline;
  submittedAt: string;
  status: LeadStatus;
  leadScore: number;
  priority: LeadPriority;
}
