import { formatPrice } from "../utils/helpers";

export default function OrderModal({ isOpen, stage, items, total }) {
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
              </div>
              <p className="text-xs text-[color:var(--color-primary)]/60">
                Redirecting to WhatsApp...
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
