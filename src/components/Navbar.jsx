import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import { CartContext } from "../CartContext";

const CNavbar = () => {
  const { cart, updateCartItemCount } = useContext(CartContext);
  const { authState, setAuthState } = useContext(AuthContext);

  const handleLogout = () => {
    // Clear the authentication state and remove the token and username from localStorage
    setAuthState({ token: "", username: "" });
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  };

  useEffect(() => {
    const fetchCartItemCount = async () => {
      try {
        const url = `http://localhost:8080/carts/${authState.userId}`;
        const response = await axios.get(url);
        const totalItems = response.data.totalItems;
        updateCartItemCount(totalItems);
      } catch (error) {
        console.error("Error occurred while fetching cart items:", error);
      }
    };

    if (authState.userId) {
      fetchCartItemCount();
    }
  }, [authState.userId, updateCartItemCount]);

  return (
    <Navbar bg="black" expand="lg" variant="dark">
      <Navbar.Brand as={Link} to="/" className="text-white">
        My App
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/" className="text-white">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/dashboard" className="text-white">
            Dashboard
          </Nav.Link>
          {authState && authState.username ? (
            <NavDropdown title={authState.username} id="navbar-dropdown">
              <NavDropdown.Item as={Link} to="/orders">
                Orders
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Nav.Link as={Link} to="/login" className="text-white">
              Login
            </Nav.Link>
          )}
          <Nav.Link as={Link} to="/cart" className="ml-auto text-white">
            <div className="d-flex align-items-center">
              <FaShoppingCart size={20} color="white" />
              {cart && cart.totalItems > 0 && (
                <span className="ml-1">{cart.totalItems}</span>
              )}
              <span className="ml-1">Cart</span>
            </div>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default CNavbar;
