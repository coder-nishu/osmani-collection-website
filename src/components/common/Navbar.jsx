import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCart } from "../../utils/cartStorage";

const demoLogoUrl =
  "https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=420&q=80";

const menuItems = [
  { label: "Home", href: "/" },
  { label: "Attar", href: "/attar" },
  { label: "Perfume", href: "/perfume" },
  { label: "Collections", href: "/collections" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(() => getCart().length);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 14);

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
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

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b border-transparent transition-all duration-300 md:hidden ${
          isScrolled
            ? "bg-[color:var(--color-surface)]/95 shadow-[0_10px_30px_rgba(23,33,25,0.08)] backdrop-blur"
            : "bg-[color:var(--color-bg)]"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <nav className="flex h-16 items-center justify-center">
            <Link
              to="/"
              className="font-heading text-xl tracking-[0.18em] text-[color:var(--color-primary)]"
            >
              Osmani Collection
            </Link>
          </nav>
        </div>
      </header>

      <header
        className={`sticky top-0 z-50 hidden border-b border-transparent transition-all duration-300 md:block ${
          isScrolled
            ? "bg-[color:var(--color-surface)]/95 shadow-[0_10px_30px_rgba(23,33,25,0.08)] backdrop-blur"
            : "bg-[color:var(--color-bg)]"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <nav className="flex h-22 items-center justify-between lg:h-24">
            <Link to="/" className="flex items-center gap-3">
              <img
                src={demoLogoUrl}
                alt="Osmani Collection"
                className="h-10 w-10 rounded-full object-cover ring-1 ring-[color:var(--color-accent)]/70 transition-transform duration-300 hover:scale-105"
              />
              <span className="font-heading text-2xl tracking-wide text-[color:var(--color-primary)] lg:text-3xl">
                Osmani
              </span>
            </Link>

            <div className="hidden flex-1 items-center justify-center md:flex">
              <ul className="flex items-center gap-10">
                {menuItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      className="group relative text-sm uppercase tracking-[0.16em] text-[color:var(--color-primary)] transition-colors duration-300 hover:text-[color:var(--color-accent)]"
                    >
                      {item.label}
                      <span className="absolute -bottom-1 left-0 h-px w-0 bg-[color:var(--color-accent)] transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hidden items-center md:flex">
              <Link
                to="/cart"
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--color-primary)]/10 text-[color:var(--color-primary)] transition-colors duration-300 hover:text-[color:var(--color-accent)]"
                aria-label="View cart"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
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
                {cartCount > 0 ? (
                  <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[color:var(--color-accent)] px-1 text-[10px] font-semibold text-[color:var(--color-primary)]">
                    {cartCount}
                  </span>
                ) : null}
              </Link>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}