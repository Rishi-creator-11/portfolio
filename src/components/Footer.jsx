import { ArrowUp } from "lucide-react";

export const Footer = () => (
  <footer className="border-t border-border py-6">
    <div className="container flex items-center justify-between">
      <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Rishi Kumar</p>
      <a href="#hero" className="p-2 rounded-lg border border-border text-muted-foreground hover:text-primary" aria-label="Back to top">
        <ArrowUp size={18} aria-hidden="true" />
      </a>
    </div>
  </footer>
);
