export const SectionHeading = ({ title, highlight, subtitle }) => (
  <div className="mb-12 text-center">
    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
      {title} <span className="text-primary">{highlight}</span>
    </h2>
    {subtitle && (
      <p className="mt-3 text-muted-foreground max-w-2xl mx-auto text-base">
        {subtitle}
      </p>
    )}
  </div>
);
