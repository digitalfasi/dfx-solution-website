import { NextRequest, NextResponse } from "next/server";
import { findLeadByLeadId } from "@/services/leadService";
import { rateLimit } from "@/utils/rateLimit";
import { getClientIp } from "@/utils/requestMeta";
import type { LeadSummary } from "@/types/lead";

export const runtime = "nodejs";

const RATE_LIMIT_MAX = 30;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

/**
 * Public-safe lookup for the thank-you page — keyed by the unguessable
 * `leadId` reference code, never the internal database id. Returns only the
 * fields a visitor is meant to see (no IP, notes, assignment, etc.).
 */
export async function GET(request: NextRequest, context: { params: Promise<{ leadId: string }> }) {
  const ip = getClientIp(request.headers);
  const { allowed } = rateLimit(`lead-lookup:${ip}`, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS);
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  const { leadId } = await context.params;
  if (!/^DFX-[A-Z0-9]{8}$/.test(leadId)) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const lead = await findLeadByLeadId(leadId);
  if (!lead) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const summary: LeadSummary = {
    leadId: lead.leadId,
    fullName: lead.fullName,
    firstName: lead.firstName,
    company: lead.company,
    email: lead.email,
    phone: `${lead.countryCode} ${lead.phone}`,
    primaryService: lead.primaryService,
    marketingBudget: lead.marketingBudget,
    timeline: lead.timeline,
    submittedAt: lead.submittedAt.toISOString(),
    status: lead.status,
    leadScore: lead.leadScore,
    priority: lead.priority,
  };

  return NextResponse.json(summary, { status: 200 });
}
