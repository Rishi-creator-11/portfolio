import { Github, Mail } from "lucide-react";
import { links } from "@/data/content";
import { HeroVideo } from "./HeroVideo";
import { ExternalButton, NewTabLink } from "./Parts";

export const HeroSection = () => (
  <section id="hero" className="on-dark overflow-hidden bg-navy-900 pb-16 pt-28 text-white md:pb-24 md:pt-36">
    <div className="container grid items-center gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
      <div>
        <div className="rise flex items-center gap-3" style={{ "--i": 0 }}>
          <img
            src="/profile.png"
            alt="Portrait of Rishi Kumar in a dark suit"
            width="48"
            height="48"
            className="size-12 rounded-full object-cover ring-2 ring-teal-glow/70"
          />
          <p className="text-[17px] font-medium">Hrishit (Rishi) Kumar</p>
        </div>

        <h1 className="rise mt-8 text-[clamp(2.25rem,4.3vw,3.6rem)] font-semibold leading-[1.04]" style={{ "--i": 1 }}>
          I build AI products and automate business workflows.
        </h1>
        <p className="rise mt-6 max-w-[34rem] text-lg leading-relaxed text-slate-300" style={{ "--i": 2 }}>
          I've built document research tools, travel-planning software, and research-and-drafting
          automation. My professional experience includes delivering a business platform and
          building collaborative applications used across 10+ apps.
        </p>
        <div className="rise mt-8 flex flex-wrap gap-3" style={{ "--i": 3 }}>
          <ExternalButton href="https://secfrontend.vercel.app/" label="AlphaBrief live" className="btn btn-teal !px-4" />
          <ExternalButton href="https://www.metroprintmkt.com/" label="MetroPrint live" className="btn btn-teal !px-4" />
          <NewTabLink href={links.github} className="btn btn-ghost-light !px-4">
            <Github size={16} aria-hidden="true" /> GitHub
          </NewTabLink>
          <a href="#contact" className="btn btn-ghost-light !px-4">
            <Mail size={16} aria-hidden="true" /> Contact
          </a>
        </div>
      </div>

      <div className="rise xl:-mr-16" style={{ "--i": 4 }}>
        <HeroVideo />
      </div>
    </div>
  </section>
);
