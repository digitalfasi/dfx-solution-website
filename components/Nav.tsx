"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "#trusted", label: "Work" },
  { href: "#why", label: "Why Us" },
  { href: "#industries", label: "Industries" },
  { href: "#services", label: "Services" },
  { href: "#products", label: "Products" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [onDark, setOnDark] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("lock-scroll", open);
  }, [open]);

  // Adaptive header: crossfades to the reversed (white) treatment the
  // moment the dark Footer scrolls in behind the fixed nav, matching the
  // flat/reversed brand system rather than being locked to one theme.
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const io = new IntersectionObserver(
      ([entry]) => setOnDark(entry.isIntersecting),
      { rootMargin: "-76px 0px 0px 0px", threshold: 0 }
    );
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 backdrop-blur-xl border-b transition-colors duration-500 ${
          onDark ? "bg-tx/70 border-white/10" : "bg-bg/60"
        } ${!onDark && scrolled ? "border-border" : !onDark ? "border-transparent" : ""}`}
      >
        <div className="max-w-container mx-auto container-px h-[76px] flex items-center justify-between">
          <a href="#" className="flex items-center flex-shrink-0">
            <Image
              src="/logo/dfx-solution-logo.png"
              alt="DFX Solution"
              width={800}
              height={427}
              priority
              className="h-10 w-auto transition-[filter] duration-500"
              style={onDark ? { filter: "brightness(0) invert(1)" } : undefined}
            />
          </a>
          <nav className="hidden lg:flex items-center gap-9" aria-label="Primary">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`text-sm transition-colors duration-500 whitespace-nowrap ${
                  onDark ? "text-white/70 hover:text-white" : "text-tx2 hover:text-tx"
                }`}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              className="rounded-xl px-5 py-2.5 text-sm font-semibold bg-gradient-to-br from-primary to-secondary text-white hover:shadow-[0_10px_34px_-8px_rgba(135,119,224,0.45)] transition-shadow whitespace-nowrap"
            >
              Book Strategy Session
            </a>
          </nav>
          <button
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className={`lg:hidden p-2 flex-shrink-0 transition-colors duration-500 ${onDark ? "text-white" : "text-tx"}`}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <nav
        aria-label="Mobile"
        className={`fixed inset-0 z-[45] bg-bg flex flex-col justify-center gap-7 container-px transition-transform duration-500 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-3xl font-bold">
            {l.label}
          </a>
        ))}
        <a href="#contact" onClick={() => setOpen(false)} className="text-3xl font-bold text-highlight">
          Book Strategy Session →
        </a>
      </nav>
    </>
  );
}
