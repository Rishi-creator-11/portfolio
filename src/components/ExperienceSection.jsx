import { ExternalLink } from "lucide-react";
import { Section } from "./SectionHeading";
import { experience } from "@/data/content";

export const ExperienceSection = () => (
  <Section id="experience" title="Experience">
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
          <ul className="mt-3 list-disc pl-5 space-y-1.5 text-[15px] leading-relaxed">
            {e.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <p className="mt-3 rounded-lg bg-secondary px-3 py-2 text-sm leading-relaxed">
            <span className="font-semibold">Why it matters: </span>
            {e.why}
          </p>
          {e.link && (
            <a href={e.link.href} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-sm text-primary underline underline-offset-2">
              {e.link.label} <ExternalLink size={13} aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
        </article>
      ))}
    </div>
  </Section>
);
