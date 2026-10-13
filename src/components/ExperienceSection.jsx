import { ExternalLink } from "lucide-react";
import { Section } from "./SectionHeading";
import { Details, Relevance } from "./ProjectsSection";
import { experience } from "@/data/content";

export const ExperienceSection = () => (
  <Section id="experience" title="Professional experience" tone="alt">
    <div className="space-y-4">
      {experience.map((e) => (
        <article key={`${e.org}-${e.dates}`} className="card">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
            <h3 className="text-lg font-semibold tracking-tight">{e.org}</h3>
            <p className="text-sm text-muted-foreground">{e.dates}</p>
          </div>
          <p className="text-sm">
            <span className="font-medium text-primary">{e.role}</span>
            <span className="text-muted-foreground"> · {e.place}</span>
          </p>
          <ul className="mt-3 list-disc pl-5 space-y-1.5 text-[15px] leading-relaxed">
            {e.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <Relevance label="Role connection">{e.connection}</Relevance>
          <p className="mt-1 text-sm">
            <span className="font-semibold text-primary">Tools used: </span>
            {e.tools}
          </p>
          {e.note && <p className="mt-1 text-xs text-muted-foreground">{e.note}</p>}
          {e.details && <Details title="Implementation details" items={e.details} />}
          {e.link && (
            <a href={e.link.href} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary underline underline-offset-2">
              {e.link.label} <ExternalLink size={13} aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
        </article>
      ))}
    </div>
  </Section>
);
