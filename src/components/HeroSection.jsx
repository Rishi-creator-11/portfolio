import { ArrowRight, Github, Mail } from "lucide-react";
import { links } from "@/data/content";

export const HeroSection = () => (
  <section id="hero" className="pt-28 pb-12 md:pt-32 md:pb-14">
    <div className="container">
      <div className="flex items-center gap-4 mb-6">
        <img
          src="/profile.png"
          alt="Portrait of Rishi Kumar in a dark suit"
          width="72"
          height="72"
          className="size-16 md:size-[72px] rounded-full object-cover border border-border"
        />
        <p className="text-sm text-muted-foreground">
          Hrishit (Rishi) Kumar
          <br />
          New York area · Stony Brook CS, May 2026
        </p>
      </div>

      <h1 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight max-w-3xl">
        I build AI tools and software that turn complex information into useful workflows.
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
        CS graduate from Stony Brook. Experience in AI research tools, travel workflows,
        collaborative applications and business software. Interested in aviation and luxury
        hospitality.
      </p>

      <div className="mt-7 flex flex-wrap gap-3">
        <a href="#work" className="btn btn-primary">
          Featured projects <ArrowRight size={16} aria-hidden="true" />
        </a>
        <a href={links.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
          <Github size={16} aria-hidden="true" /> GitHub
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        <a href="#contact" className="btn btn-outline">
          <Mail size={16} aria-hidden="true" /> Contact
        </a>
      </div>
    </div>
  </section>
);
