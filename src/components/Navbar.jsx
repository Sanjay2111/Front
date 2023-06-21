import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import axios from "axios";
import { Image } from "react-bootstrap";
import logo from "../assets/logo.png";
import { CartContext } from "../CartContext";
import "../pages/style1.css";

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
    <>
      <Navbar
        bg="black"
        expand="lg"
        variant="dark"
        className="justify-content-between"
      >
        <Navbar.Brand as={Link} to="/" className="text-white">
          <img
            src={logo}
            alt="Logo"
            className="logo-image"
            style={{ width: "150px", height: "50px" }}
          />
        </Navbar.Brand>
        <Nav.Link as={Link} to="/" className="text-white">
          Home
        </Nav.Link>
        <Nav.Link as={Link} to="/deals" className="text-white">
          Deals
        </Nav.Link>
        <Nav>
          <div className="input-group mr-3" style={{ width: "300px" }}>
            <input type="text" placeholder="Search" className="form-control" />
            <div className="input-group-append">
              <button className="btn btn-outline-light" type="button">
                <FaSearch />
              </button>
            </div>
          </div>
        </Nav>
        <Nav>
          {authState && authState.username ? (
            <NavDropdown
              title={"Hello," + authState.username}
              id="navbar-dropdown"
              className="custom-dropdown"
            >
              <NavDropdown.Item as={Link} to="/orders">
                Account
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/wishlist">
                Wishlist
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/orders">
                Orders
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Nav.Link as={Link} to="/login" className="text-white ml-3">
              Login
            </Nav.Link>
          )}
          <Nav.Link as={Link} to="/cart" className="text-white">
            <div className="d-flex align-items-center">
              <FaShoppingCart size={30} color="white" />{" "}
              {/* Adjust the size as per your preference */}
              {cart && cart.totalItems > 0 && (
                <span className="ml-1 text-danger" style={{ fontSize: "24px" }}>
                  {cart.totalItems}
                </span>
              )}
            </div>
          </Nav.Link>
        </Nav>
      </Navbar>
    </>
  );
};

export default CNavbar;
