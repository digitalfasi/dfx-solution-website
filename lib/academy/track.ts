/**
 * Academy analytics — follows the existing convention in utils/analytics.ts:
 * GTM is already loaded globally, so pushing to `dataLayer` is what actually
 * drives GA4 / Meta. Direct gtag/fbq calls are guarded no-ops when absent.
 */
export type AcademyEvent =
  | "academy_explore_program"
  | "academy_enquire_click"
  | "academy_whatsapp_click"
  | "academy_call_click"
  | "academy_syllabus_download"
  | "academy_program_card_click"
  | "academy_faq_open"
  | "academy_enquiry_submit"
  | "academy_popup_impression"
  | "academy_popup_close"
  | "academy_popup_form_start"
  | "academy_popup_submit"
  | "academy_popup_success"
  | "academy_popup_error";

export function trackAcademy(event: AcademyEvent, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
  if (typeof window.gtag === "function") window.gtag("event", event, params);
}
