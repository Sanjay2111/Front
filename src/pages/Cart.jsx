import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthProvider";

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const { authState } = useContext(AuthContext);

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

  return (
    <div>
      <h2>Cart</h2>
      <p>Total Items: {cart.totalItems}</p>
      <ul>
        {cart.items.map((item) => (
          <li key={item.productId}>
            <p>Product Name: {item.productName}</p>
            <p>Price: {item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Url: {item.url}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cart;