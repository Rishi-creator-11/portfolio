import { ExternalLink } from "lucide-react";
import { Section } from "./SectionHeading";
import { Points, Tools, Details, Stats } from "./Parts";
import { experience, compactExperience } from "@/data/content";

const Case = ({ e }) => (
  <article id={e.id} className="scroll-mt-20 rounded-3xl border border-white/10 bg-navy-800 p-6 md:p-9">
    <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr]">
      <div className="space-y-5">
        <header>
          <p className="text-xs font-bold uppercase tracking-wider text-teal-glow">{e.kind}</p>
          <h3 className="mt-1 text-2xl font-semibold tracking-tight">{e.org}</h3>
          <p className="text-sm text-slate-300">
            {e.role} · {e.dates} · {e.place}
          </p>
          <p className="mt-3 text-lg font-medium">{e.headline}</p>
        </header>
        <Points points={e.points} dark />
        <Tools tools={e.tools} dark />
        <Details items={e.details} dark title="Implementation details" />
        {e.link && (
          <a href={e.link.href} target="_blank" rel="noopener noreferrer" className="btn btn-teal !py-2">
            {e.link.label} <ExternalLink size={14} aria-hidden="true" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        )}
      </div>
      <div className="space-y-5">
        <Stats stats={e.stats} note={e.statNote} dark />
        {e.apps && (
          <div>
            <p className="text-xs font-semibold text-slate-300">Apps I worked on</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {e.apps.map((a) => (
                <li key={a} className="rounded-md bg-white/10 px-2.5 py-1 text-xs font-medium">{a}</li>
              ))}
            </ul>
          </div>
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
          <p className="text-xs font-bold uppercase tracking-wider text-teal-glow">Internship</p>
          <h3 className="mt-1 text-lg font-semibold">{e.org}</h3>
          <p className="text-sm text-slate-300">{e.role} · {e.dates} · {e.place}</p>
          <ul className="mt-3 list-disc pl-5 space-y-1.5 text-sm leading-relaxed">
            {e.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-slate-300">
            <span className="font-semibold">Tools: </span>
            {e.tools}
          </p>
          {e.note && <p className="mt-1 text-xs text-slate-400">{e.note}</p>}
        </article>
      ))}
    </div>
  </Section>
);
