import { roles } from "@/data/experience";
import { ToolLine } from "./Parts";

const Dot = () => <span className="mt-[0.8em] h-px w-4 shrink-0 bg-teal-glow" aria-hidden="true" />;

/** One card per role: what I engineered, problems solved, measured impact. All content is visible. */
export const RoleCards = () => (
  <div className="space-y-6">
    {roles.map((r) => (
      <article key={r.id} id={`role-${r.id}`} aria-labelledby={`role-${r.id}-h`} className="scroll-mt-24 rounded-xl border border-white/15 bg-white/[0.03] p-5 md:p-7">
        <header className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
          <div>
            <h3 id={`role-${r.id}-h`} className="font-display text-2xl font-semibold leading-tight md:text-3xl">{r.org}</h3>
            <p className="mt-1 text-[16px] text-slate-300">
              <span className="font-semibold text-white">{r.role}</span> · {r.kind}
            </p>
          </div>
          <p className="text-[15px] text-slate-300 md:text-right">{r.dates}<br className="hidden md:block" /> <span className="md:block">{r.place}</span></p>
        </header>

        <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/15 bg-white/15 md:grid-cols-4">
          {r.metrics.map((m) => (
            <div key={m.label} className="flex flex-col-reverse justify-end gap-1 bg-navy-900 p-3.5">
              <dt className="text-[13px] leading-snug text-slate-300">{m.label}</dt>
              <dd className="font-display text-xl font-semibold leading-none tracking-tight text-teal-glow md:text-2xl">{m.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_1fr]">
          <section aria-label="What I engineered">
            <h4 className="font-display text-lg font-semibold text-teal-glow">What I engineered</h4>
            <ul className="mt-2 space-y-2.5 text-[16px] leading-relaxed">
              {r.engineered.map((e) => (
                <li key={e} className="flex gap-3"><Dot /><span>{e}</span></li>
              ))}
            </ul>
          </section>
          <section aria-label="Problems and solutions">
            <h4 className="font-display text-lg font-semibold text-teal-glow">Problems and how I solved them</h4>
            <ul className="mt-2 space-y-3 text-[16px] leading-snug">
              {r.problems.map((p) => (
                <li key={p.problem}>
                  <p className="font-semibold">{p.problem}</p>
                  <p className="mt-0.5 text-slate-300">{p.solution}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <p className="mt-5 rounded-lg bg-teal-glow/10 px-4 py-2.5 text-[15px] leading-snug text-teal-glow">
          <span className="font-semibold">Impact. </span>
          {r.impact.join(" ")}
        </p>
        <div className="mt-4"><ToolLine tools={r.tools} dark /></div>
      </article>
    ))}
  </div>
);
