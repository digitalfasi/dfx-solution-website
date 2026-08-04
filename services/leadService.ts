import { prisma } from "@/lib/prisma";
import { sanitizeText, sanitizeUrl } from "@/utils/sanitize";
import { generateLeadId } from "@/utils/leadId";
import { calculateLeadScore } from "@/services/leadScoring";
import type { CreateLeadRequestSchema } from "@/validation/leadSchema";
import type { LeadModel as Lead } from "@/lib/generated/prisma/models";

const DUPLICATE_WINDOW_MS = 2 * 60 * 1000;
const LEAD_ID_MAX_ATTEMPTS = 5;

export interface LeadRequestContext {
  ip: string;
  country: string;
  city: string;
  device: string;
  browser: string;
  os: string;
}

export interface CreateLeadResult {
  lead: Lead;
  /** True if this call returned an existing lead instead of creating a new row. */
  deduped: boolean;
}

/**
 * Returns an existing lead if the same person (email + phone) submitted very
 * recently — guards against double-clicks / accidental resubmits producing
 * duplicate CRM rows without silently dropping genuinely new inquiries.
 */
async function findRecentDuplicate(email: string, phone: string) {
  return prisma.lead.findFirst({
    where: {
      email,
      phone,
      createdAt: { gte: new Date(Date.now() - DUPLICATE_WINDOW_MS) },
    },
    orderBy: { createdAt: "desc" },
  });
}

type LeadCreateData = Omit<Parameters<typeof prisma.lead.create>[0]["data"], "leadId">;

async function createLeadWithUniqueLeadId(data: LeadCreateData): Promise<Lead> {
  for (let attempt = 0; attempt < LEAD_ID_MAX_ATTEMPTS; attempt++) {
    try {
      return await prisma.lead.create({ data: { ...data, leadId: generateLeadId() } });
    } catch (error) {
      const isUniqueLeadIdConflict =
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        (error as { code?: string }).code === "P2002" &&
        "meta" in error &&
        JSON.stringify((error as { meta?: unknown }).meta).includes("leadId");
      if (!isUniqueLeadIdConflict || attempt === LEAD_ID_MAX_ATTEMPTS - 1) throw error;
    }
  }
  throw new Error("Failed to generate a unique lead reference ID.");
}

export async function createLead(data: CreateLeadRequestSchema, context: LeadRequestContext): Promise<CreateLeadResult> {
  const email = data.email.trim().toLowerCase();
  const phone = data.phone.trim();

  // Idempotency: a retried request with the same clientRequestId returns the
  // original lead instead of creating a duplicate row.
  const existingByRequestId = await prisma.lead.findUnique({ where: { clientRequestId: data.clientRequestId } });
  if (existingByRequestId) {
    return { lead: existingByRequestId, deduped: true };
  }

  const duplicate = await findRecentDuplicate(email, phone);
  if (duplicate) {
    return { lead: duplicate, deduped: true };
  }

  const firstName = sanitizeText(data.firstName);
  const lastName = data.lastName ? sanitizeText(data.lastName) : null;
  const company = sanitizeText(data.company);
  const message = data.message ? sanitizeText(data.message) : null;
  const website = data.website ? sanitizeUrl(data.website) : null;

  const { leadScore, priority } = calculateLeadScore({
    email,
    website: website || undefined,
    company,
    phone,
    countryCode: data.countryCode,
    companySize: data.companySize,
    marketingBudget: data.marketingBudget,
    projectBudget: data.projectBudget,
    message: message || undefined,
    timeline: data.timeline,
    primaryService: data.primaryService,
  });

  const lead = await createLeadWithUniqueLeadId({
    submittedAt: new Date(data.formRenderedAt),
    firstName,
    lastName,
    fullName: lastName ? `${firstName} ${lastName}` : firstName,
    email,
    phone,
    countryCode: data.countryCode,
    company,
    website,

    industry: data.industry,
    primaryService: data.primaryService,
    companySize: data.companySize,
    marketingBudget: data.marketingBudget,

    primaryGoal: data.primaryGoal,
    timeline: data.timeline,
    hearAboutUs: data.hearAboutUs,
    projectBudget: data.projectBudget,
    message,

    leadScore,
    priority,
    status: "NEW",

    source: data.source ? sanitizeText(data.source) : null,
    medium: data.medium ? sanitizeText(data.medium) : null,
    campaign: data.campaign ? sanitizeText(data.campaign) : null,
    term: data.term ? sanitizeText(data.term) : null,
    content: data.content ? sanitizeText(data.content) : null,
    gclid: data.gclid ? sanitizeText(data.gclid) : null,
    fbclid: data.fbclid ? sanitizeText(data.fbclid) : null,
    landingPage: data.landingPage ? sanitizeText(data.landingPage) : null,
    referrer: data.referrer ? sanitizeText(data.referrer) : null,
    clientId: data.clientId ? sanitizeText(data.clientId) : null,
    sessionId: data.sessionId ? sanitizeText(data.sessionId) : null,

    browser: context.browser,
    device: context.device,
    os: context.os,
    screenResolution: data.screenResolution || null,
    timezone: data.timezone || null,
    language: data.language || null,
    country: context.country,
    city: context.city,
    ipAddress: context.ip,

    clientRequestId: data.clientRequestId,

    activities: {
      create: {
        type: "CREATED",
        description: "Lead submitted via the website strategy-session form.",
      },
    },
  });

  return { lead, deduped: false };
}

/** Public-safe lookup used by the thank-you page — keyed by the unguessable reference code, not the internal id. */
export async function findLeadByLeadId(leadId: string): Promise<Lead | null> {
  return prisma.lead.findUnique({ where: { leadId } });
}
