import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/use-page-meta";
import { projects, charts } from "@/data/projects";
import { diagrams } from "@/data/diagrams";
import { FlowDiagram } from "@/components/FlowDiagram";
import { Tabs } from "@/components/Tabs";
import { BarCompare, IsolationChecks, ResponsibilitySplit } from "@/components/Visuals";
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

const Diagram = ({ k }) => (
  <div>
    <FlowDiagram spec={diagrams[k]} />
    <p className="mt-2 text-[13px] text-muted-foreground">Source: {diagrams[k].source}.</p>
  </div>
);

// Everything an engineer might want, tucked behind one disclosure so the page stays scannable.
const Details = ({ p }) => (
  <details className="group rounded-lg border border-border bg-card">
    <summary className="flex min-h-12 items-center justify-between gap-4 px-5 py-3 font-semibold marker:content-['']">
      <span>Technical details for engineers</span>
      <span aria-hidden="true" className="text-primary transition-transform group-open:rotate-45">+</span>
    </summary>
    <div className="space-y-8 border-t border-border p-5">
      <p className="text-[16px]"><span className="font-semibold">My role. </span>{p.role}</p>
      <ToolLine tools={p.tech} />
      {p.diagrams.length > 0 && (
        <section aria-label="More diagrams" className="space-y-3">
          <Heading>More diagrams</Heading>
          <Tabs
            label={`${p.title} diagrams`}
            items={p.diagrams.map((k) => ({ id: k, label: diagrams[k].title.split(":")[1]?.trim() ?? diagrams[k].title, content: <Diagram k={k} /> }))}
          />
        </section>
      )}
      {p.problems.length > 0 && (
        <section aria-label="Problems solved" className="space-y-3">
          <Heading>Problems solved</Heading>
          <ul className="grid gap-4 md:grid-cols-2">
            {p.problems.map((x) => (
              <li key={x.problem} className="text-[16px] leading-snug">
                <p className="font-semibold">{x.problem}</p>
                <p className="mt-0.5 text-muted-foreground">{x.solution}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
      {p.decisions.length > 0 && (
        <section aria-label="Decisions and trade-offs" className="space-y-3">
          <Heading>Decisions and trade-offs</Heading>
          <ul className="grid gap-4 md:grid-cols-2">
            {p.decisions.map((d) => (
              <li key={d.title} className="text-[16px] leading-snug">
                <p className="font-semibold">{d.title}</p>
                <p className="mt-0.5 text-muted-foreground">{d.text}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
      {p.evidence && <Evidence chart={p.evidence} />}
      {p.notes?.map((n) => (
        <p key={n} className="text-[14px] leading-snug text-muted-foreground">{n}</p>
      ))}
    </div>
  </details>
);

const Project = ({ p, index }) => (
  <article id={p.id} aria-labelledby={`${p.id}-h`} className={`py-14 md:py-20 ${index % 2 ? "bg-secondary" : "bg-background"}`}>
    <div className="container space-y-8">
      <header className="grid gap-5 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-12">
        <div>
          <p className="text-[15px] font-semibold text-primary">{p.kind}</p>
          <h2 id={`${p.id}-h`} className="mt-1 font-display text-4xl font-semibold tracking-tight md:text-5xl">{p.title}</h2>
          <p className="mt-3 max-w-2xl text-xl leading-snug"><span className="font-semibold">Problem. </span>{p.problem}</p>
        </div>
        {p.links.length > 0 && <LinkButtons links={p.links} />}
      </header>

      <section aria-label={`${p.title} diagram`} className="space-y-2">
        <Diagram k={p.overview} />
      </section>

      <div className={`grid gap-8 ${p.metrics.length ? "lg:grid-cols-[1.5fr_1fr] lg:gap-12" : ""}`}>
        <section aria-label="What I built">
          <Heading>What I built</Heading>
          <ul className="mt-3 space-y-3 text-[16px] leading-relaxed">
            {(p.bullets ?? p.built).map((b) => (
              <li key={b} className="flex gap-3.5"><Dash /><span>{b}</span></li>
            ))}
          </ul>
        </section>
        {p.metrics.length > 0 && (
        <section aria-label="Results">
          <Heading>Results</Heading>
          <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-5">
            {p.metrics.map((m) => (
              <div key={m.label} className="flex flex-col-reverse justify-end gap-1">
                <dt className="text-[14px] leading-snug text-muted-foreground">{m.label}</dt>
                <dd className="font-display text-2xl font-semibold leading-none tracking-tight">{m.value}</dd>
              </div>
            ))}
          </dl>
        </section>
        )}
      </div>

      <Details p={p} />
    </div>
  </article>
);

export default function Projects() {
  usePageMeta(
    "Engineering proof — Rishi Kumar",
    "Architecture diagrams, technical decisions and measured results: AlphaBrief (RAG), TripPilot, the MetroPrint ordering platform, Pencil's Mario SDK and a distributed Go chat system."
  );
  return (
    <>
      <section className="on-dark bg-navy-900 pb-10 pt-28 text-white md:pb-14 md:pt-36">
        <div className="container">
          <h1 className="max-w-3xl text-[clamp(2.25rem,4.3vw,3.6rem)] font-semibold leading-[1.04]">Engineering proof</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
            Five projects: the problem, what I built, the result. Each diagram is drawn from the project's own source, documentation or my résumé.
          </p>
          <nav aria-label="Projects on this page" className="mt-7 flex flex-wrap gap-2">
            {projects.map((p) => (
              <Link key={p.id} to={`/projects#${p.id}`} className="btn btn-ghost-light !min-h-10 !px-4 !py-1.5">{p.title.replace(" at Pencil Learning Technologies", "")}</Link>
            ))}
          </nav>
        </div>
      </section>
      {projects.map((p, i) => (
        <Project key={p.id} p={p} index={i} />
      ))}
      <section className="on-dark bg-navy-950 py-12 text-white">
        <div className="container flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl font-display text-2xl font-semibold leading-snug">Want to talk through any of this?</p>
          <Link to="/#contact" className="btn btn-teal">Contact me</Link>
        </div>
      </section>
    </>
  );
}
