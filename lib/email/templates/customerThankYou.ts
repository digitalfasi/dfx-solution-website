import type { LeadModel as Lead } from "@/lib/generated/prisma/models";
import { escapeHtml } from "@/lib/email/escapeHtml";
import { renderEmailLayout, button, secondaryButton } from "./layout";
import { SITE_CONFIG } from "@/lib/config/site";

/** Customer-facing thank-you email — sent right after a lead is created. */
export function renderCustomerThankYouEmail(lead: Lead): { subject: string; html: string } {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}`;

  const bodyHtml = `
    <p style="margin:0 0 16px;">Hello ${escapeHtml(lead.firstName)},</p>
    <p style="margin:0 0 16px;">Thank you for contacting ${escapeHtml(SITE_CONFIG.name)}. We've successfully received your enquiry.</p>

    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 20px;background:#F3F7FF;border-radius:12px;">
      <tr>
        <td style="padding:16px 20px;">
          <span style="font-size:12px;color:#6E7F99;">Reference Number</span><br/>
          <span style="font-size:18px;font-weight:700;color:#181B31;letter-spacing:.02em;">${escapeHtml(lead.leadId)}</span>
        </td>
      </tr>
    </table>

    <p style="margin:0 0 16px;">One of our AI Growth Specialists will review your business requirements.</p>
    <p style="margin:0 0 24px;"><strong>Expected response time:</strong> within one business day.</p>

    <p style="margin:0 0 12px;">Meanwhile, you can:</p>
    <p style="margin:0 0 24px;">
      ${button("Explore Services", `${SITE_CONFIG.url}${SITE_CONFIG.anchors.services}`)}
      ${secondaryButton("View Portfolio", `${SITE_CONFIG.url}${SITE_CONFIG.anchors.portfolio}`)}
    </p>
    <p style="margin:0 0 24px;">
      ${button("Book Strategy Call", `${SITE_CONFIG.url}${SITE_CONFIG.anchors.booking}`)}
      ${secondaryButton("Chat on WhatsApp", whatsappUrl)}
    </p>

    <p style="margin:24px 0 0;color:#181B31;">Regards,<br/>Team ${escapeHtml(SITE_CONFIG.name)}<br/><span style="color:#6E7F99;">${escapeHtml(SITE_CONFIG.tagline)}</span></p>
  `;

  return {
    subject: `Hi ${lead.firstName}, we've received your request.`,
    html: renderEmailLayout({
      previewText: `Thanks for reaching out to ${SITE_CONFIG.name} — reference ${lead.leadId}`,
      bodyHtml,
    }),
  };
}
