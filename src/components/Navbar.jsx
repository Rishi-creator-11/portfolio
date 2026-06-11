import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed w-full z-40 transition-all duration-300 border-b border-transparent",
        isScrolled && "bg-background/90 backdrop-blur-md border-border shadow-sm py-3",
        !isScrolled && "py-5"
      )}
    >
      <div className="container flex items-center justify-between">
        <a href="#hero" className="text-xl font-semibold text-foreground hover:text-primary transition-colors">
          Rishi Kumar
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-base text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.name}
            </a>
          ))}
          <a href="#contact" className="cosmic-button py-2 px-5">
            Contact
          </a>
        </div>

        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden p-2 text-foreground"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {isMenuOpen && (
          <div className="fixed inset-0 top-[60px] bg-background/98 backdrop-blur-md z-30 md:hidden flex flex-col items-center gap-6 pt-10">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-lg text-muted-foreground hover:text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <a href="#contact" className="cosmic-button" onClick={() => setIsMenuOpen(false)}>
              Contact
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};
