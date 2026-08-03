"use client";

import { FormProvider } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { useLeadForm } from "@/hooks/useLeadForm";
import { ProgressIndicator } from "./ProgressIndicator";
import { StepPersonalInfo } from "./steps/StepPersonalInfo";
import { StepBusinessInfo } from "./steps/StepBusinessInfo";
import { StepProjectDetails } from "./steps/StepProjectDetails";
import { SubmitButton } from "./SubmitButton";

const STEPS = [StepPersonalInfo, StepBusinessInfo, StepProjectDetails];

export function MultiStepLeadForm() {
  const { form, step, totalSteps, goNext, goBack, onSubmit, state, serverError } = useLeadForm();
  const { register } = form;
  const StepComponent = STEPS[step];
  const isLastStep = step === totalSteps - 1;

  return (
    <FormProvider {...form}>
      <form noValidate onSubmit={onSubmit} className="max-w-[720px] mx-auto text-left relative">
        <ProgressIndicator step={step} totalSteps={totalSteps} />

        {/* Honeypot — hidden from sighted users and screen readers, left open for bots. */}
        <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
          <label htmlFor="companyWebsiteHp">Leave this field empty</label>
          <input id="companyWebsiteHp" type="text" tabIndex={-1} autoComplete="off" {...register("companyWebsiteHp")} />
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <StepComponent />
          </motion.div>
        </AnimatePresence>

        {serverError && (
          <p role="alert" className="mt-4 text-sm text-red-500 text-center">
            {serverError}
          </p>
        )}

        <div className="mt-8 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={goBack}
            className={clsx(
              "rounded-xl px-6 py-3.5 text-sm font-semibold border border-border text-tx bg-white hover:border-secondary hover:bg-cardHover transition-colors duration-300",
              step === 0 && "invisible"
            )}
          >
            Back
          </button>

          {isLastStep ? (
            <SubmitButton submitting={state === "submitting"} />
          ) : (
            <button
              type="button"
              onClick={goNext}
              className="rounded-xl px-7 py-3.5 text-sm font-semibold text-white bg-gradient-to-br from-primary to-secondary hover:shadow-[0_10px_34px_-8px_rgba(135,119,224,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-[transform,box-shadow] duration-300"
            >
              Continue
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
