import { useNavigate } from "react-router-dom";
import { formatPrice, getStartingPrice } from "../../utils/helpers";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const primaryNote = product.notes?.[0] ?? product.category;

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
      className="group cursor-pointer overflow-hidden rounded-2xl bg-[color:var(--color-bg)] shadow-[0_10px_30px_rgba(23,33,25,0.06)] transition-all duration-300 hover:-translate-y-1"
    >
      <div className="overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="space-y-2 p-5">
        <span className="inline-flex rounded-full bg-[color:var(--color-primary)]/8 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-[color:var(--color-primary)]/70">
          {primaryNote}
        </span>
        <h3 className="text-lg tracking-wide text-[color:var(--color-primary)]">{product.name}</h3>
        <p className="text-sm text-[color:var(--color-primary)]/75">
          From <span className="text-[color:var(--color-accent)]">{formatPrice(getStartingPrice(product))}</span>
        </p>
      </div>
    </article>
  );
}
