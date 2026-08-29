"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Reveal, Eyebrow } from "./primitives";
import { LEARNING_STEPS } from "@/lib/academy/content";

/**
 * Learn → Watch → Build → Apply → Prove → Monetize.
 *
 * The same loop runs every week, so the section is built as a progression
 * rather than six equal boxes: the stage nearest the middle of the viewport
 * takes the light, the rest recede, and a rail fills as you move down it.
 */
export function LearningExperience() {
  const [active, setActive] = useState(0);
  const steps = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const els = steps.current.filter(Boolean) as HTMLLIElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.index);
            if (!Number.isNaN(i)) setActive(i);
          }
        });
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="how-it-works" className="academy-section container-px bg-academy-tint">
      <div className="max-w-container mx-auto grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        {/* Sticky thesis */}
        <div className="lg:sticky lg:top-[120px] lg:self-start">
          <Reveal>
            <Eyebrow>How it works</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-semibold leading-[1.04] tracking-[-0.03em] text-academy-navy text-[clamp(1.9rem,4vw,3rem)]">
              Every week runs the same six steps.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-[40ch] text-[15.5px] leading-relaxed text-academy-navy/60">
              Nothing stays theoretical for long. Each concept is demonstrated, built by hand, applied to a real
              business case, and then turned into something you can sell.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-wrap items-center gap-x-2.5 gap-y-2 text-[12px] font-semibold uppercase tracking-[.16em] text-academy-navy/35">
              {LEARNING_STEPS.map((s, i) => (
                <span key={s.step} className="flex items-center gap-2.5">
                  <span className={clsx(i === active && "text-academy-blue")}>{s.step}</span>
                  {i < LEARNING_STEPS.length - 1 && <span aria-hidden>·</span>}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Progression */}
        <ol className="relative">
          <span className="absolute left-[27px] top-4 bottom-10 w-px bg-academy-navy/10 sm:left-[35px]" aria-hidden />
          <span
            aria-hidden
            className="absolute left-[27px] top-4 w-px origin-top bg-academy-blue transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] sm:left-[35px]"
            style={{
              height: "calc(100% - 56px)",
              transform: `scaleY(${(active + 1) / LEARNING_STEPS.length})`,
            }}
          />
          {LEARNING_STEPS.map((s, i) => {
            const isActive = i === active;
            return (
              <li
                key={s.step}
                data-index={i}
                ref={(el) => {
                  steps.current[i] = el;
                }}
                className="relative flex items-start gap-6 pb-12 last:pb-0 sm:gap-8"
              >
                <span
                  className={clsx(
                    "relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border text-[13px] font-bold transition-all duration-500 sm:h-[71px] sm:w-[71px] sm:text-[15px]",
                    isActive
                      ? "border-academy-blue bg-academy-blue text-white shadow-[0_18px_40px_-16px_rgba(0,123,255,0.7)] scale-110"
                      : "border-academy-navy/12 bg-white text-academy-navy/35"
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className={clsx("flex-1 pt-1 transition-all duration-500", isActive ? "opacity-100 translate-x-1" : "opacity-50")}>
                  <div className={clsx(
                    "rounded-2xl border p-6 transition-all duration-500",
                    isActive ? "border-academy-blue/30 bg-white shadow-xl" : "border-transparent"
                  )}>
                    <h3
                      className={clsx(
                        "font-semibold tracking-[-0.02em] transition-colors duration-500",
                        isActive
                          ? "text-academy-navy text-[clamp(1.6rem,3vw,2.4rem)]"
                          : "text-academy-navy/70 text-[clamp(1.35rem,2.4vw,1.9rem)]"
                      )}
                    >
                      {s.step}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-academy-navy/70">{s.desc}</p>

                    {isActive && (
                      <div className="mt-4 pt-4 border-t border-academy-navy/10 flex items-center justify-between text-xs text-academy-blue font-semibold">
                        <span>Phase 0{i + 1} Output Active</span>
                        <span>Stage Verified ✓</span>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
