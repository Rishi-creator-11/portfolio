import { useId, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Play, RotateCcw } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";

/**
 * @typedef {"user"|"service"|"data"|"ai"|"human"|"external"} Tone
 * @typedef {{ id: string, col: number, row: number, label: string, sub?: string, tone: Tone, detail: string }} DiagramNode
 * @typedef {{ from: string, to: string, label?: string, dashed?: boolean }} DiagramEdge
 * @typedef {{ nodes?: string[], path?: string[], edges?: string[], caption: string }} DiagramStep // `path` is an alias of `nodes`; edges default to consecutive pairs
 * @typedef {{ title: string, description: string, nodes: DiagramNode[], edges: DiagramEdge[], steps?: DiagramStep[] }} DiagramSpec
 */

const TONES = {
  user: { color: "#0b7a6f", name: "Interface" },
  service: { color: "#0d1b2e", name: "Service / logic" },
  data: { color: "#3f6291", name: "Data store" },
  ai: { color: "#d9a400", name: "Model / AI" },
  human: { color: "#c2410c", name: "Human decision" },
  external: { color: "#6b7a90", name: "External system" },
};

const W = 160;
const H = 60;
const GAP_X = 58; // gap between columns in the wide (left-to-right) layout
const GAP_Y = 30;
const PAD = 12;

const edgeKey = (e) => `${e.from}>${e.to}`;

/** @param {{ spec: DiagramSpec }} props */
export const FlowDiagram = ({ spec }) => {
  const uid = useId().replace(/:/g, "");
  const vertical = useMediaQuery("(max-width: 820px)");
  const phone = useMediaQuery("(max-width: 640px)");
  const [showDiagram, setShowDiagram] = useState(false);
  const [selected, setSelected] = useState(null);
  const [stepIdx, setStepIdx] = useState(-1);

  const steps = spec.steps ?? [];
  const step = stepIdx >= 0 ? steps[stepIdx] : null;

  const layout = useMemo(() => {
    const pos = {};
    spec.nodes.forEach((n) => {
      const x = vertical ? PAD + n.row * (W + 26) : PAD + n.col * (W + GAP_X);
      const y = vertical ? PAD + n.col * (H + 40) : PAD + n.row * (H + GAP_Y);
      pos[n.id] = { x, y };
    });
    const maxX = Math.max(...Object.values(pos).map((p) => p.x)) + W + PAD + 40;
    const maxY = Math.max(...Object.values(pos).map((p) => p.y)) + H + PAD;
    return { pos, w: maxX, h: maxY };
  }, [spec.nodes, vertical]);

  const nodeById = useMemo(() => Object.fromEntries(spec.nodes.map((n) => [n.id, n])), [spec.nodes]);

  // Which nodes and edges are emphasised right now.
  const { litNodes, litEdges } = useMemo(() => {
    if (step) {
      const ids = step.nodes ?? step.path;
      const edges = new Set(step.edges ?? ids.slice(0, -1).map((id, i) => `${id}>${ids[i + 1]}`));
      return { litNodes: new Set(ids), litEdges: edges };
    }
    if (selected) {
      const edges = new Set(spec.edges.filter((e) => e.from === selected || e.to === selected).map(edgeKey));
      const nodes = new Set([selected]);
      spec.edges.forEach((e) => {
        if (e.from === selected) nodes.add(e.to);
        if (e.to === selected) nodes.add(e.from);
      });
      return { litNodes: nodes, litEdges: edges };
    }
    return { litNodes: null, litEdges: null };
  }, [step, selected, spec.edges]);

  const edgePath = (e) => {
    const a = layout.pos[e.from];
    const b = layout.pos[e.to];
    // Opposite-direction edges between the same pair are nudged apart so both stay visible.
    const hasReverse = spec.edges.some((o) => o.from === e.to && o.to === e.from);
    const off = hasReverse ? (e.from < e.to ? 9 : -9) : 0;
    const ac = { x: a.x + W / 2 + off, y: a.y + H / 2 + off };
    const bc = { x: b.x + W / 2 + off, y: b.y + H / 2 + off };
    const dx = bc.x - ac.x;
    const dy = bc.y - ac.y;
    let p1;
    let p2;
    let c1;
    let c2;
    // If another node sits on the straight line between the two, bow the edge around it.
    const blocker = spec.nodes.some((n) => {
      if (n.id === e.from || n.id === e.to) return false;
      const q = layout.pos[n.id];
      const qc = { x: q.x + W / 2, y: q.y + H / 2 };
      if (Math.abs(dx) < 1) return Math.abs(qc.x - ac.x) < 1 && qc.y > Math.min(ac.y, bc.y) && qc.y < Math.max(ac.y, bc.y);
      if (Math.abs(dy) < 1) return Math.abs(qc.y - ac.y) < 1 && qc.x > Math.min(ac.x, bc.x) && qc.x < Math.max(ac.x, bc.x);
      return false;
    });
    if (blocker && Math.abs(dx) < 1) {
      p1 = { x: a.x + W, y: ac.y };
      p2 = { x: b.x + W, y: bc.y };
      c1 = { x: p1.x + 70, y: p1.y };
      c2 = { x: p2.x + 70, y: p2.y };
      return { d: `M${p1.x},${p1.y} C${c1.x},${c1.y} ${c2.x},${c2.y} ${p2.x},${p2.y}`, mid: { x: p1.x + 52, y: (p1.y + p2.y) / 2 } };
    }
    if (blocker && Math.abs(dy) < 1) {
      p1 = { x: ac.x, y: a.y + H };
      p2 = { x: bc.x, y: b.y + H };
      c1 = { x: p1.x, y: p1.y + 52 };
      c2 = { x: p2.x, y: p2.y + 52 };
      return { d: `M${p1.x},${p1.y} C${c1.x},${c1.y} ${c2.x},${c2.y} ${p2.x},${p2.y}`, mid: { x: (p1.x + p2.x) / 2, y: p1.y + 40 } };
    }
    if (Math.abs(dx) >= Math.abs(dy) && Math.abs(dx) > 1) {
      const s = Math.sign(dx);
      p1 = { x: a.x + (s > 0 ? W : 0), y: ac.y };
      p2 = { x: b.x + (s > 0 ? 0 : W), y: bc.y };
      const k = Math.max(24, Math.abs(p2.x - p1.x) / 2);
      c1 = { x: p1.x + s * k, y: p1.y };
      c2 = { x: p2.x - s * k, y: p2.y };
    } else {
      const s = Math.sign(dy) || 1;
      p1 = { x: ac.x, y: a.y + (s > 0 ? H : 0) };
      p2 = { x: bc.x, y: b.y + (s > 0 ? 0 : H) };
      const k = Math.max(20, Math.abs(p2.y - p1.y) / 2);
      c1 = { x: p1.x, y: p1.y + s * k };
      c2 = { x: p2.x, y: p2.y - s * k };
    }
    return { d: `M${p1.x},${p1.y} C${c1.x},${c1.y} ${c2.x},${c2.y} ${p2.x},${p2.y}`, mid: { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 } };
  };

  const onNode = (id) => {
    setStepIdx(-1);
    setSelected((cur) => (cur === id ? null : id));
  };
  const toStep = (i) => {
    setSelected(null);
    setStepIdx(Math.max(0, Math.min(steps.length - 1, i)));
  };
  const reset = () => {
    setStepIdx(-1);
    setSelected(null);
  };

  const usedTones = [...new Set(spec.nodes.map((n) => n.tone))];
  const caption = step
    ? step.caption
    : selected
      ? `${nodeById[selected].label.replace(/\n/g, " ")}: ${nodeById[selected].detail}`
      : "Select a component to see what it does, or walk through the flow step by step.";

  const markerId = `${uid}-arrow`;
  const markerHot = `${uid}-arrow-hot`;

  return (
    <figure className="rounded-xl border border-border bg-card p-3 sm:p-5" aria-labelledby={`${uid}-t`}>
      <figcaption className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span id={`${uid}-t`} className="font-display text-lg font-semibold leading-snug">{spec.title}</span>
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-muted-foreground" aria-label="Legend">
          {usedTones.map((t) => (
            <li key={t} className="flex items-center gap-1.5">
              <span className="inline-block h-3 w-1.5 rounded-sm" style={{ background: TONES[t].color }} aria-hidden="true" />
              {TONES[t].name}
            </li>
          ))}
        </ul>
      </figcaption>
      {spec.kind === "workflow" && (
        <p className="mb-3 inline-block rounded-full border border-primary/40 bg-primary/5 px-3 py-0.5 text-[13px] font-semibold text-primary">
          Product workflow, not implementation architecture
        </p>
      )}

      {phone && !showDiagram && steps.length > 0 ? (
        <div>
          <ol className="space-y-4" aria-label={`${spec.title}, step by step`}>
            {steps.map((st, i) => {
              const ids = st.nodes ?? st.path;
              return (
                <li key={st.caption} className="flex gap-3">
                  <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-navy-900 text-[13px] font-semibold text-teal-glow" aria-hidden="true">{i + 1}</span>
                  <div className="min-w-0">
                    <ul className="flex flex-wrap gap-1.5" aria-label="Components in this step">
                      {ids.map((id) => (
                        <li key={id} className="flex items-center overflow-hidden rounded-md border border-border bg-background text-[13px] font-semibold">
                          <span className="h-full w-1.5 self-stretch" style={{ background: TONES[nodeById[id].tone].color }} aria-hidden="true" />
                          <span className="px-2 py-1">{nodeById[id].label.replace(/\n/g, " ")}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-1.5 text-[15px] leading-snug">{st.caption}</p>
                  </div>
                </li>
              );
            })}
          </ol>
          <button type="button" onClick={() => setShowDiagram(true)} className="btn btn-outline mt-4 !min-h-10 !py-1.5">Show interactive diagram</button>
        </div>
      ) : (
        <>
      {vertical && layout.w > 340 && (
        <p className="mb-2 text-[13px] text-muted-foreground">Swipe sideways to see the whole diagram.</p>
      )}
      <div
        className={vertical ? "overflow-x-auto" : undefined}
        {...(vertical ? { tabIndex: 0, role: "region", "aria-label": `${spec.title}, scrollable diagram` } : {})}
      >
      <svg
        viewBox={`0 0 ${layout.w} ${layout.h}`}
        className="block h-auto"
        style={vertical ? { width: layout.w, maxWidth: "none" } : { width: "100%", maxWidth: layout.w }}
        role="group"
        aria-label={spec.description}
      >
        <defs>
          <marker id={markerId} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,1 L9,5 L0,9 z" fill="#8a97a8" />
          </marker>
          <marker id={markerHot} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,1 L9,5 L0,9 z" fill="#0b7a6f" />
          </marker>
        </defs>

        {spec.edges.map((e) => {
          const k = edgeKey(e);
          const hot = litEdges?.has(k);
          const dim = litEdges && !hot;
          const { d, mid } = edgePath(e);
          return (
            <g key={k} opacity={dim ? 0.22 : 1}>
              <path
                d={d}
                fill="none"
                stroke={hot ? "#0b7a6f" : "#8a97a8"}
                strokeWidth={hot ? 2.4 : 1.5}
                strokeDasharray={e.dashed ? "5 4" : undefined}
                markerEnd={`url(#${hot ? markerHot : markerId})`}
                className={hot ? "fd-flow" : undefined}
              />
              {e.label && (
                <text x={mid.x} y={mid.y - 5} textAnchor="middle" fontSize="11" fill="#4a5a70" stroke="#fff" strokeWidth="3" paintOrder="stroke">
                  {e.label}
                </text>
              )}
            </g>
          );
        })}

        {spec.nodes.map((n) => {
          const { x, y } = layout.pos[n.id];
          const tone = TONES[n.tone];
          const lit = litNodes?.has(n.id);
          const dim = litNodes && !lit;
          const lines = n.label.split("\n");
          return (
            <g
              key={n.id}
              transform={`translate(${x},${y})`}
              role="button"
              tabIndex={0}
              aria-pressed={selected === n.id}
              aria-label={`${lines.join(" ")}${n.sub ? `, ${n.sub}` : ""}`}
              onClick={() => onNode(n.id)}
              onKeyDown={(ev) => {
                if (ev.key === "Enter" || ev.key === " ") {
                  ev.preventDefault();
                  onNode(n.id);
                }
              }}
              opacity={dim ? 0.35 : 1}
              className="fd-node cursor-pointer"
            >
              <rect width={W} height={H} rx="8" fill="#fff" stroke={lit ? tone.color : "#c5ceda"} strokeWidth={lit ? 2 : 1.25} className="fd-box" />
              <rect width="6" height={H} rx="3" fill={tone.color} />
              <text x="16" y={n.sub ? 22 : H / 2 + (lines.length > 1 ? -4 : 5)} fontSize="13" fontWeight="600" fill="#0d1b2e">
                {lines.map((l, i) => (
                  <tspan key={l} x="16" dy={i === 0 ? 0 : 15}>{l}</tspan>
                ))}
              </text>
              {n.sub && (
                <text x="16" y={lines.length > 1 ? 52 : 40} fontSize="11" fill="#4a5a70">{n.sub}</text>
              )}
            </g>
          );
        })}
      </svg>
      </div>

      <div className="mt-3 flex flex-col gap-3 border-t border-border pt-3 sm:flex-row sm:items-start sm:justify-between">
        <p className="min-h-[3.25rem] flex-1 text-[15px] leading-snug" aria-live="polite">
          {step && <span className="mr-2 font-semibold text-primary">Step {stepIdx + 1} of {steps.length}</span>}
          {caption}
        </p>
        {steps.length > 0 && (
          <div className="flex shrink-0 items-center gap-2" role="group" aria-label="Walkthrough controls">
            {stepIdx < 0 ? (
              <button type="button" onClick={() => toStep(0)} className="btn btn-primary !min-h-10 !py-1.5">
                <Play size={14} aria-hidden="true" /> Walk through
              </button>
            ) : (
              <>
                <button type="button" onClick={() => toStep(stepIdx - 1)} disabled={stepIdx === 0} className="btn btn-outline !min-h-10 !px-3 !py-1.5 disabled:opacity-40" aria-label="Previous step">
                  <ChevronLeft size={16} aria-hidden="true" />
                </button>
                <button type="button" onClick={() => toStep(stepIdx + 1)} disabled={stepIdx === steps.length - 1} className="btn btn-primary !min-h-10 !px-3 !py-1.5 disabled:opacity-40" aria-label="Next step">
                  <ChevronRight size={16} aria-hidden="true" />
                </button>
                <button type="button" onClick={reset} className="btn btn-outline !min-h-10 !px-3 !py-1.5" aria-label="Reset walkthrough">
                  <RotateCcw size={14} aria-hidden="true" />
                </button>
              </>
            )}
          </div>
        )}
      </div>

        </>
      )}

      {!(phone && !showDiagram) && (
        <ol className="sr-only">
          {steps.map((s) => (
            <li key={s.caption}>{s.caption}</li>
          ))}
        </ol>
      )}
    </figure>
  );
};
