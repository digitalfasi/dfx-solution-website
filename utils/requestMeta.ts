/** Lightweight, dependency-free request metadata extraction for lead attribution. */

export function getClientIp(headers: Headers): string {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "unknown";
}

export function getCountry(headers: Headers): string {
  return headers.get("x-vercel-ip-country") || headers.get("cf-ipcountry") || "Unknown";
}

export function getCity(headers: Headers): string {
  return headers.get("x-vercel-ip-city") || "Unknown";
}

export function getDeviceType(userAgent: string): string {
  if (/tablet|ipad/i.test(userAgent)) return "Tablet";
  if (/mobi|android|iphone/i.test(userAgent)) return "Mobile";
  return "Desktop";
}

export function getBrowser(userAgent: string): string {
  if (/edg\//i.test(userAgent)) return "Edge";
  if (/chrome\//i.test(userAgent) && !/chromium/i.test(userAgent)) return "Chrome";
  if (/firefox\//i.test(userAgent)) return "Firefox";
  if (/safari\//i.test(userAgent) && !/chrome\//i.test(userAgent)) return "Safari";
  if (/opr\/|opera/i.test(userAgent)) return "Opera";
  return "Other";
}

export function getOS(userAgent: string): string {
  if (/windows/i.test(userAgent)) return "Windows";
  if (/iphone|ipad|ipod/i.test(userAgent)) return "iOS";
  if (/android/i.test(userAgent)) return "Android";
  if (/mac os x/i.test(userAgent)) return "macOS";
  if (/linux/i.test(userAgent)) return "Linux";
  return "Other";
}
