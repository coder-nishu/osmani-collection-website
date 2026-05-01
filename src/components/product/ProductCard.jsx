import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../utils/helpers";
import { addToCart } from "../../utils/cartStorage";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const productPath = `/product/${product.slug ?? product.id}`;
  const pricing = product.pricing ?? [];

  const defaultSize =
    pricing.find((entry) => entry.size === "3ml")?.size ||
    pricing[0]?.size ||
    "";

  const [selectedSize, setSelectedSize] = useState(defaultSize);

  const selectedPricing = useMemo(
    () =>
      pricing.find((entry) => entry.size === selectedSize) || pricing[0],
    [pricing, selectedSize]
  );

  const notePreview =
    (product.notes ?? []).slice(0, 3).join(" • ") || product.category;

  // 🔥 BUY NOW (adds to cart → go checkout)
  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!selectedPricing) return;

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

  
  // 👉 Card click → product page
  const handleCardClick = (e) => {
    if (e.defaultPrevented) return;

    if (e.target.closest("button")) return;

    navigate(productPath);
  };

  return (
    <article
      onClick={handleCardClick}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-(--color-primary)/10 bg-(--color-bg) transition-all duration-300 md:hover:-translate-y-0.5 md:hover:scale-[1.01]"
    >
      {/* IMAGE */}
      <div className="relative flex h-40 items-center justify-center overflow-hidden bg-white p-4 sm:h-44">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain transition-transform duration-300 md:group-hover:scale-[1.03]"
        />
      </div>

      {/* CONTENT */}
      <div className="space-y-2 px-4 pb-4 pt-2">
        {/* NAME */}
        <h3 className="truncate text-sm font-medium text-(--color-primary)">
          {product.name}
        </h3>

        {/* NOTES */}
        <p className="text-[11px] text-(--color-primary)/60">
          {notePreview}
        </p>

        {/* SIZE SELECT */}
        <div className="flex flex-wrap gap-2">
          {pricing.map((entry) => {
            const active = entry.size === selectedSize;

            return (
              <button
                key={entry.size}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSize(entry.size);
                }}
                className={`rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] transition ${
                  active
                    ? "border-(--color-accent) bg-(--color-accent)/20 text-(--color-primary)"
                    : "border-(--color-primary)/20 text-(--color-primary)/70"
                }`}
              >
                {entry.size}
              </button>
            );
          })}
        </div>

        {/* PRICE + CTA */}
        <div className="mt-2 flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-(--color-primary)">
            {formatPrice(selectedPricing?.price || 0)}
          </p>

          <button
            onClick={handleBuyNow}
            className="
              rounded-full 
              bg-(--color-primary) 
              px-3 py-2 
              text-[11px] font-medium 
              tracking-[0.14em] 
              text-(--color-accent) 
              shadow-sm 
              transition-all duration-150 
              active:scale-95 
              md:hover:-translate-y-0.5 md:hover:shadow-md
            "
          >
            Buy Now
          </button>
        </div>
      </div>
    </article>
  );
}