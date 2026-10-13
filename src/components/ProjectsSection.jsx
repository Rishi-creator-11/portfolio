import { Section } from "./SectionHeading";
import { Shot, Bullets, Outcome, Details, LinkButtons, Workflow, ToolRow } from "./Parts";
import { featured, aiTools, toEvaluate } from "@/data/content";

export const CaseCard = ({ c, flip }) => (
  <article id={c.id} className="scroll-mt-20 grid gap-8 lg:grid-cols-2 lg:items-center">
    <div className={`space-y-4 ${flip ? "lg:order-2" : ""}`}>
      <header>
        <p className="text-sm font-bold uppercase tracking-wider text-primary">
          {c.kind}
          {c.dates && <span className="font-medium normal-case tracking-normal text-muted-foreground"> | {c.dates}</span>}
        </p>
        <h3 className="mt-1 text-3xl font-semibold tracking-tight">{c.title}</h3>
        <p className="mt-1 text-xl font-medium text-foreground/90">{c.sentence}</p>
        {c.label && <p className="mt-2 inline-block rounded-full border border-primary/40 bg-primary/5 px-3 py-0.5 text-sm font-semibold text-primary">{c.label}</p>}
      </header>
      <Bullets items={c.bullets} />
      <Outcome>{c.outcome}</Outcome>
      <ToolRow tools={c.tools} />
      {c.links && <LinkButtons links={c.links} />}
      <Details items={c.details} />
    </div>
    <div className={flip ? "lg:order-1" : ""}>
      {c.image ? <Shot {...c.image} /> : <Workflow steps={c.workflow} />}
    </div>
  </article>
);

export const ProjectsSection = () => (
  <Section id="work" title="Selected AI products and automations">
    <dl className="mb-12 grid gap-x-8 gap-y-1.5 rounded-2xl border border-border bg-secondary p-5 text-[15px] md:grid-cols-2">
      {aiTools.map((t) => (
        <div key={t.name}>
          <dt className="inline font-semibold">{t.name}: </dt>
          <dd className="inline text-muted-foreground">{t.use}</dd>
        </div>
      ))}
      <div className="md:col-span-2 mt-1 border-t border-border pt-2">
        <dt className="inline font-semibold">Tools I would evaluate for the workflow: </dt>
        <dd className="inline text-muted-foreground">{toEvaluate}</dd>
      </div>
    </dl>
    <div className="space-y-16">
      {featured.map((c, i) => (
        <CaseCard key={c.id} c={c} flip={i % 2 === 1} />
      ))}
    </div>
  </Section>
);
