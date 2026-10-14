const themeClasses = { light: "bg-background", alt: "bg-secondary", dark: "bg-navy-950 text-white on-dark" };

export const Section = ({ id, title, children, theme = "light" }) => {
  const headingId = `${id}-h`;
  return (
    <section id={id} aria-labelledby={headingId} className={`py-20 md:py-28 ${themeClasses[theme]}`}>
      <div className="container">
        <h2 id={headingId} className="mb-12 font-display text-4xl font-semibold tracking-tight md:mb-16 md:text-6xl">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
};
