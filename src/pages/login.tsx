import StarBackground from "../components/ui/StarBackground";


export default function Login() {
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
        <form className="space-y-4">

          <input
            type="email"
            placeholder="Email Address"
            className="w-full rounded-xl bg-white/15 px-4 py-3 text-sm placeholder-white/70 outline-none focus:ring-2 focus:ring-[#b88cff]"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-xl bg-white/15 px-4 py-3 text-sm placeholder-white/70 outline-none focus:ring-2 focus:ring-[#b88cff]"
          />

          <button
            type="submit"
            className="w-full rounded-xl py-3 font-semibold text-black bg-gradient-to-r from-[#e0b973] to-[#b88cff] hover:scale-[1.02] transition"
          >
            Login
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
