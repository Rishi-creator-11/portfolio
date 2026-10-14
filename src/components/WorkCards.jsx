import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ExternalButton } from "./Parts";

/** @type {{ id: string, title: string, outcome: string, image: { src: string, alt: string }, live?: { label: string, href: string }, source?: { label: string, href: string } }[]} */
const cards = [
  {
    id: "alphabrief",
    more: "Architecture",
    title: "AlphaBrief",
    outcome: "A live research product covering 92 companies and 274 filings, where every answer shows the passage behind it.",
    image: { src: "/projects/alphabrief-hero.webp", alt: "AlphaBrief answering a question about Apple's fiscal 2025 net sales with a company and year picker, a cited answer and the retrieved 10-K passage beside it." },
    live: { label: "Open live demo", href: "https://secfrontend.vercel.app/" },
  },
  {
    id: "metroprint",
    title: "MetroPrint",
    outcome: "A deployed ordering platform and admin workspace built from the owner's requirements: about 97 configurable products with validated pricing.",
    image: { src: "/projects/metroprint-storefront.webp", alt: "The MetroPrint Marketing storefront home page with a promotional carousel, product categories and a Shop products button." },
    live: { label: "Open live site", href: "https://www.metroprintmkt.com/" },
  },
  {
    id: "tripilot-ai",
    title: "TriPilot AI",
    outcome: "A live travel product for planning a day-by-day itinerary around existing bookings, with map-first planning, group voting, budgets and subscription plans.",
    image: { src: "/projects/tripilot.webp", alt: "The TriPilot AI home page: 'Plan smarter. Travel easier.' beside a sample London day itinerary with a locked ticketed reservation." },
    live: { label: "Open live app", href: "https://tripilot-ai.vercel.app/" },
  },
  {
    id: "alumi",
    title: "Alumi",
    outcome: "A live photo-print storefront: upload a photo, tune size, crop and finish, then check out. Orders are stored in Supabase; payments run in test mode.",
    image: { src: "/projects/alumi.webp", alt: "The Alumi storefront hero: 'Your camera roll deserves better' beside a collage of printed aluminum photos and a photo upload box." },
    live: { label: "Open live site", href: "https://alumi2.vercel.app/" },
  },
];

export const WorkCards = () => (
  <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
    {cards.map((c) => (
      <li key={c.id} className="flex flex-col overflow-hidden rounded-xl border border-border bg-card">
        <div className="aspect-[16/10] overflow-hidden border-b border-border bg-navy-950">
          <img src={c.image.src} alt={c.image.alt} width="1600" height="1000" loading="lazy" decoding="async" className="size-full object-cover object-top" />
        </div>
        <div className="flex flex-1 flex-col gap-4 p-5">
          <h3 className="font-display text-2xl font-semibold leading-none">{c.title}</h3>
          <p className="flex-1 text-[16px] leading-relaxed text-muted-foreground">{c.outcome}</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {c.live && <ExternalButton href={c.live.href} label={c.live.label} className="btn btn-primary" />}
            {c.source && <ExternalButton href={c.source.href} label={c.source.label} className="btn btn-outline" />}
            <Link to={`/projects#${c.id}`} className="inline-flex min-h-11 items-center gap-1.5 text-[15px] font-semibold text-primary">
              {c.more ?? "Details"} <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </li>
    ))}
  </ul>
);
