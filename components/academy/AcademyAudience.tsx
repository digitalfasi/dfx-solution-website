"use client";

import { useState, useEffect, useCallback } from "react";
import { Reveal, Eyebrow } from "./primitives";
import { ArrowRight, X, CheckCircle2, AlertCircle } from "lucide-react";
import { ENQUIRY_STATUS_OPTIONS, ENQUIRY_MODE_OPTIONS } from "@/lib/academy/content";

const AUDIENCE_CARDS = [
  {
    image: "/images/academy/audience-students.jpg",
    label: "FOR STUDENTS",
    title: "Students & Freshers",
    desc: "Build practical skills & a portfolio that gets you hired.",
    statusValue: "Student / Fresher",
  },
  {
    image: "/images/academy/audience-working-prof.jpg",
    label: "FOR PROFESSIONALS",
    title: "Working Professionals",
    desc: "Upgrade your skills and grow faster in your career.",
    statusValue: "Working professional",
  },
  {
    image: "/images/academy/audience-homemakers.jpg",
    label: "FOR RETURNERS",
    title: "Career Returners & Homemakers",
    desc: "Restart your career with in-demand digital marketing skills.",
    statusValue: "Aspiring freelancer",
  },
  {
    image: "/images/academy/audience-business.jpg",
    label: "FOR ENTREPRENEURS",
    title: "Small-Business Owners",
    desc: "Learn digital strategies to grow your business profitably.",
    statusValue: "Business owner",
  },
];

import { buildAcademyLeadPayload } from "@/lib/academy/leadAdapter";

/**
 * Section 03: WHO IT'S FOR — Premium visual audience cards with "Enquiry Now →" CTA and interactive modal.
 */
export function AcademyAudience() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>(ENQUIRY_STATUS_OPTIONS[0]);
  
  // Form State inside Modal
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [mode, setMode] = useState<string>(ENQUIRY_MODE_OPTIONS[0]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const openEnquiryModal = (statusValue: string) => {
    setSelectedStatus(statusValue);
    setSubmitted(false);
    setErrorMessage("");
    setModalOpen(true);
  };

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  // Lock body scroll when modal is active & listen to Escape key
  useEffect(() => {
    if (!modalOpen) return;
    document.body.style.overflow = "hidden";
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalOpen, closeModal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || submitting) return;
    setSubmitting(true);
    setErrorMessage("");

    const payload = buildAcademyLeadPayload({
      source: "academy_audience_modal",
      name,
      phone,
      email,
      status: selectedStatus,
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
      setErrorMessage("Network error. Please check your connection.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="audience" className="academy-section container-px relative overflow-hidden bg-[#F7FAFC] py-16 lg:py-24">
      <div className="max-w-container mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <Eyebrow>Who It&apos;s For</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-semibold leading-[1.08] tracking-[-0.035em] text-academy-navy text-[clamp(2rem,3.6vw,3.1rem)]">
              Built For People Who Want <span className="text-academy-blue">Practical Skills.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-[15px] sm:text-[16px] leading-relaxed text-academy-navy/70">
              Whether you are launching your career, upgrading your skills, or expanding a business, DFX Academy focuses on real execution.
            </p>
          </Reveal>
        </div>

        {/* 4 Premium Audience Cards Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {AUDIENCE_CARDS.map((card, i) => (
            <Reveal key={card.title} delay={0.07 * i} className="h-full">
              <button
                type="button"
                onClick={() => openEnquiryModal(card.statusValue)}
                className="h-full w-full text-left flex flex-col overflow-hidden rounded-[20px] bg-white border border-academy-navy/10 shadow-xs transition-all duration-300 hover:shadow-lg hover:border-academy-blue/50 group focus:outline-none focus:ring-2 focus:ring-academy-blue/40 cursor-pointer"
              >
                {/* Real Photography Image Frame */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-academy-navy">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Card Body */}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[.22em] text-academy-blue">
                      {card.label}
                    </span>
                    <h3 className="mt-1.5 text-[17px] font-bold text-academy-navy leading-snug group-hover:text-academy-blue transition-colors duration-200">
                      {card.title}
                    </h3>
                    <p className="mt-2.5 text-[13.5px] leading-relaxed text-academy-navy/70">
                      {card.desc}
                    </p>
                  </div>

                  {/* Action Link — Updated CTA to "Enquiry Now →" */}
                  <div className="mt-5 border-t border-academy-navy/8 pt-3.5 flex items-center justify-between text-xs font-semibold text-academy-navy/70 group-hover:text-academy-blue transition-colors duration-200">
                    <span>Enquiry Now</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ── PREMIUM ENQUIRY MODAL / DIALOG ── */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-lg rounded-[24px] bg-white p-7 sm:p-9 shadow-2xl border border-academy-navy/12 text-academy-navy max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-academy-navy/5 text-academy-navy/60 hover:bg-academy-navy/10 hover:text-academy-navy transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            {submitted ? (
              <div className="py-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 border border-emerald-200">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-academy-navy">Enquiry Received!</h3>
                <p className="mt-2 text-sm text-academy-navy/70 leading-relaxed">
                  Thank you, <span className="font-semibold">{name}</span>. Our team will get in touch with you shortly to help you find the right learning path.
                </p>
                <button
                  type="button"
                  onClick={closeModal}
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-academy-blue px-7 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-md hover:bg-blue-600 transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <div>
                <div className="border-b border-academy-navy/10 pb-4">
                  <span className="text-[10px] font-bold uppercase tracking-[.28em] text-academy-blue">
                    DFX ACADEMY ENQUIRY
                  </span>
                  <h3 className="mt-1 text-2xl font-bold text-academy-navy">
                    Let&apos;s Start Your Journey.
                  </h3>
                  <p className="mt-1.5 text-xs text-academy-navy/65 leading-relaxed">
                    Tell us a little about yourself and we&apos;ll help you find the right learning path.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                  {errorMessage && (
                    <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 p-3 text-xs font-medium text-red-700">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-academy-navy mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl bg-[#F7FAFC] border border-academy-navy/15 px-4 py-2.5 text-sm text-academy-navy placeholder-academy-navy/40 focus:border-academy-blue focus:outline-none focus:ring-1 focus:ring-academy-blue"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold text-academy-navy mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-xl bg-[#F7FAFC] border border-academy-navy/15 px-4 py-2.5 text-sm text-academy-navy placeholder-academy-navy/40 focus:border-academy-blue focus:outline-none focus:ring-1 focus:ring-academy-blue"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-academy-navy mb-1">
                        Email (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="rahul@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl bg-[#F7FAFC] border border-academy-navy/15 px-4 py-2.5 text-sm text-academy-navy placeholder-academy-navy/40 focus:border-academy-blue focus:outline-none focus:ring-1 focus:ring-academy-blue"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold text-academy-navy mb-1">
                        Current Status
                      </label>
                      <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="w-full rounded-xl bg-[#F7FAFC] border border-academy-navy/15 px-4 py-2.5 text-sm text-academy-navy focus:border-academy-blue focus:outline-none"
                      >
                        {ENQUIRY_STATUS_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-academy-navy mb-1">
                        Preferred Mode
                      </label>
                      <select
                        value={mode}
                        onChange={(e) => setMode(e.target.value)}
                        className="w-full rounded-xl bg-[#F7FAFC] border border-academy-navy/15 px-4 py-2.5 text-sm text-academy-navy focus:border-academy-blue focus:outline-none"
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
                    className="w-full mt-3 rounded-xl bg-academy-blue py-3.5 text-sm font-semibold uppercase tracking-wider text-white shadow-md transition-all duration-200 hover:bg-blue-600 disabled:opacity-50 cursor-pointer"
                  >
                    {submitting ? "Submitting..." : "Send Enquiry"}
                  </button>

                  <p className="text-[11px] text-center text-academy-navy/50">
                    No spam. Your contact details are kept strictly confidential.
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
