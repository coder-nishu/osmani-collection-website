import { Link } from "react-router-dom";

const brandLogoUrl =
  "https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=400&q=80";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Attar", href: "/attar" },
  { label: "Perfume", href: "/perfume" },
  { label: "Collections", href: "/collections" },
];

const supportLinks = [
  { label: "Contact Us", href: "/contact" },
  { label: "About Us", href: "/about" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M13.5 21V12.8H16.2L16.6 9.6H13.5V7.6C13.5 6.7 13.8 6.1 15.1 6.1H16.7V3.2C16.4 3.2 15.5 3.1 14.4 3.1C12 3.1 10.5 4.5 10.5 7.2V9.6H8V12.8H10.5V21H13.5Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  );
}

function FooterLinkGroup({ title, links }) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--color-accent)]">{title}</h3>
      <ul className="mt-4 space-y-2.5 text-sm text-[color:var(--color-bg)]/78">
        {links.map((link) => (
          <li key={link.label}>
            <Link to={link.href} className="transition-colors duration-300 hover:text-[color:var(--color-accent)]">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="font-body bg-[color:var(--color-primary)] text-[color:var(--color-bg)]">
      <div className="mx-auto max-w-7xl px-4 pb-6 pt-14 sm:px-6 lg:px-10 lg:pt-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <img src={brandLogoUrl} alt="Osmani Collection logo" className="h-11 w-11 rounded-full object-cover" />
              <p className="font-heading text-3xl tracking-wide">Osmani Collection</p>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[color:var(--color-bg)]/75">
              Premium attars and perfumes crafted for elegance and lasting impression.
            </p>
            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-[color:var(--color-accent)]">
              Crafted to be remembered
            </p>
          </div>

          <FooterLinkGroup title="Quick Links" links={quickLinks} />
          <FooterLinkGroup title="Customer Support" links={supportLinks} />

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--color-accent)]">
              Contact & Social
            </h3>
            <div className="mt-4 space-y-2.5 text-sm text-[color:var(--color-bg)]/78">
              <a href="https://wa.me/8801338338537" className="block transition-colors duration-300 hover:text-[color:var(--color-accent)]">
                WhatsApp: +8801338338537
              </a>
              <a href="mailto:hello@osmanicollection.com" className="block transition-colors duration-300 hover:text-[color:var(--color-accent)]">
                hello@osmanicollection.com
              </a>
              <p>Dhaka, Bangladesh</p>
            </div>

            <div className="mt-5 flex items-center gap-3 text-[color:var(--color-bg)]/82">
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                className="rounded-full border border-[color:var(--color-bg)]/20 p-2 transition-colors duration-300 hover:text-[color:var(--color-accent)]"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                className="rounded-full border border-[color:var(--color-bg)]/20 p-2 transition-colors duration-300 hover:text-[color:var(--color-accent)]"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-[color:var(--color-bg)]/12 pt-5 text-center text-xs tracking-wide text-[color:var(--color-bg)]/65">
          <p>© 2026 Osmani Collection. All rights reserved.</p>
          <p className="mt-1">Designed with elegance</p>
        </div>
      </div>
    </footer>
  );
}
