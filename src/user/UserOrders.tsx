import { useEffect, useState } from "react";
import { Package } from "lucide-react";
import { ENV } from "../config/env";

export default function UserOrders() {
     
  console.log("🌐 API BASE URL:", ENV.API_BASE_URL);


    console.log("🔥 UserOrders component mounted");
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ get logged-in user from localStorage
  const userData = localStorage.getItem("user");
  const email = userData ? JSON.parse(userData).email : null;

  
  useEffect(() => {
    if (!email) {
      console.log("❌ No email found");
      setLoading(false);
      return;
    }

    console.log("✅ Fetching orders for:", email);

  fetch(`${ENV.API_BASE_URL}/api/user/orders/my?email=${email}`)
      .then(res => res.json())
      .then(data => {
        console.log("📦 Orders response:", data);
        setOrders(Array.isArray(data) ? data : []);
      })
      .catch(err => {
        console.error("User orders error:", err);
        setOrders([]);
      })
      .finally(() => setLoading(false));
  }, [email]);

  if (loading) {
    return <p className="text-center py-20">Loading orders…</p>;
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-20 mt-15">
        <Package className="mx-auto mb-4 text-purple-400" size={48} />
        <p className="text-white/60">No orders found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map(order => (
        <div
          key={order._id}
          className="bg-black/30 border border-white/10 rounded-xl p-4"
        >
          <div className="flex justify-between mb-2">
            <span className="text-sm text-white/60">
              Order ID: {order._id.slice(-6)}
            </span>
            <span className="text-sm text-purple-400">
              {order.status || "Placed"}
            </span>
          </div>

          <div className="text-sm text-white/70">
            Items: {order.items?.length || 0}
          </div>

          <div className="font-semibold text-primary mt-2">
            ₹{order.amount || order.totalAmount}
          </div>

          <div className="text-xs text-white/40 mt-1">
            {new Date(order.createdAt).toLocaleDateString()}
          </div>
        </div>
      ))}
      
    </div>
    
  );
}
