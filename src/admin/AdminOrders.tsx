import { useEffect, useMemo, useState } from "react";
import { ENV } from "../config/env";
import AstroLoader from "../components/ui/AstroLoader";
/* ================= TYPES ================= */

type OrderItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

type Order = {
  _id: string;
  amount: number;
  createdAt: string;
  items?: OrderItem[];

  user: {
    fullName: string;
    email: string;
    phone: string;
    address: {
      line1: string;
      line2?: string;
      city: string;
      state: string;
      pincode: string;
      country: string;
    };
  };

  payment?: {
    razorpayOrderId?: string;
    razorpayPaymentId?: string;
    status?: "pending" | "paid" | "failed";
  };

  status?: "new" | "processing" | "shipped" | "delivered";
};


/* ================= COMPONENT ================= */

export default function OrdersAdmin() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const [search, setSearch] = useState("");
  const [paymentFilter, setPaymentFilter] = useState<"all" | "paid" | "pending">("all");

  useEffect(() => {
    fetch(`${ENV.API_BASE_URL}/api/admin/orders`)
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  /* ================= FILTER + SEARCH ================= */

  const filteredOrders = useMemo(() => {
  return orders.filter(order => {
    const user = order.user;
    if (!user) return false;

    const matchSearch =
      user.fullName.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.phone.includes(search);

    const matchPayment =
      paymentFilter === "all" ||
      order.payment?.status === paymentFilter;

    return matchSearch && matchPayment;
  });
}, [orders, search, paymentFilter]);


  /* ================= CSV EXPORT ================= */

  const exportCSV = () => {
   const rows = orders.map(o => ({
  Name: o.user.fullName,
  Email: o.user.email,
  Phone: o.user.phone,
  Amount: o.amount,
  Payment: o.payment?.status || "pending",
  Products: o.items?.map(i => `${i.name} x${i.quantity}`).join(" | "),
  Date: new Date(o.createdAt).toLocaleString(),
}));


    const csv =
      "data:text/csv;charset=utf-8," +
      [
        Object.keys(rows[0]).join(","),
        ...rows.map(r => Object.values(r).join(",")),
      ].join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "orders.csv";
    link.click();
  };

if (loading) {
  return <AstroLoader text="Fetching orders..." />;
}
  /* ================= UI ================= */

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Orders</h2>

      {/* FILTER BAR */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          placeholder="Search name / email / phone"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm"
        />

        <select
          value={paymentFilter}
          onChange={e => setPaymentFilter(e.target.value as any)}
          className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm"
        >
          <option value="all">All Payments</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
        </select>

        <button
          onClick={exportCSV}
          className="ml-auto bg-primary px-4 py-2 rounded-lg text-sm font-semibold"
        >
          Export CSV
        </button>
      </div>

      {/* ORDERS LIST */}
      <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-2">
        {filteredOrders.map(order => (
          <div
            key={order._id}
            onClick={() => setSelectedOrder(order)}
            className="bg-black/40 border border-white/10 rounded-xl p-4
                       cursor-pointer hover:border-primary hover:bg-black/60 transition"
          >
            <div className="flex justify-between mb-1">
              <p className="font-semibold">{order.user.fullName}</p>
              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  order.payment?.status === "paid"
                    ? "bg-green-600"
                    : "bg-yellow-500"
                }`}
              >
                {(order.payment?.status || "pending").toUpperCase()}
              </span>
            </div>

            <p className="text-sm text-white/60">
              {order.user.email} • {order.user.phone}
            </p>

            {/* PRODUCT SUMMARY */}
            {order.items && (
              <p className="text-sm text-white/70 mt-2">
                Products:{" "}
                {order.items.slice(0, 2).map((i, idx) => (
                  <span key={idx}>{i.name}, </span>
                ))}
                {order.items.length > 2 && (
                  <span className="text-white/50">
                    +{order.items.length - 2} more
                  </span>
                )}
              </p>
            )}

            <div className="flex justify-between mt-3">
              <p className="font-bold text-primary">₹{order.amount}</p>
              <p className="text-xs text-white/50">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ================= ORDER DETAIL MODAL ================= */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur flex items-center justify-center px-4">
          <div className="bg-black/80 border border-white/10 rounded-2xl p-6 max-w-lg w-full relative">

            {/* CLOSE */}
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-4 right-4 text-white/60 hover:text-white"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold mb-4">Order Details</h3>

            <div className="space-y-2 text-sm text-white/80">
                    {/* PRODUCTS */}
{selectedOrder.items && selectedOrder.items.length > 0 && (
  <div className="mt-4">
    <h4 className="font-semibold mb-2 text-white">
      Products Purchased
    </h4>

    <div className="space-y-2">
      {selectedOrder.items.map((item, index) => (
        <div
          key={index}
          className="flex justify-between items-center border border-white/10 rounded-lg p-2"
        >
          <div>
            <p className="font-medium">{item.name}</p>
            <p className="text-xs text-white/60">
              Qty: {item.quantity}
            </p>
          </div>

          <p className="font-semibold text-primary">
            ₹{item.price * item.quantity}
          </p>
        </div>
      ))}
    </div>
  </div>
)}
           <p><b>Name:</b> {selectedOrder.user.fullName}</p>
<p><b>Email:</b> {selectedOrder.user.email}</p>
<p><b>Phone:</b> {selectedOrder.user.phone}</p>


              <div className="mt-2">
                <b>Address:</b>
                <p className="text-white/70 mt-1">
                  {selectedOrder.user.address.line1}
{selectedOrder.user.address.line2 && (
  <> , {selectedOrder.user.address.line2}</>
)}
<br />
{selectedOrder.user.address.city},{" "}
{selectedOrder.user.address.state}
<br />
{selectedOrder.user.address.pincode},{" "}
{selectedOrder.user.address.country}

                </p>
              </div>


              {/* <p className="mt-2">
                <b>Amount:</b>{" "}
                <span className="text-primary font-semibold">
                  ₹{selectedOrder.amount}
                </span>
              </p> */}

              <p>
                <b>Payment Status:</b>{" "}
                <span className="text-yellow-400">
                  {(selectedOrder.payment?.status || "pending").toUpperCase()}
                </span>
              </p>

              <p>
                <b>Razorpay Order ID:</b>{" "}
                <span className="text-white/70 break-all">
                  {selectedOrder.payment?.razorpayOrderId || "—"}
                </span>
              </p>

              <p>
                <b>Razorpay Payment ID:</b>{" "}
                <span className="text-white/70 break-all">
                  {selectedOrder.payment?.razorpayPaymentId || "Not Paid"}
                </span>
              </p>

              <p>
                <b>Order Status:</b>{" "}
                <span className="text-primary">
                  {(selectedOrder.status || "new").toUpperCase()}
                </span>
              </p>

              <p className="text-xs text-white/50 mt-2">
                {new Date(selectedOrder.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
