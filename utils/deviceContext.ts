import type { ClientDeviceContext } from "@/types/lead";

/** Browser-only signals the server can't infer from headers alone. */
export function captureDeviceContext(): ClientDeviceContext {
  if (typeof window === "undefined") return {};

  let timezone = "";
  try {
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  } catch {
    timezone = "";
  }

  return {
    screenResolution: window.screen ? `${window.screen.width}x${window.screen.height}` : "",
    timezone,
    language: navigator.language || "",
  };
}
