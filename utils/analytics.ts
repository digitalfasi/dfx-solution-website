/**
 * GTM already loads on every page (see app/layout.tsx). GA4 and Meta Pixel
 * are both configured as tags inside that GTM container, so pushing to
 * `dataLayer` is what actually drives them. We additionally call
 * `gtag`/`fbq`/`clarity` directly when present, since some setups also expose
 * those globals on `window` — each call is guarded so a missing global is a
 * silent no-op rather than a thrown error.
 */
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

export interface GenerateLeadPayload {
  leadId: string;
  services: string[];
  marketingBudget: string;
  leadScore?: number;
  priority?: string;
}

/** Both env vars must be set for the optional Google Ads conversion to fire. */
const GOOGLE_ADS_CONVERSION_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID;
const GOOGLE_ADS_CONVERSION_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;

export function trackGenerateLead(payload: GenerateLeadPayload): void {
  if (typeof window === "undefined") return;

  const eventParams = {
    lead_id: payload.leadId,
    services_interested: payload.services.join(","),
    marketing_budget: payload.marketingBudget,
    lead_score: payload.leadScore,
    lead_priority: payload.priority,
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "generate_lead", ...eventParams });

  if (typeof window.gtag === "function") {
    window.gtag("event", "generate_lead", eventParams);

    if (GOOGLE_ADS_CONVERSION_ID && GOOGLE_ADS_CONVERSION_LABEL) {
      window.gtag("event", "conversion", {
        send_to: `${GOOGLE_ADS_CONVERSION_ID}/${GOOGLE_ADS_CONVERSION_LABEL}`,
      });
    }
  }

  if (typeof window.fbq === "function") {
    window.fbq("track", "Lead", { content_name: payload.services.join(",") });
  }

  if (typeof window.clarity === "function") {
    window.clarity("event", "generate_lead");
    window.clarity("set", "lead_priority", payload.priority || "unknown");
  }
}
