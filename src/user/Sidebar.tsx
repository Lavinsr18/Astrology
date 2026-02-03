import { Link, useLocation } from "wouter";
import StarBackground from "../components/ui/StarBackground";
export default function Sidebar() {
  const [location] = useLocation();

  const menu = [
    { label: "Overview", icon: "🏠", path: "/account" },
    { label: "Profile", icon: "👤", path: "/profile" },
    { label: "Orders", icon: "📦", path: "/account/orders" },
    { label: "Wishlist", icon: "❤️", path: "/account/wishlist" },
    { label: "Cart", icon: "🛒", path: "/account/cart" },
    { label: "Support", icon: "📞", path: "/account/support" },
    { label: "Settings", icon: "⚙️", path: "/account/settings" },
  ];

  return (
    <aside className="
      fixed left-0 top-0 h-screen w-64
      border-r border-white/10
      text-white flex flex-col
    ">
        <StarBackground />
      {/* LOGO */}
      <div className="px-12 py-12 border-b border-white/10">
        {/* <h1 className="text-xl font-bold">
          Astro<span className="text-[#e0b973]">Charm</span>
        </h1>
        <p className="text-xs text-white/50">My Account</p> */}
      </div>

      {/* MENU */}
      <nav className="flex-1 px-3 py-8 space-y-1 text-sm">
        {menu.map(item => {
          const active = location === item.path;
          return (
            <Link key={item.path} href={item.path}>
              <a className={`
                flex items-center gap-3 px-6 py-6 rounded-lg
                transition
                ${active
                  ? "bg-white/20 text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"}
              `}>
                <span>{item.icon}</span>
                {item.label}
              </a>
            </Link>
          );
        })}
      </nav>

      {/* FOOTER */}
      <div className="px-6 py-4 text-xs text-white/40 border-t border-white/10">
        © 2026 AstroCharm
      </div>
    </aside>
  );
}
