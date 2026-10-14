import { useId } from "react";
import { useInView } from "@/hooks/use-in-view";
import { isolationChecks, responsibilitySplit } from "@/data/projects";

const TONE = { primary: "bg-primary", muted: "bg-[#8a97a8]" };

/**
 * Grouped horizontal bars with a real data table for screen readers.
 * @param {{ chart: { title: string, caption: string, series: { name: string, tone: "primary"|"muted" }[], rows: { label: string, values: number[] }[], max: number, format: (v: number) => string } }} props
 */
export const BarCompare = ({ chart }) => {
  const uid = useId();
  const [ref, inView] = useInView(0.3);
  return (
    <figure ref={ref} className="rounded-xl border border-border bg-card p-4 sm:p-6" aria-labelledby={`${uid}-t`}>
      <figcaption>
        <p id={`${uid}-t`} className="font-display text-lg font-semibold">{chart.title}</p>
        <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[13px] text-muted-foreground" aria-label="Legend">
          {chart.series.map((s) => (
            <li key={s.name} className="flex items-center gap-1.5">
              <span className={`inline-block h-3 w-3 rounded-sm ${TONE[s.tone]}`} aria-hidden="true" />
              {s.name}
            </li>
          ))}
        </ul>
      </figcaption>
      <div className="mt-5 space-y-5" aria-hidden="true">
        {chart.rows.map((r) => (
          <div key={r.label}>
            <p className="mb-1.5 text-[15px] font-semibold">{r.label}</p>
            <div className="space-y-1.5">
              {r.values.map((v, i) => (
                <div key={chart.series[i]?.name ?? i} className="flex items-center gap-3">
                  <div className="h-5 flex-1 rounded-sm bg-secondary">
                    <div
                      className={`bar-fill h-full rounded-sm ${TONE[chart.series[i]?.tone ?? "primary"]}`}
                      style={{ width: inView ? `${(v / chart.max) * 100}%` : "0%" }}
                    />
                  </div>
                  <span className="w-16 shrink-0 text-right text-[15px] font-semibold tabular-nums">{chart.format(v)}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <table className="sr-only">
        <caption>{chart.title}</caption>
        <thead>
          <tr>
            <th scope="col">Metric</th>
            {chart.series.map((s) => (
              <th key={s.name} scope="col">{s.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {chart.rows.map((r) => (
            <tr key={r.label}>
              <th scope="row">{r.label}</th>
              {r.values.map((v, i) => (
                <td key={chart.series[i]?.name ?? i}>{chart.format(v)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-5 border-t border-border pt-3 text-[14px] leading-snug text-muted-foreground">{chart.caption}</p>
    </figure>
  );
};

/** Structural isolation checks asserted by tests: values are exact, not sampled. */
export const IsolationChecks = () => (
  <figure className="rounded-xl border border-border bg-card p-4 sm:p-6">
    <figcaption className="font-display text-lg font-semibold">Scope isolation, asserted by tests</figcaption>
    <table className="mt-3 w-full text-left text-[15px]">
      <thead className="text-[13px] text-muted-foreground">
        <tr>
          <th scope="col" className="pb-2 font-medium">Check</th>
          <th scope="col" className="pb-2 text-right font-medium">Result</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-border">
        {isolationChecks.map((c) => (
          <tr key={c.label}>
            <th scope="row" className="py-2 pr-3 font-normal">
              {c.label}
              <span className="sr-only">, {c.want}</span>
            </th>
            <td className="py-2 text-right font-semibold tabular-nums text-primary">{c.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <p className="mt-3 text-[14px] leading-snug text-muted-foreground">
      From tests/test_multiyear*.py, test_comparison.py and test_filters.py in the repository (362 of 362 backend tests passing). These guard correctness structurally rather than sampling it from a benchmark.
    </p>
  </figure>
);

/** TripPilot's documented split between deterministic code and optional LLM work. */
export const ResponsibilitySplit = () => (
  <figure className="rounded-xl border border-border bg-card p-4 sm:p-6">
    <figcaption className="font-display text-lg font-semibold">Who decides what</figcaption>
    <div className="mt-4 grid gap-4 sm:grid-cols-[3fr_2fr]">
      <section aria-label="Deterministic code" className="rounded-lg border-l-4 border-primary bg-secondary/60 p-4">
        <h4 className="font-display text-base font-semibold text-primary">Deterministic code</h4>
        <ul className="mt-2 space-y-1 text-[15px]">
          {responsibilitySplit.deterministic.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </section>
      <section aria-label="Optional model" className="rounded-lg border-l-4 border-[#d9a400] bg-secondary/60 p-4">
        <h4 className="font-display text-base font-semibold">Optional LLM</h4>
        <ul className="mt-2 space-y-1 text-[15px]">
          {responsibilitySplit.llm.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </section>
    </div>
    <p className="mt-4 text-[14px] leading-snug text-muted-foreground">
      Without an OpenAI key, planning uses a conservative generic parser. Both extraction paths must validate as a source-aware intent, so extraction cannot invent provider IDs, prices, coordinates or availability.
    </p>
  </figure>
);

/** Row of big numbers with labels. */
export const StatRow = ({ stats }) =>
  stats.length ? (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col-reverse justify-end gap-2 bg-card p-4">
          <dt className="text-[14px] leading-snug text-muted-foreground">{s.label}</dt>
          <dd className="font-display text-3xl font-semibold leading-none tracking-tight">{s.value}</dd>
        </div>
      ))}
    </dl>
  ) : null;

/**
 * Before/after bars. Each row has its own unit, so bars show the change relative to the "before" value.
 * @param {{ items: { label: string, unit: string, before: number, after: number, upperBound?: boolean, source: string }[] }} props
 */
export const ImprovementBars = ({ items }) => (
  <ul className="grid gap-4 md:grid-cols-3">
    {items.map((m) => {
      const hi = Math.max(m.before, m.after);
      return (
        <li key={m.label} className="rounded-xl border border-border bg-card p-5">
          <p className="font-display text-lg font-semibold leading-snug">{m.label}</p>
          {[["Before", m.before, "bg-border"], ["After", m.after, "bg-primary"]].map(([name, v, color]) => (
            <div key={name} className="mt-3">
              <div className="flex items-baseline justify-between text-[15px]">
                <span className="text-muted-foreground">{name}</span>
                <span className="font-semibold tabular-nums">{name === "After" && m.upperBound ? "under " : ""}{v} {m.unit}</span>
              </div>
              <div className="mt-1 h-3 rounded-full bg-secondary" role="img" aria-label={`${name}: ${v} ${m.unit}`}>
                <div className={`h-3 rounded-full ${color}`} style={{ width: `${(v / hi) * 100}%` }} />
              </div>
            </div>
          ))}
          <p className="mt-3 text-[14px] leading-snug text-muted-foreground">{m.source}</p>
        </li>
      );
    })}
  </ul>
);
