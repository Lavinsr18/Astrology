import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Loader2, MapPin, Calendar, Clock } from "lucide-react";
import StarBackground from "../components/ui/StarBackground";
import AnimatedCard from "../components/ui/AnimatedCard";
import GlowingButton from "../components/ui/GlowingButton";

export default function Kundli() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 relative">
      <StarBackground />
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">KUNDLI GENERATION</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Generate your detailed birth chart instantly using our advanced Vedic astrology algorithms.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          {/* Form Section */}
          <AnimatedCard glow className="z-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-white uppercase tracking-wider">Full Name</label>
                <input 
                  {...register("name")}
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                  placeholder="Enter your name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" /> Date
                  </label>
                  <input 
                    type="date"
                    {...register("date")}
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" /> Time
                  </label>
                  <input 
                    type="time"
                    {...register("time")}
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" /> Place of Birth
                </label>
                <input 
                  {...register("place")}
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                  placeholder="City, Country"
                />
              </div>

              <GlowingButton type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Generate Kundli"}
              </GlowingButton>
            </form>
          </AnimatedCard>

          {/* Visualization / Result Section */}
          <div className="relative min-h-[400px] flex items-center justify-center">
            {!result ? (
              <div className="relative w-full aspect-square flex items-center justify-center">
                <div className="absolute inset-0 border border-primary/20 rounded-full animate-[spin_10s_linear_infinite]" />
                <div className="absolute inset-8 border border-accent/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                <div className="absolute inset-16 border border-white/10 rounded-full animate-[spin_20s_linear_infinite]" />
                
                <div className="text-center p-8 glass-card rounded-full w-48 h-48 flex flex-col items-center justify-center z-10">
                  <span className="text-4xl mb-2">✨</span>
                  <p className="text-sm text-muted-foreground font-medium">Enter details to align the stars</p>
                </div>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full"
              >
                <AnimatedCard glow className="bg-primary/5 border-primary/30">
                  <h3 className="text-2xl font-display font-bold text-white mb-4 text-center">Birth Chart Generated</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-muted-foreground">Sun Sign</span>
                      <span className="text-accent font-bold">Leo</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-muted-foreground">Moon Sign</span>
                      <span className="text-white font-bold">Pisces</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-muted-foreground">Ascendant</span>
                      <span className="text-white font-bold">Scorpio</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-muted-foreground">Nakshatra</span>
                      <span className="text-white font-bold">Revati</span>
                    </div>
                    
                    <div className="mt-6 p-4 bg-black/30 rounded-lg">
                      <p className="text-sm text-white/80 leading-relaxed">
                        Your chart indicates a strong creative potential driven by the moon in Pisces. 
                        Mars in the 5th house suggests a passionate approach to life.
                      </p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <GlowingButton variant="secondary" className="w-full">Download Full Report</GlowingButton>
                  </div>
                </AnimatedCard>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
