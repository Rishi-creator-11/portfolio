import { Section } from "./SectionHeading";
import { experience, education, skills } from "@/data/content";

export const ExperienceSection = () => (
  <Section id="experience" title="Experience and teaching" tone="alt">
    <div className="space-y-4">
      {experience.map((e) => (
        <article key={`${e.org}-${e.dates}`} className="card">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
            <h3 className="font-semibold">{e.role}</h3>
            <p className="text-sm text-muted-foreground">{e.dates}</p>
          </div>
          <p className="text-sm text-primary font-medium">
            {e.org} <span className="text-muted-foreground font-normal">· {e.place}</span>
          </p>
          <ul className="mt-3 list-disc pl-5 space-y-1.5 text-[15px] text-muted-foreground leading-relaxed">
            {e.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>

    <div className="mt-8 grid gap-4 md:grid-cols-2">
      <div className="card">
        <h3 className="font-semibold">Education</h3>
        <p className="mt-2 text-sm font-medium">{education.school}</p>
        <p className="text-sm text-muted-foreground">{education.degree}</p>
        <p className="text-sm text-muted-foreground">{education.dates}</p>
        <p className="mt-2 text-sm text-muted-foreground">{education.extras}</p>
      </div>
      <div className="card">
        <h3 className="font-semibold">Skills</h3>
        <dl className="mt-2 space-y-2 text-sm">
          {skills.map((s) => (
            <div key={s.label}>
              <dt className="inline font-medium">{s.label}: </dt>
              <dd className="inline text-muted-foreground">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  </Section>
);
