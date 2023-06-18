import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CNavbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
// import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Router>
      <CNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
