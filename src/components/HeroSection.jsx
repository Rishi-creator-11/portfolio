import { Github, Mail, MapPin, GraduationCap } from "lucide-react";
import { links, identity } from "@/data/content";

export const HeroSection = () => (
  <section id="hero" className="bg-navy-900 text-white on-dark pt-28 pb-16 md:pt-32 md:pb-24 overflow-hidden">
    <div className="container grid items-center gap-10 lg:grid-cols-[1fr_1.15fr]">
      <div>
        <div className="flex items-center gap-3">
          <img
            src="/profile.png"
            alt="Portrait of Rishi Kumar in a dark suit"
            width="56"
            height="56"
            className="size-14 rounded-full object-cover ring-2 ring-teal-glow/60"
          />
          <div>
            <p className="text-lg font-semibold">{identity.name}</p>
            <p className="flex items-center gap-1.5 text-sm text-slate-300">
              <MapPin size={14} aria-hidden="true" /> {identity.where}
            </p>
          </div>
        </div>

        <h1 className="mt-7 text-4xl md:text-5xl xl:text-[52px] font-semibold tracking-tight leading-[1.08]">
          I build AI tools that turn research and repetitive tasks into usable workflows.
        </h1>
        <p className="mt-5 max-w-xl text-lg text-slate-300 leading-relaxed">
          From citation-backed research and reviewed outreach drafts to travel planning and
          production business software. I combine hands-on AI development with the engineering
          needed to make it useful.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <a href="#work" className="btn btn-teal">Explore projects</a>
          <a href={links.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light">
            <Github size={16} aria-hidden="true" /> GitHub
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <a href="#contact" className="btn btn-ghost-light">
            <Mail size={16} aria-hidden="true" /> Contact
          </a>
        </div>
        <p className="mt-6 flex items-start gap-2 text-sm text-slate-300">
          <GraduationCap size={16} className="mt-0.5 shrink-0" aria-hidden="true" /> {identity.edu}
        </p>
      </div>

      <figure>
        <div className="shot-shadow overflow-hidden rounded-xl border border-white/15 bg-navy-950 lg:-mr-24">
          <div className="flex items-center gap-1.5 border-b border-white/10 bg-navy-800 px-3 py-2" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-white/25" />
            <span className="size-2.5 rounded-full bg-white/25" />
            <span className="size-2.5 rounded-full bg-white/25" />
            <span className="ml-3 text-xs text-slate-400">secfrontend.vercel.app</span>
          </div>
          <img
            src="/projects/alphabrief-hero.png"
            alt="AlphaBrief live app: a scoped question about Apple's fiscal 2025 net sales, a cited answer, and the retrieved filing passage in an evidence panel."
            className="w-full h-auto"
          />
        </div>
        <figcaption className="mt-2 text-xs text-slate-400">AlphaBrief, a live app I built: scoped question, cited answer, source evidence.</figcaption>
      </figure>
    </div>
  </section>
);
