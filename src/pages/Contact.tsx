import { motion } from "framer-motion";
import StarBackground from "../components/ui/StarBackground";
import GlowingButton from "../components/ui/GlowingButton";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
} from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen pt-24 pb-32 relative overflow-hidden">
      <StarBackground />

      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent blur-[160px] -z-10" />

      <div className="container mx-auto px-6">

        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">
            Contact AstroCharm
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Have a question about our astrology products or need support with your order?  
            Our team is here to help you 24×7.
          </p>
        </motion.div>

        {/* ================= CONTACT GRID ================= */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* ========== LEFT : CONTACT INFO ========== */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="glass-card p-6 rounded-2xl border border-white/10 bg-black/40">
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-primary" />
                <div>
                  <h3 className="text-white font-semibold mb-1">Email Us</h3>
                  <p className="text-white/70 text-sm">
                    support@astrobengal.in
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-white/10 bg-black/40">
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-primary" />
                <div>
                  <h3 className="text-white font-semibold mb-1">Call / WhatsApp</h3>
                  <p className="text-white/70 text-sm">
                    +91 9XXXXXXXXX
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-white/10 bg-black/40">
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-primary" />
                <div>
                  <h3 className="text-white font-semibold mb-1">Support Hours</h3>
                  <p className="text-white/70 text-sm">
                    24 × 7 Customer Assistance
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-white/10 bg-black/40">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-primary" />
                <div>
                  <h3 className="text-white font-semibold mb-1">Location</h3>
                  <p className="text-white/70 text-sm">
                    India (Serving Pan-India)
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ========== RIGHT : CONTACT FORM ========== */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-8 rounded-3xl border border-white/10 bg-black/40"
          >
            <h2 className="text-2xl font-display font-bold text-white mb-6">
              Send Us a Message
            </h2>

            <form className="space-y-5">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full input"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full input"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full input"
              />

              <textarea
                rows={4}
                placeholder="Your Message"
                className="w-full input"
              />

              <GlowingButton
                size="lg"
                icon={<Send className="w-4 h-4" />}
                className="w-full"
              >
                Send Message
              </GlowingButton>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
