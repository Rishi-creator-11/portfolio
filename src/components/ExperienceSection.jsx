import { Section } from "./SectionHeading";
import { experience } from "@/data/content";

export const ExperienceSection = () => (
  <Section id="experience" title="Experience">
    <div className="space-y-3">
      {experience.map((e) => (
        <article key={`${e.org}-${e.dates}`} className="card !p-4 md:!p-5">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
            <h3 className="font-semibold">
              {e.role} <span className="font-normal text-primary">· {e.org}</span>
            </h3>
            <p className="text-sm text-muted-foreground">{e.dates}</p>
          </div>
          <ul className="mt-2 list-disc pl-5 space-y-1 text-[15px] leading-relaxed">
            {e.results.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  </Section>
);
