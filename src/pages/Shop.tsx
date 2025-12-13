import { motion } from "framer-motion";
import { ShoppingBag, Star, ShieldCheck, Heart, Sparkles, Filter, Search } from "lucide-react";
import StarBackground from "../components/ui/StarBackground";
import AnimatedCard from "../components/ui/AnimatedCard";
import GlowingButton from "../components/ui/GlowingButton";
import { PRODUCTS, ZODIAC_BRACELETS } from "../lib/products-data";
import { Link } from "wouter";
import { useState } from "react";

// Import images
import dhanYogImg from "../../attached_assets/generated_images/mixed_crystal_wealth_bracelet.png";
import roseQuartzImg from "../../attached_assets/generated_images/rose_quartz_love_bracelet.png";
import amethystImg from "../../attached_assets/generated_images/amethyst_stress_relief_bracelet.png";
import tigerEyeImg from "../../attached_assets/generated_images/tiger_eye_focus_bracelet.png";
import chakraImg from "../../attached_assets/generated_images/7_chakra_balance_bracelet.png";
import moonStoneImg from "../../attached_assets/generated_images/moonstone_intuition_bracelet.png";

// Image mapping
const imageMap: Record<string, string> = {
  "dhan-yog": dhanYogImg,
  "money-magnet": dhanYogImg, // Reusing similar look
  "rose-quartz": roseQuartzImg,
  "amethyst": amethystImg,
  "tiger-eye": tigerEyeImg,
  "7-chakra": chakraImg,
  "moon-stone": moonStoneImg,
};

// Fallback image function
const getProductImage = (imgKey: string) => imageMap[imgKey] || moonStoneImg;

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const allProducts = [...PRODUCTS, ...ZODIAC_BRACELETS];

  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory = activeCategory === "all" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.stones.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
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
        <div className="mb-12 flex flex-col md:flex-row gap-4 items-center justify-between glass-card p-4 rounded-xl sticky top-24 z-40 backdrop-blur-xl bg-black/50 border border-white/10">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              placeholder="Search crystals..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:border-primary"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            {[
              { id: "all", label: "All" },
              { id: "wealth", label: "Wealth" },
              { id: "love", label: "Love" },
              { id: "protection", label: "Protection" },
              { id: "health", label: "Health" },
              { id: "zodiac", label: "Zodiac" },
            ].map((cat) => (
              <button 
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  activeCategory === cat.id 
                    ? "bg-primary text-white border-primary shadow-[0_0_15px_hsl(var(--primary))]" 
                    : "border-white/10 text-muted-foreground hover:bg-white/5 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <AnimatedCard className="h-full flex flex-col p-0 overflow-hidden group border-white/5 hover:border-primary/50 transition-colors">
                <div className="relative aspect-square overflow-hidden bg-black/20">
                  <img 
                    src={getProductImage(product.image)} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay Badges */}
                  <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded shadow-lg">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </div>
                  
                  {product.category === "zodiac" && (
                    <div className="absolute top-3 right-3 bg-accent text-black text-xs font-bold px-2 py-1 rounded shadow-lg flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> ZODIAC
                    </div>
                  )}

                  {/* Quick Add Button */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/90 to-transparent">
                   <Link href={`/product/${product.id}`}>
  <GlowingButton size="sm" className="w-full">
    View Product
  </GlowingButton>
</Link>

                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-display font-bold text-white leading-tight">{product.name}</h3>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex text-accent">
                      <Star className="w-3 h-3 fill-accent" />
                      <Star className="w-3 h-3 fill-accent" />
                      <Star className="w-3 h-3 fill-accent" />
                      <Star className="w-3 h-3 fill-accent" />
                      <Star className="w-3 h-3 fill-accent" />
                    </div>
                    <span className="text-xs text-muted-foreground">(42 reviews)</span>
                  </div>

                  <p className="text-sm text-white/70 mb-4 line-clamp-2 flex-grow font-tech">
                    {product.use} • {product.stones}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice}</span>
                      <span className="text-xl font-bold text-primary">₹{product.price}</span>
                    </div>
                    <button className="p-2 rounded-full bg-white/5 hover:bg-primary/20 text-white hover:text-primary transition-colors">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </AnimatedCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
