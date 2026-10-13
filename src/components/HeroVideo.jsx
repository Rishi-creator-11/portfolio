import { useEffect, useRef } from "react";

export const HeroVideo = () => {
  const ref = useRef(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) v.play().catch(() => {});
  }, []);

  return (
    <div className="shot-shadow overflow-hidden rounded-xl border border-white/15 bg-navy-950 xl:-mr-20">
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-navy-800 px-3 py-2" aria-hidden="true">
        <span className="size-2.5 rounded-full bg-white/25" />
        <span className="size-2.5 rounded-full bg-white/25" />
        <span className="size-2.5 rounded-full bg-white/25" />
        <span className="ml-3 text-xs text-slate-400">AlphaBrief launch film</span>
      </div>
      <video
        ref={ref}
        className="block w-full aspect-video bg-navy-950"
        poster="/media/alphabrief-film-poster.jpg"
        controls
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="AlphaBrief launch film: a walkthrough of the live research application"
      >
        <source src="/media/alphabrief-film.mp4" type="video/mp4" />
      </video>
    </div>
  );
};
