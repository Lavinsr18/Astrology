import { motion } from "framer-motion";
import StarBackground from "../components/ui/StarBackground";
import AnimatedCard from "../components/ui/AnimatedCard";

export default function About() {
  const timeline = [
    { year: "2020", title: "The Inception", desc: "Astrocharm began as a research project combining ancient Vedic texts with modern data science." },
    { year: "2022", title: "AI Integration", desc: "We developed our proprietary AI engine, 'Celestia', capable of analyzing planetary movements with NASA-grade precision." },
    { year: "2024", title: "Global Launch", desc: "Astrocharm launched globally, connecting seekers with certified astrologers and instant AI insights." },
    { year: "2025", title: "The Future", desc: "Developing immersive AR/VR astrology experiences for a deeper cosmic connection." },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 relative">
      <StarBackground />
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">OUR STORY</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Bridging the gap between ancient wisdom and futuristic technology.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary to-transparent -translate-x-1/2 hidden md:block" />

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <motion.div 
                key={item.year}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 0 ? "md:text-right" : "md:flex-row-reverse md:text-left"}`}
              >
                <div className="flex-1 w-full">
                  <AnimatedCard glow className="h-full">
                    <span className="text-4xl font-display font-bold text-white/10 absolute top-2 right-4 pointer-events-none">{item.year}</span>
                    <h3 className="text-2xl font-bold text-primary mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </AnimatedCard>
                </div>
                
                <div className="w-12 h-12 rounded-full bg-black border-2 border-primary shadow-[0_0_20px_hsl(var(--primary))] z-10 flex items-center justify-center shrink-0">
                  <div className="w-3 h-3 rounded-full bg-white" />
                </div>
                
                <div className="flex-1 w-full hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
