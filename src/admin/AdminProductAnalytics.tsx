import { useEffect, useMemo, useState } from "react";
import AstroLoader from "../components/ui/AstroLoader";
import { api } from "../lib/api";
import {
  TrendingUp,
  TrendingDown,
  Package,
  IndianRupee,
  Download,
} from "lucide-react";

type ProductAnalytics = {
  _id: string;
  name: string;
  price: number;
  totalStock: number;
  soldStock: number;
  availableStock: number;
  revenue: number;
};

export default function AdminProductAnalytics() {
  const [data, setData] = useState<any>(null);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"sold" | "revenue" | "available">("sold");
  const [status, setStatus] = useState<"all" | "best" | "low" | "out">("all");

  const load = async () => {
    const query = new URLSearchParams();
    if (from) query.append("from", from);
    if (to) query.append("to", to);

    const res = await api.adminGet(
      `/api/admin/analytics/products?${query.toString()}`
    );
    setData(res);
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    if (!data) return [];

    let list: ProductAnalytics[] = [...data.analytics];

    if (search) {
      list = list.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status !== "all") {
      list = list.filter(p => {
        if (status === "out") return p.availableStock <= 0;
        if (status === "best") return p.soldStock >= 10;
        if (status === "low") return p.soldStock < 10;
        return true;
      });
    }

    list.sort((a, b) => {
      if (sortBy === "sold") return b.soldStock - a.soldStock;
      if (sortBy === "revenue") return b.revenue - a.revenue;
      return b.availableStock - a.availableStock;
    });

    return list;
  }, [data, search, sortBy, status]);

  const downloadCSV = () => {
    const rows = [
      ["Product", "Sold", "Available", "Revenue"],
      ...filtered.map(p => [
        p.name,
        p.soldStock,
        p.availableStock,
        p.revenue,
      ]),
    ];

    const csv = rows.map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "product-analytics.csv";
    a.click();
  };

  if (!data) {
  return <AstroLoader text="Loading analytics..." />;
}

  const { summary } = data;

  return (
    <div className="space-y-6">

      {/* ===== FILTER BAR ===== */}
      <div className="grid md:grid-cols-6 gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
        <input type="date" value={from} onChange={e => setFrom(e.target.value)} className="input" />
        <input type="date" value={to} onChange={e => setTo(e.target.value)} className="input" />

        <input
          placeholder="Search product"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="input md:col-span-2"
        />

        <select value={status} onChange={e => setStatus(e.target.value as any)} className="input">
          <option value="all">All</option>
          <option value="best">Best Seller</option>
          <option value="low">Low</option>
          <option value="out">Out of Stock</option>
        </select>

        <select value={sortBy} onChange={e => setSortBy(e.target.value as any)} className="input">
          <option value="sold">Sort by Sold</option>
          <option value="revenue">Sort by Revenue</option>
          <option value="available">Sort by Stock</option>
        </select>

        <button
          onClick={load}
          className="bg-primary rounded-lg text-white px-4 py-2 font-semibold"
        >
          Apply
        </button>
      </div>

      {/* ===== SUMMARY ===== */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card icon={<Package />} label="Products" value={summary.totalProducts} />
        <Card icon={<TrendingUp />} label="Sold" value={summary.totalSold} />
        <Card icon={<IndianRupee />} label="Revenue" value={`₹${summary.totalRevenue}`} />
        <Card icon={<TrendingDown />} label="Out of Stock" value={summary.outOfStock} />
      </div>

      {/* ===== EXPORT ===== */}
      <div className="flex justify-end">
        <button
          onClick={downloadCSV}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20"
        >
          <Download size={16} /> Export CSV
        </button>
      </div>

      {/* ===== TABLE ===== */}
      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="min-w-[700px] w-full text-sm">
          <thead className="bg-white/10">
            <tr>
              <th className="p-3 text-left">Product</th>
              <th className="text-center">Sold</th>
              <th className="text-center">Available</th>
              <th className="text-center">Revenue</th>
              <th className="text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p._id} className="border-t border-white/10">
                <td className="p-3">{p.name}</td>
                <td className="text-center">{p.soldStock}</td>
                <td className="text-center">{p.availableStock}</td>
                <td className="text-center">₹{p.revenue}</td>
                <td className="text-center">
                  {p.availableStock <= 0 ? (
                    <span className="text-red-400">Out</span>
                  ) : p.soldStock >= 10 ? (
                    <span className="text-green-400">Best</span>
                  ) : (
                    <span className="text-yellow-400">Low</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Card({ icon, label, value }: any) {
  return (
    <div className="bg-white/10 rounded-xl p-4 border border-white/10">
      <div className="flex items-center gap-3">
        {icon}
        <p className="text-white/60 text-sm">{label}</p>
      </div>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}
