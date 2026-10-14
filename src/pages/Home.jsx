import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { HeroSection } from "@/components/HeroSection";
import { ContactPanel } from "@/components/ContactPanel";
import { roles } from "@/data/experience";
import { skills, education } from "@/data/content";

// Three accomplishments, each with the number that proves it and why it transfers.
const built = [
  {
    id: "alphabrief",
    name: "AlphaBrief",
    big: "0.88 MRR",
    bigNote: "125-question retrieval benchmark (earlier, 10-company version)",
    text: "A research assistant that answers questions about SEC filings and shows the passage behind every answer. Company and year scope is applied before retrieval, and tests assert zero cross-company leakage.",
    transfer: "Answers a team can check against the source document.",
  },
  {
    id: "pencil",
    name: "Mario SDK, Pencil Learning",
    big: "500 → <100 ms",
    bigNote: "shared-state update latency, across 10+ apps",
    text: "Core sync infrastructure for collaborative apps: JSON Patch diffs and Yjs CRDT merging, shipped through an automated GitHub Actions and Docker release pipeline.",
    transfer: "Integrating into other teams' applications and release process.",
  },
  {
    id: "metroprint",
    name: "MetroPrint ordering platform",
    big: "≈97 products",
    bigNote: "configurable in one place, with validated pricing",
    text: "A production Next.js platform built from a business owner's own workflows: scripted ingestion of 80 products and 559 pricing rows, and checkout totals checked on client and server.",
    transfer: "Taking a business owner's process to a tool people use.",
  },
];

// Each row ties a responsibility in the AI Specialist posting to work I have shipped.
const fit = [
  {
    ask: "Lead intake and quoting",
    shipped: "MetroPrint turned an owner's product and price rules into structured, validated orders. TripPilot turns a free-text request into a typed brief.",
    idea: "Turn an incoming charter request into a structured brief and list the details an advisor still needs to confirm.",
  },
  {
    ask: "Comparing aircraft options and operator quotes",
    shipped: "AlphaBrief extracts and compares figures across long documents, with every answer linked to its source passage.",
    idea: "Pull key terms from supplied quotes into one table where each value points back to its source line.",
  },
  {
    ask: "Assistants that hand off to human advisors",
    shipped: "TripPilot keeps money, dates and availability in code, uses the model only for language, and pauses for explicit approval before anything irreversible.",
    idea: "Draft replies and trip summaries that stop at an advisor's approval, with a change log to pick up where a colleague left off.",
  },
  {
    ask: "Partnering with developers on production features",
    shipped: "At Pencil I built into a shared SDK used by 10+ apps and automated its build, test and npm release.",
    idea: "Prototype in the team's repos, review through pull requests, then plan how each workflow becomes a production feature.",
  },
  {
    ask: "Evaluating tools and measuring what works",
    shipped: "AlphaBrief has a 125-question benchmark whose scores I re-measured and published even when they dropped (0.88 to 0.86).",
    idea: "Compare candidate tools on a small set of real tasks, and track time saved per workflow before deciding what to adopt.",
  },
  {
    ask: "Handling client data responsibly",
    shipped: "AlphaBrief's scope isolation is tested in CI. TripPilot keeps provider secrets server-side and collects no card data.",
    idea: "Answer staff questions only from approved documents, and say so when those documents do not cover the question.",
  },
];

export const Home = () => {
  usePageMeta(
    "Rishi Kumar — AI Systems and Production Software",
    "Rishi Kumar, Stony Brook computer science graduate: retrieval-augmented AI, real-time sync infrastructure and business software, with measured results and architecture diagrams."
  );
  return (
    <>
      <HeroSection />

      <section id="built" aria-labelledby="built-h" className="bg-background py-16 md:py-24">
        <div className="container">
          <h2 id="built-h" className="max-w-2xl font-display text-3xl font-semibold tracking-tight md:text-5xl">Three things I built, and what they show</h2>
          <ol className="mt-10 divide-y divide-border border-y border-border">
            {built.map((b) => (
              <li key={b.id} className="grid gap-4 py-8 md:grid-cols-[1fr_1.4fr_1fr] md:gap-10">
                <div>
                  <h3 className="font-display text-xl font-semibold">{b.name}</h3>
                  <p className="mt-3 font-display text-4xl font-semibold leading-none text-primary">{b.big}</p>
                  <p className="mt-2 text-[14px] leading-snug text-muted-foreground">{b.bigNote}</p>
                </div>
                <p className="text-[17px] leading-relaxed">{b.text}</p>
                <div>
                  <p className="border-l-2 border-primary pl-4 text-[16px] leading-snug">{b.transfer}</p>
                  <Link to={`/projects#${b.id}`} className="mt-2 inline-flex min-h-11 items-center gap-1.5 text-[15px] font-semibold text-primary">
                    How it works <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="flygreen" aria-labelledby="flygreen-h" className="bg-secondary py-16 md:py-24">
        <div className="container">
          <h2 id="flygreen-h" className="max-w-3xl font-display text-3xl font-semibold tracking-tight md:text-5xl">Where I could contribute at Flygreen</h2>
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-muted-foreground">
            Ideas for discussion, based on the AI Specialist posting and my own projects. They are not claims about Flygreen's systems or workflows.
          </p>
          <div className="mt-10 hidden grid-cols-[1fr_1.4fr_1.4fr] gap-x-8 border-b border-foreground/30 pb-3 text-[14px] font-semibold md:grid">
            <span>The role asks for</span>
            <span>What I've shipped</span>
            <span>An idea to discuss</span>
          </div>
          <ul className="divide-y divide-border md:mt-0">
            {fit.map((r) => (
              <li key={r.ask} className="grid gap-2 py-6 md:grid-cols-[1fr_1.4fr_1.4fr] md:gap-x-8">
                <h3 className="font-display text-xl font-semibold leading-snug">{r.ask}</h3>
                <p className="text-[16px] leading-relaxed"><span className="font-semibold md:hidden">Shipped: </span>{r.shipped}</p>
                <p className="text-[16px] leading-relaxed text-muted-foreground"><span className="font-semibold md:hidden">Idea: </span>{r.idea}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="experience" aria-labelledby="experience-h" className="bg-background py-16 md:py-24">
        <div className="container grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <h2 id="experience-h" className="font-display text-3xl font-semibold tracking-tight md:text-5xl">Experience</h2>
          <ol className="divide-y divide-border border-y border-border">
            {roles.map((r) => (
              <li key={r.id} className="grid gap-1 py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
                <p className="text-[15px] text-muted-foreground">{r.dates}</p>
                <div>
                  <h3 className="font-display text-lg font-semibold leading-snug">{r.org} <span className="font-sans text-[16px] font-normal text-muted-foreground">· {r.role}</span></h3>
                  <p className="mt-1 text-[16px] leading-relaxed">{r.headline}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="skills" aria-labelledby="skills-h" className="bg-background pb-16 md:pb-24">
        <div className="container grid gap-10 border-t border-border pt-16 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <div>
            <h2 id="skills-h" className="font-display text-3xl font-semibold tracking-tight md:text-5xl">Skills</h2>
            <p className="mt-6 font-semibold">{education.school}</p>
            <p>{education.degree}, {education.specialization.replace("Specialization in ", "")}</p>
            <p className="text-muted-foreground">{education.dates} · GPA 3.6 · Dean's List, six semesters</p>
          </div>
          <dl className="divide-y divide-border border-y border-border">
            {skills.map((s) => (
              <div key={s.label} className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
                <dt className="font-semibold">{s.label}</dt>
                <dd className="text-muted-foreground">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="contact" aria-labelledby="contact-h" className="border-t border-border bg-secondary py-16 md:py-24">
        <div className="container">
          <h2 id="contact-h" className="font-display text-3xl font-semibold tracking-tight md:text-5xl">Let's talk</h2>
          <p className="mb-10 mt-4 max-w-2xl text-[17px] leading-relaxed text-muted-foreground">
            I'd like to discuss how I could help Flygreen build and adopt AI tools. Email is the fastest way to reach me; the form goes to the same inbox.
          </p>
          <ContactPanel />
        </div>
      </section>
    </>
  );
};
