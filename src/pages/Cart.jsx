import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthProvider";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const url = "http://localhost:8080/carts/" + authState.userId;
        const response = await axios.get(url);
        setCart(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error occurred while fetching cart:", error);
        setLoading(false);
      }
    };

    if (authState.userId) {
      fetchCart();
    }
  }, [authState.userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!cart) {
    return <div>No items in the cart.</div>;
  }

  // Calculate the total price for all items in the cart
  const totalPrice = cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const handleCheckout = () => {
    const totalPrice = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    navigate(`/pay?total=${totalPrice.toFixed(2)}`);
  };

  return (
    <div>
      <h2>Cart</h2>
      <Table striped bordered>
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
            <td colSpan="4" className="text-right">
              Cart Total:
            </td>
            <td>${totalPrice.toFixed(2)}</td>
          </tr>
        </tfoot>
      </Table>
      <div className="text-center mt-4">
        <Button variant="primary" size="lg" onClick={handleCheckout}>
          Checkout
        </Button>
      </div>
    </div>
  );
}

export default Cart;
