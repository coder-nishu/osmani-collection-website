import { formatPrice } from "../../utils/helpers";

export default function CartItem({ item, index, onRemove, onQuantityChange, showRemove = true }) {
  const quantity = Math.max(1, Number(item.quantity || 1));
  const lineTotal = Number(item.price || 0) * quantity;

  const handleDecrease = () => {
    if (quantity <= 1) return;
    onQuantityChange?.(index, quantity - 1);
  };

  const handleIncrease = () => {
    onQuantityChange?.(index, quantity + 1);
  };

  return (
    <div className="rounded-2xl border border-[color:var(--color-primary)]/10 bg-[color:var(--color-bg)] p-3 shadow-[0_12px_28px_rgba(23,33,25,0.08)] sm:p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-[color:var(--color-primary)]">
            {item.name}
            <span className="ml-2 text-[11px] uppercase tracking-[0.2em] text-[color:var(--color-primary)]/60">
              ({String(item.size ?? "").toUpperCase()})
            </span>
          </h3>
          <p className="mt-1 text-sm font-semibold text-[color:var(--color-primary)]">
            {formatPrice(lineTotal)}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-primary)]/60">
              Qty
            </span>
            <div className="flex items-center gap-2 rounded-full border border-[color:var(--color-primary)]/15 bg-white px-2 py-1">
              <button
                type="button"
                onClick={handleDecrease}
                disabled={quantity <= 1}
                className="h-6 w-6 rounded-full text-sm text-[color:var(--color-primary)] transition disabled:opacity-40"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="min-w-[1.5rem] text-center text-sm text-[color:var(--color-primary)]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={handleIncrease}
                className="h-6 w-6 rounded-full text-sm text-[color:var(--color-primary)] transition"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {showRemove ? (
            <button
              type="button"
              onClick={() => onRemove?.(index)}
              className="rounded-full border border-[color:var(--color-primary)]/20 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-primary)] transition-all duration-300 hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]"
            >
              Remove
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
