import { Section } from "./SectionHeading";
import { Relevance } from "./ProjectsSection";
import { teaching as t } from "@/data/content";

export const TeachingSection = () => (
  <Section id="teaching" title="Teaching">
    <article className="card">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
        <h3 className="font-semibold">{t.title}</h3>
        <p className="text-sm text-muted-foreground">{t.dates}</p>
      </div>
      <p className="text-sm text-muted-foreground">{t.org}</p>
      <p className="mt-2 text-[15px] leading-relaxed">{t.text}</p>
      <Relevance label="Role connection">{t.connection}</Relevance>
    </article>
  </Section>
);
