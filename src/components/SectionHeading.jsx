export const Section = ({ id, title, intro, children, tone }) => (
  <section id={id} className={`scroll-mt-16 py-14 md:py-16 ${tone === "alt" ? "bg-secondary/60" : ""}`}>
    <div className="container">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
      {intro && <p className="mt-2 max-w-2xl text-muted-foreground">{intro}</p>}
      <div className="mt-8">{children}</div>
    </div>
  </section>
);
