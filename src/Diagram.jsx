const W = 140;
const H = 56;

function anchor(a, b) {
  const ac = { x: a.x + W / 2, y: a.y + H / 2 };
  const bc = { x: b.x + W / 2, y: b.y + H / 2 };
  // vertical link when nodes share a column
  if (Math.abs(a.x - b.x) < 10) {
    const down = b.y > a.y;
    return {
      x1: ac.x,
      y1: down ? a.y + H : a.y,
      x2: bc.x,
      y2: down ? b.y : b.y + H,
      vertical: true,
    };
  }
  const right = b.x > a.x;
  return {
    x1: right ? a.x + W : a.x,
    y1: ac.y,
    x2: right ? b.x : b.x + W,
    y2: bc.y,
    vertical: false,
  };
}

function path({ x1, y1, x2, y2, vertical }) {
  if (vertical) return `M${x1},${y1} L${x2},${y2}`;
  const mx = (x1 + x2) / 2;
  return `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`;
}

export default function Diagram({ nodes, edges, label }) {
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  return (
    <div className="diagram" role="img" aria-label={label}>
      <svg viewBox="0 0 900 320" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,0 L8,4 L0,8 z" className="arrow-head" />
          </marker>
        </defs>
        {edges.map(([from, to]) => {
          const d = path(anchor(byId[from], byId[to]));
          return (
            <g key={from + to}>
              <path d={d} className="edge-base" />
              <path d={d} className="edge-flow" markerEnd="url(#arrow)" />
            </g>
          );
        })}
        {nodes.map((n) => (
          <g key={n.id} transform={`translate(${n.x},${n.y})`} className={`node node-${n.tone}`}>
            <rect width={W} height={H} rx="10" />
            <text x={W / 2} y="23" textAnchor="middle" className="node-title">
              {n.label}
            </text>
            <text x={W / 2} y="41" textAnchor="middle" className="node-sub">
              {n.sub}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
