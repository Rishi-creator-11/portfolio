import { Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { name: "Projects", href: "#projects" },
  { name: "Role fit", href: "#fit" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <nav aria-label="Primary" className="container flex h-14 items-center justify-between">
        <a href="#hero" className="font-semibold hover:text-primary">Rishi Kumar</a>

        <div className="hidden md:flex items-center gap-6">
          {navItems.map((i) => (
            <a key={i.name} href={i.href} className="text-sm text-muted-foreground hover:text-foreground">{i.name}</a>
          ))}
          <a href="#contact" className="btn btn-primary !py-1.5">Contact</a>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="md:hidden p-2"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </nav>
      {open && (
        <div id="mobile-menu" className="md:hidden border-t border-border bg-background">
          <div className="container flex flex-col py-2">
            {[...navItems, { name: "Contact", href: "#contact" }].map((i) => (
              <a key={i.name} href={i.href} onClick={() => setOpen(false)} className="py-3 text-base">{i.name}</a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
