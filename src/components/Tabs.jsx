import { useId, useRef, useState } from "react";

/**
 * Accessible tabs (WAI-ARIA tabs pattern with arrow-key navigation).
 * @param {{ items: { id: string, label: string, content: import("react").ReactNode }[], label?: string, dark?: boolean }} props
 */
export const Tabs = ({ items, label = "Project sections", dark = false }) => {
  const uid = useId();
  const [active, setActive] = useState(items[0].id);
  const refs = useRef({});

  const move = (dir) => {
    const i = items.findIndex((t) => t.id === active);
    const next = items[(i + dir + items.length) % items.length];
    setActive(next.id);
    refs.current[next.id]?.focus();
  };

  const onKey = (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); move(1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); move(-1); }
    else if (e.key === "Home") { e.preventDefault(); setActive(items[0].id); refs.current[items[0].id]?.focus(); }
    else if (e.key === "End") { const l = items[items.length - 1]; e.preventDefault(); setActive(l.id); refs.current[l.id]?.focus(); }
  };

  return (
    <div>
      <div role="tablist" aria-label={label} onKeyDown={onKey} className={`flex gap-1 overflow-x-auto border-b ${dark ? "border-white/20" : "border-border"}`}>
        {items.map((t) => {
          const on = t.id === active;
          return (
            <button
              key={t.id}
              ref={(el) => (refs.current[t.id] = el)}
              role="tab"
              id={`${uid}-tab-${t.id}`}
              aria-selected={on}
              aria-controls={`${uid}-panel-${t.id}`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(t.id)}
              className={`-mb-px min-h-11 whitespace-nowrap border-b-2 px-4 text-[15px] font-semibold transition-colors ${
                on ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>
      {items.map((t) => (
        <div
          key={t.id}
          role="tabpanel"
          id={`${uid}-panel-${t.id}`}
          aria-labelledby={`${uid}-tab-${t.id}`}
          hidden={t.id !== active}
          tabIndex={0}
          className="pt-6"
        >
          {t.content}
        </div>
      ))}
    </div>
  );
};
