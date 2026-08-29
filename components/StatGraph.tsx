type Stat = { label: string; value: string; color: string };

/**
 * Live animated SVG chart styled to match the approved glass/glow reference
 * (frosted panel, glowing gradient line, pulsing endpoint, glass stat pills).
 * Kept as real SVG — not a flat image — specifically so the line-draw and
 * pulse animations actually run, matching how Adymize's own chart animates
 * (confirmed via their DOM: it's a live SVG driven by a JS animation
 * library, not a video or static asset).
 */
export function StatGraph({
  points = "10,90 40,55 70,75 100,35 140,60 190,15",
  stats,
}: {
  points?: string;
  stats: [Stat, Stat];
}) {
  const endpoint = points.trim().split(" ").pop()!.split(",").map(Number);

  return (
    <div
      className="relative w-full h-full rounded-2xl p-5 flex flex-col justify-between"
      style={{
        background: "linear-gradient(160deg, rgba(135,119,224,.10), rgba(96,163,230,.10))",
        transform: "perspective(900px) rotateX(2deg) rotateY(-2deg)",
      }}
    >
      <div className="flex-1 relative">
        <svg viewBox="0 0 200 110" className="w-full h-full">
          <defs>
            <linearGradient id="lineGlow" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8777E0" />
              <stop offset="100%" stopColor="#60A3E6" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {[0, 1, 2, 3].map((i) => (
            <line key={i} x1="0" y1={20 + i * 24} x2="200" y2={20 + i * 24} stroke="rgba(24,27,49,0.06)" strokeDasharray="3 4" />
          ))}
          <polyline
            points={points}
            fill="none"
            stroke="url(#lineGlow)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
            className="draw-line"
          />
          <circle cx={endpoint[0]} cy={endpoint[1]} r="4" fill="#fff" stroke="#60A3E6" strokeWidth="2" />
          <circle cx={endpoint[0]} cy={endpoint[1]} r="4" fill="#60A3E6" style={{ animation: "pulseGlow 2s ease-in-out infinite" }} />
        </svg>
      </div>

      <div className="flex gap-3 mt-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex-1 flex items-center gap-2 bg-white/70 backdrop-blur-md rounded-xl px-3 py-2.5 border border-white/60 shadow-[0_8px_24px_-12px_rgba(24,27,49,0.25)]"
          >
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: s.color, boxShadow: `0 0 8px ${s.color}` }} />
            <div className="min-w-0">
              <b className="block text-sm font-semibold text-tx leading-none truncate">{s.value}</b>
              <span className="text-[.62rem] text-muted truncate block">{s.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
