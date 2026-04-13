export default function CTASection() {
  return (
    <section className="bg-[color:var(--color-primary)] py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <p className="text-xs uppercase tracking-[0.26em] text-[color:var(--color-accent)]">Discover More</p>
        <h2 className="font-heading mt-4 text-4xl text-[color:var(--color-bg)] sm:text-5xl">
          Find Your Signature Scent
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[color:var(--color-bg)]/75">
          Explore curated attars and perfumes designed to elevate everyday moments.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a href="/attar" className="btn-brand">
            Shop Now
          </a>
          <a href="https://wa.me/8801000000000" className="btn-brand-outline border-[color:var(--color-accent)] text-[color:var(--color-accent)]">
            WhatsApp Order
          </a>
        </div>
      </div>
    </section>
  );
}
