import { LEAD_SCORE_WEIGHTS, LEAD_PRIORITY_THRESHOLDS } from "@/lib/config/leadScoring";
import { isBusinessEmail } from "@/utils/isBusinessEmail";
import { HIGH_BUDGET_VALUES, LARGE_COMPANY_SIZES } from "@/types/lead";
import type { CompanySize, MarketingBudget, ServiceInterested, Timeline, LeadPriority } from "@/types/lead";

/** Expected national-number digit count per supported dial code — used as a
 * lightweight "does this look like a real number for that country" check.
 * There's no OTP/SMS verification in this system, so this is a format-plausibility
 * signal, not proof the number is reachable. */
const EXPECTED_DIGITS_BY_COUNTRY_CODE: Record<string, number> = {
  "+91": 10,
  "+1": 10,
  "+44": 10,
  "+971": 9,
  "+65": 8,
  "+61": 9,
  "+966": 9,
  "+974": 8,
  "+968": 8,
  "+92": 10,
};

export interface LeadScoringInput {
  email: string;
  website?: string;
  company: string;
  phone: string;
  countryCode: string;
  companySize: CompanySize;
  marketingBudget: MarketingBudget;
  message?: string;
  timeline?: Timeline | "";
  services: ServiceInterested[];
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
  if (HIGH_BUDGET_VALUES.has(input.marketingBudget)) score += LEAD_SCORE_WEIGHTS.BUDGET_ABOVE_1L;
  if ((input.message?.length ?? 0) > 100) score += LEAD_SCORE_WEIGHTS.MESSAGE_OVER_100_CHARS;
  if (input.timeline) score += LEAD_SCORE_WEIGHTS.TIMELINE_SELECTED;
  if (isPlausiblePhoneForCountry(input.phone, input.countryCode)) score += LEAD_SCORE_WEIGHTS.PHONE_VALID;
  if (LARGE_COMPANY_SIZES.has(input.companySize)) score += LEAD_SCORE_WEIGHTS.LARGE_COMPANY;
  if (input.services.length > 1) score += LEAD_SCORE_WEIGHTS.MULTIPLE_SERVICES;

  const priority: LeadPriority =
    score >= LEAD_PRIORITY_THRESHOLDS.HOT ? "HOT" : score >= LEAD_PRIORITY_THRESHOLDS.WARM ? "WARM" : "COLD";

  return { leadScore: score, priority };
}
