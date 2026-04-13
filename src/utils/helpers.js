export function formatPrice(value) {
  return `৳${Number(value).toLocaleString("en-BD")}`;
}

export function getStartingPrice(product) {
  const prices = (product.pricing ?? []).map((entry) => entry.price);
  return prices.length ? Math.min(...prices) : 0;
}
