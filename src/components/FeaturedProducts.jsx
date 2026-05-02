import { useState } from "react";
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

  // 🔥 swipe hint state
  const [showHint, setShowHint] = useState(true);

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-10 lg:py-16">
      {/* HEADER */}
      <div className="mb-6 sm:mb-8">
        <p className="text-xs uppercase tracking-[0.26em] text-(--color-accent)">
          Curated Selection
        </p>

        <div className="mt-2 flex items-center justify-between">
          <h2 className="font-heading text-4xl text-(--color-primary) sm:text-5xl">
            {title}
          </h2>

          {/* ✨ PREMIUM SWIPE HINT */}
          {showHint && (
            <span className="hidden sm:flex items-center gap-1 text-[10px] tracking-[0.18em] text-(--color-primary)/50 uppercase">
              Swipe
              <span className="inline-block animate-pulse">→</span>
            </span>
          )}
        </div>

        {subtitle && (
          <p className="mt-3 max-w-2xl text-sm text-(--color-primary)/72">
            {subtitle}
          </p>
        )}
      </div>

      {/* ✨ MOBILE SWIPE HINT (VISIBLE ONLY ON SMALL SCREENS) */}
      {showHint && (
        <div className="mb-3 flex justify-end sm:hidden">
          <span className="flex items-center gap-1 text-[10px] tracking-[0.18em] text-(--color-primary)/50 uppercase">
            Swipe
            <span className="inline-block animate-pulse">→</span>
          </span>
        </div>
      )}

      {/* 🔥 SCROLL CONTAINER */}
      <div
        onScroll={() => setShowHint(false)}
        className="
    flex gap-4 overflow-x-auto px-4 pb-4
    snap-x snap-mandatory
    touch-auto
    scroll-smooth
    cursor-grab active:cursor-grabbing
    [scrollbar-width:none]
    [-ms-overflow-style:none]
    [&::-webkit-scrollbar]:hidden

    md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0
    lg:grid-cols-3 xl:grid-cols-4
  "
      >
        {featuredProducts.map((product) => (
          <div
            key={product.id}
            className="min-w-[220px] w-[75%] shrink-0 snap-start md:w-auto md:min-w-0"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* CTA BUTTON */}
      <div className="mt-10 flex justify-center md:justify-end relative z-[60]">
        <Link
          to={buttonHref}
          className="
            btn-brand 
            flex items-center justify-center 
            rounded-full 
            px-6 py-3.5 
            text-[11px] 
            w-full max-w-[240px] 
            md:w-auto 
            active:scale-95 
            transition-transform
          "
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          {buttonLabel}
        </Link>
      </div>
    </section>
  );
}
