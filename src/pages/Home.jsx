import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { HeroSection } from "@/components/HeroSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { SkillsEducationSection } from "@/components/SkillsEducationSection";
import { Section } from "@/components/SectionHeading";
import { StatRow, ImprovementBars } from "@/components/Visuals";
import { EvidenceMap } from "@/components/EvidenceMap";
import { WorkCards } from "@/components/WorkCards";

// The three things a reader should take away in under a minute, each with a link to proof.
const claims = [
  {
    claim: "I build working software and AI systems.",
    proof: "AlphaBrief is live: cited answers over 92 companies and 274 filings.",
    to: { href: "https://secfrontend.vercel.app/", label: "Open the demo", external: true },
  },
  {
    claim: "I solve business problems practically.",
    proof: "An owner's requirements became a live ordering platform with about 97 configurable products and an admin workspace.",
    to: { href: "https://www.metroprintmkt.com/", label: "Open the site", external: true },
  },
  {
    claim: "I take work from concept to deployment.",
    proof: "AlphaBrief end to end alone: ingestion, retrieval, API, interface, tests and deployment.",
    to: { href: "/projects#alphabrief", label: "See how it is built" },
  },
];

const principles = [
  { title: "Make the checkable part code", text: "TripPilot's budgets, dates and offer validity are deterministic; the model only helps with language.", id: "trippilot" },
  { title: "Scope before you search", text: "AlphaBrief filters by company and year before retrieval, then tests that nothing leaks across scopes.", id: "alphabrief" },
  { title: "Gate the irreversible", text: "Booking waits for explicit approval, replay escalates to a person, and Job Scout never sends on its own.", id: "computer-use" },
  { title: "Say what the number means", text: "Benchmarks are labeled with their coverage and judging method, and résumé-reported figures are marked as such.", id: "alphabrief" },
];

const numbers = [
  { value: "92 / 274", label: "companies and filings searchable in AlphaBrief" },
  { value: "≈97", label: "configurable products on a live storefront" },
  { value: "10+", label: "collaborative apps on one shared sync layer" },
  { value: "125", label: "question benchmark behind AlphaBrief's retrieval" },
];

const improvements = [
  { label: "Sync update latency", unit: "ms", before: 500, after: 100, upperBound: true, source: "Pencil: incremental JSON Patch diffs in the Mario sync layer." },
  { label: "Backend test coverage", unit: "%", before: 50, after: 90, source: "Vertically Integrated Program: Jest and Cypress in a CI gate." },
  { label: "Feature-data freshness lag", unit: "min", before: 60, after: 5, source: "99 YARDS: incremental updates to training and scoring data." },
];

export const Home = () => {
  usePageMeta(
    "Rishi Kumar — AI Applications and Production Software",
    "Rishi Kumar builds working AI products and business software: AlphaBrief (live), MetroPrint (live), TripPilot and more. Stony Brook CS graduate. Architecture, results and live links."
  );
  return (
    <>
      <HeroSection />

      <section aria-label="What I do" className="border-b border-border bg-background">
        <ul className="container grid gap-px py-0 md:grid-cols-3 md:gap-0">
          {claims.map((c, i) => (
            <li key={c.claim} className={`py-8 md:px-8 ${i > 0 ? "border-t border-border md:border-l md:border-t-0" : "md:pl-0"}`}>
              <p className="font-display text-2xl font-semibold leading-snug">{c.claim}</p>
              <p className="mt-2 text-[16px] leading-relaxed text-muted-foreground">{c.proof}</p>
              {c.to.external ? (
                <a href={c.to.href} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-[15px] font-semibold text-primary">
                  {c.to.label} <ArrowRight size={15} aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                <Link to={c.to.href} className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-[15px] font-semibold text-primary">
                  {c.to.label} <ArrowRight size={15} aria-hidden="true" />
                </Link>
              )}
            </li>
          ))}
        </ul>
      </section>

      <Section id="work" title="Work you can open">
        <WorkCards />
        <div className="mt-12">
          <StatRow stats={numbers} />
        </div>
        <p className="mt-6">
          <Link to="/projects" className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-primary">
            All projects, with architecture diagrams <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </p>
      </Section>

      <ExperienceSection />

      <Section id="results" title="Measured results">
        <ImprovementBars items={improvements} />
        <p className="mt-4 max-w-3xl text-[14px] leading-snug text-muted-foreground">
          Résumé-reported and approximate; the source projects are internships. AlphaBrief's retrieval benchmark is public and explained on the{" "}
          <Link to="/projects#alphabrief" className="font-semibold text-primary underline underline-offset-2">Projects page</Link>.
        </p>
      </Section>

      <Section id="approach" title="How I work" theme="alt">
        <ul className="grid gap-5 md:grid-cols-2">
          {principles.map((p) => (
            <li key={p.title} className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-display text-2xl font-semibold leading-snug">{p.title}</h3>
              <p className="mt-2 text-[16px] leading-relaxed text-muted-foreground">{p.text}</p>
              <Link to={`/projects#${p.id}`} className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-[15px] font-semibold text-primary">
                See it in the project <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="evidence" title="Skills, and the project that shows each one">
        <EvidenceMap />
      </Section>

      <SkillsEducationSection />

      <section className="on-dark bg-navy-900 py-16 text-white md:py-20">
        <div className="container flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl font-display text-3xl font-semibold leading-tight">See how the systems are built, or get in touch.</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/projects" className="btn btn-teal">Project deep dives <ArrowRight size={16} aria-hidden="true" /></Link>
            <Link to="/contact" className="btn btn-ghost-light">Contact</Link>
          </div>
        </div>
      </section>
    </>
  );
};
