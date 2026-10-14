import { Link } from "react-router-dom";
import { links } from "@/data/content";

export const Footer = () => (
  <footer className="on-dark bg-navy-950 py-10 text-slate-300">
    <div className="container flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-[15px]">&copy; {new Date().getFullYear()} Hrishit (Rishi) Kumar</p>
      <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-1 text-[15px]">
        <Link to="/" className="py-2 hover:text-white">Why me</Link>
        <Link to="/projects" className="py-2 hover:text-white">Engineering proof</Link>
        <Link to="/#contact" className="py-2 hover:text-white">Contact</Link>
        <a href={links.github} target="_blank" rel="noopener noreferrer" className="py-2 hover:text-white">GitHub<span className="sr-only"> (opens in a new tab)</span></a>
        <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="py-2 hover:text-white">LinkedIn<span className="sr-only"> (opens in a new tab)</span></a>
      </nav>
    </div>
  </footer>
);
