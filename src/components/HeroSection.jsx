import { Github, Mail } from "lucide-react";
import { links } from "@/data/content";
import { HeroVideo } from "./HeroVideo";

export const HeroSection = () => (
  <section id="hero" className="bg-navy-900 text-white on-dark pt-24 pb-12 md:pt-28 md:pb-16 overflow-hidden">
    <div className="container grid items-center gap-8 lg:grid-cols-[1fr_1.1fr]">
      <div>
        <div className="flex items-center gap-3">
          <img
            src="/profile.png"
            alt="Portrait of Rishi Kumar in a dark suit"
            width="48"
            height="48"
            className="size-12 rounded-full object-cover ring-2 ring-teal-glow/60"
          />
          <p className="text-lg font-semibold">Hrishit (Rishi) Kumar</p>
        </div>
        <h1 className="mt-6 text-4xl md:text-5xl xl:text-[52px] font-semibold tracking-tight leading-[1.08]">
          I build AI products and automate business workflows.
        </h1>
        <p className="mt-4 max-w-xl text-lg text-slate-300 leading-relaxed">
          I've built document research tools, travel-planning software, and research-and-drafting
          automation. My professional experience includes delivering a business platform and
          building collaborative applications used across 10+ apps.
        </p>
        <p className="mt-3 max-w-xl text-base text-slate-400 leading-relaxed">
          Interested in bringing practical AI and reliable engineering to aviation and luxury hospitality.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="#work" className="btn btn-teal">View live products</a>
          <a href={links.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light">
            <Github size={16} aria-hidden="true" /> GitHub
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <a href="#contact" className="btn btn-ghost-light">
            <Mail size={16} aria-hidden="true" /> Contact
          </a>
        </div>
      </div>

      <HeroVideo />
    </div>
  </section>
);
