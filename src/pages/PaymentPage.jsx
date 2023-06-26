import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthProvider";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { CartContext } from "../CartContext";
import Confetti from "react-confetti";
import { useNavigate } from "react-router";
import CNavbar from "../components/Navbar";
import Navbar2 from "../components/Navbar2";
import "./style1.css";

function PaymentPage() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const { cart: cartContext, updateCartItemCount } = useContext(CartContext);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);

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

  const handlePaymentSubmit = async () => {
    try {
      const orderDate = new Date();
      const response = await axios.post(
        `http://localhost:8080/orders/${authState.userId}`,
        {
          orderDate: orderDate.toISOString(),
          items: cart.items,
        }
      );
      console.log("Order submitted successfully:", response.data);
      updateCartItemCount(0);
      setShowConfetti(true);
      setShowMessage(true);
      setShowContent(false);

      setTimeout(() => {
        setShowConfetti(false);
        setShowMessage(false);
        navigate("/"); // Navigate to /home
      }, 10000); // Show content again after 1 minute
    } catch (error) {
      console.error("Error occurred while submitting the order:", error);
    }
  };

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
  const totalPriceWithTax = (totalPrice + totalPrice * 0.06).toFixed(2);

  return (
    <>
      <CNavbar />
      <Navbar2 />
      <div className="container d-flex align-items-center justify-content-center vh-100">
        {showContent && (
          <div
            className="border bg-black p-4 text-center text-danger"
            style={{ fontSize: "3rem" }}
          >
            <div className="d-flex flex-column bg-black text-white align-items-center">
              <div className="mb-3">Your Total is {totalPriceWithTax}</div>
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "Ad3PTYUT5ibPUfFSQEGp4D2PWOeyl009YU_BTh_ukX8Guy7_PKauBMtJO9i2_DPAYygvNvjZvSGbEJZs",
                }}
              >
                <PayPalButtons
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: totalPrice,
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then(handlePaymentSubmit);
                  }}
                />
              </PayPalScriptProvider>
              <button
                className="btn btn-primary mt-3"
                onClick={handlePaymentSubmit}
              >
                Get Everything For Free
              </button>
            </div>
          </div>
        )}
        {showConfetti && (
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={900}
          />
        )}
        {showMessage && (
          <div className="mt-3">
            <h1>Thanks for placing an order!</h1>
          </div>
        )}
      </div>
    </>
  );
}

export default PaymentPage;
