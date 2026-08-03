/**
 * Deployment-specific values live in env vars (see .env.example) — nothing
 * here should ever need a code change to point at a different domain,
 * WhatsApp number, or notification inbox.
 */
export const SITE_CONFIG = {
  name: process.env.NEXT_PUBLIC_COMPANY_NAME || "DFX Solution",
  tagline: "Design • Future • Experience",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.dfxsolution.com").replace(/\/$/, ""),
  logoUrl:
    (process.env.NEXT_PUBLIC_SITE_URL || "https://www.dfxsolution.com").replace(/\/$/, "") +
    "/logo/dfx-solution-logo.png",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919344024373",
  emailFrom: process.env.EMAIL_FROM || "DFX Solution <onboarding@resend.dev>",
  salesNotificationEmail: process.env.SALES_NOTIFICATION_EMAIL || "",
  anchors: {
    booking: "/#contact",
    portfolio: "/#trusted",
    services: "/#services",
  },
} as const;
