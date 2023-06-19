import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthProvider";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    if (authState.userId) {
      fetchCartData();
    }
  }, [authState.userId]);

  const fetchCartData = async () => {
    try {
      const url = `http://localhost:8080/carts/${authState.userId}`;
      const response = await axios.get(url);
      const cartData = response.data;
      console.log(cartData.cartId); // Access the cartId value
      setCart(cartData);
      setLoading(false);
    } catch (error) {
      console.error("Error occurred while fetching cart items:", error);
      setLoading(false);
    }
  };

  const updateCartItemCount = (count) => {
    if (cart) {
      setCart((prevCart) => ({
        ...prevCart,
        totalItems: count,
      }));
    }
  };

  return (
    <CartContext.Provider value={{ cart, updateCartItemCount, loading }}>
      {children}
    </CartContext.Provider>
  );
};
