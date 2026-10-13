import { ExternalLink, Search, Gauge, FileText, ShieldCheck } from "lucide-react";

export const BrowserFrame = ({ src, alt, caption, className = "", fit = "object-top" }) => (
  <figure className={className}>
    <div className="shot-shadow overflow-hidden rounded-xl border border-navy-700/40 bg-navy-950">
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-navy-800 px-3 py-2" aria-hidden="true">
        <span className="size-2.5 rounded-full bg-white/25" />
        <span className="size-2.5 rounded-full bg-white/25" />
        <span className="size-2.5 rounded-full bg-white/25" />
      </div>
      <img src={src} alt={alt} loading="lazy" className={`w-full h-auto max-h-[340px] object-cover ${fit}`} />
    </div>
    {caption && <figcaption className="mt-2 text-xs text-muted-foreground">{caption}</figcaption>}
  </figure>
);

export const Points = ({ points, dark }) => (
  <dl className="space-y-3">
    {points.map((p) => (
      <div key={p.label} className="grid sm:grid-cols-[112px_1fr] gap-0.5 sm:gap-4">
        <dt className={`text-xs font-bold uppercase tracking-wider pt-1 ${dark ? "text-teal-glow" : "text-primary"}`}>{p.label}</dt>
        <dd className="text-[15px] leading-relaxed">{p.text}</dd>
      </div>
    ))}
  </dl>
);

export const Tools = ({ tools, dark }) => (
  <div className="space-y-2">
    {tools.map((t) => (
      <div key={t.label} className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span className={`text-xs font-semibold ${dark ? "text-slate-300" : "text-muted-foreground"}`}>{t.label}:</span>
        {t.items.map((i) => (
          <span key={i} className={dark ? "inline-block rounded-md bg-white/10 px-2 py-0.5 text-xs font-medium" : "chip"}>
            {i}
          </span>
        ))}
      </div>
    ))}
  </div>
);

export const Details = ({ items, dark, title = "Technical details" }) => (
  <details className="group">
    <summary className={`cursor-pointer text-sm font-semibold ${dark ? "text-teal-glow" : "text-primary"}`}>{title}</summary>
    <ul className={`mt-3 list-disc pl-5 space-y-1.5 text-sm leading-relaxed ${dark ? "text-slate-300" : "text-muted-foreground"}`}>
      {items.map((d) => (
        <li key={d}>{d}</li>
      ))}
    </ul>
  </details>
);

export const LinkButtons = ({ links, dark }) => (
  <div className="flex flex-wrap items-center gap-2.5">
    {links.map((l) => (
      <a
        key={l.href}
        href={l.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`btn !py-2 ${l.primary ? (dark ? "btn-teal" : "btn-primary") : dark ? "btn-ghost-light" : "btn-outline"}`}
      >
        {l.label} <ExternalLink size={14} aria-hidden="true" />
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    ))}
  </div>
);

const icons = { search: Search, gauge: Gauge, file: FileText, check: ShieldCheck };

export const Workflow = ({ steps }) => (
  <ol className="grid gap-3 md:grid-cols-4">
    {steps.map((s, i) => {
      const Icon = icons[s.icon];
      return (
        <li
          key={s.step}
          className={`relative rounded-xl border p-4 ${s.gate ? "border-primary bg-primary/5" : "border-border bg-card"}`}
        >
          <div className="flex items-center gap-2">
            <span className={`grid size-8 place-items-center rounded-lg ${s.gate ? "bg-primary text-white" : "bg-navy-900 text-teal-glow"}`}>
              <Icon size={16} aria-hidden="true" />
            </span>
            <span className="text-xs font-bold text-muted-foreground">STEP {i + 1}</span>
          </div>
          <p className="mt-2 font-semibold">{s.step}</p>
          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{s.text}</p>
        </li>
      );
    })}
  </ol>
);

export const Stats = ({ stats, note, dark }) => (
  <div>
    <div className="grid grid-cols-2 gap-3">
      {stats.map((s) => (
        <div key={s.label} className={`rounded-xl p-4 ${dark ? "bg-white/5 border border-white/10" : "bg-secondary"}`}>
          <p className={`text-2xl md:text-[26px] font-semibold tracking-tight ${dark ? "text-teal-glow" : "text-primary"}`}>{s.value}</p>
          <p className={`mt-0.5 text-xs ${dark ? "text-slate-300" : "text-muted-foreground"}`}>{s.label}</p>
        </div>
      ))}
    </div>
    {note && <p className={`mt-2 text-xs ${dark ? "text-slate-400" : "text-muted-foreground"}`}>{note}</p>}
  </div>
);
