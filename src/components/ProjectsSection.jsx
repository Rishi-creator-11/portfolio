import { Section } from "./SectionHeading";
import { BrowserFrame, Bullets, Result, Details, LinkButtons, Workflow, ToolChips } from "./Parts";
import { featured } from "@/data/content";

const Header = ({ c }) => (
  <header className="space-y-2">
    <p className="text-sm font-bold uppercase tracking-wider text-primary">
      {c.kind}
      {c.dates && <span className="font-medium normal-case tracking-normal text-muted-foreground"> · {c.dates}</span>}
    </p>
    <h3 className="text-3xl font-semibold tracking-tight">{c.title}</h3>
    <p className="text-xl font-medium text-foreground/90">{c.headline}</p>
    {c.scope && <p className="inline-block rounded-full border border-primary/40 bg-primary/5 px-3 py-0.5 text-sm font-semibold text-primary">{c.scope}</p>}
    <ToolChips tools={c.tools} />
    {c.toolNote && <p className="text-sm text-muted-foreground">{c.toolNote}</p>}
  </header>
);

const Body = ({ c }) => (
  <div className="space-y-5">
    <Bullets items={c.bullets} />
    <Result>{c.result}</Result>
    <Details items={c.details} />
    {c.links && <LinkButtons links={c.links} />}
    {c.note && <p className="text-sm text-muted-foreground">{c.note}</p>}
  </div>
);

export const ProjectsSection = () => {
  const [alpha, scout, trip] = featured;
  return (
    <Section id="work" title="Featured work" intro="AI applications and automations I built, with each tool shown in the way I used it.">
      <div className="space-y-16">
        <article id={alpha.id} className="scroll-mt-20 grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
          <div className="space-y-5">
            <Header c={alpha} />
            <Body c={alpha} />
          </div>
          <BrowserFrame {...alpha.image} maxH="max-h-[560px]" className="lg:-mr-6" />
        </article>

        <article id={scout.id} className="scroll-mt-20 rounded-3xl border border-border bg-secondary p-6 md:p-9 space-y-6">
          <Header c={scout} />
          <Workflow steps={scout.workflow} />
          <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr] lg:items-start">
            <Bullets items={scout.bullets} />
            <div className="space-y-5">
              <Result>{scout.result}</Result>
              <Details items={scout.details} />
            </div>
          </div>
        </article>

        <article id={trip.id} className="scroll-mt-20 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <BrowserFrame {...trip.image} className="lg:-ml-10" />
          <div className="space-y-5">
            <Header c={trip} />
            <Body c={trip} />
          </div>
        </article>
      </div>
    </Section>
  );
};
