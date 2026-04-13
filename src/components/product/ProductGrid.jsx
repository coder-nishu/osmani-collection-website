import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
  if (!products.length) {
    return (
      <div className="rounded-2xl bg-[color:var(--color-primary)]/5 px-6 py-12 text-center">
        <p className="text-base text-[color:var(--color-primary)]/75">
          No fragrances match this selection right now. Try another filter.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
