import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/use-page-meta";
import { projects, charts } from "@/data/projects";
import { diagrams } from "@/data/diagrams";
import { FlowDiagram } from "@/components/FlowDiagram";
import { Tabs } from "@/components/Tabs";
import { BarCompare, IsolationChecks, ResponsibilitySplit, StatRow } from "@/components/Visuals";
import { LinkButtons, ToolLine } from "@/components/Parts";
import { supporting } from "@/data/content";

const Visuals = ({ chart }) => {
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

const Cards = ({ items }) => (
  <ul className="grid gap-4 md:grid-cols-2">
    {items.map((d) => (
      <li key={d.title} className="rounded-lg border border-border bg-card p-5">
        <h4 className="font-display text-lg font-semibold leading-snug">{d.title}</h4>
        <p className="mt-1.5 text-[16px] leading-relaxed text-muted-foreground">{d.text}</p>
      </li>
    ))}
  </ul>
);

const Project = ({ p, index }) => {
  const tabs = [
    {
      id: "architecture",
      label: p.diagrams.length ? "Architecture" : "Overview",
      content: (
        <div className="space-y-6">
          {p.diagrams.map((k) => (
            <div key={k}>
              <FlowDiagram spec={diagrams[k]} />
              <p className="mt-2 text-[13px] text-muted-foreground">Source: {diagrams[k].source}.</p>
            </div>
          ))}
          {p.diagrams.length === 0 && (
            <div className={`grid gap-6 ${p.image ? "lg:grid-cols-[1.1fr_1fr] lg:items-start" : ""}`}>
              {p.image && (
                <img src={p.image.src} alt={p.image.alt} width="1600" height="1000" loading="lazy" decoding="async" className="frame w-full rounded-lg border border-border object-cover object-top" />
              )}
              <ul className="space-y-3 text-[17px] leading-relaxed">
                {p.overview.map((o) => (
                  <li key={o} className="flex gap-3.5">
                    <span className="mt-[0.8em] h-px w-4 shrink-0 bg-primary" aria-hidden="true" />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ),
    },
    p.decisions.length > 0 && { id: "decisions", label: "Decisions", content: <Cards items={p.decisions} /> },
    p.challenges.length > 0 && { id: "limits", label: "Challenges", content: <Cards items={p.challenges} /> },
    (p.results.stats.length > 0 || p.results.note) && {
      id: "results",
      label: "Results",
      content: (
        <div className="space-y-5">
          <StatRow stats={p.results.stats} />
          <p className="max-w-3xl text-[16px] leading-relaxed text-muted-foreground">{p.results.note}</p>
          <Visuals chart={p.chart} />
        </div>
      ),
    },
  ].filter(Boolean);

  return (
    <article id={p.id} aria-labelledby={`${p.id}-h`} className={`py-16 md:py-24 ${index % 2 ? "bg-secondary" : "bg-background"}`}>
      <div className="container">
        <header className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
          <div>
            <p className="text-[15px] font-semibold text-primary">{p.kind}</p>
            <h2 id={`${p.id}-h`} className="mt-1 font-display text-4xl font-semibold tracking-tight md:text-5xl">{p.title}</h2>
            {p.label && <p className="mt-2 inline-block rounded-full border border-border bg-card px-3 py-0.5 text-[13px] font-medium">{p.label}</p>}
            <p className="mt-5 max-w-2xl text-lg leading-relaxed">{p.problem}</p>
          </div>
          <div className="space-y-4 lg:pt-6">
            <p className="border-l-2 border-primary pl-4 text-[15px] leading-snug">
              <span className="font-semibold">My role. </span>
              {p.role}
            </p>
            <ToolLine tools={p.stack} />
            {p.links.length > 0 && <LinkButtons links={p.links} />}
          </div>
        </header>
        <div className="mt-10">
          <Tabs items={tabs} label={`${p.title} details`} />
        </div>
      </div>
    </article>
  );
};

export default function Projects() {
  usePageMeta(
    "Projects — Rishi Kumar",
    "Architecture, decisions and results for AlphaBrief, MetroPrint, TriPilot AI, Alumi, TripPilot, a computer-use automation system, Job Scout and Pencil's Mario sync layer."
  );
  return (
    <>
      <section className="on-dark bg-navy-900 pb-14 pt-28 text-white md:pb-20 md:pt-36">
        <div className="container">
          <h1 className="max-w-3xl text-[clamp(2.25rem,4.3vw,3.6rem)] font-semibold leading-[1.04]">
            Projects, with the engineering behind them.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
            Each project has a diagram you can step through, the decisions behind it, what it still gets wrong, and results with their caveats. Diagrams come from each project's own documentation or source.
          </p>
          <nav aria-label="Projects on this page" className="mt-8 flex flex-wrap gap-2">
            {projects.map((p) => (
              <Link key={p.id} to={`/projects#${p.id}`} className="btn btn-ghost-light !min-h-10 !px-4 !py-1.5">
                {p.title}
              </Link>
            ))}
          </nav>
        </div>
      </section>
      {projects.map((p, i) => (
        <Project key={p.id} p={p} index={i} />
      ))}
      <section aria-labelledby="also-h" className="bg-secondary py-14">
        <div className="container max-w-4xl">
          <h2 id="also-h" className="font-display text-3xl font-semibold">Also built</h2>
          <h3 className="mt-5 font-display text-xl font-semibold">{supporting.title}</h3>
          <p className="text-[15px] text-muted-foreground">Supporting independent project · September 2025 – December 2025</p>
          <p className="mt-2 text-[17px] leading-relaxed">{supporting.text}</p>
          <p className="mt-2 text-[14px] text-muted-foreground">Résumé-reported. I have not located a repository for this project, so there is no diagram or link.</p>
        </div>
      </section>
      <section className="on-dark bg-navy-950 py-16 text-white">
        <div className="container flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl font-display text-2xl font-semibold leading-snug">Want to talk through any of this?</p>
          <Link to="/contact" className="btn btn-teal">Get in touch</Link>
        </div>
      </section>
    </>
  );
}
