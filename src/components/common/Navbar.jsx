import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

          <ul className="hidden items-center gap-10 md:flex">
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
                <Link
                  to={item.href}
                  className="group relative inline-block py-1 text-sm uppercase tracking-[0.16em] text-[color:var(--color-primary)] transition-colors duration-300 hover:text-[color:var(--color-accent)]"
                >
                  {item.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[color:var(--color-accent)] transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

        </div>
      </div>
    </header>
  );
}