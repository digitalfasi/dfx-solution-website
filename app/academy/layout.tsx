import type { ReactNode } from "react";

/**
 * Academy routes share the DFX Solution shell (nav, footer, smooth scroll)
 * and add the Academy's own navy/blue surface via the `.academy` scope.
 */
export default function AcademyLayout({ children }: { children: ReactNode }) {
  return <div className="academy">{children}</div>;
}
