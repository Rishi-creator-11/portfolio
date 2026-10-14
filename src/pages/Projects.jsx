import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { projects, charts } from "@/data/projects";
import { diagrams } from "@/data/diagrams";
import { FlowDiagram } from "@/components/FlowDiagram";
import { Tabs } from "@/components/Tabs";
import { BarCompare, IsolationChecks, ResponsibilitySplit, StatRow } from "@/components/Visuals";
import { LinkButtons, ToolLine } from "@/components/Parts";

const Evidence = ({ chart }) => {
  if (chart === "alphabriefBenchmark") {
    return (
      <div className="grid gap-5 lg:grid-cols-[3fr_2fr]">
        <BarCompare chart={charts.alphabriefBenchmark} />
        <IsolationChecks />
      </div>
    );
  }
  if (chart === "tripSplit") return <ResponsibilitySplit />;
  if (chart && charts[chart]) return <BarCompare chart={charts[chart]} />;
  return null;
};

const Dash = () => <span className="mt-[0.8em] h-px w-4 shrink-0 bg-primary" aria-hidden="true" />;

const Heading = ({ children }) => <h3 className="font-display text-xl font-semibold tracking-tight">{children}</h3>;

const Diagrams = ({ p }) => {
  const specs = p.diagrams.map((k) => ({ key: k, spec: diagrams[k] }));
  const isWorkflow = specs.every((d) => d.spec.kind === "workflow");
  const one = (d) => (
    <div key={d.key}>
      <FlowDiagram spec={d.spec} />
      <p className="mt-2 text-[13px] text-muted-foreground">Source: {d.spec.source}.</p>
    </div>
  );
  return (
    <section aria-label={isWorkflow ? "Product workflow" : "Architecture"} className="space-y-3">
      <Heading>{isWorkflow ? "Product workflow" : "Architecture"}</Heading>
      {specs.length === 1 ? (
        one(specs[0])
      ) : (
        <Tabs
          label={`${p.title} diagrams`}
          items={specs.map((d) => ({ id: d.key, label: d.spec.title.split(":")[1]?.trim() ?? d.spec.title, content: one(d) }))}
        />
      )}
    </section>
  );
};

const Project = ({ p, index }) => (
  <article id={p.id} aria-labelledby={`${p.id}-h`} className={`py-14 md:py-20 ${index % 2 ? "bg-secondary" : "bg-background"}`}>
    <div className="container space-y-8">
      <header className="grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
        <div>
          <p className="text-[15px] font-semibold text-primary">{p.kind}</p>
          <h2 id={`${p.id}-h`} className="mt-1 font-display text-4xl font-semibold tracking-tight md:text-5xl">{p.title}</h2>
          <p className="mt-3 max-w-2xl text-xl leading-snug">{p.sentence}</p>
        </div>
        <div className="space-y-3 lg:pt-8">
          <p className="border-l-2 border-primary pl-4 text-[15px] leading-snug"><span className="font-semibold">My role. </span>{p.role}</p>
          <ToolLine tools={p.tech} />
          {p.links.length > 0 && <LinkButtons links={p.links} />}
        </div>
      </header>

      {p.metrics.length > 0 && <StatRow stats={p.metrics} />}

      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
        <section aria-label="What I built">
          <Heading>What I built, and how</Heading>
          <ul className="mt-3 space-y-3 text-[16px] leading-relaxed">
            {p.built.map((b) => (
              <li key={b} className="flex gap-3.5"><Dash /><span>{b}</span></li>
            ))}
          </ul>
        </section>
        <div className="space-y-6">
          {p.problems.length > 0 && (
            <section aria-label="Problems solved">
              <Heading>Problems solved</Heading>
              <ul className="mt-3 space-y-3.5 text-[16px] leading-snug">
                {p.problems.map((x) => (
                  <li key={x.problem}>
                    <p className="font-semibold">{x.problem}</p>
                    <p className="mt-0.5 text-muted-foreground">{x.solution}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {p.observed && (
            <section aria-label="Observed in the public deployment">
              <Heading>Observed in the public deployment</Heading>
              <ul className="mt-3 space-y-2.5 text-[16px] leading-snug">
                {p.observed.map((o) => (
                  <li key={o} className="flex gap-3.5"><Dash /><span>{o}</span></li>
                ))}
              </ul>
              <p className="mt-4 rounded-lg border border-dashed border-primary/50 bg-primary/5 px-4 py-3 text-[15px] leading-snug"><span className="font-semibold">Missing evidence. </span>{p.missing}</p>
            </section>
          )}
        </div>
      </div>

      {p.diagrams.length > 0 && <Diagrams p={p} />}

      {p.decisions.length > 0 && (
        <section aria-label="Engineering decisions and trade-offs" className="space-y-3">
          <Heading>Engineering decisions and trade-offs</Heading>
          <ul className="grid gap-4 md:grid-cols-2">
            {p.decisions.map((d) => (
              <li key={d.title} className="rounded-lg border border-border bg-card p-4">
                <p className="font-display text-lg font-semibold leading-snug">{d.title}</p>
                <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">{d.text}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {p.evidence && <Evidence chart={p.evidence} />}

      {p.notes?.map((n) => (
        <p key={n} className="max-w-4xl text-[14px] leading-snug text-muted-foreground">{n}</p>
      ))}
    </div>
  </article>
);

export default function Projects() {
  usePageMeta(
    "Projects — Rishi Kumar",
    "Engineering deep dives with architecture diagrams: AlphaBrief (RAG), TripPilot, the MetroPrint ordering platform, Pencil's Mario SDK and a distributed Go chat system."
  );
  return (
    <>
      <section className="on-dark bg-navy-900 pb-12 pt-28 text-white md:pb-16 md:pt-36">
        <div className="container">
          <h1 className="max-w-3xl text-[clamp(2.25rem,4.3vw,3.6rem)] font-semibold leading-[1.04]">Projects, with the engineering behind them.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
            What I built, the problems it raised, the decisions behind it and the results, with diagrams drawn from each project's own source or documentation.
          </p>
          <nav aria-label="Projects on this page" className="mt-8 flex flex-wrap gap-2">
            {projects.map((p) => (
              <Link key={p.id} to={`/projects#${p.id}`} className="btn btn-ghost-light !min-h-10 !px-4 !py-1.5">{p.title}</Link>
            ))}
          </nav>
        </div>
      </section>
      {projects.map((p, i) => (
        <Project key={p.id} p={p} index={i} />
      ))}
      <section className="on-dark bg-navy-950 py-14 text-white">
        <div className="container flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl font-display text-2xl font-semibold leading-snug">Want to talk through any of this?</p>
          <Link to="/contact" className="btn btn-teal">Get in touch <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </section>
    </>
  );
}
