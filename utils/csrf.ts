import type { NextRequest } from "next/server";

/**
 * Same-origin check for state-changing API routes. This isn't cookie-session
 * CSRF (the lead endpoints don't use authenticated sessions) — it's a guard
 * against the endpoint being POSTed to from a foreign page or embedded form
 * script. Compares against the request's own origin rather than a hardcoded
 * domain so it works correctly across localhost, preview deployments, and
 * the production domain alike.
 */
export function isTrustedOrigin(request: NextRequest): boolean {
  const selfOrigin = request.nextUrl.origin;

  const origin = request.headers.get("origin");
  if (origin) return origin === selfOrigin;

  const referer = request.headers.get("referer");
  if (referer) {
    try {
      return new URL(referer).origin === selfOrigin;
    } catch {
      return false;
    }
  }

  // Neither header present — a real browser fetch from our own client always
  // sends one of these for a POST, so treat the absence of both as untrusted.
  return false;
}
