import { motion } from "framer-motion";
import { ArrowRight, Star, Moon, Sun, Sparkles,ShoppingBag, Heart} from "lucide-react";
import StarBackground from "../components/ui/StarBackground";
import GlowingButton from "../components/ui/GlowingButton";
import AnimatedCard from "../components/ui/AnimatedCard";
import AstrologerCard from "../components/ui/AstrologerCard";
import { ASTROLOGERS, TESTIMONIALS } from "../lib/astrology-data";
import zodiacWheel from "../../attached_assets/generated_images/3d_gold_zodiac_wheel.png";
import tarotImg from "../../attached_assets/generated_images/mystical_tarot_cards_3d.png";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ENV } from "../config/env";



export default function Home() {
  const [featured, setFeatured] = useState<any[]>([]);

useEffect(() => {
  fetch(`${ENV.API_BASE_URL}/api/products`)
    .then(res => res.json())
    .then(data => setFeatured(data.slice(0, 4))); // sirf 4 products
}, []);

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

      {/* ================= FEATURED PRODUCTS ================= */}
<section className="py-24 relative z-10">
  <div className="container mx-auto px-6">

    {/* HEADER */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
      <div>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-2">
          Featured Products
        </h2>
        <p className="text-muted-foreground max-w-xl">
          Handcrafted crystal bracelets energized for wealth, love & protection.
        </p>
      </div>

      <Link href="/shop">
        <GlowingButton
          variant="outline"
          className="mt-6 md:mt-0"
          icon={<ArrowRight className="w-4 h-4" />}
        >
          Shop More
        </GlowingButton>
      </Link>
    </div>

    {/* PRODUCTS GRID */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {featured.map((product, i) => (
        <motion.div
          key={product._id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
        >
          <Link href={`/product/${product._id}`}>
            <AnimatedCard
              className="group h-full p-0 overflow-hidden cursor-pointer
                         border-white/10 hover:border-primary/50"
            >
              {/* IMAGE */}
              <div className="relative aspect-square overflow-hidden bg-black/20">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover
                             transition-transform duration-700
                             group-hover:scale-110"
                />

                <div className="absolute bottom-0 left-0 right-0 p-4
                                bg-gradient-to-t from-black/90 to-transparent">
                  <GlowingButton size="sm" className="w-full">
                    View Product
                  </GlowingButton>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-5">
                <h3 className="text-lg font-display font-bold text-white mb-1">
                  {product.name}
                </h3>

                <p className="text-xs text-muted-foreground mb-3 line-clamp-1">
                  {product.stones}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">
                    ₹{product.price}
                  </span>

                  <span className="text-xs line-through text-muted-foreground">
                    ₹{product.originalPrice}
                  </span>
                </div>
              </div>
            </AnimatedCard>
          </Link>
        </motion.div>
      ))}
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
