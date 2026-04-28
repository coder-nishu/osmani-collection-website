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
      <div className="mb-8 flex items-start justify-between gap-4 sm:mb-10">
        <div>
          <p className="text-xs uppercase tracking-[0.26em] text-(--color-accent)">Curated Selection</p>
          <h2 className="font-heading mt-2 text-4xl text-(--color-primary) sm:text-5xl">{title}</h2>
          {subtitle ? <p className="mt-3 max-w-2xl text-sm text-(--color-primary)/72">{subtitle}</p> : null}
        </div>
        <Link to={buttonHref} className="btn-brand rounded-full px-5 py-2 text-[11px]">
          {buttonLabel}
        </Link>
      </div>

      <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-5 md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 lg:grid-cols-3 xl:grid-cols-4">
        {featuredProducts.map((product) => (
          <div key={product.id} className="w-[72%] shrink-0 snap-start md:w-auto md:shrink">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
