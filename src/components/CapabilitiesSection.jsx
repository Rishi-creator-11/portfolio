import { Section } from "./SectionHeading";
import { capabilities, opportunities } from "@/data/content";

export const CapabilitiesSection = () => (
  <Section id="capabilities" title="What I can do, and where I've done it" intro="Each capability links to completed work above.">
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {capabilities.map((c) => (
        <li key={c.title} className="card flex flex-col">
          <h3 className="text-lg font-semibold tracking-tight">{c.title}</h3>
          <p className="mt-2 text-[15px] text-muted-foreground leading-relaxed">{c.text}</p>
          <p className="mt-auto pt-4 text-sm">
            <span className="font-semibold">Evidence: </span>
            {c.evidence.map((e, i) => (
              <span key={e.label}>
                {i > 0 && ", "}
                <a href={e.href} className="font-medium text-primary underline underline-offset-2">{e.label}</a>
              </span>
            ))}
          </p>
        </li>
      ))}
    </ul>

    <div className="mt-8 rounded-2xl border border-dashed border-primary/50 bg-primary/5 p-5 md:p-6">
      <p className="text-xs font-bold uppercase tracking-wider text-primary">Opportunity, not completed work</p>
      <h3 className="mt-1 text-lg font-semibold">{opportunities.title}</h3>
      <ul className="mt-3 grid gap-x-8 gap-y-1.5 text-[15px] md:grid-cols-2 list-disc pl-5">
        {opportunities.items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
      <p className="mt-3 text-sm text-muted-foreground">{opportunities.note}</p>
    </div>
  </Section>
);
