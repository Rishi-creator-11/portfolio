import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { evidenceProjects as projects, evidenceRows as rows } from "@/data/evidence";

/**
 * Technology-by-project map. A filled cell means the project's own source or docs show that skill.
 * Select a skill (row), a project (column) or a single cell to read the evidence.
 */
export const EvidenceMap = () => {
  const [sel, setSel] = useState(null); // { kind: "row" | "col" | "cell", r?: number, c?: string }

  const items = useMemo(() => {
    if (!sel) return [];
    if (sel.kind === "row") {
      const row = rows[sel.r];
      return projects.filter((p) => row.cells[p.id]).map((p) => ({ key: p.id, head: p.label, text: row.cells[p.id], id: p.id }));
    }
    if (sel.kind === "col") {
      const p = projects.find((x) => x.id === sel.c);
      return rows.filter((r) => r.cells[sel.c]).map((r) => ({ key: r.skill, head: r.skill, text: r.cells[sel.c], id: p.id }));
    }
    const row = rows[sel.r];
    const p = projects.find((x) => x.id === sel.c);
    return [{ key: "cell", head: `${row.skill} in ${p.label}`, text: row.cells[sel.c], id: p.id }];
  }, [sel]);

  const toggle = (next) =>
    setSel((cur) => (cur && cur.kind === next.kind && cur.r === next.r && cur.c === next.c ? null : next));

  const rowOn = (r) => sel && (sel.kind === "row" ? sel.r === r : sel.kind === "cell" ? sel.r === r : false);
  const colOn = (c) => sel && (sel.kind === "col" ? sel.c === c : sel.kind === "cell" ? sel.c === c : false);

  return (
    <figure className="rounded-xl border border-border bg-card p-3 sm:p-6">
      <figcaption className="sr-only">
        Matrix of skills against projects. Filled cells show where a project demonstrates the skill.
      </figcaption>
      <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Skills by project matrix, scrollable">
        <table className="w-full min-w-[640px] border-separate border-spacing-0 text-[15px]">
          <thead>
            <tr>
              <td className="sticky left-0 z-10 bg-card" />
              {projects.map((p) => (
                <th key={p.id} scope="col" className="px-1 pb-3 align-bottom">
                  <button
                    type="button"
                    onClick={() => toggle({ kind: "col", c: p.id })}
                    aria-pressed={sel?.kind === "col" && sel.c === p.id}
                    className={`min-h-11 w-full rounded-md px-2 text-[14px] font-semibold leading-tight transition-colors ${colOn(p.id) ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}
                  >
                    {p.label}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => (
              <tr key={row.skill}>
                <th scope="row" className="sticky left-0 z-10 bg-card pr-2 text-left">
                  <button
                    type="button"
                    onClick={() => toggle({ kind: "row", r })}
                    aria-pressed={sel?.kind === "row" && sel.r === r}
                    className={`min-h-11 w-full rounded-md px-2 text-left text-[14px] font-semibold leading-tight transition-colors ${rowOn(r) ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}
                  >
                    {row.skill}
                  </button>
                </th>
                {projects.map((p) => {
                  const has = Boolean(row.cells[p.id]);
                  const hot = rowOn(r) && colOn(p.id) && sel.kind === "cell";
                  const lit = has && (rowOn(r) || colOn(p.id)) && (sel.kind !== "cell" || hot);
                  return (
                    <td key={p.id} className="border-t border-border p-0 text-center">
                      {has ? (
                        <button
                          type="button"
                          onClick={() => toggle({ kind: "cell", r, c: p.id })}
                          aria-label={`${row.skill} in ${p.label}`}
                          aria-pressed={hot}
                          className="grid min-h-11 w-full place-items-center"
                        >
                          <span className={`size-4 rounded-full border-2 transition-all ${lit || hot ? "scale-125 border-primary bg-primary" : "border-primary bg-primary/25"}`} />
                        </button>
                      ) : (
                        <span className="grid min-h-11 place-items-center text-border" aria-label="Not used">·</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 min-h-[5.5rem] border-t border-border pt-4" aria-live="polite">
        {items.length === 0 ? (
          <p className="text-[15px] text-muted-foreground">Select a skill, a project or a filled dot to see the evidence. Empty cells mean the project does not show that skill.</p>
        ) : (
          <ul className="space-y-2.5">
            {items.map((i) => (
              <li key={i.key} className="text-[15px] leading-snug">
                <span className="font-semibold">{i.head}. </span>
                {i.text}{" "}
                <Link to={`/projects#${i.id}`} className="whitespace-nowrap font-semibold text-primary underline underline-offset-2">Project details</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </figure>
  );
};
