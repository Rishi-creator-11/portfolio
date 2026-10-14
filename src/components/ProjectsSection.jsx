import { Section } from "./SectionHeading";
import { Shot, Bullets, Outcome, Details, LinkButtons, Workflow, ToolLine } from "./Parts";
import { featured } from "@/data/content";

const CaseCard = ({ c }) => (
  <article id={c.id} className="grid scroll-mt-24 gap-8 border-t border-foreground/20 pt-10 lg:grid-cols-[17rem_1fr] lg:gap-16">
    <header className="space-y-4 lg:sticky lg:top-24 lg:self-start">
      <p className="text-[15px] text-muted-foreground">
        {c.kind}
        {c.dates && <> | {c.dates}</>}
      </p>
      <h3 className="text-4xl font-semibold leading-none md:text-5xl">{c.title}</h3>
      {c.label && <p className="inline-block border-l-2 border-primary pl-2.5 text-[15px] font-semibold">{c.label}</p>}
      <ToolLine tools={c.tools} />
      {c.links && <LinkButtons links={c.links} />}
    </header>

    <div className="min-w-0 space-y-8">
      {c.image ? <Shot {...c.image} /> : <Workflow steps={c.workflow} />}
      <Bullets items={c.bullets} />
      <Outcome>{c.outcome}</Outcome>
      <Details items={c.details} />
    </div>
  </article>
);

export const ProjectsSection = () => (
  <Section id="work" title="Work">
    <div className="space-y-24">
      {featured.map((c) => (
        <CaseCard key={c.id} c={c} />
      ))}
    </div>
  </Section>
);
