const stats = [
  { number: "3+", label: "Years of Experience", suffix: "" },
  { number: "50+", label: "Projects Delivered", suffix: "" },
  { number: "6", label: "Industries Served", suffix: "" },
  { number: "98", label: "Client Satisfaction", suffix: "%" },
];

export function StatsSection() {
  return (
    <section className="section-padding bg-richblack text-cream relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-terracotta/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-sage/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="text-center opacity-0 animate-fade-in"
              style={{ animationDelay: `${i * 120}ms`, animationFillMode: "forwards" }}
            >
              <span className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-terracotta">
                {stat.number}
                {stat.suffix}
              </span>
              <p className="mt-2 text-sm text-cream/40 font-mono tracking-wider uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}