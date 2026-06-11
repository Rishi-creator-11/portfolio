import { Calendar, Github } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const projects = [
  {
    id: 1,
    title: "AlphaBrief",
    role: "Founder & Software Engineer",
    date: "April 2026 – Present",
    tags: ["AI Agents", "Python", "SEC Research"],
    githubUrl: "https://github.com/",
    points: [
      "Built and deployed a multi-agent SEC research platform that analyzes 10-K filings across reporting periods.",
      "Generated evidence-backed investment theses through retrieval, ranking, and narrative synthesis pipelines.",
      "Designed materiality and investment-relevance scoring frameworks to rank changes by strategic significance and investor impact.",
      "Developed citation validation and semantic matching systems to ground AI-generated insights in source disclosures.",
    ],
  },
  {
    id: 2,
    title: "Real-Time Distributed Web Platform",
    role: "Independent Project",
    date: "August 2025 – December 2025",
    tags: ["React", "Node.js", "MongoDB"],
    githubUrl: "https://github.com/",
    points: [
      "Built a real-time web platform using React, Node.js, and MongoDB, developing 30+ REST APIs for client-server communication.",
      "Optimized API performance through efficient backend design and request handling, achieving sub-100ms response times.",
      "Implemented JWT-based authentication and role-based access control (RBAC) for secure API access.",
    ],
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <SectionHeading
          title="Featured"
          highlight="Projects"
          subtitle="AI agents, distributed systems, and developer tooling."
        />

        <div className="space-y-6">
          {projects.map((project) => (
            <article key={project.id} className="modern-card card-hover text-left">
              <div className="modern-card-accent" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

              <div className="p-6 md:p-7 pl-7 md:pl-8">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold tracking-tight">{project.title}</h3>
                    <p className="text-base font-medium text-primary">{project.role}</p>
                  </div>
                  <span className="date-badge">
                    <Calendar size={14} />
                    {project.date}
                  </span>
                </div>

                <ul className="space-y-3 border-t border-border/60 pt-5 mb-5">
                  {project.points.map((point) => (
                    <li key={point} className="bullet-item">
                      <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary/70" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-5">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-sm font-medium rounded-full bg-secondary text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-base text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Github size={16} />
                    Source
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
