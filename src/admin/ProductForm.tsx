import { useState } from "react";
import { api } from "../lib/api";
import { Upload, Image as ImageIcon } from "lucide-react";
import { useEffect } from "react";



const emptyProduct = {
  id: "",
  name: "",
  category: "",
  image: "",
  price: "",
  originalPrice: "",
  stones: "",
  use: "",
  content: {
    why: "",
    benefits: [{ icon: "", text: "" }],
    who: [""],
  },
};

export default function ProductForm({
  initialData,
  onSaved,
  onClose,
}: {
  initialData?: any;
  onSaved: () => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<any>(initialData || emptyProduct);
  const [uploading, setUploading] = useState(false);

const [saving, setSaving] = useState(false);
const [toast, setToast] = useState({ show: false, type: "success", msg: "" });




  /* IMAGE UPLOAD */
  const uploadImage = async (file: File) => {
    try {
      setUploading(true);
      const res = await api.adminUpload(file);
      setForm({ ...form, image: res.url });
    } catch {
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

const submit = async () => {
  try {
    setSaving(true);

    const payload = {
      ...form,
      price: Number(form.price),
      originalPrice: Number(form.originalPrice),
    };

    if (initialData) {
      await api.adminPut(`/api/admin/products/${form.id}`, payload);
    } else {
      await api.adminPost("/api/admin/products", payload);
    }

    setToast({ show: true, type: "success", msg: "Product saved successfully" });
    onSaved();
    setTimeout(onClose, 800);
  } catch {
    setToast({ show: true, type: "error", msg: "Failed to save product" });
  } finally {
    setSaving(false);
    setTimeout(() => setToast({ ...toast, show: false }), 3000);
  }
};


  return (
    <div
  className="
    fixed inset-0 z-[9999]
    bg-black/80 backdrop-blur
    flex justify-center items-start
    overflow-y-auto
    px-4 py-10
  "
>

  <div className="
  w-full max-w-3xl
  bg-[#12091f]
  border border-white/10
  rounded-2xl
  flex flex-col
">


    {/* ===== SCROLLABLE FORM CONTENT ===== */}
    <div className="p-6 space-y-6 overflow-y-auto flex-1">

      <h2 className="text-2xl font-bold text-white">
        {initialData ? "Edit Product" : "Add Product"}
      </h2>

        {/* BASIC INFO */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            ["Product ID", "id"],
            ["Name", "name"],
            ["Category", "category"],
            ["Price", "price"],
            ["Original Price", "originalPrice"],
          ].map(([label, key]) => (
            <input
              key={key}
              className="input"
              placeholder={label}
              value={form[key]}
              onChange={e => setForm({ ...form, [key]: e.target.value })}
            />
          ))}
        </div>

        {/* IMAGE UPLOAD */}
        <div className="space-y-3">
          <h3 className="font-semibold text-white flex items-center gap-2">
            <ImageIcon size={18} /> Product Image
          </h3>

          {form.image && (
            <img
              src={form.image}
              alt="Preview"
              className="w-40 h-40 object-cover rounded-xl border border-white/10"
            />
          )}

          <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/20 text-primary cursor-pointer hover:bg-primary/30 transition">
            <Upload size={16} />
            {uploading ? "Uploading..." : "Upload Image"}
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={e => {
                if (e.target.files?.[0]) {
                  uploadImage(e.target.files[0]);
                }
              }}
            />
          </label>
        </div>
        <p>Qty</p>
         <input
  type="number"
  min={0}
  placeholder="Total Stock Available"
  value={form.totalStock || 0}
  onChange={e =>
    setForm({ ...form, totalStock: Number(e.target.value) })
  }
  className="input"
/>

        <input
          className="input"
          placeholder="Stones"
          value={form.stones}
          onChange={e => setForm({ ...form, stones: e.target.value })}
        />

        <input
          className="input"
          placeholder="Short Description"
          value={form.use}
          onChange={e => setForm({ ...form, use: e.target.value })}
        />

        <textarea
          className="input h-24"
          placeholder="Why this product works"
          value={form.content.why}
          onChange={e =>
            setForm({ ...form, content: { ...form.content, why: e.target.value } })
          }
        />

        {/* BENEFITS */}
        <div className="space-y-3">
          <h3 className="font-semibold text-white">Benefits</h3>

          {form.content.benefits.map((b: any, i: number) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                className="input"
                placeholder="Icon (Zap / ShieldCheck)"
                value={b.icon}
                onChange={e => {
                  const benefits = [...form.content.benefits];
                  benefits[i].icon = e.target.value;
                  setForm({ ...form, content: { ...form.content, benefits } });
                }}
              />
              <input
                className="input"
                placeholder="Benefit text"
                value={b.text}
                onChange={e => {
                  const benefits = [...form.content.benefits];
                  benefits[i].text = e.target.value;
                  setForm({ ...form, content: { ...form.content, benefits } });
                }}
              />
            </div>
          ))}

          <button
            onClick={() =>
              setForm({
                ...form,
                content: {
                  ...form.content,
                  benefits: [...form.content.benefits, { icon: "", text: "" }],
                },
              })
            }
            className="text-primary text-sm hover:underline cursor-pointer"
          >
            + Add Benefit
          </button>
        </div>

        {/* WHO */}
        <div className="space-y-3">
          <h3 className="font-semibold text-white">Who should wear</h3>

          {form.content.who.map((w: string, i: number) => (
            <input
              key={i}
              className="input"
              placeholder="Who should wear"
              value={w}
              onChange={e => {
                const who = [...form.content.who];
                who[i] = e.target.value;
                setForm({ ...form, content: { ...form.content, who } });
              }}
            />
          ))}

          <button
            onClick={() =>
              setForm({
                ...form,
                content: { ...form.content, who: [...form.content.who, ""] },
              })
            }
            className="text-primary text-sm hover:underline cursor-pointer"
          >
            + Add Who
          </button>
        </div>
  </div>
        {/* ===== FIXED ACTION BAR ===== */}
    <div className="bottom-0 bg-[#12091f] border-t border-white/10 px-6 py-4 flex justify-end gap-3">
      <button
        onClick={onClose}
        className="px-4 py-2 rounded-lg border border-white/20 text-white hover:bg-white/10 transition"
      >
        Cancel
      </button>

      <button
        onClick={submit}
        disabled={saving}
        className={`px-6 py-2 rounded-lg font-semibold transition
          ${saving
            ? "bg-primary/50 cursor-not-allowed"
            : "bg-primary hover:bg-primary/90"}
        `}
      >
        {saving ? "Saving..." : "Save Product"}
      </button>
    </div>

  </div>
</div>
      
  );
}
