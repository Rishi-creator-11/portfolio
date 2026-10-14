import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Work", href: "#work" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#skills" },
];
const contactItem = { name: "Contact", href: "#contact" };
const mobileItems = [...navItems, contactItem];
const observedIds = mobileItems.map((n) => n.href.slice(1));

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    observedIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const linkCls = (id) =>
    `py-3 text-[15px] font-medium transition-colors ${active === id ? "text-teal-glow" : "text-white/75 hover:text-white"}`;

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-navy-900/95 text-white backdrop-blur-md">
      <nav aria-label="Primary" className="container flex h-16 items-center justify-between">
        <a href="#hero" className="font-display text-lg font-semibold tracking-tight">Rishi Kumar</a>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((i) => {
            const id = i.href.slice(1);
            return (
              <a key={i.name} href={i.href} aria-current={active === id ? "true" : undefined} className={linkCls(id)}>
                {i.name}
              </a>
            );
          })}
          <a href="#contact" className="btn btn-teal !min-h-10 !py-1.5">Contact</a>
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
            {mobileItems.map((i) => (
              <a key={i.name} href={i.href} onClick={() => setOpen(false)} className="flex min-h-12 items-center text-lg font-medium">
                {i.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
