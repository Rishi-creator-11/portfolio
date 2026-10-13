import { Github, Mail } from "lucide-react";
import { links } from "@/data/content";

export const HeroSection = () => (
  <section id="hero" className="pt-24 pb-6 md:pt-28">
    <div className="container">
      <div className="flex items-center gap-4">
        <img
          src="/profile.png"
          alt="Portrait of Rishi Kumar in a dark suit"
          width="64"
          height="64"
          className="size-16 rounded-full object-cover border border-border"
        />
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Hrishit (Rishi) Kumar</h1>
      </div>
      <p className="mt-5 text-2xl md:text-4xl font-semibold tracking-tight leading-tight max-w-3xl text-primary">
        AI applications, workflow automation, and production software.
      </p>
      <p className="mt-3 max-w-2xl text-lg font-medium leading-relaxed">
        I build tools that organize information, automate repetitive work, and help people make informed decisions.
      </p>
      <p className="mt-2 max-w-2xl text-muted-foreground leading-relaxed">
        Stony Brook CS graduate with experience in AI research tools, travel planning, collaborative
        applications, and business software. Interested in aviation and luxury hospitality.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href="#projects" className="btn btn-primary">Explore projects</a>
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
