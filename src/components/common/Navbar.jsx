import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCart } from "../../utils/cartStorage";

const demoLogoUrl = "/osmani_favicon.jpg";

const menuItems = [
  { label: "Home", href: "/" },
  { label: "Attar", href: "/attar" },
  { label: "Perfume", href: "/perfume" },
];

const socialLinks = [
  {
    label: "WhatsApp",
    href: "https://wa.me/8801338338537",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
        <path
          d="M12 3.5c-4.7 0-8.5 3.8-8.5 8.5 0 1.5.4 2.9 1.1 4.1L3.5 20.5l4.6-1.1c1.2.7 2.5 1.1 3.9 1.1h.1c4.7 0 8.5-3.8 8.5-8.5 0-2.3-.9-4.4-2.5-6-1.6-1.6-3.7-2.5-6-2.5Zm0 15h-.1c-1.2 0-2.4-.3-3.4-.9l-.3-.2-2.6.6.7-2.5-.2-.3c-.6-1-1-2.2-1-3.5 0-3.7 3-6.8 6.8-6.8 1.8 0 3.5.7 4.8 2 1.3 1.3 2 3 2 4.8 0 3.8-3.1 6.8-6.8 6.8Zm3.6-4.8c-.2-.1-1.2-.6-1.4-.7-.2-.1-.3-.1-.5.1-.1.2-.5.7-.7.9-.1.1-.2.2-.4.1-.2-.1-.9-.3-1.7-1.1-.6-.6-1-1.2-1.2-1.5-.1-.2 0-.3.1-.4l.3-.4c.1-.1.1-.2.2-.4.1-.1 0-.3 0-.4-.1-.1-.5-1.1-.7-1.6-.2-.4-.3-.4-.5-.4h-.4c-.1 0-.4.1-.6.3-.2.2-.7.7-.7 1.8 0 1.1.7 2.1.8 2.3.1.1 1.5 2.3 3.7 3.2.5.2.9.3 1.2.4.5.2 1 .1 1.4.1.4-.1 1.2-.5 1.4-1 .2-.5.2-.9.1-1 0-.1-.2-.1-.4-.2Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/Osmanicollection",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
        <path
          d="M13.5 8.5V7c0-.7.2-1.1 1.1-1.1h1.4V3.4c-.2 0-1-.1-2-.1-2 0-3.3 1.2-3.3 3.4v1.8H8.5v2.7h2.2V20h2.8v-8.8h2.3l.3-2.7h-2.6Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/osmani_collection_",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
        <path
          d="M16.2 4.5H7.8A3.3 3.3 0 0 0 4.5 7.8v8.4a3.3 3.3 0 0 0 3.3 3.3h8.4a3.3 3.3 0 0 0 3.3-3.3V7.8a3.3 3.3 0 0 0-3.3-3.3Zm2 11.7a2 2 0 0 1-2 2H7.8a2 2 0 0 1-2-2V7.8a2 2 0 0 1 2-2h8.4a2 2 0 0 1 2 2v8.4ZM12 8.1a3.9 3.9 0 1 0 0 7.8 3.9 3.9 0 0 0 0-7.8Zm0 6.5a2.6 2.6 0 1 1 0-5.2 2.6 2.6 0 0 1 0 5.2Zm4.1-6.9a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
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
          <nav className="flex h-12 items-center justify-center">
            <Link to="/" className="flex items-center gap-2">
              <img
                src={demoLogoUrl}
                alt="Osmani Collection"
                className="h-6 w-6 rounded-full object-cover ring-1 ring-[color:var(--color-accent)]/70"
              />
              <span className="font-heading text-base tracking-[0.14em] text-[color:var(--color-primary)]">
                Osmani Collection
              </span>
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
          <nav className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <img
                src={demoLogoUrl}
                alt="Osmani Collection"
                className="h-8 w-8 rounded-full object-cover ring-1 ring-[color:var(--color-accent)]/70"
              />
              <span className="font-heading text-xl tracking-[0.12em] text-[color:var(--color-primary)]">
                Osmani Collection
              </span>
            </Link>

            <div className="hidden flex-1 items-center justify-center md:flex">
              <ul className="flex items-center gap-6">
                {menuItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      className="group relative text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-primary)] transition-colors duration-300 hover:text-[color:var(--color-accent)]"
                    >
                      {item.label}
                      <span className="absolute -bottom-1 left-0 h-px w-0 bg-[color:var(--color-accent)] transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <div className="flex items-center gap-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={link.label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--color-primary)]/10 text-[color:var(--color-primary)] transition-colors duration-300 hover:text-[color:var(--color-accent)]"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
              <Link
                to="/cart"
                className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--color-primary)]/10 text-[color:var(--color-primary)] transition-colors duration-300 hover:text-[color:var(--color-accent)]"
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