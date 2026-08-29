/**
 * Tunable lead-scoring rules. Kept as plain data (not scattered through the
 * service) so sales/marketing can adjust weights without touching logic —
 * see services/leadScoring.ts for how these are applied.
 */
export const LEAD_SCORE_WEIGHTS = {
  BUSINESS_EMAIL: 20,
  WEBSITE_PROVIDED: 20,
  COMPANY_NAME_PROVIDED: 10,
  HIGH_BUDGET: 40,
  MESSAGE_OVER_100_CHARS: 10,
  URGENT_TIMELINE: 10,
  PHONE_VALID: 20,
  LARGE_COMPANY: 20,
  MULTIPLE_SERVICES: 15,
} as const;

export const LEAD_SCORE_MAX = Object.values(LEAD_SCORE_WEIGHTS).reduce((sum, w) => sum + w, 0);

/** Score >= HOT threshold is HOT, >= WARM threshold is WARM, else COLD. */
export const LEAD_PRIORITY_THRESHOLDS = {
  HOT: 70,
  WARM: 40,
} as const;
