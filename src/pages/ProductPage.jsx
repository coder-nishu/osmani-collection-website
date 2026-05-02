import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import ProductGrid from "../components/product/ProductGrid";
import { getProductBySlug, getProductsByType } from "../services/productService";
import { formatPrice } from "../utils/helpers";
import { addToCart } from "../utils/cartStorage";

const WHATSAPP_NUMBER = "8801338338537";

export default function ProductPage() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const product = getProductBySlug(slug);

  const [selectedSizeBySlug, setSelectedSizeBySlug] = useState({});
  const [detailsSlug, setDetailsSlug] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const selectedSize =
    selectedSizeBySlug[product?.slug] ?? product?.pricing?.[0]?.size ?? "";

  const selectedPricing = useMemo(
    () =>
      product?.pricing?.find((entry) => entry.size === selectedSize) ??
      product?.pricing?.[0],
    [product, selectedSize]
  );

  useEffect(() => {
    if (!toastMessage) return;
    const timeout = setTimeout(() => setToastMessage(""), 2000);
    return () => clearTimeout(timeout);
  }, [toastMessage]);

  const handleAddToCart = () => {
    if (!product || !selectedPricing) return;

    addToCart({
      id: product.id,
      name: product.name,
      size: selectedPricing.size,
      price: selectedPricing.price,
      image: product.image,
    });

    setToastMessage("Added to cart");
  };

  const handleBuyNow = () => {
    if (!product || !selectedPricing) return;

    addToCart({
      id: product.id,
      name: product.name,
      size: selectedPricing.size,
      price: selectedPricing.price,
      image: product.image,
      quantity: 1,
    });

    navigate("/checkout");
  };

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return getProductsByType(product.type)
      .filter((item) => item.id !== product.id)
      .slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[color:var(--color-bg)]">
        <Navbar />
        <main className="text-center py-20">
          <h1 className="text-3xl">Product Not Found</h1>
          <Link to="/" className="btn-brand mt-6">
            Go Home
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[color:var(--color-bg)]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pt-6 pb-16 sm:px-6 lg:px-10">
        {/* GRID */}
        <section className="grid gap-6 lg:grid-cols-2 lg:gap-12">

          {/* IMAGE */}
          <div className="rounded-2xl overflow-hidden border border-(--color-primary)/10 bg-white ">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[260px] sm:h-[360px] lg:h-[500px] object-contain bg-white"
            />
          </div>

          {/* CONTENT */}
          <div className="space-y-4">

            {/* CATEGORY */}
            <p className="text-xs uppercase tracking-[0.2em] text-(--color-accent)">
              {product.category}
            </p>

            {/* TITLE */}
            <h1 className="font-heading text-2xl sm:text-4xl lg:text-5xl text-(--color-primary)">
              {product.name}
            </h1>

            {/* DESCRIPTION */}
            <p className="text-sm sm:text-base text-(--color-primary)/75 leading-snug">
              {product.description}
            </p>

            {/* SIZE */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-(--color-primary)/60">
                Select Size
              </p>

              <div className="mt-2 flex flex-wrap gap-2">
                {product.pricing.map((entry) => {
                  const active = entry.size === selectedPricing?.size;

                  return (
                    <button
                      key={entry.size}
                      onClick={() =>
                        setSelectedSizeBySlug((prev) => ({
                          ...prev,
                          [product.slug]: entry.size,
                        }))
                      }
                      className={`px-3 py-1.5 text-xs rounded-full border ${
                        active
                          ? "bg-(--color-accent)/20 border-(--color-accent)"
                          : "border-(--color-primary)/20"
                      }`}
                    >
                      {entry.size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* PRICE */}
            <p className="text-2xl font-semibold text-(--color-primary)">
              {formatPrice(selectedPricing?.price ?? 0)}
            </p>

            {/* BUTTONS */}
            <div className="flex flex-col gap-2 sm:flex-row">

              <button
                onClick={handleBuyNow}
                className="flex-1 rounded-full bg-(--color-accent) text-(--color-primary) py-3 text-sm uppercase tracking-[0.14em]"
              >
                Buy Now
              </button>

              <button
                onClick={handleAddToCart}
                className="flex-1 rounded-full border border-(--color-primary)/20 py-3 text-sm uppercase tracking-[0.14em]"
              >
                Add to Cart
              </button>
            </div>

            {/* WHATSAPP */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                `I want to order ${product.name}`
              )}`}
              className="block text-center border border-(--color-primary)/20 py-3 rounded-full text-sm uppercase"
            >
              Message on WhatsApp
            </a>

            {/* DETAILS TOGGLE */}
            <button
              onClick={() =>
                setDetailsSlug((prev) =>
                  prev === product.slug ? null : product.slug
                )
              }
              className="text-xs uppercase tracking-[0.2em] text-(--color-accent)"
            >
              See Details ↓
            </button>

            {/* DETAILS */}
            {detailsSlug === product.slug && (
              <div className="space-y-4 pt-4 border-t">

                <div>
                  <p className="text-xs uppercase text-(--color-primary)/60">
                    Notes
                  </p>
                  <div className="flex gap-2 flex-wrap mt-2">
                    {product.notes.map((n) => (
                      <span key={n} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                        {n}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs uppercase text-(--color-primary)/60">
                    Performance
                  </p>
                  <p className="text-sm">{product.longevity}</p>
                </div>

              </div>
            )}
          </div>
        </section>

        {/* RELATED */}
        <section className="mt-12">
          <h2 className="text-2xl mb-4">Related Products</h2>
          <ProductGrid products={relatedProducts} />
        </section>
      </main>

      <Footer />

      {/* TOAST */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded-full text-xs">
          {toastMessage}
        </div>
      )}
    </div>
  );
}