
import BottomNav from "./components/common/BottomNav";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div className="pb-24 md:pb-0">
      <AppRoutes />
      <BottomNav />
    </div>
  );
}

export default App;
