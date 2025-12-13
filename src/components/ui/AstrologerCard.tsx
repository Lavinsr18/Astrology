import { motion } from "framer-motion";
import { Star, MessageCircle, Phone, Video } from "lucide-react";
import AnimatedCard from "./AnimatedCard";

interface AstrologerProps {
  astrologer: {
    id: number;
    name: string;
    specialty: string;
    experience: string;
    rating: number;
    status: string;
    image: string;
  };
}

export default function AstrologerCard({ astrologer }: AstrologerProps) {
  const statusColors = {
    online: "bg-green-500 shadow-[0_0_10px_#22c55e]",
    busy: "bg-red-500 shadow-[0_0_10px_#ef4444]",
    offline: "bg-gray-500",
  };

  return (
    <AnimatedCard glow className="flex flex-col gap-4">
      <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-2">
        <img
          src={astrologer.image}
          alt={astrologer.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-3 right-3 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
          <span className={`w-2 h-2 rounded-full ${statusColors[astrologer.status as keyof typeof statusColors]}`} />
          <span className="text-xs font-bold uppercase tracking-wider text-white">
            {astrologer.status}
          </span>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-xl font-display font-bold text-white">{astrologer.name}</h3>
          <div className="flex items-center gap-1 text-accent">
            <Star className="w-4 h-4 fill-accent" />
            <span className="text-sm font-bold">{astrologer.rating}</span>
          </div>
        </div>
        <p className="text-primary text-sm font-medium mb-1">{astrologer.specialty}</p>
        <p className="text-muted-foreground text-xs">{astrologer.experience} Experience</p>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-2">
        <button className="flex items-center justify-center p-3 rounded-lg bg-white/5 hover:bg-primary/20 hover:text-primary transition-colors border border-white/5 hover:border-primary/50">
          <MessageCircle className="w-5 h-5" />
        </button>
        <button className="flex items-center justify-center p-3 rounded-lg bg-white/5 hover:bg-primary/20 hover:text-primary transition-colors border border-white/5 hover:border-primary/50">
          <Phone className="w-5 h-5" />
        </button>
        <button className="flex items-center justify-center p-3 rounded-lg bg-white/5 hover:bg-primary/20 hover:text-primary transition-colors border border-white/5 hover:border-primary/50">
          <Video className="w-5 h-5" />
        </button>
      </div>
    </AnimatedCard>
  );
}
