import type { AttributionData } from "@/types/lead";

const STORAGE_KEY = "dfx_attribution";
const CLIENT_ID_KEY = "dfx_client_id";
const SESSION_ID_KEY = "dfx_session_id";

const QUERY_PARAM_MAP: Record<string, keyof AttributionData> = {
  utm_source: "source",
  utm_medium: "medium",
  utm_campaign: "campaign",
  utm_term: "term",
  utm_content: "content",
  gclid: "gclid",
  fbclid: "fbclid",
};

/** Reads utm_* (source/medium/campaign/term/content), gclid, and fbclid params from a URL's query string. */
export function parseAttributionParams(search: string): Partial<AttributionData> {
  const params = new URLSearchParams(search);
  const result: Partial<AttributionData> = {};
  for (const [param, field] of Object.entries(QUERY_PARAM_MAP)) {
    const value = params.get(param);
    if (value) result[field] = value;
  }
  return result;
}

function safeRandomId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
}

/** Long-lived, anonymous identifier for this browser (persists across sessions). */
function getOrCreateClientId(): string {
  try {
    const existing = window.localStorage.getItem(CLIENT_ID_KEY);
    if (existing) return existing;
    const id = safeRandomId();
    window.localStorage.setItem(CLIENT_ID_KEY, id);
    return id;
  } catch {
    return safeRandomId();
  }
}

/** Identifier for the current tab session (resets when the browser session ends). */
function getOrCreateSessionId(): string {
  try {
    const existing = window.sessionStorage.getItem(SESSION_ID_KEY);
    if (existing) return existing;
    const id = safeRandomId();
    window.sessionStorage.setItem(SESSION_ID_KEY, id);
    return id;
  } catch {
    return safeRandomId();
  }
}

/**
 * First-touch attribution captured once per browser session: if the current
 * URL carries utm_*, gclid, or fbclid params they win and are persisted;
 * otherwise whatever was captured earlier in the session is reused so a
 * later, param-less form submission still credits the campaign that brought
 * the visitor in.
 */
export function captureAttribution(): AttributionData {
  if (typeof window === "undefined") return {};

  const fromUrl = parseAttributionParams(window.location.search);
  const stored = readStoredAttribution();

  const attribution: AttributionData = {
    ...stored,
    ...fromUrl,
    landingPage: stored.landingPage || window.location.pathname + window.location.search,
    referrer: stored.referrer || document.referrer || "",
    clientId: getOrCreateClientId(),
    sessionId: getOrCreateSessionId(),
  };

  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // sessionStorage unavailable (private browsing, etc.) — attribution just
    // won't persist across a reload, which is an acceptable degradation.
  }

  return attribution;
}

function readStoredAttribution(): AttributionData {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AttributionData) : {};
  } catch {
    return {};
  }
}
