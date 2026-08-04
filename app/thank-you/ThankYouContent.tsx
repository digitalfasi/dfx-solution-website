"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import clsx from "clsx";
import type { LeadSummary } from "@/types/lead";
import { PRIMARY_SERVICE_OPTIONS, MARKETING_BUDGET_OPTIONS, TIMELINE_OPTIONS } from "@/types/lead";
import { labelFor } from "@/utils/labels";
import { trackGenerateLead } from "@/utils/analytics";
import { SITE_CONFIG } from "@/lib/config/site";
import { LEAD_SCORE_MAX } from "@/lib/config/leadScoring";

type LoadState = "loading" | "error" | "ready";

const PRIORITY_STYLES: Record<string, string> = {
  HOT: "bg-red-50 text-red-600 border-red-200",
  WARM: "bg-amber-50 text-amber-700 border-amber-200",
  COLD: "bg-blue-50 text-blue-600 border-blue-200",
};

function markTrackedOnce(leadId: string): boolean {
  const flagKey = `dfx_lead_tracked_${leadId}`;
  try {
    if (window.sessionStorage.getItem(flagKey) === "1") return false;
    window.sessionStorage.setItem(flagKey, "1");
    return true;
  } catch {
    return true;
  }
}

export function ThankYouContent() {
  const searchParams = useSearchParams();
  const leadId = searchParams.get("leadId") || "";
  const [state, setState] = useState<LoadState>("loading");
  const [lead, setLead] = useState<LeadSummary | null>(null);
  const trackedRef = useRef(false);

  useEffect(() => {
    if (!leadId) {
      setState("error");
      return;
    }

    let cancelled = false;

    fetch(`/api/leads/${encodeURIComponent(leadId)}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Lead not found");
        return (await res.json()) as LeadSummary;
      })
      .then((data) => {
        if (cancelled) return;
        setLead(data);
        setState("ready");

        if (!trackedRef.current) {
          trackedRef.current = true;
          if (markTrackedOnce(data.leadId)) {
            trackGenerateLead({
              leadId: data.leadId,
              primaryService: data.primaryService,
              marketingBudget: data.marketingBudget,
              leadScore: data.leadScore,
              priority: data.priority,
            });
          }
        }
      })
      .catch(() => {
        if (!cancelled) setState("error");
      });

    return () => {
      cancelled = true;
    };
  }, [leadId]);

  if (state === "loading") {
    return (
      <section className="min-h-[70vh] flex items-center justify-center container-px py-24">
        <div className="w-10 h-10 rounded-full border-2 border-border border-t-primary animate-spin" aria-hidden="true" />
      </section>
    );
  }

  if (state === "error" || !lead) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center container-px py-24 text-center">
        <div>
          <h1 className="font-semibold tracking-tight text-2xl mb-3">We couldn&apos;t find that request</h1>
          <p className="text-tx2 mb-7 max-w-[42ch] mx-auto">
            The link may be incomplete or expired. If you just submitted the form, please reach out on WhatsApp and
            we&apos;ll take it from there.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white bg-gradient-to-br from-primary to-secondary hover:shadow-[0_10px_34px_-8px_rgba(135,119,224,0.45)] transition-shadow duration-300"
            >
              Continue to WhatsApp
            </a>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-tx border border-border bg-white hover:border-secondary transition-colors duration-300"
            >
              Back to Website
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    `Hi DFX Solution, I just booked a strategy session (Ref: ${lead.leadId}).`
  )}`;

  return (
    <section className="container-px py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[620px] mx-auto rounded-2xl border border-border bg-card p-8 md:p-10 shadow-[0_20px_50px_-16px_rgba(135,119,224,0.3)] text-center"
      >
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 18 }}
          className="w-16 h-16 mx-auto mb-5 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
        >
          <CheckCircle2 size={32} className="text-white" aria-hidden="true" />
        </motion.div>

        <h1 className="font-semibold tracking-tight text-2xl md:text-3xl mb-2">
          Thank you, {lead.firstName}! <span aria-hidden="true">🎉</span>
        </h1>
        <p className="text-tx2 mb-6 max-w-[42ch] mx-auto">
          We&apos;ve received your request successfully. Our AI Growth Team will review your requirements and contact
          you within one business day.
        </p>

        <div className="inline-flex flex-col items-center gap-1 rounded-xl bg-glow/40 px-6 py-3 mb-8">
          <span className="text-xs text-muted">Reference ID</span>
          <span className="font-semibold text-tx tracking-wide">{lead.leadId}</span>
        </div>

        <div className="text-left rounded-xl border border-border overflow-hidden mb-8">
          <SummaryRow label="Name" value={lead.fullName} />
          <SummaryRow label="Company" value={lead.company} />
          <SummaryRow label="Email" value={lead.email} />
          <SummaryRow label="Phone" value={lead.phone} />
          <SummaryRow label="Service Needed" value={labelFor(PRIMARY_SERVICE_OPTIONS, lead.primaryService)} />
          <SummaryRow label="Budget" value={labelFor(MARKETING_BUDGET_OPTIONS, lead.marketingBudget)} />
          <SummaryRow label="Timeline" value={labelFor(TIMELINE_OPTIONS, lead.timeline)} />
          <SummaryRow label="Submitted" value={new Date(lead.submittedAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })} />
          <SummaryRow
            label="Status"
            value={
              <span className="inline-block rounded-full bg-glow px-2.5 py-0.5 text-xs font-semibold text-highlight">
                {lead.status}
              </span>
            }
          />
          <SummaryRow label="Lead Score" value={`${lead.leadScore} / ${LEAD_SCORE_MAX}`} />
          <SummaryRow
            label="Priority"
            value={
              <span
                className={clsx(
                  "inline-block rounded-full border px-2.5 py-0.5 text-xs font-semibold",
                  PRIORITY_STYLES[lead.priority]
                )}
              >
                {lead.priority}
              </span>
            }
            last
          />
        </div>

        <div className="grid sm:grid-cols-3 gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold text-white bg-[#25D366] hover:brightness-105 transition-[filter] duration-300"
          >
            Continue to WhatsApp
          </a>
          <a
            href={SITE_CONFIG.anchors.booking}
            className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold text-white bg-gradient-to-br from-primary to-secondary hover:shadow-[0_10px_34px_-8px_rgba(135,119,224,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-[transform,box-shadow] duration-300"
          >
            Schedule a Strategy Call
          </a>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold text-tx border border-border bg-white hover:border-secondary hover:bg-cardHover transition-colors duration-300"
          >
            Back to Website
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

function SummaryRow({ label, value, last }: { label: string; value: React.ReactNode; last?: boolean }) {
  return (
    <div className={clsx("flex items-center justify-between gap-4 px-4 py-3 bg-white", !last && "border-b border-border")}>
      <span className="text-xs font-medium text-muted flex-shrink-0">{label}</span>
      <span className="text-sm text-tx text-right truncate">{value}</span>
    </div>
  );
}
