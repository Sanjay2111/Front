import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthProvider";
import { useNavigate } from "react-router";

function EditCart() {
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

  const handleDeleteItem = async (productId) => {
    try {
      const url = `http://localhost:8080/carts/${authState.userId}/${productId}`;
      await axios.delete(url);
      // Refresh the cart after deleting the item
      fetchCart();
      console.log(`Deleted item with ID ${productId}`);
    } catch (error) {
      console.error("Error occurred while deleting item:", error);
    }
  };

  const handleDeleteCart = async () => {
    try {
      const url = `http://localhost:8080/carts/${authState.userId}`;
      await axios.delete(url);
      // Set the cart to null to indicate that the cart is empty
      setCart(null);
      console.log("Deleted the entire cart");
    } catch (error) {
      console.error("Error occurred while deleting cart:", error);
    }
  };

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!cart) {
    return <div>No items in the cart.</div>;
  }

  return (
    <div>
      <h2>Edit Cart</h2>
      <ul>
        {cart.items.map((item) => (
          <li key={item.productId}>
            <p>Product Name: {item.productName}</p>
            <p>Price: {item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => handleDeleteItem(item.productId)}>
              Delete Item
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleDeleteCart}>Delete Cart</button>
    </div>
  );
}

export default EditCart;
