import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import { FaHeart } from "react-icons/fa";

function Home() {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cartItemCount, setCartItemCount] = useState(0);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error occurred while fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const updateCartItemCount = (count) => {
    setCartItemCount(count);
  };

  const handleAddToCart = async (productId, quantity) => {
    if (authState && authState.username) {
      try {
        const userId = authState.userId;
        const url = `http://localhost:8080/carts/${userId}`;
        const response2 = await axios.post(url, {
          productId: productId,
          quantity: quantity,
        });
        console.log(
          `${userId} is adding product with ID ${productId} to cart with quantity ${quantity}`
        );
        console.log("Success");
        updateCartItemCount(cartItemCount + 1);
      } catch (error) {
        console.error("Error occurred while adding item to cart:", error);
      }
    } else {
      navigate("/login");
    }
  };
  const handleAddToWishlist = async (productId, productName, price, url) => {
    if (authState && authState.userId) {
      try {
        const userId = authState.userId;
        const urll = `http://localhost:8080/wishlist`;
        const response3 = await axios.post(urll, {
          userId: userId,
          productId: productId,
          productName: productName,
          price: price,
          url: url,
        });
        console.log(
          `${userId} is adding product with ID ${productId} to the wishlist`
        );
        console.log("Success");
      } catch (error) {
        console.error("Error occurred while adding item to wishlist:", error);
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="container">
      <div className="row">
        {products.map((product) => {
          return (
            <div key={product.id} className="col-md-4 mb-4">
              <div className="card h-100">
                <img
                  src={product.url}
                  className="card-img-top"
                  alt={product.name}
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "contain",
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title" style={{ fontWeight: "bold" }}>
                    {product.name}
                  </h5>
                  <p className="card-text">${product.price}</p>
                  <div className="input-group mb-3">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Quantity"
                      min="1"
                      defaultValue="1"
                      onChange={(e) => {
                        const newQuantity = parseInt(e.target.value);
                        setQuantity(newQuantity);
                      }}
                    />
                    <button
                      className="btn btn-primary"
                      onClick={() => handleAddToCart(product.id, quantity)}
                    >
                      Add to Cart
                    </button>
                  </div>
                  <div>
                    <button
                      className="btn btn-dark"
                      onClick={() =>
                        handleAddToWishlist(
                          product.id,
                          product.name,
                          product.price,
                          product.url
                        )
                      }
                    >
                      Add to Wishlist <FaHeart style={{ color: "red" }} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
