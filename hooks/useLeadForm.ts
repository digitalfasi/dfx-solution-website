"use client";

import { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { leadFormSchema, STEP_FIELDS, type LeadFormSchema } from "@/validation/leadSchema";
import { useUtmParams } from "@/hooks/useUtmParams";
import { captureDeviceContext } from "@/utils/deviceContext";
import type { CreateLeadResponse } from "@/types/lead";

export type LeadFormState = "idle" | "submitting" | "error";

export const TOTAL_STEPS = STEP_FIELDS.length;

const DEFAULT_VALUES: LeadFormSchema = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  countryCode: "+91",
  company: "",
  designation: "",
  website: "",
  linkedin: "",

  industry: "" as LeadFormSchema["industry"],
  companySize: "" as LeadFormSchema["companySize"],
  monthlyRevenue: "",
  currentChannels: [],
  businessLocation: "",
  targetMarket: "",
  marketingBudget: "" as LeadFormSchema["marketingBudget"],
  services: [],

  timeline: "" as LeadFormSchema["timeline"],
  businessChallenge: "",
  goal: "",
  message: "",
  attachmentUrl: "",
  attachmentName: "",
  attachmentSize: undefined,
  attachmentType: "",

  companyWebsiteHp: "",
  formRenderedAt: 0,
  clientRequestId: "",
};

export function useLeadForm() {
  const router = useRouter();
  const attribution = useUtmParams();
  const formRenderedAt = useRef(Date.now());
  const clientRequestId = useRef(crypto.randomUUID());
  const [step, setStep] = useState(0);
  const [state, setState] = useState<LeadFormState>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<LeadFormSchema>({
    resolver: zodResolver(leadFormSchema),
    mode: "onBlur",
    defaultValues: {
      ...DEFAULT_VALUES,
      formRenderedAt: formRenderedAt.current,
      clientRequestId: clientRequestId.current,
    },
  });

  const goNext = useCallback(async () => {
    const fields = STEP_FIELDS[step];
    const valid = await form.trigger(fields, { shouldFocus: true });
    if (valid) setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  }, [form, step]);

  const goBack = useCallback(() => {
    setStep((s) => Math.max(s - 1, 0));
  }, []);

  const goToStep = useCallback((target: number) => {
    setStep(Math.max(0, Math.min(target, TOTAL_STEPS - 1)));
  }, []);

  const onSubmit = form.handleSubmit(async (values) => {
    setState("submitting");
    setServerError(null);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          formRenderedAt: formRenderedAt.current,
          ...attribution,
          ...captureDeviceContext(),
        }),
      });

      const result = (await response.json()) as CreateLeadResponse;

      if (!response.ok || !result.success) {
        if (result.fieldErrors) {
          let firstErrorStep = step;
          for (const [field, message] of Object.entries(result.fieldErrors)) {
            form.setError(field as keyof LeadFormSchema, { type: "server", message });
            const stepOfField = STEP_FIELDS.findIndex((stepFields) =>
              (stepFields as readonly string[]).includes(field)
            );
            if (stepOfField !== -1) firstErrorStep = Math.min(firstErrorStep, stepOfField);
          }
          setStep(firstErrorStep);
        }
        setServerError(result.error || "Something went wrong. Please try again.");
        setState("error");
        return;
      }

      router.push(`/thank-you?leadId=${result.leadId}`);
    } catch {
      setServerError("Network error. Please check your connection and try again.");
      setState("error");
    }
  });

  return { form, step, totalSteps: TOTAL_STEPS, goNext, goBack, goToStep, onSubmit, state, serverError };
}
