import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { WishlistProvider } from "./components/layout/WishlistContext"; // ✅ correct path
import { CartProvider } from "./components/layout/CartContext";


createRoot(document.getElementById("root")!).render(
  <WishlistProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </WishlistProvider>
);