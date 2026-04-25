import { useNavigate } from "react-router-dom";
import { formatPrice, getStartingPrice } from "../../utils/helpers";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const notePreview = (product.notes ?? []).slice(0, 3).join(" • ") || product.category;

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/product/${product.id}`)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          navigate(`/product/${product.id}`);
        }
      }}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-(--color-primary)/8 bg-(--color-bg) transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.01]"
    >
      <div className="flex h-72 items-center justify-center px-6 py-5 sm:h-80 sm:px-7">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>

      <div className="space-y-2 px-5 pb-6 pt-1 sm:px-6">
        <h3 className="text-lg font-medium tracking-wide text-(--color-primary)">{product.name}</h3>
        <p className="text-xs tracking-[0.08em] text-(--color-primary)/58">{notePreview}</p>
        <p className="text-sm text-(--color-primary)/78">
          From <span className="font-semibold text-(--color-accent)">{formatPrice(getStartingPrice(product))}</span>
        </p>
      </div>
    </article>
  );
}
