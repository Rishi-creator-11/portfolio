import { Section } from "./SectionHeading";
import { aviation } from "@/data/content";

export const AviationSection = () => (
  <Section id="aviation" title="Aviation and travel: ideas I would explore" intro={aviation.intro}>
    <p className="mb-4 inline-block rounded-full border border-border bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wider">
      Proposed, not built
    </p>
    <div className="grid gap-4 sm:grid-cols-2">
      {aviation.ideas.map((i) => (
        <div key={i.title} className="card">
          <h3 className="font-semibold">{i.title}</h3>
          <p className="mt-2 text-[15px] text-muted-foreground leading-relaxed">{i.text}</p>
          <p className="mt-2 text-xs text-muted-foreground">{i.from}</p>
        </div>
      ))}
    </div>
  </Section>
);
