import { ArrowUp } from "lucide-react";

export const Footer = () => (
  <footer className="border-t border-border py-6">
    <div className="container flex items-center justify-between">
      <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Rishi Kumar</p>
      <a href="#hero" className="grid size-11 place-items-center rounded-full border border-border text-muted-foreground hover:text-primary" aria-label="Back to top">
        <ArrowUp size={18} aria-hidden="true" />
      </a>
    </div>
  </footer>
);
