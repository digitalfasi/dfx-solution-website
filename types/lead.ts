/**
 * Client-safe lead types. Kept independent from `@prisma/client` so this file
 * can be imported from client components without pulling server-only code
 * into the browser bundle. Values line up 1:1 with the Prisma enums in
 * prisma/schema.prisma.
 */

function options<const T extends readonly { value: string; label: string }[]>(opts: T) {
  return opts;
}

export const SERVICE_OPTIONS = options([
  { value: "META_ADS", label: "Meta Ads" },
  { value: "GOOGLE_ADS", label: "Google Ads" },
  { value: "SEO", label: "SEO" },
  { value: "WEBSITE", label: "Website" },
  { value: "AI_AUTOMATION", label: "AI Automation" },
  { value: "CRM", label: "CRM" },
  { value: "ERP", label: "ERP" },
  { value: "CUSTOM_SOFTWARE", label: "Custom Software" },
  { value: "SAAS", label: "SaaS" },
  { value: "BRANDING", label: "Branding" },
  { value: "OTHER", label: "Other" },
]);

export const INDUSTRY_OPTIONS = options([
  { value: "HEALTHCARE", label: "Healthcare" },
  { value: "HOSPITALITY", label: "Hospitality" },
  { value: "JEWELLERY", label: "Jewellery" },
  { value: "MANUFACTURING", label: "Manufacturing" },
  { value: "EDUCATION", label: "Education" },
  { value: "REAL_ESTATE", label: "Real Estate" },
  { value: "RESTAURANTS", label: "Restaurants" },
  { value: "SMES_RETAIL", label: "SMEs & Retail" },
  { value: "ECOMMERCE", label: "E-commerce" },
  { value: "TECHNOLOGY_SAAS", label: "Technology / SaaS" },
  { value: "FINANCE", label: "Finance" },
  { value: "OTHER", label: "Other" },
]);

export const COMPANY_SIZE_OPTIONS = options([
  { value: "SIZE_1_10", label: "1 – 10 employees" },
  { value: "SIZE_11_50", label: "11 – 50 employees" },
  { value: "SIZE_51_200", label: "51 – 200 employees" },
  { value: "SIZE_201_500", label: "201 – 500 employees" },
  { value: "SIZE_500_PLUS", label: "500+ employees" },
]);

/** Company sizes at or above this bracket score the "large company" lead-scoring bonus. */
export const LARGE_COMPANY_SIZES = new Set(["SIZE_201_500", "SIZE_500_PLUS"]);

export const MONTHLY_REVENUE_OPTIONS = options([
  { value: "UNDER_5L", label: "Under ₹5L / month" },
  { value: "RANGE_5L_25L", label: "₹5L – ₹25L / month" },
  { value: "RANGE_25L_1CR", label: "₹25L – ₹1Cr / month" },
  { value: "RANGE_1CR_5CR", label: "₹1Cr – ₹5Cr / month" },
  { value: "ABOVE_5CR", label: "Above ₹5Cr / month" },
  { value: "PREFER_NOT_TO_SAY", label: "Prefer not to say" },
]);

export const MARKETING_BUDGET_OPTIONS = options([
  { value: "UNDER_25K", label: "Less than ₹25,000" },
  { value: "RANGE_25K_50K", label: "₹25,000 – ₹50,000" },
  { value: "RANGE_50K_1L", label: "₹50,000 – ₹1,00,000" },
  { value: "RANGE_1L_5L", label: "₹1L – ₹5L" },
  { value: "ABOVE_5L", label: "More than ₹5L" },
]);

/** Budgets at or above this bracket score the "budget > ₹1L" lead-scoring bonus. */
export const HIGH_BUDGET_VALUES = new Set(["RANGE_1L_5L", "ABOVE_5L"]);

export const MARKETING_CHANNEL_OPTIONS = options([
  { value: "SOCIAL_MEDIA", label: "Social Media" },
  { value: "GOOGLE_ADS", label: "Google Ads" },
  { value: "META_ADS", label: "Meta Ads" },
  { value: "SEO", label: "SEO" },
  { value: "EMAIL_MARKETING", label: "Email Marketing" },
  { value: "REFERRALS", label: "Referrals" },
  { value: "OFFLINE_PRINT", label: "Offline / Print" },
  { value: "NONE_CURRENTLY", label: "None Currently" },
  { value: "OTHER", label: "Other" },
]);

export const TARGET_MARKET_OPTIONS = options([
  { value: "LOCAL", label: "Local" },
  { value: "REGIONAL", label: "Regional (State-wide)" },
  { value: "NATIONAL", label: "National" },
  { value: "INTERNATIONAL", label: "International" },
]);

export const TIMELINE_OPTIONS = options([
  { value: "IMMEDIATELY", label: "Immediately" },
  { value: "WITHIN_1_MONTH", label: "Within 1 month" },
  { value: "ONE_TO_THREE_MONTHS", label: "1 – 3 months" },
  { value: "THREE_TO_SIX_MONTHS", label: "3 – 6 months" },
  { value: "NOT_SURE", label: "Not sure yet" },
]);

export const COUNTRY_CODE_OPTIONS = options([
  { value: "+91", label: "🇮🇳 +91 (India)" },
  { value: "+1", label: "🇺🇸 +1 (US/Canada)" },
  { value: "+44", label: "🇬🇧 +44 (UK)" },
  { value: "+971", label: "🇦🇪 +971 (UAE)" },
  { value: "+65", label: "🇸🇬 +65 (Singapore)" },
  { value: "+61", label: "🇦🇺 +61 (Australia)" },
  { value: "+966", label: "🇸🇦 +966 (Saudi Arabia)" },
  { value: "+974", label: "🇶🇦 +974 (Qatar)" },
  { value: "+968", label: "🇴🇲 +968 (Oman)" },
  { value: "+92", label: "🇵🇰 +92 (Pakistan)" },
]);

function values<T extends { value: string }>(opts: readonly T[]) {
  return opts.map((o) => o.value) as [T["value"], ...T["value"][]];
}

export const SERVICE_VALUES = values(SERVICE_OPTIONS);
export const INDUSTRY_VALUES = values(INDUSTRY_OPTIONS);
export const COMPANY_SIZE_VALUES = values(COMPANY_SIZE_OPTIONS);
export const MONTHLY_REVENUE_VALUES = values(MONTHLY_REVENUE_OPTIONS);
export const MARKETING_BUDGET_VALUES = values(MARKETING_BUDGET_OPTIONS);
export const MARKETING_CHANNEL_VALUES = values(MARKETING_CHANNEL_OPTIONS);
export const TARGET_MARKET_VALUES = values(TARGET_MARKET_OPTIONS);
export const TIMELINE_VALUES = values(TIMELINE_OPTIONS);

export type ServiceInterested = (typeof SERVICE_OPTIONS)[number]["value"];
export type Industry = (typeof INDUSTRY_OPTIONS)[number]["value"];
export type CompanySize = (typeof COMPANY_SIZE_OPTIONS)[number]["value"];
export type MonthlyRevenue = (typeof MONTHLY_REVENUE_OPTIONS)[number]["value"];
export type MarketingBudget = (typeof MARKETING_BUDGET_OPTIONS)[number]["value"];
export type MarketingChannel = (typeof MARKETING_CHANNEL_OPTIONS)[number]["value"];
export type TargetMarket = (typeof TARGET_MARKET_OPTIONS)[number]["value"];
export type Timeline = (typeof TIMELINE_OPTIONS)[number]["value"];

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

/** Step 1 — Personal information. */
export interface LeadStepPersonal {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
  company: string;
  designation: string;
  website?: string;
  linkedin?: string;
}

/** Step 2 — Business information. */
export interface LeadStepBusiness {
  industry: Industry | "";
  companySize: CompanySize | "";
  monthlyRevenue?: MonthlyRevenue | "";
  currentChannels: MarketingChannel[];
  businessLocation?: string;
  targetMarket?: TargetMarket | "";
  marketingBudget: MarketingBudget | "";
  services: ServiceInterested[];
}

/** Step 3 — Project details. */
export interface LeadStepProject {
  timeline: Timeline | "";
  businessChallenge?: string;
  goal?: string;
  message?: string;
  attachmentUrl?: string;
  attachmentName?: string;
  attachmentSize?: number;
  attachmentType?: string;
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
  services: ServiceInterested[];
  marketingBudget: MarketingBudget;
  timeline: Timeline;
  submittedAt: string;
  status: LeadStatus;
  leadScore: number;
  priority: LeadPriority;
}
