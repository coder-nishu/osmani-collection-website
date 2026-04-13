const signatureCollections = [
  {
    title: "Premium Attar",
    href: "/attar",
    image:
      "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Platinum Collection",
    href: "/collections",
    image:
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Perfume",
    href: "/perfume",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function SignatureSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.26em] text-[color:var(--color-accent)]">Collections</p>
          <h2 className="font-heading mt-3 text-4xl text-[color:var(--color-primary)] sm:text-5xl">
            Signature Collection
          </h2>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {signatureCollections.map((item) => (
          <a
            key={item.title}
            href={item.href}
            className="group relative block h-[340px] overflow-hidden rounded-3xl border border-[color:var(--color-primary)]/10"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/25 transition-colors duration-300 group-hover:bg-black/35" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="font-heading text-3xl text-[color:var(--color-bg)]">{item.title}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
