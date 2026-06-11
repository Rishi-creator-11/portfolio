import { Briefcase, Calendar, MapPin } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const experiences = [
  {
    title: "Software Engineer Intern",
    company: "Pencil Spaces",
    location: "San Francisco, CA",
    date: "June 2025 – August 2025",
    points: [
      "Contributed to Mario, a real-time synchronization SDK built with TypeScript, WebSockets, and RxJS to manage shared client state across distributed applications, reducing update latency from 500ms to under 100ms.",
      "Designed event-driven synchronization flows to handle concurrent client updates and prevent state desynchronization.",
      "Integrated the SDK into 10+ production applications, standardizing real-time state synchronization across products.",
      "Automated CI/CD workflows with GitHub Actions and Docker, reducing release cycle time by 15%.",
    ],
  },
  {
    title: "Software Engineer Intern",
    company: "Vertically Integrated Program, Stony Brook University",
    location: "Stony Brook, NY",
    date: "August 2024 – December 2024",
    points: [
      "Developed a fintech platform with React, Node.js, and AWS (EC2, Lambda), implementing real-time transaction tracking and authenticated API workflows for 500+ users.",
      "Expanded unit and integration test coverage across backend services, improving reliability and reducing production defects.",
    ],
  },
  {
    title: "Teaching Assistant (Java and Data Structures)",
    company: "Stony Brook University",
    location: "Stony Brook, NY",
    date: "August 2024 – May 2025",
    points: [
      "Led debugging sessions and algorithm walkthroughs for 120+ students in Java and data structures.",
      "Mentored students on object-oriented design, debugging strategies, and complexity analysis to improve code quality.",
    ],
  },
  {
    title: "Software Engineer Intern",
    company: "99 YARDS",
    location: "New York, NY",
    date: "June 2024 – August 2024",
    points: [
      "Developed AI-driven recommendation workflows using Node.js, PostgreSQL, and OpenAI APIs to improve product discovery.",
      "Optimized an Express.js backend on AWS EC2, reducing API latency by 15% through PostgreSQL query improvements.",
    ],
  },
  {
    title: "Software Engineer Externship Program",
    company: "GEICO",
    location: "New York, NY",
    date: "March 2024 – March 2025",
    points: [
      "Received mentorship from a GEICO engineering manager on backend systems, software design, and engineering best practices.",
    ],
  },
];

export const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <SectionHeading
          title="Work"
          highlight="Experience"
          subtitle="Internships and roles across startups, enterprise, and academia."
        />

        <div className="relative">
          <div className="absolute left-5 top-3 bottom-3 w-px bg-gradient-to-b from-primary/30 via-border to-transparent hidden md:block" />

          <div className="space-y-6">
            {experiences.map((exp) => (
              <div key={`${exp.company}-${exp.date}`} className="relative md:pl-14">
                <div className="hidden md:flex absolute left-0 top-7 size-10 items-center justify-center rounded-full border border-primary/20 bg-card shadow-sm">
                  <Briefcase size={16} className="text-primary" />
                </div>

                <article className="modern-card card-hover text-left">
                  <div className="modern-card-accent" />
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

                  <div className="p-6 md:p-7 pl-7 md:pl-8">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold tracking-tight">{exp.title}</h3>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                          <span className="font-medium text-primary">{exp.company}</span>
                          <span className="inline-flex items-center gap-1 text-muted-foreground">
                            <MapPin size={14} className="shrink-0" />
                            {exp.location}
                          </span>
                        </div>
                      </div>
                      <span className="date-badge">
                        <Calendar size={14} />
                        {exp.date}
                      </span>
                    </div>

                    <ul className="space-y-3 border-t border-border/60 pt-5">
                      {exp.points.map((point) => (
                        <li key={point} className="bullet-item">
                          <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary/70" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
