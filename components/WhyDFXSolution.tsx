"use client";

import { useEffect, useRef } from "react";

const REASONS = [
  { n: "01", title: "AI-First Strategy", desc: "We build for AI Search, Google and the future." },
  { n: "02", title: "Everything Connected", desc: "Websites, SEO, Ads and Automation work as one." },
  { n: "03", title: "Business Outcomes", desc: "More leads. Better conversions. Real business growth." },
  { n: "04", title: "Transparent Partnership", desc: "Clear reporting. No hidden work. No guesswork." },
  { n: "05", title: "Built to Scale", desc: "Systems designed for businesses that want long-term growth." },
];

/**
 * Section 3 — Why DFX Solution. Editorial numbered-index layout: sticky
 * left (eyebrow/headline/copy) + a quiet 01–05 list on the right, oversized
 * low-contrast numerals, hairline dividers, no cards/icons/checkmarks.
 */
export function WhyDFXSolution() {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rows = listRef.current?.querySelectorAll<HTMLElement>(".reason-row");
    if (!rows) return;
    if (reduce) {
      rows.forEach((r) => (r.style.opacity = "1"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.opacity = "1";
            (e.target as HTMLElement).style.transform = "translateY(0)";
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    rows.forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, []);

  // Touch/mobile scrollspy — `:hover` never fires on touch devices, so on
  // mobile the row nearest the center of the viewport gets the same
  // "active" treatment (number + text highlight) that desktop gets on
  // hover. Desktop keeps pure CSS :hover and ignores this state.
  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (!isTouch) return;
    const rows = listRef.current?.querySelectorAll<HTMLElement>(".reason-row");
    if (!rows || !rows.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          (e.target as HTMLElement).dataset.active = e.isIntersecting ? "true" : "false";
        });
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 }
    );
    rows.forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, []);

  return (
    <section id="why" className="section section-tight container-px">
      <div className="max-w-container mx-auto">
        <div className="grid lg:grid-cols-[35%_65%] gap-12 lg:gap-16">
          {/* Left — sticky */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-highlight mb-5">
              Why Businesses Choose DFX Solution
            </p>
            <h2 className="font-bold text-tx text-[clamp(2rem,4vw,3rem)] leading-[1.12] mb-5">
              Everything Your Business Needs.
              <br />
              One Connected Growth System.
            </h2>
            <p className="text-muted text-base leading-relaxed max-w-[42ch]">
              Everything your business needs to grow—planned, built and optimized as one connected growth system.
            </p>
          </div>

          {/* Right — numbered index */}
          <div ref={listRef}>
            {REASONS.map((r) => (
              <div
                key={r.n}
                data-active="false"
                className="reason-row group grid grid-cols-[auto_1fr] items-baseline gap-6 md:gap-10 py-8 border-b border-border transition-opacity duration-700"
                style={{ opacity: 0, transform: "translateY(20px)" }}
              >
                <span className="text-[clamp(2.5rem,5vw,4rem)] font-bold text-black/[0.08] leading-none tabular-nums transition-colors duration-300 group-hover:text-primary/70 group-data-[active=true]:text-primary/70 select-none">
                  {r.n}
                </span>
                <div className="transition-transform duration-300 group-hover:translate-x-1.5 group-data-[active=true]:translate-x-1.5">
                  <h3 className="font-semibold text-tx text-xl md:text-2xl mb-1.5 transition-colors duration-300 group-data-[active=true]:text-primary">{r.title}</h3>
                  <p className="text-muted text-sm md:text-base max-w-[52ch]">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
