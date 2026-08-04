import { Loader2 } from "lucide-react";
import clsx from "clsx";

export function SubmitButton({ submitting }: { submitting: boolean }) {
  return (
    <button
      type="submit"
      disabled={submitting}
      className={clsx(
        "w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-sm font-semibold text-white",
        "bg-gradient-to-br from-primary to-secondary transition-[transform,box-shadow] duration-300",
        "hover:shadow-[0_10px_34px_-8px_rgba(135,119,224,0.45)] hover:scale-[1.02] active:scale-[0.98]",
        "disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
      )}
    >
      {submitting ? (
        <>
          <Loader2 size={16} className="animate-spin" aria-hidden="true" />
          Sending…
        </>
      ) : (
        "Get My Free AI Growth Strategy"
      )}
    </button>
  );
}
