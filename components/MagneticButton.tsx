"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import clsx from "clsx";

export function MagneticButton({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  function onMouseMove(e: MouseEvent<HTMLAnchorElement>) {
    if (
      !ref.current ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(pointer: fine)").matches
    )
      return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.12;
    const y = (e.clientY - r.top - r.height / 2) * 0.2;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  }
  function onMouseLeave() {
    if (ref.current) ref.current.style.transform = "";
  }

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={clsx(
        "inline-flex items-center gap-2.5 rounded-xl px-7 py-4 text-sm font-semibold whitespace-nowrap transition-shadow duration-300",
        variant === "primary" &&
          "bg-gradient-to-br from-primary to-secondary text-white hover:shadow-[0_10px_34px_-8px_rgba(135,119,224,0.45)]",
        variant === "ghost" &&
          "border border-border text-tx bg-white/[0.03] hover:bg-card hover:border-secondary",
        className
      )}
    >
      {children}
    </a>
  );
}
