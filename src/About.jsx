import { GraduationCap, Award } from "lucide-react";
import { person, work, skills, education } from "./data.js";
import Stack from "./Stack.jsx";

const sections = [
  ["Experience", "experience"],
  ["Skills", "skills"],
  ["Education", "education"],
];

export default function About() {
  return (
    <div className="about">
      <header className="about-hero">
        <p className="status">
          <span className="pulse" aria-hidden="true" />
          Open to new roles, collabs and anything AI
        </p>
        <h1>About me</h1>
        <p className="hero-sub">
          I'm {person.name}. 22, Stony Brook Computer Science grad (specialized in AI and Data Science, 2022 – 2026), and I spend most of my days building with AI in New York.
        </p>
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
        <h2 id="skills-title">Tools that made the cut</h2>
        <p className="st-lede">The ones I reach for most. Every project page lists the full stack it was built with.</p>
        <Stack />
      </section>

      <section id="education" className="about-section" aria-labelledby="rec-title">
        <p className="eyebrow">Education</p>
        <h2 id="rec-title">Education and awards</h2>
        <div className="skill-card edu edu-wide">
          <h3>
            <GraduationCap size={16} aria-hidden="true" /> {education.school}
          </h3>
          <p>{education.degree}</p>
          <p className="edu-meta">
            {education.grad}. GPA {education.gpa}.
          </p>
        </div>
        <div className="skill-grid">
          {education.awards.map((a) => (
            <div className="skill-card award" key={a}>
              <h3>
                <Award size={16} aria-hidden="true" /> {a}
              </h3>
              <p className="edu-meta">{education.school}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
