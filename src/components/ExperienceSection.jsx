import { Section } from "./SectionHeading";
import { Shot, Bullets, Outcome, Details, LinkButtons, ToolLine, ExternalButton } from "./Parts";
import { experience, otherExperience, supporting } from "@/data/content";

const Row = ({ id, rail, children }) => (
  <article id={id} className="grid scroll-mt-24 gap-5 border-t border-white/20 pt-10 lg:grid-cols-[14rem_1fr] lg:gap-16">
    <div className="text-[15px] leading-snug text-slate-300 lg:sticky lg:top-24 lg:self-start">{rail}</div>
    <div className="min-w-0 space-y-6">{children}</div>
  </article>
);

const Rail = ({ dates, place }) => (
  <>
    <p className="font-semibold text-white">{dates}</p>
    <p>{place}</p>
  </>
);

const Heading = ({ title, subtitle, big }) => (
  <header>
    <h3 className={`font-semibold leading-tight ${big ? "text-3xl md:text-4xl" : "text-2xl"}`}>{title}</h3>
    <p className="mt-1 text-lg text-slate-300">{subtitle}</p>
  </header>
);

const Case = ({ e }) => (
  <Row id={e.id} rail={<Rail dates={e.dates} place={e.place} />}>
    <Heading title={e.org} subtitle={e.role} big />
    {e.image && <Shot {...e.image} />}
    {e.admin && (
      <div className="border-l-2 border-teal-glow pl-5">
        <p className="font-display text-lg font-semibold">Admin workspace I built</p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-base leading-snug text-slate-200">
          {e.admin.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </div>
    )}
    <Bullets items={e.bullets} dark />
    <Outcome>{e.outcome}</Outcome>
    <ToolLine tools={e.tools} dark />
    <div className="flex flex-wrap items-center gap-3">
      {e.links && <LinkButtons links={e.links} dark />}
      {e.link && <ExternalButton href={e.link.href} label={e.link.label} className="btn btn-teal" />}
    </div>
    <Details items={e.details} dark title="Implementation details" />
  </Row>
);

export const ExperienceSection = () => (
  <Section id="experience" title="Experience" theme="dark">
    <div className="space-y-16">
      {experience.map((e) => (
        <Case key={e.id} e={e} />
      ))}
      {otherExperience.map((e) => (
        <Row key={e.org} rail={<Rail dates={e.dates} place={e.place} />}>
          <Heading title={e.org} subtitle={e.role} />
          <Bullets items={e.bullets} dark />
        </Row>
      ))}
      <Row rail={<p className="font-semibold text-white">September 2025 – December 2025</p>}>
        <Heading title={supporting.title} subtitle="Supporting Independent Project" />
        <p className="text-[17px] leading-relaxed text-slate-200">{supporting.text}</p>
      </Row>
    </div>
  </Section>
);
