import { motion } from "framer-motion";
import { ShoppingBag, Star, ShieldCheck, Heart, Sparkles, Filter, Search } from "lucide-react";
import StarBackground from "../components/ui/StarBackground";
import AnimatedCard from "../components/ui/AnimatedCard";
import GlowingButton from "../components/ui/GlowingButton";
import { Link } from "wouter";
import { useState , useEffect} from "react";
import { ENV } from "../config/env";
import { useWishlist } from "../components/layout/WishlistContext";
import { useCart } from "../components/layout/CartContext";




export default function Shop() {
    const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const { addToCart, isInCart } = useCart();
  const [showCartToast, setShowCartToast] = useState(false);
const [toastProduct, setToastProduct] = useState("");
const [sortBy, setSortBy] = useState("relevance");
const [priceRange, setPriceRange] = useState("all");
const [stockFilter, setStockFilter] = useState("all");
const [discountFilter, setDiscountFilter] = useState("all");
const [showWishlistToast, setShowWishlistToast] = useState(false);
const [wishlistToastProduct, setWishlistToastProduct] = useState("");


 

   // ✅ effects
  useEffect(() => {
    fetch(`${ENV.API_BASE_URL}/api/products`)
      .then(res => res.json())
      .then(setProducts);
  }, []);

const filteredProducts = products
  .filter((product) => {
    // Category
    const matchesCategory =
      activeCategory === "all" || product.category === activeCategory;

    // Search
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.stones.toLowerCase().includes(searchQuery.toLowerCase());

    // Price Range
    const matchesPrice =
      priceRange === "all" ||
      (priceRange === "under-999" && product.price < 1000) ||
      (priceRange === "1000-1999" &&
        product.price >= 1000 &&
        product.price <= 1999) ||
      (priceRange === "2000+" && product.price >= 2000);

    // Stock
    const availableStock = product.totalStock - product.soldStock;
    const matchesStock =
      stockFilter === "all" ||
      (stockFilter === "in" && availableStock > 0) ||
      (stockFilter === "low" && availableStock > 0 && availableStock <= 5);

    // Discount
    const discountPercent =
      ((product.originalPrice - product.price) /
        product.originalPrice) *
      100;

    const matchesDiscount =
      discountFilter === "all" ||
      (discountFilter === "20" && discountPercent >= 20) ||
      (discountFilter === "40" && discountPercent >= 40);

    return (
      matchesCategory &&
      matchesSearch &&
      matchesPrice &&
      matchesStock &&
      matchesDiscount
    );
  })
  .sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "discount") {
      const da =
        (a.originalPrice - a.price) / a.originalPrice;
      const db =
        (b.originalPrice - b.price) / b.originalPrice;
      return db - da;
    }
    return 0;
  });


  return (
    <div className="min-h-screen pt-24 pb-12 relative">
      <StarBackground />
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">COSMIC STORE</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Handcrafted crystal bracelets energized for wealth, love, health, and protection.
          </p>
        </div>

        {/* Filters and Search */}
        {/* FILTERS & SEARCH */}
<div className="mb-12 glass-card p-4 rounded-xl sticky top-16 z-40 backdrop-blur-xl bg-black/50 border border-white/10">
  
  <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">

    {/* SEARCH */}
    <div className="relative w-full lg:w-80">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <input
        placeholder="Search crystals..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full bg-black/40 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:border-primary"
      />
    </div>

    {/* DROPDOWNS */}
    <div className="flex flex-wrap gap-3 w-full lg:w-auto justify-start lg:justify-end">

      {/* CATEGORY / BRACELETS */}
      <select
        value={activeCategory}
        onChange={(e) => setActiveCategory(e.target.value)}
        className="filter-select"
      >
        <option value="all">All Bracelets</option>
        <option value="wealth">Wealth Bracelets</option>
        <option value="love">Love Bracelets</option>
        <option value="protection">Protection Bracelets</option>
        <option value="health">Health Bracelets</option>
        <option value="zodiac">Zodiac Bracelets</option>
      </select>

      {/* SORT */}
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="filter-select"
      >
        <option value="relevance">Relevance</option>
        <option value="price-low">Price: Low → High</option>
        <option value="price-high">Price: High → Low</option>
        <option value="discount">Best Discount</option>
        <option value="popular">Most Popular</option>
        <option value="newest">Newest First</option>
      </select>

      {/* PRICE */}
      <select
        value={priceRange}
        onChange={(e) => setPriceRange(e.target.value)}
        className="filter-select"
      >
        <option value="all">All Prices</option>
        <option value="under-999">Under ₹999</option>
        <option value="1000-1999">₹1000 – ₹1999</option>
        <option value="2000+">₹2000+</option>
      </select>

      {/* STOCK */}
      <select
        value={stockFilter}
        onChange={(e) => setStockFilter(e.target.value)}
        className="filter-select"
      >
        <option value="all">All Stock</option>
        <option value="in">In Stock</option>
        <option value="low">Low Stock</option>
      </select>

      {/* DISCOUNT */}
      <select
        value={discountFilter}
        onChange={(e) => setDiscountFilter(e.target.value)}
        className="filter-select"
      >
        <option value="all">All Discounts</option>
        <option value="20">20%+ OFF</option>
        <option value="40">40%+ OFF</option>
      </select>

    </div>
  </div>
</div>

        

       {/* Product Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {filteredProducts.map((product, index) => {
    const productId = product._id;  
    const productSlug = product.id;
    const isWished = isWishlisted(productId); // ✅ SCOPE FIX

    return (
      <motion.div
        key={productId}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
      >
        {/* FULL CARD CLICKABLE */}
       <Link href={`/product/${productSlug}`} className="block h-full">
          <AnimatedCard
            className="
              h-full flex flex-col p-0 overflow-hidden
              group border-white/5 hover:border-primary/50
              transition-all duration-300
              active:scale-[0.97] md:active:scale-100
            "
          >
            {/* IMAGE */}
          <div className="relative aspect-square overflow-hidden bg-black">
              {product.totalStock - product.soldStock <= 5 &&
                product.totalStock - product.soldStock > 0 && (
                  <div className="absolute bottom-3 left-3 bg-yellow-500 text-black text-xs px-2 py-1 rounded">
                    Only {product.totalStock - product.soldStock} left
                  </div>
                )}

              {product.totalStock - product.soldStock === 0 && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-white font-bold">
                  OUT OF STOCK
                </div>
              )}

             {/* IMAGE */}

  <img
    src={product.image}
    alt={product.name}
    loading="lazy"
    className="
      w-full h-full
      object-cover
      transition-transform duration-500
      group-hover:scale-105
    "
  />

  {/* SOFT OVERLAY FOR READABILITY */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

           
              {/* DISCOUNT */}
              <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded shadow-lg">
                {Math.round(
                  ((product.originalPrice - product.price) /
                    product.originalPrice) *
                    100
                )}
                % OFF
              </div>

              {/* ZODIAC */}
              {product.category === "zodiac" && (
                <div className="absolute top-3 right-3 bg-accent text-black text-xs font-bold px-2 py-1 rounded shadow-lg flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> ZODIAC
                </div>
              )}
              


              {/* CTA – MOBILE ALWAYS VISIBLE */}
              <div
                className="
                  absolute bottom-0 left-0 right-0 p-4
                  bg-gradient-to-t from-black/90 to-transparent
                  translate-y-0 md:translate-y-full
                  md:group-hover:translate-y-0
                  transition-transform duration-300
                "
              >
                <div className="pointer-events-none md:pointer-events-auto">
                  <GlowingButton size="sm" className="w-full">
                    View Product
                  </GlowingButton>
                </div>
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-lg font-display font-bold text-white mb-2">
                {product.name}
              </h3>

              <div className="flex items-center gap-2 mb-3">
                <div className="flex text-accent">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-accent" />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  (42 reviews)
                </span>
              </div>

              <p className="text-sm text-white/70 mb-4 line-clamp-2 flex-grow font-tech">
                {product.use} • {product.stones}
              </p>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">

  {/* PRICE */}
  <div>
    <span className="text-xs text-muted-foreground line-through">
      ₹{product.originalPrice}
    </span>
    <div className="text-xl font-bold text-primary">
      ₹{product.price}
    </div>
  </div>

  {/* ACTION BUTTONS */}
  <div className="flex items-center gap-2">

    {/* ADD TO CART */}
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();

        addToCart(productId);
        setToastProduct(product.name);
        setShowCartToast(true);

        setTimeout(() => {
          setShowCartToast(false);
        }, 2000);
      }}
      className="
        p-2 rounded-full
        bg-black/60 backdrop-blur
        text-white
        hover:bg-emerald-500/30
        transition
      "
      title="Add to Cart"
    >
      <ShoppingBag className="w-5 h-5" />
    </button>

    {/* WISHLIST */}
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!localStorage.getItem('token')) {
          window.location.href = '/login';
          return;
        }

       if (isWished) {
  removeFromWishlist(productId);
  setWishlistToastProduct("Removed from wishlist");
} else {
  addToWishlist(productId);
  setWishlistToastProduct("Added to wishlist");
}

setShowWishlistToast(true);
setTimeout(() => {
  setShowWishlistToast(false);
}, 2000);

      }}
      className={`
        p-2 rounded-full
        backdrop-blur
        transition
        ${
          isWished
            ? 'bg-pink-500/30 text-pink-400'
            : 'bg-black/60 text-white hover:bg-primary/30'
        }
      `}
      title="Wishlist"
    >
      <Heart className={`w-5 h-5 ${isWished ? 'fill-pink-500' : ''}`} />
    </button>

  </div>
</div>
            </div>
          </AnimatedCard>
        </Link>
      </motion.div>
    );
  })}
</div>
{/* 🛒 ADDED TO CART TOAST */}
{showCartToast && (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 30 }}
    className="
      fixed bottom-6 right-6 z-50
      bg-black/80 backdrop-blur-xl
      border border-emerald-500/30
      px-5 py-4 rounded-2xl
      shadow-xl flex items-center gap-3
    "
  >
    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
      <ShoppingBag className="w-5 h-5 text-emerald-400" />
    </div>

    <div>
      <p className="text-white font-semibold text-sm">
        Added to cart
      </p>
      <p className="text-white/60 text-xs line-clamp-1">
        {toastProduct}
      </p>
    </div>
  </motion.div>
)}
{/* 💖 WISHLIST TOAST */}
{showWishlistToast && (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 30 }}
    className="
      fixed bottom-6 right-6 z-50
      bg-black/80 backdrop-blur-xl
      border border-pink-500/30
      px-5 py-4 rounded-2xl
      shadow-xl flex items-center gap-3
    "
  >
    <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center">
      <Heart className="w-5 h-5 text-pink-400" />
    </div>

    <div>
      <p className="text-white font-semibold text-sm">
        {wishlistToastProduct}
      </p>
    </div>
  </motion.div>
)}


      </div>
    </div>
  );
}
