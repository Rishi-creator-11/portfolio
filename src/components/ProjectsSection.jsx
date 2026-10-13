import { Section } from "./SectionHeading";
import { BrowserFrame, Points, Tools, Details, LinkButtons, Workflow } from "./Parts";
import { featured } from "@/data/content";

const Header = ({ c }) => (
  <header>
    <p className="text-xs font-bold uppercase tracking-wider text-primary">
      {c.kind}
      {c.dates && <span className="font-medium normal-case tracking-normal text-muted-foreground"> · {c.dates}</span>}
    </p>
    <h3 className="mt-1 text-2xl md:text-[28px] font-semibold tracking-tight">{c.title}</h3>
    <p className="mt-1 text-lg md:text-xl font-medium text-foreground/90">{c.headline}</p>
    {c.scope && <p className="mt-2 inline-block rounded-full border border-primary/40 bg-primary/5 px-3 py-0.5 text-xs font-semibold text-primary">{c.scope}</p>}
  </header>
);

const Body = ({ c }) => (
  <div className="space-y-5">
    <Points points={c.points} />
    <Tools tools={c.tools} />
    {c.details && <Details items={c.details} />}
    {c.links && <LinkButtons links={c.links} />}
    {c.note && <p className="text-xs text-muted-foreground">{c.note}</p>}
  </div>
);

export const ProjectsSection = () => {
  const [alpha, scout, trip] = featured;
  return (
    <Section id="work" title="Featured work" intro="AI applications and automations I built, with the tools I actually used.">
      <div className="space-y-20">
        {/* AlphaBrief: screenshot-led, wide */}
        <article id={alpha.id} className="scroll-mt-20 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <BrowserFrame {...alpha.image} className="lg:order-2 lg:-mr-10" />
          <div className="space-y-5 lg:order-1">
            <Header c={alpha} />
            <Body c={alpha} />
          </div>
        </article>

        {/* Job Scout: workflow-led, full width */}
        <article id={scout.id} className="scroll-mt-20 rounded-3xl border border-border bg-secondary p-6 md:p-10">
          <Header c={scout} />
          <div className="mt-6"><Workflow steps={scout.workflow} /></div>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            <Points points={scout.points} />
            <div className="space-y-5">
              <Tools tools={scout.tools} />
              <Details items={scout.details} />
            </div>
          </div>
        </article>

        {/* TripPilot: screenshot left */}
        <article id={trip.id} className="scroll-mt-20 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-start">
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
