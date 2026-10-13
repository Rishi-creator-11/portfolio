export const Section = ({ id, title, intro, children, theme = "light" }) => {
  const dark = theme === "dark";
  const bg = { light: "bg-background", alt: "bg-secondary", dark: "bg-navy-900 text-white on-dark" }[theme];
  return (
    <section id={id} className={`scroll-mt-14 py-16 md:py-20 ${bg}`}>
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">{title}</h2>
        {intro && <p className={`mt-3 max-w-2xl text-lg ${dark ? "text-slate-300" : "text-muted-foreground"}`}>{intro}</p>}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
};
