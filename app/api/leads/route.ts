import { NextRequest, NextResponse, after } from "next/server";
import { ZodError } from "zod";
import { createLeadRequestSchema } from "@/validation/leadSchema";
import { createLead } from "@/services/leadService";
import { sendLeadNotificationEmails } from "@/services/emailService";
import { rateLimit } from "@/utils/rateLimit";
import { getBrowser, getCity, getClientIp, getCountry, getDeviceType, getOS } from "@/utils/requestMeta";
import { isTrustedOrigin } from "@/utils/csrf";
import type { CreateLeadResponse } from "@/types/lead";

export const runtime = "nodejs";

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MIN_HUMAN_FILL_TIME_MS = 1200;

export async function POST(request: NextRequest) {
  if (!isTrustedOrigin(request)) {
    return NextResponse.json<CreateLeadResponse>({ success: false, error: "Forbidden." }, { status: 403 });
  }

  const ip = getClientIp(request.headers);

  const { allowed } = rateLimit(`lead:${ip}`, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS);
  if (!allowed) {
    return NextResponse.json<CreateLeadResponse>(
      { success: false, error: "Too many requests. Please try again in a few minutes." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json<CreateLeadResponse>({ success: false, error: "Invalid request body." }, { status: 400 });
  }

  const parsed = createLeadRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json<CreateLeadResponse>(
      { success: false, error: "Please check the highlighted fields.", fieldErrors: flattenZodError(parsed.error) },
      { status: 422 }
    );
  }

  const data = parsed.data;

  // Honeypot: real visitors never populate this field. Respond as if the
  // submission succeeded so the bot has no signal it was caught.
  if (data.companyWebsiteHp) {
    return NextResponse.json<CreateLeadResponse>({ success: true, leadId: "ok" }, { status: 200 });
  }

  // Timing trap: a form filled out in under ~1.2s was not filled out by a human.
  if (Date.now() - data.formRenderedAt < MIN_HUMAN_FILL_TIME_MS) {
    return NextResponse.json<CreateLeadResponse>({ success: true, leadId: "ok" }, { status: 200 });
  }

  const userAgent = request.headers.get("user-agent") || "";

  try {
    const { lead, deduped } = await createLead(data, {
      ip,
      country: getCountry(request.headers),
      city: getCity(request.headers),
      device: getDeviceType(userAgent),
      browser: getBrowser(userAgent),
      os: getOS(userAgent),
    });

    if (!deduped) {
      // Runs after the response is sent — doesn't add email-provider latency
      // to the visitor's perceived submit time, but the function stays alive
      // until it finishes so delivery is still guaranteed.
      after(() => sendLeadNotificationEmails(lead));
    }

    return NextResponse.json<CreateLeadResponse>({ success: true, leadId: lead.leadId }, { status: 201 });
  } catch (error) {
    console.error("Failed to create lead:", error);
    return NextResponse.json<CreateLeadResponse>(
      { success: false, error: "Something went wrong. Please try again or reach us on WhatsApp." },
      { status: 500 }
    );
  }
}

function flattenZodError(error: ZodError): Record<string, string> {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".");
    if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
  }
  return fieldErrors;
}
