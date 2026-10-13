import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { ExperienceSection } from "../components/ExperienceSection";
import { FlygreenSection } from "../components/FlygreenSection";
import { SkillsEducationSection } from "../components/SkillsEducationSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";

export const Home = () => (
  <div className="min-h-screen">
    <a href="#main" className="skip-link">Skip to content</a>
    <Navbar />
    <main id="main">
      <HeroSection />
      <ProjectsSection />
      <ExperienceSection />
      <FlygreenSection />
      <SkillsEducationSection />
      <ContactSection />
    </main>
    <Footer />
  </div>
);
