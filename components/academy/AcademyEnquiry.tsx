"use client";

import { useState, type FormEvent } from "react";
import clsx from "clsx";
import { Reveal, Eyebrow } from "./primitives";
import {
  ACADEMY,
  ENQUIRY_MODE_OPTIONS,
  ENQUIRY_STATUS_OPTIONS,
  whatsappHref,
} from "@/lib/academy/content";
import { trackAcademy } from "@/lib/academy/track";

/**
 * Academy enquiry.
 *
 * There is no Academy lead endpoint yet — the existing /api/leads pipeline is
 * modelled on business project enquiries, not course enquiries — so this
 * composes the enquiry into a prefilled WhatsApp message (with an email
 * fallback) rather than posting to a backend that would silently drop it.
 * TODO: swap `handoff()` for a POST once an Academy lead endpoint exists.
 */

const FIELD =
  "w-full rounded-xl border border-academy-navy/15 bg-white px-4 py-3.5 text-[15px] text-academy-navy placeholder:text-academy-navy/35 transition-colors duration-300 focus:border-academy-blue focus:outline-none";

export function AcademyEnquiry({ compact = false }: { compact?: boolean }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [mode, setMode] = useState("");
  const [error, setError] = useState<string | null>(null);

  function composeMessage() {
    return [
      "Hi DFX Academy, I'd like to enquire about the 8-week AI Digital Marketing program.",
      "",
      `Name: ${name.trim()}`,
      `WhatsApp: ${phone.trim()}`,
      email.trim() ? `Email: ${email.trim()}` : null,
      status ? `Current status: ${status}` : null,
      mode ? `Preferred mode: ${mode}` : null,
    ]
      .filter(Boolean)
      .join("\n");
  }

  function handoff(e: FormEvent) {
    e.preventDefault();
    if (name.trim().length < 2) return setError("Please enter your name.");
    if (phone.replace(/\D/g, "").length < 8) return setError("Please enter a valid WhatsApp number.");
    setError(null);
    trackAcademy("academy_enquiry_submit", { status, mode, has_email: Boolean(email.trim()) });
    trackAcademy("academy_whatsapp_click", { location: "enquiry_form" });
    window.open(whatsappHref(composeMessage()), "_blank", "noopener,noreferrer");
  }

  return (
    <section
      id="enquiry-form"
      className={clsx("container-px bg-academy-tint", compact ? "py-16" : "academy-section")}
    >
      <div className="max-w-container mx-auto">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
          <div>
            <Reveal>
              <Eyebrow>Enquire</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-semibold tracking-[-0.025em] leading-[1.05] text-academy-navy text-[clamp(1.8rem,4vw,2.8rem)]">
                Tell us where you&rsquo;re starting from.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-[44ch] text-[15px] leading-relaxed text-academy-navy/60">
                Send your details and the DFX Academy team will respond with program details and the next batch
                schedule. Your enquiry opens in WhatsApp so you can send it in one tap.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-9 flex flex-col gap-3 text-[14px]">
                <a
                  href={`tel:${ACADEMY.phone}`}
                  onClick={() => trackAcademy("academy_call_click", { location: "enquiry" })}
                  className="text-academy-navy/70 transition-colors duration-300 hover:text-academy-blue"
                >
                  Call {ACADEMY.phoneDisplay}
                </a>
                <a
                  href={`mailto:${ACADEMY.email}?subject=${encodeURIComponent("DFX Academy enquiry")}`}
                  className="text-academy-navy/70 transition-colors duration-300 hover:text-academy-blue"
                >
                  {ACADEMY.email}
                </a>
                <span className="text-academy-navy/45">In-person sessions: {ACADEMY.locationCity}</span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <form
              onSubmit={handoff}
              noValidate
              className="rounded-2xl border border-academy-navy/10 bg-white p-7 sm:p-9"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="ac-name" className="mb-2 block text-[13px] font-medium text-academy-navy/70">
                    Name <span className="text-academy-blue">*</span>
                  </label>
                  <input
                    id="ac-name"
                    name="name"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={FIELD}
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="ac-phone" className="mb-2 block text-[13px] font-medium text-academy-navy/70">
                    WhatsApp number <span className="text-academy-blue">*</span>
                  </label>
                  <input
                    id="ac-phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={FIELD}
                    placeholder="+91 00000 00000"
                  />
                </div>

                <div>
                  <label htmlFor="ac-email" className="mb-2 block text-[13px] font-medium text-academy-navy/70">
                    Email <span className="text-academy-navy/40">(optional)</span>
                  </label>
                  <input
                    id="ac-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={FIELD}
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="ac-status" className="mb-2 block text-[13px] font-medium text-academy-navy/70">
                    Current status
                  </label>
                  <select
                    id="ac-status"
                    name="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className={clsx(FIELD, "appearance-none")}
                  >
                    <option value="">Select</option>
                    {ENQUIRY_STATUS_OPTIONS.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="ac-mode" className="mb-2 block text-[13px] font-medium text-academy-navy/70">
                    Preferred mode
                  </label>
                  <select
                    id="ac-mode"
                    name="mode"
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                    className={clsx(FIELD, "appearance-none")}
                  >
                    <option value="">Select</option>
                    {ENQUIRY_MODE_OPTIONS.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {error && (
                <p role="alert" className="mt-5 text-[13px] font-medium text-[#C0392B]">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="group mt-7 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-academy-blue px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-academy-blueDark hover:shadow-[0_14px_38px_-12px_rgba(0,123,255,0.55)] sm:w-auto"
              >
                Send enquiry on WhatsApp
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>

              <p className="mt-5 text-[12px] leading-relaxed text-academy-navy/45">
                Your details are sent directly to the DFX Academy team on WhatsApp. No enrolment or payment is
                taken on this page.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
