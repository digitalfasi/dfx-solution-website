import { MultiStepLeadForm } from "@/components/forms/MultiStepLeadForm";

export function FinalCTA() {
  return (
    <section
      id="contact"
      className="border-y border-border text-center container-px py-24 md:py-32 bg-[radial-gradient(circle_at_50%_30%,rgba(135,119,224,.14),transparent_60%)]"
    >
      <div className="reveal max-w-container mx-auto">
        <p className="inline-flex items-center gap-2.5 justify-center text-xs font-bold tracking-[.18em] uppercase text-highlight mb-4">
          Get Started
        </p>
        <h2 className="font-semibold tracking-tight text-[clamp(2rem,4.6vw,3.4rem)] max-w-[18ch] mx-auto mb-4">
          Book Your AI Growth Strategy Session
        </h2>
        <p className="max-w-[46ch] mx-auto mb-10 text-tx2">
          30-minute strategy session. No sales pitch. Get a personalized AI growth roadmap for your business.
        </p>
        <MultiStepLeadForm />
      </div>
    </section>
  );
}
