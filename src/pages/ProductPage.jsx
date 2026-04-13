import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import ProductGrid from "../components/product/ProductGrid";
import { getProductById, getProductsByType } from "../services/productService";
import { formatPrice } from "../utils/helpers";

// Season and day-part icons
const seasonIcons = {
  winter: "❄️",
  spring: "🌸",
  summer: "☀️",
  fall: "🍂",
  day: "☀️",
  night: "🌙",
};

// Note type icons and colors
const noteIcons = {
  "white musk": "🤍",
  "musk": "🤍",
  "powdery": "✨",
  "fresh": "🌊",
  "citrus": "🍋",
  "aquatic": "💧",
  "sweet": "🍯",
  "woody": "🌲",
  "oud": "🏺",
  "spicy": "🌶️",
  "amber": "🟡",
  "lavender": "💜",
  "floral": "🌺",
  "green": "🌿",
  "neroli": "🌸",
  "sandalwood": "🪵",
  "pepper": "⚫",
  "ambroxan": "✨",
  "bergamot": "🍊",
};

// Generate simulated vote counts for seasons
const generateSeasonVotes = () => {
  return {
    winter: 512,
    spring: 348,
    summer: 726,
    fall: 421,
    day: 645,
    night: 389,
  };
};

export default function ProductPage() {
  const { id } = useParams();
  const product = getProductById(id);
  const [selectedSize, setSelectedSize] = useState(product?.pricing?.[0]?.size ?? "");

  const selectedPricing = useMemo(
    () => product?.pricing?.find((entry) => entry.size === selectedSize) ?? product?.pricing?.[0],
    [product, selectedSize],
  );

  const relatedProducts = useMemo(() => {
    if (!product) {
      return [];
    }

    return getProductsByType(product.type)
      .filter((item) => item.id !== product.id)
      .slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[color:var(--color-bg)]">
        <Navbar />
        <main className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
          <h1 className="font-heading text-5xl text-[color:var(--color-primary)]">Fragrance Not Found</h1>
          <p className="mt-4 text-[color:var(--color-primary)]/75">
            The product you are looking for is unavailable at this moment.
          </p>
          <Link to="/" className="btn-brand mt-8">
            Return Home
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[color:var(--color-bg)]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-10 lg:pt-14">
        {/* Decorative top element */}
        <div className="absolute right-0 top-20 -z-10 opacity-10">
          <svg viewBox="0 0 200 200" className="w-64 h-64 text-[color:var(--color-accent)]" fill="currentColor">
            <circle cx="100" cy="100" r="100" opacity="0.3" />
            <path d="M100 40 L140 100 L100 160 L60 100 Z" opacity="0.5" />
          </svg>
        </div>

        <section className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16 relative">
          {/* Image with decorative frame */}
          <div className="relative">
            <div className="absolute inset-0 rounded-3xl bg-[color:var(--color-accent)]/20 blur-2xl -z-10 transform scale-110" />
            <div className="overflow-hidden rounded-3xl bg-[color:var(--color-bg)] shadow-[0_14px_40px_rgba(23,33,25,0.12)] border border-[color:var(--color-primary)]/10">
            <img
              src={product.image}
              alt={product.name}
              className="h-[420px] w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-[560px]"
            />
            </div>
          </div>

          <div className="relative">
            <p className="text-xs uppercase tracking-[0.26em] text-[color:var(--color-accent)]">{product.category}</p>
            <h1 className="font-heading mt-3 text-5xl text-[color:var(--color-primary)] sm:text-6xl">{product.name}</h1>
            <p className="mt-5 max-w-xl leading-relaxed text-[color:var(--color-primary)]/80">{product.description}</p>

            {/* Main Accords Section - Notes Only */}
            <div className="mt-10 relative">
              <div className="absolute -left-4 top-0 w-1 h-8 bg-[color:var(--color-accent)] rounded-r-full" />
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--color-primary)] pl-4">
                Main Notes
              </h3>
              <div className="mt-6 flex flex-wrap gap-3">
                {product.notes.map((note) => {
                  const icon = noteIcons[note.toLowerCase()] || "✨";
                  return (
                    <span
                      key={note}
                      className="inline-flex items-center gap-2 rounded-full bg-[color:var(--color-primary)]/8 px-3 py-2 text-xs uppercase tracking-[0.13em] text-[color:var(--color-primary)]/80 border border-[color:var(--color-primary)]/15 hover:border-[color:var(--color-accent)] hover:bg-[color:var(--color-accent)]/10 transition-all duration-300"
                    >
                      <span className="text-sm">{icon}</span>
                      {note}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* When to Wear Section - With Bars */}
            {product.seasons && product.seasons.length > 0 && (
              <div className="mt-12 rounded-3xl bg-gradient-to-br from-[color:var(--color-primary)]/8 to-[color:var(--color-primary)]/4 p-6 border border-[color:var(--color-primary)]/15 relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute -right-12 -bottom-12 opacity-5 pointer-events-none">
                  <svg viewBox="0 0 200 200" className="w-48 h-48 text-[color:var(--color-accent)]" fill="currentColor">
                    <circle cx="100" cy="100" r="80" opacity="0.4" />
                    <path d="M100 30 L150 80 L120 150 L80 150 L50 80 Z" opacity="0.3" />
                  </svg>
                </div>

                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--color-primary)] mb-6 relative z-10">
                  When to Wear
                </h3>
                
                {/* Seasons Row */}
                <div className="mb-8 relative z-10">
                  <p className="text-xs uppercase tracking-[0.14em] text-[color:var(--color-primary)]/60 mb-4">Seasons</p>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {["winter", "spring", "summer", "fall"].map((season) => {
                      const isSelected = product.seasons.includes(season);
                      const votes = generateSeasonVotes()[season];
                      const maxVotes = 750;
                      const barWidth = (votes / maxVotes) * 100;
                      
                      return (
                        <div key={season} className={`transition-all duration-300 ${isSelected ? "opacity-100" : "opacity-35"}`}>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl">{seasonIcons[season]}</span>
                            <span className="text-xs uppercase tracking-[0.13em] text-[color:var(--color-primary)]/70 font-medium">{season}</span>
                          </div>
                          <div className="h-2.5 rounded-full bg-[color:var(--color-primary)]/15 overflow-hidden shadow-sm">
                            <div
                              className="h-full bg-gradient-to-r from-[color:var(--color-accent)] to-[color:var(--color-accent)]/80 rounded-full transition-all duration-500"
                              style={{ width: `${barWidth}%` }}
                            />
                          </div>
                          <p className="text-xs text-[color:var(--color-accent)] font-bold mt-2">{votes}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-[color:var(--color-primary)]/20 to-transparent my-6 relative z-10" />

                {/* Day/Night Row */}
                <div className="relative z-10">
                  <p className="text-xs uppercase tracking-[0.14em] text-[color:var(--color-primary)]/60 mb-4">Time of Day</p>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {["day", "night"].map((time) => {
                      const isSelected = product.seasons.includes(time);
                      const votes = generateSeasonVotes()[time];
                      const maxVotes = 750;
                      const barWidth = (votes / maxVotes) * 100;
                      
                      return (
                        <div key={time} className={`transition-all duration-300 ${isSelected ? "opacity-100" : "opacity-35"}`}>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl">{seasonIcons[time]}</span>
                            <span className="text-xs uppercase tracking-[0.13em] text-[color:var(--color-primary)]/70 font-medium">{time}</span>
                          </div>
                          <div className="h-2.5 rounded-full bg-[color:var(--color-primary)]/15 overflow-hidden shadow-sm">
                            <div
                              className="h-full bg-gradient-to-r from-[color:var(--color-accent)] to-[color:var(--color-accent)]/80 rounded-full transition-all duration-500"
                              style={{ width: `${barWidth}%` }}
                            />
                          </div>
                          <p className="text-xs text-[color:var(--color-accent)] font-bold mt-2">{votes}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Details Grid */}
            <div className="mt-10 grid grid-cols-2 gap-4 rounded-2xl bg-[color:var(--color-primary)]/5 p-5">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--color-primary)]/60">Projection</p>
                <p className="mt-2 text-sm font-medium text-[color:var(--color-primary)]">{product.projection}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--color-primary)]/60">Longevity</p>
                <p className="mt-2 text-sm font-medium text-[color:var(--color-primary)]">{product.longevity}</p>
              </div>
            </div>

            <div className="mt-12">
              <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--color-primary)]/60">Select Size</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.pricing.map((entry) => {
                  const isSelected = entry.size === selectedPricing?.size;
                  return (
                    <button
                      key={entry.size}
                      type="button"
                      onClick={() => setSelectedSize(entry.size)}
                      className={`rounded-full border border-[color:var(--color-primary)] bg-[color:var(--color-primary)] px-4 py-2 text-xs uppercase tracking-[0.16em] text-[color:var(--color-accent)] transition-all duration-300 ${
                        isSelected
                          ? "ring-2 ring-[color:var(--color-accent)]/55"
                          : "opacity-85 hover:-translate-y-0.5 hover:opacity-100"
                      }`}
                    >
                      {entry.size}
                    </button>
                  );
                })}
              </div>

              <p className="mt-5 text-3xl text-[color:var(--color-primary)]">{formatPrice(selectedPricing?.price ?? 0)}</p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/8801000000000?text=I%20want%20to%20order%20${encodeURIComponent(product.name)}`}
                className="btn-brand px-6 py-3"
              >
                Order via WhatsApp
              </a>
              <button type="button" className="btn-brand">
                Add to Cart
              </button>
            </div>

            <div className="mt-10 border-t border-[color:var(--color-primary)]/10 pt-6">
              <h2 className="text-xl text-[color:var(--color-primary)]">Additional Information</h2>
              <p className="mt-3 leading-relaxed text-[color:var(--color-primary)]/75">
                For best performance, apply on pulse points and layer lightly. Store away from direct sunlight
                to preserve the fragrance profile.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.26em] text-[color:var(--color-accent)]">You May Also Like</p>
              <h2 className="font-heading mt-2 text-4xl text-[color:var(--color-primary)] sm:text-5xl">
                Related Fragrances
              </h2>
            </div>
          </div>

          <ProductGrid products={relatedProducts} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
