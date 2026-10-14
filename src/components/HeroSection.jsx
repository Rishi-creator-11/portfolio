import { Github } from "lucide-react";
import { Link } from "react-router-dom";
import { links } from "@/data/content";
import { HeroVideo } from "./HeroVideo";
import { ExternalButton, NewTabLink } from "./Parts";

// Three numbers a reader can check on the Projects page.
const proof = [
  { value: "320+", label: "automated tests behind AlphaBrief, my RAG research assistant" },
  { value: "74%", label: "lower median answer latency in AlphaBrief: 7.6s to 2.0s" },
  { value: "10+", label: "apps integrated with the Mario sync SDK I built core parts of" },
];

export const HeroSection = () => (
  <section id="hero" className="on-dark overflow-hidden bg-navy-900 pt-28 text-white md:pt-36">
    <div className="container grid items-center gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
      <div>
        <p className="rise flex items-center gap-3 text-[16px] font-medium text-teal-glow" style={{ "--i": 0 }}>
          <img src="/profile.png" alt="Portrait of Rishi Kumar" width="40" height="40" className="size-10 rounded-full object-cover ring-2 ring-teal-glow/70" />
          Rishi Kumar · software engineering and applied AI
        </p>
        <h1 className="rise mt-7 text-[clamp(2.4rem,4.6vw,3.9rem)] font-semibold leading-[1.03]" style={{ "--i": 1 }}>
          I build AI systems that turn complex workflows into useful software.
        </h1>
        <p className="rise mt-6 max-w-[34rem] text-lg leading-relaxed text-slate-300" style={{ "--i": 2 }}>
          Stony Brook computer science graduate. I've shipped production software, APIs and real-time systems, and built and measured a retrieval-augmented AI application end to end.
        </p>
        <div className="rise mt-8 flex flex-wrap items-center gap-3" style={{ "--i": 3 }}>
          <Link to="/projects" className="btn btn-teal">See the engineering proof</Link>
          <Link to="/#contact" className="btn btn-ghost-light">Contact</Link>
          <ExternalButton href="https://secfrontend.vercel.app/" label="AlphaBrief live" className="btn !px-3 text-teal-glow underline underline-offset-4" />
          <NewTabLink href={links.github} className="btn !px-3 text-teal-glow underline underline-offset-4">
            <Github size={16} aria-hidden="true" /> GitHub
          </NewTabLink>
        </div>
      </div>

      <div className="rise xl:-mr-16" style={{ "--i": 4 }}>
        <HeroVideo />
      </div>
    </div>

    <dl className="container mt-14 grid border-t border-white/15 md:mt-20 md:grid-cols-3">
      {proof.map((s, i) => (
        <div key={s.value} className={`flex items-baseline gap-4 py-6 md:flex-col md:gap-1 md:py-8 ${i > 0 ? "border-t border-white/15 md:border-l md:border-t-0 md:pl-8" : ""}`}>
          <dd className="font-display text-5xl font-semibold leading-none text-teal-glow md:text-6xl">{s.value}</dd>
          <dt className="max-w-xs text-[15px] leading-snug text-slate-300">{s.label}</dt>
        </div>
      ))}
    </dl>
  </section>
);
