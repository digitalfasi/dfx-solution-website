"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type Svc = {
  tag: string;
  badge: string;
  name: string;
  desc: string;
  chips: string[];
  img: string;
  accent: [string, string];
  portrait?: boolean;
};

const FEATURED: Svc[] = [
  { tag: "01", badge: "WEBSITE", name: "Premium Websites", desc: "Engineered to convert, not decorate.", chips: ["Next.js 15", "AI Ready", "SEO Optimized", "Mobile First", "CMS", "Core Web Vitals"], img: "/services/premium-websites.png", accent: ["#8777E0", "#60A3E6"] },
  { tag: "02", badge: "SEO", name: "SEO", desc: "Rankings that compound, not expire.", chips: ["Technical SEO", "Schema Markup", "Core Web Vitals", "AI Search Ready", "Content Ops", "Local SEO"], img: "/services/seo.png", accent: ["#60A3E6", "#8777E0"] },
  { tag: "03", badge: "SOCIAL", name: "Social Media Marketing", desc: "Content that builds an audience, not just impressions.", chips: ["Reels Strategy", "Content Calendar", "Community Mgmt", "Influencer Ready", "Analytics", "Paid Boost"], img: "/services/social-media.png", accent: ["#8777E0", "#C4A2FC"] },
  { tag: "04", badge: "GOOGLE ADS", name: "Google Ads", desc: "Every rupee tracked back to revenue.", chips: ["Search Ads", "Performance Max", "AI Bidding", "Conversion Tracking", "A/B Testing", "ROAS Optimized"], img: "/services/google-ads.png", accent: ["#60A3E6", "#8777E0"] },
  { tag: "05", badge: "META ADS", name: "Meta Ads", desc: "Full-funnel Instagram & Facebook campaigns.", chips: ["Audience Targeting", "Lookalikes", "Retargeting", "Creative Testing", "Pixel Tracking", "Conversion API"], img: "/services/meta-ads.png", accent: ["#8777E0", "#60A3E6"] },
  { tag: "06", badge: "AUTOMATION", name: "AI Automation", desc: "Systems that work while you sleep.", chips: ["WhatsApp Bots", "Workflow Builder", "Lead Scoring", "AI Chat", "CRM Sync", "24/7 Uptime"], img: "/services/ai-automation.png", accent: ["#8777E0", "#60A3E6"] },
  { tag: "07", badge: "CRM", name: "CRM", desc: "Every lead tracked, nothing falls through.", chips: ["Pipeline View", "Task Automation", "Sales Calendar", "Custom Fields", "Team Roles", "Reporting"], img: "/services/crm.png", accent: ["#895ED0", "#8777E0"] },
  { tag: "08", badge: "BRANDING", name: "Branding", desc: "Identity systems that hold up everywhere.", chips: ["Logo Systems", "Color & Type", "Brand Guidelines", "Social Kits", "Packaging", "Print Ready"], img: "/services/branding.png", accent: ["#8777E0", "#895ED0"] },
  { tag: "09", badge: "LEAD GEN", name: "Lead Generation", desc: "A funnel engineered end-to-end.", chips: ["Landing Pages", "AI Lead Scoring", "CRM Connected", "Cost Tracking", "Form Automation", "Instant Follow-up"], img: "/services/lead-generation.png", accent: ["#60A3E6", "#8777E0"], portrait: true },
  { tag: "10", badge: "SAAS", name: "SaaS Solutions", desc: "Products built in-house, sold as tools you use daily.", chips: ["ReviewOS", "CampaignOS", "ERP", "Custom Dashboards", "API Access", "White-label"], img: "/services/saas-solutions.png", accent: ["#8777E0", "#60A3E6"] },
];

/**
 * Photoreal 3D dashboard mockups (AI-generated, branded with the
 * DFX Solution mark) — replaces the coded SVG illustrations. Same floating
 * card + ambient glow language as before, just backed by a real image.
 */
function ServiceImage({ src, alt, accent, portrait }: { src: string; alt: string; accent: [string, string]; portrait?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`relative w-full mx-auto ${portrait ? "max-w-[380px] aspect-[2/3]" : "aspect-[3/2]"}`}
      style={{ perspective: 1200 }}
      animate={reduce ? undefined : { y: [0, -7, 0] }}
      transition={reduce ? undefined : { duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      <div
        className="absolute -inset-8 rounded-full blur-3xl opacity-40 transition-opacity duration-500 group-hover:opacity-70"
        style={{ background: `linear-gradient(135deg, ${accent[0]}, ${accent[1]})` }}
        aria-hidden="true"
      />
      <motion.div
        className="relative w-full h-full rounded-[24px] overflow-hidden border border-white/10 shadow-[0_30px_60px_-20px_rgba(24,27,49,0.4)] bg-[#0B0E23]"
        whileHover={reduce ? undefined : { scale: 1.02, rotateX: 2, rotateY: -2 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 58vw"
        />
      </motion.div>
    </motion.div>
  );
}

/**
 * Deep-dive "product showcase" — every service has its own dedicated
 * illustration (imported from ServiceVisuals, shared with the Why
 * DFX Solution section) so the page stays visually cohesive top to bottom.
 */
export function Services() {
  return (
    <section id="services" className="py-[60px] md:py-[80px] lg:py-[120px] container-px">
      <div className="max-w-container mx-auto">
        <div className="mb-14 lg:mb-20">
          <h2 className="font-semibold tracking-tight text-tx text-[clamp(1.9rem,4.2vw,3rem)]">Our Services.</h2>
          <p className="mt-3 text-muted max-w-[42ch]">Ten systems. Each one shown live — not as an icon.</p>
        </div>

        <div className="flex flex-col gap-24 lg:gap-32">
          {FEATURED.map((c, i) => {
            const alt = i % 2 === 1;
            return (
              <div key={c.name} className="group grid grid-cols-1 lg:grid-cols-[42%_58%] gap-10 lg:gap-16 items-center">
                <div className={`order-2 ${alt ? "lg:order-2" : "lg:order-1"}`}>
                  <span className="inline-block text-xs font-semibold uppercase tracking-[.2em] text-primary bg-glow rounded-full px-3 py-1 mb-5">
                    {c.badge}
                  </span>
                  <h3 className="font-bold text-tx text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] mb-4">{c.name}</h3>
                  <p
                    className="text-lg md:text-xl text-muted mb-6 max-w-[46ch]"
                    style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
                  >
                    {c.desc}
                  </p>

                  <div className="flex flex-wrap gap-2.5 mb-8">
                    {c.chips.map((chip) => (
                      <span
                        key={chip}
                        className="text-sm font-medium text-tx2 bg-white border border-border rounded-full px-4 py-1.5 transition-colors duration-300 hover:border-primary/50 hover:text-primary hover:bg-glow/40"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold bg-gradient-to-br from-primary to-secondary text-white transition-shadow duration-300 hover:shadow-[0_10px_34px_-8px_rgba(135,119,224,0.5)]"
                    >
                      Get Started <span aria-hidden>→</span>
                    </a>
                    <a
                      href="#trusted"
                      className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold border border-border text-tx bg-white transition-colors duration-300 hover:bg-cardHover hover:border-primary/40"
                    >
                      See It Live
                    </a>
                  </div>
                </div>

                <div className={`order-1 ${alt ? "lg:order-1" : "lg:order-2"}`}>
                  <ServiceImage src={c.img} alt={`${c.name} — DFX Solution`} accent={c.accent} portrait={c.portrait} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
