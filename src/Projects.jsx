import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects, categories } from "./data.js";

export function ProjectCard({ p, compact }) {
  const c = p.card || {};
  const links = c.links || p.links.map((l) => ({ label: l.label === "Code" ? "GitHub" : l.label, href: l.href }));
  return (
    <article className={compact ? "pcard" : "pcard pcard-wide"}>
      <p className="pcard-cat">{c.category || p.category}</p>
      <h3>
        <a href={`/projects/${p.id}`}>{c.title || p.name}</a>
      </h3>
      {compact && p.context && <p className="pcard-context">{p.context}</p>}
      <p className="pcard-desc">{c.desc || p.oneLine}</p>
      {!compact && c.metric && <p className="pcard-metric-line">{c.metric}</p>}
      {!compact && c.attribution && <p className="pcard-attr">{c.attribution}</p>}
      <p className="pcard-tech">{c.tech}</p>
      <div className="pcard-links">
        <a className="btn btn-small btn-primary" href={`/projects/${p.id}`}>
          Project details
        </a>
        {links.map((l) => (
          <a key={l.href} className="btn btn-small" href={l.href} target="_blank" rel="noreferrer">
            {l.label} <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        ))}
      </div>
    </article>
  );
}

// Project grid with category filter (lives on the About page).
export function ProjectsSection() {
  const [cat, setCat] = useState("All");
  const count = (c) => (c === "All" ? projects.length : projects.filter((p) => p.cats.includes(c)).length);
  const list = cat === "All" ? projects : projects.filter((p) => p.cats.includes(cat));
  return (
    <>
      <h2 id="projects-title">Projects</h2>
      <p className="section-lede">AI applications, backend systems, and software I've engineered.</p>
      <div className="tabs filters" role="tablist" aria-label="Filter projects">
        {categories.map((c) => (
          <button key={c} role="tab" aria-selected={cat === c} className={cat === c ? "tab on" : "tab"} onClick={() => setCat(c)}>
            {c} <span className="tab-n">{count(c)}</span>
          </button>
        ))}
      </div>
      <div className="pgrid pgrid-list">
        {list.map((p) => (
          <ProjectCard key={p.id} p={p} />
        ))}
      </div>
    </>
  );
}
