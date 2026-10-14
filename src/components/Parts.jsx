import { ExternalLink } from "lucide-react";

export const ToolLine = ({ tools, dark }) => (
  <p className={`text-[15px] leading-snug ${dark ? "text-slate-300" : "text-muted-foreground"}`}>
    <span className={`font-semibold ${dark ? "text-white" : "text-foreground"}`}>Tools </span>
    {tools.join(", ")}
  </p>
);

// Anchor that opens in a new tab and announces that to screen readers.
export const NewTabLink = ({ href, className, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
    {children}
    <span className="sr-only"> (opens in a new tab)</span>
  </a>
);

export const ExternalButton = ({ href, label, className }) => (
  <NewTabLink href={href} className={className}>
    {label} <ExternalLink size={14} aria-hidden="true" />
  </NewTabLink>
);

const buttonVariant = (primary, dark) => {
  if (primary) return dark ? "btn-teal" : "btn-primary";
  return dark ? "btn-ghost-light" : "btn-outline";
};

export const LinkButtons = ({ links, dark }) => (
  <div className="flex flex-wrap items-center gap-2.5">
    {links.map((l) => (
      <ExternalButton key={l.href} href={l.href} label={l.label} className={`btn ${buttonVariant(l.primary, dark)}`} />
    ))}
  </div>
);
