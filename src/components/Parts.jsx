import { ExternalLink, Search, Gauge, FileText, ShieldCheck, CheckCircle2 } from "lucide-react";

export const ToolRow = ({ tools, dark }) => (
  <p className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-sm">
    <span className={`font-semibold ${dark ? "text-slate-300" : "text-muted-foreground"}`}>Tools</span>
    {tools.map((t) => (
      <span key={t} className={`rounded-md px-2 py-0.5 font-medium ${dark ? "bg-white/10" : "bg-secondary"}`}>
        {t}
      </span>
    ))}
  </p>
);

export const Bullets = ({ items, dark }) => (
  <ul className="space-y-2.5 text-[17px] leading-relaxed">
    {items.map((b) => (
      <li key={b} className="flex gap-3">
        <span className={`mt-2.5 size-1.5 shrink-0 rounded-full ${dark ? "bg-teal-glow" : "bg-primary"}`} aria-hidden="true" />
        <span>{b}</span>
      </li>
    ))}
  </ul>
);

export const Outcome = ({ children, dark }) => (
  <p
    className={`flex items-start gap-2.5 rounded-xl px-4 py-3 text-base font-semibold leading-snug ${
      dark ? "bg-teal-glow/15 text-teal-glow" : "bg-primary/10 text-primary"
    }`}
  >
    <CheckCircle2 size={20} className="mt-0.5 shrink-0" aria-hidden="true" />
    <span>
      <span className="font-bold">Outcome: </span>
      {children}
    </span>
  </p>
);

export const Details = ({ items, dark, title = "Technical details" }) => (
  <details>
    <summary className={`cursor-pointer text-base font-semibold ${dark ? "text-teal-glow" : "text-primary"}`}>{title}</summary>
    <ul className={`mt-3 list-disc pl-5 space-y-2 text-base leading-relaxed ${dark ? "text-slate-300" : "text-muted-foreground"}`}>
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

export const Shot = ({ src, alt, className = "" }) => (
  <div className={`shot-shadow overflow-hidden rounded-xl border border-navy-700/40 bg-navy-950 ${className}`}>
    <div className="flex items-center gap-1.5 border-b border-white/10 bg-navy-800 px-3 py-2" aria-hidden="true">
      <span className="size-2.5 rounded-full bg-white/25" />
      <span className="size-2.5 rounded-full bg-white/25" />
      <span className="size-2.5 rounded-full bg-white/25" />
    </div>
    <img src={src} alt={alt} loading="lazy" className="w-full h-auto max-h-[480px] object-cover object-top" />
  </div>
);

const icons = { search: Search, gauge: Gauge, file: FileText, check: ShieldCheck };

export const Workflow = ({ steps }) => (
  <ol className="grid grid-cols-2 gap-3">
    {steps.map((s, i) => {
      const Icon = icons[s.icon];
      return (
        <li key={s.step} className={`rounded-xl border p-4 ${s.gate ? "border-primary bg-primary/10" : "border-border bg-card"}`}>
          <span className={`grid size-9 place-items-center rounded-lg ${s.gate ? "bg-primary text-white" : "bg-navy-900 text-teal-glow"}`}>
            <Icon size={18} aria-hidden="true" />
          </span>
          <p className="mt-2 text-lg font-semibold">
            {i + 1}. {s.step}
          </p>
          <p className="text-[15px] leading-snug text-muted-foreground">{s.text}</p>
        </li>
      );
    })}
  </ol>
);
