import { Hero } from "@/components/Hero";
import { WhyDFXSolution } from "@/components/WhyDFXSolution";
import { Industries } from "@/components/Industries";
import { Services } from "@/components/Services";
import { Products } from "@/components/Products";
import { Founder } from "@/components/Founder";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyDFXSolution />
      <Industries />
      <Services />
      <Products />
      <Founder />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}
