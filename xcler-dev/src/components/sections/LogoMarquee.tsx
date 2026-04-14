const industries = [
  "HEALTHCARE",
  "RESTAURANTS",
  "E-COMMERCE",
  "EDUCATION",
  "DENTAL",
  "SaaS",
  "STARTUPS",
  "REAL ESTATE",
];

export function LogoMarquee() {
  const repeatedIndustries = [...industries, ...industries];

  return (
    <section className="relative border-y border-stone/10 dark:border-stone-dark/10 py-6 overflow-hidden">
      <div className="flex w-max animate-marquee">
        {repeatedIndustries.map((industry, i) => (
          <span
            key={`${industry}-${i}`}
            className="flex shrink-0 items-center gap-4 px-4 font-heading text-sm tracking-[0.3em] text-richblack/70 dark:text-cream/80"
          >
            {industry}
            <span className="h-1.5 w-1.5 rounded-full bg-terracotta/85" />
          </span>
        ))}
      </div>
    </section>
  );
}