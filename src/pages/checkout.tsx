import { useCart } from "../components/layout/CartContext";
import { useState } from "react";
import { ENV } from "../config/env";
import GlowingButton from "../components/ui/GlowingButton";
import StarBackground from "../components/ui/StarBackground";
import { CheckCircle2 } from "lucide-react";

export default function Checkout() {
  const { cart, clearCart } = useCart();

  const [orderSuccess, setOrderSuccess] = useState(false);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.qty,
    0
  );

  const requiredFields = [
    "firstName",
    "lastName",
    "email",
    "phone",
    "addressLine1",
    "city",
    "state",
    "pincode",
  ];

  const isUserValid = () => {
    for (const field of requiredFields) {
      if (!user[field as keyof typeof user]?.trim()) return false;
    }

    if (!/^\d{10}$/.test(user.phone)) return false;
    if (!/^\d{6}$/.test(user.pincode)) return false;
    if (!/^\S+@\S+\.\S+$/.test(user.email)) return false;

    return true;
  };

  const handleCartPayment = async () => {
    if (!isUserValid()) {
      alert("Please fill all required fields correctly");
      return;
    }

    try {
      const res = await fetch(
        `${ENV.API_BASE_URL}/api/order/cart/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cartItems: cart,
            user,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error("Order create failed");

      const options = {
        key: data.key,
        amount: data.amount * 100,
        currency: "INR",
        name: "AstroCharm",
        description: "Cart Order",
        order_id: data.orderId,

        handler: async (response: any) => {
          await fetch(`${ENV.API_BASE_URL}/api/order/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });

          clearCart();
          setOrderSuccess(true);
        },

        prefill: {
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          contact: user.phone,
        },

        theme: { color: "#7c3aed" },
      };

      new (window as any).Razorpay(options).open();
    } catch (err) {
      alert("Payment failed");
    }
  };

  /* ================= SUCCESS ================= */
  if (orderSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <CheckCircle2 className="w-20 h-20 text-primary mb-4" />
        <h2 className="text-3xl font-bold">Order Successful 🎉</h2>
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="min-h-screen pt-24 px-6 text-white">
      <StarBackground />

      <div className="max-w-3xl mx-auto bg-black/40 border border-white/10 rounded-3xl p-8">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>

        {/* USER FORM (same as ProductView) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <input
            className="input"
            placeholder="First Name"
            onChange={e => setUser({ ...user, firstName: e.target.value })}
          />
          <input
            className="input"
            placeholder="Last Name"
            onChange={e => setUser({ ...user, lastName: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <input
            className="input"
            placeholder="Email"
            onChange={e => setUser({ ...user, email: e.target.value })}
          />
          <input
            className="input"
            placeholder="Phone"
            onChange={e => setUser({ ...user, phone: e.target.value })}
          />
        </div>

        <input
          className="input mb-4"
          placeholder="Address Line 1"
          onChange={e => setUser({ ...user, addressLine1: e.target.value })}
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <input
            className="input"
            placeholder="City"
            onChange={e => setUser({ ...user, city: e.target.value })}
          />
          <input
            className="input"
            placeholder="State"
            onChange={e => setUser({ ...user, state: e.target.value })}
          />
          <input
            className="input"
            placeholder="Pincode"
            onChange={e => setUser({ ...user, pincode: e.target.value })}
          />
        </div>

        {/* TOTAL */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg">Total Amount</span>
          <span className="text-2xl font-bold text-primary">
            ₹{subtotal}
          </span>
        </div>

        <GlowingButton
          className="w-full"
          onClick={handleCartPayment}
        >
          Pay ₹{subtotal}
        </GlowingButton>
      </div>
    </div>
  );
}
