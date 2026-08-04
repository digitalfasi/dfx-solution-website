import { z } from "zod";
import {
  INDUSTRY_VALUES,
  PRIMARY_SERVICE_VALUES,
  COMPANY_SIZE_VALUES,
  MARKETING_BUDGET_VALUES,
  PRIMARY_GOAL_VALUES,
  TIMELINE_VALUES,
  HEAR_ABOUT_US_VALUES,
  PROJECT_BUDGET_VALUES,
} from "@/types/lead";

const NAME_REGEX = /^[a-zA-ZÀ-ſ][a-zA-ZÀ-ſ' -]{0,49}$/;
const PHONE_CHARS_REGEX = /^[0-9\s\-().]{4,17}$/;
const COUNTRY_CODE_REGEX = /^\+[1-9]\d{0,3}$/;

const nameField = (label: string) =>
  z
    .string()
    .trim()
    .min(2, `${label} must be at least 2 characters`)
    .max(50, `${label} must be under 50 characters`)
    .regex(NAME_REGEX, `${label} contains invalid characters`);

const optionalNameField = (label: string) =>
  z
    .string()
    .trim()
    .max(50, `${label} must be under 50 characters`)
    .regex(NAME_REGEX, `${label} contains invalid characters`)
    .optional()
    .or(z.literal(""));

const optionalUrl = (label: string) =>
  z
    .string()
    .trim()
    .max(300)
    .optional()
    .or(z.literal(""))
    .refine((v) => !v || /^https?:\/\/.+\..+/i.test(v), `Enter a valid ${label} URL (include https://)`);

/** Step 1 — Contact details. */
export const personalInfoSchema = z.object({
  firstName: nameField("First name"),
  lastName: optionalNameField("Last name"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Business email is required")
    .max(254)
    .email("Enter a valid business email address"),
  phone: z
    .string()
    .trim()
    .min(4, "Enter a valid mobile number")
    .max(17, "Enter a valid mobile number")
    .regex(PHONE_CHARS_REGEX, "Enter a valid mobile number")
    .refine((v) => {
      const digits = v.replace(/\D/g, "");
      return digits.length >= 6 && digits.length <= 14;
    }, "Enter a valid mobile number"),
  countryCode: z.string().trim().regex(COUNTRY_CODE_REGEX, "Invalid country code"),
  company: z
    .string()
    .trim()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must be under 100 characters"),
  website: optionalUrl("website"),
});

/** Step 2 — Business information. */
export const businessInfoSchema = z.object({
  industry: z.enum(INDUSTRY_VALUES, { message: "Select an industry" }),
  primaryService: z.enum(PRIMARY_SERVICE_VALUES, { message: "Select the primary service needed" }),
  companySize: z.enum(COMPANY_SIZE_VALUES, { message: "Select your company size" }),
  marketingBudget: z.enum(MARKETING_BUDGET_VALUES, { message: "Select a monthly marketing budget" }),
});

/** Step 3 — Project information. */
export const projectDetailsSchema = z.object({
  primaryGoal: z.enum(PRIMARY_GOAL_VALUES, { message: "Select your primary goal" }),
  timeline: z.enum(TIMELINE_VALUES, { message: "Select a project timeline" }),
  hearAboutUs: z.enum(HEAR_ABOUT_US_VALUES, { message: "Let us know how you heard about us" }),
  projectBudget: z.enum(PROJECT_BUDGET_VALUES, { message: "Select an estimated project budget" }),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

const antiSpamSchema = z.object({
  // Honeypot: real users never see or fill this. Any value here means bot.
  companyWebsiteHp: z.string().max(0, "Spam detected").optional().or(z.literal("")),
  formRenderedAt: z.number(),
  clientRequestId: z.string().uuid(),
});

export const leadFormSchema = personalInfoSchema
  .merge(businessInfoSchema)
  .merge(projectDetailsSchema)
  .merge(antiSpamSchema);

export type LeadFormSchema = z.infer<typeof leadFormSchema>;
export type PersonalInfoSchema = z.infer<typeof personalInfoSchema>;
export type BusinessInfoSchema = z.infer<typeof businessInfoSchema>;
export type ProjectDetailsSchema = z.infer<typeof projectDetailsSchema>;

/** Field names validated per step, used to drive react-hook-form's per-step `trigger()`. */
export const STEP_FIELDS = [
  Object.keys(personalInfoSchema.shape) as (keyof LeadFormSchema)[],
  Object.keys(businessInfoSchema.shape) as (keyof LeadFormSchema)[],
  Object.keys(projectDetailsSchema.shape) as (keyof LeadFormSchema)[],
] as const;

/** Server accepts everything the client sends, plus attribution + device context captured client-side. */
export const createLeadRequestSchema = leadFormSchema.extend({
  source: z.string().trim().max(150).optional().or(z.literal("")),
  medium: z.string().trim().max(150).optional().or(z.literal("")),
  campaign: z.string().trim().max(150).optional().or(z.literal("")),
  term: z.string().trim().max(150).optional().or(z.literal("")),
  content: z.string().trim().max(150).optional().or(z.literal("")),
  gclid: z.string().trim().max(300).optional().or(z.literal("")),
  fbclid: z.string().trim().max(300).optional().or(z.literal("")),
  landingPage: z.string().trim().max(500).optional().or(z.literal("")),
  referrer: z.string().trim().max(500).optional().or(z.literal("")),
  clientId: z.string().trim().max(100).optional().or(z.literal("")),
  sessionId: z.string().trim().max(100).optional().or(z.literal("")),
  screenResolution: z.string().trim().max(30).optional().or(z.literal("")),
  timezone: z.string().trim().max(100).optional().or(z.literal("")),
  language: z.string().trim().max(35).optional().or(z.literal("")),
});

export type CreateLeadRequestSchema = z.infer<typeof createLeadRequestSchema>;
