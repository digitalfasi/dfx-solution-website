import type { LeadModel as Lead } from "@/lib/generated/prisma/models";
import { getResendClient } from "@/lib/email/resend";
import { renderInternalNotificationEmail } from "@/lib/email/templates/internalNotification";
import { renderCustomerThankYouEmail } from "@/lib/email/templates/customerThankYou";
import { SITE_CONFIG } from "@/lib/config/site";

/**
 * Fire-and-forget-safe: a missing API key or a delivery failure is logged,
 * never thrown, so the lead is always saved and the visitor always sees
 * success regardless of email deliverability.
 */
export async function sendLeadNotificationEmails(lead: Lead): Promise<void> {
  const resend = getResendClient();
  if (!resend) {
    console.warn("[emailService] RESEND_API_KEY not set — skipping lead emails for", lead.leadId);
    return;
  }

  const results = await Promise.allSettled([
    SITE_CONFIG.internalNotificationEmail
      ? resend.emails.send({
          from: SITE_CONFIG.emailFrom,
          to: SITE_CONFIG.internalNotificationEmail,
          ...renderInternalNotificationEmail(lead),
        })
      : Promise.resolve(undefined),
    resend.emails.send({
      from: SITE_CONFIG.emailFrom,
      to: lead.email,
      ...renderCustomerThankYouEmail(lead),
    }),
  ]);

  for (const result of results) {
    if (result.status === "rejected") {
      console.error("[emailService] Failed to send lead email:", result.reason);
    }
  }
}
