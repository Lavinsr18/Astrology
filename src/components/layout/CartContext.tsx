import { createContext, useContext, useEffect, useState } from "react";
import { ENV } from "../../config/env";

const CartContext = createContext<any>(null);

export function CartProvider({ children }: any) {
  const [cart, setCart] = useState<any[]>([]);
  const token = localStorage.getItem("token");

  const loadCart = async () => {
    if (!token) {
      setCart([]);
      return;
    }

    const res = await fetch(`${ENV.API_BASE_URL}/api/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setCart(data); // 👈 direct cart docs (with populated product)
  };

  useEffect(() => {
    loadCart();
  }, [token]);

  const addToCart = async (productId: string) => {
    await fetch(`${ENV.API_BASE_URL}/api/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId }),
    });

    loadCart();
  };

  const removeFromCart = async (productId: string) => {
    await fetch(`${ENV.API_BASE_URL}/api/cart/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    loadCart();
  };

  const clearCart = async () => {
    await fetch(`${ENV.API_BASE_URL}/api/cart/clear`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setCart([]);
  };

const updateQuantity = async (productId: string, qty: number) => {
  await fetch(`${ENV.API_BASE_URL}/api/cart/${productId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ qty }),
  });

  loadCart();
};


  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
