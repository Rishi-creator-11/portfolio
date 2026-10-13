import { ExternalLink } from "lucide-react";
import { Section } from "./SectionHeading";
import { Shot, Bullets, Outcome, Details, LinkButtons, ToolRow } from "./Parts";
import { experience, otherExperience, supporting } from "@/data/content";

const Case = ({ e }) => (
  <article id={e.id} className="scroll-mt-20 rounded-3xl border border-white/10 bg-navy-800 p-6 md:p-9">
    <div className={`grid gap-8 ${e.image ? "lg:grid-cols-2 lg:items-start" : ""}`}>
      <div className="space-y-4">
        <header>
          <h3 className="text-3xl font-semibold tracking-tight">{e.org}</h3>
          <p className="mt-1 text-base text-slate-300">
            <span className="font-semibold text-white">{e.role}</span> · {e.dates} | {e.place}
          </p>
          <p className="mt-3 text-xl font-medium">{e.sentence}</p>
        </header>
        <Bullets items={e.bullets} dark />
        <Outcome dark>{e.outcome}</Outcome>
        {e.relevance && <p className="text-base text-slate-300">{e.relevance}</p>}
        <ToolRow tools={e.tools} dark />
        {e.links && <LinkButtons links={e.links} dark />}
        {e.link && (
          <a href={e.link.href} target="_blank" rel="noopener noreferrer" className="btn btn-teal !py-2">
            {e.link.label} <ExternalLink size={14} aria-hidden="true" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        )}
        <Details items={e.details} dark title="Implementation details" />
      </div>
      {e.image && (
        <div className="space-y-4">
          <Shot {...e.image} />
          {e.admin && (
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-bold uppercase tracking-wider text-teal-glow">Admin workspace I built</p>
              <ul className="mt-2 list-disc pl-5 space-y-1.5 text-base leading-snug">
                {e.admin.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  </article>
);

export const ExperienceSection = () => (
  <Section id="experience" title="Professional experience" theme="dark">
    <div className="space-y-6">
      {experience.map((e) => (
        <Case key={e.id} e={e} />
      ))}
    </div>
    <div className="mt-6 grid gap-6 md:grid-cols-2">
      {otherExperience.map((e) => (
        <article key={e.org} className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h3 className="text-xl font-semibold">{e.org}</h3>
          <p className="text-base text-slate-300">
            <span className="font-semibold text-white">{e.role}</span> · {e.dates} | {e.place}
          </p>
          <p className="mt-3 text-lg font-medium">{e.sentence}</p>
          <p className="mt-1 text-base text-teal-glow">{e.result}</p>
        </article>
      ))}
    </div>
    <article className="mt-6 rounded-2xl border border-white/10 p-5">
      <p className="text-sm font-bold uppercase tracking-wider text-slate-300">{supporting.kind}</p>
      <h3 className="mt-1 text-xl font-semibold">{supporting.title}</h3>
      <p className="mt-1 text-base text-slate-300">{supporting.text}</p>
    </article>
  </Section>
);
