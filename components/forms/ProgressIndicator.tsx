import { Check } from "lucide-react";
import clsx from "clsx";

const STEP_LABELS = ["Personal Info", "Business Info", "Project Details"];

export function ProgressIndicator({ step, totalSteps }: { step: number; totalSteps: number }) {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3 mb-9" aria-hidden="true">
      {Array.from({ length: totalSteps }).map((_, i) => {
        const isComplete = i < step;
        const isCurrent = i === step;
        return (
          <div key={i} className="flex items-center gap-2 sm:gap-3">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={clsx(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors duration-300",
                  isComplete && "bg-gradient-to-br from-primary to-secondary text-white",
                  isCurrent && "border-2 border-primary text-primary bg-white",
                  !isComplete && !isCurrent && "border border-border text-muted bg-white"
                )}
              >
                {isComplete ? <Check size={15} /> : i + 1}
              </div>
              <span
                className={clsx(
                  "hidden sm:block text-xs font-medium whitespace-nowrap",
                  isCurrent ? "text-tx" : "text-muted"
                )}
              >
                {STEP_LABELS[i]}
              </span>
            </div>
            {i < totalSteps - 1 && (
              <div className={clsx("w-8 sm:w-14 h-0.5 rounded-full transition-colors duration-300", isComplete ? "bg-primary" : "bg-border")} />
            )}
          </div>
        );
      })}
    </div>
  );
}
