import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "../../lib/utils";

export default function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/kundli", label: "Kundli" },
    { href: "/zodaic", label: "Zodaic" },
    { href: "/astrologer", label: "Astrologer" },
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "About" },
    { href: "/Contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "glass-nav py-4" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group cursor-pointer">
  {/* LOGO IMAGE */}
  <motion.img
    src="/logo.png"
    alt="AstroCharm Logo"
    className="w-10 h-10 object-contain"
    initial={{ rotate: -10 }}
    animate={{ rotate: 10 }}
    transition={{
      repeat: Infinity,
      repeatType: "mirror",
      duration: 6,
      ease: "easeInOut",
    }}
  />

  {/* BRAND TEXT */}
  <span
    className="
      text-2xl font-display font-bold tracking-wider
      bg-clip-text text-transparent
      bg-gradient-to-r
      from-[#f6c453] via-[#ff914d] to-[#5b6cff]
    "
  >
    ASTROCHARM
  </span>
</Link>


        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={cn(
                  "font-tech text-lg uppercase tracking-wider hover:text-primary transition-colors relative group block",
                  location === link.href ? "text-primary" : "text-white/80"
                )}>
                {link.label}
                <span className={cn(
                  "absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300",
                  location === link.href ? "w-full" : "w-0 group-hover:w-full"
                )} />
            </Link>
          ))}
          <Link
  href="/login"
  className="px-6 py-2 rounded-full border border-primary/50 text-primary font-display text-sm font-bold hover:bg-primary hover:text-white transition-all duration-300"
>
  LOGIN
</Link>

        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-nav overflow-hidden border-t border-white/10"
          >
            <div className="flex flex-col p-6 gap-4">
              {links.map((link) => (
                <Link key={link.href} href={link.href} className={cn(
                      "font-tech text-lg uppercase tracking-wider block py-2",
                      location === link.href ? "text-primary" : "text-white/80"
                    )}
                    onClick={() => setIsOpen(false)}>
                    {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
