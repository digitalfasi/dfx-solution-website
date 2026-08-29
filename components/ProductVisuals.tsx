"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Glow, Float, Dot } from "./ServiceVisuals";

/**
 * Distinct visual language from the Services illustrations (per brief:
 * "should not look like Services") while still sharing the same glass/
 * gradient primitives (Glow, Float) so it reads as one design system.
 * These are wide dashboard-style panels, not the compact 4:3 service tiles.
 */
function ProductPanel({ children, reduce }: { children: React.ReactNode; reduce: boolean | null }) {
  return (
    <motion.div
      className="relative w-full h-full rounded-[24px] bg-white/95 backdrop-blur-xl border border-white/60 shadow-[0_40px_80px_-24px_rgba(24,27,49,0.35)] overflow-hidden"
      whileHover={reduce ? undefined : { scale: 1.015 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------
   REVIEWOS — large featured dashboard: QR + NFC + Google reviews +
   analytics + AI reply, all in one wide panel.
------------------------------------------------------------------ */
export function VisReviewOS() {
  const reduce = useReducedMotion();
  return (
    <div className="relative w-full aspect-[16/8] md:aspect-[16/7]">
      <Glow from="#8777E0" to="#60A3E6" />
      <ProductPanel reduce={reduce}>
        <div className="h-9 flex items-center gap-1.5 px-5 border-b border-black/5 bg-black/[0.02]">
          <Dot c="#FCA5A5" /><Dot c="#FCD34D" /><Dot c="#6EE7B7" />
          <span className="ml-3 text-[10px] font-semibold uppercase tracking-widest text-muted">ReviewOS Dashboard</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 h-[calc(100%-2.25rem)]">
          {/* QR + NFC */}
          <div className="rounded-xl bg-black/[0.02] border border-black/5 p-4 flex flex-col justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted">Collection</span>
            <div className="flex gap-3 mt-2">
              <div className="w-12 h-12 rounded-md bg-[repeating-conic-gradient(#181B31_0_25%,transparent_0_50%)] bg-[length:6px_6px]" />
              <div className="flex flex-col justify-center gap-1">
                <span className="text-xs font-semibold text-tx">QR Code</span>
                <span className="text-xs text-muted">NFC Tap</span>
              </div>
            </div>
          </div>
          {/* Google reviews */}
          <div className="rounded-xl bg-black/[0.02] border border-black/5 p-4 flex flex-col justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted">Google Reviews</span>
            <div>
              <b className="text-2xl font-bold text-tx block">4.9 ★★★★★</b>
              <span className="text-xs text-muted">312 new this month</span>
            </div>
          </div>
          {/* AI reply */}
          <div className="rounded-xl bg-[#8777E0]/[0.06] border border-[#8777E0]/20 p-4 flex flex-col justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">AI Reply</span>
            <div className="flex flex-col gap-1.5">
              <div className="h-2 w-full rounded-full bg-[#8777E0]/25" />
              <div className="h-2 w-3/4 rounded-full bg-[#8777E0]/25" />
              <div className="h-2 w-1/2 rounded-full bg-[#8777E0]/25" />
            </div>
          </div>
        </div>
      </ProductPanel>
      <Float className="-bottom-5 left-6 w-[26%] h-16" rotate={-3} reduce={reduce}>
        <svg viewBox="0 0 100 40" className="w-full h-full">
          <polyline points="5,32 20,25 35,28 50,15 65,20 80,8 95,5" fill="none" stroke="#60A3E6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Float>
    </div>
  );
}

/* ------------------------------------------------------------------
   AI VOICE AGENT — phone + waveform + campaign analytics
------------------------------------------------------------------ */
export function VisVoiceAgent() {
  const reduce = useReducedMotion();
  return (
    <div className="relative w-full aspect-[4/3.2]">
      <Glow from="#895ED0" to="#60A3E6" />
      <ProductPanel reduce={reduce}>
        <div className="p-6 h-full flex flex-col items-center justify-center gap-4">
          <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg,#8777E0,#60A3E6)" }}>
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#fff" strokeWidth="2">
              <path d="M3 5a2 2 0 0 1 2-2h2.28a1 1 0 0 1 .98.8l1 4a1 1 0 0 1-.27.94L7.4 10.4a12 12 0 0 0 6.2 6.2l1.66-1.6a1 1 0 0 1 .94-.27l4 1a1 1 0 0 1 .8.98V19a2 2 0 0 1-2 2h-1C9.7 21 3 14.3 3 6V5Z" />
            </svg>
          </div>
          <svg viewBox="0 0 200 40" className="w-full h-10">
            {Array.from({ length: 28 }).map((_, i) => (
              <rect key={i} x={i * 7} y={20 - Math.sin(i * 0.9) * 14 - 4} width="3" height={Math.abs(Math.sin(i * 0.9) * 28) + 8} rx="1.5" fill={i % 3 === 0 ? "#8777E0" : "#60A3E6"} opacity={0.8} />
            ))}
          </svg>
        </div>
      </ProductPanel>
      <Float className="-top-4 -right-4 w-[46%]" rotate={4} reduce={reduce}>
        <span className="text-[10px] font-semibold uppercase tracking-widest text-muted">Calls Answered</span>
        <b className="block text-xl font-bold text-tx mt-1">92%</b>
      </Float>
      <Float className="-bottom-4 -left-4 w-[40%]" rotate={-3} reduce={reduce}>
        <span className="text-[10px] font-semibold uppercase tracking-widest text-muted">Coverage</span>
        <b className="block text-xl font-bold text-tx mt-1">24/7</b>
      </Float>
    </div>
  );
}

/* ------------------------------------------------------------------
   TABLE REMINDER — restaurant tablet: QR + food + reminder
------------------------------------------------------------------ */
export function VisTableReminder() {
  const reduce = useReducedMotion();
  return (
    <div className="relative w-full aspect-[4/3.2]">
      <Glow from="#60A3E6" to="#8777E0" />
      <ProductPanel reduce={reduce}>
        <div className="p-6 h-full flex flex-col gap-3 justify-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-[repeating-conic-gradient(#181B31_0_25%,transparent_0_50%)] bg-[length:5px_5px]" />
            <div className="flex-1">
              <div className="h-2.5 w-3/5 rounded-full bg-black/[0.08] mb-1.5" />
              <div className="h-2 w-2/5 rounded-full bg-black/[0.05]" />
            </div>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-[#E8E4FB] to-[#DCEBFB] h-16" />
          <div className="rounded-xl bg-[#8777E0]/[0.08] border border-[#8777E0]/20 p-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#8777E0] flex-shrink-0" />
            <span className="text-xs font-medium text-tx">Reminder sent · Table 12</span>
          </div>
        </div>
      </ProductPanel>
      <Float className="-top-4 -right-4 w-[42%]" rotate={4} reduce={reduce}>
        <span className="text-[10px] font-semibold uppercase tracking-widest text-muted">Repeat Visits</span>
        <b className="block text-xl font-bold text-tx mt-1">+34%</b>
      </Float>
    </div>
  );
}
