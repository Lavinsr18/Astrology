import { Link } from "wouter";
import { motion } from "framer-motion";

import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  Star
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-black/80 border-t border-white/10 ">
      {/* Glow */}
      <div className="absolute inset-x-0 -top-20 h-40 bg-primary/10 blur-[120px]" />

      <div className="relative container mx-auto px-6 py-16">

        {/* TOP GRID */}
        <div className="grid gap-12 md:grid-cols-4">

          {/* BRAND */}
          <div>
             <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Star className="w-8 h-8 text-primary fill-primary" />
            </motion.div>
            <span className="text-2xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-white to-accent">
              ASTROCHARM
            </span>
        </Link>

            <p className="text-sm text-white/70 leading-relaxed mb-4">
              Premium energized crystal bracelets crafted to attract
              wealth, love, protection & cosmic balance into your life.
            </p>

            <div className="flex gap-4">
              <a href="#" className="text-white/60 hover:text-primary">
                <Instagram />
              </a>
              <a href="#" className="text-white/60 hover:text-primary">
                <Facebook />
              </a>
              <a href="#" className="text-white/60 hover:text-primary">
                <Twitter />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-white font-semibold mb-4">
              Quick Links
            </h4>

            <ul className="space-y-3 text-sm text-white/70">
              <li>
                <Link href="/">
                  <a className="hover:text-primary">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/shop">
                  <a className="hover:text-primary">Shop</a>
                </Link>
              </li>
              <li>
                <Link href="/zodiac">
                  <a className="hover:text-primary">Zodiac Bracelets</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="hover:text-primary">Contact Us</a>
                </Link>
              </li>
            </ul>
          </div>

          {/* CUSTOMER SUPPORT */}
          <div>
            <h4 className="text-white font-semibold mb-4">
              Customer Support
            </h4>

            <ul className="space-y-3 text-sm text-white/70">
              <li>
                <Link href="/faq">
                  <a className="hover:text-primary">FAQs</a>
                </Link>
              </li>
              <li>
                <Link href="/shipping">
                  <a className="hover:text-primary">Shipping Policy</a>
                </Link>
              </li>
              <li>
                <Link href="/returns">
                  <a className="hover:text-primary">Return & Refund</a>
                </Link>
              </li>
              <li>
                <Link href="/privacy">
                  <a className="hover:text-primary">Privacy Policy</a>
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-white font-semibold mb-4">
              Contact
            </h4>

            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                support@astrocharm.com
              </li>

              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                +91 98765 43210
              </li>

              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-1" />
                India – Delivered Nationwide
              </li>
            </ul>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-white/10 my-10" />

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
          <p>
            © {new Date().getFullYear()} AstroCharm. All rights reserved.
          </p>

          <p>
           ✨Design & Developed by BitaBox Technology
          </p>
        </div>
      </div>
    </footer>
  );
}
