export default function AstroLoader({
  text = "Loading Astrocharm...",
}: {
  text?: string;
}) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md">
      
      <div className="flex flex-col items-center gap-6">

        {/* ===== COSMIC RING ===== */}
        <div className="relative w-24 h-24">

          {/* Outer glow ring */}
          <div className="absolute inset-0 rounded-full border-4 border-primary/30 blur-sm"></div>

          {/* Rotating ring */}
          <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>

          {/* Inner glowing orb */}
          <div
            className="absolute inset-6 rounded-full bg-primary/40
                       shadow-[0_0_30px_rgba(147,51,234,0.8)]"
          />
        </div>

        {/* ===== BRAND TEXT ===== */}
        <div className="text-center">
          <p className="text-lg font-semibold tracking-widest text-primary">
            ASTROCHARM
          </p>
          <p className="text-sm text-white/60 mt-1 tracking-wide">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}
