import { ExternalLink } from "lucide-react";
import { Section } from "./SectionHeading";
import { projects } from "@/data/content";

export const Details = ({ title = "Technical details", items }) => (
  <details className="mt-4">
    <summary className="cursor-pointer text-sm font-medium text-primary">{title}</summary>
    <ul className="mt-3 list-disc pl-5 space-y-1.5 text-sm text-muted-foreground leading-relaxed">
      {items.map((d) => (
        <li key={d}>{d}</li>
      ))}
    </ul>
  </details>
);

export const Relevance = ({ label, children }) => (
  <p className="mt-3 text-sm leading-relaxed">
    <span className="font-semibold text-primary">{label}: </span>
    {children}
  </p>
);

export const ProjectsSection = () => (
  <Section id="projects" title="Featured projects" tone="plain">
    <div className="grid gap-5 md:grid-cols-2">
      {projects.map((p) => (
        <article key={p.id} id={p.id} className="card flex flex-col scroll-mt-20">
          {p.image && (
            <figure className="mb-4">
              <div className="h-40 overflow-hidden rounded-lg border border-border">
                <img src={p.image.src} alt={p.image.alt} loading="lazy" className="w-full object-cover object-top" />
              </div>
              <figcaption className="mt-1 text-xs text-muted-foreground">{p.image.caption}</figcaption>
            </figure>
          )}
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            {p.label}
            {p.dates && <span className="text-muted-foreground normal-case tracking-normal font-normal"> · {p.dates}</span>}
          </p>
          <h3 className="mt-1 text-xl font-semibold tracking-tight">{p.title}</h3>
          <p className="mt-1 text-muted-foreground">{p.summary}</p>
          {p.scope && (
            <p className="mt-2 text-xs font-semibold border-l-2 border-primary pl-2">{p.scope}</p>
          )}
          <ul className="mt-3 list-disc pl-5 space-y-1.5 text-[15px] leading-relaxed">
            {p.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <Relevance label="Relevant to this role">{p.relevance}</Relevance>
          <Details items={p.details} />
          <div className="mt-auto pt-4">
            {p.links && (
              <div className="flex flex-wrap items-center gap-2">
                {p.links.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className={`btn !px-4 !py-1.5 ${l.primary ? "btn-primary" : "btn-outline"}`}>
                    {l.label} <ExternalLink size={13} aria-hidden="true" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ))}
              </div>
            )}
            {p.note && <p className="mt-2 text-xs text-muted-foreground">{p.note}</p>}
          </div>
        </article>
      ))}
    </div>
  </Section>
);
