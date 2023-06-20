import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthProvider";
import { useNavigate } from "react-router-dom";

function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();
  const username = authState && authState.username;

  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        if (authState && authState.userId) {
          const userId = authState.userId;
          const response = await axios.get(
            `http://localhost:8080/wishlist/${userId}`
          );
          setWishlistItems(response.data);
        }
      } catch (error) {
        console.error("Error occurred while fetching wishlist items:", error);
      }
    };

    fetchWishlistItems();
  }, [authState]);

  const handleRemoveItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:8080/wishlist/${itemId}`);
      setWishlistItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
      );
      console.log("Item removed successfully");
    } catch (error) {
      console.error("Error occurred while removing item:", error);
    }
  };

  const handleAddToCart = async (productId, quantity) => {
    if (authState && authState.username) {
      try {
        const userId = authState.userId;
        const url = `http://localhost:8080/carts/${userId}`;
        const response = await axios.post(url, {
          productId: productId,
          quantity: quantity,
        });
        console.log(
          `${userId} is adding product with ID ${productId} to cart with quantity ${quantity}`
        );
        console.log("Success");
      } catch (error) {
        console.error("Error occurred while adding item to cart:", error);
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <h1>{username}'s Wishlist</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {wishlistItems.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.productName}</td>
              <td>${item.price}</td>
              <td>
                <img
                  src={item.url}
                  alt={item.productName}
                  style={{ width: "100px", height: "auto" }}
                />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Remove
                </button>
                <button
                  className="btn btn-primary ml-2"
                  onClick={() => handleAddToCart(item.productId, 1)}
                >
                  Add to Cart
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WishlistPage;
