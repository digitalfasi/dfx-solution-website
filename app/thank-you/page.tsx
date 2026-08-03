import { Suspense } from "react";
import type { Metadata } from "next";
import { ThankYouContent } from "./ThankYouContent";

export const metadata: Metadata = {
  title: "Thank You — DFX Solution",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <Suspense fallback={<ThankYouSkeleton />}>
      <ThankYouContent />
    </Suspense>
  );
}

function ThankYouSkeleton() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center container-px py-24">
      <div className="w-10 h-10 rounded-full border-2 border-border border-t-primary animate-spin" aria-hidden="true" />
    </section>
  );
}
