import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Capabilities from "@/components/Capabilities";
import Services from "@/components/Services";
import CaseStudies from "@/components/CaseStudies";
import WhyUs from "@/components/WhyUs";
import ContactFooter from "@/components/ContactFooter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Nav />
      <Hero />
      <About />
      <Capabilities />
      <Services />
      <CaseStudies />
      <WhyUs />
      <ContactFooter />
      <Footer />
    </main>
  );
}
