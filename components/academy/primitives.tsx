"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import clsx from "clsx";
import { trackAcademy, type AcademyEvent } from "@/lib/academy/track";

/** Drop the official Academy logo here to replace the typographic lockup. */
const ACADEMY_LOGO_SRC = "/logo/dfx-academy-logo.png";

/* ------------------------------------------------------------------ motion */

/**
 * Reveals are CSS transitions toggled by an IntersectionObserver rather than
 * an animation library.
 *
 * The site-wide `.reveal` helper is wired up once on mount in
 * SmoothScrollProvider, so it never sees markup mounted by a client-side route
 * change — each Academy element observes itself instead. Reduced motion is
 * handled entirely in CSS, so nothing here can diverge between the server and
 * client render.
 */
function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Without observer support (very old browsers) show everything rather
    // than leaving content permanently hidden.
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, inView };
}

type RevealTag = "div" | "li" | "section" | "article";

export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: RevealTag;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const Tag = as as "div";
  return (
    <Tag
      ref={ref}
      className={clsx("ac-reveal", inView && "is-in", className)}
      style={{ "--ac-delay": `${delay}s`, "--ac-y": `${y}px` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

/** Editorial clip-path reveal — used for imagery and mockup frames. */
export function MaskReveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={clsx("ac-mask", inView && "is-in", className)}
      style={{ "--ac-delay": `${delay}s` } as CSSProperties}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------- typography */

export function Eyebrow({ children, onDark = false }: { children: ReactNode; onDark?: boolean }) {
  return (
    <p
      className={clsx(
        "inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[.22em]",
        onDark ? "text-white/70" : "text-academy-blue"
      )}
    >
      <span className={clsx("h-px w-6", onDark ? "bg-white/40" : "bg-academy-blue/50")} aria-hidden />
      {children}
    </p>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  onDark = false,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  onDark?: boolean;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "max-w-[720px]",
        align === "center" && "mx-auto text-center flex flex-col items-center",
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2
          className={clsx(
            "mt-5 font-semibold tracking-[-0.02em] leading-[1.08] text-[clamp(1.9rem,4.4vw,3.25rem)]",
            onDark ? "text-white" : "text-academy-navy"
          )}
        >
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.1}>
          <p
            className={clsx(
              "mt-5 text-[clamp(1rem,1.25vw,1.125rem)] leading-relaxed",
              onDark ? "text-white/65" : "text-academy-navy/65"
            )}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- buttons */

type ButtonVariant = "primary" | "ghost" | "onDark";

export function AcademyButton({
  href,
  children,
  variant = "primary",
  event,
  eventParams,
  className,
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  event?: AcademyEvent;
  eventParams?: Record<string, unknown>;
  className?: string;
  external?: boolean;
}) {
  const classes = clsx(
    "group inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold whitespace-nowrap transition-all duration-300",
    variant === "primary" &&
      "bg-academy-blue text-white hover:bg-academy-blueDark hover:shadow-[0_14px_38px_-12px_rgba(0,123,255,0.55)]",
    variant === "ghost" &&
      "border border-academy-navy/15 text-academy-navy hover:border-academy-blue/60 hover:text-academy-blue",
    variant === "onDark" && "border border-white/25 text-white hover:bg-white hover:text-academy-navy",
    className
  );
  const onClick = () => event && trackAcademy(event, eventParams);

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} onClick={onClick} className={classes}>
      {children}
    </Link>
  );
}

export function Arrow() {
  return (
    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
      →
    </span>
  );
}

/* ------------------------------------------------------------------- logo */

/**
 * Academy identity mark.
 *
 * For LIGHT backgrounds: renders the logo PNG as-is (navy + blue colours).
 * For DARK backgrounds (onDark): processes the image via canvas on mount to
 * strip the white background and convert dark navy pixels to white, yielding
 * a genuinely transparent-background white+blue logo. Falls back to a CSS
 * filter while the canvas version is being built, and to the typographic
 * lockup before the asset loads at all.
 */
export function AcademyLogo({ className, onDark = false }: { className?: string; onDark?: boolean }) {
  const [ready, setReady] = useState(false);
  /** Canvas-processed data-URL: transparent bg, white text, blue accent. */
  const [darkSrc, setDarkSrc] = useState<string | null>(null);

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => {
      setReady(true);

      // Build the dark-bg version once (client-side only — no CORS required for
      // same-origin assets).
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(img, 0, 0);
        const id = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const d = id.data;
        for (let i = 0; i < d.length; i += 4) {
          const r = d[i], g = d[i + 1], b = d[i + 2];
          // Near-white pixels (the solid background) → transparent.
          if (r > 210 && g > 210 && b > 210) {
            d[i + 3] = 0;
          // Dark navy/grey pixels (DFX + ACADEMY lettering) → pure white so
          // they read clearly on the dark cinematic hero.
          } else if ((r + g + b) / 3 < 90) {
            d[i] = 255; d[i + 1] = 255; d[i + 2] = 255;
          }
          // Blue/gradient pixels (the X accent) are left untouched.
        }
        ctx.putImageData(id, 0, 0);
        setDarkSrc(canvas.toDataURL("image/png"));
      } catch {
        // Canvas tainted by CSP → we keep the CSS filter fallback below.
      }
    };
    img.src = ACADEMY_LOGO_SRC;
  }, []);

  /** Typographic fallback before the asset arrives. */
  if (!ready) {
    return (
      <span
        className={clsx(
          "inline-flex flex-col justify-center leading-none select-none",
          onDark ? "text-white" : "text-academy-navy",
          className
        )}
        aria-label="DFX Academy"
        role="img"
      >
        <span className="text-[1.5em] font-bold tracking-[-0.05em]">
          DF<span className="text-academy-blue">X</span>
        </span>
        <span className="mt-[0.18em] text-[0.42em] font-semibold uppercase tracking-[.42em]">Academy</span>
      </span>
    );
  }

  if (onDark) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={darkSrc ?? ACADEMY_LOGO_SRC}
        alt="DFX Academy"
        className={clsx("w-auto object-contain", className)}
        // CSS filter fallback while canvas version builds (first render only).
        style={!darkSrc ? { filter: "brightness(0) invert(1)" } : undefined}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={ACADEMY_LOGO_SRC}
      alt="DFX Academy"
      className={clsx("w-auto object-contain", className)}
    />
  );
}
