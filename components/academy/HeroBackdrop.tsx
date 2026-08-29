/**
 * Cinematic backdrop shared by the hero and the closing CTA.
 *
 * When the film exists it plays here. Until then the same frame is carried by
 * a composed light study — navy base, two soft blue light sources, a hairline
 * grid, film grain and a vignette — so the section reads as a designed
 * composition rather than an empty dark rectangle. Nothing here loads an image
 * asset, so it costs no bandwidth and cannot 404.
 */

/** Tiny inline grain — 90 bytes of SVG, no request, no layout cost. */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")";

export function HeroBackdrop({ tone = "hero" }: { tone?: "hero" | "cta" }) {
  return (
    <>
      {/* Base field */}
      <div className="absolute inset-0 bg-academy-navy" />

      {/* Light study — two sources, wide and soft, never neon */}
      <div
        className="absolute inset-0"
        style={{
          background:
            tone === "hero"
              ? "radial-gradient(120% 95% at 78% 18%, rgba(0,123,255,0.34) 0%, rgba(0,123,255,0.07) 42%, transparent 72%), radial-gradient(90% 70% at 8% 92%, rgba(0,123,255,0.16) 0%, transparent 62%)"
              : "radial-gradient(110% 80% at 50% 0%, rgba(0,123,255,0.28) 0%, rgba(0,123,255,0.05) 45%, transparent 72%)",
        }}
      />

      {/* Hairline grid — structure, barely there */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "clamp(70px, 8vw, 132px) clamp(70px, 8vw, 132px)",
          maskImage: "radial-gradient(85% 75% at 50% 40%, #000 0%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(85% 75% at 50% 40%, #000 0%, transparent 85%)",
        }}
      />

      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: GRAIN, backgroundRepeat: "repeat" }}
      />

      {/* Vignette + readability grade */}
      <div className="absolute inset-0 bg-[radial-gradient(115%_95%_at_18%_50%,rgba(13,27,54,0.82)_0%,rgba(13,27,54,0.25)_55%,rgba(13,27,54,0.55)_100%)]" />
    </>
  );
}
