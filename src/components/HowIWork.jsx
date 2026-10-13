import { Section } from "./SectionHeading";
import { process } from "@/data/content";

export const HowIWork = () => (
  <Section id="how-i-work" title="How I work">
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {process.map((p, i) => (
        <li key={p.step} className="rounded-xl border border-border bg-card p-4">
          <span className="text-xs font-semibold text-primary">0{i + 1}</span>
          <h3 className="mt-1 font-semibold leading-snug">{p.step}</h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.text}</p>
        </li>
      ))}
    </ol>
  </Section>
);
