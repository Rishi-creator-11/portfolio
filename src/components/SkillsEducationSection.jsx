import { Section } from "./SectionHeading";
import { skills, education as ed, teaching as t } from "@/data/content";

export const SkillsEducationSection = () => (
  <Section id="skills" title="Education and skills" theme="alt">
    <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
      <div className="space-y-10">
        <div>
          <h3 className="font-display text-2xl font-semibold">Education</h3>
          <p className="mt-3 text-lg font-medium">{ed.school}</p>
          <p>{ed.degree}</p>
          <p className="text-muted-foreground">{ed.specialization}</p>
          <p className="text-muted-foreground">{ed.dates}</p>
          <ul className="mt-3 list-disc space-y-0.5 pl-5 text-muted-foreground">
            {ed.extras.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-display text-2xl font-semibold">Teaching</h3>
          <p className="mt-3 text-lg font-medium">{t.title}</p>
          <p className="text-muted-foreground">{t.org} | {t.dates}</p>
          <p className="mt-2">{t.text}</p>
        </div>
      </div>
      <div>
        <h3 className="font-display text-2xl font-semibold">Skills</h3>
        <dl className="mt-3 divide-y divide-border">
          {skills.map((s) => (
            <div key={s.label} className="py-3">
              <dt className="font-semibold">{s.label}</dt>
              <dd className="text-muted-foreground">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  </Section>
);
