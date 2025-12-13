import { motion } from "framer-motion";
import { ArrowRight, Star, Moon, Sun, Sparkles,ShoppingBag, Heart} from "lucide-react";
import StarBackground from "../components/ui/StarBackground";
import GlowingButton from "../components/ui/GlowingButton";
import AnimatedCard from "../components/ui/AnimatedCard";
import AstrologerCard from "../components/ui/AstrologerCard";
import { ASTROLOGERS, TESTIMONIALS } from "../lib/astrology-data";
import zodiacWheel from "../../attached_assets/generated_images/3d_gold_zodiac_wheel.png";
import heroBg from "../../attached_assets/generated_images/cosmic_nebula_background_with_purple_and_gold_neon_gradients.png";
import tarotImg from "../../attached_assets/generated_images/mystical_tarot_cards_3d.png";
import { Link } from "wouter";
import { PRODUCTS, ZODIAC_BRACELETS } from "../lib/products-data";

// images (same mapping logic as shop)
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

const getProductImage = (key: string) => imageMap[key] || moonStoneImg;



export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <StarBackground />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="z-10 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-display font-black leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-primary-foreground to-primary">
                FUTURE OF <br />
                <span className="text-primary text-glow">DESTINY</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg font-tech leading-relaxed">
                Unlock the secrets of the cosmos with AI-powered precision. 
                Experience astrology like never before with real-time planetary tracking and personalized insights.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <GlowingButton size="lg" icon={<Sparkles className="w-5 h-5" />}>
                  Get Your Report
                </GlowingButton>
                <GlowingButton variant="outline" size="lg">
                  Explore Features
                </GlowingButton>
              </div>
              
              <div className="mt-12 flex items-center gap-8">
                <div className="text-center">
                  <h4 className="text-3xl font-display font-bold text-white">50k+</h4>
                  <p className="text-sm text-muted-foreground uppercase tracking-wider">Users</p>
                </div>
                <div className="w-px h-12 bg-white/10" />
                <div className="text-center">
                  <h4 className="text-3xl font-display font-bold text-white">99%</h4>
                  <p className="text-sm text-muted-foreground uppercase tracking-wider">Accuracy</p>
                </div>
                <div className="w-px h-12 bg-white/10" />
                <div className="text-center">
                  <h4 className="text-3xl font-display font-bold text-white">24/7</h4>
                  <p className="text-sm text-muted-foreground uppercase tracking-wider">Support</p>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="relative order-1 lg:order-2 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative z-10 w-full max-w-xl"
            >
               <motion.img 
                src={zodiacWheel} 
                alt="Zodiac Wheel"
                className="w-full h-auto drop-shadow-[0_0_50px_rgba(147,51,234,0.5)]"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
            
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-primary/20 blur-[100px] rounded-full -z-10" />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-white">COSMIC SERVICES</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Explore our premium astrological services powered by advanced algorithms and ancient wisdom.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatedCard delay={0.1} glow>
              <Sun className="w-10 h-10 text-accent mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Daily Horoscope</h3>
              <p className="text-muted-foreground text-sm mb-4">Get accurate daily predictions based on your zodiac sign and planetary movements.</p>
              <a href="/horoscope" className="text-primary text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">Read More <ArrowRight className="w-4 h-4" /></a>
            </AnimatedCard>
            
            <AnimatedCard delay={0.2} glow>
              <Moon className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Kundli Matching</h3>
              <p className="text-muted-foreground text-sm mb-4">Detailed compatibility analysis for relationships using Vedic astrology principles.</p>
              <a href="/kundli" className="text-primary text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">Check Now <ArrowRight className="w-4 h-4" /></a>
            </AnimatedCard>
            
            <AnimatedCard delay={0.3} glow>
              <Sparkles className="w-10 h-10 text-pink-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Tarot Reading</h3>
              <p className="text-muted-foreground text-sm mb-4">Unlock the mysteries of your future with our digital tarot card reading sessions.</p>
              <a href="#" className="text-primary text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">Start Reading <ArrowRight className="w-4 h-4" /></a>
            </AnimatedCard>
            
            <AnimatedCard delay={0.4} glow>
              <Star className="w-10 h-10 text-blue-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Live Astrologers</h3>
              <p className="text-muted-foreground text-sm mb-4">Connect with expert astrologers for personalized video consultations.</p>
              <a href="/astrologer" className="text-primary text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">Connect <ArrowRight className="w-4 h-4" /></a>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Feature Highlight */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-secondary/30 backdrop-blur-sm -z-10" />
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <motion.img 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              src={tarotImg} 
              alt="Tarot" 
              className="rounded-2xl shadow-2xl border border-white/10" 
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">MYSTICAL TAROT</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Dive deep into the symbolism of Tarot. Our high-fidelity 3D tarot experience brings the cards to life, offering guidance and clarity for your life's most pressing questions.
            </p>
            <GlowingButton variant="secondary">Try Tarot Reading</GlowingButton>
          </div>
        </div>
      </section>

   {/* Shop Bracelets (Same UI as Shop Page) */}
<section className="py-20 relative z-10">
  <div className="container mx-auto px-6">
    <div className="flex justify-between items-end mb-12">
      <div>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-2">
          SHOP BRACELETS
        </h2>
        <p className="text-muted-foreground">
          Energized crystal bracelets for wealth, love & protection.
        </p>
      </div>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...PRODUCTS, ...ZODIAC_BRACELETS].slice(0, 4).map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
        >
          <AnimatedCard className="h-full flex flex-col p-0 overflow-hidden group border-white/5 hover:border-primary/50 transition-colors">
            
            {/* Image */}
            <div className="relative aspect-square overflow-hidden bg-black/20">
              <img
                src={getProductImage(product.image)}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Discount */}
              <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded shadow-lg">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </div>

              {/* Zodiac Badge */}
              {product.category === "zodiac" && (
                <div className="absolute top-3 right-3 bg-accent text-black text-xs font-bold px-2 py-1 rounded shadow-lg flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> ZODIAC
                </div>
              )}

              {/* Hover CTA */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/90 to-transparent">
                <Link href={`/product/${product.id}`}>
  <GlowingButton size="sm" className="w-full">
   View Product
  </GlowingButton>
</Link>
              </div>
            </div>

            {/* Content */}
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
                <span className="text-xs text-muted-foreground">(42 reviews)</span>
              </div>

              <p className="text-sm text-white/70 mb-4 line-clamp-2 flex-grow font-tech">
                {product.use} • {product.stones}
              </p>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                <div>
                  <span className="text-xs text-muted-foreground line-through">
                    ₹{product.originalPrice}
                  </span>
                  <span className="block text-xl font-bold text-primary">
                    ₹{product.price}
                  </span>
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

    {/* Center Bottom Shop More CTA */}
<div className="mt-8 flex justify-center">
  <Link href="/shop">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className="relative group"
    >
      {/* Glow Ring */}
      <div className="absolute inset-0 rounded-full blur-2xl bg-primary/40 group-hover:bg-primary/60 transition-all duration-500" />

      {/* Button */}
      <button className="relative flex items-center gap-4 px-10 py-5 rounded-full bg-gradient-to-r from-primary via-purple-500 to-accent text-white font-display font-bold text-lg shadow-[0_0_40px_rgba(147,51,234,0.6)] border border-white/20 backdrop-blur-md">
        <ShoppingBag className="w-3 h-3" />
        Explore Full Shop
        <ArrowRight className="w-3 h-3" />
      </button>
    </motion.div>
  </Link>
</div>


    {/* Mobile CTA */}
    <div className="mt-10 flex justify-center md:hidden">
      <Link href="/shop">
        <GlowingButton variant="secondary">
          Shop More Bracelets
        </GlowingButton>
      </Link>
    </div>
  </div>
</section>



      {/* Testimonials */}
      <section className="py-20 pb-40">
        <div className="container mx-auto px-6">
           <h2 className="text-3xl md:text-5xl font-display font-bold mb-16 text-center text-white">COSMIC VOICES</h2>
           
           <div className="grid md:grid-cols-3 gap-8">
             {TESTIMONIALS.map((t, i) => (
               <AnimatedCard key={i} delay={i * 0.2} className="text-center">
                 <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-6 flex items-center justify-center text-2xl font-bold text-white font-display">
                   {t.name.charAt(0)}
                 </div>
                 <p className="text-lg italic text-white/80 mb-6">"{t.text}"</p>
                 <h4 className="font-bold text-primary">{t.name}</h4>
                 <p className="text-xs text-muted-foreground uppercase tracking-widest">{t.role}</p>
               </AnimatedCard>
             ))}
           </div>
        </div>
      </section>
    </div>
  );
}
