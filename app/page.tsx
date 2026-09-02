import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { TrustBar } from "@/components/trust-bar";
import { Services } from "@/components/services";
import { FreeServiceCall } from "@/components/free-service-call";
import { Process } from "@/components/process";
import { Clients } from "@/components/clients";
import { Work } from "@/components/work";
import { About } from "@/components/about";
import { Testimonials } from "@/components/testimonials";
import { ServiceArea } from "@/components/service-area";
import { FAQ } from "@/components/faq";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { MobileCallBar } from "@/components/mobile-call-bar";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Marquee />
        <TrustBar />
        <Services />
        <FreeServiceCall />
        <Process />
        <Clients />
        <Work />
        <About />
        <Testimonials />
        <ServiceArea />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <MobileCallBar />
    </>
  );
}
