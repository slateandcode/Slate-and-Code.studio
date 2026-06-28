import Hero from "@/components/home/Hero";
import SelectedWork from "@/components/home/SelectedWork";
import ServiceCards3D from "@/components/home/ServiceCards3D";
import Process from "@/components/home/Process";
import Testimonials from "@/components/home/Testimonials";
import About from "@/components/home/About";
import Convergence from "@/components/home/Convergence";
import CtaSection from "@/components/home/CtaSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <Process />
      <ServiceCards3D />
      <About />
      <Testimonials />
      <Convergence />
      <CtaSection />
    </>
  );
}
