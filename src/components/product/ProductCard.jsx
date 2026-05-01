import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../utils/helpers";
import { addToCart } from "../../utils/cartStorage";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const notePreview = (product.notes ?? []).slice(0, 3).join(" • ") || product.category;
  const productPath = `/product/${product.slug ?? product.id}`;
  const pricing = product.pricing ?? [];
  const defaultSize = pricing.find((entry) => entry.size === "3ml")?.size ?? pricing[0]?.size ?? "";
  const [selectedSize, setSelectedSize] = useState(defaultSize);

  const selectedPricing = useMemo(
    () => pricing.find((entry) => entry.size === selectedSize) ?? pricing[0],
    [pricing, selectedSize],
  );

  const handleBuyNow = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!selectedPricing) {
      return;
    }

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

  const handleCardClick = (event) => {
    if (event.defaultPrevented) {
      return;
    }

    if (event.target.closest?.("button, a, input, select, textarea")) {
      return;
    }

    navigate(productPath);
  };

  const handleCardKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      navigate(productPath);
    }
  };

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-(--color-primary)/8 bg-(--color-bg) transition-all duration-300 md:hover:-translate-y-0.5 md:hover:scale-[1.01]"
    >
      <div className="relative h-44 overflow-hidden bg-white sm:h-48">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain transition-transform duration-300 md:group-hover:scale-[1.02]"
        />
      </div>

      <div className="space-y-2 px-4 pb-4 pt-1 sm:px-5 sm:pb-5">
        <h3 className="truncate text-sm font-medium tracking-wide text-(--color-primary)">{product.name}</h3>
        <p className="text-[11px] tracking-[0.08em] text-(--color-primary)/58">{notePreview}</p>

        <div className="flex flex-wrap gap-2">
          {pricing.map((entry) => {
            const isSelected = entry.size === selectedSize;
            return (
              <button
                key={entry.size}
                type="button"
                onPointerDown={(event) => event.stopPropagation()}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  setSelectedSize(entry.size);
                }}
                className={`rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] transition-all duration-200 ${
                  isSelected
                    ? "border-(--color-accent) bg-(--color-accent)/18 text-(--color-primary)"
                    : "border-(--color-primary)/20 text-(--color-primary)/70"
                }`}
              >
                {entry.size}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-(--color-primary)">
            {formatPrice(selectedPricing?.price ?? 0)}
          </p>
          <button
            type="button"
            onPointerDownCapture={(event) => event.stopPropagation()}
            onClickCapture={(event) => event.stopPropagation()}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={handleBuyNow}
            className="rounded-full bg-(--color-primary) px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-(--color-accent) shadow-[0_10px_18px_rgba(23,33,25,0.14)] transition-transform duration-200 md:hover:-translate-y-0.5"
          >
            Buy Now
          </button>
        </div>
      </div>
    </article>
  );
}
