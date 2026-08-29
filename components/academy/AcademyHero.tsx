"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Cpu, Code2, Users, Target } from "lucide-react";
import { AcademyButton, Arrow } from "./primitives";
import { ACADEMY } from "@/lib/academy/content";

/**
 * Section 01: HERO — DFX Academy Hub
 * Premium, clean, focused above-the-fold hero.
 * Rendered with ONE classroom background image (`/images/academy/hero-classroom.png`).
 */
export function AcademyHero() {
  const ref = useRef<HTMLElement>(null);
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Scroll parallax effect on background image
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

  const trustBadges = [
    { icon: Cpu, label: "AI-Integrated" },
    { icon: Code2, label: "Practical Projects" },
    { icon: Users, label: "Online + In-person" },
    { icon: Target, label: "Portfolio-Focused" },
  ];

  return (
    <section
      ref={ref}
      id="hero"
      data-nav-dark
      className="hero-shell relative isolate flex min-h-[85vh] w-full flex-col justify-center overflow-hidden bg-academy-navy pt-28 pb-16 lg:pt-36 lg:pb-24"
      style={{ "--hero-p": 0 } as CSSProperties}
    >
      {/* ── MEDIA PLANE — ONE SINGLE CLASSROOM IMAGE ── */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 will-change-transform"
        style={{ transform: "translateY(calc(var(--hero-p) * 6%)) scale(calc(1 + var(--hero-p) * 0.04))" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/academy/hero-classroom.png"
          alt="DFX Academy Classroom Environment"
          className="absolute inset-0 h-full w-full object-cover opacity-100"
          style={{ objectPosition: "68% center" }}
        />

        {/* Readability gradient overlays */}
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(13,27,54,0.97)_0%,rgba(13,27,54,0.85)_42%,rgba(13,27,54,0.45)_68%,rgba(13,27,54,0.20)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_75%_40%,rgba(0,123,255,0.15),transparent_70%)]" />
        <div className="absolute inset-0 bg-academy-navy" style={{ opacity: "calc(var(--hero-p) * 0.5)" }} />
      </div>

      {/* Subtle ambient blue glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 h-64 w-96 rounded-full bg-academy-blue/10 blur-3xl"
      />

      {/* ── HERO CONTENT ── */}
      <div
        className="relative mx-auto w-full max-w-container container-px"
        style={{
          transform: "translateY(calc(var(--hero-p) * 15%))",
          opacity: "calc(1 - var(--hero-p) * 1.2)",
        }}
      >
        {/* Parent attribution */}
        <div className="flex items-center gap-3">
          <span className="text-[12px] font-bold uppercase tracking-[.28em] text-white/90">
            DFX ACADEMY
          </span>
          <span className="h-3.5 w-px bg-white/30" aria-hidden />
          <span className="text-[10px] font-semibold uppercase tracking-[.24em] text-white/60">
            An initiative of {ACADEMY.parent}
          </span>
        </div>

        {/* Eyebrow Label */}
        <p className="mt-5 text-[11px] font-bold uppercase tracking-[.3em] text-academy-blue">
          AI-INTEGRATED DIGITAL MARKETING
        </p>

        {/* Main Headline */}
        <h1 className="mt-4 max-w-[16ch] text-[clamp(2.2rem,4.5vw,4.2rem)] font-bold leading-[1.04] tracking-[-0.035em] text-white">
          MASTER AI-INTEGRATED <span className="text-academy-blue">DIGITAL MARKETING.</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 max-w-[54ch] text-[15px] sm:text-[17px] leading-relaxed text-white/75">
          An 8-week live practical program to learn digital marketing, build real projects, and turn your skills into business or freelance opportunities.
        </p>

        {/* Motivational Micro-Message */}
        <div className="mt-5 flex flex-wrap items-center gap-3 rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 max-w-fit backdrop-blur-md">
          <span className="text-xs italic text-white/90">
            &ldquo;Don&apos;t just learn the tools. Learn how to create the outcome.&rdquo;
          </span>
          <span className="h-3 w-px bg-white/20 hidden sm:block" />
          <span className="text-[10px] font-bold uppercase tracking-[.2em] text-academy-blue">
            Learn. Apply. Build. Grow.
          </span>
        </div>

        {/* Trust Badges Strip */}
        <ul className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
          {trustBadges.map((b) => {
            const IconComp = b.icon;
            return (
              <li key={b.label} className="flex items-center gap-2 text-[13px] font-medium text-white/85">
                <span className="flex h-5 w-5 items-center justify-center rounded bg-academy-blue/20 text-academy-blue border border-academy-blue/30">
                  <IconComp className="h-3 w-3" />
                </span>
                {b.label}
              </li>
            );
          })}
        </ul>

        {/* CTAs */}
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <AcademyButton href="#programs" variant="primary" event="academy_explore_program">
            Explore the Program <Arrow />
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

      {/* ── SCROLL DOWN CUE ── */}
      <div
        className="pointer-events-none mt-12 flex flex-col items-center justify-center gap-2 text-center"
        aria-hidden
      >
        <span className="text-[9px] font-semibold uppercase tracking-[.28em] text-white/40">
          SCROLL DOWN
        </span>
        <span className="relative block h-6 w-px overflow-hidden bg-white/20">
          <span className="absolute inset-x-0 top-0 h-3 bg-academy-blue motion-safe:animate-[scrollCue_2.4s_cubic-bezier(.16,1,.3,1)_infinite]" />
        </span>
      </div>
    </section>
  );
}
