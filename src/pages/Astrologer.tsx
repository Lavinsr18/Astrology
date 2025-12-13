import { motion } from "framer-motion";
import StarBackground from "../components/ui/StarBackground";
import AstrologerCard from "../components/ui/AstrologerCard";
import { ASTROLOGERS } from "../lib/astrology-data";
import { Search, Filter } from "lucide-react";

export default function Astrologer() {
  return (
    <div className="min-h-screen pt-24 pb-12 relative">
      <StarBackground />
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">EXPERT ASTROLOGERS</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with world-renowned experts in Vedic Astrology, Tarot, Numerology, and Vastu.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12 flex flex-col md:flex-row gap-4 items-center justify-between glass-card p-4 rounded-xl">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              placeholder="Search astrologers..." 
              className="w-full bg-black/40 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:border-primary"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {["All", "Vedic", "Tarot", "Numerology", "Love", "Career"].map((filter) => (
              <button 
                key={filter}
                className="px-4 py-2 rounded-lg border border-white/10 text-sm font-medium hover:bg-white/5 hover:text-primary whitespace-nowrap transition-colors"
              >
                {filter}
              </button>
            ))}
            <button className="px-4 py-2 rounded-lg border border-white/10 text-sm font-medium hover:bg-white/5 flex items-center gap-2">
              <Filter className="w-4 h-4" /> Filters
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {ASTROLOGERS.map((astro) => (
            <AstrologerCard key={astro.id} astrologer={astro} />
          ))}
          {/* Duplicate for demo purposes to fill grid */}
          {ASTROLOGERS.map((astro) => (
            <AstrologerCard key={`dup-${astro.id}`} astrologer={{...astro, id: parseInt(`10${astro.id}`)}} />
          ))}
        </div>
      </div>
    </div>
  );
}
