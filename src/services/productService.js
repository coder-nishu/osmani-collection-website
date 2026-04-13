import attars from "../data/attars.json";
import perfumes from "../data/perfume.json";

const demoImageByType = {
  attar:
    "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=900&q=80",
  perfume:
    "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80",
};

function mapProduct(product) {
  const hasExternalImage = typeof product.image === "string" && product.image.startsWith("http");

  return {
    ...product,
    image: hasExternalImage ? product.image : demoImageByType[product.type] ?? demoImageByType.perfume,
  };
}

export function getAllProducts() {
  return [...attars, ...perfumes].map(mapProduct);
}

export function getProductById(id) {
  return getAllProducts().find((product) => product.id === id) ?? null;
}

export function getProductsByType(type) {
  return getAllProducts().filter((product) => product.type === type);
}

export function getBestSellers(limit = 4) {
  return getAllProducts()
    .sort((a, b) => (a.category === "platinum" ? -1 : 1) - (b.category === "platinum" ? -1 : 1))
    .slice(0, limit);
}
