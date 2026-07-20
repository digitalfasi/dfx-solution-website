"use client";

import { useEffect } from "react";

/** Adds .in-view to any .reveal element once it enters the viewport. */
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    // Trigger well before the element is fully in view (large bottom rootMargin)
    // so nothing sits invisible mid-scroll and reads as a blank gap.
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -5% 0px" }
    );
    els.forEach((el) => io.observe(el));

    // Safety net: if anything is still hidden 1.5s after mount (e.g. an
    // observer edge case on very short viewports), reveal it anyway.
    const fallback = window.setTimeout(() => {
      document.querySelectorAll(".reveal:not(.in-view)").forEach((el) => el.classList.add("in-view"));
    }, 1500);

    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);
}
