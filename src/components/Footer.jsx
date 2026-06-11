import { ArrowUp } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative z-10 py-8 px-4 border-t border-border/50 flex items-center justify-between">
      <p className="text-base text-muted-foreground">
        &copy; {new Date().getFullYear()} Rishi Kumar
      </p>
      <a
        href="#hero"
        className="p-2 rounded-lg border border-border text-muted-foreground hover:text-primary hover:bg-secondary transition-colors"
        aria-label="Back to top"
      >
        <ArrowUp size={18} />
      </a>
    </footer>
  );
};
