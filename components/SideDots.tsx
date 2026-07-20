"use client";

import { useEffect, useState } from "react";

const SECTIONS = ["hero", "why", "industries", "services", "products", "faq", "contact"];

export function SideDots() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const els = SECTIONS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.5 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-30 flex-col gap-3">
      {SECTIONS.map((id) => (
        <a
          key={id}
          href={`#${id}`}
          aria-label={`Go to ${id}`}
          className="group relative flex items-center justify-center w-3 h-3"
        >
          <span
            className={`block rounded-full transition-all duration-300 ${
              active === id ? "w-2.5 h-2.5 bg-highlight" : "w-1.5 h-1.5 bg-border group-hover:bg-secondary"
            }`}
          />
        </a>
      ))}
    </div>
  );
}
