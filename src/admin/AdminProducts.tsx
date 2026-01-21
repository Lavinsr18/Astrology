import { useEffect, useState } from "react";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { api } from "../lib/api";
import ProductForm from "../admin/ProductForm";

const CATEGORIES = ["all", "wealth", "love", "health", "protection", "zodiac"];

export default function ProductsAdmin() {
  const [products, setProducts] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  const load = async () => {
    const data = await api.adminGet("/api/admin/products");
    setProducts(data);
    setFiltered(data);
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    let data = [...products];

    if (category !== "all") {
      data = data.filter(p => p.category === category);
    }

    if (search) {
      data = data.filter(
        p =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.stones.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(data);
  }, [search, category, products]);

  const remove = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await api.adminDelete(`/api/admin/products/${id}`);
    load();
  };

  return (
    <div className="flex flex-col gap-4 h-[75vh]">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">Products</h1>

        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="
            flex items-center justify-center gap-2
            px-4 py-2 rounded-xl
            bg-primary text-white font-semibold
            w-full md:w-auto
          "
        >
          <Plus size={18} /> Add Product
        </button>
      </div>

      {/* FILTER BAR */}
      <div className="flex flex-col gap-4 bg-white/10 p-4 rounded-xl">

        {/* SEARCH */}
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
          <input
            placeholder="Search product..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="
              w-full pl-10 pr-4 py-2 rounded-lg
              bg-black/40 border border-white/10
              text-white outline-none
            "
          />
        </div>

        {/* CATEGORY */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm capitalize whitespace-nowrap transition ${
                category === cat
                  ? "bg-primary text-white"
                  : "bg-black/30 text-white/70 hover:bg-black/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* LIST */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">

        {/* DESKTOP HEADER */}
        <div className="hidden md:grid grid-cols-5 text-white/60 text-sm px-4">
  <span>Product</span>
  <span>Price</span>
  <span>Stock</span>
  <span>Stones</span>
  <span className="text-right">Actions</span>
</div>


        {filtered.map(p => (
          <div
            key={p._id}
            className="
              bg-white/10 border border-white/10 rounded-xl p-4
             md:grid md:grid-cols-5 md:items-center
              flex flex-col gap-3
            "
          >
            {/* NAME */}
            <div>
              <p className="font-semibold text-white">{p.name}</p>
              <p className="text-xs text-white/50 capitalize">{p.category}</p>
            </div>

            {/* PRICE */}
            <div className="text-white md:block">
              ₹{p.price}
            </div>

            {/* STOCK */}
<div className="text-sm">
  {(() => {
    const available = p.totalStock - p.soldStock;

    if (available <= 0) {
      return (
        <span className="px-2 py-1 rounded-full text-xs bg-red-600 text-white">
          Out of Stock
        </span>
      );
    }

    if (available <= 5) {
      return (
        <span className="px-2 py-1 rounded-full text-xs bg-yellow-500 text-black">
          Low ({available})
        </span>
      );
    }

    return (
      <span className="px-2 py-1 rounded-full text-xs bg-green-600 text-white">
        {available} Left
      </span>
    );
  })()}

  <p className="text-[11px] text-white/50 mt-1">
    Sold: {p.soldStock} / {p.totalStock}
  </p>
</div>


            {/* STONES */}
            <div className="text-xs text-white/60 line-clamp-1">
              {p.stones}
            </div>

            {/* ACTIONS */}
            <div className="flex md:justify-end gap-4">
              <button
                onClick={() => {
                  setEditing(p);
                  setShowForm(true);
                }}
                className="flex items-center gap-1 text-blue-400 hover:underline"
              >
                <Edit size={16} /> Edit
              </button>

              <button
                onClick={() => remove(p.id)}
                className="flex items-center gap-1 text-red-400 hover:underline"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-center text-white/50 mt-10">
            No products found
          </p>
        )}
      </div>

      {/* MODAL */}
      {showForm && (
        <ProductForm
          initialData={editing}
          onClose={() => setShowForm(false)}
          onSaved={() => {
            setShowForm(false);
            load();
          }}
        />
      )}
    </div>
  );
}
