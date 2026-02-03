import { useState } from "react";
import Wishlist from "../user/Wishlist";
import Profile from "../user/Profile";
import Cart from "../pages/cart";
import StarBackground from "../components/ui/StarBackground";
import { Package, ShoppingCart, MessageCircle, BarChart3} from "lucide-react";
import { cn } from "../lib/utils";
import UserOrders from "../user/UserOrders"




type TabType = "profile" | "wishlist" | "cart" | "userorders";


export default function UserDashboard() {
  const [tab, setTab] = useState<TabType>("profile");

  return (
    <div className="min-h-screen pt-24 relative text-white">
      <StarBackground />

      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          User Dashboard
        </h1>

        {/* ===== MOBILE TOP TABS ===== */}
        <div className="flex md:hidden gap-2 mb-6 bg-white/5 p-2 rounded-xl border border-white/10">
          <MobileTab
            active={tab === "profile"}
            icon={<MessageCircle size={18} />}
            onClick={() => setTab("profile")}
          />
          <MobileTab
            active={tab === "wishlist"}
            icon={<Package size={18} />}
            onClick={() => setTab("wishlist")}
          />
          <MobileTab
            active={tab === "cart"}
            icon={<ShoppingCart size={18} />}
            onClick={() => setTab("cart")}
          />
          <MobileTab
  active={tab === "userorders"}
  icon={<BarChart3 size={18} />}
  onClick={() => setTab("userorders")}
/>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* ===== DESKTOP SIDEBAR ===== */}
          <aside className="hidden md:block w-64 bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 h-fit sticky top-28">
            <SidebarButton
              active={tab === "profile"}
              icon={<MessageCircle />}
              label="profile"
              onClick={() => setTab("profile")}
            />

            <SidebarButton
              active={tab === "wishlist"}
              icon={<Package />}
              label="Wishlist"
              onClick={() => setTab("wishlist")}
            />

            <SidebarButton
              active={tab === "cart"}
              icon={<ShoppingCart />}
              label="Cart"
              onClick={() => setTab("cart")}
            />

            <SidebarButton
  active={tab === "userorders"}
  icon={<BarChart3 />}
  label="userorders"
  onClick={() => setTab("userorders")}
/>
          </aside>

          {/* ===== CONTENT ===== */}
          <main className="flex-1 bg-white/5 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-white/10 min-h-[400px]">
            {tab === "profile" && <Profile />}
            {tab === "wishlist" && <Wishlist />}
            {tab === "cart" && <Cart />}
            {tab === "userorders" && < UserOrders />}
          </main>
        </div>
      </div>
    </div>
  );
}

/* ===================== COMPONENTS ===================== */

function SidebarButton({
  active,
  icon,
  label,
  onClick,
}: {
  active: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all",
        active
          ? "bg-primary text-white shadow-lg"
          : "bg-white/5 hover:bg-white/10 text-white/80"
      )}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );
}

function MobileTab({
  active,
  icon,
  onClick,
}: {
  active: boolean;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex-1 flex items-center justify-center gap-2 py-3 rounded-lg transition-all",
        active
          ? "bg-primary text-white shadow"
          : "bg-white/5 text-white/70"
      )}
    >
      {icon}
    </button>
  );
}
