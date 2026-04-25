import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import ProductGrid from "../components/product/ProductGrid";
import { getProductById, getProductsByType } from "../services/productService";
import { formatPrice } from "../utils/helpers";

export default function ProductPage() {
  const { id } = useParams();
  const product = getProductById(id);
  const [selectedSize, setSelectedSize] = useState(product?.pricing?.[0]?.size ?? "");
  const [showDetails, setShowDetails] = useState(false);

  const selectedPricing = useMemo(
    () => product?.pricing?.find((entry) => entry.size === selectedSize) ?? product?.pricing?.[0],
    [product, selectedSize],
  );

  const relatedProducts = useMemo(() => {
    if (!product) {
      return [];
    }

    return getProductsByType(product.type)
      .filter((item) => item.id !== product.id)
      .slice(0, 4);
  }, [product]);

  const bestForSeasons = useMemo(() => {
    const seasonOrder = ["winter", "spring", "summer", "fall"];
    return seasonOrder.filter((season) => (product?.seasons ?? []).includes(season));
  }, [product]);

  const bestForTime = useMemo(() => {
    const times = [];

    if ((product?.seasons ?? []).includes("day")) {
      times.push("Day Wear");
    }

    if ((product?.seasons ?? []).includes("night")) {
      times.push("Night Wear");
    }

    return times;
  }, [product]);

  const shortDescription = useMemo(() => {
    const text = product?.description ?? "";
    if (text.length <= 145) {
      return text;
    }

    return `${text.slice(0, 145).trim()}...`;
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[color:var(--color-bg)]">
        <Navbar />
        <main className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
          <h1 className="font-heading text-5xl text-[color:var(--color-primary)]">Fragrance Not Found</h1>
          <p className="mt-4 text-[color:var(--color-primary)]/75">
            The product you are looking for is unavailable at this moment.
          </p>
          <Link to="/" className="btn-brand mt-8">
            Return Home
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[color:var(--color-bg)]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-10 lg:pt-14">
        {/* Decorative top element */}
        <div className="absolute right-0 top-20 -z-10 opacity-10">
          <svg viewBox="0 0 200 200" className="w-64 h-64 text-[color:var(--color-accent)]" fill="currentColor">
            <circle cx="100" cy="100" r="100" opacity="0.3" />
            <path d="M100 40 L140 100 L100 160 L60 100 Z" opacity="0.5" />
          </svg>
        </div>

        <section className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16 relative">
          {/* Image with decorative frame */}
          <div className="relative">
            <div className="absolute inset-0 rounded-3xl bg-[color:var(--color-accent)]/20 blur-2xl -z-10 transform scale-110" />
            <div className="overflow-hidden rounded-3xl bg-[color:var(--color-bg)] shadow-[0_14px_40px_rgba(23,33,25,0.12)] border border-[color:var(--color-primary)]/10">
            <img
              src={product.image}
              alt={product.name}
              className="h-[420px] w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-[560px]"
            />
            </div>
          </div>

          <div className="relative lg:pt-2">
            <p className="text-xs uppercase tracking-[0.26em] text-(--color-accent)">{product.category}</p>
            <h1 className="font-heading mt-4 text-5xl leading-[1.12] text-(--color-primary) sm:text-6xl">{product.name}</h1>
            <p className="mt-7 max-w-xl leading-relaxed text-(--color-primary)/74">{shortDescription}</p>

            <button
              type="button"
              onClick={() => setShowDetails((prev) => !prev)}
              className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-(--color-accent) transition-colors duration-300 hover:text-(--color-primary)"
              aria-expanded={showDetails}
              aria-controls="product-more-details"
            >
              See Details
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className={`h-4 w-4 transition-transform duration-300 ${showDetails ? "rotate-180" : ""}`}
                aria-hidden="true"
              >
                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="mt-14">
              <p className="text-[11px] uppercase tracking-[0.22em] text-(--color-primary)/62">Select Size</p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {product.pricing.map((entry) => {
                  const isSelected = entry.size === selectedPricing?.size;
                  return (
                    <button
                      key={entry.size}
                      type="button"
                      onClick={() => setSelectedSize(entry.size)}
                      className={`rounded-full border px-4 py-2.5 text-xs uppercase tracking-[0.16em] transition-all duration-300 ${
                        isSelected
                          ? "border-(--color-accent) bg-(--color-accent)/16 text-(--color-primary)"
                          : "border-(--color-primary)/24 text-(--color-primary)/84 hover:-translate-y-0.5 hover:border-(--color-accent)"
                      }`}
                    >
                      {entry.size}
                    </button>
                  );
                })}
              </div>

              <p className="mt-6 text-3xl text-(--color-primary)">{formatPrice(selectedPricing?.price ?? 0)}</p>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/8801338338537?text=I%20want%20to%20order%20${encodeURIComponent(product.name)}`}
                className="btn-brand px-6 py-3"
              >
                Order via WhatsApp
              </a>
              <button type="button" className="btn-brand">
                Add to Cart
              </button>
            </div>

            {showDetails ? (
              <div id="product-more-details" className="mt-14 space-y-12 border-t border-(--color-primary)/12 pt-8">
                <div>
                  <h3 className="text-[11px] uppercase tracking-[0.22em] text-(--color-primary)/62">Main Notes</h3>
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    {product.notes.map((note) => (
                      <span
                        key={note}
                        className="inline-flex rounded-full bg-(--color-primary)/6 px-3 py-1.5 text-[11px] uppercase tracking-[0.13em] text-(--color-primary)/78 transition-colors duration-300 hover:bg-(--color-accent)/14"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {(bestForSeasons.length > 0 || bestForTime.length > 0) && (
                  <div className="space-y-3">
                    <h3 className="text-[11px] uppercase tracking-[0.22em] text-(--color-primary)/62">Best For</h3>
                    {bestForSeasons.length > 0 ? (
                      <p className="text-sm tracking-wide text-(--color-primary)/80">
                        {bestForSeasons.map((season) => season.charAt(0).toUpperCase() + season.slice(1)).join(" • ")}
                      </p>
                    ) : null}
                    {bestForTime.length > 0 ? (
                      <p className="text-sm tracking-wide text-(--color-primary)/80">{bestForTime.join(" • ")}</p>
                    ) : null}
                  </div>
                )}

                <div className="space-y-4">
                  <h3 className="text-[11px] uppercase tracking-[0.22em] text-(--color-primary)/62">Performance</h3>
                  <div className="flex flex-wrap gap-2.5">
                    <span className="inline-flex rounded-full border border-(--color-primary)/16 px-3 py-1.5 text-xs tracking-wide text-(--color-primary)/82">
                      {product.projection} Projection
                    </span>
                    <span className="inline-flex rounded-full border border-(--color-primary)/16 px-3 py-1.5 text-xs tracking-wide text-(--color-primary)/82">
                      {product.longevity}
                    </span>
                  </div>
                </div>

                <div>
                  <h2 className="text-[11px] uppercase tracking-[0.22em] text-(--color-primary)/62">Additional Information</h2>
                  <p className="mt-3 max-w-xl leading-relaxed text-(--color-primary)/74">
                    For best performance, apply on pulse points and layer lightly. Store away from direct sunlight
                    to preserve the fragrance profile.
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </section>

        <section className="mt-16">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.26em] text-[color:var(--color-accent)]">You May Also Like</p>
              <h2 className="font-heading mt-2 text-4xl text-[color:var(--color-primary)] sm:text-5xl">
                Related Fragrances
              </h2>
            </div>
          </div>

          <ProductGrid products={relatedProducts} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
