import { Switch, Route } from "wouter";
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
import ProductView from "./pages/ProductView"
import Footer  from "./pages/Footer"; 
import Zodaic from "./pages/zodaic";
import Astrologer from "./pages/Astrologer";
import Login from "./pages/login"

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/kundli" component={Kundli} />
      <Route path="/Contact" component={Contact} />
      <Route path="/shop" component={Shop} />
      <Route path="/about" component={About} />
      <Route path="/product/:id" component={ProductView} />
      <Route path="/zodaic" component={Zodaic} />
      <Route path="/astrologer" component={Astrologer} />
       <Route path="/login" component={Login}/>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
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
