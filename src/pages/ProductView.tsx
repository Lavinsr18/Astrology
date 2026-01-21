import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import StarBackground from "../components/ui/StarBackground";
import GlowingButton from "../components/ui/GlowingButton";
import { RefreshCcw, Truck, BadgeCheck, CreditCard, ChevronDown } from "lucide-react";
import { PRODUCT_FAQ } from "../lib/product-faq";
import { ENV } from "../config/env";
import {
  Star,
  ShoppingBag,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
  HeartHandshake,
  CheckCircle2,
  X,
} from "lucide-react";

type BenefitItem = {
  text: string;
};

function FAQItem({
  faq,
}: {
  faq: { question: string; answer: string };
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      layout
      className="border border-white/10 rounded-2xl bg-black/40 backdrop-blur-md overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-white font-medium">
          {faq.question}
        </span>

        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-primary" />
        </motion.span>
      </button>

      <motion.div
        layout
        initial={false}
        animate={{ opacity: open ? 1 : 0, height: open ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
        className="px-6 pb-5 text-sm text-white/70"
      >
        {open && <p>{faq.answer}</p>}
      </motion.div>
    </motion.div>
  );
}


export default function ProductView() {
    const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1); // ✅ YAHAN
   const [showForm, setShowForm] = useState(false);
const [orderSuccess, setOrderSuccess] = useState(false);
const [formError, setFormError] = useState("");

const availableStock =
  product ? product.totalStock - product.soldStock : 0;


  const BENEFIT_ICONS = [
  Sparkles,
  HeartHandshake,
  ShieldCheck,
  Zap,
  Star,
];



useEffect(() => {
  fetch(`${ENV.API_BASE_URL}/api/products/${id}`)
    .then(res => res.json())
    .then(setProduct);
}, [id]);

const totalAmount = product ? product.price * quantity : 0;


//   const handleConfirmPurchase = async () => {
//   try {
//     const res = await fetch(`${ENV.API_BASE_URL}/api/order/create`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         product,
//         customer,
//       }),
//     });

//     const data = await res.json();

//     const options = {
//       key: data.key,
//       amount: data.amount * 100,
//       currency: "INR",
//       name: "AstroCharm",
//       description: product.name,
//       order_id: data.orderId,

//       handler: function () {
//         setShowForm(false);
//         setOrderSuccess(true);
//       },

//     prefill: {
//   name: `${customer.firstName} ${customer.lastName}`,
//   email: customer.email,
//   contact: customer.phone,
// },


//       theme: { color: "#7c3aed" },
//     };

//     const razorpay = new (window as any).Razorpay(options);
//     razorpay.open();

//   } catch (err) {
//     alert("Payment failed. Try again.");
//   }
// };

const handleConfirmPurchase = async () => {
  if (!isCustomerValid()) {
    setFormError("Please fill all required fields correctly");
    return;
  }

  setFormError("");

  try {
    const res = await fetch(`${ENV.API_BASE_URL}/api/order/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product,
        customer,
        quantity,
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    const options = {
      key: data.key,
      amount: data.amount * 100,
      currency: "INR",
      name: "AstroCharm",
      description: product.name,
      order_id: data.orderId,

      handler: async function (response: any) {
        await fetch(`${ENV.API_BASE_URL}/api/order/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(response),
        });

        setShowForm(false);
        setOrderSuccess(true);
      },

      prefill: {
        name: `${customer.firstName} ${customer.lastName}`,
        email: customer.email,
        contact: customer.phone,
      },

      theme: { color: "#7c3aed" },
    };

    const razorpay = new (window as any).Razorpay(options);
    razorpay.open();
  } catch {
    alert("Payment failed");
  }
};



const [customer, setCustomer] = useState({
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

const isCustomerValid = () => {
  for (const field of requiredFields) {
    if (!customer[field as keyof typeof customer]?.trim()) {
      return false;
    }
  }

  // extra validations
  if (!/^\d{10}$/.test(customer.phone)) return false;
  if (!/^\d{6}$/.test(customer.pincode)) return false;
  if (!/^\S+@\S+\.\S+$/.test(customer.email)) return false;

  return true;
};



if (!product) {
  return <div className="text-white text-center pt-40">Loading...</div>;
  
}

const content: {
  benefits: BenefitItem[];
  why: string;
  who: string[];
} = product.content || {
  benefits: [],
  why: "",
  who: [],
};


  return (
    <div className="min-h-screen pt-24 pb-32 relative overflow-hidden">
      <StarBackground />

      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent blur-[160px] -z-10" />

      <div className="container mx-auto px-6">

        {/* Back */}
        <Link href="/shop">
          <a className="inline-flex items-center gap-2 text-muted-foreground hover:text-white mb-12">
            <ArrowLeft className="w-4 h-4" /> Back to Shop
          </a>
        </Link>

        {/* ================= PRODUCT HERO ================= */}
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
            <img src={product.image} alt={product.name} />


            <span className="absolute top-4 left-4 bg-primary text-white text-sm font-bold px-3 py-1 rounded-full">
              {Math.round(
                ((product.originalPrice - product.price) /
                  product.originalPrice) *
                  100
              )}
              % OFF
            </span>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-card p-8 rounded-3xl border border-white/10 bg-black/40"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-accent">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">(42 reviews)</span>
            </div>

            <p className="text-lg text-white/80 mb-6 leading-relaxed">
              {product.use}
            </p>

            <p className="text-sm text-muted-foreground mb-4">
              <strong className="text-white">Stones:</strong> {product.stones}
            </p>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <ShieldCheck className="w-4 h-4 text-primary" />
              Energized & Certified Crystals
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-3xl font-bold text-primary">
                
               ₹{totalAmount}
              </span>
              <span className="line-through text-muted-foreground">
                ₹{product.originalPrice}
              </span>
            </div>

          {/* STOCK INFO */}
<p className="text-sm text-white/70 mb-2">
  {availableStock > 0 ? (
    <>Only <b>{availableStock}</b> left in stock</>
  ) : (
    <span className="text-red-500 font-semibold">Out of Stock</span>
  )}
</p>

{/* QUANTITY SELECTOR */}
<div className="flex items-center gap-4 mb-6">
  <span className="text-white font-medium">Quantity</span>

  <div className="flex items-center border border-white/10 rounded-lg">
    <button
      className="px-3 py-2 text-white hover:bg-white/10 disabled:opacity-40"
      onClick={() => setQuantity(q => Math.max(1, q - 1))}
      disabled={availableStock === 0}
    >
      −
    </button>

    <span className="px-4 py-2 min-w-[40px] text-center text-white">
      {quantity}
    </span>

    <button
      className="px-3 py-2 text-white hover:bg-white/10 disabled:opacity-40"
      onClick={() =>
        setQuantity(q => Math.min(q + 1, availableStock))
      }
      disabled={availableStock === 0}
    >
      +
    </button>
  </div>
</div>

            {/* CTA */}
            <div className="flex flex-wrap gap-4">
             <GlowingButton
  size="lg"
  icon={<ShoppingBag />}
  onClick={() => setShowForm(true)}
  disabled={availableStock === 0}
>
  Buy Now
</GlowingButton>


              <Link href="/shop">
                <GlowingButton size="lg" variant="outline">
                  Continue Shopping
                </GlowingButton>
              </Link>
            </div>
          </motion.div>
        </div>

      {/* ================= ASSURANCE STRIP ================= */}
<motion.section
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="mt-20"
>
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">

    {[
      {
        icon: RefreshCcw,
        title: "10 Days Return",
        subtitle: "& Exchange",
      },
      {
        icon: CreditCard,
        title: "Pay on",
        subtitle: "Delivery",
      },
      {
        icon: Truck,
        title: "Free",
        subtitle: "Delivery",
      },
      {
        icon: BadgeCheck,
        title: "Top",
        subtitle: "Brand",
      },
      {
        icon: Truck,
        title: "AstroCharm",
        subtitle: "Delivered",
      },
    ].map((item, i) => (
      <motion.div
        key={i}
        whileHover={{ y: -6, scale: 1.03 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="flex flex-col items-center text-center gap-3 p-5 rounded-2xl
                   bg-black/40 border border-white/10 backdrop-blur-md
                   hover:border-primary/50 hover:bg-black/60"
      >
        <div className="w-14 h-14 rounded-full flex items-center justify-center
                        bg-primary/15 text-primary shadow-[0_0_20px_rgba(147,51,234,0.4)]">
          <item.icon className="w-6 h-6" />
        </div>

        <div>
          <p className="text-sm font-semibold text-white">
            {item.title}
          </p>
          <p className="text-xs text-muted-foreground">
            {item.subtitle}
          </p>
        </div>
      </motion.div>
    ))}
  </div>
</motion.section>


      {/* ================= PRODUCT DETAILS ================= */}
<section className="mt-24 max-w-5xl mx-auto">

  {/* SECTION HEADER */}
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="text-3xl font-display font-bold text-white mb-10"
  >
    Product Details
  </motion.h2>

  <div className="grid md:grid-cols-3 gap-12">

    {/* LEFT COLUMN – DETAILS */}
    <div className="md:col-span-2 space-y-10">

      {/* KEY BENEFITS */}
      {content.benefits.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-semibold text-white mb-4">
            Key Benefits
          </h3>

          <ul className="space-y-2">
  {content.benefits.map((item, i) => {
    const Icon = BENEFIT_ICONS[i % BENEFIT_ICONS.length];

    return (
      <li
        key={i}
        className="flex items-start gap-6 "
      >
        <div
          className="w-11 h-7 flex items-center justify-center rounded-full
                     bg-primary/20 text-primary shrink-0"
        >
          <Icon className="w-5 h-5" />
        </div>

        <p className="text-sm text-white/80 leading-relaxed">
          {item.text}
        </p>
      </li>
    );
  })}
</ul>

        </motion.div>
      )}

      {/* WHY IT WORKS */}
      {content.why && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-semibold text-white mb-3">
            Product Description
          </h3>

          <p className="text-sm text-white/70 leading-relaxed">
            {content.why}
          </p>
        </motion.div>
      )}

      {/* WHO SHOULD WEAR */}
      {content.who.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-semibold text-white mb-3">
            Who Should Wear This
          </h3>

          <ul className="space-y-2 text-sm text-white/70">
            {content.who.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-primary">✔</span> {item}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>

    {/* RIGHT COLUMN – SPECIFICATIONS */}
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="bg-black/40 border border-white/10 rounded-2xl p-6 h-fit"
    >
      <h4 className="text-lg font-semibold text-white mb-4">
        Specifications
      </h4>

      <div className="space-y-4 text-sm text-white/70">
        <div>
          <p className="text-white font-medium">Stones Used</p>
          <p>{product.stones}</p>
        </div>

        <div>
          <p className="text-white font-medium">Category</p>
          <p className="capitalize">{product.category}</p>
        </div>

        <div>
          <p className="text-white font-medium">Wear Type</p>
          <p>Daily Wear</p>
        </div>

        <div>
          <p className="text-white font-medium">Care Instructions</p>
          <p>
            Avoid water, perfume & chemicals. Clean with soft cloth.
          </p>
        </div>
      </div>
    </motion.div>
  </div>
</section>

{/* ================= FAQ SECTION ================= */}
<section className="mt-24 max-w-2x2 mx-auto">
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="text-3xl font-display font-bold text-white text-center mb-10"
  >
    Frequently Asked Questions
  </motion.h2>

  <div className="space-y-2">
    {PRODUCT_FAQ.map((faq, index) => (
      <FAQItem key={index} faq={faq} />
    ))}
  </div>
</section>

{/* ================= RELATED PRODUCTS ================= */}
{/* {relatedProducts.length > 0 && (
  <section className="mt-28">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl font-display font-bold text-white text-center mb-12"
    >
      You May Also Like
    </motion.h2>

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {relatedProducts.map((item, i) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ y: -6, scale: 1.02 }}
          className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden
                     hover:border-primary/50 transition"
        >
          <Link href={`/product/${item.id}`}>
            <a className="block group">

              {/* IMAGE */}
              {/* <div className="relative aspect-square overflow-hidden">
                <img
                  src={getProductImage(item.image)}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700
                             group-hover:scale-110"
                /> 
              </div> */}

              {/* CONTENT */}
              {/* <div className="p-4">
                <h3 className="text-white font-semibold mb-1 line-clamp-1">
                  {item.name}
                </h3>

                <p className="text-xs text-muted-foreground mb-3 line-clamp-1">
                  {item.use}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-primary font-bold">
                    ₹{item.price}
                  </span>

                  <span className="text-xs line-through text-muted-foreground">
                    ₹{item.originalPrice}
                  </span>
                </div>
              </div>
            </a>
          </Link>
        </motion.div>
      ))}
    </div>
  </section>
)} */}

      </div>

      {/* ================= PURCHASE MODAL ================= */}
     {showForm && !orderSuccess && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xl flex items-center justify-center px-4"
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative w-full max-w-2xl bg-black/60 border border-white/10 rounded-3xl p-8"
    >
      {/* CLOSE */}
      <button
        onClick={() => setShowForm(false)}
        className="absolute top-4 right-4 text-white/60 hover:text-white"
      >
        <X />
      </button>

      <h2 className="text-3xl font-display font-bold text-white mb-6">
        Checkout
      </h2>

      {/* FORM */}
      <div className="space-y-5">

        {/* NAME */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            className="input"
            placeholder="First Name"
            value={customer.firstName}
            onChange={e => setCustomer({ ...customer, firstName: e.target.value })}
          />
          <input
            className="input"
            placeholder="Last Name"
            value={customer.lastName}
            onChange={e => setCustomer({ ...customer, lastName: e.target.value })}
          />
        </div>

        {/* CONTACT */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            className="input"
            placeholder="Email Address"
            value={customer.email}
            onChange={e => setCustomer({ ...customer, email: e.target.value })}
          />
          <input
            className="input"
            placeholder="Phone Number"
            value={customer.phone}
            onChange={e => setCustomer({ ...customer, phone: e.target.value })}
          />
        </div>

        {/* ADDRESS */}
        <input
          className="input"
          placeholder="Address Line 1 (House No, Street)"
          value={customer.addressLine1}
          onChange={e => setCustomer({ ...customer, addressLine1: e.target.value })}
        />

        <input
          className="input"
          placeholder="Address Line 2 (Landmark, Area)"
          value={customer.addressLine2}
          onChange={e => setCustomer({ ...customer, addressLine2: e.target.value })}
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            className="input"
            placeholder="City"
            value={customer.city}
            onChange={e => setCustomer({ ...customer, city: e.target.value })}
          />
          <input
            className="input"
            placeholder="State"
            value={customer.state}
            onChange={e => setCustomer({ ...customer, state: e.target.value })}
          />
          <input
            className="input"
            placeholder="Pincode"
            value={customer.pincode}
            onChange={e => setCustomer({ ...customer, pincode: e.target.value })}
          />
        </div>

        {/* ORDER SUMMARY */}
        <div className="flex justify-between items-center border-t border-white/10 pt-4">
          <span className="text-white text-lg">
            Total Amount
          </span>
          <span className="text-primary text-2xl font-bold">
            ₹{totalAmount}
          </span>
        </div>

        {formError && (
  <p className="text-red-400 text-sm text-center">
    {formError}
  </p>
)}


        {/* PAY */}
       <GlowingButton
  className="w-full"
  onClick={handleConfirmPurchase}
  disabled={!isCustomerValid()}
>
  Pay ₹{totalAmount}
</GlowingButton>

      </div>
    </motion.div>
  </motion.div>
)}

      

      {/* ================= SUCCESS ================= */}
      {orderSuccess && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl"
        >
          <motion.div
            initial={{ scale: 0.6 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
            className="text-center bg-black/60 border border-white/10 rounded-3xl p-10"
          >
            <CheckCircle2 className="w-20 h-20 text-primary mx-auto mb-6" />
            <h2 className="text-4xl font-display font-bold text-white mb-4">
              Order Successful 🎉
            </h2>
            <p className="text-muted-foreground mb-8">
              Your cosmic bracelet is on its way ✨
            </p>
            <Link href="/shop">
              <GlowingButton>Continue Shopping</GlowingButton>
            </Link>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
