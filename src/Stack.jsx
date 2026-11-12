import { useMemo, useState } from "react";
import { siAnthropic,siBetterauth,siClaude,siCloudflare,siCypress,siDeepgram,siDocker,siDrizzle,siElevenlabs,siExpress,siFastapi,siFramer,siGithubactions,siGo,siGooglegemini,siHuggingface,siJavascript,siJest,siLangchain,siLanggraph,siLivekit,siMistralai,siModelcontextprotocol,siN8n,siNeon,siNetlify,siNextdotjs,siNodedotjs,siOllama,siOpenjdk,siOpentelemetry,siPostgresql,siPosthog,siPytest,siPython,siRailway,siReact,siReactquery,siRedis,siRender,siReplicate,siResend,siShadcnui,siSqlalchemy,siStripe,siSupabase,siTailwindcss,siTensorflow,siTerraform,siTypescript,siVercel,siVite,siVitest,siX,siZapier,siZod,siPydantic,siGooglecalendar,siNginx,siNpm,siApachekafka,siPostman } from "simple-icons";
import { stackGroups, extraIcons } from "./stack.js";
import { projects, work } from "./data.js";

const ICONS = Object.fromEntries(
  [siPostman,siPydantic,siGooglecalendar,siNginx,siNpm,siApachekafka,siAnthropic,siBetterauth,siClaude,siCloudflare,siCypress,siDeepgram,siDocker,siDrizzle,siElevenlabs,siExpress,siFastapi,siFramer,siGithubactions,siGo,siGooglegemini,siHuggingface,siJavascript,siJest,siLangchain,siLanggraph,siLivekit,siMistralai,siModelcontextprotocol,siN8n,siNeon,siNetlify,siNextdotjs,siNodedotjs,siOllama,siOpenjdk,siOpentelemetry,siPostgresql,siPosthog,siPytest,siPython,siRailway,siReact,siReactquery,siRedis,siRender,siReplicate,siResend,siShadcnui,siSqlalchemy,siStripe,siSupabase,siTailwindcss,siTensorflow,siTerraform,siTypescript,siVercel,siVite,siVitest,siX,siZapier,siZod].map((i) => [i.slug, i])
);

function useStack() {
  return useMemo(() => {
    const sources = [
      ...projects.map((p) => ({ label: p.title || p.name || p.id, stack: p.stack || [] })),
      ...work.map((w) => ({ label: w.short ? w.short.co : w.name, stack: w.stack || [] })),
    ];
    const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
    return stackGroups.map((g) => ({
      ...g,
      items: g.items.filter((it) => it.major).map((it) => {
        const keys = [it.name, ...(it.match || [])].map(norm);
        const used = sources.filter((s) => s.stack.some((t) => keys.includes(norm(t)))).map((s) => s.label);
        return { ...it, used: [...new Set(used)] };
      }),
    }));
  }, []);
}

function Logo({ it, size = 20 }) {
  const ic = it.icon && ICONS[it.icon];
  if (!ic) {
    const mono = it.name.replace(/[^A-Za-z0-9]/g, "").slice(0, 2);
    return <span className="st-mono" style={{ width: size, height: size }} aria-hidden="true">{mono}</span>;
  }
  return (
    <svg className="st-svg" width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" style={{ "--brand": "#" + ic.hex }}>
      <path d={ic.path} />
    </svg>
  );
}

function Console({ groups }) {
  const [tab, setTab] = useState("all");
  const [pick, setPick] = useState(null);
  const shown = tab === "all" ? groups : groups.filter((g) => g.id === tab);
  const total = groups.reduce((n, g) => n + g.items.length, 0);
  const shipped = groups.reduce((n, g) => n + g.items.filter((i) => i.used.length).length, 0);
  return (
    <div className="st-console">
      <div className="st-bar">
        <span className="st-dots"><i /><i /><i /></span>
        <span className="st-path">~/rishi/stack</span>
        <span className="st-count">{total} tools · {shipped} in shipped work</span>
      </div>
      <div className="st-tabs" role="tablist">
        {[{ id: "all", label: "All" }, ...groups].map((g) => (
          <button key={g.id} role="tab" aria-selected={tab === g.id} className={tab === g.id ? "on" : ""} onClick={() => { setTab(g.id); setPick(null); }}>
            {g.label}
          </button>
        ))}
      </div>
      <div className="st-body">
        {shown.map((g) => (
          <div key={g.id} className="st-group">
            {tab === "all" && <p className="st-glabel">{g.label}</p>}
            <ul className="st-tiles">
              {g.items.map((it) => (
                <li key={it.name}>
                  <button className={"st-tile" + (pick === it.name ? " on" : "") + (it.used.length ? " used" : "")} onClick={() => setPick(pick === it.name ? null : it.name)}>
                    <Logo it={it} />
                    <span>{it.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="st-foot" aria-live="polite">
        {(() => {
          const it = pick && groups.flatMap((g) => g.items).find((i) => i.name === pick);
          if (!it) return <span className="st-hint">$ tap any tool to see where I used it</span>;
          return it.used.length ? (
            <span><b>{it.name}</b> → used in {it.used.join(", ")}</span>
          ) : (
            <span><b>{it.name}</b> → built with it on side projects and experiments</span>
          );
        })()}
      </div>
    </div>
  );
}

const ALL = Object.fromEntries(stackGroups.flatMap((g) => g.items.map((i) => [i.name.toLowerCase(), i])));

// Logo tiles for a project's full stack.
export function StackTiles({ names }) {
  return (
    <ul className="st-tiles st-proj">
      {names.map((n) => {
        const known = ALL[n.toLowerCase()];
        const icon = known ? known.icon : extraIcons[n] ?? null;
        return (
          <li key={n}>
            <span className="st-tile static">
              <Logo it={{ name: n, icon }} />
              <span>{n}</span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export default function Stack() {
  return <Console groups={useStack()} />;
}
