import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";

const NAV = [
  { name: "Why me", to: "/" },
  { name: "Engineering proof", to: "/projects" },
];

const linkClass = ({ isActive }) =>
  `py-3 text-[15px] font-medium transition-colors ${isActive ? "text-teal-glow" : "text-white/75 hover:text-white"}`;

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-navy-900/95 text-white backdrop-blur-md">
      <nav aria-label="Primary" className="container flex h-16 items-center justify-between">
        <Link to="/" className="inline-flex min-h-11 items-center font-display text-lg font-semibold tracking-tight">Rishi Kumar</Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end className={linkClass}>{n.name}</NavLink>
          ))}
          <Link to="/#contact" className="btn btn-teal !min-h-10 !px-4 !py-1.5">Contact</Link>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="grid size-11 place-items-center md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </nav>
      {open && (
        <div id="mobile-menu" className="border-t border-white/10 bg-navy-900 md:hidden">
          <div className="container flex flex-col py-2">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} end className={({ isActive }) => `flex min-h-12 items-center text-lg font-medium ${isActive ? "text-teal-glow" : ""}`}>
                {n.name}
              </NavLink>
            ))}
            <Link to="/#contact" className="flex min-h-12 items-center text-lg font-medium text-teal-glow">Contact</Link>
          </div>
        </div>
      )}
    </header>
  );
};
