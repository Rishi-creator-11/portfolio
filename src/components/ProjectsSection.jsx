import { ExternalLink } from "lucide-react";
import { Section } from "./SectionHeading";
import { projects, tinkering } from "@/data/content";

const Row = ({ label, children }) => (
  <div className="grid sm:grid-cols-[72px_1fr] gap-0.5 sm:gap-4">
    <dt className="text-xs font-semibold uppercase tracking-wider text-primary pt-0.5">{label}</dt>
    <dd className="text-[15px] leading-relaxed">{children}</dd>
  </div>
);

export const ProjectsSection = () => (
  <Section id="projects" title="Projects" tone="alt">
    <div className="space-y-6">
      {projects.map((p) => (
        <article key={p.id} id={p.id} className="card">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
            <h3 className="text-xl font-semibold tracking-tight">{p.title}</h3>
            <p className="text-sm text-muted-foreground">{p.dates}</p>
          </div>
          <p className="mt-1 text-muted-foreground">{p.tagline}</p>

          <div className="mt-4 grid gap-5 md:grid-cols-[1fr_300px] md:items-start">
            <dl className="space-y-3">
              <Row label="Problem">{p.problem}</Row>
              <Row label="Built">{p.built}</Row>
              <Row label="Result">{p.result}</Row>
            </dl>
            <figure>
              <div className="max-h-56 overflow-hidden rounded-lg border border-border">
                <img src={p.image.src} alt={p.image.alt} loading="lazy" className="w-full object-cover object-top" />
              </div>
            </figure>
          </div>

          <p className="mt-4 rounded-lg bg-secondary px-3 py-2 text-sm leading-relaxed">
            <span className="font-semibold">Why it matters: </span>
            {p.why}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            {p.links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className={`btn ${l.primary ? "btn-primary" : "btn-outline"}`}>
                {l.label} <ExternalLink size={14} aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">{p.note}</p>
        </article>
      ))}
    </div>
    <p className="mt-5 text-sm text-muted-foreground leading-relaxed">{tinkering}</p>
  </Section>
);
