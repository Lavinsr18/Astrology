import { motion } from "framer-motion";
import { useState } from "react";
import StarBackground from "../components/ui/StarBackground";
import GlowingButton from "../components/ui/GlowingButton";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
} from "lucide-react";

import { ENV } from "../config/env";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const submit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    await fetch(`${ENV.API_BASE_URL}/api/queries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setLoading(false);
    alert("Message sent successfully ✨");
    setForm({ name: "", email: "", phone: "", message: "" });
  };
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
                    astrocharmpvtltd@gmail.com
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
                    +91 7559165909
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
                    Office no 305, lll rd Floor, Sai Arcade, Baif Road Wagholi,Pune - 412207
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ========== RIGHT : CONTACT FORM ========== */}
          <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-8 rounded-3xl border border-white/10 bg-black/40"
        >
          <h2 className="text-2xl font-bold text-white mb-6">
            Send Us a Message
          </h2>

          <form onSubmit={submit} className="space-y-4">
            <input
              className="input w-full"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />

            <input
              className="input w-full"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />

            <input
              className="input w-full"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            <textarea
              className="input w-full"
              rows={4}
              placeholder="Your Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
            />

            <GlowingButton
              type="submit"
              icon={<Send className="w-4 h-4" />}
              className="w-full"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </GlowingButton>
          </form>
        </motion.div>
        </div>
      </div>
    </div>
  );
}
