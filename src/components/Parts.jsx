import { ExternalLink, ChevronRight, Search, Gauge, FileText, ShieldCheck } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";

export const ToolLine = ({ tools, dark }) => (
  <p className={`text-[15px] leading-snug ${dark ? "text-slate-300" : "text-muted-foreground"}`}>
    <span className={`font-semibold ${dark ? "text-white" : "text-foreground"}`}>Tools </span>
    {tools.join(", ")}
  </p>
);

export const Bullets = ({ items, dark }) => (
  <ul className="space-y-3 text-[17px] leading-relaxed">
    {items.map((b) => (
      <li key={b} className="flex gap-3.5">
        <span className={`mt-[0.8em] h-px w-4 shrink-0 ${dark ? "bg-teal-glow" : "bg-primary"}`} aria-hidden="true" />
        <span>{b}</span>
      </li>
    ))}
  </ul>
);

export const Outcome = ({ children }) => {
  const [ref, inView] = useInView();
  return (
    <p className="text-lg font-medium leading-[1.7]">
      <span className="font-semibold">Outcome </span>
      <span ref={ref} className={`marker ${inView ? "is-in" : ""}`}>
        {children}
      </span>
    </p>
  );
};

export const Details = ({ items, dark, title = "Technical details" }) => (
  <details className="group">
    <summary className={`inline-flex min-h-11 items-center gap-1.5 text-[15px] font-semibold ${dark ? "text-teal-glow" : "text-primary"}`}>
      <ChevronRight size={16} className="chev" aria-hidden="true" /> {title}
    </summary>
    <ul className={`mt-2 list-disc space-y-2 pl-6 text-base leading-relaxed ${dark ? "text-slate-300" : "text-muted-foreground"}`}>
      {items.map((d) => (
        <li key={d}>{d}</li>
      ))}
    </ul>
  </details>
);

// Anchor that opens in a new tab and announces that to screen readers.
export const NewTabLink = ({ href, className, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
    {children}
    <span className="sr-only"> (opens in a new tab)</span>
  </a>
);

export const ExternalButton = ({ href, label, className }) => (
  <NewTabLink href={href} className={className}>
    {label} <ExternalLink size={14} aria-hidden="true" />
  </NewTabLink>
);

const buttonVariant = (primary, dark) => {
  if (primary) return dark ? "btn-teal" : "btn-primary";
  return dark ? "btn-ghost-light" : "btn-outline";
};

export const LinkButtons = ({ links, dark }) => (
  <div className="flex flex-wrap items-center gap-2.5">
    {links.map((l) => (
      <ExternalButton key={l.href} href={l.href} label={l.label} className={`btn ${buttonVariant(l.primary, dark)}`} />
    ))}
  </div>
);

export const Shot = ({ src, alt, className = "" }) => (
  <div className={`frame lift overflow-hidden rounded-lg border border-foreground/15 bg-navy-950 ${className}`}>
    <img src={src} alt={alt} loading="lazy" className="block w-full h-auto max-h-[520px] object-cover object-top" />
  </div>
);

const icons = { search: Search, gauge: Gauge, file: FileText, check: ShieldCheck };

export const Workflow = ({ steps }) => (
  <ol className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
    {steps.map((s, i) => {
      const Icon = icons[s.icon];
      return (
        <li key={s.step} className={`flex gap-4 p-5 ${s.gate ? "bg-primary/10" : "bg-card"}`}>
          <span className={`grid size-10 shrink-0 place-items-center rounded-full ${s.gate ? "bg-primary text-white" : "bg-navy-900 text-teal-glow"}`}>
            <Icon size={18} aria-hidden="true" />
          </span>
          <div>
            <p className="font-display text-lg font-semibold leading-tight">
              {i + 1}. {s.step}
            </p>
            <p className="mt-0.5 text-[15px] leading-snug text-muted-foreground">{s.text}</p>
          </div>
        </li>
      );
    })}
  </ol>
);
