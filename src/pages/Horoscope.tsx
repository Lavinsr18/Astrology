import { motion } from "framer-motion";
import StarBackground from "../components/ui/StarBackground";
import AnimatedCard from "../components/ui/AnimatedCard";
import { ZODIAC_SIGNS } from "../lib/astrology-data";

export default function Horoscope() {
  return (
    <div className="min-h-screen pt-24 pb-12 relative">
      <StarBackground />
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">DAILY HOROSCOPE</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose your zodiac sign to reveal what the stars have planned for you today.
          </p>
        </div>
      </div>
    </div>
  );
}
