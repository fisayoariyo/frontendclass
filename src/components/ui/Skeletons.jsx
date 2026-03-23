/**
 * WeatherSkeleton
 * Skeleton screens that mirror the exact layout of the real weather UI.
 * Perceived performance is dramatically better than a spinner.
 */

function Pulse({ className }) {
  return <div className={`skeleton ${className}`} />;
}

export function HeroSkeleton() {
  return (
    <div className="glass-card row-span-2 p-9 flex flex-col justify-between min-h-[320px]">
      <div className="flex flex-col gap-2">
        <Pulse className="h-3 w-24" />
        <Pulse className="h-2 w-16 mt-1" />
      </div>
      <div className="flex flex-col gap-3">
        <Pulse className="h-28 w-48" />
        <Pulse className="h-4 w-32" />
        <Pulse className="h-3 w-24 mt-1" />
      </div>
    </div>
  );
}

export function MetricsSkeleton() {
  return (
    <div className="glass-card p-7 grid grid-cols-2 gap-5">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-2">
          <Pulse className="h-2 w-16" />
          <Pulse className="h-8 w-24" />
        </div>
      ))}
    </div>
  );
}

export function ConditionSkeleton() {
  return (
    <div className="glass-card p-7 flex flex-col gap-3">
      <Pulse className="h-2 w-28" />
      <Pulse className="h-7 w-40" />
      <Pulse className="h-3 w-32" />
    </div>
  );
}

export function DailySkeleton() {
  return (
    <div className="mb-4">
      <Pulse className="h-2 w-28 mb-3" />
      <div className="grid gap-2.5" style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}>
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="glass-card flex flex-col items-center gap-2 py-4 px-3">
            <Pulse className="h-2 w-8" />
            <Pulse className="h-6 w-6 rounded-full" />
            <Pulse className="h-5 w-10" />
            <Pulse className="h-2 w-8" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function HourlySkeleton() {
  return (
    <div>
      <Pulse className="h-2 w-28 mb-3" />
      <div className="flex gap-2.5 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="glass-card flex flex-col items-center gap-2 py-3.5 px-4 flex-shrink-0 min-w-[68px]">
            <Pulse className="h-2 w-8" />
            <Pulse className="h-5 w-5 rounded-full" />
            <Pulse className="h-4 w-10" />
          </div>
        ))}
      </div>
    </div>
  );
}
