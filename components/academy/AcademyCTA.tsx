"use client";

import { useState } from "react";
import { MessageSquare, ArrowRight, CheckCircle2 } from "lucide-react";
import { Reveal, Eyebrow } from "./primitives";
import { ENQUIRY_STATUS_OPTIONS, ENQUIRY_MODE_OPTIONS, whatsappHref, DEFAULT_ENQUIRY_MESSAGE } from "@/lib/academy/content";

import { buildAcademyLeadPayload } from "@/lib/academy/leadAdapter";

/**
 * Section 06: FINAL MOTIVATIONAL CTA & ENQUIRY FORM
 * Confident invitation to convert interest into real action.
 */
export function AcademyCTA() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(ENQUIRY_STATUS_OPTIONS[0]);
  const [mode, setMode] = useState(ENQUIRY_MODE_OPTIONS[0]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || submitting) return;
    setSubmitting(true);
    setErrorMessage("");

    const payload = buildAcademyLeadPayload({
      source: "academy_hub_cta",
      name,
      phone,
      email,
      status,
      mode,
    });

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        const errorText = data.error || (data.fieldErrors ? Object.values(data.fieldErrors).join(", ") : "Check your inputs and try again.");
        setErrorMessage(errorText);
      }
    } catch {
      setErrorMessage("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const customMessage = `Hi DFX Academy, I am ${name || "a learner"} (${status}). I'd like to enquire about the 8-week AI-Integrated Digital Marketing program (${mode} mode). My phone: ${phone}.`;

  return (
    <section id="enquire" className="academy-section container-px relative overflow-hidden bg-academy-navy py-16 lg:py-24 text-white">
      {/* Background glow accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 right-1/4 h-96 w-96 rounded-full bg-academy-blue/10 blur-3xl"
      />

      <div className="max-w-container mx-auto relative z-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
          {/* LEFT: Motivational Copy & Direct WhatsApp Link */}
          <div>
            <Reveal>
              <Eyebrow onDark>Start Your Journey</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 font-semibold leading-[1.08] tracking-[-0.035em] text-white text-[clamp(2.2rem,4vw,3.6rem)]">
                Your Next Opportunity Starts With What You <span className="text-academy-blue">Learn Today.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-[50ch] text-[15px] sm:text-[17px] leading-relaxed text-white/75">
                Learn practical skills. Build real work. Create your portfolio. Start applying what you know into real-world business and career growth.
              </p>
            </Reveal>

            {/* Micro Highlights */}
            <div className="mt-8 flex flex-col gap-3">
              {[
                "8-Week Live Practical Program",
                "AI Workflows Integrated Across All Modules",
                "Real Portfolio Deliverables & Practical Execution",
                "Certificate & Practitioner Mentorship",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-white/85">
                  <CheckCircle2 className="h-4 w-4 text-academy-blue shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Direct WhatsApp Action */}
            <div className="mt-9">
              <a
                href={whatsappHref(DEFAULT_ENQUIRY_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform duration-200 hover:scale-105 hover:bg-[#20bd5a]"
              >
                <MessageSquare className="h-5 w-5" />
                Enquire via WhatsApp Direct
              </a>
              <p className="mt-3 text-xs text-white/50">
                Quick responses from the DFX Academy team.
              </p>
            </div>
          </div>

          {/* RIGHT: Clean Enquiry Form */}
          <Reveal delay={0.15}>
            <div className="rounded-3xl bg-white/5 border border-white/12 p-7 sm:p-9 backdrop-blur-xl shadow-2xl">
              <div className="border-b border-white/10 pb-5">
                <span className="text-[10px] font-bold uppercase tracking-[.28em] text-academy-blue">
                  DFX ACADEMY ENQUIRY
                </span>
                <h3 className="mt-1 text-xl sm:text-2xl font-bold text-white">
                  Get Program & Cohort Details
                </h3>
              </div>

              {submitted ? (
                <div className="py-10 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-academy-blue/20 text-academy-blue border border-academy-blue/30">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h4 className="mt-4 text-xl font-bold text-white">Enquiry Received!</h4>
                  <p className="mt-2 text-sm text-white/70">
                    Thank you, {name}. The DFX Academy team will connect with you shortly with cohort schedules.
                  </p>
                  <a
                    href={whatsappHref(customMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-academy-blue px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-md hover:bg-blue-600"
                  >
                    Continue to WhatsApp <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  {errorMessage && (
                    <div className="flex items-center gap-2 rounded-xl bg-red-500/20 border border-red-500/30 p-3 text-xs font-medium text-red-200">
                      <span>{errorMessage}</span>
                    </div>
                  )}
                  <div>
                    <label className="block text-xs font-medium text-white/80 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl bg-white/10 border border-white/15 px-4 py-3 text-sm text-white placeholder-white/40 focus:border-academy-blue focus:outline-none focus:ring-1 focus:ring-academy-blue"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-medium text-white/80 mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-xl bg-white/10 border border-white/15 px-4 py-3 text-sm text-white placeholder-white/40 focus:border-academy-blue focus:outline-none focus:ring-1 focus:ring-academy-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-white/80 mb-1">
                        Email (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="rahul@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl bg-white/10 border border-white/15 px-4 py-3 text-sm text-white placeholder-white/40 focus:border-academy-blue focus:outline-none focus:ring-1 focus:ring-academy-blue"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-medium text-white/80 mb-1">
                        Current Status
                      </label>
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full rounded-xl bg-[#132446] border border-white/15 px-4 py-3 text-sm text-white focus:border-academy-blue focus:outline-none"
                      >
                        {ENQUIRY_STATUS_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-white/80 mb-1">
                        Preferred Mode
                      </label>
                      <select
                        value={mode}
                        onChange={(e) => setMode(e.target.value)}
                        className="w-full rounded-xl bg-[#132446] border border-white/15 px-4 py-3 text-sm text-white focus:border-academy-blue focus:outline-none"
                      >
                        {ENQUIRY_MODE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full mt-2 rounded-xl bg-academy-blue py-3.5 text-sm font-semibold uppercase tracking-wider text-white shadow-lg transition-transform duration-200 hover:bg-blue-600 disabled:opacity-50"
                  >
                    {submitting ? "Submitting..." : "Send Enquiry"}
                  </button>

                  <p className="text-[11px] text-center text-white/50">
                    No spam. Your contact details are kept strictly confidential.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
