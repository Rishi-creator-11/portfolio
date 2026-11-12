import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Sun,
  Moon,
  ArrowLeft,
  FileText,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  GraduationCap,
  Menu,
  X,
} from "lucide-react";
import Diagram from "./Diagram.jsx";
import About from "./About.jsx";
import { StackTiles } from "./Stack.jsx";
import { NeuralPortrait, CommandPalette, PaletteButton, Terminal, ReadingProgress, CursorGlow, useAmbient } from "./Interactive.jsx";
import { person, stats, projects, work, skills, education, featured, categories } from "./data.js";
import { posts } from "./blog.js";

function useCountUp(target, decimals = 0, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVal(target);
      return;
    }
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return val.toFixed(decimals);
}

function Stat({ s }) {
  const n = useCountUp(s.value, s.decimals || 0);
  return (
    <div className={`stat stat-${s.tone}`}>
      <div className="stat-value">
        {s.prefix}
        {n}
        {s.suffix}
      </div>
      <div className="stat-label">{s.label}</div>
    </div>
  );
}

const PATH = window.location.pathname.replace(/\/+$/, "") || "/";

function Nav() {
  const links = [
    ["Home", "/"],
    ["About", "/about"],
    ["Projects", "/projects"],
    ["Blog", "/blog"],
    ["Resume", "/resume"],
    ["Contact", "/contact"],
  ];
  const active = (h) => (h === "/" ? PATH === "/" : PATH.startsWith(h));
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("hashchange", close);
    window.addEventListener("popstate", close);
    return () => { window.removeEventListener("hashchange", close); window.removeEventListener("popstate", close); };
  }, []);
  return (
    <header className="nav">
      <a className="nav-brand" href="/">
        <span className="nav-dot" aria-hidden="true" />
        Rishi
      </a>
      <div className="nav-right nav-full">
        <nav aria-label="Main" className="nav-links">
          {links.map(([l, h]) => (
            <span key={h} className="nav-item">
              <a href={h} className={active(h) ? "on" : undefined} aria-current={active(h) ? "page" : undefined}>
                {l}
              </a>
              {h === "/about" && PATH.startsWith("/about") && (
                <span className="nav-sub">
                  <a href="#experience">Experience</a>
                  <a href="#skills">Skills</a>
                  <a href="#education">Education</a>
                </span>
              )}
            </span>
          ))}
        </nav>
        <div className="nav-side-foot">
          <div className="nav-social">
            <a href={person.github} target="_blank" rel="noreferrer"><Github size={16} aria-hidden="true" /> GitHub</a>
            <a href={person.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} aria-hidden="true" /> LinkedIn</a>
            <a href={"mailto:" + person.email}><Mail size={16} aria-hidden="true" /> Email</a>
          </div>
          <div className="nav-tools">
            <ThemeButton />
            <PaletteButton />
          </div>
        </div>
      </div>
      <div className="nav-mobile">
        <ThemeButton />
        <button className="menu-btn" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open}>
          <Menu size={20} aria-hidden="true" />
        </button>
      </div>
      <div className={"drawer-scrim" + (open ? " open" : "")} onClick={() => setOpen(false)} aria-hidden="true" />
      <aside className={"drawer" + (open ? " open" : "")} aria-label="Menu" aria-hidden={!open}>
        <div className="drawer-head">
          <span className="drawer-brand">R.</span>
          <button className="menu-btn" onClick={() => setOpen(false)} aria-label="Close menu" tabIndex={open ? 0 : -1}>
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <nav className="drawer-links" aria-label="Pages">
          {links.map(([l, h]) => (
            <a key={h} href={h} onClick={() => setOpen(false)} className={active(h) ? "on" : undefined} aria-current={active(h) ? "page" : undefined} tabIndex={open ? 0 : -1}>
              {l}
            </a>
          ))}
        </nav>
        <div className="drawer-foot">
          <a href={person.github} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}><Github size={16} aria-hidden="true" /> GitHub</a>
          <a href={person.linkedin} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}><Linkedin size={16} aria-hidden="true" /> LinkedIn</a>
          <a href={"mailto:" + person.email} tabIndex={open ? 0 : -1}><Mail size={16} aria-hidden="true" /> Email</a>
        </div>
      </aside>
    </header>
  );
}

function ThemeButton() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || "light");
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("theme", theme); } catch {}
  }, [theme]);
  const next = theme === "dark" ? "light" : "dark";
  return (
    <button className="theme-btn" onClick={() => setTheme(next)} aria-label={`Switch to ${next} mode`} title={`Switch to ${next} mode`}>
      {theme === "dark" ? <Sun size={15} aria-hidden="true" /> : <Moon size={15} aria-hidden="true" />}
    </button>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="status">
          <span className="pulse" aria-hidden="true" />
          Open to new roles and collabs. Say hi!
        </p>
        <h1>
          Hi, I'm Rishi
        </h1>
        <p className="hero-lede">
          Welcome! I build AI that thinks fast, cites its sources, and doesn't make stuff up.
        </p>
        <p className="hero-sub">
          I treat AI agents like my own team. I give them real work, supervise every run, and train them until
          they're better than yesterday. Best part of my day, every day.
        </p>
        <dl className="hero-lines">
          <div><dt>Retrieval MRR</dt><dd>0.88</dd></div>
          <div><dt>Kafka throughput</dt><dd>10K msg/s</dd></div>
          <div><dt>Sync latency</dt><dd>&lt;100ms, was ~500</dd></div>
          <div><dt>Products shipped</dt><dd>~97 for a print shop</dd></div>
        </dl>
        <div className="hero-cta">
          <a className="btn btn-primary" href="/projects">
            View projects
          </a>
          <a className="btn" href="/resume">
            <FileText size={16} aria-hidden="true" /> View résumé
          </a>
        </div>
        <p className="hero-meta">
          <MapPin size={14} aria-hidden="true" /> {person.location}
        </p>
      </div>
      <figure className="portrait">
        <div className="portrait-frame">
          <NeuralPortrait />
        </div>
        <figcaption>
          <strong>{person.name}</strong>
          <span>B.S. Computer Science · Stony Brook University, New York</span>
        </figcaption>
      </figure>
      <div className="stats" role="list">
        {stats.map((s) => (
          <div role="listitem" key={s.label}>
            <Stat s={s} />
          </div>
        ))}
      </div>
    </section>
  );
}

function Detail({ item, kind }) {
  const isProject = kind === "projects";
  const points = isProject ? item.engineered || item.bullets : item.xp || item.bullets;
  const code = item.links.find((l) => l.label === "Code");
  return (
    <article className="detail" key={item.id} aria-live="polite">
      <header className="detail-head">
        <div>
          {isProject && item.category && <p className="eyebrow">{item.category}</p>}
          <h3>{item.name}</h3>
          <p className="detail-sub">{isProject ? item.oneLine || item.tagline : `${item.role} · ${item.place}`}</p>
          {item.context && <p className="detail-context">{item.context}</p>}
        </div>
        <div className="detail-tags">
          {isProject && <span className="chip chip-status">{item.status}</span>}
          <span className="chip">{item.period}</span>
        </div>
      </header>

      <section className="block">
        <h4>{isProject ? "What I engineered" : "What I did"}</h4>
        <ul className="bullets">
          {points.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </section>

      <div className="detail-foot">
        <ul className="tags" aria-label="Technologies">
          {(item.chips || item.stack.slice(0, 6)).map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <div className="links">
          {item.links.map((l) => (
            <a key={l.href} className="btn btn-small" href={l.href} target="_blank" rel="noreferrer">
              {l.label === "Code" ? "GitHub" : l.label} <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          ))}
          {item.article && (
            <a className="btn btn-small" href={`/blog/${item.article}`}>
              Engineering write-up
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function Console() {
  const [tab, setTab] = useState("projects");
  const [sel, setSel] = useState({ projects: projects[0].id, work: work[0].id });
  const detailRef = useRef(null);
  const list = tab === "projects" ? projects : work;
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
        <h2 id="console-title">Deep dive</h2>
        <p>Projects and jobs side by side. Pick one on the left for the full breakdown.</p>
      </div>

      <div className="tabs" role="tablist" aria-label="Work type">
        {[
          ["projects", "Projects", projects.length],
          ["work", "Internships and jobs", work.length],
        ].map(([id, label, n]) => (
          <button
            key={id}
            role="tab"
            aria-selected={tab === id}
            className={tab === id ? "tab on" : "tab"}
            onClick={() => setTab(id)}
          >
            {label} <span className="tab-n">{n}</span>
          </button>
        ))}
      </div>

      <div className="console-grid">
        <ul className="rail" onKeyDown={onKey} aria-label={tab === "projects" ? "Projects" : "Experience"}>
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
                  <span className="rail-sub">{tab === "projects" ? i.status : i.role}</span>
                  <span className="rail-period">{i.period}</span>
                </span>
                <span className="rail-metric">
                  <b>{i.headline.value}</b>
                  <i>{i.headline.label}</i>
                </span>
              </button>
            </li>
          ))}
        </ul>
        <div ref={detailRef} className="detail-wrap">
          <Detail item={item} kind={tab} />
        </div>
      </div>
    </section>
  );
}

function Toolbox() {
  return (
    <section className="toolbox" id="toolbox" aria-labelledby="toolbox-title">
      <div className="section-head">
        <h2 id="toolbox-title">Toolbox</h2>
        <p>What I reach for, grouped by the job it does.</p>
      </div>
      <div className="skill-grid">
        {skills.map((g) => (
          <div className="skill-card" key={g.group}>
            <h3>{g.group}</h3>
            <ul className="tags">
              {g.items.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        ))}
        <div className="skill-card edu">
          <h3>
            <GraduationCap size={16} aria-hidden="true" /> Education
          </h3>
          <p className="edu-school">{education.school}</p>
          <p>{education.degree}</p>
          <p className="edu-meta">
            {education.grad}. GPA {education.gpa}.
          </p>
          <ul className="tags">
            {education.awards.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <h2 id="contact-title">Say hi. I actually reply.</h2>
      <p>Always down to collaborate, whether it's a role, a side project, or just swapping ideas. Reach out anytime.</p>
      <a className="btn btn-primary btn-big" href={`mailto:${person.email}`}>
        <Mail size={18} aria-hidden="true" /> {person.email}
      </a>
      <div className="contact-links">
        <a href={person.linkedin} target="_blank" rel="noreferrer">
          <Linkedin size={16} aria-hidden="true" /> LinkedIn
        </a>
        <a href={person.github} target="_blank" rel="noreferrer">
          <Github size={16} aria-hidden="true" /> GitHub
        </a>
        <a href={`tel:${person.phone.replace(/\D/g, "")}`}>
          <Phone size={16} aria-hidden="true" /> {person.phone}
        </a>
        <a href={person.resume} download>
          <Download size={16} aria-hidden="true" /> Résumé (PDF)
        </a>
      </div>
    </section>
  );
}

function PageHead({ label, title, children }) {
  return (
    <header className="page-head">
      <p className="eyebrow">{label}</p>
      <h1>{title}</h1>
      {children && <p className="hero-sub">{children}</p>}
    </header>
  );
}

function ProjectCard({ p }) {
  const code = p.links.find((l) => l.label === "Code");
  return (
    <article className="pcard">
      <p className="pcard-cat">{p.category || p.cats.join(" · ")} · {p.period}</p>
      <h3>
        <a href={`/projects/${p.id}`}>{p.name}</a>
      </h3>
      {p.context && <p className="pcard-context">{p.context}</p>}
      <p className="pcard-sum">{p.oneLine || p.tagline}</p>
      <ul className="pcard-points">
        {(p.engineered || p.bullets.slice(0, 3)).map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
      <ul className="tags" aria-label="Technologies">
        {(p.chips || p.stack.slice(0, 6)).map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <div className="pcard-links">
        <a className="btn btn-small" href={`/projects/${p.id}`}>
          Details
        </a>
        {code && (
          <a className="btn btn-small" href={code.href} target="_blank" rel="noreferrer">
            GitHub <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        )}
        {p.article && (
          <a className="btn btn-small" href={`/blog/${p.article}`}>
            Write-up
          </a>
        )}
      </div>
    </article>
  );
}

function HomePage() {
  const picks = featured.map((id) => projects.find((p) => p.id === id));
  return (
    <>
      <Hero />
      <section className="about-section" aria-labelledby="sel-title">
        <div className="row-head">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 id="sel-title">Featured projects</h2>
          </div>
          <a className="see-all" href="/projects">
            See all projects <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
        <div className="pgrid pgrid-3">
          {picks.map((p) => (
            <ProjectCard key={p.id} p={p} />
          ))}
        </div>
      </section>
      <section className="about-section" aria-labelledby="xp-home-title">
        <div className="row-head">
          <div>
            <p className="eyebrow">Experience</p>
            <h2 id="xp-home-title">Where I've worked</h2>
          </div>
          <a className="see-all" href="/about#experience">
            Full experience <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
        <ul className="xp-home">
          {work.filter((w) => w.home).map((w) => (
            <li key={w.id}>
              <div>
                <h3>{w.short.co}</h3>
                <p className="xp-home-role">{w.short.role} · {w.period}</p>
              </div>
              <p className="xp-home-line">{w.home}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="about-section" aria-labelledby="exp-skills-title">
        <p className="eyebrow">Technical expertise</p>
        <h2 id="exp-skills-title">What I work with</h2>
        <div className="skill-grid">
          {skills.map((g) => (
            <div className="skill-card" key={g.group}>
              <h3>{g.group}</h3>
              <p className="skill-line">{g.items.join(", ")}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="about-section" aria-labelledby="latest-title">
        <div className="row-head">
          <div>
            <p className="eyebrow">Writing</p>
            <h2 id="latest-title">Latest notes</h2>
          </div>
          <a className="see-all" href="/blog">
            All posts <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
        <PostList list={posts.slice(0, 2)} />
      </section>
      <section className="about-section" aria-labelledby="otc-title">
        <p className="eyebrow">Off the clock</p>
        <h2 id="otc-title">Outside of code</h2>
        <div className="otc">
          <p className="otc-text">
            I'm into music, mostly rap, country and house. I like hiking, lifting and catching live music, and I'm a
            big foodie. Always happy to swap recommendations.
          </p>
          <ul className="otc-chips" aria-label="Things I'm into">
            <li><span aria-hidden="true">🎧</span> Rap, country &amp; house</li>
            <li><span aria-hidden="true">🎤</span> Live music</li>
            <li><span aria-hidden="true">🥾</span> Hiking</li>
            <li><span aria-hidden="true">🏋️</span> Lifting</li>
            <li><span aria-hidden="true">🍜</span> Foodie</li>
          </ul>
        </div>
      </section>
      <section className="about-section" aria-labelledby="play-title">
        <p className="eyebrow">Playground</p>
        <h2 id="play-title">Poke around</h2>
        <div className="play-grid">
          <Terminal />
        </div>
      </section>
      <Contact />
    </>
  );
}

function ProjectsPage() {
  const [cat, setCat] = useState("All");
  const count = (c) => (c === "All" ? projects.length : projects.filter((p) => p.cats.includes(c)).length);
  const list = cat === "All" ? projects : projects.filter((p) => p.cats.includes(cat));
  return (
    <>
      <PageHead label="Portfolio" title="Selected work">
        Production systems, AI tools and open-source extensions. Each one has a case study with real numbers.
      </PageHead>
      <div className="tabs filters" role="tablist" aria-label="Filter projects">
        {categories.map((c) => (
          <button key={c} role="tab" aria-selected={cat === c} className={cat === c ? "tab on" : "tab"} onClick={() => setCat(c)}>
            {c} <span className="tab-n">{count(c)}</span>
          </button>
        ))}
      </div>
      <div className="pgrid">
        {list.map((p) => (
          <ProjectCard key={p.id} p={p} />
        ))}
      </div>
      <Console />
    </>
  );
}

function ProjectPage({ id }) {
  const p = projects.find((x) => x.id === id);
  if (!p) return <NotFound />;
  return (
    <div className="page-narrow">
      <a className="back" href="/projects">
        <ArrowLeft size={16} aria-hidden="true" /> All projects
      </a>
      <Detail item={p} kind="projects" />
    </div>
  );
}

function PostList({ list }) {
  return (
    <ol className="post-list">
      {list.map((post) => (
        <li key={post.slug} className="post-item">
          <h3>
            <a href={`/blog/${post.slug}`}>{post.title}</a>
          </h3>
          <p className="post-meta">
            <time dateTime={post.date}>{new Date(post.date + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</time>
          </p>
          <p className="post-ex">{post.excerpt}</p>
          <ul className="tags">
            {post.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}

function BlogPage() {
  return (
    <div className="page-narrow">
      <PageHead label="Writing" title="Notes and project deep-dives">
        Short write-ups on what I built, what I measured, and what I'd change.
      </PageHead>
      <PostList list={posts} />
    </div>
  );
}

function PostPage({ slug }) {
  const post = posts.find((x) => x.slug === slug);
  if (!post) return <NotFound />;
  return (
    <article className="page-narrow post">
      <ReadingProgress />
      <a className="back" href="/blog">
        <ArrowLeft size={16} aria-hidden="true" /> All posts
      </a>
      <header className="page-head">
        <p className="post-meta">
          <time dateTime={post.date}>{new Date(post.date + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</time>
        </p>
        <h1>{post.title}</h1>
        <ul className="tags">
          {post.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </header>
      <div className="post-body">
        {post.body.map((b, i) =>
          b.h ? (
            <h2 key={i}>{b.h}</h2>
          ) : b.ul ? (
            <ul key={i} className="bullets">
              {b.ul.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          ) : b.diagram ? (
            <div key={i} className="diagram-scroll post-diagram">
              <Diagram {...projects.find((x) => x.id === b.diagram).diagram} label={`Architecture of ${b.diagram}`} />
            </div>
          ) : b.code ? (
            <pre key={i}>
              <code>{b.code}</code>
            </pre>
          ) : (
            <p key={i}>{b.p}</p>
          )
        )}
      </div>
    </article>
  );
}

function ResumePage() {
  return (
    <>
      <PageHead label="Resume" title="Résumé">
        View it here or download the PDF.
      </PageHead>
      <div className="hero-cta resume-cta">
        <a className="btn btn-primary" href={person.resume} download>
          <Download size={16} aria-hidden="true" /> Download PDF
        </a>
        <a className="btn" href={person.resume} target="_blank" rel="noreferrer">
          Open in new tab <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>
      <div className="resume-frame">
        <iframe src={`${person.resume}#view=FitH`} title="Rishi résumé (PDF)" />
      </div>
    </>
  );
}

function MailForm({ title, intro, fields, subject }) {
  const [vals, setVals] = useState({});
  const [msgLen, setMsgLen] = useState(0);
  const submit = (e) => {
    e.preventDefault();
    const body = fields.map((f) => `${f.label}: ${vals[f.name] || ""}`).join("\n");
    window.location.href = `mailto:${person.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  return (
    <form className="mail-form" onSubmit={submit}>
      <h2>{title}</h2>
      <p className="hero-sub">{intro}</p>
      {fields.map((f) => (
        <label key={f.name}>
          <span>{f.label}</span>
          {f.area ? (
            <>
              <textarea
                name={f.name}
                required={f.required}
                maxLength={2000}
                rows={5}
                onChange={(e) => {
                  setVals((v) => ({ ...v, [f.name]: e.target.value }));
                  setMsgLen(e.target.value.length);
                }}
              />
              <small>{msgLen} / 2000</small>
            </>
          ) : (
            <input
              name={f.name}
              type={f.type || "text"}
              required={f.required}
              onChange={(e) => setVals((v) => ({ ...v, [f.name]: e.target.value }))}
            />
          )}
        </label>
      ))}
      <button className="btn btn-primary" type="submit">
        <Mail size={16} aria-hidden="true" /> Send via email
      </button>
    </form>
  );
}

function ContactPage() {
  return (
    <>
      <PageHead label="Contact" title="Let's talk.">
        I'm open to new roles, collabs and good conversations. Referrals, interviews and project questions are all welcome.
      </PageHead>
      <div className="contact-grid">
        <MailForm
          title="Get in touch"
          intro="Send a note and it opens in your email app."
          subject="Hello from your portfolio"
          fields={[
            { name: "name", label: "Name", required: true },
            { name: "email", label: "Email", type: "email", required: true },
            { name: "message", label: "Message", area: true, required: true },
          ]}
        />
        <MailForm
          title="Refer me"
          intro="Know a team that's hiring? I'd be grateful."
          subject="Referral for Rishi"
          fields={[
            { name: "name", label: "Your name", required: true },
            { name: "email", label: "Your email", type: "email", required: true },
            { name: "company", label: "Company", required: true },
            { name: "role", label: "Role" },
            { name: "details", label: "Details", area: true },
          ]}
        />
      </div>
      <Contact />
    </>
  );
}

function NotFound() {
  return (
    <PageHead label="404" title="Page not found">
      <a href="/">Go home</a>
    </PageHead>
  );
}

export default function App() {
  useAmbient(PATH);
  let page;
  const [, seg, sub] = PATH.split("/");
  if (PATH === "/") page = <HomePage />;
  else if (seg === "about") page = (<><About /><Contact /></>);
  else if (seg === "projects") page = sub ? <ProjectPage id={sub} /> : <ProjectsPage />;
  else if (seg === "blog") page = sub ? <PostPage slug={sub} /> : <BlogPage />;
  else if (seg === "resume") page = <ResumePage />;
  else if (seg === "contact") page = <ContactPage />;
  else page = <NotFound />;
  return (
    <>
      <CursorGlow />
      <Nav />
      <CommandPalette />
      <main key={PATH}>{page}</main>
      <footer className="footer">© {new Date().getFullYear()} Rishi. Built with React and Vite.</footer>
    </>
  );
}
