import { ExternalLink } from "lucide-react";
import { Section } from "./SectionHeading";
import { projects, jobScout } from "@/data/content";

const Relevance = ({ children }) => (
  <p className="mt-3 text-sm leading-relaxed">
    <span className="font-semibold text-primary">Relevance: </span>
    {children}
  </p>
);

export const ProjectsSection = () => (
  <Section id="projects" title="Featured projects" tone="alt">
    <div className="space-y-5">
      {projects.map((p) => (
        <article key={p.id} id={p.id} className="card scroll-mt-20">
          <div className={p.image ? "grid gap-5 md:grid-cols-[1fr_280px] md:items-start" : ""}>
            <div>
              <h3 className="text-xl font-semibold tracking-tight">
                {p.title} <span className="font-normal text-muted-foreground">— {p.subtitle}</span>
              </h3>
              <p className="mt-2 inline-block rounded-full border border-border bg-secondary px-3 py-0.5 text-xs font-semibold">
                {p.status}
              </p>
              <ul className="mt-3 list-disc pl-5 space-y-1.5 text-[15px] leading-relaxed">
                {p.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <Relevance>{p.relevance}</Relevance>
            </div>
            {p.image && (
              <div className="max-h-52 overflow-hidden rounded-lg border border-border">
                <img src={p.image.src} alt={p.image.alt} loading="lazy" className="w-full object-cover object-top" />
              </div>
            )}
          </div>

          <details className="mt-4">
            <summary className="cursor-pointer text-sm font-medium text-primary">Technical details and scope</summary>
            <ul className="mt-3 list-disc pl-5 space-y-1.5 text-sm text-muted-foreground leading-relaxed">
              {p.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </details>

          {p.links && (
            <div className="mt-4 flex flex-wrap items-center gap-3">
              {p.links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className={`btn ${l.primary ? "btn-primary" : "btn-outline"}`}>
                  {l.label} <ExternalLink size={14} aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ))}
            </div>
          )}
          {p.note && <p className="mt-2 text-xs text-muted-foreground">{p.note}</p>}
        </article>
      ))}

      <article className="rounded-xl border border-dashed border-border p-5">
        <h3 className="font-semibold">
          {jobScout.title} <span className="font-normal text-muted-foreground">— {jobScout.subtitle}</span>
        </h3>
        <p className="mt-1 text-[15px] leading-relaxed">{jobScout.text}</p>
        <Relevance>{jobScout.relevance}</Relevance>
        <p className="mt-2 text-xs text-muted-foreground">{jobScout.note}</p>
      </article>
    </div>
  </Section>
);
