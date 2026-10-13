import { capabilityGrid, toolLegend } from "@/data/content";

const A = ({ href, children }) => (
  <a href={href} className="underline decoration-primary/40 underline-offset-2 hover:decoration-primary hover:text-primary">
    {children}
  </a>
);

export const CapabilityGrid = () => (
  <section aria-label="Capabilities" className="bg-secondary py-10 md:py-12">
    <div className="container">
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {capabilityGrid.map((c) => (
          <li key={c.title} className="rounded-2xl border border-border bg-card p-5">
            <h2 className="flex items-center gap-2.5 text-lg font-semibold tracking-tight">
              <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-navy-900 text-sm text-teal-glow">{c.n}</span>
              {c.title}
            </h2>
            {c.lines && (
              <ul className="mt-3 space-y-1.5 text-base leading-snug">
                {c.lines.map((l) => (
                  <li key={l.text}><A href={l.href}>{l.text}</A></li>
                ))}
              </ul>
            )}
            {c.inline && (
              <p className="mt-3 text-base leading-snug">
                {c.inline.map((l, i) => (
                  <span key={l.text}>
                    <A href={l.href}>{l.text}</A>
                    {i < c.inline.length - 1 ? ", " : "."}
                  </span>
                ))}
              </p>
            )}
          </li>
        ))}
      </ul>
      <dl className="mt-6 grid gap-x-8 gap-y-2 text-[15px] md:grid-cols-2">
        {toolLegend.map((t) => (
          <div key={t.label}>
            <dt className="inline font-semibold">{t.label}: </dt>
            <dd className="inline text-muted-foreground">{t.items}</dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);
