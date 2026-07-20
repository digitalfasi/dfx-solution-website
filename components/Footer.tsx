import Image from "next/image";

const COLUMNS = [
  {
    heading: "Company",
    links: [
      { label: "Why DFX Solution", href: "#why" },
      { label: "Industries", href: "#industries" },
      { label: "Services", href: "#services" },
      { label: "Products", href: "#products" },
      { label: "Client Work", href: "#trusted" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Premium Websites", href: "#services" },
      { label: "AI Search & SEO", href: "#services" },
      { label: "Google & Meta Ads", href: "#services" },
      { label: "AI Automation", href: "#services" },
      { label: "CRM Systems", href: "#services" },
    ],
  },
  {
    heading: "Products",
    links: [
      { label: "ReviewOS", href: "#products" },
      { label: "AI Voice Agent", href: "#products" },
      { label: "Tablet Reminder", href: "#products" },
      { label: "AI LMS — Coming Soon", href: "#products" },
    ],
  },
];

const SOCIALS = [
  { label: "LinkedIn", href: "https://linkedin.com/company/dfxsolution" },
  { label: "Instagram", href: "https://instagram.com/dfxsolution" },
  { label: "X", href: "https://x.com/dfxsolution" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-tx container-px pt-16 pb-10">
      <div className="max-w-container mx-auto">
        <div className="grid lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-12 pb-14">
          {/* Brand block */}
          <div>
            <div className="flex items-center mb-4">
              <Image
                src="/logo/dfx-solution-logo-footer.png"
                alt="DFX Solution"
                width={400}
                height={214}
                className="h-11 w-auto"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </div>
            <p className="text-white/50 text-sm max-w-[34ch] leading-relaxed mb-6">
              AI-powered growth systems for ambitious businesses — websites, SEO, ads, automation, CRM and proprietary AI products, built and run as one connected system.
            </p>
            <a
              href="https://wa.me/919344024373"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/10 rounded-full px-4 py-2.5 transition-colors duration-300"
            >
              Chat on WhatsApp <span aria-hidden>→</span>
            </a>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <b className="text-xs uppercase tracking-[.14em] text-white/40 mb-4 block">{col.heading}</b>
              <div className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <a key={l.label} href={l.href} className="text-sm text-white/65 hover:text-white transition-colors duration-300">
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-6 py-8 border-t border-white/10">
          <div className="flex flex-col gap-1.5">
            <a href="tel:+919344024373" className="text-sm text-white/65 hover:text-white transition-colors duration-300">+91 93440 24373</a>
            <a href="mailto:hello@dfxsolution.com" className="text-sm text-white/65 hover:text-white transition-colors duration-300">hello@dfxsolution.com</a>
          </div>
          <div className="flex gap-6">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="text-sm text-white/65 hover:text-white transition-colors duration-300">
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-4 pt-6 border-t border-white/10 text-xs text-white/40">
          <span>© {new Date().getFullYear()} DFX Solution. All rights reserved.</span>
          <span className="space-x-5">
            <a href="/privacy-policy" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
            <a href="/terms" className="hover:text-white transition-colors duration-300">Terms</a>
            <a href="/sitemap.xml" className="hover:text-white transition-colors duration-300">Sitemap</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
