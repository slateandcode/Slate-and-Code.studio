import Hero from "@/components/home/Hero";
import SelectedWork from "@/components/home/SelectedWork";
import ServiceCards3D from "@/components/home/ServiceCards3D";
import StudioEdge from "@/components/home/StudioEdge";
import Process from "@/components/home/Process";
import Convergence from "@/components/home/Convergence";
import CtaSection from "@/components/home/CtaSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <ServiceCards3D />
      <StudioEdge />
      <Process />
      <Convergence />
      <CtaSection />
    </>
  );
}
