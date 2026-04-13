const features = [
  {
    title: "Long-Lasting Fragrance",
    description: "Compositions selected to stay memorable from day to evening.",
  },
  {
    title: "Premium Quality Oils",
    description: "Carefully blended oils inspired by classic Arabian perfumery.",
  },
  {
    title: "Elegant Packaging",
    description: "Refined presentation crafted for gifting and personal rituals.",
  },
  {
    title: "Alcohol-Free Attars",
    description: "Pure attar options made for a rich and traditional scent experience.",
  },
];

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <path
        d="M12 2L14.9 8.3L22 9.2L16.8 14L18.2 21L12 17.5L5.8 21L7.2 14L2 9.2L9.1 8.3L12 2Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function WhyChooseUs() {
  return (
    <section className="bg-[color:var(--color-primary)] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <p className="text-center text-xs uppercase tracking-[0.26em] text-[color:var(--color-accent)]">Why Choose Us</p>
        <h2 className="font-heading mt-3 text-center text-4xl text-[color:var(--color-bg)] sm:text-5xl">
          Crafted For Distinction
        </h2>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-2xl border border-[color:var(--color-bg)]/15 bg-[color:var(--color-bg)]/5 p-6"
            >
              <div className="mb-4 text-[color:var(--color-accent)]">
                <StarIcon />
              </div>
              <h3 className="text-lg text-[color:var(--color-bg)]">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-bg)]/70">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
