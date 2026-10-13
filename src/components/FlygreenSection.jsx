import { Section } from "./SectionHeading";
import { flygreen as f } from "@/data/content";

export const FlygreenSection = () => (
  <Section id="flygreen" title={f.title}>
    <dl className="grid gap-5 md:grid-cols-2">
      {f.items.map((i) => (
        <div key={i.label} className="card">
          <dt className="text-lg font-semibold">{i.label}</dt>
          <dd className="mt-1 text-[17px] leading-relaxed text-muted-foreground">{i.text}</dd>
        </div>
      ))}
    </dl>
    <p className="mt-6 max-w-3xl text-lg font-medium leading-relaxed">{f.closing}</p>
  </Section>
);
