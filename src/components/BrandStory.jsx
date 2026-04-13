const storyImageUrl =
  "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=1100&q=80";

export default function BrandStory() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-xs uppercase tracking-[0.26em] text-[color:var(--color-accent)]">Our Story</p>
          <h2 className="font-heading mt-3 text-4xl text-[color:var(--color-primary)] sm:text-5xl">
            Heritage In Every Drop
          </h2>

          <p className="mt-6 max-w-xl leading-relaxed text-[color:var(--color-primary)]/80">
            Osmani Collection was created to celebrate timeless Arabian perfumery with a modern signature.
            Each blend is curated with
            <span className="text-[color:var(--color-accent)]"> refined oils</span>, balanced depth, and a
            character that leaves
            <span className="text-[color:var(--color-accent)]"> lasting presence</span>.
          </p>
        </div>

        <div className="relative">
          <img
            src={storyImageUrl}
            alt="Perfume bottles and aromatic ingredients"
            className="h-[460px] w-full rounded-3xl border border-[color:var(--color-primary)]/10 object-cover"
          />
        </div>
      </div>
    </section>
  );
}
