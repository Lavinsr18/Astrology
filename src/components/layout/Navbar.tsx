import { Link, useLocation } from "wouter";
import { Menu, X, ShoppingCart, Heart, User, LogOut, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "../../lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useWishlist } from "../layout/WishlistContext";
import { useCart } from "../layout/CartContext";
import { useRef } from "react";


export default function Navbar() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const loggedIn = !!localStorage.getItem("token");
  const [profileOpen, setProfileOpen] = useState(false);
    // ✅ HOOK INSIDE COMPONENT (ONLY PLACE)
  const { wishlist } = useWishlist();
  const wishlistCount = wishlist.length;
  const { cart } = useCart();
  const dropdownRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
  const handleClickOutside = (e: MouseEvent) => {
    if (
      profileOpen &&
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setProfileOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [profileOpen]);


  const links = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/astrologer", label: "Astrologer" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

const cartCount = Array.isArray(cart)
  ? cart.reduce((sum: number, item: any) => sum + (item.qty || 0), 0)
  : 0;



const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");

  window.dispatchEvent(new Event("auth-change"));
  window.location.href = "/";
};


  return (
    <nav
  className="
    fixed top-0 w-full z-50
   
    backdrop-blur-xl
    border-b border-purple-400/10
  "
>

      <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" className="w-12 h-12" />
          <span className="font-bold text-lg text-white">AstroCharm</span>
        </Link>

        {/* LINKS */}
        <div className="hidden md:flex items-center gap-12">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "text-sm font-medium transition",
                location === l.href
                  ? "text-primary"
                  : "text-white/80 hover:text-white"
              )}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* RIGHT ICONS */}
        <div className="hidden md:flex items-center gap-9">

          {/* Wishlist */}
          <Link href="/wishlist" className="relative text-white">
            <Heart size={22} />
            {wishlistCount > 0 && <Badge count={wishlistCount} />}
          </Link>

          {/* Cart */}
          <Link href="/cart" className="relative text-white">
            <ShoppingCart size={22} />
            {cartCount > 0 && <Badge count={cartCount} />}
          </Link>

          {/* Auth */}
      {/* Auth */}
{!loggedIn ? (
  <Link
    href="/login"
    className="px-4 py-1.5 rounded-full border border-primary text-primary text-sm font-semibold"
  >
    Login
  </Link>
) : (
  <div className="relative">
    <button
      onClick={() => setProfileOpen(!profileOpen)}
      className="flex items-center gap-1 text-white"
    >
      <User size={22} />
    </button>

    <AnimatePresence>
      {profileOpen && (
        <motion.div
  ref={dropdownRef}
  initial={{ opacity: 0, y: 8, scale: 0.95 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  exit={{ opacity: 0, y: 8, scale: 0.95 }}
  transition={{ duration: 0.2 }}
  className="absolute right-0 mt-4 w-52 rounded-3xl
             bg-gradient-to-br from-[#3a0f6f]/90 to-[#14001f]/95
             backdrop-blur-2xl border border-purple-300/20"
>



      {/* DASHBOARD */}
     <DropdownItem delay={0.05}>
  <Link href="/admindashboard" className="dropdown-item">
    <span className="text-white font-semibold">Dashboard</span>
    <span className="text-xs text-purple-300">Overview</span>
  </Link>
</DropdownItem>

<DropdownItem delay={0.1}>
  <Link href="/orders" className="dropdown-item">
    <span className="text-white font-semibold">Orders</span>
    <span className="text-xs text-purple-300">Your purchases</span>
  </Link>
</DropdownItem>


      {/* LOGOUT */}
     <DropdownItem delay={0.15}>
 <button
  onClick={logout}
  className="dropdown-item logout text-red-300 hover:text-red-400 hover:bg-red-500/10"
>
  Logout
</button>

</DropdownItem>


    </motion.div>
  )}
</AnimatePresence>

              
            </div>
          )}
        </div>

        {/* MOBILE */}
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-black border-t border-white/10 px-6 py-4 space-y-3">
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link href="/wishlist">Wishlist</Link>
          <Link href="/cart">Cart</Link>
        </div>
      )}
    </nav>
  );
}

/* helpers */
function Badge({ count }: { count: number }) {
  return (
    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1.5 rounded-full">
      {count}
    </span>
  );
}

function DropdownItem({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
