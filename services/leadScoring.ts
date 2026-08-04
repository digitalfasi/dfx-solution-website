import { LEAD_SCORE_WEIGHTS, LEAD_PRIORITY_THRESHOLDS } from "@/lib/config/leadScoring";
import { isBusinessEmail } from "@/utils/isBusinessEmail";
import { HIGH_MARKETING_BUDGET_VALUES, HIGH_PROJECT_BUDGET_VALUES, LARGE_COMPANY_SIZES, URGENT_TIMELINE_VALUES } from "@/types/lead";
import type { CompanySize, MarketingBudget, ProjectBudget, PrimaryService, Timeline, LeadPriority } from "@/types/lead";

/** Expected national-number digit count for the default dial code — used as a
 * lightweight "does this look like a real number" check. There's no OTP/SMS
 * verification in this system, so this is a format-plausibility signal, not
 * proof the number is reachable. */
const EXPECTED_DIGITS_BY_COUNTRY_CODE: Record<string, number> = {
  "+91": 10,
};

export interface LeadScoringInput {
  email: string;
  website?: string;
  company: string;
  phone: string;
  countryCode: string;
  companySize: CompanySize;
  marketingBudget: MarketingBudget;
  projectBudget: ProjectBudget;
  message?: string;
  timeline: Timeline;
  primaryService: PrimaryService;
}

export interface LeadScoringResult {
  leadScore: number;
  priority: LeadPriority;
}

function isPlausiblePhoneForCountry(phone: string, countryCode: string): boolean {
  const expected = EXPECTED_DIGITS_BY_COUNTRY_CODE[countryCode];
  if (!expected) return true; // unknown dial code — don't penalize, just skip the check
  const digits = phone.replace(/\D/g, "");
  return digits.length === expected;
}

export function calculateLeadScore(input: LeadScoringInput): LeadScoringResult {
  let score = 0;

  if (isBusinessEmail(input.email)) score += LEAD_SCORE_WEIGHTS.BUSINESS_EMAIL;
  if (input.website) score += LEAD_SCORE_WEIGHTS.WEBSITE_PROVIDED;
  if (input.company) score += LEAD_SCORE_WEIGHTS.COMPANY_NAME_PROVIDED;
  if (HIGH_MARKETING_BUDGET_VALUES.has(input.marketingBudget) || HIGH_PROJECT_BUDGET_VALUES.has(input.projectBudget)) {
    score += LEAD_SCORE_WEIGHTS.HIGH_BUDGET;
  }
  if ((input.message?.length ?? 0) > 100) score += LEAD_SCORE_WEIGHTS.MESSAGE_OVER_100_CHARS;
  if (URGENT_TIMELINE_VALUES.has(input.timeline)) score += LEAD_SCORE_WEIGHTS.URGENT_TIMELINE;
  if (isPlausiblePhoneForCountry(input.phone, input.countryCode)) score += LEAD_SCORE_WEIGHTS.PHONE_VALID;
  if (LARGE_COMPANY_SIZES.has(input.companySize)) score += LEAD_SCORE_WEIGHTS.LARGE_COMPANY;
  if (input.primaryService === "MULTIPLE_SERVICES") score += LEAD_SCORE_WEIGHTS.MULTIPLE_SERVICES;

  const priority: LeadPriority =
    score >= LEAD_PRIORITY_THRESHOLDS.HOT ? "HOT" : score >= LEAD_PRIORITY_THRESHOLDS.WARM ? "WARM" : "COLD";

  return { leadScore: score, priority };
}
