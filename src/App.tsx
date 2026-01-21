import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import Navbar from "./components/layout/Navbar";
import NotFound from "./pages/not-found";
import Home from "./pages/Home";
import Kundli from "./pages/Kundli";
import Contact from "./pages/Contact";
import Shop from "./pages/Shop";
import About from "./pages/About";
import ProductView from "./pages/ProductView";
import Footer from "./pages/Footer";
import Astrologer from "./pages/Astrologer";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import ProductsAdmin from "./admin/AdminProducts";
import OrdersAdmin from "./admin/AdminOrders";
import ScrollToTop from "./pages/ScrollToTop";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import Terms from "./pages/terms"

function Router() {
  return (
    <>
      <ScrollToTop />

      <Switch>
        <Route path="/" component={Home} />
        <Route path="/kundli" component={Kundli} />
        <Route path="/contact" component={Contact} />
        <Route path="/shop" component={Shop} />
        <Route path="/about" component={About} />
        <Route path="/product/:id" component={ProductView} />
        <Route path="/astrologer" component={Astrologer} />
        <Route path="/login" component={Login} />
        <Route path="/privacypolicy" component={PrivacyPolicy} />
        <Route path="/refundpolicy" component={RefundPolicy} />
        <Route path="/shippingpolicy" component={ShippingPolicy} />
        <Route path="/terms" component={Terms} />

        {/* ADMIN */}
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/ProductsAdmin" component={ProductsAdmin} />
        <Route path="/OrdersAdmin" component={OrdersAdmin} />

        <Route component={NotFound} />
      </Switch>
    </>
  );
}


function App() {
  const [location] = useLocation();

  // 🔥 ADMIN ROUTES CHECK
  const isAdminRoute =
    location.startsWith("/dashboard") ||
    location.startsWith("/ProductsAdmin") ||
    location.startsWith("/OrdersAdmin");

  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Router />
      <Toaster />
       <Footer />
    </QueryClientProvider>
  );
}

export default App;
