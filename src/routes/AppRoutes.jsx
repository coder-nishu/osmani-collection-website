import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import CollectionPage from "../pages/CollectionPage";
import ProductPage from "../pages/ProductPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/attar" element={<CollectionPage type="attar" />} />
      <Route path="/perfume" element={<CollectionPage type="perfume" />} />
      <Route path="/product/:slug" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
