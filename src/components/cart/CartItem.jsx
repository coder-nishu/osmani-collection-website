import { formatPrice } from "../../utils/helpers";

export default function CartItem({ item, index, onRemove, showRemove = true }) {
  const quantity = Number(item.quantity || 1);
  const lineTotal = Number(item.price || 0) * quantity;

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-[color:var(--color-primary)]/10 bg-[color:var(--color-bg)] p-4 shadow-[0_16px_35px_rgba(23,33,25,0.08)] sm:flex-row sm:items-center sm:p-5">
      <div className="flex h-24 w-full items-center justify-center rounded-xl bg-[color:var(--color-surface)]/70 p-3 sm:h-28 sm:w-28">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-contain"
        />
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-medium tracking-wide text-[color:var(--color-primary)]">{item.name}</h3>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[color:var(--color-primary)]/60">
          {item.size}
          {quantity > 1 ? ` • x${quantity}` : ""}
        </p>
      </div>

      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
        <div className="text-right">
          <p className="text-base font-semibold text-[color:var(--color-primary)]">{formatPrice(lineTotal)}</p>
          {quantity > 1 ? (
            <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-primary)]/55">
              {formatPrice(item.price)} each
            </p>
          ) : null}
        </div>
        {showRemove ? (
          <button
            type="button"
            onClick={() => onRemove?.(index)}
            className="rounded-full border border-[color:var(--color-primary)]/20 px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-primary)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]"
          >
            Remove
          </button>
        ) : null}
      </div>
    </div>
  );
}
