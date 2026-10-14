import { useEffect, useRef } from "react";

export const HeroVideo = () => {
  const ref = useRef(null);

  useEffect(() => {
    const video = ref.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (video && !reducedMotion) video.play().catch(() => {});
  }, []);

  return (
    <div className="frame overflow-hidden rounded-lg border border-white/20 bg-navy-950">
      <video
        ref={ref}
        className="block aspect-video w-full bg-navy-950"
        poster="/media/alphabrief-film-poster.jpg"
        controls
        muted
        loop
        playsInline
        preload="metadata"
        width="1280"
        height="720"
        aria-label="AlphaBrief launch film: a walkthrough of the live research application"
      >
        <source src="/media/alphabrief-film.mp4" type="video/mp4" />
      </video>
    </div>
  );
};
