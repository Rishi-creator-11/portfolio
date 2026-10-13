import { Section } from "./SectionHeading";
import { ProjectCard } from "./ProjectCard";
import { featured, tinkering } from "@/data/content";

export const FeaturedWork = () => (
  <Section
    id="work"
    title="Featured work"
    intro="What I built, what I personally did, and what is and is not measured."
  >
    <div className="space-y-6">
      {featured.map((p) => (
        <ProjectCard key={p.id} project={p} />
      ))}
    </div>
    <div className="mt-6 rounded-xl border border-dashed border-border p-5">
      <h3 className="font-semibold">Also tinkering: {tinkering.title}</h3>
      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{tinkering.text}</p>
    </div>
  </Section>
);
