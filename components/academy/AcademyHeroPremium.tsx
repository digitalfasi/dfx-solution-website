"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { AcademyButton, Arrow } from "./primitives";

/**
 * Section 01: HERO — Refined with balanced headline scale & concise copy.
 * Visual: /images/academy/hero-main.png (Single visual element).
 */
export function AcademyHeroPremium() {
  const ref = useRef<HTMLElement>(null);
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Subtle parallax scroll effect
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const h = el.offsetHeight || 1;
        el.style.setProperty("--hero-p", String(Math.min(1, Math.max(0, window.scrollY / h))));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced]);

  return (
    <section
      ref={ref}
      id="hero"
      data-nav-dark
      className="hero-shell relative isolate flex min-h-[82vh] w-full flex-col justify-center overflow-hidden bg-academy-navy pt-24 pb-14 lg:pt-32 lg:pb-20"
      style={{ "--hero-p": 0 } as CSSProperties}
    >
      {/* ── MEDIA PLANE — SINGLE VISUAL ELEMENT ── */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 will-change-transform"
        style={{ transform: "translateY(calc(var(--hero-p) * 5%)) scale(calc(1 + var(--hero-p) * 0.03))" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/academy/hero-main.png"
          alt="DFX Academy Classroom Environment"
          className="absolute inset-0 h-full w-full object-cover opacity-100"
          style={{ objectPosition: "center center" }}
        />

        {/* Navy readability gradient overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(98deg,rgba(13,27,54,0.96)_0%,rgba(13,27,54,0.85)_40%,rgba(13,27,54,0.40)_68%,rgba(13,27,54,0.12)_100%)]" />
        <div className="absolute inset-0 bg-academy-navy" style={{ opacity: "calc(var(--hero-p) * 0.45)" }} />
      </div>

      {/* Ambient glow accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 h-56 w-80 rounded-full bg-academy-blue/10 blur-3xl"
      />

      {/* ── HERO CONTENT (Balanced Typography & Max-Width) ── */}
      <div
        className="relative mx-auto w-full max-w-container container-px"
        style={{
          transform: "translateY(calc(var(--hero-p) * 12%))",
          opacity: "calc(1 - var(--hero-p) * 1.2)",
        }}
      >
        {/* Category Label */}
        <p className="text-[11px] font-bold uppercase tracking-[.28em] text-academy-blue">
          AI-INTEGRATED DIGITAL MARKETING
        </p>

        {/* Refined H1 Headline */}
        <h1 className="mt-3.5 max-w-[660px] text-[clamp(2.1rem,3.4vw,3.2rem)] font-bold leading-[1.06] tracking-[-0.035em] text-white">
          Master AI-Powered Digital Marketing. <span className="text-academy-blue">Build A Future You Own.</span>
        </h1>

        {/* Supporting Copy */}
        <p className="mt-4 max-w-[520px] text-[15px] sm:text-[16px] leading-relaxed text-white/80">
          Learn modern digital marketing with AI, real projects and practical guidance — and turn what you learn into something you can actually build.
        </p>

        {/* Motivational Micro-Line */}
        <p className="mt-4 text-xs font-bold uppercase tracking-[.24em] text-academy-blue">
          Learn. Apply. Build. Grow.
        </p>

        {/* Action CTAs */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <AcademyButton href="#programs" variant="primary" event="academy_explore_program">
            Explore Programs <Arrow />
          </AcademyButton>
          <AcademyButton
            href="#enquire"
            variant="onDark"
            event="academy_enquire_click"
          >
            Enquire Now <Arrow />
          </AcademyButton>
        </div>
      </div>

      {/* ── SCROLL CUE ── */}
      <div
        className="pointer-events-none mt-10 flex flex-col items-center justify-center gap-2 text-center"
        aria-hidden
      >
        <span className="text-[9px] font-semibold uppercase tracking-[.28em] text-white/40">
          SCROLL DOWN
        </span>
        <span className="relative block h-5 w-px overflow-hidden bg-white/20">
          <span className="absolute inset-x-0 top-0 h-2.5 bg-academy-blue motion-safe:animate-[scrollCue_2.4s_cubic-bezier(.16,1,.3,1)_infinite]" />
        </span>
      </div>
    </section>
  );
}
