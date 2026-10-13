import { Section } from "./SectionHeading";
import { education, skills } from "@/data/content";

export const EducationSection = () => (
  <Section id="education" title="Education and skills">
    <div className="grid gap-4 md:grid-cols-2">
      <div className="card">
        <p className="font-semibold">{education.school}</p>
        <p className="text-sm text-muted-foreground">{education.degree}</p>
        <p className="text-sm text-muted-foreground">{education.dates}</p>
        <p className="mt-2 text-sm text-muted-foreground">{education.extras}</p>
      </div>
      <dl className="card space-y-2 text-sm">
        {skills.map((s) => (
          <div key={s.label}>
            <dt className="inline font-medium">{s.label}: </dt>
            <dd className="inline text-muted-foreground">{s.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  </Section>
);
