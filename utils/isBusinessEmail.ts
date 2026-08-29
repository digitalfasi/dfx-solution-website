/**
 * Free/consumer webmail domains. Used only for lead-scoring signal (a
 * business-domain email scores higher) — form validation never blocks a
 * personal email, since that would cost conversions for no real benefit.
 */
const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "aol.com",
  "icloud.com",
  "me.com",
  "protonmail.com",
  "proton.me",
  "gmx.com",
  "yandex.com",
  "rediffmail.com",
  "zoho.com",
]);

export function isBusinessEmail(email: string): boolean {
  const domain = email.trim().toLowerCase().split("@")[1];
  if (!domain) return false;
  return !FREE_EMAIL_DOMAINS.has(domain);
}
