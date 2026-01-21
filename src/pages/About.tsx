import { motion } from "framer-motion";
import StarBackground from "../components/ui/StarBackground";
import { Sparkles, ShieldCheck, HeartHandshake, Globe } from "lucide-react";
import Lottie from "lottie-react";
import astrologyAnim from "../../attached_assets/astrology.json";


export default function About() {
  return (
    <div className="min-h-screen pt-24 pb-32 relative overflow-hidden text-white">
      <StarBackground />

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent blur-[160px] -z-10" />

      <div className="container mx-auto px-6">

        {/* ===== HERO ===== */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-24"
        >
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
            About <span className="text-primary">AstroCharm</span>
          </h1>

          <p className="text-lg text-white/70 leading-relaxed">
            AstroCharm blends the ancient wisdom of astrology with modern craftsmanship
            to create crystal bracelets that align your energy, balance your life,
            and empower your journey.
          </p>
        </motion.section>

        {/* ===== IMAGE + STORY ===== */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-2 gap-14 items-center mb-28"
        >
          {/* IMAGE */}
          <div className="relative">
            <div className="absolute inset-0 bg-blue blur-3xl rounded-full" />
           <motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
  className="relative"
>
  {/* Glow */}
  <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full" />

  <Lottie
    animationData={astrologyAnim}
    loop
    className="relative w-full max-w-md mx-auto"
  />
</motion.div>

          </div>

          {/* TEXT */}
          <div>
            <h2 className="text-3xl font-display font-bold mb-4">
              Our Story
            </h2>

            <p className="text-white/70 leading-relaxed mb-4">
              AstroCharm was born from a belief that the universe communicates
              through energy. Every crystal carries a vibration, and when aligned
              correctly, it can influence emotions, thoughts, and destiny.
            </p>

            <p className="text-white/70 leading-relaxed">
              Each bracelet is carefully curated, energized, and aligned with
              astrological principles to bring harmony, confidence, protection,
              and abundance into your life.
            </p>
          </div>
        </motion.section>

        {/* ===== VALUES ===== */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-28"
        >
          <h2 className="text-3xl font-display font-bold text-center mb-14">
            What Makes Us Different
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ValueCard
              icon={<Sparkles />}
              title="Energized Crystals"
              text="Every crystal is cleansed and energized before delivery."
            />
            <ValueCard
              icon={<ShieldCheck />}
              title="Authenticity"
              text="We use only genuine, ethically sourced crystals."
            />
            <ValueCard
              icon={<HeartHandshake />}
              title="Personal Connection"
              text="Designed for zodiac signs, intentions, and life goals."
            />
            <ValueCard
              icon={<Globe />}
              title="Pan-India Delivery"
              text="Delivering positive energy across India."
            />
          </div>
        </motion.section>

        {/* ===== CTA ===== */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-display font-bold mb-4">
            Align With The Universe
          </h2>

          <p className="text-white/70 mb-8">
            Let AstroCharm guide you toward balance, clarity, and abundance.
            Discover the bracelet that resonates with your destiny.
          </p>

          <a
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl
                       bg-primary text-white font-semibold
                       hover:bg-primary/90 transition shadow-lg"
          >
            Explore Collection ✨
          </a>
        </motion.section>

      </div>
    </div>
  );
}

/* ===== VALUE CARD ===== */
function ValueCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="bg-black/40 border border-white/10 rounded-2xl p-6
                 backdrop-blur-md text-center"
    >
      <div className="w-14 h-14 mx-auto mb-4 rounded-full
                      bg-primary/20 text-primary
                      flex items-center justify-center">
        {icon}
      </div>

      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-white/70">{text}</p>
    </motion.div>
  );
}
