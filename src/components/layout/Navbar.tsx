import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "../../lib/utils";


export default function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/astrologer", label: "Astrologer" },
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "About" },
    { href: "/Contact", label: "Contact" },
  ];

  /* check login */
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, []);

  /* scroll effect */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "glass-nav py-4" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 cursor-pointer">
          <motion.img
            src="/logo.png"
            alt="AstroCharm Logo"
            className="w-10 h-10"
          />
          <span className="text-2xl font-display font-bold text-white">
            AstroCharm
          </span>
        </Link>

        {/* ================= DESKTOP MENU ================= */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "uppercase text-sm tracking-wider transition",
                location === link.href
                  ? "text-primary"
                  : "text-white/80 hover:text-primary"
              )}
            >
              {link.label}
            </Link>
          ))}

          {!isLoggedIn ? (
            <Link
              href="/login"
              className="px-6 py-2 rounded-full border border-primary text-primary font-bold hover:bg-primary hover:text-white"
            >
              LOGIN
            </Link>
          ) : (
            <button
              onClick={logout}
              className="px-6 py-2 rounded-full border border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
            >
              LOGOUT
            </button>
          )}
        </div>

        {/* ================= MOBILE TOGGLE ================= */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-nav border-t border-white/10"
          >
            <div className="flex flex-col p-6 gap-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "uppercase text-sm tracking-wider",
                    location === link.href
                      ? "text-primary"
                      : "text-white/80"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {/* 🔥 MOBILE LOGIN / LOGOUT */}
              {!isLoggedIn ? (
                <Link
                  href="/login"
                  className="mt-4 text-center py-3 rounded-xl border border-primary text-primary font-bold"
                  onClick={() => setIsOpen(false)}
                >
                  LOGIN
                </Link>
              ) : (
                <button
                  onClick={logout}
                  className="mt-4 flex items-center justify-center gap-2 py-3 rounded-xl border border-red-500 text-red-400"
                >
                  <LogOut className="w-4 h-4" />
                  LOGOUT
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
