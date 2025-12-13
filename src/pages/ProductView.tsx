import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { useState } from "react";
import { PRODUCT_CONTENT } from "../lib/product-content";
import StarBackground from "../components/ui/StarBackground";
import GlowingButton from "../components/ui/GlowingButton";
import { PRODUCTS, ZODIAC_BRACELETS } from "../lib/products-data";
import { RefreshCcw, Truck, BadgeCheck, CreditCard, ChevronDown } from "lucide-react";
import { PRODUCT_FAQ } from "../lib/product-faq";


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

// images
import dhanYogImg from "../../attached_assets/generated_images/mixed_crystal_wealth_bracelet.png";
import roseQuartzImg from "../../attached_assets/generated_images/rose_quartz_love_bracelet.png";
import amethystImg from "../../attached_assets/generated_images/amethyst_stress_relief_bracelet.png";
import tigerEyeImg from "../../attached_assets/generated_images/tiger_eye_focus_bracelet.png";
import chakraImg from "../../attached_assets/generated_images/7_chakra_balance_bracelet.png";
import moonStoneImg from "../../attached_assets/generated_images/moonstone_intuition_bracelet.png";

const imageMap: Record<string, string> = {
  "dhan-yog": dhanYogImg,
  "money-magnet": dhanYogImg,
  "rose-quartz": roseQuartzImg,
  "amethyst": amethystImg,
  "tiger-eye": tigerEyeImg,
  "7-chakra": chakraImg,
  "moon-stone": moonStoneImg,
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


const getProductImage = (key: string) => imageMap[key] || moonStoneImg;

export default function ProductView() {
const { id } = useParams<{ id: string }>();

  const [showForm, setShowForm] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

const product = [...PRODUCTS, ...ZODIAC_BRACELETS].find(
  (p) => p.id === id
);

if (!product) {
  return <div className="text-white text-center pt-40">Product not found</div>;
}

const relatedProducts = [...PRODUCTS, ...ZODIAC_BRACELETS]
  .filter(
    (p) =>
      p.category === product.category &&
      p.id !== product.id
  )
  .slice(0, 4);



const content = PRODUCT_CONTENT[product.id] ?? {
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
            <img
              src={getProductImage(product.image)}
              alt={product.name}
              className="relative rounded-3xl border border-white/10 shadow-2xl mx-auto"
            />

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
                ₹{product.price}
              </span>
              <span className="line-through text-muted-foreground">
                ₹{product.originalPrice}
              </span>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-4">
              <GlowingButton
                size="lg"
                icon={<ShoppingBag />}
                onClick={() => setShowForm(true)}
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

          <ul className="space-y-3">
            {content.benefits.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-white/80 text-sm"
              >
                <item.icon className="w-5 h-5 text-primary mt-0.5" />
                {item.text}
              </li>
            ))}
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
{relatedProducts.length > 0 && (
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
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={getProductImage(item.image)}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700
                             group-hover:scale-110"
                />
              </div>

              {/* CONTENT */}
              <div className="p-4">
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
)}

      </div>

      {/* ================= PURCHASE MODAL ================= */}
      {showForm && !orderSuccess && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xl"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full max-w-lg bg-black/60 border border-white/10 rounded-3xl p-8"
          >
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-white"
            >
              <X />
            </button>

            <h2 className="text-3xl font-display font-bold text-white mb-6">
              Complete Your Purchase
            </h2>

            <div className="space-y-4">
              <input className="w-full input" placeholder="Full Name" />
              <input className="w-full input" placeholder="Email Address" />
              <input className="w-full input" placeholder="Phone Number" />
              <textarea className="w-full input" rows={3} placeholder="Delivery Address" />

              <div className="flex justify-between items-center pt-4">
                <span className="text-lg text-white">
                  Total: <strong className="text-primary">₹{product.price}</strong>
                </span>
                <GlowingButton
                  onClick={() => {
                    setShowForm(false);
                    setOrderSuccess(true);
                  }}
                >
                  Confirm Purchase
                </GlowingButton>
              </div>
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
