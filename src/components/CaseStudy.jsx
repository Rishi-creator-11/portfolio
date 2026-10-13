import { Section } from "./SectionHeading";
import { caseStudy as c } from "@/data/content";

export const CaseStudy = () => (
  <Section id="case-study" title="Business delivery case study" tone="alt">
    <article className="card">
      <h3 className="text-xl font-semibold tracking-tight">{c.title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{c.meta}</p>
      <dl className="mt-5 space-y-3">
        {[
          ["Problem", c.problem],
          ["Action", c.action],
          ["Result", c.result],
          ["Scope", c.scope],
        ].map(([label, text]) => (
          <div key={label} className="grid sm:grid-cols-[88px_1fr] gap-1 sm:gap-4">
            <dt className="text-xs font-semibold uppercase tracking-wider text-primary pt-0.5">{label}</dt>
            <dd className="text-[15px] leading-relaxed">{text}</dd>
          </div>
        ))}
      </dl>
    </article>
  </Section>
);
