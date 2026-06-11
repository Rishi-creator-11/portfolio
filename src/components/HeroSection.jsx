import { ArrowDown } from "lucide-react";

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4"
    >
      <div className="container max-w-3xl mx-auto text-center z-10 py-20">
        <p className="text-sm font-medium text-primary mb-4 opacity-0 animate-fade-in">
          Software Engineer · Stony Brook, NY
        </p>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
          <span className="opacity-0 animate-fade-in">Hi, I'm </span>
          <span className="text-gradient opacity-0 animate-fade-in-delay-1">
            Rishi Kumar
          </span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed opacity-0 animate-fade-in-delay-2">
          Software engineer focused on AI agents, distributed systems, and
          developer tooling.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mt-8 opacity-0 animate-fade-in-delay-3">
          <a href="#experience" className="cosmic-button">View My Work</a>
          <a
            href="#contact"
            className="inline-flex items-center px-5 py-2 rounded-full text-sm font-medium border border-border text-foreground hover:bg-secondary transition-colors"
          >
            Get In Touch
          </a>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-muted-foreground hover:text-primary transition-colors z-10"
      >
        <span className="text-xs mb-1">Scroll</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  );
};
