import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

function Home() {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

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

  const handleAddToCart = (productId, quantity) => {
    if (authState && authState.username) {
      console.log(
        `${authState.userId} is adding product with ID ${productId} to cart with quantity ${quantity}`
      );
      console.log("Success");
    } else {
      // Navigate to the login page
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