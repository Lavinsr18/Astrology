import { createContext, useContext, useEffect, useState } from "react";
import { ENV } from "../../config/env";

const WishlistContext = createContext<any>(null);

export function WishlistProvider({ children }: any) {
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  /* 🔁 LISTEN TO LOGIN / LOGOUT */
  useEffect(() => {
    const syncToken = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", syncToken);
    window.addEventListener("auth-change", syncToken);

    return () => {
      window.removeEventListener("storage", syncToken);
      window.removeEventListener("auth-change", syncToken);
    };
  }, []);

  /* FETCH WISHLIST */
  const loadWishlist = async () => {
    if (!token) {
      setWishlist([]);
      return;
    }

    const res = await fetch(`${ENV.API_BASE_URL}/api/wishlist`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setWishlist(data.map((i: any) => i.product));
  };

  useEffect(() => {
    loadWishlist();
  }, [token]);

  /* ADD */
  const addToWishlist = async (productId: string) => {
    if (!token) {
      window.location.href = "/login";
      return;
    }

    await fetch(`${ENV.API_BASE_URL}/api/wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId }),
    });

    loadWishlist();
  };

  /* REMOVE */
  const removeFromWishlist = async (productId: string) => {
    await fetch(`${ENV.API_BASE_URL}/api/wishlist/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    loadWishlist();
  };

  /* ✅ IMPORTANT */
  const isWishlisted = (productId: string) => {
    return wishlist.some((p) => p._id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isWishlisted,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
