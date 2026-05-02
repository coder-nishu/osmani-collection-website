import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const carouselRef = useRef(null);

  const defaultSize = useMemo(() => {
    if (!product?.variants?.length) {
      return "";
    }

    return (
      product.variants.find((entry) => entry.size === "3ml")?.size ||
      product.variants[0]?.size ||
      ""
    );
  }, [product]);

  const selectedSize = selectedSizeBySlug[product?.slug] ?? defaultSize;

  const selectedVariant = useMemo(
    () =>
      product?.variants?.find((entry) => entry.size === selectedSize) ??
      product?.variants?.[0],
    [product, selectedSize]
  );

  const carouselImages = useMemo(() => {
    if (!product) {
      return [];
    }

    const variantImages = (product.variants ?? [])
      .map((entry) => entry.image)
      .filter(Boolean);

    if (variantImages.length) {
      return variantImages;
    }

    return product.image ? [product.image] : [];
  }, [product]);

  const scrollToIndex = useCallback((index) => {
    if (!carouselRef.current || carouselImages.length === 0) {
      return;
    }

    const safeIndex = Math.max(0, Math.min(index, carouselImages.length - 1));
    carouselRef.current.scrollTo({
      left: carouselRef.current.clientWidth * safeIndex,
      behavior: "smooth",
    });
    setActiveImageIndex(safeIndex);
  }, [carouselImages.length]);

  useEffect(() => {
    if (!carouselRef.current) {
      return undefined;
    }

    const handleScroll = () => {
      const container = carouselRef.current;
      if (!container) {
        return;
      }
      const nextIndex = Math.round(container.scrollLeft / container.clientWidth);
      setActiveImageIndex(Math.max(0, Math.min(nextIndex, carouselImages.length - 1)));
    };

    const container = carouselRef.current;
    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [carouselImages.length]);

  useEffect(() => {
    if (!product?.variants?.length) {
      return;
    }

    const nextIndex = product.variants.findIndex((entry) => entry.size === selectedSize);
    if (nextIndex >= 0) {
      scrollToIndex(nextIndex);
    }
  }, [product, selectedSize, scrollToIndex]);

  useEffect(() => {
    if (!toastMessage) return;
    const timeout = setTimeout(() => setToastMessage(""), 2000);
    return () => clearTimeout(timeout);
  }, [toastMessage]);

  useEffect(() => {
    setQuantity(1);
  }, [product?.id]);

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;

    addToCart({
      id: product.id,
      name: product.name,
      size: selectedVariant.size,
      price: selectedVariant.price,
      image: selectedVariant.image || product.image,
      quantity,
    });

    setToastMessage("Added to cart");
  };

  const handleBuyNow = () => {
    if (!product || !selectedVariant) return;

    addToCart({
      id: product.id,
      name: product.name,
      size: selectedVariant.size,
      price: selectedVariant.price,
      image: selectedVariant.image || product.image,
      quantity,
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
          <div className="space-y-3">
            <div className="rounded-2xl overflow-hidden border border-(--color-primary)/10 bg-white">
              <div
                ref={carouselRef}
                className="
                  flex overflow-x-auto snap-x snap-mandatory scroll-smooth
                  [scrollbar-width:none]
                  [-ms-overflow-style:none]
                  [&::-webkit-scrollbar]:hidden
                "
              >
                {carouselImages.map((image, index) => (
                  <div key={`${product.id}-image-${index}`} className="min-w-full snap-start">
                    <div className="flex h-[260px] w-full items-center justify-center bg-white sm:h-[360px] lg:h-[500px]">
                      <img
                        src={image}
                        alt={product.name}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {carouselImages.length > 1 ? (
              <div className="flex items-center justify-center gap-2">
                {carouselImages.map((_, index) => (
                  <button
                    key={`${product.id}-dot-${index}`}
                    type="button"
                    onClick={() => scrollToIndex(index)}
                    aria-label={`Show image ${index + 1}`}
                    className={`h-2.5 w-2.5 rounded-full transition-all duration-200 ${
                      index === activeImageIndex
                        ? "bg-(--color-primary)"
                        : "bg-(--color-primary)/25"
                    }`}
                  />
                ))}
              </div>
            ) : null}
          </div>

          {/* CONTENT */}
          <div className="space-y-3">

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
                {product.variants.map((entry) => {
                  const active = entry.size === selectedVariant?.size;

                  return (
                    <button
                      key={entry.size}
                      onClick={() =>
                        setSelectedSizeBySlug((prev) => ({
                          ...prev,
                          [product.slug]: entry.size,
                        }))
                      }
                      className={`px-3 py-1.5 text-xs rounded-full border transition ${
                        active
                          ? "bg-(--color-primary) border-(--color-primary) text-(--color-accent)"
                          : "border-(--color-primary)/30 bg-white/90 text-(--color-primary)"
                      }`}
                    >
                      {entry.size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* PRICE + QUANTITY */}
            <div className="flex flex-wrap items-center gap-4">
              <p className="text-2xl font-semibold text-(--color-primary)">
                {formatPrice(selectedVariant?.price ?? 0)}
              </p>

              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase tracking-[0.18em] text-(--color-primary)/60">
                  Qty
                </span>
                <div className="flex items-center gap-2 rounded-full border border-(--color-primary)/15 bg-white px-2 py-1">
                  <button
                    type="button"
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    disabled={quantity <= 1}
                    className="h-6 w-6 rounded-full text-sm text-(--color-primary) transition disabled:opacity-40"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="min-w-[1.25rem] text-center text-sm text-(--color-primary)">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="h-6 w-6 rounded-full text-sm text-(--color-primary) transition"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

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
                className="flex-1 rounded-full border border-(--color-primary)/20 py-3 text-sm uppercase tracking-[0.14em] text-(--color-primary)"
              >
                Add to Cart
              </button>
            </div>

            {/* WHATSAPP */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                `I want to order ${product.name}`
              )}`}
              className="block text-center border border-(--color-primary)/20 py-3 rounded-full text-sm uppercase text-(--color-primary)"
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