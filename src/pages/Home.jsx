import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { FeaturedWork } from "../components/FeaturedWork";
import { CaseStudy } from "../components/CaseStudy";
import { HowIWork } from "../components/HowIWork";
import { ExperienceSection } from "../components/ExperienceSection";
import { AviationSection } from "../components/AviationSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";

export const Home = () => (
  <div className="min-h-screen">
    <a href="#main" className="skip-link">Skip to content</a>
    <Navbar />
    <main id="main">
      <HeroSection />
      <FeaturedWork />
      <CaseStudy />
      <HowIWork />
      <ExperienceSection />
      <AviationSection />
      <ContactSection />
    </main>
    <Footer />
  </div>
);
