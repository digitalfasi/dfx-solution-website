"use client";

/**
 * DRAFT quotes — written in each client's likely voice/context based on
 * their industry and engagement, but NOT verified statements. Each must be
 * sent to the named person for actual approval or their own edit before
 * this goes live. Do not treat as real endorsements until confirmed.
 */
const TESTIMONIALS = [
  {
    quote: "Our online bookings picked up noticeably once the new site and automation went live — customers actually complete the enquiry now instead of dropping off.",
    name: "Banurekha",
    role: "B Square",
  },
  {
    quote: "Patient appointment reminders used to be a manual, error-prone job for our front desk. Now it runs on its own, and follow-up rates have genuinely improved.",
    name: "Dr. Raquib Abbas",
    role: "Rifa Medical Center",
  },
  {
    quote: "We finally have one place to see what's working — the website, the ads and our reviews all feed into the same picture instead of five different tools.",
    name: "John",
    role: "Rehoboth Crochet",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="section section-tight container-px">
      <div className="max-w-container mx-auto">
        <div className="mb-10">
          <h2 className="font-semibold tracking-tight text-tx text-[clamp(1.9rem,4.2vw,3rem)]">Client feedback.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="rounded-2xl border border-border bg-white shadow-[0_4px_20px_-8px_rgba(24,27,49,0.06)] p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-16px_rgba(135,119,224,0.25)]">
              <p className="font-medium text-tx text-lg leading-snug mb-6">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex-shrink-0" />
                <div>
                  <b className="block text-sm font-semibold text-tx">{t.name}</b>
                  <span className="text-xs text-muted">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
