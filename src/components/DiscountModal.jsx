import { useCallback, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "discount_modal_seen_count";
const OPEN_DELAY_MS = 1500;
const ANIMATION_MS = 200;

export default function DiscountModal() {
  const [shouldRender, setShouldRender] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const lastActiveRef = useRef(null);
  const closeButtonRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const seenCount = Number(window.localStorage.getItem(STORAGE_KEY) || 0);

    if (seenCount >= 3) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setShouldRender(true);
      setIsOpen(true);
    }, OPEN_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, []);

  const handleClose = useCallback(() => {
    if (isClosing) {
      return;
    }

    setIsClosing(true);

    window.setTimeout(() => {
      const seenCount = Number(window.localStorage.getItem(STORAGE_KEY) || 0);
      window.localStorage.setItem(STORAGE_KEY, String(seenCount + 1));
      setIsOpen(false);
      setShouldRender(false);
      setIsClosing(false);
      lastActiveRef.current?.focus?.();
    }, ANIMATION_MS);
  }, [isClosing]);

  useEffect(() => {
    if (!shouldRender) {
      return undefined;
    }

    lastActiveRef.current = document.activeElement;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 0);

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusable = modalRef.current?.querySelectorAll(
        "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])",
      );

      if (!focusable || focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      window.clearTimeout(focusTimer);
    };
  }, [handleClose, shouldRender]);

  if (!shouldRender) {
    return null;
  }

  const overlayClasses = `fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-200 ${
    isOpen && !isClosing ? "opacity-100" : "opacity-0"
  }`;

  const modalClasses = `relative w-[90%] max-h-[70vh] rounded-2xl bg-[color:var(--color-bg)] p-1.5 shadow-[0_22px_50px_rgba(0,0,0,0.25)] transition-all duration-200 sm:max-w-[460px] sm:p-2 ${
    isOpen && !isClosing ? "scale-100 opacity-100" : "scale-95 opacity-0"
  }`;

  return (
    <div className={overlayClasses} role="presentation">
      <div
        ref={modalRef}
        className={modalClasses}
        role="dialog"
        aria-modal="true"
        aria-label="Discount offer"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={handleClose}
          aria-label="Close discount modal"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-(--color-primary)/15 bg-white/80 text-(--color-primary) transition hover:border-(--color-accent) hover:text-(--color-accent)"
        >
          x
        </button>

        <img
          src="/discount_banner.png"
          alt="Limited-time discount"
          className="mx-auto max-h-[60vh] w-full object-contain"
        />
      </div>
    </div>
  );
}
