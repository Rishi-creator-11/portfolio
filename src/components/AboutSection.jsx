import { SectionHeading } from "./SectionHeading";

export const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <SectionHeading title="About" highlight="Me" />

        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-10 items-start">
          <div className="flex justify-center md:justify-start">
            <img
              src="/profile.png"
              alt="Rishi Kumar"
              className="w-56 h-56 md:w-64 md:h-64 rounded-2xl object-cover border border-border shadow-md"
            />
          </div>

          <div className="space-y-5 text-left">
            <p className="text-base text-muted-foreground leading-relaxed">
              Software engineer focused on AI agents, distributed systems, and
              developer tooling. Recently built{" "}
              <span className="text-foreground font-medium">AlphaBrief</span>, a
              multi-agent SEC research platform that analyzes SEC filings and
              generates evidence-backed investment theses.
            </p>

            <p className="text-base text-muted-foreground leading-relaxed">
              At <span className="text-foreground font-medium">Pencil Spaces</span>,
              I contributed to Mario, a real-time synchronization SDK that powers
              collaborative applications through low-latency shared state
              synchronization.
            </p>

            <p className="text-base text-muted-foreground leading-relaxed">
              Interested in AI agents, workflow orchestration, distributed
              systems, and developer tooling.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {[
                "AI Agents",
                "Workflow Orchestration",
                "Distributed Systems",
                "Developer Tooling",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm font-medium rounded-full bg-secondary text-secondary-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
