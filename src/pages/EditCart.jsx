import { useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthProvider";
import { useNavigate } from "react-router";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { CartContext } from "../CartContext";

function EditCart() {
  const { cart, updateCartItemCount, loading } = useContext(CartContext);
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    if (authState.userId) {
      try {
        const url = `http://localhost:8080/carts/${authState.userId}`;
        const response = await axios.get(url);
        const totalItems = response.data.totalItems;
        updateCartItemCount(totalItems); // Update the cart item count in CartContext
      } catch (error) {
        console.error("Error occurred while fetching cart:", error);
      }
    }
  };

  const handleDeleteItem = async (productId) => {
    try {
      const url = `http://localhost:8080/carts/${authState.userId}/${productId}`;
      await axios.delete(url);
      // Refresh the cart after deleting the item
      fetchCart();
      // Update the cart item count in the context
      updateCartItemCount((previousCount) => previousCount - 1);
      console.log(`Deleted item with ID ${productId}`);
    } catch (error) {
      console.error("Error occurred while deleting item:", error);
    }
  };

  const handleDeleteCart = async () => {
    try {
      const url = `http://localhost:8080/carts/${authState.userId}`;
      await axios.delete(url);
      // Update the cart item count in the context
      updateCartItemCount(0);
      console.log("Deleted the entire cart");
    } catch (error) {
      console.error("Error occurred while deleting cart:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!cart || cart.items.length === 0) {
    return <div>No items in the cart.</div>;
  }

  // Calculate the total price for all items in the cart
  const totalPrice = cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h2>Edit Cart</h2>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.items.map((item) => (
            <tr key={item.productId}>
              <td>
                <img src={item.url} alt={item.productName} width="50" />
              </td>
              <td>{item.productName}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.price * item.quantity}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteItem(item.productId)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">Total Items: {cart.totalItems}</td>
            <td colSpan="2">Total Price: ${totalPrice.toFixed(2)}</td>
            <td>
              <Button variant="primary" onClick={handleDeleteCart}>
                Delete Cart
              </Button>
            </td>
          </tr>
        </tfoot>
      </Table>
      <div className="d-flex justify-content-center">
        <Button
          variant="success"
          size="lg"
          onClick={() => navigate("/checkout", { state: { totalPrice } })}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
}

export default EditCart;
