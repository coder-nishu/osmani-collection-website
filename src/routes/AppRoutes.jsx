import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import CollectionPage from "../pages/CollectionPage";
import ProductPage from "../pages/ProductPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/attar" element={<CollectionPage type="attar" />} />
      <Route path="/perfume" element={<CollectionPage type="perfume" />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
