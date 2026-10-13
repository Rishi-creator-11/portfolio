import { ExternalLink } from "lucide-react";
import { Section } from "./SectionHeading";
import { Bullets, Result, Details, ToolChips } from "./Parts";
import { experience, compactExperience } from "@/data/content";

const Case = ({ e }) => (
  <article id={e.id} className="scroll-mt-20 rounded-3xl border border-white/10 bg-navy-800 p-6 md:p-9">
    <p className="text-sm font-bold uppercase tracking-wider text-teal-glow">{e.kind}</p>
    <div className="mt-1 flex flex-col lg:flex-row lg:items-baseline lg:justify-between gap-1">
      <h3 className="text-3xl font-semibold tracking-tight">{e.org}</h3>
      <p className="text-base text-slate-300">
        {e.role} · {e.dates} · {e.place}
      </p>
    </div>
    <div className="mt-3 space-y-1.5">
      <ToolChips tools={e.tools} dark />
      {e.toolNote && <p className="text-sm text-slate-400">{e.toolNote}</p>}
    </div>
    <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-start">
      <Bullets items={e.bullets} dark />
      <div className="space-y-4">
        <Result dark>{e.result}</Result>
        <Details items={e.details} dark title="Implementation details" />
        {e.link && (
          <a href={e.link.href} target="_blank" rel="noopener noreferrer" className="btn btn-teal !py-2">
            {e.link.label} <ExternalLink size={14} aria-hidden="true" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        )}
      </div>
    </div>
  </article>
);

export const ExperienceSection = () => (
  <Section id="experience" title="Professional experience" theme="dark">
    <div className="space-y-6">
      <Case e={experience.metroprint} />
      <Case e={experience.pencil} />
    </div>
    <div id="experience-more" className="mt-6 grid gap-6 md:grid-cols-2 scroll-mt-20">
      {compactExperience.map((e) => (
        <article key={e.org} className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm font-bold uppercase tracking-wider text-teal-glow">Internship</p>
          <h3 className="mt-1 text-xl font-semibold">{e.org}</h3>
          <p className="text-base text-slate-300">{e.role} · {e.dates} · {e.place}</p>
          <ul className="mt-3 list-disc pl-5 space-y-1.5 text-base leading-relaxed">
            {e.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-slate-300"><span className="font-semibold">Tools: </span>{e.tools}</p>
          {e.note && <p className="mt-1 text-sm text-slate-400">{e.note}</p>}
        </article>
      ))}
    </div>
  </Section>
);
