"use client";

import { useEffect, useState } from "react";
import { captureAttribution } from "@/utils/utm";
import type { AttributionData } from "@/types/lead";

/** Captures utm_*, gclid, and fbclid params (or the session's first-touch values) once on mount. */
export function useUtmParams(): AttributionData {
  const [attribution, setAttribution] = useState<AttributionData>({});

  useEffect(() => {
    setAttribution(captureAttribution());
  }, []);

  return attribution;
}
