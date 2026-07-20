import Image from "next/image";
import { MagneticButton } from "./MagneticButton";

const CLIENT_LOGOS = [
  { src: "/clients/rifa-medical-center.png", name: "RIFA Medical Center" },
  { src: "/clients/b-square.jpg", name: "B Square" },
  { src: "/clients/rehoboth-crochet.png", name: "Rehoboth Crochet" },
  { src: "/clients/dk-gold.png", name: "DK Gold" },
  { src: "/clients/d2-foils.png", name: "D2 Foils" },
];
const LOOP_LOGOS = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

// Real official logo files — saved to /public/tech/. PNG source is fine;
// grayscale + reduced opacity is applied on top for the monochrome look.
const TECH_STACK = [
  { slug: "google", name: "Google" },
  { slug: "meta", name: "Meta" },
  { slug: "openai", name: "OpenAI" },
  { slug: "shopify", name: "Shopify" },
  { slug: "claude", name: "Claude" },
];

export function Hero() {
  return (
    <section className="relative container-px overflow-hidden bg-[#FCFCFD]" id="hero">
      {/* Very soft ambient glow only — no heavy gradients, no visual clutter */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[560px] h-[560px] bg-primary/[0.06] rounded-full blur-[140px]" aria-hidden="true" />
      <div className="absolute bottom-0 left-1/3 w-[420px] h-[420px] bg-secondary/[0.05] rounded-full blur-[140px]" aria-hidden="true" />

      <div className="relative max-w-container mx-auto w-full flex flex-col items-center text-center">
        {/* Core hero — this is the part that fits in one viewport */}
        <div className="min-h-[100svh] flex flex-col items-center justify-center pt-24 pb-10">
          <div className="max-w-[900px] flex flex-col items-center">
            <p className="inline-flex items-center gap-1.5 sm:gap-2.5 text-[10px] sm:text-xs font-bold tracking-[.08em] sm:tracking-[.18em] uppercase text-highlight mb-6 whitespace-nowrap before:content-[''] before:w-3.5 sm:before:w-5 before:h-px before:bg-secondary before:flex-shrink-0 after:content-[''] after:w-3.5 sm:after:w-5 after:h-px after:bg-secondary after:flex-shrink-0">
              AI-Powered Business Growth Systems
            </p>

            <h1 className="font-semibold tracking-tight leading-[1.08] text-[clamp(2.4rem,6vw,4.75rem)]">
              Grow Smarter.
              <br />
              Scale Faster.
              <br />
              <span className="gradient-text">With One Growth Partner.</span>
            </h1>

            <p className="mt-7 max-w-[700px] text-tx2 text-[clamp(1rem,1.4vw,1.15rem)] leading-relaxed">
              Premium websites, AI-powered marketing, automation and growth systems — built to help ambitious businesses scale with confidence.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <MagneticButton href="#contact" variant="primary">
                Book Your Free Strategy Session <span aria-hidden>→</span>
              </MagneticButton>
              <MagneticButton href="#trusted" variant="ghost">
                Explore Our Work
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Trust marquee — flows naturally below, not squeezed into the viewport lock */}
        <div id="trusted" className="w-full pb-12 md:pb-16">
          <p className="text-xs font-semibold uppercase tracking-[.16em] text-muted mb-7">Trusted by ambitious businesses</p>
          <div className="w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
            <div className="flex items-center gap-20 w-max animate-marquee">
              {LOOP_LOGOS.map((logo, i) => (
                <div key={i} className="relative h-10 w-28 md:h-12 md:w-32 flex-shrink-0 transition-transform duration-300 hover:scale-105">
                  <Image src={logo.src} alt={logo.name} fill className="object-contain" sizes="128px" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technology stack row */}
        <div className="w-full pb-16 md:pb-20">
          <p className="text-xs font-semibold uppercase tracking-[.16em] text-muted mb-7">Powered by industry-leading platforms</p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-14">
            {TECH_STACK.map((t) => (
              <div key={t.slug} className="relative h-7 w-24 md:h-8 md:w-28 opacity-90 hover:opacity-100 transition-opacity duration-300">
                <Image src={`/tech/${t.slug}.png`} alt={t.name} fill className="object-contain" sizes="112px" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
