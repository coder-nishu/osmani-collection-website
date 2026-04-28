import { useMemo, useState } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import WhatsAppFloating from "../components/common/WhatsAppFloating";
import FilterBar from "../components/product/FilterBar";
import ProductGrid from "../components/product/ProductGrid";
import { getProductsByType } from "../services/productService";
import { getStartingPrice } from "../utils/helpers";

function matchesFilter(product, filter) {
  if (filter === "all") {
    return true;
  }

  const noteMatch = (product.notes ?? []).some((note) => note.toLowerCase().includes(filter));
  const projectionMatch = product.projection?.toLowerCase().includes(filter);

  if (filter === "fresh") {
    const freshAliases = ["citrus", "aquatic", "green", "clean"];
    return (
      noteMatch ||
      freshAliases.some((alias) => (product.notes ?? []).some((note) => note.toLowerCase().includes(alias)))
    );
  }

  return noteMatch || projectionMatch;
}

export default function CollectionPage({ type }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [searchTerm, setSearchTerm] = useState("");

  const collectionTitle = type === "attar" ? "Attar Collection" : "Perfume Collection";

  const products = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const matchesSearch = (product) => {
      if (!normalizedSearch) {
        return true;
      }

      const nameMatch = product.name?.toLowerCase().includes(normalizedSearch);
      const categoryMatch = product.category?.toLowerCase().includes(normalizedSearch);
      const noteMatch = (product.notes ?? []).some((note) => note.toLowerCase().includes(normalizedSearch));

      return nameMatch || categoryMatch || noteMatch;
    };

    const filtered = getProductsByType(type).filter(
      (product) => matchesFilter(product, activeFilter) && matchesSearch(product),
    );

    if (sortBy === "price-asc") {
      return [...filtered].sort((a, b) => getStartingPrice(a) - getStartingPrice(b));
    }

    if (sortBy === "price-desc") {
      return [...filtered].sort((a, b) => getStartingPrice(b) - getStartingPrice(a));
    }

    return filtered;
  }, [type, activeFilter, sortBy]);

  return (
    <div className="min-h-screen bg-[color:var(--color-bg)]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-10 lg:pt-14">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.26em] text-[color:var(--color-accent)]">Fragrance Selection</p>
          <h1 className="font-heading mt-3 text-5xl text-[color:var(--color-primary)] sm:text-6xl">{collectionTitle}</h1>
          <p className="mt-4 text-sm leading-relaxed text-[color:var(--color-primary)]/75 sm:text-base">
            Discover premium fragrances crafted for elegance.
          </p>
        </header>

        <section className="mt-10">
          <div className="sticky top-16 z-30 -mx-4 mb-6 bg-[color:var(--color-bg)]/95 px-4 pb-4 pt-2 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10">
            <div className="rounded-2xl border border-[color:var(--color-primary)]/10 bg-white/70 px-4 py-3">
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search fragrances"
                className="w-full bg-transparent text-sm text-[color:var(--color-primary)] outline-none"
                aria-label="Search fragrances"
              />
            </div>
          </div>
          <FilterBar
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
          <ProductGrid products={products} />
        </section>
      </main>

      <Footer />
      <WhatsAppFloating />
    </div>
  );
}
