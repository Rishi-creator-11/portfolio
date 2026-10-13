import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { ExperienceSection } from "../components/ExperienceSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { FitSection } from "../components/FitSection";
import { EducationSection } from "../components/EducationSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";

export const Home = () => (
  <div className="min-h-screen">
    <a href="#main" className="skip-link">Skip to content</a>
    <Navbar />
    <main id="main">
      <HeroSection />
      <ProjectsSection />
      <FitSection />
      <ExperienceSection />
      <EducationSection />
      <ContactSection />
    </main>
    <Footer />
  </div>
);
