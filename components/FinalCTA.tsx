"use client";

import { useState } from "react";

export function FinalCTA() {
  const [sent, setSent] = useState(false);
  return (
    <section
      id="contact"
      className="border-y border-border text-center container-px py-24 md:py-32 bg-[radial-gradient(circle_at_50%_30%,rgba(135,119,224,.14),transparent_60%)]"
    >
      <div className="reveal max-w-container mx-auto">
        <p className="inline-flex items-center gap-2.5 justify-center text-xs font-bold tracking-[.18em] uppercase text-highlight mb-4">
          Get Started
        </p>
        <h2 className="font-semibold tracking-tight text-[clamp(2rem,4.6vw,3.4rem)] max-w-[18ch] mx-auto mb-4">
          Book Your AI Growth Strategy Session
        </h2>
        <p className="max-w-[42ch] mx-auto mb-8 text-tx2">
          30 minutes. No pitch deck. A clear map of what to build first.
        </p>
        {sent ? (
          <p className="text-highlight font-semibold">Request received — we&apos;ll be in touch within 24 hours.</p>
        ) : (
          <form
            className="flex gap-3 max-w-[520px] mx-auto flex-wrap justify-center"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <input
              type="email"
              required
              placeholder="Your work email"
              className="flex-1 min-w-[220px] bg-card border border-border rounded-xl text-tx text-sm px-4 py-3.5 outline-none focus:border-secondary transition-colors"
            />
            <button
              type="submit"
              className="rounded-xl px-7 py-3.5 text-sm font-semibold bg-gradient-to-br from-primary to-secondary text-white hover:shadow-[0_10px_34px_-8px_rgba(135,119,224,0.45)] transition-shadow"
            >
              Book Session →
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
