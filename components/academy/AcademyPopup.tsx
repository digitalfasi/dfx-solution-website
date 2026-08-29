"use client";

import { useEffect, useRef, useState } from "react";
import { X, MessageSquare, CheckCircle2 } from "lucide-react";
import { buildAcademyLeadPayload } from "@/lib/academy/leadAdapter";
import { trackAcademy } from "@/lib/academy/track";
import {
  ENQUIRY_STATUS_OPTIONS,
  ENQUIRY_MODE_OPTIONS,
  whatsappHref,
  DEFAULT_ENQUIRY_MESSAGE,
} from "@/lib/academy/content";

// ── Session storage keys ─────────────────────────────────────────────────────
const SK_SHOWN     = "dfx_academy_popup_shown";
const SK_SUBMITTED = "dfx_academy_popup_submitted";
const DELAY_MS     = 5000;

type PopupState =
  | "idle"
  | "submitting"
  | "success"
  | "error_validation"
  | "error_server"
  | "error_network";

const ERROR_SERVER  = "We couldn't complete your enquiry right now. Please try again or reach us on WhatsApp.";
const ERROR_NETWORK = "Network error — please check your connection and try again.";

// ── Scroll-lock helpers ──────────────────────────────────────────────────────
// Technique: fix body position at the current scroll offset so the page
// doesn't jump, then restore on unlock. Works on mobile Safari too.
function lockScroll() {
  const scrollY = window.scrollY;
  document.body.style.position   = "fixed";
  document.body.style.top        = `-${scrollY}px`;
  document.body.style.left       = "0";
  document.body.style.right      = "0";
  document.body.style.overflowY  = "scroll"; // keep scrollbar width to prevent layout shift
  return scrollY;
}

function unlockScroll(savedScrollY: number) {
  document.body.style.position  = "";
  document.body.style.top       = "";
  document.body.style.left      = "";
  document.body.style.right     = "";
  document.body.style.overflowY = "";
  window.scrollTo({ top: savedScrollY, behavior: "instant" });
}

export function AcademyPopup() {
  const [open,    setOpen]    = useState(false);
  const [started, setStarted] = useState(false);

  // Form state
  const [name,   setName]   = useState("");
  const [phone,  setPhone]  = useState("");
  const [email,  setEmail]  = useState("");
  const [status, setStatus] = useState(ENQUIRY_STATUS_OPTIONS[0]);
  const [mode,   setMode]   = useState(ENQUIRY_MODE_OPTIONS[0]);
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; phone?: string }>({});

  // Submission state
  const [popupState,    setPopupState]    = useState<PopupState>("idle");
  const [serverErrorMsg, setServerErrorMsg] = useState("");

  const submittingRef   = useRef(false);
  const firstFocusRef   = useRef<HTMLButtonElement>(null);
  const triggerRef      = useRef<HTMLElement | null>(null);
  const savedScrollYRef = useRef(0);

  // ── 5-second trigger ─────────────────────────────────────────────────────
  useEffect(() => {
    try {
      if (sessionStorage.getItem(SK_SHOWN) || sessionStorage.getItem(SK_SUBMITTED)) return;
    } catch { return; }

    const timer = setTimeout(() => {
      const existingModal = document.querySelector("[role='dialog'][aria-modal='true']");
      if (existingModal && existingModal !== document.getElementById("ap-dialog")) return;
      setOpen(true);
      try { sessionStorage.setItem(SK_SHOWN, "1"); } catch { /* silent */ }
    }, DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  // ── Focus management ──────────────────────────────────────────────────────
  useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement as HTMLElement;
      trackAcademy("academy_popup_impression", { source: "academy_page_5s_delay" });
      requestAnimationFrame(() => firstFocusRef.current?.focus());
    } else if (triggerRef.current) {
      (triggerRef.current as HTMLElement).focus();
    }
  }, [open]);

  // ── Robust scroll lock ────────────────────────────────────────────────────
  useEffect(() => {
    if (open) {
      savedScrollYRef.current = lockScroll();
    } else {
      unlockScroll(savedScrollYRef.current);
    }
    return () => {
      // Cleanup: always unlock if component unmounts while open
      unlockScroll(savedScrollYRef.current);
    };
  }, [open]);

  // ── Keyboard handler ──────────────────────────────────────────────────────
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") { closePopup(); return; }
    if (e.key === "Tab") {
      const dialog = document.getElementById("ap-dialog");
      if (!dialog) return;
      const focusable = dialog.querySelectorAll<HTMLElement>(
        "button:not([disabled]), input:not([disabled]), select:not([disabled]), a[href]"
      );
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];
      if (!e.shiftKey && document.activeElement === last)  { e.preventDefault(); first.focus(); }
      if ( e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus();  }
    }
  }

  function closePopup() {
    if (popupState === "submitting") return;
    trackAcademy("academy_popup_close", { had_success: popupState === "success" });
    setOpen(false);
  }

  // ── Validation ────────────────────────────────────────────────────────────
  function validate() {
    const errs: { name?: string; phone?: string } = {};
    if (!name.trim() || name.trim().length < 2)
      errs.name = "Please enter your full name (at least 2 characters).";
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 6 || digits.length > 14)
      errs.phone = "Please enter a valid phone number.";
    return errs;
  }

  // ── Submission ────────────────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submittingRef.current || popupState === "submitting") return;
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      setPopupState("error_validation");
      return;
    }
    setFieldErrors({});
    setPopupState("submitting");
    submittingRef.current = true;
    trackAcademy("academy_popup_submit", { source: "academy_popup" });

    const payload = buildAcademyLeadPayload({
      source: "academy_popup_5s",
      name, phone, email, status, mode,
    });

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      let data: { success?: boolean; error?: string; fieldErrors?: Record<string, string> } = {};
      try { data = await res.json(); } catch { /* empty body */ }

      if (res.ok && data.success) {
        try { sessionStorage.setItem(SK_SUBMITTED, "1"); } catch { /* silent */ }
        setPopupState("success");
        trackAcademy("academy_popup_success", { source: "academy_popup" });
      } else if (res.status >= 500) {
        setServerErrorMsg(data.error || ERROR_SERVER);
        setPopupState("error_server");
        trackAcademy("academy_popup_error", { http_status: res.status, source: "academy_popup" });
      } else {
        const msg = data.error || (data.fieldErrors ? Object.values(data.fieldErrors).join(". ") : "Please check your inputs.");
        setServerErrorMsg(msg);
        setPopupState("error_server");
        trackAcademy("academy_popup_error", { http_status: res.status, source: "academy_popup" });
      }
    } catch {
      setServerErrorMsg(ERROR_NETWORK);
      setPopupState("error_network");
      trackAcademy("academy_popup_error", { http_status: 0, source: "academy_popup" });
    } finally {
      submittingRef.current = false;
    }
  }

  function handleRetry() {
    setPopupState("idle");
    setServerErrorMsg("");
    submittingRef.current = false;
  }

  function handleFormStart() {
    if (!started) {
      setStarted(true);
      trackAcademy("academy_popup_form_start", { source: "academy_popup" });
    }
  }

  if (!open) return null;

  const waHref        = whatsappHref(DEFAULT_ENQUIRY_MESSAGE);
  const isSubmitting  = popupState === "submitting";
  const hasServerErr  = popupState === "error_server" || popupState === "error_network";

  // ── Shared input/select classes (white-card theme) ───────────────────────
  const inputCls =
    "w-full rounded-xl border border-[#CBD5E1] bg-white px-4 py-2.5 text-sm text-[#0D1B36] placeholder-slate-400 " +
    "focus:border-[#007BFF] focus:outline-none focus:ring-2 focus:ring-[#007BFF]/20 transition-colors duration-150";

  const selectCls =
    "w-full rounded-xl border border-[#CBD5E1] bg-white px-4 py-2.5 text-sm text-[#0D1B36] " +
    "focus:border-[#007BFF] focus:outline-none focus:ring-2 focus:ring-[#007BFF]/20 transition-colors duration-150";

  const labelCls = "block text-xs font-semibold text-[#475569] mb-1.5 tracking-wide";

  return (
    <>
      {/* ── Keyframe definition ────────────────────────────────────────────── */}
      <style>{`
        @keyframes ap-slide-in {
          from { opacity: 0; transform: translateY(20px) scale(0.975); }
          to   { opacity: 1; transform: translateY(0)    scale(1);     }
        }
        @keyframes ap-slide-in-mobile {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        /* Hide scrollbar visually while keeping scroll functional */
        #ap-body {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        #ap-body::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }
      `}</style>

      {/* ── Root overlay ───────────────────────────────────────────────────── */}
      <div
        className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4"
        aria-hidden="false"
      >
        {/* Backdrop — click to close, does NOT scroll page */}
        <div
          className="absolute inset-0 bg-[#0D1B36]/55 backdrop-blur-[6px]"
          onClick={closePopup}
          aria-hidden="true"
        />

        {/* ── Modal card shell ────────────────────────────────────────────── */}
        <div
          id="ap-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="ap-dialog-title"
          className={[
            "relative z-10 w-full max-w-[500px]",
            // Layout: flex column with overflow-hidden on shell so inner body is the scroll container
            "flex flex-col overflow-hidden",
            // Rounded — bottom-sheet on mobile, card on sm+
            "rounded-t-[24px] sm:rounded-[24px]",
            // White card with subtle navy border + premium shadow
            "bg-white border border-[#CBD5E1]/70",
            "shadow-[0_32px_80px_-8px_rgba(13,27,54,0.22),0_8px_24px_-4px_rgba(0,0,0,0.12)]",
            // Viewport-safe max height
            "max-h-[calc(100dvh-24px)] sm:max-h-[calc(100dvh-48px)]",
            // Entrance animation
            "animate-[ap-slide-in-mobile_0.32s_cubic-bezier(0.16,1,0.3,1)_forwards]",
            "sm:animate-[ap-slide-in_0.32s_cubic-bezier(0.16,1,0.3,1)_forwards]",
          ].join(" ")}
          onKeyDown={handleKeyDown}
        >
          {/* ── Header — shrink-0 non-scrolling child ─────────────────────── */}
          <div className="shrink-0 bg-white border-b border-[#E2E8F0] px-5 sm:px-6 pt-4 sm:pt-5 pb-3.5 flex items-start justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[.3em] text-[#007BFF]">
                DFX ACADEMY ENQUIRY
              </span>
              <h2
                id="ap-dialog-title"
                className="mt-1 text-[1.1rem] sm:text-[1.2rem] font-bold text-[#0D1B36] leading-snug"
              >
                Ready to Turn Learning Into Something Real?
              </h2>
            </div>
            <button
              ref={firstFocusRef}
              type="button"
              onClick={closePopup}
              aria-label="Close enquiry popup"
              className="shrink-0 mt-0.5 flex h-8 w-8 items-center justify-center rounded-full border border-[#CBD5E1] text-[#64748B] hover:border-[#007BFF] hover:text-[#007BFF] focus:outline-none focus:ring-2 focus:ring-[#007BFF]/30 transition-colors duration-200"
            >
              <X className="h-3.5 w-3.5" aria-hidden />
            </button>
          </div>

          {/* ── Body — ONLY scroll container with ample bottom breathing room ── */}
          <div
            id="ap-body"
            className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-5 sm:px-6 pt-4 pb-10 sm:pb-12"
          >

            {/* ── Success state ────────────────────────────────────────── */}
            {popupState === "success" ? (
              <div className="py-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600">
                  <CheckCircle2 className="h-7 w-7" aria-hidden />
                </div>
                <h3 className="mt-5 text-2xl font-bold text-[#0D1B36]">You&apos;re In.</h3>
                <p className="mt-2 text-sm text-[#475569] max-w-[36ch] mx-auto leading-relaxed">
                  Thanks for your interest in DFX Academy. We&apos;ll help you understand the next step.
                </p>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackAcademy("academy_whatsapp_click", { source: "academy_popup_success" })}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#20bd5a] transition-colors duration-200"
                >
                  <MessageSquare className="h-4 w-4" aria-hidden />
                  Connect on WhatsApp
                </a>
                <p className="mt-5 text-[11px] text-[#94A3B8] tracking-wide">
                  Learn. Apply. Build. Grow.
                </p>
              </div>
            ) : (
              <>
                {/* Supporting copy */}
                <p className="text-[13px] sm:text-[14px] text-[#64748B] leading-relaxed mb-5">
                  Explore the AI-integrated digital marketing program, understand the learning path, and find the right way to get started.
                </p>

                {/* ── Server / network error banner ────────────────────── */}
                {hasServerErr && (
                  <div
                    role="alert"
                    className="mb-5 rounded-xl border border-rose-200 bg-rose-50 p-4"
                  >
                    <p className="text-sm font-medium text-rose-700">{serverErrorMsg}</p>
                    <div className="flex flex-wrap items-center gap-4 mt-2.5">
                      <button
                        type="button"
                        onClick={handleRetry}
                        className="text-xs font-semibold text-[#0D1B36] underline underline-offset-2 hover:text-[#007BFF] transition-colors"
                      >
                        Try again
                      </button>
                      <a
                        href={waHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackAcademy("academy_whatsapp_click", { source: "academy_popup_error" })}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#25D366] hover:text-[#20bd5a] transition-colors"
                      >
                        <MessageSquare className="h-3.5 w-3.5" aria-hidden />
                        Reach us on WhatsApp
                      </a>
                    </div>
                  </div>
                )}

                {/* ── Form ─────────────────────────────────────────────── */}
                <form onSubmit={handleSubmit} noValidate className="space-y-4">

                  {/* Full Name */}
                  <div>
                    <label htmlFor="ap-name" className={labelCls}>
                      Full Name <span aria-hidden="true" className="text-rose-500">*</span>
                    </label>
                    <input
                      id="ap-name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="e.g. Rahul Sharma"
                      value={name}
                      onChange={(e) => { setName(e.target.value); handleFormStart(); }}
                      aria-describedby={fieldErrors.name ? "ap-name-err" : undefined}
                      aria-invalid={!!fieldErrors.name}
                      className={inputCls}
                    />
                    {fieldErrors.name && (
                      <p id="ap-name-err" role="alert" className="mt-1.5 text-xs text-rose-600 font-medium">
                        {fieldErrors.name}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="ap-phone" className={labelCls}>
                      Phone / WhatsApp <span aria-hidden="true" className="text-rose-500">*</span>
                    </label>
                    <input
                      id="ap-phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => { setPhone(e.target.value); handleFormStart(); }}
                      aria-describedby={fieldErrors.phone ? "ap-phone-err" : undefined}
                      aria-invalid={!!fieldErrors.phone}
                      className={inputCls}
                    />
                    {fieldErrors.phone && (
                      <p id="ap-phone-err" role="alert" className="mt-1.5 text-xs text-rose-600 font-medium">
                        {fieldErrors.phone}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="ap-email" className={labelCls}>
                      Email{" "}
                      <span className="text-[#94A3B8] font-normal normal-case tracking-normal">
                        (Optional)
                      </span>
                    </label>
                    <input
                      id="ap-email"
                      type="email"
                      autoComplete="email"
                      placeholder="rahul@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={inputCls}
                    />
                  </div>

                  {/* Status + Mode */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="ap-status" className={labelCls}>
                        Current Status <span aria-hidden="true" className="text-rose-500">*</span>
                      </label>
                      <select
                        id="ap-status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className={selectCls}
                      >
                        {ENQUIRY_STATUS_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="ap-mode" className={labelCls}>
                        Preferred Mode <span aria-hidden="true" className="text-rose-500">*</span>
                      </label>
                      <select
                        id="ap-mode"
                        value={mode}
                        onChange={(e) => setMode(e.target.value)}
                        className={selectCls}
                      >
                        {ENQUIRY_MODE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-[#E2E8F0] pt-1" />

                  {/* CTA */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={[
                      "w-full rounded-xl bg-[#007BFF] py-3.5 text-sm font-semibold text-white tracking-wide",
                      "shadow-[0_6px_24px_-6px_rgba(0,123,255,0.40)]",
                      "hover:bg-[#0059C7] hover:shadow-[0_10px_32px_-6px_rgba(0,123,255,0.5)]",
                      "focus:outline-none focus:ring-2 focus:ring-[#007BFF]/40",
                      "disabled:opacity-50 disabled:cursor-not-allowed",
                      "active:scale-[0.985] transition-all duration-200",
                    ].join(" ")}
                  >
                    {isSubmitting ? "Submitting…" : "Start My Journey →"}
                  </button>

                  {/* Trust microcopy */}
                  <p className="text-center text-[11px] text-[#94A3B8] leading-relaxed">
                    Your details are kept confidential. No spam. &nbsp;·&nbsp; Learn. Apply. Build. Grow.
                  </p>

                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
