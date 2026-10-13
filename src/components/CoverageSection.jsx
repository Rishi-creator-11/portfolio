import { Section } from "./SectionHeading";
import { coverage } from "@/data/content";

export const CoverageSection = () => (
  <Section id="applies" title="How this experience applies" intro="Completed evidence on the left. Proposed approaches on the right are ideas I would test with the team, not work already done.">
    <div className="hidden md:grid grid-cols-[160px_1fr_1fr] gap-x-6 border-b border-border pb-2 text-sm font-bold uppercase tracking-wider">
      <span />
      <span className="text-primary">Completed evidence</span>
      <span className="text-muted-foreground">Proposed (not done yet)</span>
    </div>
    <ul className="divide-y divide-border">
      {coverage.map((c) => (
        <li key={c.area} className="grid gap-2 py-4 md:grid-cols-[160px_1fr_1fr] md:gap-x-6">
          <h3 className="text-lg font-semibold">{c.area}</h3>
          <p className="text-base leading-relaxed">
            <span className="md:hidden block text-xs font-bold uppercase tracking-wider text-primary">Completed evidence</span>
            {c.done.text}{" "}
            <a href={c.done.href} className="whitespace-nowrap font-medium text-primary underline underline-offset-2">See work</a>
          </p>
          <p className="rounded-lg border border-dashed border-border px-3 py-2 text-base leading-relaxed text-muted-foreground">
            <span className="md:hidden block text-xs font-bold uppercase tracking-wider">Proposed (not done yet)</span>
            {c.proposed}
          </p>
        </li>
      ))}
    </ul>
  </Section>
);
