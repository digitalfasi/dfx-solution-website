"use client";

import Image from "next/image";

type Product = {
  image: string;
  label: string;
  name: string;
  desc: string;
  pills: string[];
  cta: string;
  comingSoon?: boolean;
};

const PRODUCTS: Product[] = [
  {
    image: "/products/reviewos.png",
    label: "AI Reputation Management",
    name: "ReviewOS",
    desc: "Collect more Google reviews through QR, NFC and AI-powered review automation while protecting your online reputation.",
    pills: ["QR Reviews", "NFC Tap", "AI Reply", "Dashboard", "Analytics"],
    cta: "Learn More",
  },
  {
    image: "/products/ai-voice-agent.png",
    label: "AI Calling Automation",
    name: "AI Voice Agent",
    desc: "Automate payment reminders, offers, debt collection and customer follow-ups using natural AI voice conversations.",
    pills: ["Outbound Calls", "Campaigns", "Payment Reminder", "Debt Collection", "Voice Analytics"],
    cta: "Learn More",
  },
  {
    image: "/products/tablet-reminder.png",
    label: "Healthcare Automation",
    name: "Tablet Reminder",
    desc: "Automatically remind patients about medicines, follow-up appointments and treatment completion through intelligent healthcare automation.",
    pills: ["Medicine Reminder", "Appointment Reminder", "Patient Engagement", "Healthcare Dashboard", "Follow-ups"],
    cta: "Learn More",
  },
  {
    image: "/products/ai-lms.png",
    label: "Coming Soon",
    name: "AI LMS",
    desc: "A modern AI-powered learning management platform built for schools, coaching centres and educational institutions.",
    pills: ["Student Portal", "Teacher Portal", "Parent Portal", "AI Learning", "ERP Ready"],
    cta: "Coming Soon",
    comingSoon: true,
  },
];

/**
 * Section 5 — DFX Solution Products. 2×2 premium SaaS showcase grid using
 * the real uploaded product dashboard images (unmodified).
 */
export function Products() {
  return (
    <section id="products" className="section section-tight container-px">
      <div className="max-w-container mx-auto">
        <div className="mb-14 lg:mb-16 max-w-[640px]">
          <p className="text-xs font-semibold uppercase tracking-[.2em] text-highlight mb-4">DFX Solution Products</p>
          <h2 className="font-bold text-tx text-[clamp(2rem,4.4vw,3.2rem)] leading-[1.1] mb-4">
            AI Products Built for Real Business Growth.
          </h2>
          <p className="text-muted text-lg leading-relaxed">
            Purpose-built products that automate operations, improve customer experience and help businesses grow faster.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {PRODUCTS.map((p) => (
            <div
              key={p.name}
              className={`group rounded-[28px] md:rounded-[32px] bg-white border border-border shadow-[0_4px_24px_-8px_rgba(24,27,49,0.08)] p-7 md:p-8 flex flex-col transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)] ${
                p.comingSoon
                  ? "opacity-70"
                  : "hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-20px_rgba(135,119,224,0.3)]"
              }`}
            >
              <div className="relative w-full aspect-[4/3] mb-7 overflow-hidden rounded-2xl">
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <div className="relative w-full h-full transition-transform duration-300 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.03]">
                    <Image src={p.image} alt={`${p.name} product preview`} fill className="object-contain" sizes="(min-width: 768px) 45vw, 90vw" />
                  </div>
                </div>
              </div>

              <span
                className={`inline-block self-start text-[.68rem] font-semibold uppercase tracking-[.14em] rounded-full px-3 py-1 mb-4 ${
                  p.comingSoon ? "text-muted bg-cardHover" : "text-primary bg-glow"
                }`}
              >
                {p.label}
              </span>
              <h3 className="font-bold text-tx text-2xl mb-2.5">{p.name}</h3>
              <p className="text-muted text-sm md:text-base mb-5 max-w-[52ch]">{p.desc}</p>

              <div className="flex flex-wrap gap-2 mb-7">
                {p.pills.map((pill) => (
                  <span key={pill} className="text-xs font-medium text-tx2 bg-cardHover rounded-full px-3 py-1.5">
                    {pill}
                  </span>
                ))}
              </div>

              <div className="mt-auto">
                {p.comingSoon ? (
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-muted cursor-not-allowed">
                    {p.cta}
                  </span>
                ) : (
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all duration-300 group-hover:gap-3"
                  >
                    {p.cta} <span aria-hidden>→</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
