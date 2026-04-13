import { useEffect, useState } from "react";

const demoLogoUrl =
  "https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=420&q=80";

const menuItems = [
  { label: "Home", href: "/" },
  { label: "Attar", href: "/attar" },
  { label: "Perfume", href: "/perfume" },
  { label: "Collections", href: "/collections" },
];

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M16 16L21 21" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function CartIcon() {
  return (
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
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 14);

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-transparent transition-all duration-300 ${
        isScrolled
          ? "bg-[color:var(--color-surface)]/95 shadow-[0_10px_30px_rgba(23,33,25,0.08)] backdrop-blur"
          : "bg-[color:var(--color-bg)]"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <nav className="flex h-22 items-center justify-between lg:h-24">
          <a href="/" className="flex items-center gap-3">
            <img
              src={demoLogoUrl}
              alt="Osmani Collection"
              className="h-10 w-10 rounded-full object-cover ring-1 ring-[color:var(--color-accent)]/70 transition-transform duration-300 hover:scale-105"
            />
            <span className="font-heading text-2xl tracking-wide text-[color:var(--color-primary)] lg:text-3xl">
              Osmani
            </span>
          </a>

          <ul className="hidden items-center gap-10 md:flex">
            {menuItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="group relative text-sm uppercase tracking-[0.16em] text-[color:var(--color-primary)] transition-colors duration-300 hover:text-[color:var(--color-accent)]"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-[color:var(--color-accent)] transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2.5 sm:flex">
            <button
              type="button"
              aria-label="Search"
              className="rounded-full p-2.5 text-[color:var(--color-primary)] transition-colors duration-300 hover:text-[color:var(--color-accent)]"
            >
              <SearchIcon />
            </button>
            <button
              className="btn-brand ml-2 px-5 py-2.5 text-[11px] shadow-[0_8px_20px_rgba(200,169,106,0.24)] transition-all duration-300 hover:scale-105 hover:shadow-[0_14px_24px_rgba(200,169,106,0.3)]"
              aria-label="Cart"
              className="rounded-full p-2.5 text-[color:var(--color-primary)] transition-colors duration-300 hover:text-[color:var(--color-accent)]"
            >
              <CartIcon />
            </button>
            <button type="button" className="btn-brand ml-2 px-5 py-2.5 text-[11px]">
              WhatsApp
            </button>
          </div>

          <button
            type="button"
            aria-label="Toggle navigation menu"
            className="rounded-md p-2 text-[color:var(--color-primary)] transition-colors duration-300 hover:text-[color:var(--color-accent)] md:hidden"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
              <path d="M4 7H20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              <path d="M4 12H20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              <path d="M4 17H20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </button>
        </nav>

        <div
          className={`overflow-hidden transition-all duration-300 md:hidden ${
            isMenuOpen ? "max-h-80 pb-4" : "max-h-0"
          }`}
        >
          <ul className="space-y-3 border-t border-[color:var(--color-primary)]/10 pt-4">
            {menuItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="group relative inline-block py-1 text-sm uppercase tracking-[0.16em] text-[color:var(--color-primary)] transition-colors duration-300 hover:text-[color:var(--color-accent)]"
                >
                  {item.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[color:var(--color-accent)] transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex items-center gap-2">
            <button
              type="button"
              aria-label="Search"
              className="rounded-full border border-[color:var(--color-primary)]/15 p-2.5 text-[color:var(--color-primary)] transition-colors duration-300 hover:text-[color:var(--color-accent)]"
            >
              <SearchIcon />
            </button>
            <button
              type="button"
              aria-label="Cart"
              className="rounded-full border border-[color:var(--color-primary)]/15 p-2.5 text-[color:var(--color-primary)] transition-colors duration-300 hover:text-[color:var(--color-accent)]"
            >
              <CartIcon />
            </button>
            <button
              type="button"
              className="btn-brand ml-auto px-5 py-2.5 text-[11px] shadow-[0_8px_20px_rgba(200,169,106,0.24)] transition-all duration-300 hover:scale-105 hover:shadow-[0_14px_24px_rgba(200,169,106,0.3)]"
            >
              WhatsApp
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}