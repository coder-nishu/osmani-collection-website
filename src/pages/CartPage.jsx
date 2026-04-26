import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import CartItem from "../components/cart/CartItem";
import { clearCart, getCart, removeFromCart } from "../utils/cartStorage";
import { formatPrice } from "../utils/helpers";

export default function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(() => getCart());

  useEffect(() => {
    const handleCartUpdate = () => setCartItems(getCart());

    window.addEventListener("cart:updated", handleCartUpdate);
    window.addEventListener("storage", handleCartUpdate);

    return () => {
      window.removeEventListener("cart:updated", handleCartUpdate);
      window.removeEventListener("storage", handleCartUpdate);
    };
  }, []);

  const total = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1),
        0,
      ),
    [cartItems],
  );

  const handleRemove = (index) => {
    setCartItems(removeFromCart(index));
  };

  const handleClear = () => {
    setCartItems(clearCart());
  };

  const hasItems = cartItems.length > 0;

  return (
    <div className="min-h-screen bg-[color:var(--color-bg)]">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 lg:px-10">
        <header className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-[0.26em] text-[color:var(--color-accent)]">Your Selection</p>
          <h1 className="font-heading text-4xl text-[color:var(--color-primary)] sm:text-5xl">Shopping Cart</h1>
        </header>

        {!hasItems ? (
          <section className="mt-10 rounded-3xl border border-[color:var(--color-primary)]/10 bg-[color:var(--color-surface)]/60 px-6 py-12 text-center">
            <p className="text-base text-[color:var(--color-primary)]/70">
              Your cart is empty. Discover luxurious attars and perfumes crafted for elegance.
            </p>
            <Link
              to="/"
              className="btn-brand mt-8 inline-flex min-h-12 px-6 py-3 text-[11px]"
            >
              Continue Shopping
            </Link>
          </section>
        ) : (
          <section className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <CartItem key={`${item.id}-${index}`} item={item} index={index} onRemove={handleRemove} />
              ))}
            </div>

            <aside className="h-fit rounded-3xl border border-[color:var(--color-primary)]/10 bg-[color:var(--color-surface)]/70 p-6">
              <h2 className="text-sm uppercase tracking-[0.26em] text-[color:var(--color-primary)]/70">Order Summary</h2>
              <div className="mt-6 flex items-center justify-between text-lg font-semibold text-[color:var(--color-primary)]">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>

              <button
                type="button"
                onClick={() => navigate("/checkout")}
                className="btn-brand mt-6 w-full min-h-12 text-[11px]"
              >
                Proceed to Checkout
              </button>

              <button
                type="button"
                onClick={handleClear}
                className="btn-brand-outline mt-3 w-full min-h-12 text-[11px]"
              >
                Clear Cart
              </button>
            </aside>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
