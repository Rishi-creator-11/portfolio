import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { timeline, timelineLanes, graduation, timelineRange } from "@/data/timeline";
import { useMediaQuery } from "@/hooks/use-media-query";

const mi = ([y, m]) => y * 12 + (m - 1);
const T0 = mi(timelineRange.start);
const T1 = mi(timelineRange.end);
const LABEL_W = 118;
const AXIS_W = 1000;
const BAR_H = 34;
const ROW_H = 44;

const LANE_COLOR = { professional: "#0b7a6f", projects: "#3f6291", teaching: "#b45309" };

const Detail = ({ e, compact = false }) => (
  <div className="rounded-lg border border-white/15 bg-white/5 p-5" aria-live="polite">
    {!compact ? (
      <>
        <p className="font-display text-xl font-semibold leading-snug">{e.title}</p>
        <p className="mt-0.5 text-[15px] text-slate-300">{e.role} · {e.dates}</p>
      </>
    ) : (
      <p className="text-[15px] text-slate-300">{e.role}</p>
    )}
    <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[16px] leading-snug text-slate-200">
      {e.points.map((p) => <li key={p}>{p}</li>)}
    </ul>
    {e.link && (
      <Link to={`/projects#${e.link}`} className="mt-3 inline-flex min-h-11 items-center font-semibold text-teal-glow underline underline-offset-2">
        Architecture and decisions
      </Link>
    )}
  </div>
);

/** Career and project timeline. Wide screens get a lane chart; narrow screens get a dated list. */
export const Timeline = () => {
  const wide = useMediaQuery("(min-width: 821px)");
  const [selId, setSelId] = useState("");
  const sel = timeline.find((t) => t.id === selId) ?? timeline.find((t) => t.id === "metroprint");

  // Greedy row packing per lane so overlapping entries stack instead of covering each other.
  const placed = useMemo(() => {
    const items = [];
    const lanes = [];
    let rowCursor = 0;
    timelineLanes.forEach((lane) => {
      const rowEnds = [];
      timeline
        .filter((t) => t.lane === lane.id)
        .sort((a, b) => mi(a.start) - mi(b.start))
        .forEach((t) => {
          let r = rowEnds.findIndex((end) => end <= mi(t.start));
          if (r === -1) { r = rowEnds.length; rowEnds.push(0); }
          rowEnds[r] = mi(t.end);
          items.push({ ...t, row: rowCursor + r });
        });
      const rows = Math.max(rowEnds.length, 1);
      lanes.push({ ...lane, rowStart: rowCursor, rows });
      rowCursor += rows;
    });
    return { items, lanes, totalRows: rowCursor };
  }, []);

  const x = (m) => LABEL_W + ((m - T0) / (T1 - T0)) * (AXIS_W - LABEL_W);
  const H = placed.totalRows * ROW_H + 52;
  const quarters = [];
  for (let m = Math.ceil(T0 / 3) * 3; m < T1; m += 3) quarters.push(m);

  if (!wide) {
    const list = [...timeline].sort((a, b) => mi(a.start) - mi(b.start));
    return (
      <ol className="space-y-2" aria-label="Timeline">
        {list.map((t) => {
          const open = selId === t.id;
          return (
            <li key={t.id} className="rounded-lg border border-white/15">
              <button
                type="button"
                onClick={() => setSelId(open ? "" : t.id)}
                aria-expanded={open}
                className="flex min-h-14 w-full items-center gap-3 px-4 text-left"
              >
                <span className="h-8 w-1.5 shrink-0 rounded-full" style={{ background: LANE_COLOR[t.lane] }} aria-hidden="true" />
                <span>
                  <span className="block font-semibold">{t.title}</span>
                  <span className="block text-[14px] text-slate-300">{t.dates}</span>
                </span>
              </button>
              {open && <div className="px-4 pb-4"><Detail e={t} compact /></div>}
            </li>
          );
        })}
      </ol>
    );
  }

  return (
    <div>
      <figure>
        <svg viewBox={`0 0 ${AXIS_W} ${H}`} className="block h-auto w-full" role="group" aria-label="Timeline from June 2024 to December 2026, grouped into professional work, projects and teaching">
          {placed.lanes.map((lane, i) => (
            <g key={lane.id}>
              <rect x="0" y={lane.rowStart * ROW_H} width={AXIS_W} height={lane.rows * ROW_H} fill={i % 2 ? "rgba(255,255,255,0.03)" : "transparent"} />
              <text x="8" y={lane.rowStart * ROW_H + 28} fontSize="14" fontWeight="600" fill="#cbd5e1">{lane.label}</text>
            </g>
          ))}
          {quarters.map((m) => {
            const year = Math.floor(m / 12);
            const month = m % 12;
            return (
              <g key={m}>
                <line x1={x(m)} x2={x(m)} y1="0" y2={placed.totalRows * ROW_H} stroke="rgba(255,255,255,0.08)" />
                <text x={x(m) + 4} y={placed.totalRows * ROW_H + 18} fontSize="12" fill="#94a3b8">
                  {["Jan", "Apr", "Jul", "Oct"][month / 3]}{month === 0 ? ` ${year}` : ""}
                </text>
              </g>
            );
          })}
          <g>
            <line x1={x(mi(graduation.at))} x2={x(mi(graduation.at))} y1="0" y2={placed.totalRows * ROW_H + 28} stroke="#5eead4" strokeDasharray="4 4" />
            <text x={x(mi(graduation.at)) - 6} y={placed.totalRows * ROW_H + 44} fontSize="12" fill="#5eead4" textAnchor="end">{graduation.label}</text>
          </g>
          {placed.items.map((t) => {
            const bx = x(mi(t.start));
            const bw = x(mi(t.end)) - bx - 2;
            const by = t.row * ROW_H + (ROW_H - BAR_H) / 2;
            const on = (selId || "metroprint") === t.id;
            return (
              <g
                key={t.id}
                role="button"
                tabIndex={0}
                aria-pressed={on}
                aria-label={`${t.title}, ${t.dates}`}
                onClick={() => setSelId(t.id)}
                onKeyDown={(ev) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); setSelId(t.id); } }}
                className="fd-node cursor-pointer"
              >
                <rect x={bx} y={by} width={bw} height={BAR_H} rx="7" fill={LANE_COLOR[t.lane]} opacity={on ? 1 : 0.78} stroke={on ? "#fff" : "none"} strokeWidth="2" className="fd-box" />
                <text x={bx + 9} y={by + 22} fontSize="13" fontWeight="600" fill="#fff">{t.short}</text>
              </g>
            );
          })}
        </svg>
      </figure>
      <div className="mt-4"><Detail e={sel} /></div>
    </div>
  );
};
