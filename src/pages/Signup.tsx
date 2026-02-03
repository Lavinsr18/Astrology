import { useState } from "react";
import { useLocation } from "wouter";
import StarBackground from "../components/ui/StarBackground";
import { ENV } from "../config/env";

export default function Signup() {
  const [, setLocation] = useLocation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

 const submit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    const res = await fetch(
      `${ENV.API_BASE_URL}/api/user/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    const data = await res.json();
    if (!res.ok) {
      setError(data.message || "Signup failed");
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("role", "user");

    setLocation("/userdashboard"); // ✅ User Dashboard
  } catch {
    setError("Server error");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-[#2b1055] to-black">
      <StarBackground />

      <div className="w-full max-w-md bg-white/10 border border-white/20 rounded-3xl p-8 backdrop-blur text-white">
        <h2 className="text-3xl font-bold text-center mb-6">
          Create Account
        </h2>

        <form onSubmit={submit} className="space-y-4">
          <input
            className="input"
            placeholder="Full Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            className="input"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            className="input"
            placeholder="Phone"
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            required
          />

          <input
            className="input"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            required
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            className="btn-primary w-full"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-white/70">
          Already have an account?{" "}
          <a href="/login" className="text-primary hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
