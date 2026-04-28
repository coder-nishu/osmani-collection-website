import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getCart } from "../../utils/cartStorage";

function HomeIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 11.5L12 5L20 11.5V19C20 19.6 19.6 20 19 20H5C4.4 20 4 19.6 4 19V11.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M9 20V14H15V20" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

function DropIcon({ className }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="24" y="6" width="16" height="10" rx="3" />
      <rect x="26" y="16" width="12" height="6" rx="2" />
      <rect x="18" y="22" width="28" height="34" rx="8" />
      <path d="M26 30v18" />
      <path d="M38 30v18" />
      <rect x="26" y="30" width="12" height="18" rx="4" />
      <circle cx="50" cy="14" r="1.5" />
      <circle cx="54" cy="18" r="1" />
      <path d="M14 48h3" />
      <path d="M12 52h5" />
    </svg>
  );
}

function CartIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M3 4H5.2L7.1 13.2C7.3 14.1 8.1 14.8 9 14.8H17.2C18.1 14.8 18.9 14.2 19.1 13.3L20.3 8.1C20.5 7.2 19.8 6.4 18.9 6.4H6.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9.5" cy="19" r="1.3" fill="currentColor" />
      <circle cx="17" cy="19" r="1.3" fill="currentColor" />
    </svg>
  );
}

function SparkIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 7h10v14H7z" />
      <path d="M9 3h6v4H9z" />
      <path d="M15 3h3" />
      <path d="M18 3v2" />
    </svg>
  );
}

function MenuIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 7H20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M4 12H20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M4 17H20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

const navItems = [
  { label: "Home", to: "/", icon: HomeIcon },
  { label: "Attar", to: "/attar", icon: DropIcon },
  { label: "Cart", to: "/cart", icon: CartIcon, isCenter: true },
  { label: "Perfume", to: "/perfume", icon: SparkIcon },
  { label: "Menu", to: "#menu", icon: MenuIcon, isMenu: true },
];

const menuLinks = [
  { label: "Home", to: "/" },
  { label: "Attar", to: "/attar" },
  { label: "Perfume", to: "/perfume" },
  { label: "Cart", to: "/cart" },
  { label: "Checkout", to: "/checkout" },
];

export default function BottomNav() {
  const location = useLocation();
  const [cartCount, setCartCount] = useState(() => getCart().length);
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleCartUpdate = () => setCartCount(getCart().length);

    window.addEventListener("cart:updated", handleCartUpdate);
    window.addEventListener("storage", handleCartUpdate);

    return () => {
      window.removeEventListener("cart:updated", handleCartUpdate);
      window.removeEventListener("storage", handleCartUpdate);
    };
  }, []);

  const cartBadge = useMemo(() => {
    if (!cartCount) {
      return null;
    }

    return (
      <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[color:var(--color-accent)] px-1 text-[10px] font-semibold text-[color:var(--color-primary)]">
        {cartCount}
      </span>
    );
  }, [cartCount]);

  return (
    <>
      <div
        className={`fixed inset-x-0 bottom-5 z-50 flex justify-center px-4 transition-all duration-500 md:hidden ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <nav className="h-[60px] w-full max-w-[420px] rounded-full border border-white/40 bg-white/80 px-4 shadow-[0_18px_40px_rgba(23,33,25,0.22)] backdrop-blur">
          <ul className="grid h-full grid-cols-5 items-center">
            {navItems.map((item) => {
              const isActive =
                item.to !== "#menu" &&
                (location.pathname === item.to ||
                  (item.to !== "/" && location.pathname.startsWith(item.to)));
              const Icon = item.icon;
              const baseClasses =
                "flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300";
              const activeClasses = isActive
                ? "text-[color:var(--color-accent)] scale-110"
                : "text-[color:var(--color-primary)]/60";
              const centerSize = item.isCenter ? "h-[52px] w-[52px]" : "";
              const centerActive =
                item.isCenter && isActive
                  ? "bg-[color:var(--color-primary)] text-[color:var(--color-accent)] shadow-[0_12px_20px_rgba(23,33,25,0.18)]"
                  : "";

              if (item.isMenu) {
                return (
                  <li key={item.label} className="flex justify-center">
                    <button
                      type="button"
                      onClick={() => setIsMenuOpen(true)}
                      className="flex flex-col items-center gap-1 text-[9px] uppercase tracking-[0.2em]"
                      aria-label="Open menu"
                    >
                      <span className={`${baseClasses} ${activeClasses}`}>
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="text-[color:var(--color-primary)]/55">Menu</span>
                    </button>
                  </li>
                );
              }

              return (
                <li key={item.label} className="flex justify-center">
                  <Link
                    to={item.to}
                    className="flex flex-col items-center gap-1 text-[9px] uppercase tracking-[0.2em]"
                    aria-label={item.label}
                  >
                    <span className={`${baseClasses} ${activeClasses} ${centerSize} ${centerActive}`}>
                      <span className="relative">
                        <Icon className={item.isCenter ? "h-6 w-6" : "h-5 w-5"} />
                        {item.isCenter ? cartBadge : null}
                      </span>
                    </span>
                    <span className={isActive ? "text-[color:var(--color-accent)]" : "text-[color:var(--color-primary)]/55"}>
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {isMenuOpen ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Close menu"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-[color:var(--color-bg)] px-6 pb-10 pt-6 shadow-[0_-18px_40px_rgba(23,33,25,0.2)]">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.26em] text-[color:var(--color-accent)]">Menu</p>
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-full p-2 text-[color:var(--color-primary)]/70"
                aria-label="Close menu"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                  <path d="M6 6L18 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <ul className="mt-5 space-y-3">
              {menuLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={() => setIsMenuOpen(false)}
                    className="block rounded-2xl border border-[color:var(--color-primary)]/10 bg-white/70 px-4 py-3 text-sm uppercase tracking-[0.18em] text-[color:var(--color-primary)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );
}
