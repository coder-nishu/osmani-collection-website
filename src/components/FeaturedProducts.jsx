import { formatPrice, getStartingPrice } from "../utils/helpers";

export default function FeaturedProducts({
  title,
  subtitle,
  products,
  buttonLabel,
  buttonHref,
  showBestSellerTag = false,
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-10 lg:py-16">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.26em] text-[color:var(--color-accent)]">Curated Selection</p>
          <h2 className="font-heading mt-2 text-4xl text-[color:var(--color-primary)] sm:text-5xl">{title}</h2>
          {subtitle ? <p className="mt-3 text-sm text-[color:var(--color-primary)]/70">{subtitle}</p> : null}
        </div>
        <a href={buttonHref} className="btn-brand-outline">
          {buttonLabel}
        </a>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <article
            key={product.id}
            className="group overflow-hidden rounded-2xl border border-[color:var(--color-primary)]/10 bg-[color:var(--color-bg)]"
          >
            <div className="relative overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {showBestSellerTag ? (
                <span className="absolute left-3 top-3 rounded-full border border-[color:var(--color-accent)] bg-[color:var(--color-primary)] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-accent)]">
                  Best Seller
                </span>
              ) : null}
            </div>

            <div className="space-y-2 p-5">
              <h3 className="text-lg text-[color:var(--color-primary)]">{product.name}</h3>
              <p className="text-sm text-[color:var(--color-primary)]/70">
                From <span className="text-[color:var(--color-accent)]">{formatPrice(getStartingPrice(product))}</span>
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
