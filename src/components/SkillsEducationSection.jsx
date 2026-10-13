import { Section } from "./SectionHeading";
import { highlights, skills, education as ed } from "@/data/content";

export const SkillsEducationSection = () => (
  <Section id="skills" title="Education and skills">
    <div className="grid gap-5 md:grid-cols-2">
      <div className="card">
        <h3 className="font-semibold">Tools used in projects</h3>
        <dl className="mt-3 space-y-2 text-base">
          {highlights.map((s) => (
            <div key={s.label}>
              <dt className="font-medium text-primary">{s.label}</dt>
              <dd className="text-muted-foreground">{s.value}</dd>
            </div>
          ))}
        </dl>
        <h3 className="mt-5 font-semibold">All skills</h3>
        <dl className="mt-3 space-y-2 text-base">
          {skills.map((s) => (
            <div key={s.label}>
              <dt className="inline font-medium">{s.label}: </dt>
              <dd className="inline text-muted-foreground">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="card self-start">
        <h3 className="font-semibold">Education</h3>
        <p className="mt-3 font-medium">{ed.school}</p>
        <p className="text-sm">{ed.degree}</p>
        <p className="text-base text-muted-foreground">{ed.specialization}</p>
        <p className="text-base text-muted-foreground">{ed.dates}</p>
        <ul className="mt-3 list-disc pl-5 text-base text-muted-foreground space-y-0.5">
          {ed.extras.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </div>
    </div>
  </Section>
);
