import { useState } from "react";
import ProductsAdmin from "../admin/AdminProducts";
import OrdersAdmin from "../admin/AdminOrders";
import QueriesAdmin from "../admin/AdminQueries";
import StarBackground from "../components/ui/StarBackground";
import { Package, ShoppingCart, MessageCircle, BarChart3} from "lucide-react";
import { cn } from "../lib/utils";
import AdminProductAnalytics from "../admin/AdminProductAnalytics";




type TabType = "queries" | "products" | "orders" | "analytics";


export default function Dashboard() {
  const [tab, setTab] = useState<TabType>("queries");

  return (
    <div className="min-h-screen pt-24 relative text-white">
      <StarBackground />

      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          Admin Dashboard
        </h1>

        {/* ===== MOBILE TOP TABS ===== */}
        <div className="flex md:hidden gap-2 mb-6 bg-white/5 p-2 rounded-xl border border-white/10">
          <MobileTab
            active={tab === "queries"}
            icon={<MessageCircle size={18} />}
            onClick={() => setTab("queries")}
          />
          <MobileTab
            active={tab === "products"}
            icon={<Package size={18} />}
            onClick={() => setTab("products")}
          />
          <MobileTab
            active={tab === "orders"}
            icon={<ShoppingCart size={18} />}
            onClick={() => setTab("orders")}
          />
          <MobileTab
  active={tab === "analytics"}
  icon={<BarChart3 size={18} />}
  onClick={() => setTab("analytics")}
/>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* ===== DESKTOP SIDEBAR ===== */}
          <aside className="hidden md:block w-64 bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 h-fit sticky top-28">
            <SidebarButton
              active={tab === "queries"}
              icon={<MessageCircle />}
              label="Queries"
              onClick={() => setTab("queries")}
            />

            <SidebarButton
              active={tab === "products"}
              icon={<Package />}
              label="Products"
              onClick={() => setTab("products")}
            />

            <SidebarButton
              active={tab === "orders"}
              icon={<ShoppingCart />}
              label="Orders"
              onClick={() => setTab("orders")}
            />

            <SidebarButton
  active={tab === "analytics"}
  icon={<BarChart3 />}
  label="Analytics"
  onClick={() => setTab("analytics")}
/>
          </aside>

          {/* ===== CONTENT ===== */}
          <main className="flex-1 bg-white/5 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-white/10 min-h-[400px]">
            {tab === "queries" && <QueriesAdmin />}
            {tab === "products" && <ProductsAdmin />}
            {tab === "orders" && <OrdersAdmin />}
            {tab === "analytics" && <AdminProductAnalytics />}
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
