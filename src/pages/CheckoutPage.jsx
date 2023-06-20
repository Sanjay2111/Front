import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthProvider";
import { useNavigate } from "react-router";
import { CartContext } from "../CartContext";
import { FaArrowRight } from "react-icons/fa";
import "./style1.css";

function CheckoutPage() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const { authState } = useContext(AuthContext);
  const { cart: cartContext, updateCartItemCount } = useContext(CartContext);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const url = `http://localhost:8080/carts/${authState.userId}`;
      const response = await axios.get(url);
      if (response.data.items.length === 0) {
        setCart(null);
      } else {
        setCart(response.data);
      }
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setCart(null); // Set cart to null when 404 error occurs
      } else {
        console.error("Error occurred while fetching cart:", error);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authState.userId) {
      fetchCart();
    }
  }, [authState.userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!cart || cart.items.length === 0) {
    return <div>No items in the cart.</div>;
  }

  const totalPrice = cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleSubmit = () => {
    navigate("/payment");
  };

  return (
    <>
      <div className="text-animation">
        <h2 className="animated-text">
          15% off with promo code <span className="promo-code">"Takeo"</span>
        </h2>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            <table
              className="table table-striped table-bordered"
              style={{ width: "100%" }}
            >
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Item Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.items.map((item) => (
                  <tr key={item.productId}>
                    <td>
                      <img src={item.url} alt={item.productName} width="50" />
                    </td>
                    <td>{item.productName}</td>
                    <td>${item.price}</td>
                    <td>{item.quantity}</td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="4">Cart Total:</td>
                  <td>${totalPrice.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="col-md-3 d-flex align-items-center justify-content-center text-warning text-decoration-underline">
            <div className="cart" style={{ width: "100%" }}>
              <div>
                <table className="table">
                  <tbody>
                    <tr>
                      <td>Cart Total:</td>
                      <td>${totalPrice.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>Sales Tax (6%):</td>
                      <td>${(totalPrice * 0.06).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>Total:</td>
                      <td>${(totalPrice + totalPrice * 0.06).toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-break">
                  This will redirect to our online secure payment system.
                </p>
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Submit Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;
