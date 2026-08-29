"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

// Hash targets are prefixed with "/" so they resolve from any route
// (e.g. the Academy pages), not just the single-page home route.
const LINKS = [
  { href: "/#trusted", label: "Work" },
  { href: "/#why", label: "Why Us" },
  { href: "/#industries", label: "Industries" },
  { href: "/#services", label: "Services" },
  { href: "/#products", label: "Products" },
  { href: "/academy", label: "Academics" },
  { href: "/#faq", label: "FAQ" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const pathname = usePathname();
  // Academy routes sit on navy surfaces; a translucent header over them reads
  // as muddy grey, so the header goes solid there.
  const isAcademy = pathname.startsWith("/academy");

  // Close the mobile sheet on navigation.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("lock-scroll", open);
  }, [open]);

  // Adaptive header: crossfades to the reversed (white) treatment whenever a
  // dark surface sits behind the fixed nav — the Footer, or any section that
  // opts in with `data-nav-dark` (e.g. the Academy cinematic hero).
  useEffect(() => {
    const targets = [
      ...Array.from(document.querySelectorAll("[data-nav-dark]")),
      ...Array.from(document.querySelectorAll("footer")),
    ];
    if (!targets.length) return;
    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
        setOnDark(visible.size > 0);
      },
      { rootMargin: "-76px 0px 0px 0px", threshold: 0 }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 backdrop-blur-xl border-b transition-colors duration-500 ${
          onDark ? "bg-tx/70 border-white/10" : isAcademy ? "bg-bg" : "bg-bg/60"
        } ${!onDark && scrolled ? "border-border" : !onDark ? "border-transparent" : ""}`}
      >
        <div className="max-w-container mx-auto container-px h-[76px] flex items-center justify-between">
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/logo/dfx-solution-logo.png"
              alt="DFX Solution"
              width={800}
              height={427}
              priority
              className="h-10 w-auto transition-[filter] duration-500"
              style={onDark ? { filter: "brightness(0) invert(1)" } : undefined}
            />
          </Link>
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9" aria-label="Primary">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm transition-colors duration-500 whitespace-nowrap ${
                  onDark ? "text-white/70 hover:text-white" : "text-tx2 hover:text-tx"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              className="rounded-xl px-5 py-2.5 text-sm font-semibold bg-gradient-to-br from-primary to-secondary text-white hover:shadow-[0_10px_34px_-8px_rgba(135,119,224,0.45)] transition-shadow whitespace-nowrap"
            >
              Book Strategy Session
            </Link>
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
          <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-3xl font-bold">
            {l.label}
          </Link>
        ))}
        <Link href="/#contact" onClick={() => setOpen(false)} className="text-3xl font-bold text-highlight">
          Book Strategy Session →
        </Link>
      </nav>
    </>
  );
}
