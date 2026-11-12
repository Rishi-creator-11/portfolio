import { useEffect, useMemo, useRef, useState } from "react";
import { Search, Command, Sparkles, CornerDownLeft } from "lucide-react";
import { person, projects, skills } from "./data.js";
import { posts } from "./blog.js";

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------------- Particle portrait ---------------- */
const MODES = [
  { id: "art", label: "Neon" },
  { id: "art2", label: "Cinematic" },
  { id: "particles", label: "Pixels" },
  { id: "photo", label: "Real me" },
];

export function ParticlePortrait({ art = "/ai-portrait.jpg", art2 = "/ai-portrait-2.jpg", src = "/ai-portrait.jpg", photo = "/portrait.jpg" }) {
  const ref = useRef(null);
  const tilt = useRef(null);
  const [mode, setMode] = useState("art");
  useEffect(() => {
    if (mode !== "particles") return;
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0, raf = 0, parts = [], t0 = performance.now();
    const mouse = { x: -9999, y: -9999, down: false };
    const img = new Image();
    img.src = src;

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      W = rect.width; H = rect.height;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const off = document.createElement("canvas");
      const scale = Math.max(W / img.width, H / img.height);
      const iw = Math.round(img.width * scale), ih = Math.round(img.height * scale);
      off.width = iw; off.height = ih;
      const o = off.getContext("2d");
      o.drawImage(img, 0, 0, iw, ih);
      const d = o.getImageData(0, 0, iw, ih).data;
      const step = W < 340 ? 3 : 4;
      const ox = (W - iw) / 2, oy = (H - ih) / 2;
      parts = [];
      let lo = 1, hi = 0;
      const raw = [];
      for (let y = 0; y < ih; y += step) {
        for (let x = 0; x < iw; x += step) {
          const i = (y * iw + x) * 4;
          if (d[i + 3] < 120) continue;
          const px = ox + x, py = oy + y;
          if (px < -step || py < -step || px > W + step || py > H + step) continue;
          const nx = (px / W - 0.5) * 2, ny = (py / H - 0.42) * 2;
          const v = 1 - Math.max(0, Math.sqrt(nx * nx * 0.6 + ny * ny * 0.5) - 0.75) / 0.35;
          if (v < 0.06) continue;
          const lum = (0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2]) / 255;
          lo = Math.min(lo, lum); hi = Math.max(hi, lum);
          raw.push([x, y, lum, d[i], d[i + 1], d[i + 2], Math.min(1, v)]);
        }
      }
      for (const [x, y, l0, r, g, b, v] of raw) {
        const lum = Math.pow((l0 - lo) / Math.max(0.01, hi - lo), 0.85);
        const k = 1.12;
        parts.push({
          hx: ox + x, hy: oy + y,
          x: reduced() ? ox + x : Math.random() * W,
          y: reduced() ? oy + y : H + Math.random() * 80,
          vx: 0, vy: 0,
          s: step * (0.62 + lum * 0.38),
          c: `rgba(${Math.min(255, r * k + 8)},${Math.min(255, g * k)},${Math.min(255, b * k - 4)},${(0.35 + lum * 0.65) * v})`,
        });
      }
    };

    const tick = (now) => {
      const t = (now - t0) / 1000;
      ctx.clearRect(0, 0, W, H);
      const scanY = ((t * 90) % (H + 120)) - 60;
      for (const p of parts) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const dist2 = dx * dx + dy * dy;
        const R = mouse.down ? 140 : 80;
        if (dist2 < R * R) {
          const f = (1 - Math.sqrt(dist2) / R) * (mouse.down ? 9 : 4);
          const a = Math.atan2(dy, dx);
          p.vx += Math.cos(a) * f; p.vy += Math.sin(a) * f;
        }
        p.vx += (p.hx - p.x) * 0.045; p.vy += (p.hy - p.y) * 0.045;
        p.vx *= 0.82; p.vy *= 0.82;
        p.x += p.vx; p.y += p.vy;
        const near = Math.abs(p.hy - scanY) < 1.5;
        ctx.fillStyle = near ? "rgba(255,226,170,0.45)" : p.c;
        const s = near ? p.s * 1.25 : p.s;
        ctx.fillRect(p.x - s / 2, p.y - s / 2, s, s);
      }
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      const pt = e.touches ? e.touches[0] : e;
      mouse.x = pt.clientX - r.left; mouse.y = pt.clientY - r.top;
    };
    const onLeave = () => { mouse.x = mouse.y = -9999; mouse.down = false; };
    const onDown = () => (mouse.down = true);
    const onUp = () => (mouse.down = false);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    const ro = new ResizeObserver(() => img.complete && build());
    img.onload = () => {
      build();
      ro.observe(canvas);
      raf = requestAnimationFrame(tick);
    };
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [mode, src]);

  const onTilt = (e) => {
    const el = tilt.current;
    if (!el || reduced()) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.03)`;
    el.style.setProperty("--gx", `${(x + 0.5) * 100}%`);
    el.style.setProperty("--gy", `${(y + 0.5) * 100}%`);
  };
  const next = MODES[(MODES.findIndex((m) => m.id === mode) + 1) % MODES.length];
  return (
    <div className="pp">
      {mode === "particles" && (
        <canvas ref={ref} className="pp-canvas" role="img" aria-label="Portrait of Rishi drawn as interactive pixels" />
      )}
      {mode !== "particles" && (
        <div
          ref={tilt}
          className="pp-art"
          onPointerMove={onTilt}
          onPointerLeave={() => tilt.current && (tilt.current.style.transform = "")}
        >
          <img
            key={mode}
            src={mode === "art" ? art : mode === "art2" ? art2 : photo}
            alt={mode === "photo" ? "Rishi smiling on a beach at sunset" : "Stylized portrait of Rishi with neon lighting"}
          />
          <span className="pp-shine" aria-hidden="true" />
        </div>
      )}
      <div className="pp-bar">
        <span className="pp-hint">{mode === "particles" ? "Touch me" : "Hover me"}</span>
        <button className="pp-toggle" onClick={() => setMode(next.id)}>
          <Sparkles size={14} aria-hidden="true" /> {next.label}
        </button>
      </div>
    </div>
  );
}


/* ---------------- Neural portrait ---------------- */
export function NeuralPortrait({ src = "/net.json" }) {
  const ref = useRef(null);
  const [seed, setSeed] = useState(0);
  const [status, setStatus] = useState("initializing");
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0, raf = 0, nodes = [], edges = [], adj = [], pulses = [], box = null, dead = false;
    const mouse = { x: -9999, y: -9999 };
    const t0 = performance.now();
    const still = reduced();

    const layout = (data) => {
      const r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const ar = data.ar;
      let dh = H * 0.97, dw = dh * ar;
      if (dw < W * 0.9) { dw = W * 0.9; dh = dw / ar; }
      const ox = (W - dw) / 2, oy = H - dh;
      const prev = nodes;
      nodes = data.p.map(([x, y], i) => {
        const hx = ox + x * dw, hy = oy + y * dh;
        const o = prev[i];
        return {
          hx, hy,
          x: o ? o.x : still ? hx : W / 2 + (Math.random() - 0.5) * W * 1.4,
          y: o ? o.y : still ? hy : H / 2 + (Math.random() - 0.5) * H * 1.4,
          vx: 0, vy: 0, l: data.l ? data.l[i] : 1 - data.d[i], f: data.f ? data.f[i] : 0, k: data.k[i], glow: 0,
        };
      });
      const face = nodes.filter((n) => n.k === 0);
      const xs = face.map((n) => n.hx), ys = face.map((n) => n.hy);
      box = { x0: Math.min(...xs) - 14, y0: Math.min(...ys) - 14, x1: Math.max(...xs) + 14, y1: Math.max(...ys) + 10 };
    };

    const spawn = () => {
      const e = edges[(Math.random() * edges.length) | 0];
      return { a: e[0], b: e[1], t: 0, sp: 0.02 + Math.random() * 0.04, life: 6 + ((Math.random() * 10) | 0) };
    };

    let data;
    fetch(src).then((r) => r.json()).then((d) => {
      if (dead) return;
      data = d;
      edges = d.e;
      adj = d.p.map(() => []);
      for (const [a, b] of edges) { adj[a].push(b); adj[b].push(a); }
      layout(d);
      pulses = Array.from({ length: 36 }, spawn);
      raf = requestAnimationFrame(tick);
    });

    const bracket = (x, y, dx, dy, L) => {
      ctx.beginPath(); ctx.moveTo(x + dx * L, y); ctx.lineTo(x, y); ctx.lineTo(x, y + dy * L); ctx.stroke();
    };

    const tick = (now) => {
      const t = (now - t0) / 1000;
      ctx.clearRect(0, 0, W, H);
      // settle
      let energy = 0;
      for (const n of nodes) {
        const dx = n.x - mouse.x, dy = n.y - mouse.y, dd = dx * dx + dy * dy;
        if (dd < 9000) {
          const f = (1 - Math.sqrt(dd) / 95) * 1.6, a = Math.atan2(dy, dx);
          n.vx += Math.cos(a) * f; n.vy += Math.sin(a) * f; n.glow = 1;
        }
        n.vx += (n.hx - n.x) * 0.035; n.vy += (n.hy - n.y) * 0.035;
        n.vx *= 0.84; n.vy *= 0.84; n.x += n.vx; n.y += n.vy;
        n.glow *= 0.94;
        energy += Math.abs(n.hx - n.x) + Math.abs(n.hy - n.y);
      }
      const loss = energy / Math.max(1, nodes.length);
      // edges
      ctx.globalCompositeOperation = "lighter";
      ctx.lineWidth = 0.7;
      for (const [a, b] of edges) {
        const A = nodes[a], B = nodes[b];
        const g = Math.max(A.glow, B.glow);
        const lv = Math.pow((A.l + B.l) / 2, 1.35), feat = A.f && B.f;
        ctx.strokeStyle = feat
          ? `rgba(${120 + g * 135},${215 + g * 20},255,${0.12 + lv * 0.5 + g * 0.5})`
          : `rgba(${90 + g * 165},${185 + g * 40},255,${0.03 + lv * 0.22 + g * 0.5})`;
        ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(B.x, B.y); ctx.stroke();
      }
      // nodes
      for (const n of nodes) {
        const lv = Math.pow(n.l, 1.35);
        const r = 0.8 + lv * 1.6 + (n.f ? 0.6 : 0) + n.glow * 1.5;
        ctx.fillStyle = `rgba(${170 + lv * 70 + n.glow * 15},${220 + lv * 30},255,${0.1 + lv * 0.85 + (n.f ? 0.15 : 0)})`;
        ctx.fillRect(n.x - r / 2, n.y - r / 2, r, r);
      }
      // pulses (signals hopping between connected nodes)
      for (let i = 0; i < pulses.length; i++) {
        const p = pulses[i];
        p.t += p.sp;
        if (p.t >= 1) {
          const nb = adj[p.b];
          if (--p.life <= 0 || !nb.length) { pulses[i] = spawn(); continue; }
          p.a = p.b; p.b = nb[(Math.random() * nb.length) | 0]; p.t = 0;
        }
        const A = nodes[p.a], B = nodes[p.b];
        const x = A.x + (B.x - A.x) * p.t, y = A.y + (B.y - A.y) * p.t;
        ctx.fillStyle = "rgba(255,190,90,0.95)";
        ctx.beginPath(); ctx.arc(x, y, 1.4, 0, 6.283); ctx.fill();
        ctx.fillStyle = "rgba(255,170,70,0.18)";
        ctx.beginPath(); ctx.arc(x, y, 3.5, 0, 6.283); ctx.fill();
      }
      // cursor links
      if (mouse.x > -999) {
        ctx.lineWidth = 0.8;
        for (const n of nodes) {
          const dx = n.x - mouse.x, dy = n.y - mouse.y, dd = dx * dx + dy * dy;
          if (dd < 4200) {
            ctx.strokeStyle = `rgba(255,200,110,${0.5 * (1 - dd / 4200)})`;
            ctx.beginPath(); ctx.moveTo(mouse.x, mouse.y); ctx.lineTo(n.x, n.y); ctx.stroke();
          }
        }
      }
      ctx.globalCompositeOperation = "source-over";
      // HUD
      if (box) {
        const done = t > 2.6 && loss < 6;
        ctx.strokeStyle = done ? "rgba(91,227,160,0.85)" : "rgba(255,180,84,0.85)";
        ctx.lineWidth = 1.5;
        const L = 16;
        bracket(box.x0, box.y0, 1, 1, L); bracket(box.x1, box.y0, -1, 1, L);
        bracket(box.x0, box.y1, 1, -1, L); bracket(box.x1, box.y1, -1, -1, L);
        ctx.font = "600 10px 'JetBrains Mono', monospace";
        ctx.fillStyle = done ? "rgba(91,227,160,0.95)" : "rgba(255,180,84,0.95)";
        const label = done ? "rishi · match 0.99" : `training · loss ${loss.toFixed(2)}`;
        ctx.fillText(label, box.x0, box.y1 + 16);
        // scan line inside box
        const sy = box.y0 + ((t * 70) % (box.y1 - box.y0));
        const gr = ctx.createLinearGradient(0, sy - 14, 0, sy);
        gr.addColorStop(0, "rgba(77,212,255,0)"); gr.addColorStop(1, "rgba(77,212,255,0.22)");
        ctx.fillStyle = gr; ctx.fillRect(box.x0, sy - 14, box.x1 - box.x0, 14);
        const st = done ? "identity resolved" : "assembling";
        if (st !== statusRef) { statusRef = st; setStatus(st); }
      }
      raf = requestAnimationFrame(tick);
    };
    let statusRef = "";

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = mouse.y = -9999; };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    const ro = new ResizeObserver(() => data && layout(data));
    ro.observe(canvas);
    return () => {
      dead = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [seed, src]);

  return (
    <div className="pp np">
      <canvas ref={ref} className="pp-canvas" role="img" aria-label="Portrait of Rishi drawn as a glowing neural network" />
      <div className="np-tag">
        <span className={status === "identity resolved" ? "np-dot ok" : "np-dot"} /> {status}
      </div>
      <div className="pp-bar">
        <span className="pp-hint">Move over the network</span>
        <button className="pp-toggle" onClick={() => setSeed((n) => n + 1)}>
          <Sparkles size={14} aria-hidden="true" /> Retrain
        </button>
      </div>
    </div>
  );
}

/* ---------------- Command palette ---------------- */
const go = (href) => {
  window.location.href = href;
};

export function useCommands() {
  return useMemo(
    () => [
      { group: "Pages", label: "Home", href: "/" },
      { group: "Pages", label: "About", href: "/about" },
      { group: "Pages", label: "Projects", href: "/projects" },
      { group: "Pages", label: "Blog", href: "/blog" },
      { group: "Pages", label: "Resume", href: "/resume" },
      { group: "Pages", label: "Contact", href: "/contact" },
      ...projects.map((p) => ({ group: "Projects", label: p.name, hint: p.tagline, href: `/projects/${p.id}` })),
      ...posts.map((p) => ({ group: "Blog", label: p.title, hint: p.date, href: `/blog/${p.slug}` })),
      { group: "Actions", label: "Copy email address", hint: person.email, run: "copy" },
      { group: "Actions", label: "Open GitHub", hint: "github.com/Rishi-creator-11", ext: person.github },
      { group: "Actions", label: "Open LinkedIn", hint: "linkedin.com/in/rishi1111", ext: person.linkedin },
    ],
    []
  );
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [i, setI] = useState(0);
  const [toast, setToast] = useState("");
  const input = useRef(null);
  const all = useCommands();
  const list = all.filter((c) => (c.label + " " + (c.hint || "") + " " + c.group).toLowerCase().includes(q.toLowerCase()));

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", onOpen);
    };
  }, []);
  useEffect(() => {
    if (open) {
      setQ("");
      setI(0);
      setTimeout(() => input.current?.focus(), 0);
    }
  }, [open]);

  const run = (c) => {
    if (!c) return;
    if (c.run === "copy") {
      navigator.clipboard?.writeText(person.email).then(
        () => flash("Email copied"),
        () => flash(person.email)
      );
    } else if (c.ext) window.open(c.ext, "_blank", "noopener");
    else go(c.href);
    setOpen(false);
  };
  const flash = (m) => {
    setToast(m);
    setTimeout(() => setToast(""), 1800);
  };

  return (
    <>
      {open && (
        <div className="cp-backdrop" onMouseDown={() => setOpen(false)}>
          <div className="cp" role="dialog" aria-label="Command palette" onMouseDown={(e) => e.stopPropagation()}>
            <div className="cp-input">
              <Search size={18} aria-hidden="true" />
              <input
                ref={input}
                value={q}
                placeholder="Jump to a page, project or post…"
                onChange={(e) => {
                  setQ(e.target.value);
                  setI(0);
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") { e.preventDefault(); setI((n) => Math.min(n + 1, list.length - 1)); }
                  if (e.key === "ArrowUp") { e.preventDefault(); setI((n) => Math.max(n - 1, 0)); }
                  if (e.key === "Enter") run(list[i]);
                }}
              />
              <kbd>esc</kbd>
            </div>
            <ul className="cp-list">
              {list.length === 0 && <li className="cp-empty">No matches</li>}
              {list.map((c, n) => (
                <li key={c.group + c.label}>
                  {(n === 0 || list[n - 1].group !== c.group) && <p className="cp-group">{c.group}</p>}
                  <button className={n === i ? "cp-item on" : "cp-item"} onMouseEnter={() => setI(n)} onClick={() => run(c)}>
                    <span>{c.label}</span>
                    {c.hint && <small>{c.hint}</small>}
                    {n === i && <CornerDownLeft size={14} aria-hidden="true" />}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}

export function PaletteButton() {
  const mac = /Mac|iPhone|iPad/.test(navigator.platform);
  return (
    <button className="cp-btn" onClick={() => window.dispatchEvent(new Event("open-palette"))} aria-label="Open command palette">
      <Command size={14} aria-hidden="true" /> <span>{mac ? "⌘K" : "Ctrl K"}</span>
    </button>
  );
}

/* ---------------- Terminal ---------------- */
const HELP = [
  "help              list commands",
  "whoami            who is Rishi",
  "projects          list projects",
  "open <project>    open a case study (e.g. open callpilot)",
  "blog              list posts",
  "skills            what I work with",
  "contact           how to reach me",
  "resume            view my résumé",
  "clear             clear the screen",
];

export function Terminal() {
  const [lines, setLines] = useState([
    { t: "out", v: "rishi@portfolio:~$ welcome. type 'help' to look around." },
  ]);
  const [v, setV] = useState("");
  const [hist, setHist] = useState([]);
  const [hi, setHi] = useState(-1);
  const body = useRef(null);
  useEffect(() => {
    if (body.current) body.current.scrollTop = body.current.scrollHeight;
  }, [lines]);

  const exec = (raw) => {
    const cmd = raw.trim();
    const [c, ...args] = cmd.split(/\s+/);
    const arg = args.join(" ").toLowerCase();
    let out = [];
    switch ((c || "").toLowerCase()) {
      case "": break;
      case "help": out = HELP; break;
      case "whoami":
        out = ["Rishi. 22, building with AI in New York.", "Stony Brook, B.S. Computer Science, specialized in AI and Data Science, 2022 – 2026.", "I build AI that has to be right, not just sound right."];
        break;
      case "ls":
      case "projects":
        out = projects.map((p) => `${p.id.padEnd(18)} ${p.headline.value} ${p.headline.label}`);
        break;
      case "open":
      case "cd": {
        const p = projects.find((x) => x.id.includes(arg) || x.name.toLowerCase().includes(arg));
        if (arg && p) { out = [`opening ${p.name}…`]; setTimeout(() => go(`/projects/${p.id}`), 450); }
        else out = [`no project matches '${arg}'. try 'projects'.`];
        break;
      }
      case "blog": out = posts.map((p) => `${p.date}  ${p.title}`); break;
      case "skills": out = skills.map((g) => `${g.group}: ${g.items.join(", ")}`); break;
      case "contact": out = [`email     ${person.email}`, `linkedin  ${person.linkedin}`, `github    ${person.github}`]; break;
      case "resume": out = ["opening résumé…"]; setTimeout(() => go("/resume"), 450); break;
      case "clear": setLines([]); return;
      case "sudo":
        out = arg.includes("hire") ? ["[sudo] permission granted.", `scheduling interview… just email ${person.email} 🙂`] : ["nice try."];
        break;
      case "rm": out = ["let's not."]; break;
      default: out = [`command not found: ${c}. type 'help'.`];
    }
    setLines((l) => [...l, { t: "in", v: cmd }, ...out.map((o) => ({ t: "out", v: o }))]);
  };

  return (
    <div className="term" onClick={() => body.current?.querySelector("input")?.focus()}>
      <div className="term-top">
        <i /> <i /> <i /> <span>rishi@portfolio: ~</span>
      </div>
      <div className="term-body" ref={body}>
        {lines.map((l, n) => (
          <p key={n} className={l.t === "in" ? "term-in" : "term-out"}>
            {l.t === "in" && <b>❯ </b>}
            {l.v}
          </p>
        ))}
        <form
          className="term-line"
          onSubmit={(e) => {
            e.preventDefault();
            exec(v);
            if (v.trim()) setHist((h) => [v, ...h]);
            setHi(-1);
            setV("");
          }}
        >
          <b>❯</b>
          <input
            value={v}
            aria-label="Terminal input"
            spellCheck="false"
            autoComplete="off"
            onChange={(e) => setV(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowUp" && hist.length) { e.preventDefault(); const n = Math.min(hi + 1, hist.length - 1); setHi(n); setV(hist[n]); }
              if (e.key === "ArrowDown") { e.preventDefault(); const n = hi - 1; setHi(n); setV(n >= 0 ? hist[n] : ""); }
            }}
          />
        </form>
      </div>
      <div className="term-chips">
        {["whoami", "projects", "open callpilot", "skills", "sudo hire rishi"].map((c) => (
          <button key={c} onClick={(e) => { e.stopPropagation(); exec(c); }}>
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Ask CallPilot (simplified browser demo) ---------------- */
const FACTS = [
  { q: "What are your opening hours?", a: "We're open Tuesday to Sunday, 7am to 3pm. Closed Mondays." },
  { q: "Do you take custom cake orders?", a: "Yes. Custom cakes need 72 hours' notice. Our team will confirm the details by phone." },
  { q: "Where are you located?", a: "We're at 214 Mulberry Street, next to the post office." },
  { q: "Do you have gluten-free options?", a: "We bake gluten-free muffins and brownies daily, in a shared kitchen." },
  { q: "Can I bring my dog?", a: "Dogs are welcome on the patio." },
];
const STOP = new Set("a an the do does you your i we is are can to of for in on my me what when where how have any there please about".split(" "));
const ALIAS = { hours: "hour", open: "hour", opening: "hour", close: "hour", closed: "hour", time: "hour", cakes: "cake", order: "cake", orders: "cake", birthday: "cake", address: "located", location: "located", where: "located", gluten: "glutenfree", "gluten-free": "glutenfree", celiac: "glutenfree", dogs: "dog", pet: "dog", pets: "dog" };
const terms = (s) => s.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").split(/\s+/).filter((w) => w && !STOP.has(w)).map((w) => ALIAS[w] || w);
const sim = (a, b) => {
  const A = new Set(a), B = new Set(b);
  const inter = [...A].filter((x) => B.has(x)).length;
  return inter / Math.max(1, Math.min(A.size, B.size) + 0.5 * Math.abs(A.size - B.size));
};

export function AskCallPilot() {
  const [q, setQ] = useState("");
  const [res, setRes] = useState(null);
  const ask = (text) => {
    const t = terms(text);
    const scored = FACTS.map((f) => ({ ...f, s: sim(t, terms(f.q)) })).sort((x, y) => y.s - x.s);
    const [top, second] = scored;
    const price = /price|cost|how much|\$|charge|fee/i.test(text);
    let verdict;
    if (price && top.s < 0.5) verdict = { k: "refuse", m: "No approved price answer, so it won't quote one. Hands off to the team." };
    else if (top.s < 0.4) verdict = { k: "escalate", m: "Nothing approved matches well enough. Takes a message instead of guessing." };
    else if (top.s - second.s < 0.15) verdict = { k: "escalate", m: "Two answers are too close. Asks the caller to clarify." };
    else verdict = { k: "answer", m: top.a };
    setRes({ scored, verdict });
  };
  const tries = ["When are you open?", "Can I order a birthday cake?", "How much is a cake?", "Do you sell pizza?"];
  return (
    <div className="ask">
      <div className="ask-head">
        <p className="eyebrow">Try it</p>
        <h4>Call a fictional bakery on CallPilot</h4>
        <p className="ask-note">A simplified in-browser version of the answer rule. The real system uses embeddings in pgvector; this one uses word overlap.</p>
      </div>
      <form
        className="ask-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (q.trim()) ask(q);
        }}
      >
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ask the bakery something…" aria-label="Caller question" />
        <button className="btn btn-primary btn-small" type="submit">Ask</button>
      </form>
      <div className="ask-chips">
        {tries.map((t) => (
          <button key={t} onClick={() => { setQ(t); ask(t); }}>{t}</button>
        ))}
      </div>
      {res && (
        <div className="ask-out">
          <div className={`ask-verdict v-${res.verdict.k}`}>
            <b>{res.verdict.k === "answer" ? "Answered from an approved fact" : res.verdict.k === "refuse" ? "Refused to quote" : "Escalated"}</b>
            <p>{res.verdict.m}</p>
          </div>
          <ul className="ask-bars">
            {res.scored.map((f) => (
              <li key={f.q}>
                <span>{f.q}</span>
                <i style={{ "--w": `${Math.round(Math.min(f.s, 1) * 100)}%` }} />
                <em>{f.s.toFixed(2)}</em>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ---------------- Ambient effects ---------------- */
export function useAmbient(dep) {
  useEffect(() => {
    const sel = ".pcard,.post-item,.skill-card,.timeline-item,.stat,.mail-form,.detail,.term,.ask";
    const onMove = (e) => {
      const el = e.target.closest && e.target.closest(sel);
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useEffect(() => {
    if (reduced() || !("IntersectionObserver" in window)) return;
    const els = document.querySelectorAll(".pcard,.post-item,.skill-card,.timeline-item,.about-section h2,.term,.ask");
    const io = new IntersectionObserver(
      (es) => es.forEach((en) => en.isIntersecting && (en.target.classList.add("in"), io.unobserve(en.target))),
      { rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el, n) => {
      if (el.getBoundingClientRect().top < window.innerHeight) return;
      el.classList.add("reveal");
      el.style.transitionDelay = `${(n % 3) * 70}ms`;
      io.observe(el);
    });
    return () => io.disconnect();
  }, [dep]);
}

export function ReadingProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      setP(h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight));
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return <div className="progress" style={{ transform: `scaleX(${p})` }} aria-hidden="true" />;
}

export function CursorGlow() {
  const ref = useRef(null);
  useEffect(() => {
    if (reduced() || !window.matchMedia("(pointer: fine)").matches) return;
    const on = (e) => ref.current && (ref.current.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)`);
    window.addEventListener("pointermove", on);
    return () => window.removeEventListener("pointermove", on);
  }, []);
  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
}
