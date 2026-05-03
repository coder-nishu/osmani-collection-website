import { formatPrice } from "../utils/helpers";

export default function OrderModal({ isOpen, stage, items, total, onClose }) {
  if (!isOpen) {
    return null;
  }

  const visibleItems = items.slice(0, 4);
  const extraCount = items.length - visibleItems.length;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
      <div
        className="relative w-full max-w-md rounded-t-3xl bg-white px-6 pb-7 pt-6 shadow-2xl sm:rounded-3xl"
        role="dialog"
        aria-modal="true"
        aria-live="polite"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close order status"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-(--color-primary)/15 bg-white/90 text-(--color-primary) transition hover:border-(--color-accent) hover:text-(--color-accent)"
        >
          x
        </button>
        <div key={stage} className="space-y-5 transition-all duration-300">
          {stage === "processing" ? (
            <>
              <div className="space-y-2">
                <h2 className="text-lg font-semibold text-[color:var(--color-primary)]">
                  Processing Order...
                </h2>
                <div className="space-y-1 text-sm text-[color:var(--color-primary)]/80">
                  {visibleItems.map((item) => (
                    <p key={`${item.id}-${item.size}`}>
                      {item.name} ({item.size}) x{Number(item.quantity || 1)}
                    </p>
                  ))}
                  {extraCount > 0 ? (
                    <p className="text-[color:var(--color-primary)]/60">
                      +{extraCount} more item{extraCount === 1 ? "" : "s"}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="text-base font-semibold text-[color:var(--color-primary)]">
                Total: {formatPrice(total)}
              </div>

              <div className="space-y-2">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-[color:var(--color-primary)]/10">
                  <div className="h-full w-0 rounded-full bg-[color:var(--color-accent)] order-progress" />
                </div>
                <p className="text-xs text-[color:var(--color-primary)]/60">Please wait...</p>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <h2 className="text-lg font-semibold text-[color:var(--color-primary)]">
                  Order Confirmed ✓
                </h2>
                <p className="text-base font-semibold text-[color:var(--color-primary)]">
                  Total: {formatPrice(total)}
                </p>
                <p className="text-sm text-[color:var(--color-primary)]/70">
                  We will call you to confirm
                </p>
                <p className="text-xs text-[color:var(--color-primary)]/60">
                  Delivery fee depends on location: Inside Dhaka 70 tk, outside Dhaka 120 tk.
                </p>
              </div>
              <p className="text-xs text-[color:var(--color-primary)]/60">
                Tap the close button to continue.
              </p>
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes order-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .order-progress {
          animation: order-progress 1.5s linear forwards;
        }
      `}</style>
    </div>
  );
}
