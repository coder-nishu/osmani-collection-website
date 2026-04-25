import { Link } from "react-router-dom";
import { getProductsByType } from "../services/productService";
import ProductCard from "./product/ProductCard";

export default function FeaturedProducts({
  title,
  subtitle,
  type,
  buttonLabel,
  buttonHref,
}) {
  const featuredProducts = getProductsByType(type).slice(0, 6);

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-10 lg:py-16">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4 sm:mb-12">
        <div>
          <p className="text-xs uppercase tracking-[0.26em] text-(--color-accent)">Curated Selection</p>
          <h2 className="font-heading mt-2 text-4xl text-(--color-primary) sm:text-5xl">{title}</h2>
          {subtitle ? <p className="mt-3 max-w-2xl text-sm text-(--color-primary)/72">{subtitle}</p> : null}
        </div>
        <Link to={buttonHref} className="btn-brand-outline">
          {buttonLabel}
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
