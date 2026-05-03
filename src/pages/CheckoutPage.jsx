import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import CartItem from "../components/cart/CartItem";
import OrderModal from "../components/OrderModal";
import { getCart, removeFromCart, updateCartItemQuantity } from "../utils/cartStorage";
import { formatPrice } from "../utils/helpers";

const API_URL =
  "https://script.google.com/macros/s/AKfycbygAhvV57sg7u9EF7nbfJwl98sLKCqEs-2oLF8mokVYFqM6X_awJXhyxluTqr8pY8Rx8Q/exec";
const PROCESSING_STAGE_MS = 1500;
const SUCCESS_STAGE_MS = 1000;

const initialFormState = {
  name: "",
  phone: "",
  address: "",
};

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState(() => getCart());
  const [formValues, setFormValues] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState({});
  const [isCodChecked, setIsCodChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStage, setModalStage] = useState("processing");
  const [orderSnapshot, setOrderSnapshot] = useState({ items: [], total: 0 });

  useEffect(() => {
    const handleCartUpdate = () => setCartItems(getCart());

    window.addEventListener("cart:updated", handleCartUpdate);
    window.addEventListener("storage", handleCartUpdate);

    return () => {
      window.removeEventListener("cart:updated", handleCartUpdate);
      window.removeEventListener("storage", handleCartUpdate);
    };
  }, []);

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) =>
          sum + Number(item.price || 0) * Number(item.quantity || 1),
        0,
      ),
    [cartItems],
  );

  const discountRate = 0.1;
  const discountAmount = subtotal * discountRate;
  const total = Math.max(subtotal - discountAmount, 0);

  const handleRemove = (index) => {
    setCartItems(removeFromCart(index));
  };

  const handleQuantityChange = (index, quantity) => {
    setCartItems(updateCartItemQuantity(index, quantity));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleCodChange = (event) => {
    setIsCodChecked(event.target.checked);
    setFormErrors((prev) => ({ ...prev, cod: "" }));
  };

  const validate = () => {
    const nextErrors = {};
    const digitsOnlyPhone = formValues.phone.replace(/\D/g, "");

    if (!formValues.name.trim()) {
      nextErrors.name = "Name is required.";
    }

    if (!formValues.phone.trim()) {
      nextErrors.phone = "Phone number is required.";
    } else if (digitsOnlyPhone.length !== 11) {
      nextErrors.phone = "Phone number must be 11 digits.";
    }

    if (!formValues.address.trim()) {
      nextErrors.address = "Address is required.";
    }

    if (!isCodChecked) {
      nextErrors.cod = "Please confirm Cash on Delivery.";
    }

    setFormErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  useEffect(() => {
    if (!isModalOpen) {
      return undefined;
    }

    setModalStage("processing");

    const successTimer = window.setTimeout(() => {
      setModalStage("success");
    }, PROCESSING_STAGE_MS);

    return () => {
      window.clearTimeout(successTimer);
    };
  }, [isModalOpen]);

  const handleModalClose = () => {
    window.localStorage.removeItem("cart_items");
    window.dispatchEvent(new CustomEvent("cart:updated"));
    setCartItems([]);
    setFormValues(initialFormState);
    setFormErrors({});
    setIsCodChecked(false);
    setIsSubmitting(false);
    setIsModalOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!cartItems.length) {
      setSubmitError("Your cart is empty. Add items before placing an order.");
      return;
    }

    if (!validate() || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");
    setOrderSnapshot({ items: cartItems, total });
    setIsModalOpen(true);

    try {
      const payload = {
        name: formValues.name.trim(),
        phone: formValues.phone.trim(),
        address: formValues.address.trim(),
        items: cartItems.map((item) => ({
          name: item.name,
          size: item.size,
          quantity: Number(item.quantity || 1),
          price: item.price,
        })),
      };

      fetch(API_URL, {
        method: "POST",
        mode: "no-cors", // ✅ correct
        body: JSON.stringify(payload),
      }).catch(() => {});
    } catch {
      // no-op: do not block the user flow
    } finally {
      // modal flow handles state and redirect
    }
  };

  return (
    <div className="min-h-screen bg-(--color-bg)">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 lg:px-10">
        <header className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-[0.26em] text-(--color-accent)">
            Checkout
          </p>
          <h1 className="font-heading text-4xl text-(--color-primary) sm:text-5xl">
            Confirm Your Order
          </h1>
        </header>

        {cartItems.length === 0 ? (
          <section className="mt-10 rounded-3xl border border-(--color-primary)/10 bg-(--color-surface)/60 px-6 py-12 text-center">
            <p className="text-base text-(--color-primary)/70">
              Your cart is empty. Add your favorite attars and perfumes to
              continue.
            </p>
            <Link
              to="/"
              className="btn-brand mt-8 inline-flex min-h-12 px-6 py-3 text-[11px]"
            >
              Explore Collection
            </Link>
          </section>
        ) : (
          <section className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <CartItem
                  key={`${item.id}-${index}`}
                  item={item}
                  index={index}
                  onRemove={handleRemove}
                  onQuantityChange={handleQuantityChange}
                />
              ))}
              <div className="mt-6 rounded-2xl border border-(--color-primary)/10 bg-(--color-surface)/70 px-5 py-4">
                <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-(--color-primary)/60">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="mt-2 flex items-center justify-between rounded-full bg-[color:var(--color-accent)]/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-primary)]">
                  <span>Discount 10%</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
                <div className="mt-3 flex items-center justify-between text-base font-semibold text-(--color-primary)">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            <form
              className="rounded-3xl border border-(--color-primary)/10 bg-(--color-surface)/70 p-6"
              onSubmit={handleSubmit}
            >
              <h2 className="text-sm uppercase tracking-[0.26em] text-(--color-primary)/70">
                Delivery Info
              </h2>

              {submitError ? (
                <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {submitError}
                </div>
              ) : null}

              <div className="mt-6 space-y-4">
                <label className="block text-xs uppercase tracking-[0.2em] text-(--color-primary)/60">
                  Name
                  <input
                    type="text"
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                    disabled={isSubmitting || isModalOpen}
                    className="mt-2 w-full rounded-2xl border border-(--color-primary)/15 bg-white/70 px-4 py-3 text-sm text-(--color-primary) focus:border-(--color-accent) focus:outline-none"
                    placeholder="Your full name"
                    required
                  />
                  {formErrors.name ? (
                    <span className="mt-2 block text-xs text-red-600">
                      {formErrors.name}
                    </span>
                  ) : null}
                </label>

                <label className="block text-xs uppercase tracking-[0.2em] text-(--color-primary)/60">
                  Phone
                  <input
                    type="tel"
                    name="phone"
                    value={formValues.phone}
                    onChange={handleChange}
                    disabled={isSubmitting || isModalOpen}
                    inputMode="numeric"
                    pattern="\d{11}"
                    className="mt-2 w-full rounded-2xl border border-(--color-primary)/15 bg-white/70 px-4 py-3 text-sm text-(--color-primary) focus:border-(--color-accent) focus:outline-none"
                    placeholder="11-digit mobile number"
                    required
                  />
                  {formErrors.phone ? (
                    <span className="mt-2 block text-xs text-red-600">
                      {formErrors.phone}
                    </span>
                  ) : null}
                </label>

                <label className="block text-xs uppercase tracking-[0.2em] text-(--color-primary)/60">
                  Address
                  <textarea
                    name="address"
                    value={formValues.address}
                    onChange={handleChange}
                    rows={4}
                    disabled={isSubmitting || isModalOpen}
                    className="mt-2 w-full resize-none rounded-2xl border border-(--color-primary)/15 bg-white/70 px-4 py-3 text-sm text-(--color-primary) focus:border-(--color-accent) focus:outline-none"
                    placeholder="Full delivery address"
                    required
                  />
                  {formErrors.address ? (
                    <span className="mt-2 block text-xs text-red-600">
                      {formErrors.address}
                    </span>
                  ) : null}
                </label>

                <label className="flex items-start gap-3 rounded-2xl border border-(--color-primary)/12 bg-white/60 px-4 py-3 text-[11px] uppercase tracking-[0.18em] text-(--color-primary)/70">
                  <input
                    type="checkbox"
                    checked={isCodChecked}
                    onChange={handleCodChange}
                    disabled={isSubmitting || isModalOpen}
                    className="mt-0.5 h-4 w-4"
                    required
                  />
                  <span>
                    Cash on Delivery
                    <span className="mt-1 block text-[10px] normal-case tracking-normal text-(--color-primary)/60">
                      Dhaka delivery 70tk, outside Dhaka delivery 120tk.
                    </span>
                  </span>
                </label>
                {formErrors.cod ? (
                  <span className="text-xs text-red-600">{formErrors.cod}</span>
                ) : null}
              </div>

              <button
                type="submit"
                className={`btn-brand mt-6 w-full min-h-12 text-[11px] ${
                  isSubmitting || isModalOpen
                    ? "cursor-not-allowed opacity-70"
                    : ""
                }`}
                disabled={isSubmitting || isModalOpen}
              >
                {isSubmitting ? "Placing Order..." : "Place Order"}
              </button>

              <p className="mt-4 text-xs text-(--color-primary)/60">
                Orders are confirmed via Cash on Delivery only.
              </p>
            </form>
          </section>
        )}
      </main>

      <Footer />
      <OrderModal
        isOpen={isModalOpen}
        stage={modalStage}
        items={orderSnapshot.items}
        total={orderSnapshot.total}
        onClose={handleModalClose}
      />
    </div>
  );
}
