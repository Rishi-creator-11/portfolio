import { Section } from "./SectionHeading";
import { skills, education as ed, teaching as t } from "@/data/content";

export const SkillsEducationSection = () => (
  <Section id="skills" title="Education, teaching, and skills" theme="alt">
    <div className="grid gap-5 md:grid-cols-2">
      <div className="space-y-5">
        <div className="card">
          <h3 className="text-lg font-semibold">Education</h3>
          <p className="mt-2 font-medium">{ed.school}</p>
          <p className="text-base">{ed.degree}</p>
          <p className="text-base text-muted-foreground">{ed.specialization}</p>
          <p className="text-base text-muted-foreground">{ed.dates}</p>
          <ul className="mt-2 list-disc pl-5 text-base text-muted-foreground">
            {ed.extras.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold">Teaching</h3>
          <p className="mt-2 font-medium">{t.title}</p>
          <p className="text-base text-muted-foreground">{t.org} · {t.dates}</p>
          <p className="mt-2 text-base">{t.text}</p>
        </div>
      </div>
      <dl className="card space-y-3 self-start text-base">
        <h3 className="text-lg font-semibold">Skills</h3>
        {skills.map((s) => (
          <div key={s.label}>
            <dt className="font-semibold">{s.label}</dt>
            <dd className="text-muted-foreground">{s.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  </Section>
);
