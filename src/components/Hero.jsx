const demoHeroBottleUrl =
  "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=1200&q=80";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--color-bg)] pb-12 pt-10 sm:pb-14 sm:pt-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(200,169,106,0.09),transparent_44%),radial-gradient(circle_at_82%_68%,rgba(23,33,25,0.06),transparent_46%)]" />
      <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-[color:var(--color-primary)]/8 lg:block" />

      <div className="relative mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-18 lg:px-10">
        <div className="order-2 max-w-2xl lg:order-1">
          <p className="mb-6 text-xs uppercase tracking-[0.3em] text-[color:var(--color-accent)] sm:text-sm">
            Premium Arabian Perfumery
          </p>

          <h1 className="font-heading text-5xl leading-[1.14] text-[color:var(--color-primary)] sm:text-6xl lg:text-7xl">
            Luxury Attars That Define Presence
          </h1>

          <div className="mt-5 h-px w-24 bg-[color:var(--color-accent)]/70" />

          <p className="mt-9 max-w-xl text-base leading-relaxed text-[color:var(--color-primary)]/62 sm:text-lg">
            Long-lasting premium Arabian fragrances crafted for elegance
          </p>

          <div className="mt-14 flex flex-wrap items-center gap-4">
            <a
              href="/attar"
              className="btn-brand shadow-[0_12px_28px_rgba(23,33,25,0.24)] transition-all duration-300 hover:scale-105"
            >
              Shop Attar
            </a>
            <a
              href="/collections"
              className="inline-flex items-center justify-center rounded-full border border-[color:var(--color-primary)]/50 px-6 py-3 text-xs uppercase tracking-[0.18em] text-[color:var(--color-primary)] transition-all duration-300 hover:scale-105 hover:border-[color:var(--color-accent)] hover:bg-[color:var(--color-accent)] hover:text-[color:var(--color-primary)]"
            >
              Explore Collection
            </a>
          </div>

          <div className="mt-12 grid max-w-lg grid-cols-2 gap-8 border-t border-[color:var(--color-primary)]/15 pt-8">
            <div className="flex flex-col items-start">
              <p className="text-4xl tracking-wide text-[color:var(--color-primary)] sm:text-5xl">48h</p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-primary)]/52">
                Lasting Impression
              </p>
            </div>
            <div className="flex flex-col items-start">
              <p className="text-4xl tracking-wide text-[color:var(--color-primary)] sm:text-5xl">120+</p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-primary)]/52">
                Curated Notes
              </p>
            </div>
          </div>
        </div>

        <div className="order-1 relative flex items-center justify-center lg:order-2 lg:justify-end">
          <div className="absolute -top-5 right-2 h-24 w-24 rounded-full border border-[color:var(--color-accent)]/50 sm:h-28 sm:w-28" />
          <div className="absolute -bottom-6 left-2 h-20 w-20 rounded-full border border-[color:var(--color-primary)]/20 sm:h-24 sm:w-24" />

          <figure className="group relative z-10 w-full max-w-sm sm:max-w-md lg:max-w-lg">
            <img
              src={demoHeroBottleUrl}
              alt="Premium attar bottle"
              className="h-[500px] w-full rounded-[2.35rem] border border-[color:var(--color-primary)]/10 bg-[color:var(--color-bg)] object-cover object-center p-2 shadow-[0_30px_62px_rgba(23,33,25,0.2)] transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-[1.02] sm:h-[580px]"
            />
            <div className="pointer-events-none absolute inset-0 rounded-[2.35rem] bg-gradient-to-t from-[rgba(23,33,25,0.12)] via-transparent to-transparent" />

            <figcaption className="absolute -bottom-5 left-6 rounded-2xl border border-[color:var(--color-primary)]/10 bg-[color:var(--color-bg)] px-5 py-3 shadow-[0_12px_28px_rgba(23,33,25,0.14)]">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-accent)]">
                Signature Blend
              </p>
              <p className="mt-1 text-sm tracking-wide text-[color:var(--color-primary)]">
                Oud, Amber, Rose
              </p>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}