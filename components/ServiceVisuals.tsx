"use client";

import { motion, useReducedMotion } from "framer-motion";

/* ---------------------------------------------------------------------
   SHARED DESIGN LANGUAGE — every visual below is built from these three
   primitives so the section stays cohesive even though each composition
   is structurally unique: a blurred gradient glow, a 24px glass panel
   with hover-tilt, and small floating accessory cards.

   Exported so other sections (e.g. "Why DFX Solution") can reuse the exact
   same illustrations instead of creating new ones.
--------------------------------------------------------------------- */
export function Glow({ from, to }: { from: string; to: string }) {
  return (
    <div
      className="absolute -inset-10 rounded-full blur-3xl opacity-50 transition-opacity duration-500 group-hover:opacity-80"
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
      aria-hidden="true"
    />
  );
}

export function Panel({ children, reduce }: { children: React.ReactNode; reduce: boolean | null }) {
  return (
    <motion.div
      className="absolute inset-0 rounded-[24px] bg-white/90 backdrop-blur-xl border border-white/60 shadow-[0_30px_60px_-20px_rgba(24,27,49,0.3)] overflow-hidden"
      whileHover={reduce ? undefined : { scale: 1.02, rotateX: 2, rotateY: -2 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Float({
  className,
  rotate,
  reduce,
  children,
}: {
  className: string;
  rotate: number;
  reduce: boolean | null;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className={`absolute rounded-2xl bg-white shadow-[0_20px_40px_-16px_rgba(24,27,49,0.35)] border border-black/5 p-3.5 ${className}`}
      style={{ rotate }}
      whileHover={reduce ? undefined : { rotate: rotate * 0.4, scale: 1.03 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}

export function Stage({
  accent,
  children,
}: {
  accent: [string, string];
  children: (reduce: boolean | null) => React.ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="relative w-full aspect-[4/3.1]"
      style={{ perspective: 1200 }}
      animate={reduce ? undefined : { y: [0, -7, 0] }}
      transition={reduce ? undefined : { duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      <Glow from={accent[0]} to={accent[1]} />
      {children(reduce)}
    </motion.div>
  );
}

/* small shared bits */
export const Spark = ({ points, color }: { points: string; color: string }) => (
  <svg viewBox="0 0 100 40" className="w-full h-full">
    <polyline points={points} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const Dot = ({ c }: { c: string }) => <span className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />;

/* ---------------------------------------------------------------------
   1. PREMIUM WEBSITES — floating 3D browser with hero UI
--------------------------------------------------------------------- */
export function VisWebsite() {
  return (
    <Stage accent={["#8777E0", "#60A3E6"]}>
      {(reduce) => (
        <>
          <Panel reduce={reduce}>
            <div className="h-8 flex items-center gap-1.5 px-4 border-b border-black/5 bg-black/[0.02]">
              <Dot c="#FCA5A5" /><Dot c="#FCD34D" /><Dot c="#6EE7B7" />
              <div className="ml-3 h-3.5 flex-1 max-w-[120px] rounded-full bg-black/[0.05]" />
            </div>
            <div className="p-6 flex flex-col gap-3">
              <div className="h-4 w-2/5 rounded-full bg-[#8777E0]/25" />
              <div className="h-2.5 w-4/5 rounded-full bg-black/[0.06]" />
              <div className="h-2.5 w-3/5 rounded-full bg-black/[0.06]" />
              <div className="h-9 w-1/3 rounded-lg mt-2" style={{ background: "linear-gradient(135deg,#8777E0,#60A3E6)" }} />
              <div className="h-20 w-full rounded-xl bg-gradient-to-br from-[#E8E4FB] to-[#DCEBFB] mt-2" />
            </div>
          </Panel>
          <Float className="-bottom-6 -left-6 w-[42%]" rotate={-4} reduce={reduce}>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted">Load Time</span>
            <b className="block text-xl font-bold text-tx mt-1">0.9s</b>
          </Float>
          <Float className="-top-5 -right-5 w-[40%] h-14" rotate={3} reduce={reduce}>
            <Spark points="5,32 20,25 35,28 50,15 65,20 80,8 95,5" color="#60A3E6" />
          </Float>
        </>
      )}
    </Stage>
  );
}

/* ---------------------------------------------------------------------
   2. SEO — search results panel + ranking graph
--------------------------------------------------------------------- */
export function VisSEO() {
  return (
    <Stage accent={["#60A3E6", "#8777E0"]}>
      {(reduce) => (
        <>
          <Panel reduce={reduce}>
            <div className="p-5 flex flex-col gap-2.5 h-full">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-muted mb-1">Search Results</span>
              {[0, 1, 2].map((i) => (
                <div key={i} className={`rounded-lg p-2.5 border ${i === 0 ? "border-[#8777E0]/40 bg-[#8777E0]/[0.06]" : "border-black/5"}`}>
                  <div className="flex items-center gap-2 mb-1.5">
                    {i === 0 && <span className="text-[9px] font-bold text-white bg-[#8777E0] rounded px-1.5 py-0.5">#1</span>}
                    <div className={`h-2.5 rounded-full bg-black/[0.08] ${i === 0 ? "w-2/5" : "w-1/3"}`} />
                  </div>
                  <div className="h-2 w-4/5 rounded-full bg-black/[0.05]" />
                </div>
              ))}
            </div>
          </Panel>
          <Float className="-bottom-6 -right-6 w-[46%] h-16" rotate={4} reduce={reduce}>
            <Spark points="5,35 20,30 35,32 50,20 65,22 80,10 95,6" color="#60A3E6" />
          </Float>
          <Float className="-top-5 -left-6 w-[40%]" rotate={-3} reduce={reduce}>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted">Keywords</span>
            <b className="block text-xl font-bold text-tx mt-1">+312</b>
          </Float>
        </>
      )}
    </Stage>
  );
}

/* ---------------------------------------------------------------------
   3. SOCIAL MEDIA MARKETING — feed post + reels card + reach
--------------------------------------------------------------------- */
export function VisSocial() {
  return (
    <Stage accent={["#8777E0", "#C4A2FC"]}>
      {(reduce) => (
        <>
          <Panel reduce={reduce}>
            <div className="p-5 h-full flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#8777E0] to-[#60A3E6]" />
                <div className="h-2.5 w-1/4 rounded-full bg-black/[0.08]" />
              </div>
              <div className="flex-1 rounded-xl bg-gradient-to-br from-[#E8E4FB] to-[#DCEBFB]" />
              <div className="flex items-center gap-3 mt-3 text-[#8777E0]">
                <span>♥</span><span>💬</span><span>↗</span>
                <span className="ml-auto text-[10px] font-semibold text-muted">2,481 likes</span>
              </div>
            </div>
          </Panel>
          <Float className="-top-6 -right-6 w-[30%] aspect-[9/16]" rotate={5} reduce={reduce}>
            <div className="w-full h-full rounded-lg bg-gradient-to-b from-[#8777E0]/20 to-[#60A3E6]/20 flex items-end p-1.5">
              <span className="text-[9px]">▶</span>
            </div>
          </Float>
          <Float className="-bottom-6 -left-6 w-[42%]" rotate={-4} reduce={reduce}>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted">Reach</span>
            <b className="block text-xl font-bold text-tx mt-1">+128%</b>
          </Float>
        </>
      )}
    </Stage>
  );
}

/* ---------------------------------------------------------------------
   4. GOOGLE ADS — campaign dashboard, budget ring, CPC
--------------------------------------------------------------------- */
export function VisGoogleAds() {
  return (
    <Stage accent={["#895ED0", "#60A3E6"]}>
      {(reduce) => (
        <>
          <Panel reduce={reduce}>
            <div className="p-5 h-full flex gap-4 items-center">
              <svg viewBox="0 0 40 40" className="w-16 h-16 flex-shrink-0">
                <circle cx="20" cy="20" r="16" fill="none" stroke="#E8E4FB" strokeWidth="5" />
                <circle cx="20" cy="20" r="16" fill="none" stroke="#8777E0" strokeWidth="5" strokeDasharray="75 100" strokeLinecap="round" transform="rotate(-90 20 20)" />
              </svg>
              <div className="flex-1 flex items-end gap-2 h-16">
                {[40, 65, 30, 80, 55].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t-md" style={{ height: `${h}%`, background: i % 2 ? "#60A3E6" : "#8777E0" }} />
                ))}
              </div>
            </div>
          </Panel>
          <Float className="-bottom-6 -right-6 w-[42%]" rotate={4} reduce={reduce}>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted">CPC</span>
            <b className="block text-xl font-bold text-tx mt-1">-38%</b>
          </Float>
          <Float className="-top-5 -left-6 w-[38%]" rotate={-3} reduce={reduce}>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted">Budget Used</span>
            <b className="block text-xl font-bold text-tx mt-1">75%</b>
          </Float>
        </>
      )}
    </Stage>
  );
}

/* ---------------------------------------------------------------------
   5. META ADS — audience targeting + funnel + engagement
--------------------------------------------------------------------- */
export function VisMetaAds() {
  const pts: [number, number][] = [[50, 45], [30, 30], [70, 30], [25, 62], [75, 60], [50, 20]];
  return (
    <Stage accent={["#60A3E6", "#895ED0"]}>
      {(reduce) => (
        <>
          <Panel reduce={reduce}>
            <div className="relative h-full flex items-center justify-center">
              <svg viewBox="0 0 100 90" className="w-4/5 h-4/5">
                <circle cx="50" cy="45" r="34" fill="none" stroke="#8777E0" strokeOpacity=".25" strokeWidth="1.5" />
                <circle cx="50" cy="45" r="20" fill="none" stroke="#8777E0" strokeOpacity=".4" strokeWidth="1.5" />
                {pts.map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r={i === pts.length - 1 ? 5 : 3.5} fill={i === pts.length - 1 ? "#8777E0" : "#60A3E6"} />
                ))}
              </svg>
            </div>
          </Panel>
          <Float className="-bottom-6 -left-6 w-[42%]" rotate={-4} reduce={reduce}>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted">Conversions</span>
            <b className="block text-xl font-bold text-tx mt-1">+96%</b>
          </Float>
          <Float className="-top-5 -right-6 w-[36%]" rotate={4} reduce={reduce}>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted">Engaged</span>
            <b className="block text-xl font-bold text-tx mt-1">♥ 14.2k</b>
          </Float>
        </>
      )}
    </Stage>
  );
}

/* ---------------------------------------------------------------------
   6. AI AUTOMATION — brain node + connected workflow + WhatsApp
--------------------------------------------------------------------- */
export function VisAutomation() {
  return (
    <Stage accent={["#8777E0", "#60A3E6"]}>
      {(reduce) => (
        <>
          <Panel reduce={reduce}>
            <div className="relative h-full flex items-center justify-center">
              <svg viewBox="0 0 140 100" className="w-full h-full">
                <circle cx="70" cy="50" r="16" fill="url(#brainGrad)" />
                <defs>
                  <radialGradient id="brainGrad"><stop offset="0%" stopColor="#8777E0" /><stop offset="100%" stopColor="#60A3E6" /></radialGradient>
                </defs>
                {[[20, 20], [120, 20], [20, 80], [120, 80]].map(([x, y], i) => (
                  <g key={i}>
                    <line x1="70" y1="50" x2={x} y2={y} stroke="#8777E0" strokeOpacity=".3" strokeWidth="1.5" />
                    <circle cx={x} cy={y} r="8" fill="#fff" stroke="#8777E0" strokeWidth="1.5" />
                  </g>
                ))}
              </svg>
            </div>
          </Panel>
          <Float className="-bottom-6 -right-6 w-[40%]" rotate={4} reduce={reduce}>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted">WhatsApp Bot</span>
            <b className="block text-xl font-bold text-tx mt-1">Active</b>
          </Float>
          <Float className="-top-5 -left-6 w-[36%]" rotate={-3} reduce={reduce}>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted">Uptime</span>
            <b className="block text-xl font-bold text-tx mt-1">24/7</b>
          </Float>
        </>
      )}
    </Stage>
  );
}

/* ---------------------------------------------------------------------
   7. CRM — pipeline columns + calendar + tasks
--------------------------------------------------------------------- */
export function VisCRM() {
  return (
    <Stage accent={["#895ED0", "#8777E0"]}>
      {(reduce) => (
        <>
          <Panel reduce={reduce}>
            <div className="p-4 h-full flex gap-2.5">
              {["New", "Qualified", "Won"].map((label, i) => (
                <div key={label} className="flex-1 rounded-xl bg-black/[0.03] p-2 flex flex-col gap-1.5">
                  <span className="text-[9px] font-semibold text-muted uppercase">{label}</span>
                  {[0, 1].map((r) => (
                    <div key={r} className="h-6 rounded-md" style={{ background: i === 2 ? "#8777E0" : "#fff", border: i === 2 ? "none" : "1px solid rgba(0,0,0,.06)" }} />
                  ))}
                </div>
              ))}
            </div>
          </Panel>
          <Float className="-bottom-6 -left-6 w-[38%]" rotate={-4} reduce={reduce}>
            <div className="grid grid-cols-4 gap-1">
              {Array.from({ length: 8 }).map((_, i) => (
                <span key={i} className="w-2 h-2 rounded-full" style={{ background: i === 3 ? "#8777E0" : "#E8E4FB" }} />
              ))}
            </div>
          </Float>
          <Float className="-top-5 -right-6 w-[38%]" rotate={4} reduce={reduce}>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted">Follow-ups</span>
            <b className="block text-xl font-bold text-tx mt-1">✓ 12</b>
          </Float>
        </>
      )}
    </Stage>
  );
}

/* ---------------------------------------------------------------------
   8. BRANDING — logo mark + palette + typography
--------------------------------------------------------------------- */
export function VisBranding() {
  return (
    <Stage accent={["#8777E0", "#895ED0"]}>
      {(reduce) => (
        <>
          <Panel reduce={reduce}>
            <div className="p-6 h-full flex flex-col justify-center gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full" style={{ background: "linear-gradient(135deg,#8777E0,#60A3E6)" }} />
                <div className="flex gap-1.5">
                  {["#8777E0", "#60A3E6", "#895ED0", "#C4A2FC", "#151A6A"].map((c) => (
                    <span key={c} className="w-5 h-5 rounded-full" style={{ background: c }} />
                  ))}
                </div>
              </div>
              <div className="h-4 w-2/5 rounded-full bg-black/[0.1]" />
              <div className="h-2.5 w-3/5 rounded-full bg-black/[0.05]" />
            </div>
          </Panel>
          <Float className="-bottom-6 -right-6 w-[46%]" rotate={4} reduce={reduce}>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted">Brand Kit</span>
            <b className="block text-sm font-bold text-tx mt-1">Guidelines · v1</b>
          </Float>
        </>
      )}
    </Stage>
  );
}

/* ---------------------------------------------------------------------
   9. LEAD GENERATION — funnel + landing page + AI score
--------------------------------------------------------------------- */
export function VisLeadGen() {
  return (
    <Stage accent={["#60A3E6", "#8777E0"]}>
      {(reduce) => (
        <>
          <Panel reduce={reduce}>
            <div className="h-full flex items-center justify-center p-6">
              <svg viewBox="0 0 120 90" className="w-3/5 h-full">
                <polygon points="10,10 110,10 85,40 35,40" fill="#E8E4FB" />
                <polygon points="35,40 85,40 68,65 52,65" fill="#C4A2FC" />
                <polygon points="52,65 68,65 60,85" fill="#8777E0" />
              </svg>
            </div>
          </Panel>
          <Float className="-top-5 -right-6 w-[40%]" rotate={4} reduce={reduce}>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted">AI Lead Score</span>
            <b className="block text-xl font-bold text-tx mt-1">94/100</b>
          </Float>
          <Float className="-bottom-6 -left-6 w-[42%]" rotate={-4} reduce={reduce}>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted">Cost / Lead</span>
            <b className="block text-xl font-bold text-tx mt-1">₹142</b>
          </Float>
        </>
      )}
    </Stage>
  );
}

/* ---------------------------------------------------------------------
   10. SAAS SOLUTIONS — stacked product dashboards
--------------------------------------------------------------------- */
export function VisSaaS() {
  return (
    <Stage accent={["#8777E0", "#60A3E6"]}>
      {(reduce) => (
        <>
          <div className="absolute inset-x-6 inset-y-3 rounded-[20px] bg-white/60 border border-white/60 rotate-[-4deg]" />
          <div className="absolute inset-x-3 inset-y-1 rounded-[22px] bg-white/80 border border-white/60 rotate-[2deg]" />
          <Panel reduce={reduce}>
            <div className="p-5 h-full flex flex-col gap-2.5">
              <div className="flex gap-2">
                {["ReviewOS", "CampaignOS", "ERP"].map((tag) => (
                  <span key={tag} className="text-[9px] font-semibold text-primary bg-glow rounded-full px-2.5 py-1">{tag}</span>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2 flex-1 mt-1">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="rounded-lg bg-black/[0.04] flex items-end p-1.5">
                    <div className="w-full rounded-sm" style={{ height: `${30 + i * 20}%`, background: i === 1 ? "#8777E0" : "#60A3E6" }} />
                  </div>
                ))}
              </div>
            </div>
          </Panel>
          <Float className="-bottom-6 -right-6 w-[40%]" rotate={4} reduce={reduce}>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted">Rating</span>
            <b className="block text-xl font-bold text-tx mt-1">★ 4.8</b>
          </Float>
        </>
      )}
    </Stage>
  );
}
