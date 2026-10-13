import { ExternalLink } from "lucide-react";

const Row = ({ label, children }) => (
  <div className="grid sm:grid-cols-[88px_1fr] gap-1 sm:gap-4">
    <dt className="text-xs font-semibold uppercase tracking-wider text-primary pt-0.5">{label}</dt>
    <dd className="text-[15px] leading-relaxed">{children}</dd>
  </div>
);

export const ProjectCard = ({ project: p }) => (
  <article id={p.id} className="card scroll-mt-20">
    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{p.kicker}</p>
    <h3 className="mt-1 text-xl font-semibold tracking-tight">{p.title}</h3>
    <p className="mt-1 text-muted-foreground">{p.summary}</p>

    <dl className="mt-5 space-y-3">
      <Row label="Problem">{p.problem}</Row>
      <Row label="Action">{p.action}</Row>
      <Row label="Result">{p.result}</Row>
      <Row label="Scope">
        <span className="text-muted-foreground">{p.scope}</span>
      </Row>
    </dl>

    {p.image && (
      <figure className="mt-5">
        <div className="max-h-72 overflow-hidden rounded-lg border border-border">
          <img src={p.image.src} alt={p.image.alt} loading="lazy" className="w-full object-cover object-top" />
        </div>
        <figcaption className="mt-1.5 text-xs text-muted-foreground">{p.image.caption}</figcaption>
      </figure>
    )}

    <details className="mt-5 group">
      <summary className="cursor-pointer text-sm font-medium text-primary">Technical details</summary>
      <ul className="mt-3 list-disc pl-5 space-y-1.5 text-sm text-muted-foreground leading-relaxed">
        {p.details.map((d) => (
          <li key={d}>{d}</li>
        ))}
      </ul>
    </details>

    <div className="mt-5 flex flex-wrap items-center gap-3">
      {p.links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn ${l.primary ? "btn-primary" : "btn-outline"}`}
        >
          {l.label} <ExternalLink size={14} aria-hidden="true" />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ))}
    </div>
    {p.note && <p className="mt-3 text-xs text-muted-foreground">{p.note}</p>}
  </article>
);
