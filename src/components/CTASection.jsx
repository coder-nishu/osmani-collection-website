export default function CTASection() {
  return (
    <section className="bg-(--color-primary) py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <p className="text-xs uppercase tracking-[0.26em] text-(--color-accent)">Discover More</p>
        <h2 className="font-heading mt-4 text-4xl text-(--color-bg) sm:text-5xl">
          Find Your Signature Scent
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-(--color-bg)/75">
          Explore curated attars and perfumes designed to elevate everyday moments.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a
            href="/attar"
            className="inline-flex items-center justify-center rounded-full border border-(--color-accent) bg-(--color-accent) px-7 py-3 text-xs uppercase tracking-[0.18em] text-(--color-primary) transition-all duration-300 hover:-translate-y-0.5 hover:brightness-95"
          >
            Shop Now
          </a>
          <a
            href="https://wa.me/8801338338537"
            className="inline-flex items-center justify-center rounded-full border border-(--color-accent) px-7 py-3 text-xs uppercase tracking-[0.18em] text-(--color-accent) transition-all duration-300 hover:bg-(--color-accent) hover:text-(--color-primary)"
          >
            WhatsApp Order
          </a>
        </div>
      </div>
    </section>
  );
}
