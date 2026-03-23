/**
 * AtmosphericBackground
 * Fixed, full-screen animated gradient orbs + noise texture overlay.
 * Pure visual — no props, no interaction, aria-hidden.
 */
export default function AtmosphericBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none">
      {/* Animated orbs */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-48 -left-24 w-[600px] h-[600px] rounded-full bg-blue-700 blur-[80px] opacity-[0.18] animate-drift-1" />
        <div className="absolute -bottom-24 -right-20 w-[400px] h-[400px] rounded-full bg-orange-500 blur-[80px] opacity-[0.12] animate-drift-2" />
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full bg-blue-500 blur-[80px] opacity-10 animate-drift-3" />
      </div>

      {/* Noise texture overlay */}
      <div
        className="fixed inset-0 z-[1] opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px',
        }}
      />
    </div>
  );
}
