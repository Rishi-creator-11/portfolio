import { ArrowRight, Github, Mail } from "lucide-react";
import { links, proof } from "@/data/content";

export const HeroSection = () => (
  <section id="hero" className="pt-24 pb-8 md:pt-28">
    <div className="container">
      <div className="flex items-center gap-3 mb-5">
        <img
          src="/profile.png"
          alt="Portrait of Rishi Kumar in a dark suit"
          width="56"
          height="56"
          className="size-14 rounded-full object-cover border border-border"
        />
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Hrishit (Rishi) Kumar</span>
          <br />
          Stony Brook CS, May 2026 · New York area
        </p>
      </div>

      <h1 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight max-w-3xl">
        I build practical AI tools and reliable business software.
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
        I've built a research assistant with verifiable answers, a travel-planning workflow with
        human approval, and collaborative software used across 10+ applications. I enjoy working
        directly with users, shipping useful tools, and measuring how well they work.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <a href="https://secfrontend.vercel.app" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
          Try AlphaBrief <ArrowRight size={16} aria-hidden="true" />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        <a href="#projects" className="btn btn-outline">Projects</a>
        <a href={links.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
          <Github size={16} aria-hidden="true" /> GitHub
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        <a href="#contact" className="btn btn-outline">
          <Mail size={16} aria-hidden="true" /> Contact
        </a>
      </div>

      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {proof.map((p) => (
          <li key={p.claim}>
            <a href={p.href} className="block h-full rounded-xl border border-border bg-card p-4 hover:border-primary">
              <span className="block font-semibold leading-snug">{p.claim}</span>
              <span className="mt-1 block text-sm text-muted-foreground">{p.evidence}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
