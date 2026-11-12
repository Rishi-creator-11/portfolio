import { GraduationCap, Award, MapPin } from "lucide-react";
import { person, work, skills, education } from "./data.js";
import { Terminal } from "./Interactive.jsx";
import { ProjectsSection } from "./Projects.jsx";
import { ExpertiseRows } from "./Stack.jsx";

const sections = [
  ["Projects", "projects"],
  ["Skills", "skills"],
  ["Education and awards", "education"],
];

export default function About() {
  return (
    <div className="about">
      <header className="about-hero about-hero-tabs">
        <nav className="about-jump" aria-label="On this page">
          {sections.map(([l, id]) => (
            <a key={id} href={`#${id}`}>
              {l}
            </a>
          ))}
        </nav>
      </header>

      <section id="projects" className="about-section" aria-labelledby="projects-title">
        <ProjectsSection />
      </section>

      <section id="skills" className="about-section" aria-labelledby="skills-title">
        <p className="eyebrow">Skills</p>
        <h2 id="skills-title">What I work with</h2>
        <ExpertiseRows />
      </section>

      <section id="education" className="about-section" aria-labelledby="rec-title">
        <p className="eyebrow">Education</p>
        <h2 id="rec-title">Education and awards</h2>
        <div className="skill-card edu edu-wide edu-single">
          <h3>
            <GraduationCap size={18} aria-hidden="true" /> {education.school}
          </h3>
          <p className="edu-loc">
            <MapPin size={14} aria-hidden="true" /> {education.location}
          </p>
          <p className="edu-degree">B.S. Computer Science — Artificial Intelligence &amp; Data Science</p>
          <p className="edu-meta">
            {education.years} · Graduated May 2026 · GPA {education.gpa}
          </p>
          <ul className="edu-awards">
            {education.awards.map((a) => (
              <li key={a.name}>
                <Award size={15} aria-hidden="true" /> <strong>{a.name}.</strong> {a.why}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="about-section" aria-labelledby="play-title">
        <p className="eyebrow">Playground</p>
        <h2 id="play-title">Poke around</h2>
        <div className="play-grid">
          <Terminal />
        </div>
      </section>
    </div>
  );
}
