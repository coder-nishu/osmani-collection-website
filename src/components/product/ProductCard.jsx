import { useNavigate } from "react-router-dom";
import { formatPrice, getStartingPrice } from "../../utils/helpers";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const notePreview = (product.notes ?? []).slice(0, 3).join(" • ") || product.category;
  const productPath = `/product/${product.slug ?? product.id}`;

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => navigate(productPath)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          navigate(productPath);
        }
      }}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-(--color-primary)/8 bg-(--color-bg) transition-all duration-300 md:hover:-translate-y-0.5 md:hover:scale-[1.01]"
    >
      <div className="flex h-52 items-center justify-center px-5 py-4 sm:h-60 sm:px-6 lg:h-64">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain transition-transform duration-300 md:group-hover:scale-[1.02]"
        />
      </div>

      <div className="space-y-1.5 px-5 pb-5 pt-1.5 sm:px-6">
        <h3 className="text-base font-medium tracking-wide text-(--color-primary)">{product.name}</h3>
        <p className="text-xs tracking-[0.08em] text-(--color-primary)/58">{notePreview}</p>
        <p className="text-sm text-(--color-primary)/78">
          From <span className="font-semibold text-(--color-accent)">{formatPrice(getStartingPrice(product))}</span>
        </p>
      </div>
    </article>
  );
}
