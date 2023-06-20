import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CNavbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
// import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import Navbar2 from "./components/Navbar2";
import LaptopPage from "./pages/LaptopPage";
import Phone from "./pages/Phonepage";
import Tablets from "./pages/TabletPage";
import Accessories from "./pages/AccessoriesPage";
import Cameras from "./pages/CameraPage";
import WishlistPage from "./pages/WishlistPage";
import DealsPage from "./pages/DealsPage";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentPage from "./pages/PaymentPage";

function App() {
  return (
    <Router>
      <CNavbar />
      <Navbar2 />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/laptop" element={<LaptopPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/phone" element={<Phone />} />
        <Route path="/tablets" element={<Tablets />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/cameras" element={<Cameras />} />
        <Route path="/deals" element={<DealsPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
