
import BottomNav from "./components/common/BottomNav";
import DiscountModal from "./components/DiscountModal";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div className="pb-24 md:pb-0">
      <DiscountModal />
      <AppRoutes />
      <BottomNav />
    </div>
  );
}

export default App;
