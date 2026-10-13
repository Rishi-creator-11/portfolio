import { ExternalLink } from "lucide-react";
import { Section } from "./SectionHeading";
import { more } from "@/data/content";

export const MoreWorkSection = () => (
  <Section id="more" title="More work and teaching" theme="alt">
    <div className="grid gap-5 md:grid-cols-3">
      {more.map((m) => (
        <article key={m.title} className="card flex flex-col">
          <p className="text-xs font-bold uppercase tracking-wider text-primary">{m.kind}</p>
          <h3 className="mt-1 text-lg font-semibold tracking-tight">{m.title}</h3>
          <p className="mt-2 text-[15px] leading-relaxed">{m.text}</p>
          {m.tools && <p className="mt-2 text-xs text-muted-foreground"><span className="font-semibold">Tools: </span>{m.tools}</p>}
          {m.detail && <p className="mt-1 text-xs text-muted-foreground">{m.detail}</p>}
          {m.link && (
            <a href={m.link.href} target="_blank" rel="noopener noreferrer" className="btn btn-outline !py-1.5 mt-auto self-start">
              {m.link.label} <ExternalLink size={13} aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
        </article>
      ))}
    </div>
  </Section>
);
