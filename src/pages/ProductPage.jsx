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
        <section className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="overflow-hidden rounded-3xl bg-[color:var(--color-bg)] shadow-[0_14px_40px_rgba(23,33,25,0.12)]">
            <img
              src={product.image}
              alt={product.name}
              className="h-[420px] w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-[560px]"
            />
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.26em] text-[color:var(--color-accent)]">{product.category}</p>
            <h1 className="font-heading mt-3 text-5xl text-[color:var(--color-primary)] sm:text-6xl">{product.name}</h1>
            <p className="mt-5 max-w-xl leading-relaxed text-[color:var(--color-primary)]/80">{product.description}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {product.notes.map((note) => (
                <span
                  key={note}
                  className="rounded-full border border-[color:var(--color-primary)]/15 px-3 py-1 text-xs uppercase tracking-[0.14em] text-[color:var(--color-primary)]/80"
                >
                  {note}
                </span>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 rounded-2xl bg-[color:var(--color-primary)]/5 p-4">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--color-primary)]/60">Projection</p>
                <p className="mt-1 text-[color:var(--color-primary)]">{product.projection}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--color-primary)]/60">Longevity</p>
                <p className="mt-1 text-[color:var(--color-primary)]">{product.longevity}</p>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--color-primary)]/60">Select Size</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.pricing.map((entry) => {
                  const isSelected = entry.size === selectedPricing?.size;
                  return (
                    <button
                      key={entry.size}
                      type="button"
                      onClick={() => setSelectedSize(entry.size)}
                      className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.16em] transition-colors duration-300 ${
                        isSelected
                          ? "border-[color:var(--color-accent)] bg-[color:var(--color-accent)] text-[color:var(--color-primary)]"
                          : "border-[color:var(--color-primary)]/20 text-[color:var(--color-primary)]/80 hover:border-[color:var(--color-accent)]"
                      }`}
                    >
                      {entry.size}
                    </button>
                  );
                })}
              </div>

              <p className="mt-5 text-3xl text-[color:var(--color-primary)]">{formatPrice(selectedPricing?.price ?? 0)}</p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/8801000000000?text=I%20want%20to%20order%20${encodeURIComponent(product.name)}`}
                className="inline-flex items-center justify-center rounded-full border border-[color:var(--color-accent)] bg-[color:var(--color-accent)] px-6 py-3 text-xs uppercase tracking-[0.18em] text-[color:var(--color-primary)] transition-all duration-300 hover:-translate-y-0.5"
              >
                Order via WhatsApp
              </a>
              <button type="button" className="btn-brand-outline">
                Add to Cart
              </button>
            </div>

            <div className="mt-10 border-t border-[color:var(--color-primary)]/10 pt-6">
              <h2 className="text-xl text-[color:var(--color-primary)]">Additional Information</h2>
              <p className="mt-3 leading-relaxed text-[color:var(--color-primary)]/75">
                For best performance, apply on pulse points and layer lightly. Store away from direct sunlight
                to preserve the fragrance profile.
              </p>
            </div>
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
