import { Link } from "react-router-dom";
import { getProductsByType } from "../services/productService";
import ProductCard from "./product/ProductCard";

export default function FeaturedProducts({
  title,
  subtitle,
  type,
  buttonLabel,
  buttonHref,
  products,
}) {
  const featuredProducts = products ?? getProductsByType(type);

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-10 lg:py-16">
      <div className="mb-8 sm:mb-10">
        <div>
          <p className="text-xs uppercase tracking-[0.26em] text-(--color-accent)">Curated Selection</p>
          <h2 className="font-heading mt-2 text-4xl text-(--color-primary) sm:text-5xl">{title}</h2>
          {subtitle ? <p className="mt-3 max-w-2xl text-sm text-(--color-primary)/72">{subtitle}</p> : null}
        </div>
      </div>

      <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-6 [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden sm:gap-5 md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 lg:grid-cols-3 xl:grid-cols-4">
        {featuredProducts.map((product) => (
          <div key={product.id} className="w-[75%] min-w-[260px] shrink-0 snap-start md:w-auto md:min-w-0 md:shrink">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center md:justify-end relative z-[60]">
        <Link to={buttonHref} className="btn-brand flex items-center justify-center rounded-full px-6 py-3.5 text-[11px] w-full max-w-[240px] md:w-auto active:scale-95 transition-transform" style={{ WebkitTapHighlightColor: 'transparent' }}>
          {buttonLabel}
        </Link>
      </div>
    </section>
  );
}
