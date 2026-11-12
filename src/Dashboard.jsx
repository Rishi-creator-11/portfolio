import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Diagram from "./Diagram.jsx";
import { StackTiles } from "./Stack.jsx";
import { projects, work } from "./data.js";
import { expertise } from "./content.js";

// Skills as dashboard items: one per category, tools and concepts as logo tiles.
const skillItems = expertise.map((g) => ({
  id: "skill-" + g.group.toLowerCase().replace(/[^a-z]+/g, "-"),
  name: g.group,
  sub: g.tools.slice(0, 3).join(", ") + "…",
  names: [...g.tools, ...g.also],
}));

export function Detail({ item, kind }) {
  const isProject = kind === "projects";
  const title = (item.card && item.card.title) || item.name;
  const code = item.links || [];
  return (
    <article className="detail" key={item.id} aria-live="polite">
      {/* 1. Title and concise description */}
      <header className="detail-head">
        <div>
          {isProject && <p className="eyebrow">{(item.card && item.card.category) || item.category}</p>}
          <h3>{title}</h3>
          <p className="detail-sub">{isProject ? item.oneLine || item.tagline : `${item.role} · ${item.place}`}</p>
          {item.context && <p className="detail-context">{item.context}</p>}
        </div>
        <div className="detail-tags">
          {isProject && <span className="chip chip-status">{item.status}</span>}
          <span className="chip">{item.period}</span>
        </div>
      </header>

      {/* 2. Strongest engineering highlights */}
      <section className="block">
        <h4>{isProject ? "Engineering highlights" : "What I did"}</h4>
        {isProject && item.highlights ? (
          <ul className="highlights">
            {item.highlights.map((h) => (
              <li key={h.area}>
                <strong>{h.area}:</strong> {h.text}
              </li>
            ))}
          </ul>
        ) : (
          <ul className="bullets">
            {(item.xp || item.engineered || item.bullets).map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        )}
      </section>

      {/* 3. Architecture and engineering decisions */}
      {(item.problem || item.architecture || item.diagram || item.decisions?.length > 0) && (
        <section className="block">
          <h4>Architecture and engineering decisions</h4>
          {item.problem && <p className="detail-summary">{item.problem}</p>}
          {item.why && <p className="detail-note"><strong>Why I built it.</strong> {item.why}</p>}
          {item.architecture && <p className="detail-summary">{item.architecture}</p>}
          {item.diagram && (
            <div className="diagram-scroll">
              <Diagram {...item.diagram} label={`Architecture of ${item.name}`} />
            </div>
          )}
          {item.decisions?.length > 0 && (
            <ul className="decisions">
              {item.decisions.map((d) => (
                <li key={d.q}>
                  <h5>{d.q}</h5>
                  <p>{d.a}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {/* 4. Results and technical evaluation */}
      {(item.metrics?.length > 0 || item.results?.length > 0) && (
        <section className="block">
          <h4>Results and evaluation</h4>
          {item.metrics?.length > 0 && (
            <div className="metrics">
              {item.metrics.map((m) => (
                <div className="metric" key={m.l}>
                  <div className="metric-v">{m.v}</div>
                  <div className="metric-l">{m.l}</div>
                </div>
              ))}
            </div>
          )}
          {!(item.metrics?.length > 0) && item.results?.length > 0 && (
            <table className="results">
              <tbody>
                {item.results.map((r) => (
                  <tr key={r[0]}>
                    <th scope="row">{r[0]}</th>
                    <td>{r[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      )}

      {/* 5. Complete technology stack */}
      <section className="block">
        <h4>Technology stack</h4>
        {item.techGroups ? (
          <div className="tech-groups">
            {item.techGroups.map((g) => (
              <div key={g.label} className="tech-group">
                <h5>{g.label}</h5>
                <StackTiles names={g.items} />
              </div>
            ))}
          </div>
        ) : (
          <StackTiles names={item.stack} />
        )}
      </section>

      {/* 6. Screenshots, demo and source code */}
      {(item.images?.length > 0 || code.length > 0 || item.article) && (
        <section className="block">
          <h4>Screens, demo and source</h4>
          {item.images?.length > 0 && (
            <div className="shots">
              {item.images.map((src) => (
                <img key={src} src={src} alt={`${title} screenshot`} loading="lazy" />
              ))}
            </div>
          )}
          <div className="links">
            {code.map((l) => (
              <a key={l.href} className="btn btn-small" href={l.href} target="_blank" rel="noreferrer">
                {l.label === "Code" ? "GitHub" : l.label} <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            ))}
            {item.article && (
              <a className="btn btn-small" href={`/blog/${item.article}`}>
                How it's built
              </a>
            )}
          </div>
        </section>
      )}
    </article>
  );
}

function SkillDetail({ item }) {
  return (
    <article className="detail" key={item.id} aria-live="polite">
      <header className="detail-head">
        <div>
          <h3>{item.name}</h3>
          <p className="detail-sub">Tools and concepts I use in this area.</p>
        </div>
      </header>
      <section className="block">
        <StackTiles names={item.names} />
      </section>
    </article>
  );
}

const TABS = [
  ["work", "Work experience", () => work],
  ["skills", "Skills", () => skillItems],
  ["projects", "Projects", () => projects],
];
const HASH_TAB = { "#experience": "work", "#skills": "skills", "#projects": "projects" };

export function Console({ heading = "Deep dive" }) {
  const [tab, setTab] = useState(() => HASH_TAB[typeof window !== "undefined" ? window.location.hash : ""] || "work");
  const [sel, setSel] = useState({ projects: projects[0].id, work: work[0].id, skills: skillItems[0].id });
  const detailRef = useRef(null);

  useEffect(() => {
    const onHash = () => HASH_TAB[window.location.hash] && setTab(HASH_TAB[window.location.hash]);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const list = TABS.find((t) => t[0] === tab)[2]();
  const item = list.find((i) => i.id === sel[tab]) || list[0];

  const choose = (id) => {
    setSel((s) => ({ ...s, [tab]: id }));
    if (window.innerWidth < 960) {
      requestAnimationFrame(() =>
        detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      );
    }
  };

  const onKey = (e) => {
    const i = list.findIndex((x) => x.id === item.id);
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const next = list[(i + (e.key === "ArrowDown" ? 1 : list.length - 1)) % list.length];
      setSel((s) => ({ ...s, [tab]: next.id }));
      document.getElementById(`item-${next.id}`)?.focus();
    }
  };

  return (
    <section className="console" id="console" aria-labelledby="console-title">
      <div className="section-head">
        <h2 id="console-title">{heading}</h2>
        <p>Work experience, skills, and projects. Pick one on the left for the full breakdown.</p>
      </div>

      <div className="tabs" role="tablist" aria-label="Dashboard sections">
        {TABS.map(([id, label, get]) => (
          <button
            key={id}
            role="tab"
            aria-selected={tab === id}
            className={tab === id ? "tab on" : "tab"}
            onClick={() => setTab(id)}
          >
            {label} <span className="tab-n">{get().length}</span>
          </button>
        ))}
      </div>

      <div className="console-grid">
        <ul className="rail" onKeyDown={onKey} aria-label={TABS.find((t) => t[0] === tab)[1]}>
          {list.map((i) => (
            <li key={i.id}>
              <button
                id={`item-${i.id}`}
                className={i.id === item.id ? "rail-item on" : "rail-item"}
                aria-pressed={i.id === item.id}
                onClick={() => choose(i.id)}
              >
                <span className="rail-main">
                  <span className="rail-name">{i.name}</span>
                  <span className="rail-sub">{tab === "projects" ? i.status : tab === "work" ? i.role : i.sub}</span>
                  {i.period && <span className="rail-period">{i.period}</span>}
                </span>
                {i.headline && (
                  <span className="rail-metric">
                    <b>{i.headline.value}</b>
                    <i>{i.headline.label}</i>
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
        <div ref={detailRef} className="detail-wrap">
          {tab === "skills" ? <SkillDetail item={item} /> : <Detail item={item} kind={tab} />}
        </div>
      </div>
    </section>
  );
}
