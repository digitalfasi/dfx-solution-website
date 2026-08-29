/**
 * Strips markup and control characters from user-supplied text before it is
 * persisted. Prisma already parameterizes queries (no SQL injection surface),
 * this guards the other direction — data rendered later in an admin/CRM view
 * without React's auto-escaping.
 */
const CONTROL_CHARS = new RegExp("[\\u0000-\\u001F\\u007F]", "g");

export function sanitizeText(input: string | undefined | null): string {
  if (!input) return "";
  return input
    .replace(/<[^>]*>/g, "")
    .replace(CONTROL_CHARS, "")
    .trim()
    .slice(0, 5000);
}

export function sanitizeUrl(input: string | undefined | null): string {
  const value = sanitizeText(input);
  if (!value) return "";
  try {
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") return "";
    return url.toString();
  } catch {
    return "";
  }
}
