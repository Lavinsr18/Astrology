export default function Topbar() {
  return (
    <div className="h-16 flex items-center justify-between px-6 border-b border-white/20 bg-white/5 backdrop-blur">
      <h1 className="text-lg font-semibold">My Account</h1>

      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/login";
        }}
        className="text-sm bg-red-500/80 px-4 py-1 rounded-lg hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}
