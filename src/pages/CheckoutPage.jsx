import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import CartItem from "../components/cart/CartItem";
import { getCart } from "../utils/cartStorage";
import { formatPrice } from "../utils/helpers";

const API_URL =
  "https://script.google.com/macros/s/AKfycbxIbXNaJ5hz5bmGLgZ6VD39pbgKpPU5Gfddvj2Z5IPIH84OQfme9S_7ZtK26bNP1L4QwA/exec";
const RAW_WHATSAPP_NUMBER = "01338338537";
const WHATSAPP_NUMBER = RAW_WHATSAPP_NUMBER.startsWith("0")
  ? `880${RAW_WHATSAPP_NUMBER.slice(1)}`
  : RAW_WHATSAPP_NUMBER;
const REDIRECT_DELAY_MS = 2000;

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
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [orderId, setOrderId] = useState("");

  const isSuccess = Boolean(submitSuccess);

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

    if (!formValues.name.trim()) {
      nextErrors.name = "Name is required.";
    }

    if (!formValues.phone.trim()) {
      nextErrors.phone = "Phone number is required.";
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

  const buildWhatsAppMessage = () => {
    const itemsText = cartItems
      .map((item) => `* ${item.name} (${item.size}) x${Number(item.quantity || 1)}`)
      .join("\n");

    return [
      "Hi, I placed an order.",
      "",
      `Name: ${formValues.name.trim()}`,
      `Phone: ${formValues.phone.trim()}`,
      `Address: ${formValues.address.trim()}`,
      "",
      "Items:",
      itemsText,
    ].join("\n");
  };

  const handleSuccess = (data) => {
    setSubmitSuccess("Order placed successfully!");
    setOrderId(data?.orderId || "");

    window.localStorage.removeItem("cart_items");
    window.dispatchEvent(new CustomEvent("cart:updated"));
    setCartItems([]);
    setFormValues(initialFormState);
    setFormErrors({});
    setIsCodChecked(false);

    const message = buildWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.setTimeout(() => {
      window.location.href = whatsappUrl;
    }, REDIRECT_DELAY_MS);
  };

  const handleError = () => {
    setSubmitError("Something went wrong. Please try again.");
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
    setSubmitSuccess("");
    setOrderId("");

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

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      let data = null;

      try {
        data = await response.json();
      } catch (error) {
        data = null;
      }

      handleSuccess(data);
    } catch (error) {
      handleError();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[color:var(--color-bg)]">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 lg:px-10">
        <header className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-[0.26em] text-[color:var(--color-accent)]">Checkout</p>
          <h1 className="font-heading text-4xl text-[color:var(--color-primary)] sm:text-5xl">Confirm Your Order</h1>
        </header>

        {cartItems.length === 0 ? (
          <section className="mt-10 rounded-3xl border border-[color:var(--color-primary)]/10 bg-[color:var(--color-surface)]/60 px-6 py-12 text-center">
            <p className="text-base text-[color:var(--color-primary)]/70">
              Your cart is empty. Add your favorite attars and perfumes to continue.
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
                <CartItem key={`${item.id}-${index}`} item={item} index={index} showRemove={false} />
              ))}
              <div className="mt-6 flex items-center justify-between rounded-2xl border border-[color:var(--color-primary)]/10 bg-[color:var(--color-surface)]/70 px-5 py-4">
                <span className="text-sm uppercase tracking-[0.2em] text-[color:var(--color-primary)]/70">Total</span>
                <span className="text-lg font-semibold text-[color:var(--color-primary)]">{formatPrice(total)}</span>
              </div>
            </div>

            <form
              className={`rounded-3xl border border-[color:var(--color-primary)]/10 bg-[color:var(--color-surface)]/70 p-6 ${
                isSuccess ? "opacity-70" : ""
              }`}
              onSubmit={handleSubmit}
            >
              <h2 className="text-sm uppercase tracking-[0.26em] text-[color:var(--color-primary)]/70">Delivery Info</h2>

              {submitSuccess ? (
                <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  <p>{submitSuccess}</p>
                  {orderId ? <p className="mt-1">Order ID: {orderId}</p> : null}
                  <p className="mt-2 text-xs text-emerald-700/80">Redirecting to WhatsApp...</p>
                </div>
              ) : null}

              {submitError ? (
                <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {submitError}
                </div>
              ) : null}

              <div className="mt-6 space-y-4">
                <label className="block text-xs uppercase tracking-[0.2em] text-[color:var(--color-primary)]/60">
                  Name
                  <input
                    type="text"
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                    disabled={isSubmitting || isSuccess}
                    className="mt-2 w-full rounded-2xl border border-[color:var(--color-primary)]/15 bg-white/70 px-4 py-3 text-sm text-[color:var(--color-primary)] focus:border-[color:var(--color-accent)] focus:outline-none"
                    placeholder="Your full name"
                    required
                  />
                  {formErrors.name ? (
                    <span className="mt-2 block text-xs text-red-600">{formErrors.name}</span>
                  ) : null}
                </label>

                <label className="block text-xs uppercase tracking-[0.2em] text-[color:var(--color-primary)]/60">
                  Phone
                  <input
                    type="tel"
                    name="phone"
                    value={formValues.phone}
                    onChange={handleChange}
                    disabled={isSubmitting || isSuccess}
                    className="mt-2 w-full rounded-2xl border border-[color:var(--color-primary)]/15 bg-white/70 px-4 py-3 text-sm text-[color:var(--color-primary)] focus:border-[color:var(--color-accent)] focus:outline-none"
                    placeholder="Phone number"
                    required
                  />
                  {formErrors.phone ? (
                    <span className="mt-2 block text-xs text-red-600">{formErrors.phone}</span>
                  ) : null}
                </label>

                <label className="block text-xs uppercase tracking-[0.2em] text-[color:var(--color-primary)]/60">
                  Address
                  <textarea
                    name="address"
                    value={formValues.address}
                    onChange={handleChange}
                    rows={4}
                    disabled={isSubmitting || isSuccess}
                    className="mt-2 w-full resize-none rounded-2xl border border-[color:var(--color-primary)]/15 bg-white/70 px-4 py-3 text-sm text-[color:var(--color-primary)] focus:border-[color:var(--color-accent)] focus:outline-none"
                    placeholder="Full delivery address"
                    required
                  />
                  {formErrors.address ? (
                    <span className="mt-2 block text-xs text-red-600">{formErrors.address}</span>
                  ) : null}
                </label>

                <label className="flex items-start gap-3 rounded-2xl border border-[color:var(--color-primary)]/12 bg-white/60 px-4 py-3 text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-primary)]/70">
                  <input
                    type="checkbox"
                    checked={isCodChecked}
                    onChange={handleCodChange}
                    disabled={isSubmitting || isSuccess}
                    className="mt-0.5 h-4 w-4"
                    required
                  />
                  <span>Cash on Delivery</span>
                </label>
                {formErrors.cod ? (
                  <span className="text-xs text-red-600">{formErrors.cod}</span>
                ) : null}
              </div>

              <button
                type="submit"
                className={`btn-brand mt-6 w-full min-h-12 text-[11px] ${
                  isSubmitting || isSuccess ? "cursor-not-allowed opacity-70" : ""
                }`}
                disabled={isSubmitting || isSuccess}
              >
                {isSubmitting ? "Placing Order..." : "Place Order"}
              </button>

              <p className="mt-4 text-xs text-[color:var(--color-primary)]/60">
                Orders are confirmed via Cash on Delivery only.
              </p>
            </form>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
