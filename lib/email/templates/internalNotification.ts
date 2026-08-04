import type { LeadModel as Lead } from "@/lib/generated/prisma/models";
import { escapeHtml } from "@/lib/email/escapeHtml";
import { renderEmailLayout } from "./layout";
import {
  PRIMARY_SERVICE_OPTIONS,
  INDUSTRY_OPTIONS,
  COMPANY_SIZE_OPTIONS,
  MARKETING_BUDGET_OPTIONS,
  PRIMARY_GOAL_OPTIONS,
  TIMELINE_OPTIONS,
  HEAR_ABOUT_US_OPTIONS,
  PROJECT_BUDGET_OPTIONS,
} from "@/types/lead";
import { labelFor } from "@/utils/labels";

const PRIORITY_COLOR: Record<string, string> = { HOT: "#E0393E", WARM: "#D08A0A", COLD: "#60A3E6" };

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:6px 12px 6px 0;color:#6E7F99;font-size:13px;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:6px 0;color:#181B31;font-size:14px;">${value || "—"}</td>
  </tr>`;
}

/** Internal sales-team notification — fired right after a lead is created. */
export function renderInternalNotificationEmail(lead: Lead): { subject: string; html: string } {
  const priorityColor = PRIORITY_COLOR[lead.priority] || "#6E7F99";

  const bodyHtml = `
    <p style="margin:0 0 4px;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#895ED0;">New Lead — ${escapeHtml(lead.leadId)}</p>
    <h1 style="margin:0 0 18px;font-size:22px;font-weight:700;color:#181B31;">${escapeHtml(lead.fullName)} · ${escapeHtml(lead.company)}</h1>

    <table role="presentation" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
      <tr>
        <td style="padding:10px 16px;border-radius:10px;background:#F3F7FF;margin-right:8px;">
          <span style="font-size:12px;color:#6E7F99;">Lead Score</span><br/>
          <span style="font-size:20px;font-weight:700;color:#181B31;">${lead.leadScore}</span>
        </td>
      </tr>
    </table>
    <p style="margin:0 0 24px;">
      <span style="display:inline-block;padding:4px 12px;border-radius:999px;background:${priorityColor}1A;color:${priorityColor};font-weight:700;font-size:12px;letter-spacing:.04em;">${escapeHtml(lead.priority)} PRIORITY</span>
    </p>

    <h2 style="margin:0 0 8px;font-size:14px;font-weight:700;color:#181B31;">Contact</h2>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
      ${row("Name", escapeHtml(lead.fullName))}
      ${row("Email", `<a href="mailto:${escapeHtml(lead.email)}" style="color:#8777E0;">${escapeHtml(lead.email)}</a>`)}
      ${row("Phone", escapeHtml(`${lead.countryCode} ${lead.phone}`))}
      ${row("Company", escapeHtml(lead.company))}
      ${row("Website", lead.website ? `<a href="${escapeHtml(lead.website)}" style="color:#8777E0;">${escapeHtml(lead.website)}</a>` : "—")}
    </table>

    <h2 style="margin:0 0 8px;font-size:14px;font-weight:700;color:#181B31;">Business</h2>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
      ${row("Industry", escapeHtml(labelFor(INDUSTRY_OPTIONS, lead.industry)))}
      ${row("Primary Service Needed", escapeHtml(labelFor(PRIMARY_SERVICE_OPTIONS, lead.primaryService)))}
      ${row("Company Size", escapeHtml(labelFor(COMPANY_SIZE_OPTIONS, lead.companySize)))}
      ${row("Monthly Marketing Budget", escapeHtml(labelFor(MARKETING_BUDGET_OPTIONS, lead.marketingBudget)))}
    </table>

    <h2 style="margin:0 0 8px;font-size:14px;font-weight:700;color:#181B31;">Project</h2>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
      ${row("Primary Goal", escapeHtml(labelFor(PRIMARY_GOAL_OPTIONS, lead.primaryGoal)))}
      ${row("Project Timeline", escapeHtml(labelFor(TIMELINE_OPTIONS, lead.timeline)))}
      ${row("How They Heard About Us", escapeHtml(labelFor(HEAR_ABOUT_US_OPTIONS, lead.hearAboutUs)))}
      ${row("Estimated Project Budget", escapeHtml(labelFor(PROJECT_BUDGET_OPTIONS, lead.projectBudget)))}
      ${row("Project Details", escapeHtml(lead.message))}
    </table>

    <h2 style="margin:0 0 8px;font-size:14px;font-weight:700;color:#181B31;">Attribution &amp; Meta</h2>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">
      ${row("Source / Medium", escapeHtml(`${lead.source || "—"} / ${lead.medium || "—"}`))}
      ${row("Campaign", escapeHtml(lead.campaign))}
      ${row("Landing Page", escapeHtml(lead.landingPage))}
      ${row("Referrer", escapeHtml(lead.referrer))}
      ${row("Device / Browser / OS", escapeHtml(`${lead.device || "—"} / ${lead.browser || "—"} / ${lead.os || "—"}`))}
      ${row("Location", escapeHtml(`${lead.city || "—"}, ${lead.country || "—"}`))}
      ${row("Submitted At", escapeHtml(new Date(lead.submittedAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })))}
      ${row("Reference ID", `<strong>${escapeHtml(lead.leadId)}</strong>`)}
    </table>
  `;

  return {
    subject: `🚀 New Lead from DFX Solution — ${lead.fullName} (${lead.priority})`,
    html: renderEmailLayout({
      previewText: `New ${lead.priority} lead: ${lead.fullName} from ${lead.company} — score ${lead.leadScore}`,
      bodyHtml,
    }),
  };
}
