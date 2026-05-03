import attars from "../data/attars.json";
import perfumes from "../data/perfume.json";

const demoImageByType = {
  attar:
    "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=900&q=80",
  perfume:
    "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80",
};

function resolveImage(value, fallbackImage) {
  if (typeof value !== "string") {
    return fallbackImage;
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return fallbackImage;
  }

  if (trimmed.startsWith("http") || trimmed.startsWith("/")) {
    return trimmed;
  }

  return trimmed;
}

function slugify(value) {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function mapProduct(product, slugCounts) {
  const fallbackImage = demoImageByType[product.type] ?? demoImageByType.perfume;
  const baseSlug = slugify(product.name) || slugify(product.id) || "fragrance";
  const currentCount = (slugCounts.get(baseSlug) ?? 0) + 1;

  slugCounts.set(baseSlug, currentCount);

  const slug = currentCount === 1 ? baseSlug : `${baseSlug}-${currentCount}`;

  const rawVariants = Array.isArray(product.variants)
    ? product.variants
    : Array.isArray(product.pricing)
      ? product.pricing.map((entry) => ({ ...entry, image: product.image }))
      : [];

  const variants = rawVariants.map((entry) => ({
    ...entry,
    image: resolveImage(entry.image, fallbackImage),
  }));

  const images = variants.length
    ? variants.map((entry) => entry.image)
    : [resolveImage(product.image, fallbackImage)];

  return {
    ...product,
    slug,
    variants,
    images,
    image: images[0] ?? fallbackImage,
  };
}

const allRawProducts = [...attars, ...perfumes];
const slugCounts = new Map();
const mappedProducts = allRawProducts.map((product) => mapProduct(product, slugCounts));

export function getAllProducts() {
  return mappedProducts;
}

export function getProductById(id) {
  return getAllProducts().find((product) => product.id === id) ?? null;
}

export function getProductBySlug(slug) {
  if (!slug) {
    return null;
  }

  const normalizedSlug = String(slug).toLowerCase();

  return (
    getAllProducts().find((product) => product.slug === normalizedSlug) ??
    getAllProducts().find((product) => product.id === slug) ??
    null
  );
}

export function getProductsByType(type) {
  return getAllProducts().filter((product) => product.type === type);
}

export function getBestSellers(limit = 4) {
  return getAllProducts()
    .sort((a, b) => (a.category === "platinum" ? -1 : 1) - (b.category === "platinum" ? -1 : 1))
    .slice(0, limit);
}
