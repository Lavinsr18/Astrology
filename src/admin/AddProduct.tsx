import { useState } from "react";
import { api } from "../lib/api";

export default function AddProduct({ onAdded }: { onAdded: () => void }) {
  const [form, setForm] = useState<any>({
    id: "",
    name: "",
    category: "",
    image: "",
    price: "",
    originalPrice: "",
    stones: "",
    use: "",
  });

  const submit = async () => {
    await api.adminPost("/api/admin/products", {
      ...form,
      price: Number(form.price),
      originalPrice: Number(form.originalPrice),
    });
    onAdded();
  };

  return (
    <div className="bg-white/10 p-6 rounded-xl space-y-3">
      <h2 className="text-lg font-semibold">Add Product</h2>

      {Object.keys(form).map(key => (
        <input
          key={key}
          placeholder={key}
          className="w-full input"
          value={form[key]}
          onChange={e => setForm({ ...form, [key]: e.target.value })}
        />
      ))}

      <button onClick={submit} className="btn-primary">
        Add Product
      </button>
    </div>
  );
}
