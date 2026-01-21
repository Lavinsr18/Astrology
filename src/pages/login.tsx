import { useState } from "react";
import { useLocation } from "wouter";
import StarBackground from "../components/ui/StarBackground";
import { ENV } from "../config/env";


export default function Login() {

 const [, setLocation] = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${ENV.API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid credentials");
        return;
      }

      // ✅ Backend connected here
      localStorage.setItem("token", data.token);

      // ✅ Redirect to dashboard
      setLocation("/Dashboard");

    } catch {
      setError("Server not reachable");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#2b1055] via-[#0b163f] to-[#000814] px-4">
      <StarBackground />
      {/* Login Card */}
      <div className="w-full max-w-md rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_0_40px_rgba(186,104,200,0.35)] p-8 text-white">

        {/* Logo */}
        <h1 className="text-3xl font-semibold tracking-widest text-center">
          ASTRO<span className="text-[#e0b973]">CHARM</span>
        </h1>

        <p className="text-center text-sm text-white/80 mt-2 mb-8">
          Unlock the Future of Your Destiny
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

              <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-xl bg-white/10 px-4 py-3 text-sm
              placeholder-white/60 border border-white/10
              focus:border-[#a78bfa] focus:ring-2 focus:ring-[#7c3aed]/40 outline-none"
          />

           <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-xl bg-white/10 px-4 py-3 text-sm
              placeholder-white/60 border border-white/10
              focus:border-[#a78bfa] focus:ring-2 focus:ring-[#7c3aed]/40 outline-none"
          />

          {error && (
            <p className="text-xs text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl py-3 font-semibold
              text-[#1e1b4b]
              bg-gradient-to-r from-[#e6c87a] to-[#c4a24f]
              hover:brightness-110 hover:scale-[1.02]
              transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* Forgot */}
        <div className="text-right mt-3">
          <a href="#" className="text-xs text-[#e0b973] hover:underline">
            Forgot Password?
          </a>
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-white/20"></div>
          <span className="px-3 text-xs text-white/60">OR</span>
          <div className="flex-1 h-px bg-white/20"></div>
        </div>

        {/* Signup */}
        <p className="text-center text-xs text-white/70 mt-6">
          New to AstroCharm?{" "}
          <a href="#" className="text-[#b88cff] font-medium hover:underline">
            Create Account
          </a>
        </p>

      </div>
    </div>
  );
}
