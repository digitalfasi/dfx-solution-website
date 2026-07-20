"use client";

import { useLenis } from "@/lib/useLenis";
import { useReveal } from "@/lib/useReveal";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useLenis();
  useReveal();
  return <>{children}</>;
}
