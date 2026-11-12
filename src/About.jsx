import { GraduationCap, Award, MapPin } from "lucide-react";
import { person, work, skills, education } from "./data.js";
import { Terminal } from "./Interactive.jsx";
import { ExpertiseRows } from "./Stack.jsx";

const sections = [
  ["Experience", "experience"],
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

      <section id="experience" className="about-section" aria-labelledby="exp-title">
        <p className="eyebrow">Experience</p>
        <h2 id="exp-title">Work experience</h2>
        <ol className="timeline">
          {work.map((w) => (
            <li key={w.id} className="timeline-item">
              <div className="timeline-head xp-head">
                <h3>
                  <span className="xp-co">{w.short.co}</span>
                  <span className="xp-dot">·</span>
                  <span className="xp-role">{w.short.role}</span>
                  <span className="xp-loc">{w.short.loc}</span>
                </h3>
                <p className="xp-meta">{w.period} · {w.short.loc}</p>
                <span className="xp-period">{w.period}</span>
              </div>
              <ul className="xp-stats">
                {w.short.stats.map((m) => (
                  <li key={m.l}><b>{m.v}</b> {m.l}</li>
                ))}
              </ul>
              {w.xp ? (
                <ul className="bullets xp-bullets">
                  {w.xp.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              ) : (
                <ul className="bullets xp-bullets">
                  {w.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
              <ul className="tags" aria-label="Technologies">
                {w.stack.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
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
