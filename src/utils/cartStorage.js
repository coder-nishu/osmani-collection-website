const STORAGE_KEY = "cart_items";

function readCart() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function writeCart(cart) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  window.dispatchEvent(new CustomEvent("cart:updated"));
}

export function getCart() {
  return readCart();
}

export function saveCart(cart) {
  const safeCart = Array.isArray(cart) ? cart : [];
  writeCart(safeCart);
  return safeCart;
}

export function addToCart(item) {
  const cart = readCart();
  const safeItem = {
    ...item,
    quantity: Number(item.quantity || 1),
  };
  const existingIndex = cart.findIndex(
    (entry) => entry.id === safeItem.id && entry.size === safeItem.size,
  );

  let nextCart = [];

  if (existingIndex >= 0) {
    nextCart = cart.map((entry, index) =>
      index === existingIndex
        ? { ...entry, quantity: Number(entry.quantity || 1) + safeItem.quantity }
        : entry,
    );
  } else {
    nextCart = [...cart, safeItem];
  }

  writeCart(nextCart);
  return nextCart;
}

export function removeFromCart(index) {
  const cart = readCart();
  const nextCart = cart.filter((_, itemIndex) => itemIndex !== index);
  writeCart(nextCart);
  return nextCart;
}

export function clearCart() {
  writeCart([]);
  return [];
}
