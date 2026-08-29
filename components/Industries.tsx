"use client";

import { useEffect, useRef } from "react";

/**
 * Image-first, title-only industry cards. Each expects a premium custom
 * visual at the given `image` path (drop the file into /public/industries/
 * with that exact name — no code changes needed). Until that file exists,
 * `fallback` (a mood-matched gradient) shows through gracefully.
 */
const INDUSTRIES = [
  { slug: "healthcare", name: "Healthcare", image: "/industries/healthcare.jpg", fallback: "linear-gradient(160deg,#1B2A6B,#3B5FCC)" },
  { slug: "jewellery", name: "Jewellery", image: "/industries/jewellery.jpg", fallback: "linear-gradient(160deg,#141414,#332818)" },
  { slug: "hospitality", name: "Hospitality", image: "/industries/hospitality.jpg", fallback: "linear-gradient(160deg,#2E2118,#6B4A32)" },
  { slug: "manufacturing", name: "Manufacturing", image: "/industries/manufacturing.jpg", fallback: "linear-gradient(160deg,#1B2230,#3D4759)" },
  { slug: "education", name: "Education", image: "/industries/education.jpg", fallback: "linear-gradient(160deg,#241F5C,#5B4FCF)" },
  { slug: "real-estate", name: "Real Estate", image: "/industries/real-estate.jpg", fallback: "linear-gradient(160deg,#1A2529,#3E5C63)" },
  { slug: "restaurants", name: "Restaurants", image: "/industries/restaurants.jpg", fallback: "linear-gradient(160deg,#26150F,#7A3B2E)" },
  { slug: "smes", name: "Small & Medium Businesses", image: "/industries/smes.jpg", fallback: "linear-gradient(160deg,#1E2436,#4A5578)" },
];

export function Industries() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = gridRef.current?.querySelectorAll<HTMLElement>(".ind-card");
    if (!cards) return;

    if (reduce) {
      cards.forEach((c) => (c.style.opacity = "1"));
      return;
    }

    let ctx: { revert: () => void } | undefined;
    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        ctx = gsap.context(() => {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 32 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.08,
              scrollTrigger: { trigger: gridRef.current, start: "top 85%" },
            }
          );
        });
      });
    });

    return () => ctx?.revert();
  }, []);

  return (
    <section id="industries" className="section section-tight container-px">
      <div className="max-w-container mx-auto">
        <div className="mb-10">
          <h2 className="font-semibold tracking-tight text-tx text-[clamp(1.9rem,4.2vw,3rem)]">Industry We Serve</h2>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {INDUSTRIES.map((ind) => (
            <div
              key={ind.slug}
              className="ind-card group relative rounded-[24px] overflow-hidden cursor-pointer aspect-[3/4] shadow-[0_4px_20px_-8px_rgba(24,27,49,0.15)] transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-2 hover:shadow-[0_30px_60px_-16px_rgba(24,27,49,0.35)]"
              style={{ opacity: 0 }}
            >
              {/* image — ~90% of the card, zooms on hover */}
              <div
                className="absolute inset-0 transition-transform duration-300 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]"
                style={{
                  backgroundImage: `url(${ind.image}), ${ind.fallback}`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              {/* subtle glass edge */}
              <div className="absolute inset-0 rounded-[24px] ring-1 ring-inset ring-white/10" />
              {/* gradient overlay behind title only, for readability */}
              <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <div className="relative z-10 h-full flex items-end p-5">
                <h3 className="font-bold text-white text-xl leading-tight">{ind.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
