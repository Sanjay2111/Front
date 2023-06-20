import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthProvider";
import "./style1.css";
function PaymentPage() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
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
    } catch (error) {
      console.error("Error occurred while submitting the order:", error);
    }
  };

  return (
    <>
      <div>Your Total is {totalPriceWithTax}</div>
      <button className="btn btn-primary" onClick={handlePaymentSubmit}>
        Submit Payment
      </button>
    </>
  );
}

export default PaymentPage;
