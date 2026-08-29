import Link from "next/link";
import { Reveal, AcademyLogo } from "./primitives";
import { ACADEMY } from "@/lib/academy/content";

/**
 * Compact navy header for Academy sub-pages — same identity as the hero
 * without the film, so secondary pages stay fast and calm.
 */
export function AcademyPageHeader({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  children?: React.ReactNode;
}) {
  return (
    <header data-nav-dark className="relative overflow-hidden bg-academy-navy text-white">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(85%_70%_at_18%_0%,rgba(0,123,255,0.18)_0%,transparent_68%)]"
      />
      <div className="relative max-w-container mx-auto container-px pb-20 pt-40 sm:pb-24 sm:pt-44">
        <Reveal>
          <div className="flex items-center gap-4">
            <Link href="/academy" aria-label="DFX Academy">
              <AcademyLogo className="h-8" onDark />
            </Link>
            <span className="hidden h-7 w-px bg-white/20 sm:block" aria-hidden />
            <span className="hidden text-[10px] font-semibold uppercase tracking-[.26em] text-white/45 sm:block">
              An initiative of {ACADEMY.parent}
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mt-10 text-[11px] font-semibold uppercase tracking-[.3em] text-academy-blue">{eyebrow}</p>
        </Reveal>
        <Reveal delay={0.12}>
          <h1 className="mt-5 max-w-[20ch] font-semibold tracking-[-0.03em] leading-[1.04] text-[clamp(2.1rem,5.2vw,4rem)]">
            {title}
          </h1>
        </Reveal>
        {lead && (
          <Reveal delay={0.18}>
            <p className="mt-7 max-w-[60ch] text-[clamp(1rem,1.3vw,1.15rem)] leading-relaxed text-white/65">
              {lead}
            </p>
          </Reveal>
        )}
        {children && (
          <Reveal delay={0.24}>
            <div className="mt-10">{children}</div>
          </Reveal>
        )}
      </div>
    </header>
  );
}
