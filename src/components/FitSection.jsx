import { Section } from "./SectionHeading";
import { fit } from "@/data/content";

export const FitSection = () => (
  <Section id="fit" title={fit.heading}>
    <div className="max-w-3xl space-y-3 text-[15px] leading-relaxed">
      <p className="font-medium">{fit.intro}</p>
      {fit.body.map((t) => (
        <p key={t}>{t}</p>
      ))}
      <div className="rounded-xl border border-border bg-card p-4">
        <p className="font-semibold">Why me</p>
        <p className="mt-1">{fit.whyYou}</p>
      </div>
      <p className="text-xs text-muted-foreground">{fit.disclaimer}</p>
    </div>
  </Section>
);
